package com.ximicode.payload.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.time.LocalDateTime;
import java.util.Date;

public record NewOrderRequest(
        int carId,
        int userId,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDateTime orderDate,
        @JsonFormat(pattern = "yyyy-MM-dd")
        @Temporal(TemporalType.DATE)
        Date pickupDate,
        @JsonFormat(pattern = "yyyy-MM-dd")
        @Temporal(TemporalType.DATE)
        Date returnDate,
        int totalAmount,
        String orderStatus
) {
}
