package com.ximicode.controllers;

import com.ximicode.entity.CarReviews;
import com.ximicode.payload.request.EditReviewRequest;
import com.ximicode.payload.response.MessageResponse;
import com.ximicode.services.CarReviewsService;
import com.ximicode.services.CarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/car-reviews")
public class CarReviewsController {

    private final CarReviewsService carReviewsService;

    public CarReviewsController(CarReviewsService carReviewsService) {
        this.carReviewsService = carReviewsService;
    }

    @GetMapping("/all-reviews")
    @PreAuthorize("hasRole('USER') or hasRole('MANAGER') or hasRole('ADMIN')")
    public List<CarReviews> getAllReviews() {
        return carReviewsService.getAllReviews();
    }

    @PostMapping("/car/{carId}/add-review")
    @PreAuthorize("hasRole('USER') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<?> addReviewToCar(@PathVariable int carId, @RequestBody CarReviews carReviews) {
        carReviewsService.insertReview(carId, carReviews);
        return new ResponseEntity<>(new MessageResponse("Review inserted successfully!"),HttpStatus.CREATED);
    }

    @PutMapping("/car/{carId}/edit-review")
    @PreAuthorize("hasRole('USER') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<?> editReview(@PathVariable int carId, @RequestBody EditReviewRequest carReviews) {
        carReviewsService.editReview(carId, carReviews);
        return new ResponseEntity<>(new MessageResponse("Review updated successfully!"),HttpStatus.CREATED);
    }

    @DeleteMapping("/delete-review/{reviewId}")
    @PreAuthorize("hasRole('USER') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteReview(@PathVariable int reviewId) {
        carReviewsService.deleteReview(reviewId);
        return ResponseEntity.ok(new MessageResponse("Review deleted successfully!"));
    }

    @DeleteMapping("/car/{carId}/delete-review")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteReviewOfCar(@PathVariable int carId) {
        carReviewsService.deleteReviewsOfCar(carId);
        return ResponseEntity.ok(new MessageResponse("Reviews of car with id %s deleted successfully!".formatted(carId)));
    }
}
