package fing.asignamax3000.repositories;

import fing.asignamax3000.entities.CourseEntity;
import fing.asignamax3000.entities.StudentEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends CrudRepository<CourseEntity, Long> {
    // Custom queries here

    // Custom query to find a course´s prerequisite´s id
    @Query("SELECT c.coursePreRequisite FROM CourseEntity c WHERE c.courseCode = ?1")
    List<Long> findPrerequisitesByCode(long courseCode);

    // Find courses by level
    @Query("SELECT c FROM CourseEntity c WHERE c.courseLevel = ?1")
    List<CourseEntity> findAllByLevel(int courseLevel);

    // Checks for every student if they are enrolled in a course
    @Query("SELECT s FROM StudentEntity s WHERE ?1 MEMBER OF s.studentCurrentCourses")
    List<StudentEntity> findAllStudentsByCourse(Long course);

}
