package fing.asignamax3000.services;

import fing.asignamax3000.entities.ScoreEntity;
import fing.asignamax3000.repositories.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    // Find all scores by student rut
    public List<ScoreEntity> findScoresByStudentRut(String studentRut) {
        return scoreRepository.findAllByStudentRut(studentRut);
    }

}
