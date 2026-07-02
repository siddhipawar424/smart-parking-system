package com.smartparking.service;

import java.time.LocalDateTime;

public interface RevenueService {

    Double getTodayRevenue();

    Double getMonthlyRevenue();

    Double getRevenueBetweenDates(LocalDateTime start, LocalDateTime end);
}