package com.ximicode.entity.dto;

import com.ximicode.entity.Car;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class CarDTOMapper implements Function<Car, CarDTO> {


    @Override
    public CarDTO apply(Car car) {
        return new CarDTO(
                car.getId(),
                car.getBrand(),
                car.getModel(),
                car.getModeYear(),
                car.getColor(),
                car.getCapacity(),
                car.getPlateNumber(),
                car.getChassisNumber(),
                car.isAvailable(),
                car.getEngineType(),
                car.getDescription(),
                car.getSteering(),
                car.getGasoline(),
                car.getPrice(),
                car.getCarReviews()
        );
    }
}
