package com.ximicode.entity.dto;

import com.ximicode.entity.Role;

import java.util.Set;

public record UserDTO(
        int id,
        String name,
        String lastName,
        String username,
        String email,
//        byte[] profilePicture,
        long identityId,
        long licenceId,
        int phoneNumber,
        String country,
        String city,
        int zipCode,
        Set<Role> roles
) {
}
