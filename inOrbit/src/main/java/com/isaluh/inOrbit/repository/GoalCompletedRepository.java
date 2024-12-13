package com.isaluh.inOrbit.repository;

import java.util.List;
import java.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.isaluh.inOrbit.domain.GoalCompleted;

public interface GoalCompletedRepository extends JpaRepository<GoalCompleted, Long> {

    @Query(value = "SELECT * FROM goals_completed g WHERE g.created_at >= :week AND g.created_at < DATE_ADD(:week, INTERVAL 7 DAY)", nativeQuery = true)
    List<GoalCompleted> findGoalsCompletedForWeek(@Param("week") LocalDate week);
}
