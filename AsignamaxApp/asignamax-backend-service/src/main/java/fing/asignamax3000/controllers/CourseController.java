package fing.asignamax3000.controllers;

import fing.asignamax3000.entities.CourseEntity;
import fing.asignamax3000.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

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
    public ResponseEntity<List<Long>> findPrerequisitesByCode(@PathVariable("code") long code) {
        if (courseService.findPrerequisitesIDByCode(code).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(courseService.findPrerequisitesIDByCode(code));
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

}
    