package com.ximicode.payload.request;

public record AddCarRequest(
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
        int price
){}
