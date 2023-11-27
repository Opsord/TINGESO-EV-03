package fing.asignamax3000.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "careers")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class CareerEntity {

    @Id
    private long careerCode;

    private String careerName;

}