package com.ximicode.controllers;

import com.ximicode.entity.ContactUs;
import com.ximicode.payload.request.ContactUsRequest;
import com.ximicode.payload.response.MessageResponse;
import com.ximicode.services.ContactUsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/contact")
public class ContactUsController {

    private final ContactUsService contactUsService;

    public ContactUsController(ContactUsService contactUsService) {
        this.contactUsService = contactUsService;
    }

    @GetMapping("/all-messages")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public List<ContactUs> getAllMessages() {
        return contactUsService.getAllMessages();
    }

    @GetMapping("/message/{id}")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ContactUs getMessage(@RequestParam int id) {
        return contactUsService.getMessage(id);
    }

    @PostMapping("/send-message")
    @PreAuthorize("hasRole('USER') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<?> sendMessage(@RequestBody ContactUsRequest contactUsRequest) {

        contactUsService.sendContact(contactUsRequest);

        return new ResponseEntity<>(new MessageResponse("Message was sent successfully!"), HttpStatus.CREATED);
    }

    @DeleteMapping("delete-message/{id}")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public void deleteMessage(@RequestParam int id) {
        contactUsService.deleteMessage(id);
    }
}
