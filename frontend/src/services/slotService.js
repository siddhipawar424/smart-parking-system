import api from './api';

const slotService = {
  getAllSlots: async () => {
    const response = await api.get('/api/slots');
    return response.data;
  },

  getAvailableSlots: async () => {
    const response = await api.get('/api/slots/available');
    return response.data;
  },

  getSlot: async (slotNumber) => {
    const response = await api.get(`/api/slots/${slotNumber}`);
    return response.data;
  },

  addSlot: async (slot) => {
    const response = await api.post('/api/slots', slot);
    return response.data;
  },

  updateSlot: async (id, slot) => {
    const response = await api.put(`/api/slots/${id}`, slot);
    return response.data;
  },

  deleteSlot: async (id) => {
    const response = await api.delete(`/api/slots/${id}`);
    return response.data;
  },
};

export default slotService;
