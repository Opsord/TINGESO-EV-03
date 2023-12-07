package fing.asignamax3000.repositories;

import fing.asignamax3000.entities.StudentEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends CrudRepository<StudentEntity, Long> {
    // Custom queries here

    // Find a student by RUT
    @Query("SELECT e FROM StudentEntity e WHERE e.studentRUT = :rut")
    StudentEntity findByRut(@Param("rut") String rut);
}
