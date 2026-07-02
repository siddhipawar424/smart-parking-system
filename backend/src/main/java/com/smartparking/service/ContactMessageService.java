package com.smartparking.service;

import com.smartparking.entity.ContactMessage;
import java.util.List;

public interface ContactMessageService {
    ContactMessage saveMessage(ContactMessage message);
    List<ContactMessage> getAllMessages();
    ContactMessage updateStatus(Long id, String status);
    void deleteMessage(Long id);
}
