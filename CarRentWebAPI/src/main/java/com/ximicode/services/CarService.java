package com.ximicode.services;

import com.ximicode.entity.Car;
import com.ximicode.entity.dto.CarDTO;
import com.ximicode.entity.dto.CarDTOMapper;
import com.ximicode.exeptions.ResourceNotFoundException;
import com.ximicode.payload.request.AddCarRequest;
import com.ximicode.payload.request.EditCarRequest;
import com.ximicode.payload.response.MessageResponse;
import com.ximicode.repository.CarRepository;
import com.ximicode.repository.CarReviewRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarService {

    private final CarRepository carRepository;
    private final CarReviewRepository carReviewRepository;
    private final CarDTOMapper carDTOMapper;

    public CarService(CarRepository carRepository, CarReviewRepository carReviewRepository, CarDTOMapper carDTOMapper) {
        this.carRepository = carRepository;
        this.carReviewRepository = carReviewRepository;
        this.carDTOMapper = carDTOMapper;
    }

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public List<CarDTO> getProductsList() {
        return carRepository.findAll()
                .stream()
                .map(carDTOMapper)
                .collect(Collectors.toList());
    }

    public Car getCar(int carId) {
        return carRepository.findById(carId).orElseThrow(() -> new ResourceNotFoundException("Car with id: %carId not found".formatted(carId)));
    }

    public ResponseEntity<?> addCar(AddCarRequest addCar) {

        Car newCar = new Car(
                addCar.brand(),
                addCar.model(),
                addCar.modelYear(),
                addCar.color(),
                addCar.capacity(),
                addCar.plateNumber(),
                addCar.chassisNumber(),
                addCar.available(),
                addCar.engineType(),
                addCar.description(),
                addCar.steering(),
                addCar.gasoline(),
                addCar.price()
        );

        carRepository.save(newCar);

        return ResponseEntity.ok(new MessageResponse("Car saved successfully!"));
    }

    public void updateCar(int id, EditCarRequest editCar) {

        Car car = carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car not found with id: " + id));

        car.setBrand(editCar.brand());
        car.setModel(editCar.model());
        car.setColor(editCar.color());
        car.setCapacity(editCar.capacity());
        car.setPlateNumber(editCar.plateNumber());
        car.setChassisNumber(editCar.chassisNumber());
        car.setAvailable(editCar.available());
        car.setEngineType(editCar.engineType());
        car.setDescription(editCar.description());
        car.setSteering(editCar.steering());
        car.setGasoline(editCar.gasoline());
        car.setPrice(editCar.price());

        carRepository.save(car);
    }

    public void deleteCar(int id) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car with id [%s] not found".formatted(id)));

        carRepository.delete(car);
    }
}
