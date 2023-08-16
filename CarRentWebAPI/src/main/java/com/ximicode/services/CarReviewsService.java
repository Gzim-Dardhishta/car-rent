package com.ximicode.services;

import com.ximicode.entity.Car;
import com.ximicode.entity.CarReviews;
import com.ximicode.entity.User;
import com.ximicode.exeptions.ResourceNotFoundException;
import com.ximicode.payload.request.AddReviewRequest;
import com.ximicode.payload.request.EditReviewRequest;
import com.ximicode.repository.CarRepository;
import com.ximicode.repository.CarReviewRepository;
import com.ximicode.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CarReviewsService {

    private final CarReviewRepository carReviewRepository;
    private final CarRepository carRepository;
    private final UserRepository userRepository;

    public CarReviewsService(CarReviewRepository carReviewRepository, CarRepository carRepository, UserRepository userRepository) {
        this.carReviewRepository = carReviewRepository;
        this.carRepository = carRepository;
        this.userRepository = userRepository;
    }

    public List<CarReviews> getAllReviews() {
        return carReviewRepository.findAll();
    }

    public CarReviews getReview(int reviewId) {
        return carReviewRepository.findById(reviewId).orElseThrow(() -> new ResourceNotFoundException("Review with id [%s] not found!".formatted(reviewId)));
    }

    public void insertReview(int carId, AddReviewRequest review) {

        User user = userRepository.findById(review.userId())
                .orElseThrow(() -> new ResourceNotFoundException("User with id %s not found".formatted(review.userId())));


        CarReviews carReviews = carRepository.findById(carId)
                .map(car -> {

                    CarReviews carReview = new CarReviews();

                    carReview.setDateSubmitted(LocalDateTime.now());
                    carReview.setFromUser(user);
                    carReview.setRating(review.rating());
                    carReview.setMessage(review.message());

                    car.getCarReviews().add(carReview);
                    return carReviewRepository.save(carReview);
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
