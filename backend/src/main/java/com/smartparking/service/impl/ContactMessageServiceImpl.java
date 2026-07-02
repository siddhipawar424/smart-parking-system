package com.smartparking.service.impl;

import com.smartparking.entity.ContactMessage;
import com.smartparking.repository.ContactMessageRepository;
import com.smartparking.service.ContactMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ContactMessageServiceImpl implements ContactMessageService {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @Override
    public ContactMessage saveMessage(ContactMessage message) {
        message.setSubmittedAt(LocalDateTime.now());
        message.setStatus("PENDING");
        return contactMessageRepository.save(message);
    }

    @Override
    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAll();
    }

    @Override
    public ContactMessage updateStatus(Long id, String status) {
        ContactMessage msg = contactMessageRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Inquiry not found with id: " + id));
        msg.setStatus(status);
        return contactMessageRepository.save(msg);
    }

    @Override
    public void deleteMessage(Long id) {
        contactMessageRepository.deleteById(id);
    }
}
