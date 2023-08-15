package com.ximicode.controllers;

import com.ximicode.entity.Car;
import com.ximicode.payload.request.AddCarRequest;
import com.ximicode.payload.request.EditCarRequest;
import com.ximicode.payload.response.MessageResponse;
import com.ximicode.services.CarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
    @PreAuthorize("hasRole('USER') or hasRole('MANAGER') or hasRole('ADMIN')")
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    @GetMapping("/car/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MANAGER') or hasRole('ADMIN')")
    public Car getCar(@PathVariable int id){
        return carService.getCar(id);
    }

    @PostMapping("add-car")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<?> addNewCar(@RequestBody AddCarRequest newCar) {
        return carService.addCar(newCar);
    }

    @PutMapping("/edit-car/{id}")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<?> editCar(@PathVariable int id, @RequestBody EditCarRequest editCarRequest) {
        carService.updateCar(id, editCarRequest);

        return ResponseEntity.ok(new MessageResponse("Car updated successfully!"));
    }

    @DeleteMapping("/delete-car/{id}")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteCar(@PathVariable int id) {
        carService.deleteCar(id);

        return ResponseEntity.ok(new MessageResponse("Car deleted successfully!"));
    }
}
