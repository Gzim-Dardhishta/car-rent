package com.ximicode.controllers;

import com.ximicode.entity.User;
import com.ximicode.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Locale;
import java.util.Objects;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/user")
public class UserProfileController { ;

    private final UserRepository userRepository;

    @Value("${profile.picture.upload.dir}")
    private String uploadDir;

    public UserProfileController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public String photo() {
        return "Photo";
    }

    @PostMapping("/{id}/upload-photo")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<String> uploadProfilePicture(@PathVariable int id,
                                                       @RequestParam("file")MultipartFile file){
        try {
            // Find the user by ID
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));

            // Check if the file is empty or not
            if (file.isEmpty()) {
                throw new IllegalArgumentException("File is empty");
            }

            // Set the profile picture bytes on the user entity
            user.setProfilePicture(file.getBytes());

            // Save the updated user entity with the profile picture
            userRepository.save(user);

            return ResponseEntity.ok("Profile picture uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile picture");
        }
    }

    @GetMapping("/{id}/profile-picture")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable int id) {
        // Find the user by ID
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));

        // Retrieve the profile picture bytes from the user entity
        byte[] profilePicture = user.getProfilePicture();

        // Set the Content-Type header to indicate that the response is an image
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // You can set the appropriate image type based on your requirements

        return new ResponseEntity<>(profilePicture, headers, HttpStatus.OK);
    }
}
