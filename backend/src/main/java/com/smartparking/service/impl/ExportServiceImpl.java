package com.smartparking.service.impl;

import com.smartparking.entity.ParkingRecord;
import com.smartparking.repository.ParkingRecordRepository;
import com.smartparking.service.ExportService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@Service
public class ExportServiceImpl implements ExportService {

    private final ParkingRecordRepository repository;

    public ExportServiceImpl(ParkingRecordRepository repository) {
        this.repository = repository;
    }

    @Override
    public void exportParkingRecordsToCSV(HttpServletResponse response) throws IOException {

        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=parking_records.csv");

        PrintWriter writer = response.getWriter();

        // CSV Header
        writer.println("ID,Vehicle Number,Slot Number,Entry Time,Exit Time,Fee");

        List<ParkingRecord> records = repository.findAll();

        for (ParkingRecord r : records) {

            String vehicleNumber = r.getVehicle().getVehicleNumber();
            String slotNumber = r.getParkingSlot().getSlotNumber();

            writer.println(
                    r.getId() + "," +
                    vehicleNumber + "," +
                    slotNumber + "," +
                    r.getEntryTime() + "," +
                    r.getExitTime() + "," +
                    r.getParkingFee()
            );
        }

        writer.flush();
        writer.close();
    }
}