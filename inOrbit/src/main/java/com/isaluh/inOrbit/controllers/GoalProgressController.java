package com.isaluh.inOrbit.controllers;

import java.util.List;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.DayOfWeek;

import java.util.Collections;
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

import com.isaluh.inOrbit.domain.GoalCompleted;
import com.isaluh.inOrbit.domain.GoalProgress;
import com.isaluh.inOrbit.domain.Goals;
import com.isaluh.inOrbit.exceptions.ResourceNotFoundException;
import com.isaluh.inOrbit.repository.GoalCompletedRepository;
import com.isaluh.inOrbit.repository.GoalProgressRepository;
import com.isaluh.inOrbit.repository.GoalsRepository;

@RestController
@RequestMapping("/goals-progress")
public class GoalProgressController {

    @Autowired
    private GoalProgressRepository goalProgressRepository;

    @Autowired
    private GoalsRepository goalsRepository;

    @Autowired
    private GoalCompletedRepository goalCompletedRepository;

    @GetMapping
    public List<GoalProgress> getAllGoalsProgress() {
        return goalProgressRepository.findAll();
    }

    @GetMapping("/week")
    public List<GoalProgress> getGoalsProgressForWeek(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate week) {
        return goalProgressRepository.findGoalsProgressForWeek(week);
    }

    @PostMapping
    public ResponseEntity<?> createGoalProgress(@RequestBody GoalProgress goalProgress) {
        Goals existingGoal = goalsRepository.findById(goalProgress.getGoal().getId())
            .orElseThrow(() -> new ResourceNotFoundException("Meta não encontrada ou não existente"));
        
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfWeek = now.with(DayOfWeek.MONDAY).withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime endOfWeek = startOfWeek.plusDays(7).minusNanos(1); // até o final do domingo

        LocalDateTime createdAtDate = goalProgress.getCreatedAt();
        if (createdAtDate == null) {
            createdAtDate = now;
        }

        if (createdAtDate.isBefore(startOfWeek) || createdAtDate.isAfter(endOfWeek)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Collections.singletonMap("message", "Você só pode concluir objetivos desta semana."));
        }

        if (existingGoal.isCompleted()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Collections.singletonMap("message", "Meta já está concluída."));
        }

        existingGoal.incrementCompletion();

        GoalProgress progress = new GoalProgress();
        progress.setGoal(existingGoal);
        // progress.setCreatedAt(createdAtDate);
        
        goalProgressRepository.save(progress);

        if (existingGoal.isCompleted()) {
            GoalCompleted createdGoalCompletion = new GoalCompleted();
            createdGoalCompletion.setGoal(existingGoal);
            createdGoalCompletion.setCreatedAt(now); 
            
            goalCompletedRepository.save(createdGoalCompletion);
            goalsRepository.save(existingGoal);

            return ResponseEntity.status(HttpStatus.CREATED).body(createdGoalCompletion);
        }

        goalsRepository.save(existingGoal);

        return ResponseEntity.status(HttpStatus.OK).body(Collections.singletonMap("message", "Meta não concluída, contagem atualizada."));
    }
}
