package com.smartparking.controller;

import com.smartparking.dto.LoginRequest;
import com.smartparking.dto.LoginResponse;
import com.smartparking.dto.UserRegistrationDto;
import com.smartparking.entity.User;
import com.smartparking.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/register")
    public User register(@RequestBody UserRegistrationDto request) {
        return authService.register(request);
    }
}