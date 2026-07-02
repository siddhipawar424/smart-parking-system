package com.smartparking.repository;

import com.smartparking.entity.ParkingSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {

    List<ParkingSlot> findByOccupiedFalse();

    Optional<ParkingSlot> findFirstByOccupiedFalse();

    Optional<ParkingSlot> findBySlotNumber(String slotNumber);

    long countByOccupiedTrue();

    long countByOccupiedFalse();

    List<ParkingSlot> findByOccupiedFalseAndSlotType(String slotType);
}