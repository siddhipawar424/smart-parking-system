package com.smartparking.service;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface ExportService {

    void exportParkingRecordsToCSV(HttpServletResponse response) throws IOException;
}