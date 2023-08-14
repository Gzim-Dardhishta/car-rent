package com.ximicode.controllers;

import com.ximicode.entity.CarReviews;
import com.ximicode.payload.response.MessageResponse;
import com.ximicode.services.CarReviewsService;
import com.ximicode.services.CarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public List<CarReviews> getAllReviews() {
        return carReviewsService.getAllReviews();
    }

    @PostMapping("/car/{carId}/add-review")
    public ResponseEntity<?> addReviewToCar(@PathVariable int carId, @RequestBody CarReviews carReviews) {
        carReviewsService.insertReview(carId, carReviews);
        return new ResponseEntity<>(new MessageResponse("Review inserted successfully!"),HttpStatus.CREATED);
    }
}
