import api from './api';

const parkingService = {
  parkVehicle: async (vehicleId) => {
    const response = await api.post(`/api/parking/park/${vehicleId}`);
    return response.data;
  },

  exitVehicle: async (vehicleId) => {
    const response = await api.post(`/api/parking/exit/${vehicleId}`);
    return response.data;
  },

  getAllRecords: async () => {
    const response = await api.get('/api/parking');
    return response.data;
  },

  getHistoryByVehicleId: async (vehicleId) => {
    const response = await api.get(`/api/parking/history/id/${vehicleId}`);
    return response.data;
  },

  getHistoryByVehicleNumber: async (vehicleNumber) => {
    const response = await api.get(`/api/parking/history/number/${vehicleNumber}`);
    return response.data;
  },

  downloadReceipt: async (parkingRecordId) => {
    const response = await api.get(`/api/parking/receipt/${parkingRecordId}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  exportCSV: async () => {
    const response = await api.get('/api/export/csv', {
      responseType: 'blob',
    });
    return response.data;
  },
};

export default parkingService;
