package com.ximicode.services;

import com.ximicode.entity.ContactUs;
import com.ximicode.entity.User;
import com.ximicode.exeptions.ResourceNotFoundException;
import com.ximicode.payload.request.ContactUsRequest;
import com.ximicode.repository.ContactUsRepository;
import com.ximicode.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactUsService {

    private final ContactUsRepository contactUsRepository;
    private final UserRepository userRepository;

    public ContactUsService(ContactUsRepository contactUsRepository, UserRepository userRepository) {
        this.contactUsRepository = contactUsRepository;
        this.userRepository = userRepository;
    }

    public List<ContactUs> getAllMessages() {
        return contactUsRepository.findAll();
    }

    public ContactUs getMessage(int id) {

        ContactUs message = contactUsRepository.findById(id)
                .orElseThrow(() ->  new ResourceNotFoundException("Message with id %s not found".formatted(id)));

        return message;
    }

    public void sendContact(ContactUsRequest contactUsRequest) {

        User user = userRepository.findById(contactUsRequest.userId())
                .orElseThrow(() -> new ResourceNotFoundException("User with id %s not found".formatted(contactUsRequest.userId())));

        ContactUs contactUs = new ContactUs();
        contactUs.setName(contactUsRequest.name());
        contactUs.setEmail(contactUsRequest.email());
        contactUs.setSubject(contactUsRequest.subject());
        contactUs.setMessage(contactUsRequest.message());
        contactUs.setFromUser(user);

        contactUsRepository.save(contactUs);
    }

    public void deleteMessage(int id) {
        ContactUs message = contactUsRepository.findById(id)
                .orElseThrow(() ->  new ResourceNotFoundException("Message with id %s not found".formatted(id)));

        contactUsRepository.delete(message);

    }
}
