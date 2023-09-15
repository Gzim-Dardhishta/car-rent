package com.ximicode.payload.request;

public record ContactUsRequest(
        String name,

        String email,

        String subject,

        String message,

        int userId

) {
}
