package com.ximicode.entity.dto;

import com.ximicode.entity.User;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserDTOMapper implements Function<User, UserDTO> {


    @Override
    public UserDTO apply(User user) {
        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getLastName(),
                user.getUsername(),
                user.getEmail(),
//                user.getProfilePicture(),
                user.getIdentityId(),
                user.getLicenceId(),
                user.getPhoneNumber(),
                user.getCountry(),
                user.getCity(),
                user.getZipCode(),
                user.getRoles()
        );
    }
}
