import api from './api';

const dashboardService = {
  getDashboard: async () => {
    const response = await api.get('/api/dashboard');
    return response.data;
  },

  getAnalytics: async () => {
    const response = await api.get('/api/analytics');
    return response.data;
  },
};

export default dashboardService;
