package com.smartparking.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Vehicle number is required")
    @Column(nullable = false, unique = true)
    private String vehicleNumber;

    @NotBlank(message = "Vehicle type is required")
    @Column(nullable = false)
    private String vehicleType;

    @NotBlank(message = "Owner name is required")
    @Column(nullable = false)
    private String ownerName;

    @NotBlank(message = "Owner mobile number is required")
    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Owner mobile must contain exactly 10 digits"
    )
    @Column(nullable = false)
    private String ownerMobile;
    
}