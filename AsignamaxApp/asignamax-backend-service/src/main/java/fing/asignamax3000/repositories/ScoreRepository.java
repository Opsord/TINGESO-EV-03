package fing.asignamax3000.repositories;

import fing.asignamax3000.entities.ScoreEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScoreRepository extends CrudRepository<ScoreEntity, Long> {
    // Custom queries here

    // Custom query to find all scores by student rut
    @Query("SELECT s FROM ScoreEntity s WHERE s.studentRUT = ?1")
    List<ScoreEntity> findAllByStudentRut(String studentRut);

    // Find all scores lower than 4.0 by student rut
    @Query("SELECT s FROM ScoreEntity s WHERE s.studentRUT = ?1 AND s.courseGrade < 4.0")
    List<ScoreEntity> findAllByStudentRutAndReproved(String studentRut);

    // Find all scores equal or greater than 4.0 by student rut
    @Query("SELECT s FROM ScoreEntity s WHERE s.studentRUT = ?1 AND s.courseGrade >= 4.0")
    List<ScoreEntity> findAllByStudentRutAndApproved(String studentRut);
}
