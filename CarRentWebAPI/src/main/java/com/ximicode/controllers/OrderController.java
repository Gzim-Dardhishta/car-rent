package com.ximicode.controllers;

import com.ximicode.entity.Orders;
import com.ximicode.payload.request.EditOrderRequest;
import com.ximicode.payload.request.NewOrderRequest;
import com.ximicode.payload.response.MessageResponse;
import com.ximicode.services.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    @GetMapping("/all-orders")
    public List<Orders> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @GetMapping("/order/{orderId}")
    public Orders getOrder(@PathVariable int orderId) {
        return orderService.getOrder(orderId);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @PostMapping("/new-order")
    public ResponseEntity<?> addOrder(@RequestBody NewOrderRequest newOrder) {
        orderService.newOrder(newOrder);

        return new ResponseEntity<>(new MessageResponse("Order added successfully"), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    @PutMapping("/edit-order/{orderId}")
    public ResponseEntity<?> editOrder(@PathVariable int orderId, @RequestBody EditOrderRequest editOrder) {
        orderService.editOrderStatus(orderId, editOrder);

        return new ResponseEntity<>(new MessageResponse("Order status changed successfully"), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    @DeleteMapping("/delete-order/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable int orderId) {
        orderService.deleteOrder(orderId);

        return new ResponseEntity<>(new MessageResponse("Order deleted successfully"), HttpStatus.OK);
    }
}
