package fing.asignamax3000.services;

import fing.asignamax3000.entities.StudentEntity;
import fing.asignamax3000.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Find a student by RUT
    public StudentEntity findByRut(String rut) {
        return studentRepository.findByRut(rut);
    }

    // Inscribe a student in a course
    public void inscribeCourse(String studentRUT, long courseCode) {
        // Find the student
        StudentEntity student = studentRepository.findByRut(studentRUT);
        // Add the course to the student's current courses
        student.getStudentCurrentCourses().add(courseCode);
        // Save the student
        studentRepository.save(student);
    }

}
