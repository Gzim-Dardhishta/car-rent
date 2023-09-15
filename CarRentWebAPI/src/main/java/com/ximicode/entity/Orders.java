package com.ximicode.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Orders {

    @Id
    @SequenceGenerator(
            name = "order_id_seq",
            sequenceName = "order_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "order_id_seq"
    )
    private int orderId;

    private String clientName;

    private long clientLicenceId;

    private int clientPhoneNumber;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime orderDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date pickupDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date returnDate;

    private int totalAmount;

    private String orderStatus;

    @OneToOne(fetch = FetchType.EAGER)
    @MapsId
    @JoinColumn(name = "car_id")
    private Car car;

    public Orders() {
    }

    public Orders(Car car, LocalDateTime orderDate, Date pickupDate, Date returnDate, int totalAmount, String orderStatus) {
        this.car = car;
        this.orderDate = orderDate;
        this.pickupDate = pickupDate;
        this.returnDate = returnDate;
        this.totalAmount = totalAmount;
        this.orderStatus = orderStatus;
    }

    public int getId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public long getClientLicenceId() {
        return clientLicenceId;
    }

    public void setClientLicenceId(long clientLicenceId) {
        this.clientLicenceId = clientLicenceId;
    }

    public int getClientPhoneNumber() {
        return clientPhoneNumber;
    }

    public void setClientPhoneNumber(int clientPhoneNumber) {
        this.clientPhoneNumber = clientPhoneNumber;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public Date getPickupDate() {
        return pickupDate;
    }

    public void setPickupDate(Date pickupDate) {
        this.pickupDate = pickupDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public int getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    @Override
    public String toString() {
        return "Orders{" +
                "id=" + orderId +
                ", clientName='" + clientName + '\'' +
                ", clientLicenceId=" + clientLicenceId +
                ", clientPhoneNumber=" + clientPhoneNumber +
                ", orderDate=" + orderDate +
                ", pickupDate=" + pickupDate +
                ", returnDate=" + returnDate +
                ", totalAmount=" + totalAmount +
                ", orderStatus='" + orderStatus + '\'' +
                ", car=" + car +
                '}';
    }
}
