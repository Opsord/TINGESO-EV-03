package fing.asignamax3000.controllers;

import fing.asignamax3000.entities.StudentEntity;
import fing.asignamax3000.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Find a student by RUT
    @GetMapping("/{rut}")
    public ResponseEntity<StudentEntity> findByRut(@PathVariable("rut") String rut) {
        if (studentService.findByRut(rut) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(studentService.findByRut(rut));
    }

    // Inscribe a student in a course
@GetMapping("/inscribe/{rut}/{courseCode}")
public ResponseEntity<StudentEntity> inscribeCourse(@PathVariable("rut") String rut, @PathVariable("courseCode") long courseCode) {
    if (studentService.findByRut(rut) == null) {
        return ResponseEntity.notFound().build();
    }
    studentService.inscribeCourse(rut, courseCode);
    return ResponseEntity.ok(studentService.findByRut(rut));
    }

}
