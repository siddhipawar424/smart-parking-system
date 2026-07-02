package com.smartparking.service.impl;

import com.smartparking.entity.ParkingRecord;
import com.smartparking.entity.ParkingSlot;
import com.smartparking.entity.Vehicle;
import com.smartparking.repository.ParkingRecordRepository;
import com.smartparking.repository.ParkingSlotRepository;
import com.smartparking.repository.VehicleRepository;
import com.smartparking.service.ParkingRecordService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ParkingRecordServiceImpl implements ParkingRecordService {

    private final ParkingRecordRepository parkingRecordRepository;
    private final ParkingSlotRepository parkingSlotRepository;
    private final VehicleRepository vehicleRepository;

    public ParkingRecordServiceImpl(
        ParkingRecordRepository parkingRecordRepository,
        ParkingSlotRepository parkingSlotRepository,
        VehicleRepository vehicleRepository) {

        this.parkingRecordRepository = parkingRecordRepository;
        this.parkingSlotRepository = parkingSlotRepository;
        this.vehicleRepository = vehicleRepository;
    }

    @Override
    public ParkingRecord parkVehicle(Long vehicleId) {

        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        if (parkingRecordRepository.findByVehicleIdAndExitTimeIsNull(vehicleId).isPresent()) {
            throw new RuntimeException("Vehicle is already parked");
        }

        ParkingSlot slot = parkingSlotRepository.findFirstByOccupiedFalse()
                .orElseThrow(() -> new RuntimeException("Parking Full"));

        slot.setOccupied(true);
        parkingSlotRepository.save(slot);

        ParkingRecord record = new ParkingRecord();
        record.setVehicle(vehicle);
        record.setParkingSlot(slot);
        record.setEntryTime(LocalDateTime.now());

        return parkingRecordRepository.save(record);
    }

    @Override
    public List<ParkingRecord> getAllRecords() {
        return parkingRecordRepository.findAll();
    }

    @Override
public ParkingRecord exitVehicle(Long vehicleId) {

        ParkingRecord record = parkingRecordRepository
            .findByVehicleIdAndExitTimeIsNull(vehicleId)
            .orElseThrow(() -> new RuntimeException("Vehicle is not parked"));

        record.setExitTime(LocalDateTime.now());

        long hours = java.time.Duration.between(
                record.getEntryTime(),
                record.getExitTime()
        ).toHours();

        if (hours == 0) {
            hours = 1;
        }

        record.setParkingFee(hours * 50.0);

        ParkingSlot slot = record.getParkingSlot();
        slot.setOccupied(false);
        parkingSlotRepository.save(slot);

        ParkingRecord savedRecord = parkingRecordRepository.save(record);

        return savedRecord;
    }

    @Override
    public List<ParkingRecord> getVehicleHistory(String vehicleNumber) {
        return parkingRecordRepository.findByVehicleVehicleNumber(vehicleNumber);
    }

    @Override
    public List<ParkingRecord> getHistoryByVehicle(Long vehicleId) {
        return parkingRecordRepository.findByVehicleId(vehicleId);
    }
}