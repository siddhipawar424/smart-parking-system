package com.smartparking.service.impl;

import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.smartparking.entity.ParkingRecord;
import com.smartparking.repository.ParkingRecordRepository;
import com.smartparking.service.PdfService;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfServiceImpl implements PdfService {

    private final ParkingRecordRepository parkingRecordRepository;

    public PdfServiceImpl(ParkingRecordRepository parkingRecordRepository) {
        this.parkingRecordRepository = parkingRecordRepository;
    }

    @Override
    public byte[] generateReceipt(Long parkingRecordId) {

        ParkingRecord record = parkingRecordRepository.findById(parkingRecordId)
                .orElseThrow(() -> new RuntimeException("Parking record not found"));

        try {

            Document document = new Document();

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            PdfWriter.getInstance(document, outputStream);

            document.open();

            Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);

            document.add(new Paragraph("SMART PARKING RECEIPT", titleFont));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Vehicle Number : " + record.getVehicle().getVehicleNumber()));
            document.add(new Paragraph("Owner Name : " + record.getVehicle().getOwnerName()));
            document.add(new Paragraph("Parking Slot : " + record.getParkingSlot().getSlotNumber()));
            document.add(new Paragraph("Entry Time : " + record.getEntryTime()));
            document.add(new Paragraph("Exit Time : " + record.getExitTime()));
            document.add(new Paragraph("Parking Fee : ₹" + record.getParkingFee()));

            document.close();

            return outputStream.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Unable to generate receipt.");
        }
    }
}