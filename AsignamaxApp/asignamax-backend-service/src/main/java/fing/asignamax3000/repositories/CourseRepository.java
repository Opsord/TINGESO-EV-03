package fing.asignamax3000.repositories;

import fing.asignamax3000.entities.CourseEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CourseRepository extends CrudRepository<CourseEntity, Long> {
    // Custom queries here

    // Custom query to find a course´s prerequisites
    @Query("SELECT c.coursePreRequisite FROM CourseEntity c WHERE c.courseCode = ?1")
    String findPrerequisitesByCode(long courseCode);

}
