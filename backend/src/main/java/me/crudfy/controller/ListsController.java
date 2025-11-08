package me.crudfy.controller;

import me.crudfy.dto.CreateListsDto;
import me.crudfy.dto.EditListsDto;
import me.crudfy.model.Lists;
import me.crudfy.repository.ListsRepository;
import me.crudfy.service.ListsService;
import me.crudfy.service.ServiceResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/lists")
public class ListsController {

    private final ListsRepository listsRepository;
    private final ListsService listsService;

    public ListsController(ListsRepository listsRepository, ListsService listsService) {
        this.listsRepository = listsRepository;
        this.listsService = listsService;
    }

    @GetMapping
    public ResponseEntity<List<Lists>> allLists() {

        List<Lists> lists = listsRepository.findAll();

        return ResponseEntity.ok(lists);
    };

    @PostMapping
    public ResponseEntity<String> createList(@RequestBody CreateListsDto dto) {
        ServiceResponse response = listsService.saveList(dto);

        if (response.isSuccess()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response.getMessage());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.getMessage());
        }
    }

    @PatchMapping
    public ResponseEntity<String> editList(@RequestBody EditListsDto dto) {
        ServiceResponse response = listsService.updateList(dto);

        if (response.isSuccess()) {
            return ResponseEntity.ok(response.getMessage());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteList(@PathVariable Long id) {
        ServiceResponse response = listsService.deleteList(id);

        if (response.isSuccess()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.getMessage());
        }
    }
}
