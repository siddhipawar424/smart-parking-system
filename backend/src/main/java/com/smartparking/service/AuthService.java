package com.smartparking.service;

import com.smartparking.dto.LoginRequest;
import com.smartparking.dto.LoginResponse;

import com.smartparking.dto.UserRegistrationDto;
import com.smartparking.entity.User;

public interface AuthService {

    LoginResponse login(LoginRequest request);
    User register(UserRegistrationDto request);

}