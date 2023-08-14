package com.ximicode.controllers;

import com.ximicode.entity.Car;
import com.ximicode.entity.CarReviews;
import com.ximicode.entity.User;
import com.ximicode.entity.dto.CarDTO;
import com.ximicode.payload.request.AddCarRequest;
import com.ximicode.payload.request.EditCarRequest;
import com.ximicode.payload.response.MessageResponse;
import com.ximicode.services.CarService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/cars")
public class CarController {

    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

//    @GetMapping("all-cars")
//    public List<CarDTO> getAllCars() {
//        return carService.getProductsList();
//    }

    @GetMapping("all-cars")
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    @GetMapping("/car/{id}")
    public Car getCar(@PathVariable int id){
        return carService.getCar(id);
    }

    @PostMapping("add-car")
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<?> addNewCar(@RequestBody AddCarRequest newCar) {
        return carService.addCar(newCar);
    }

    @PutMapping("/edit-car/{id}")
    public ResponseEntity<?> editCar(@PathVariable int id, @RequestBody EditCarRequest editCarRequest) {
        carService.updateCar(id, editCarRequest);

        return ResponseEntity.ok(new MessageResponse("Car updated successfully!"));
    }

    @DeleteMapping("/delete-car/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable int id) {
        carService.deleteCar(id);

        return ResponseEntity.ok(new MessageResponse("Car deleted successfully!"));
    }
}
