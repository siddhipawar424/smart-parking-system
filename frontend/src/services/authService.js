import api from './api';

const authService = {
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', {
      username: email,
      password: password,
    });
    return response.data;
  },

  register: async (fullName, email, password, confirmPassword, role) => {
    const response = await api.post('/api/auth/register', {
      fullName,
      email,
      password,
      confirmPassword,
      role,
    });
    return response.data;
  },
};

export default authService;
