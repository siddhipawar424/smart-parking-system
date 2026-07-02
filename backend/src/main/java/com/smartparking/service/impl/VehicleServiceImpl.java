package com.smartparking.service.impl;

import com.smartparking.entity.Vehicle;
import com.smartparking.repository.VehicleRepository;
import com.smartparking.service.VehicleService;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Service
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleServiceImpl(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @Override
    public Vehicle saveVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    @Override
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    @Override
    public Vehicle getVehicleByNumber(String vehicleNumber) {

        return vehicleRepository.findByVehicleNumber(vehicleNumber)
        .orElseThrow(() -> new RuntimeException("Vehicle not found"));

    }

    @Override
    public Vehicle updateVehicle(Long id, Vehicle vehicle) {

        Vehicle existing = vehicleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        existing.setVehicleNumber(vehicle.getVehicleNumber());
        existing.setVehicleType(vehicle.getVehicleType());
        existing.setOwnerName(vehicle.getOwnerName());
        existing.setOwnerMobile(vehicle.getOwnerMobile());

        return vehicleRepository.save(existing);
    }

    @Override
    public void deleteVehicle(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        vehicleRepository.delete(vehicle);
    }

    @Override
    public List<Vehicle> getVehiclesByType(String vehicleType) {
        return vehicleRepository.findByVehicleType(vehicleType);
    }

    @Override
    public List<Vehicle> getVehiclesByOwner(String ownerName) {
        return vehicleRepository.findByOwnerNameContainingIgnoreCase(ownerName);
    }

    @Override
    public List<Vehicle> getVehiclesByMobile(String mobile) {
        return vehicleRepository.findByOwnerMobile(mobile);
    }

    @Override
    public Page<Vehicle> getVehicles(int page, int size, String sortBy, String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
            ? Sort.by(sortBy).descending()
            : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return vehicleRepository.findAll(pageable);
    }
    
}