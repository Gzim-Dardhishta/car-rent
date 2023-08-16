package com.ximicode.payload.request;

public record ContactUsRequest(
        String name,

        String subject,

        String message,

        int userId

) {
}
