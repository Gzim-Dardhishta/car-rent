package com.ximicode.entity;

import jakarta.persistence.*;

import java.util.*;

@Entity
public class Car {

    @Id
//    @SequenceGenerator(
//            name = "car_id_seq",
//            sequenceName = "car_id_seq",
//            allocationSize = 1
//    )
//    @GeneratedValue(
//            strategy = GenerationType.SEQUENCE,
//            generator = "car_id_seq"
//    )
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String brand;

    private String model;

    private int modeYear;

    private String color;

    private int capacity;

    private int plateNumber;

    private int chassisNumber;

    private boolean available;

    private String engineType;

    private String description;

    private String steering;

    private int gasoline;

    private int price;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "car_id")
    private Set<CarReviews> carReviews = new HashSet<>();;

    public Car() {
    }

    public Car(String brand, String model, int modeYear, String color, int capacity, int plateNumber, int chassisNumber, boolean available, String engineType, String description, String steering, int gasoline, int price, Set<CarReviews> carReviews) {
        this.brand = brand;
        this.model = model;
        this.modeYear = modeYear;
        this.color = color;
        this.capacity = capacity;
        this.plateNumber = plateNumber;
        this.chassisNumber = chassisNumber;
        this.available = available;
        this.engineType = engineType;
        this.description = description;
        this.steering = steering;
        this.gasoline = gasoline;
        this.price = price;
        this.carReviews = carReviews;
    }

    public Car(String brand, String model, int modeYear, String color, int capacity, int plateNumber, int chassisNumber, boolean available, String engineType, String description, String steering, int gasoline, int price) {
        this.brand = brand;
        this.model = model;
        this.modeYear = modeYear;
        this.color = color;
        this.capacity = capacity;
        this.plateNumber = plateNumber;
        this.chassisNumber = chassisNumber;
        this.available = available;
        this.engineType = engineType;
        this.description = description;
        this.steering = steering;
        this.gasoline = gasoline;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getModeYear() {
        return modeYear;
    }

    public void setModeYear(int modeYear) {
        this.modeYear = modeYear;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public int getPlateNumber() {
        return plateNumber;
    }

    public void setPlateNumber(int plateNumber) {
        this.plateNumber = plateNumber;
    }

    public int getChassisNumber() {
        return chassisNumber;
    }

    public void setChassisNumber(int chassisNumber) {
        this.chassisNumber = chassisNumber;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public String getEngineType() {
        return engineType;
    }

    public void setEngineType(String engineType) {
        this.engineType = engineType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSteering() {
        return steering;
    }

    public void setSteering(String steering) {
        this.steering = steering;
    }

    public int getGasoline() {
        return gasoline;
    }

    public void setGasoline(int gasoline) {
        this.gasoline = gasoline;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public Set<CarReviews> getCarReviews() {
        return carReviews;
    }

    public void setCarReviews(Set<CarReviews> carReviews) {
        this.carReviews = carReviews;
    }

    @Override
    public String toString() {
        return "Car{" +
                "id=" + id +
                ", brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", modeYear=" + modeYear +
                ", color='" + color + '\'' +
                ", capacity=" + capacity +
                ", plateNumber=" + plateNumber +
                ", chassisNumber=" + chassisNumber +
                ", available=" + available +
                ", engineType='" + engineType + '\'' +
                ", description='" + description + '\'' +
                ", steering='" + steering + '\'' +
                ", gasoline=" + gasoline +
                ", price=" + price +
                ", carReviews=" + carReviews +
                '}';
    }
}
