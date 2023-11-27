package fing.asignamax3000.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class CourseEntity {

        @Id
        private long courseCode;

        private String courseName;

        private long courseCareerCode;

        private int courseLevel;

        private String coursePlan;
}
