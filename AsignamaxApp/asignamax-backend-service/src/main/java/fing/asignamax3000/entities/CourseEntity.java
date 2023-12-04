package fing.asignamax3000.entities;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class CourseEntity {

        // General course info

        @Id
        private long courseCode;

        private String courseName;

        private long courseCareerCode;

        private int courseLevel;

        private String coursePlan;

        @ElementCollection
        private List<Long> coursePreRequisite;

        @ElementCollection
        private List<String> courseSchedule;

}
