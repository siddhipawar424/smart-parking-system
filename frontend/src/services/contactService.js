import api from './api';

const contactService = {
  // Public - no auth required
  submitContact: async (data) => {
    const response = await api.post('/api/contact', data);
    return response.data;
  },

  // Admin only
  getAllInquiries: async () => {
    const response = await api.get('/api/contact');
    return response.data;
  },

  // Admin only - Update status (PENDING, IN_PROGRESS, SOLVED)
  updateInquiryStatus: async (id, status) => {
    const response = await api.patch(`/api/contact/${id}/status`, { status });
    return response.data;
  },

  // Admin only - Delete message log
  deleteInquiry: async (id) => {
    const response = await api.delete(`/api/contact/${id}`);
    return response.data;
  },
};

export default contactService;
