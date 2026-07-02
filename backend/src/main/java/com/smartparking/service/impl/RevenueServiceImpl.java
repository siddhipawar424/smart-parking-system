package com.smartparking.service.impl;

import com.smartparking.repository.ParkingRecordRepository;
import com.smartparking.service.RevenueService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class RevenueServiceImpl implements RevenueService {

    private final ParkingRecordRepository repository;

    public RevenueServiceImpl(ParkingRecordRepository repository) {
        this.repository = repository;
    }

    @Override
    public Double getTodayRevenue() {
        return repository.getTodayRevenue();
    }

    @Override
    public Double getMonthlyRevenue() {
        return repository.getMonthlyRevenue();
    }

    @Override
    public Double getRevenueBetweenDates(LocalDateTime start, LocalDateTime end) {
        return repository.getRevenueBetweenDates(start, end);
    }
}