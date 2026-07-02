package com.smartparking.service;

import com.smartparking.entity.Vehicle;
import java.util.List;
import org.springframework.data.domain.Page;

public interface VehicleService {

    Vehicle saveVehicle(Vehicle vehicle);

    List<Vehicle> getAllVehicles();

    Vehicle getVehicleByNumber(String vehicleNumber);

    Vehicle updateVehicle(Long id, Vehicle vehicle);

    void deleteVehicle(Long id);

    List<Vehicle> getVehiclesByType(String vehicleType);

    List<Vehicle> getVehiclesByOwner(String ownerName);

    List<Vehicle> getVehiclesByMobile(String mobile);

    Page<Vehicle> getVehicles(int page, int size, String sortBy, String direction);
    
}