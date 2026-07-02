package com.smartparking.service.impl;

import com.smartparking.dto.DashboardResponse;
import com.smartparking.repository.ParkingRecordRepository;
import com.smartparking.repository.ParkingSlotRepository;
import com.smartparking.repository.VehicleRepository;
import com.smartparking.service.DashboardService;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final ParkingSlotRepository slotRepository;
    private final VehicleRepository vehicleRepository;
    private final ParkingRecordRepository recordRepository;

    public DashboardServiceImpl(
            ParkingSlotRepository slotRepository,
            VehicleRepository vehicleRepository,
            ParkingRecordRepository recordRepository) {

        this.slotRepository = slotRepository;
        this.vehicleRepository = vehicleRepository;
        this.recordRepository = recordRepository;
    }

    @Override
    public DashboardResponse getDashboard() {

        long totalSlots = slotRepository.count();

        long occupiedSlots = slotRepository.countByOccupiedTrue();

        long availableSlots = slotRepository.countByOccupiedFalse();

        long totalVehicles = vehicleRepository.count();

        long activeParking = recordRepository.countByExitTimeIsNull();

        Double totalRevenue =
        recordRepository.getTotalRevenue() == null
                ? 0.0
                : recordRepository.getTotalRevenue();

        return new DashboardResponse(
                totalSlots,
                availableSlots,
                occupiedSlots,
                totalVehicles,
                activeParking,
                totalRevenue
        );
    }
}