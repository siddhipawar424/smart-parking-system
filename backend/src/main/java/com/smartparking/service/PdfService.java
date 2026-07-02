package com.smartparking.service;

public interface PdfService {

    byte[] generateReceipt(Long parkingRecordId);

}