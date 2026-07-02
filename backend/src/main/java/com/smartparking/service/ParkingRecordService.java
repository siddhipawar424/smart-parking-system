package com.smartparking.service;

import com.smartparking.entity.ParkingRecord;

import java.util.List;

public interface ParkingRecordService {

    ParkingRecord parkVehicle(Long vehicleId);

    List<ParkingRecord> getAllRecords();

    ParkingRecord exitVehicle(Long vehicleId);

    List<ParkingRecord> getVehicleHistory(String vehicleNumber);

    List<ParkingRecord> getHistoryByVehicle(Long vehicleId);
    
}