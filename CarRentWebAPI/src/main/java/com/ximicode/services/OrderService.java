package com.ximicode.services;

import com.ximicode.entity.Car;
import com.ximicode.entity.Orders;
import com.ximicode.entity.User;
import com.ximicode.exeptions.ResourceNotFoundException;
import com.ximicode.payload.request.EditOrderRequest;
import com.ximicode.payload.request.NewOrderRequest;
import com.ximicode.repository.CarRepository;
import com.ximicode.repository.OrderRepository;
import com.ximicode.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CarRepository carRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository, CarRepository carRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.carRepository = carRepository;
    }

    public List<Orders> getAllOrders() {
        return orderRepository.findAll();
    }

    public Orders getOrder(int id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order with id %s not found".formatted(id)));
    }

    public void newOrder(NewOrderRequest orderRequest) {

        Car car = carRepository.findById(orderRequest.carId())
                .orElseThrow(() -> new ResourceNotFoundException("Car with id %s not found".formatted(orderRequest.carId())));


        Orders order = userRepository.findById(orderRequest.userId()).map(user1 -> {

            Orders newOrder = new Orders();

            newOrder.setClientName(user1.getName() + " " + user1.getLastName());
            newOrder.setClientLicenceId(user1.getLicenceId());
            newOrder.setClientPhoneNumber(user1.getPhoneNumber());
            newOrder.setCar(car);
            newOrder.setOrderDate(LocalDateTime.now());
            newOrder.setPickupDate(orderRequest.pickupDate());
            newOrder.setReturnDate(orderRequest.returnDate());
            newOrder.setTotalAmount(car.getPrice());
            newOrder.setOrderStatus("In Progress");

            user1.getOrders().add(newOrder);

            return orderRepository.save(newOrder);
        }).orElseThrow(() -> new ResourceNotFoundException("User with id %s not found".formatted(orderRequest.userId())));

        orderRepository.save(order);
    }

    public void editOrderStatus(int orderId, EditOrderRequest editOrder) {

        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order with id %s not found".formatted(orderId)));

        order.setOrderStatus(editOrder.orderStatus());

        orderRepository.save(order);
    }

    public void deleteOrder(int orderId) {

        orderRepository.deleteById(orderId);
    }
}
