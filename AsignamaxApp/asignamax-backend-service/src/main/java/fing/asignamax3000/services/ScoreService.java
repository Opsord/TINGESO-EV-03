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

    // Find all scores lower than 4.0 by student rut
    public List<ScoreEntity> findReprovedScoresByStudentRut(String studentRut) {
        return scoreRepository.findAllByStudentRutAndReproved(studentRut);
    }

    // Find all scores equal or greater than 4.0 by student rut
    public List<ScoreEntity> findApprovedScoresByStudentRut(String studentRut) {
        return scoreRepository.findAllByStudentRutAndApproved(studentRut);
    }

}
