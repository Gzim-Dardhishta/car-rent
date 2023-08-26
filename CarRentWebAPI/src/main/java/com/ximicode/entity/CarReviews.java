package com.ximicode.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class CarReviews {
    @Id
    @SequenceGenerator(
            name = "carReview_id_seq",
            sequenceName = "carReview_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "carReview_id_seq"
    )
    private int reviewId;
    private String message;
    private int rating;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime dateSubmitted;

    @OneToOne(fetch = FetchType.EAGER)
    @MapsId
    @JoinColumn(name = "user_id")
    private User fromUser;

    public CarReviews() {}

    public CarReviews(String message, int rating, User user) {
        this.message = message;
        this.rating = rating;
        this.fromUser = user;
        this.dateSubmitted = LocalDateTime.now();
    }

    public int getReviewId() {
        return reviewId;
    }

    public void setReviewId(int reviewId) {
        this.reviewId = reviewId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public User getFromUser() {
        return fromUser;
    }

    public void setFromUser(com.ximicode.entity.User fromUser) {
        this.fromUser = fromUser;
    }

    public LocalDateTime getDateSubmitted() {
        return dateSubmitted;
    }

    public void setDateSubmitted(LocalDateTime dateSubmitted) {
        this.dateSubmitted = dateSubmitted;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CarReviews that)) return false;
        return Objects.equals(reviewId, that.reviewId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(reviewId);
    }

    @Override
    public String toString() {
        return "CarReviews{" +
                "reviewId=" + reviewId +
                ", message='" + message + '\'' +
                ", rating=" + rating +
                ", fromUser=" + fromUser +
                ", dateSubmitted=" + dateSubmitted +
                '}';
    }
}
