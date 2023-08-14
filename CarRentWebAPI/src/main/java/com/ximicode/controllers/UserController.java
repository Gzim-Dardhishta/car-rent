package com.ximicode.controllers;

import com.ximicode.entity.ERole;
import com.ximicode.entity.Role;
import com.ximicode.entity.User;
import com.ximicode.entity.dto.UserDTO;
import com.ximicode.entity.dto.UserDTOMapper;
import com.ximicode.exeptions.DuplicateResourceException;
import com.ximicode.exeptions.ResourceNotFoundException;
import com.ximicode.payload.response.MessageResponse;
import com.ximicode.repository.RoleRepository;
import com.ximicode.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserDTOMapper userDTOMapper;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, RoleRepository roleRepository, UserDTOMapper userDTOMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userDTOMapper = userDTOMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/all-users")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public Iterable<UserDTO> getAllUsers(){
        return userRepository.findAll()
                .stream()
                .map(userDTOMapper)
                .collect(Collectors.toList());
    }

    @GetMapping("/user/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public Optional<UserDTO> getUserById(@PathVariable int id) {
        return Optional.ofNullable(userRepository.findById(id)
                .map(userDTOMapper)
                .orElseThrow(() -> new ResourceNotFoundException("User with id %s not found".formatted(id))));
    }

    public record AddUserRecord(
            String name,
            String lastName,
            String username,
            String password,
            String email,
            long identityId,
            long licenceId,
            int phoneNumber,
            String country,
            String city,
            int zipCode,
            Set<String> roles
    ){}

    @PostMapping("/add-user")
    @ResponseStatus(code = HttpStatus.CREATED)
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> addUser(@RequestBody AddUserRecord addUser) {

        String username = addUser.username();
        String email = addUser.email();
        if (userRepository.existsByUsername(username)) {
            throw new DuplicateResourceException("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(email)) {
            throw new DuplicateResourceException("Error: Email is already taken!");
        }

        User newUser = new User(
                addUser.name(),
                addUser.lastName(),
                addUser.username(),
                addUser.email(),
                passwordEncoder.encode(addUser.password()),
                addUser.identityId(),
                addUser.licenceId(),
                addUser.phoneNumber(),
                addUser.country(),
                addUser.city(),
                addUser.zipCode()
        );

        Set<Role> roles = new HashSet<>();

        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new ResourceNotFoundException("Error: Role is not found."));
        roles.add(userRole);

        newUser.setRoles(roles);

        userRepository.save(newUser);

        return ResponseEntity.ok(new MessageResponse("User created successfully!"));
    }

    public record EditUserRecord(
            String name,
            String lastName,
            String email,
            long identityId,
            long licenceId,
            int phoneNumber,
            String country,
            String city,
            int zipCode
    ){}

    @PutMapping("/user/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> editUser(@PathVariable int id, @RequestBody EditUserRecord editUserRecord) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));


        user.setName(editUserRecord.name);
        user.setLastName(editUserRecord.lastName);
        user.setEmail(editUserRecord.email);
        user.setIdentityId(editUserRecord.identityId);
        user.setLicenceId(editUserRecord.licenceId);
        user.setPhoneNumber(editUserRecord.phoneNumber);
        user.setCountry(editUserRecord.country);
        user.setCity(editUserRecord.city);
        user.setZipCode(editUserRecord.zipCode);

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User credentials updated successfully!!!"));
    }

    @DeleteMapping("/delete-user/{id}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        userRepository.delete(user);

        return ResponseEntity.ok(new MessageResponse("User with id %s was deleted".formatted(id)));
    }


    @PostMapping("/user/{id}/upload-photo")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<String> uploadProfilePicture(@PathVariable int id,
                                                       @RequestParam("file") MultipartFile file){
        try {
            // Find the user by ID
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("User with id [%s] not found".formatted(id)));

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

    @GetMapping("/user/{id}/profile-picture")
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
