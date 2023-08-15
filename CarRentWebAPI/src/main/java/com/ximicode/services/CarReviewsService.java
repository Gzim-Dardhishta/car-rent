package com.ximicode.services;

import com.ximicode.entity.Car;
import com.ximicode.entity.CarReviews;
import com.ximicode.exeptions.ResourceNotFoundException;
import com.ximicode.payload.request.EditReviewRequest;
import com.ximicode.repository.CarRepository;
import com.ximicode.repository.CarReviewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CarReviewsService {

    private final CarReviewRepository carReviewRepository;
    private final CarRepository carRepository;

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
                .orElseThrow(() -> new ResourceNotFoundException("Car with id %s not found".formatted(carId)));
    }

    public void editReview(int id, EditReviewRequest editReview) {

        CarReviews carReview = carReviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review with id [%s] not found".formatted(id)));

        carReview.setMessage(editReview.message());
        carReview.setRating(editReview.rating());
        carReview.setDateSubmitted(LocalDateTime.now());

        carReviewRepository.save(carReview);
    }

    public void deleteReview(int id) {
        carReviewRepository.deleteById(id);
    }

    public void deleteReviewsOfCar(int id) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car with id [%s] not found".formatted(id)));

        car.removeAllCarReviews();
        carRepository.save(car);
    }
}
