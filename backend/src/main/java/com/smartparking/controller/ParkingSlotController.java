package com.smartparking.controller;

import com.smartparking.entity.ParkingSlot;
import com.smartparking.service.ParkingSlotService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/slots")
public class ParkingSlotController {

    private final ParkingSlotService parkingSlotService;

    public ParkingSlotController(ParkingSlotService parkingSlotService) {
        this.parkingSlotService = parkingSlotService;
    }

    @PostMapping
    public ParkingSlot addSlot(@RequestBody ParkingSlot parkingSlot) {
        return parkingSlotService.saveSlot(parkingSlot);
    }

    @GetMapping
    public List<ParkingSlot> getAllSlots() {
        return parkingSlotService.getAllSlots();
    }

    @GetMapping("/available")
    public List<ParkingSlot> getAvailableSlots() {
        return parkingSlotService.getAvailableSlots();
    }

    @GetMapping("/{slotNumber}")
    public ParkingSlot getSlot(@PathVariable String slotNumber) {
        return parkingSlotService.getSlotByNumber(slotNumber);
    }

    @PutMapping("/{id}")
    public ParkingSlot updateSlot(@PathVariable Long id,
                                  @RequestBody ParkingSlot slot) {
        return parkingSlotService.updateSlot(id, slot);
    }

    @DeleteMapping("/{id}")
    public String deleteSlot(@PathVariable Long id) {
        parkingSlotService.deleteSlot(id);
        return "Slot deleted successfully";
    }
}