package me.crudfy.repository;

import me.crudfy.model.Lists;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListsRepository extends JpaRepository<Lists, Long> {
}
