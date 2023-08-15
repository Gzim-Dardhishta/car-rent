package com.ximicode.payload.request;

import java.time.LocalDateTime;

public record EditReviewRequest(
        String message,
        int rating
) {
}
