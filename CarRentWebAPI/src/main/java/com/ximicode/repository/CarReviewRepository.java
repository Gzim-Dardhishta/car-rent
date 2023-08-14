package com.ximicode.repository;

import com.ximicode.entity.CarReviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarReviewRepository extends JpaRepository<CarReviews, Integer> {
}
