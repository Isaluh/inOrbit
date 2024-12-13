package com.isaluh.inOrbit.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.isaluh.inOrbit.domain.Goals;

public interface GoalsRepository extends JpaRepository<Goals, Long> {

    @Query(value = "SELECT * FROM goals g WHERE g.created_at >= :week AND g.created_at < DATE_ADD(:week, INTERVAL 7 DAY)", nativeQuery = true)
    List<Goals> findGoalsForWeek(@Param("week") LocalDate week);


}
