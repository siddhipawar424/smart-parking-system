package com.smartparking.controller;

import com.smartparking.service.ExportService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/export")
public class ExportController {

    private final ExportService exportService;

    public ExportController(ExportService exportService) {
        this.exportService = exportService;
    }

    @GetMapping("/csv")
    public void exportCSV(HttpServletResponse response) throws IOException {
        exportService.exportParkingRecordsToCSV(response);
    }
}