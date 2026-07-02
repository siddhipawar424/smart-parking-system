package com.smartparking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private long totalSlots;
    private long availableSlots;
    private long occupiedSlots;
    private long totalVehicles;
    private long activeParking;
    private Double totalRevenue;
}