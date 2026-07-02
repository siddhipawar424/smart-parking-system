import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { decodeToken, isTokenExpired } from '../utils/jwt';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from local storage on mount
  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        if (isTokenExpired(storedToken)) {
          // Token expired, clean up
          localStorage.removeItem('token');
          setUser(null);
          setToken(null);
        } else {
          // Token valid, extract user details
          const decoded = decodeToken(storedToken);
          if (decoded) {
            setToken(storedToken);
            setUser({
              email: decoded.sub,
              role: decoded.role,
            });
          }
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Login handler
  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      const { token } = data;
      if (token) {
        localStorage.setItem('token', token);
        const decoded = decodeToken(token);
        setToken(token);
        const userObj = {
          email: decoded.sub,
          role: decoded.role,
        };
        setUser(userObj);
        return { success: true, user: userObj };
      } else {
        throw new Error('No token returned from server');
      }
    } catch (error) {
      console.error('Login error in AuthContext:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Login failed';
      return { success: false, error: errorMsg };
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Register handler
  const registerUser = async (fullName, email, password, confirmPassword, role) => {
    try {
      const data = await authService.register(fullName, email, password, confirmPassword, role);
      return { success: true, data };
    } catch (error) {
      console.error('Registration error in AuthContext:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Registration failed';
      return { success: false, error: errorMsg };
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};
