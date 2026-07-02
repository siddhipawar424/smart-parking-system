import api from './api';

const vehicleService = {
  getAllVehicles: async () => {
    const response = await api.get('/api/vehicles');
    return response.data;
  },

  getVehiclesPage: async (page = 0, size = 5, sortBy = 'id', direction = 'asc') => {
    const response = await api.get('/api/vehicles/page', {
      params: {
        page,
        size,
        sortBy,
        direction,
      },
    });
    return response.data;
  },

  saveVehicle: async (vehicle) => {
    const response = await api.post('/api/vehicles', vehicle);
    return response.data;
  },

  updateVehicle: async (id, vehicle) => {
    const response = await api.put(`/api/vehicles/${id}`, vehicle);
    return response.data;
  },

  deleteVehicle: async (id) => {
    const response = await api.delete(`/api/vehicles/${id}`);
    return response.data;
  },

  searchVehicle: async (vehicleNumber) => {
    const response = await api.get(`/api/vehicles/search/${vehicleNumber}`);
    return response.data;
  },
};

export default vehicleService;
