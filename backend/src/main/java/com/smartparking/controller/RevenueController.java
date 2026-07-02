package com.smartparking.controller;

import com.smartparking.service.RevenueService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/reports/revenue")
public class RevenueController {

    private final RevenueService revenueService;

    public RevenueController(RevenueService revenueService) {
        this.revenueService = revenueService;
    }

    @GetMapping("/today")
    public Double todayRevenue() {
        return revenueService.getTodayRevenue();
    }

    @GetMapping("/month")
    public Double monthlyRevenue() {
        return revenueService.getMonthlyRevenue();
    }

    @GetMapping
    public Double betweenDates(
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end) {

        return revenueService.getRevenueBetweenDates(start, end);
    }
}