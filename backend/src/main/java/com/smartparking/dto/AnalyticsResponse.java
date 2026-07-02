package com.smartparking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponse {

    private String mostUsedSlot;
    private long mostUsedCount;

    private double occupancyPercentage;

    private long activeParking;

    private Double todayRevenue;

    private Double monthlyRevenue;
}