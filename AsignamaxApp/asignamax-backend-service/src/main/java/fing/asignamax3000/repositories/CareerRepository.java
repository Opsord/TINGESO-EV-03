package fing.asignamax3000.repositories;

import fing.asignamax3000.entities.CareerEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CareerRepository extends CrudRepository<CareerEntity, Long> {
    // Custom queries here


}
