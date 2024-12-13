package com.isaluh.inOrbit.controllers;

import java.util.List;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.isaluh.inOrbit.domain.GoalCompleted;
import com.isaluh.inOrbit.repository.GoalCompletedRepository;

@RestController
@RequestMapping("/goals-completed")
public class GoalCompletedController {
    @Autowired
    private GoalCompletedRepository goalCompletedRepository;

    @GetMapping
    public List<GoalCompleted> getAllGoalsCompleted() {
        return goalCompletedRepository.findAll();
    }

    @GetMapping("/week")
    public List<GoalCompleted> getGoalsProgressForWeek(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate week) {
        return goalCompletedRepository.findGoalsCompletedForWeek(week);
    }
}
