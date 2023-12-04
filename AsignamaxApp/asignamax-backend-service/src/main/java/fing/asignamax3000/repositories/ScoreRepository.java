package fing.asignamax3000.repositories;

import fing.asignamax3000.entities.ScoreEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ScoreRepository extends CrudRepository<ScoreEntity, Long> {
    // Custom queries here

    // Custom query to find all scores by student rut
    @Query("SELECT s FROM ScoreEntity s WHERE s.studentRUT = ?1")
    List<ScoreEntity> findAllByStudentRut(String studentRut);

}
