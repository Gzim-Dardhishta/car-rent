package com.ximicode.entity.dto;

import com.ximicode.entity.CarReviews;

import java.util.Set;

public record CarDTO(
        int id,
        String brand,
        String model,
        int modelYear,
        String color,
        int capacity,
        int plateNumber,
        int chassisNumber,
        boolean available,
        String engineType,
        String description,
        String steering,
        int gasoline,
        int price,
        Set<CarReviews> carReviews
){}
