package me.crudfy.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "lists")
public class Lists {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDate created_at;
    private LocalDate updated_at;

    @PrePersist
    protected void onCreate() {
        LocalDate now = LocalDate.now();
        this.created_at = now;
        this.updated_at = now;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated_at = LocalDate.now();
    }

    @OneToMany(mappedBy = "list", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Items> items;
}
