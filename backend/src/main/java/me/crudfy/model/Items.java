package me.crudfy.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "items")
public class Items {

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

    @ManyToOne
    @JoinColumn(name = "list_id")
    @JsonBackReference
    private Lists list;
}
