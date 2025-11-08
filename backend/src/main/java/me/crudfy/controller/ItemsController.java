package me.crudfy.controller;

import me.crudfy.dto.CreateItemsDto;
import me.crudfy.dto.EditItemDto;
import me.crudfy.model.Items;
import me.crudfy.repository.ItemsRepository;
import me.crudfy.service.ItemsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import me.crudfy.service.ServiceResponse;
import java.util.List;

@RestController
@RequestMapping("/items")
public class ItemsController {

    private final ItemsRepository itemsRepository;
    private final ItemsService itemsService;

    public ItemsController(ItemsRepository itemsRepository, ItemsService itemsService) {
        this.itemsRepository = itemsRepository;
        this.itemsService = itemsService;
    }

    @GetMapping
    public ResponseEntity<List<Items>> ItemsFromList(@RequestParam Long listId) {

        List<Items> items = itemsRepository.findAllByList_Id(listId);

        return ResponseEntity.ok(items);

    }

    @PostMapping
    public ResponseEntity<String> createItem(@RequestBody CreateItemsDto dto) {

        ServiceResponse response = itemsService.saveItem(dto);

        if (response.isSuccess()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response.getMessage());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.getMessage());
        }
    }

    @PatchMapping
    public ResponseEntity<String> editItem(@RequestBody EditItemDto dto) {
        ServiceResponse response = itemsService.editItem(dto);

        if (response.isSuccess()) {
            return ResponseEntity.ok(response.getMessage());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable Long id) {

        ServiceResponse response = itemsService.deleteItem(id);

        if (response.isSuccess()) {
            return ResponseEntity.ok(response.getMessage());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.getMessage());
        }
    }
}
