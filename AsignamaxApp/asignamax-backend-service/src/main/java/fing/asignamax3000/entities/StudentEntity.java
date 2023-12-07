package fing.asignamax3000.entities;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class StudentEntity {

    @Id
    private String studentRUT;

    private String studentName;

    private String studentLastName;

    private String studentEmail;

    private long studentCareerCode;

    @ElementCollection
    private List<Long> studentCurrentCourses;

}