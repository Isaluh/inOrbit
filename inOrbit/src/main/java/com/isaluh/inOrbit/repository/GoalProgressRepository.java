package com.isaluh.inOrbit.repository;

import com.isaluh.inOrbit.domain.GoalProgress;
import java.time.LocalDate;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GoalProgressRepository extends JpaRepository<GoalProgress, Long> {

    @Query(value = "SELECT * FROM goals_progress g WHERE g.created_at >= :week AND g.created_at < DATE_ADD(:week, INTERVAL 7 DAY)", nativeQuery = true)
    List<GoalProgress> findGoalsProgressForWeek(@Param("week") LocalDate week);
}
