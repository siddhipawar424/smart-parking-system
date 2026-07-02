package com.smartparking.controller;

import com.smartparking.entity.ParkingRecord;
import com.smartparking.service.ParkingRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.smartparking.service.PdfService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/parking")
@CrossOrigin("*")
public class ParkingRecordController {

    @Autowired
    private ParkingRecordService parkingRecordService;

    @Autowired
    private PdfService pdfService;

    // Park a Vehicle
    @PostMapping("/park/{vehicleId}")
    public ParkingRecord parkVehicle(@PathVariable Long vehicleId) {
        return parkingRecordService.parkVehicle(vehicleId);
    }

    // Get All Parking Records
    @GetMapping
    public List<ParkingRecord> getAllRecords() {
        return parkingRecordService.getAllRecords();
    }

    // Exit Vehicle
    @PostMapping("/exit/{vehicleId}")
    public ParkingRecord exitVehicle(@PathVariable Long vehicleId) {
        return parkingRecordService.exitVehicle(vehicleId);
    }

    // Get Parking History by Vehicle ID
    @GetMapping("/history/id/{vehicleId}")
    public List<ParkingRecord> getHistoryById(@PathVariable Long vehicleId) {
        return parkingRecordService.getHistoryByVehicle(vehicleId);
    }

    // Get Parking History by Vehicle Number
    @GetMapping("/history/number/{vehicleNumber}")
    public List<ParkingRecord> getHistoryByNumber(@PathVariable String vehicleNumber) {
        return parkingRecordService.getVehicleHistory(vehicleNumber);
    }

    @GetMapping("/receipt/{parkingRecordId}")
    public ResponseEntity<byte[]> downloadReceipt(
        @PathVariable Long parkingRecordId) {

        byte[] pdf = pdfService.generateReceipt(parkingRecordId);

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=ParkingReceipt.pdf")
            .contentType(MediaType.APPLICATION_PDF)
            .body(pdf);
    }

}