package com.ximicode.services;

import com.ximicode.entity.Car;
import com.ximicode.entity.CarReviews;
import com.ximicode.entity.User;
import com.ximicode.exeptions.ResourceNotFoundException;
import com.ximicode.repository.CarRepository;
import com.ximicode.repository.CarReviewRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class CarReviewsService {

    private final CarReviewRepository carReviewRepository;
    private final CarRepository carRepository;

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return null; // No logged-in user
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof User) {
            return (User) principal;
        }

        return null;
    }

    public CarReviewsService(CarReviewRepository carReviewRepository, CarRepository carRepository) {
        this.carReviewRepository = carReviewRepository;
        this.carRepository = carRepository;
    }

    public List<CarReviews> getAllReviews() {
        return carReviewRepository.findAll();
    }

    public CarReviews getReview(int reviewId) {
        return carReviewRepository.findById(reviewId).orElseThrow(() -> new ResourceNotFoundException("Review with id [%s] not found!".formatted(reviewId)));
    }

    public void insertReview(int carId, CarReviews review) {

        CarReviews carReviews = carRepository.findById(carId)
                .map(car -> {
                    car.getCarReviews().add(review);
                    review.setDateSubmitted(LocalDateTime.now());
                    return carReviewRepository.save(review);
                })
                .orElseThrow(() -> new ResourceNotFoundException("Car with id [%s] not found".formatted(carId)));
    }
}
