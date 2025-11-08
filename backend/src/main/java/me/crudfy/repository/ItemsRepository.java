package me.crudfy.repository;

import me.crudfy.model.Items;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemsRepository extends JpaRepository<Items, Long> {

    List<Items> findAllByList_Id(Long list_id);
}
