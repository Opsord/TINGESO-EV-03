package fing.asignamax3000.controllers;

import fing.asignamax3000.entities.ScoreEntity;
import fing.asignamax3000.services.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/scores")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    // Get all scores given a student RUT
    @GetMapping("/student/{rut}")
    public ResponseEntity<List<ScoreEntity>> findScoresByStudentRut(@PathVariable("rut") String rut) {
        if (scoreService.findScoresByStudentRut(rut).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(scoreService.findScoresByStudentRut(rut));
    }

    // Get all scores lower than 4.0 given a student RUT
    @GetMapping("/student/{rut}/reproved")
    public ResponseEntity<List<ScoreEntity>> findReprovedScoresByStudentRut(@PathVariable("rut") String rut) {
        if (scoreService.findReprovedScoresByStudentRut(rut).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(scoreService.findReprovedScoresByStudentRut(rut));
    }

    // Get all scores equal or greater than 4.0 given a student RUT
    @GetMapping("/student/{rut}/approved")
    public ResponseEntity<List<ScoreEntity>> findApprovedScoresByStudentRut(@PathVariable("rut") String rut) {
        if (scoreService.findApprovedScoresByStudentRut(rut).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(scoreService.findApprovedScoresByStudentRut(rut));
    }

}
