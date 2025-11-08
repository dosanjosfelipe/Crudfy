package me.crudfy.service;

import me.crudfy.dto.CreateItemsDto;
import me.crudfy.dto.EditItemDto;
import me.crudfy.model.Items;
import me.crudfy.model.Lists;
import me.crudfy.repository.ItemsRepository;
import me.crudfy.repository.ListsRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class ItemsService {

    private final ItemsRepository itemsRepository;
    private final ListsRepository listsRepository;

    public ItemsService(ItemsRepository itemsRepository,
                        ListsRepository listsRepository) {
        this.itemsRepository = itemsRepository;
        this.listsRepository = listsRepository;
    }

    public ServiceResponse saveItem(CreateItemsDto dto) {

        try {
            Optional<Lists> optionalLists = listsRepository.findById(dto.listId());

            if (optionalLists.isPresent()) {
                Lists listOfItems = optionalLists.get();

                Items item = new Items();
                item.setName(dto.name());
                item.setDescription(dto.description());
                item.setList(listOfItems);

                itemsRepository.save(item);

                return new ServiceResponse(true, "Item criado com sucesso.");

            } else {
                return new ServiceResponse(true, "Lista associada ao item não encontrada.");
            }

        } catch (Exception e) {
            return new ServiceResponse(false, "Erro ao criar item: " + e.getMessage());
        }
    }

    public ServiceResponse editItem(EditItemDto dto) {
        try {
            Optional<Items> OptionalItem = itemsRepository.findById(dto.id());

            if (OptionalItem.isPresent()) {
                Items itemToEdit = OptionalItem.get();

                itemToEdit.setName(dto.newName());
                itemToEdit.setDescription(dto.newDescription());

                itemsRepository.save(itemToEdit);

                return new ServiceResponse(true, "Item editado com sucesso.");
            } else {
                return new ServiceResponse(false, "Item não encontrado.");
            }
        } catch (Exception e) {
            return new ServiceResponse(false, "Erro ao editar item.");
        }
    }

    public ServiceResponse deleteItem(Long id) {
        Optional<Items> optionalItem = itemsRepository.findById(id);

        try {
            if (optionalItem.isPresent()) {
                Items item = optionalItem.get();

                itemsRepository.delete(item);

                return new ServiceResponse(true, "Item deletado com sucesso.");
            } else {
                return new ServiceResponse(false, "Item não encontrado");
            }
        } catch (Exception e) {
            return new ServiceResponse(false, "Erro ao deletar item: " + e.getMessage());
        }
    }
}
