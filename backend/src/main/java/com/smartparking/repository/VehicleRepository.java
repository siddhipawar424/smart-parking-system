package com.smartparking.repository;

import com.smartparking.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    Optional<Vehicle> findByVehicleNumber(String vehicleNumber);

    List<Vehicle> findByVehicleType(String vehicleType);

    List<Vehicle> findByOwnerNameContainingIgnoreCase(String ownerName);

    List<Vehicle> findByOwnerMobile(String ownerMobile);

}