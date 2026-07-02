package com.smartparking.repository;

import com.smartparking.entity.ParkingRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

public interface ParkingRecordRepository extends JpaRepository<ParkingRecord, Long> {

    Optional<ParkingRecord> findByVehicleIdAndExitTimeIsNull(Long vehicleId);

    List<ParkingRecord> findByVehicleVehicleNumber(String vehicleNumber);

    long countByExitTimeIsNull();

    @Query("SELECT COALESCE(SUM(p.parkingFee), 0) FROM ParkingRecord p")
    Double getTotalRevenue();

    List<ParkingRecord> findByVehicleId(Long vehicleId);

    // Revenue between dates
    @Query("SELECT COALESCE(SUM(p.parkingFee), 0) FROM ParkingRecord p " +
       "WHERE p.exitTime BETWEEN :start AND :end")
    Double getRevenueBetweenDates(LocalDateTime start, LocalDateTime end);

    // Today's revenue
    @Query("SELECT COALESCE(SUM(p.parkingFee), 0) FROM ParkingRecord p " +
       "WHERE DATE(p.exitTime) = CURRENT_DATE")
    Double getTodayRevenue();

    // Monthly revenue
    @Query("SELECT COALESCE(SUM(p.parkingFee), 0) FROM ParkingRecord p " +
       "WHERE MONTH(p.exitTime) = MONTH(CURRENT_DATE) " +
       "AND YEAR(p.exitTime) = YEAR(CURRENT_DATE)")
    Double getMonthlyRevenue();

    @Query("SELECT p.parkingSlot.slotNumber, COUNT(p) " +
       "FROM ParkingRecord p " +
       "GROUP BY p.parkingSlot.slotNumber " +
       "ORDER BY COUNT(p) DESC")
    List<Object[]> findMostUsedSlots();
    
}