package com.ximicode.payload.request;

import java.time.LocalDateTime;

public record AddReviewRequest(
        String message,
        int rating,
        int userId
) {
}
