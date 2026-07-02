package com.smartparking.controller;

import com.smartparking.entity.Vehicle;
import com.smartparking.service.VehicleService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.data.domain.Page;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    @PostMapping
    public Vehicle saveVehicle(@Valid @RequestBody Vehicle vehicle) {
        return vehicleService.saveVehicle(vehicle);
    }

    @GetMapping("/search/{vehicleNumber}")
    public Vehicle searchVehicle(@PathVariable String vehicleNumber) {
        return vehicleService.getVehicleByNumber(vehicleNumber);
    }

    @PutMapping("/{id}")
    public Vehicle updateVehicle(
            @PathVariable Long id,
            @RequestBody Vehicle vehicle) {

        return vehicleService.updateVehicle(id, vehicle);
    }

    @DeleteMapping("/{id}")
    public String deleteVehicle(@PathVariable Long id) {

        vehicleService.deleteVehicle(id);

        return "Vehicle deleted successfully";
    }

    @GetMapping("/type/{type}")
    public List<Vehicle> getByType(@PathVariable String type) {
        return vehicleService.getVehiclesByType(type);
    }

    @GetMapping("/owner/{owner}")
    public List<Vehicle> getByOwner(@PathVariable String owner) {
        return vehicleService.getVehiclesByOwner(owner);
    }

    @GetMapping("/mobile/{mobile}")
    public List<Vehicle> getByMobile(@PathVariable String mobile) {
        return vehicleService.getVehiclesByMobile(mobile);
    }

    @GetMapping("/page")
    public Page<Vehicle> getVehicles(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(defaultValue = "id") String sortBy,
        @RequestParam(defaultValue = "asc") String direction) {

        return vehicleService.getVehicles(page, size, sortBy, direction);
    }

}