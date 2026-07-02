package com.smartparking.service;

import com.smartparking.entity.ParkingSlot;

import java.util.List;

public interface ParkingSlotService {

    ParkingSlot saveSlot(ParkingSlot parkingSlot);

    List<ParkingSlot> getAllSlots();

    List<ParkingSlot> getAvailableSlots();

    ParkingSlot getSlotByNumber(String slotNumber);

    ParkingSlot updateSlot(Long id, ParkingSlot parkingSlot);

    void deleteSlot(Long id);

    ParkingSlot getSlotById(Long id);
}