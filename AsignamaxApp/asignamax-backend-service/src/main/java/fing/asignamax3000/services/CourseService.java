package fing.asignamax3000.services;

import fing.asignamax3000.entities.CourseEntity;
import fing.asignamax3000.entities.StudentEntity;
import fing.asignamax3000.repositories.CourseRepository;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    // Possible course schedule days
    private final String[] days = {"MON", "TUE", "WED", "THU", "FRI", "SAT"};

    // Check if a day is valid
    public boolean isValidDay(String day) {
        for (String d : days) {
            if (d.equals(day)) {
                return true;
            }
        }
        return false;
    }

    // Possible course schedule times
    private final String[] blocks = {"1", "2", "3", "4", "5", "6"};

    // Check if a block is valid
    public boolean isValidBlock(String block) {
        for (String b : blocks) {
            if (b.equals(block)) {
                return true;
            }
        }
        return false;
    }

    // Find all courses
    public Iterable<CourseEntity> findAll() {
        return courseRepository.findAll();
    }

    // Find a course by code
    public CourseEntity findByCode(long courseCode) {
        return courseRepository.findById(courseCode).orElse(null);
    }

    // Find a course´s prerequisites id by course code
    public List<Long> findPrerequisitesIDByCode(long courseCode) {
        return courseRepository.findPrerequisitesByCode(courseCode);
    }

    // Find course´s pre requisites
    public List<CourseEntity> findPrerequisiteCoursesByCode(long courseCode){
        List<Long> prerequisitesID = findPrerequisitesIDByCode(courseCode);
        List<CourseEntity> prerequisiteCourses = new ArrayList<>();
        for (Long id : prerequisitesID) {
            prerequisiteCourses.add(findByCode(id));
        }
        return prerequisiteCourses;
    }

    // Find all courses by level
    public List<CourseEntity> findAllByLevel(int courseLevel) {
        return courseRepository.findAllByLevel(courseLevel);
    }

    // Add a schedule to a course
    public void addSchedule(long courseCode, String day, String block) {
        // Find course by code
        CourseEntity course = courseRepository.findById(courseCode).orElse(null);
        // If course exists
        if (course != null && isValidDay(day) && isValidBlock(block)) {
                    // Add schedule to course
                    course.getCourseSchedule().add(day + "-" + block);
                    // Save course
                    courseRepository.save(course);
        }
    }

    // Generate a list of all possible schedules
    public List<String> generateAllSchedules() {
        // Create a list of all possible schedules
        List<String> allSchedules = new ArrayList<>();
        // For each day
        for (String day : days) {
            // For each block
            for (String block : blocks) {
                // Add schedule to a list of all schedules
                allSchedules.add(day + "-" + block);
            }
        }
        // Return list of all schedules
        return allSchedules;
    }

    // Get a list of occupied schedules by level
    public List<String> getOccupiedSchedulesByLevel(int courseLevel) {
        // Find all courses by level
        List<CourseEntity> courses = courseRepository.findAllByLevel(courseLevel);
        // Create a list of occupied schedules
        List<String> occupiedSchedules = new ArrayList<>();
        // For each course using try-with-resources
        for (CourseEntity course : courses) {
            // For each schedule
            try {
                // Add schedule to occupied schedules
                occupiedSchedules.addAll(course.getCourseSchedule());
            } catch (Exception e) {
                // Do nothing
            }
        }
        // Return occupied schedules
        return occupiedSchedules;
    }

    // Get a list of available schedules by level
    public List<String> getAvailableSchedulesByLevel(int courseLevel) {
        // Get a list of occupied schedules
        List<String> occupiedSchedules = getOccupiedSchedulesByLevel(courseLevel);
        // Get a list of all schedules
        List<String> allSchedules = generateAllSchedules();
        // Remove occupied schedules from all schedules
        allSchedules.removeAll(occupiedSchedules);
        // Return available schedules
        return allSchedules;
    }

    // Get a list of students enrolled in a course
    public List<StudentEntity> getStudentsByCourse(long courseCode) {
        return courseRepository.findAllStudentsByCourse(courseCode);
    }
}