package com.smartparking.service.impl;

import com.smartparking.dto.AnalyticsResponse;
import com.smartparking.repository.ParkingRecordRepository;
import com.smartparking.repository.ParkingSlotRepository;
import com.smartparking.service.AnalyticsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {

    private final ParkingRecordRepository recordRepository;
    private final ParkingSlotRepository slotRepository;

    public AnalyticsServiceImpl(ParkingRecordRepository recordRepository,
                                ParkingSlotRepository slotRepository) {
        this.recordRepository = recordRepository;
        this.slotRepository = slotRepository;
    }

    @Override
    public AnalyticsResponse getAnalytics() {

    List<Object[]> result = recordRepository.findMostUsedSlots();

    String mostUsedSlot = "N/A";
    long mostUsedCount = 0;

    if (!result.isEmpty()) {
        mostUsedSlot = result.get(0)[0].toString();
        mostUsedCount = (long) result.get(0)[1];
    }

    long totalSlots = slotRepository.count();
    long occupiedSlots = slotRepository.countByOccupiedTrue();

    double occupancyPercentage = totalSlots == 0 ? 0 :
            ((double) occupiedSlots / totalSlots) * 100;

    long activeParking = recordRepository.countByExitTimeIsNull();

    Double todayRevenue = recordRepository.getTodayRevenue();
    Double monthlyRevenue = recordRepository.getMonthlyRevenue();

    return new AnalyticsResponse(
            mostUsedSlot,
            mostUsedCount,
            occupancyPercentage,
            activeParking,
            todayRevenue,
            monthlyRevenue
        );
    }

}