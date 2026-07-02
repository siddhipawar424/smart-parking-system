package com.smartparking.controller;

import com.smartparking.entity.ContactMessage;
import com.smartparking.service.ContactMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin("*")
public class ContactMessageController {

    @Autowired
    private ContactMessageService contactMessageService;

    // Submit inquiry — Public (no auth)
    @PostMapping
    public ContactMessage submitInquiry(@RequestBody ContactMessage message) {
        return contactMessageService.saveMessage(message);
    }

    // Get all inquiries — ADMIN only
    @GetMapping
    public List<ContactMessage> getAllInquiries() {
        return contactMessageService.getAllMessages();
    }

    // Update status — ADMIN only
    @PatchMapping("/{id}/status")
    public ResponseEntity<ContactMessage> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        String status = body.get("status");
        if (status == null || status.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        ContactMessage updated = contactMessageService.updateStatus(id, status.toUpperCase());
        return ResponseEntity.ok(updated);
    }

    // Delete inquiry — ADMIN only
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInquiry(@PathVariable Long id) {
        contactMessageService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }
}
