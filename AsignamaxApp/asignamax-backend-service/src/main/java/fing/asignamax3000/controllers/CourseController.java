package fing.asignamax3000.controllers;

import fing.asignamax3000.entities.CourseEntity;
import fing.asignamax3000.entities.StudentEntity;
import fing.asignamax3000.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@CrossOrigin
@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    Logger logger = Logger.getLogger(getClass().getName());

    // Find all courses
    @GetMapping
    public ResponseEntity<Iterable<CourseEntity>> findAll() {
        return ResponseEntity.ok(courseService.findAll());
    }

    // Get a course by code
    @GetMapping("/{code}")
    public ResponseEntity<CourseEntity> findByCode(@PathVariable("code") long code) {
        if (courseService.findByCode(code) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(courseService.findByCode(code));
    }

    // Get all prerequisites given a course code
    @GetMapping("/prerequisites/{code}")
    public ResponseEntity<List<CourseEntity>> findPrerequisitesByCode(@PathVariable("code") long code) {
        if (courseService.findPrerequisiteCoursesByCode(code).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        logger.info("Found prerequisites for course " + code);
        return ResponseEntity.ok(courseService.findPrerequisiteCoursesByCode(code));
    }

    // Get schedules for a course
    @GetMapping("/schedules/{code}")
    public ResponseEntity<List<String>> findSchedulesByCode(@PathVariable("code") long code) {
        if (courseService.findSchedulesByCode(code).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        logger.info("Found schedules for course " + code);
        return ResponseEntity.ok(courseService.findSchedulesByCode(code));
    }

    // Get all courses by level
    @GetMapping("/level/{level}")
    public ResponseEntity<List<CourseEntity>> findAllByLevel(@PathVariable("level") int level) {
        if (courseService.findAllByLevel(level).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(courseService.findAllByLevel(level));
    }

    // Add a schedule to a course
    @GetMapping("/addSchedule/{code}/{day}/{block}")
    public ResponseEntity<String> addSchedule(@PathVariable("code") long code, @PathVariable("day") String day, @PathVariable("block") String block) {
        // Add schedule
        courseService.addSchedule(code, day, block);
        return ResponseEntity.ok("Schedule added");
    }

    // Get occupied schedule blocks for a level
    @GetMapping("/occupiedSchedule/{level}")
    public ResponseEntity<List<String>> getOccupiedSchedule(@PathVariable("level") Integer level) {
        if (courseService.getOccupiedSchedulesByLevel(level).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(courseService.getOccupiedSchedulesByLevel(level));
    }

    // Get available schedule blocks for a level
    @GetMapping("/availableSchedule/{level}")
    public ResponseEntity<List<String>> getAvailableSchedule(@PathVariable("level") Integer level) {
        if (courseService.getAvailableSchedulesByLevel(level).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(courseService.getAvailableSchedulesByLevel(level));
    }

    // Get all students enrolled in a course
    @GetMapping("/students/{code}")
    public ResponseEntity<List<StudentEntity>> findAllStudentsByCourse(@PathVariable("code") Long code) {
        if (courseService.getStudentsByCourse(code).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(courseService.getStudentsByCourse(code));
    }

}
    