package com.smartparking.service.impl;

import com.smartparking.entity.ParkingSlot;
import com.smartparking.repository.ParkingSlotRepository;
import com.smartparking.service.ParkingSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkingSlotServiceImpl implements ParkingSlotService {

    @Autowired
    private ParkingSlotRepository parkingSlotRepository;

   @Override
   public ParkingSlot saveSlot(ParkingSlot parkingSlot) {

        if (parkingSlotRepository.findBySlotNumber(parkingSlot.getSlotNumber()).isPresent()) {
            throw new RuntimeException("Slot number already exists");
        }

        return parkingSlotRepository.save(parkingSlot);
    }

    @Override
    public List<ParkingSlot> getAllSlots() {
        return parkingSlotRepository.findAll();
    }

    @Override
    public List<ParkingSlot> getAvailableSlots() {
        return parkingSlotRepository.findByOccupiedFalse();
    }

    @Override
    public ParkingSlot getSlotByNumber(String slotNumber) {
        return parkingSlotRepository.findBySlotNumber(slotNumber)
                .orElseThrow(() -> new RuntimeException("Slot not found"));
    }

    @Override
    public ParkingSlot updateSlot(Long id, ParkingSlot parkingSlot) {

        ParkingSlot slot = parkingSlotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        slot.setSlotNumber(parkingSlot.getSlotNumber());
        slot.setSlotType(parkingSlot.getSlotType());
        slot.setOccupied(parkingSlot.isOccupied());

        return parkingSlotRepository.save(slot);
    }

    @Override
    public void deleteSlot(Long id) {

        ParkingSlot slot = parkingSlotRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Slot not found"));

        parkingSlotRepository.delete(slot);
    }

    @Override
    public ParkingSlot getSlotById(Long id) {

        return parkingSlotRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Slot not found"));
    }

}