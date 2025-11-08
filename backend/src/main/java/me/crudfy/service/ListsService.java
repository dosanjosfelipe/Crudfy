package me.crudfy.service;

import me.crudfy.dto.CreateListsDto;
import me.crudfy.dto.EditListsDto;
import me.crudfy.model.Lists;
import me.crudfy.repository.ListsRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class ListsService {

    private final ListsRepository listsRepository;

    public ListsService(ListsRepository listsRepository) {
        this.listsRepository = listsRepository;
    }

    public ServiceResponse saveList(CreateListsDto dto) {

        try {
            Lists list = new Lists();
            list.setName(dto.name());
            list.setDescription(dto.description());
            listsRepository.save(list);

            return new ServiceResponse(true, "Lista criada com sucesso.");
        } catch (Exception e) {
            return new ServiceResponse(false, "Erro ao criar lista: " + e.getMessage());
        }
    }

    public ServiceResponse updateList(EditListsDto dto) {
        try {
            Optional<Lists> optionalList = listsRepository.findById(dto.id());

            if (optionalList.isPresent()) {

                Lists listToEdit = optionalList.get();
                listToEdit.setName(dto.newName());
                listToEdit.setDescription(dto.newDescription());

                listsRepository.save(listToEdit);
                return new ServiceResponse(true, "Lista atualizada com sucesso.");
            } else {
                return new ServiceResponse(false, "Lista não encontrada.");
            }
        } catch (Exception e) {
            return new ServiceResponse(false, "Erro ao criar lista: " + e.getMessage());
        }
    }

    public ServiceResponse deleteList(Long id) {
        try {
            Optional<Lists> optionalLists = listsRepository.findById(id);

            if(optionalLists.isPresent()) {
                Lists listToDelete = optionalLists.get();

                listsRepository.delete(listToDelete);
                return new ServiceResponse(true, "Lista deletada com sucesso.");
            } else {
                return new ServiceResponse(false, "Lista não encontrada.");
            }
        } catch (Exception e) {
            return new ServiceResponse(false, "Erro ao deletar lista: " + e.getMessage());
        }
    }
}
