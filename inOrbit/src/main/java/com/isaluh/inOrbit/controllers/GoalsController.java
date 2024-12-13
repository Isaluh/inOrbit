package com.isaluh.inOrbit.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.isaluh.inOrbit.domain.Goals;
import com.isaluh.inOrbit.repository.GoalsRepository;

@RestController
@RequestMapping("/goals")
public class GoalsController {
    @Autowired
    private GoalsRepository goalsRepository;

    @GetMapping
    public List<Goals> getAllGoals() {
        return goalsRepository.findAll();
    }

    @GetMapping("/week")
    public List<Goals> getGoalsForWeek(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate week) {
        return goalsRepository.findGoalsForWeek(week);
    }

    @PostMapping
    public ResponseEntity<Goals> createGoal(@RequestBody Goals newGoal) {
        Goals savedGoal = goalsRepository.save(newGoal);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedGoal);
    }

    // @PostMapping(consumes = "multipart/form-data")
    // public Goals createGoal(
    //     @RequestParam("title") String title,
    //     @RequestParam("desiredWeeklyFrequency") String desiredWeeklyFrequency) {

    //     Goals goal = new Goals();
    //     goal.setTitle(title);
    //     goal.setDesiredWeeklyFrequency((Integer.parseInt(desiredWeeklyFrequency)));

    //     return goalsRepository.save(goal);
    // }

}
