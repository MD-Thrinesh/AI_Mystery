import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') || '/api/v1',
  timeout: 15000,
});

export const createMystery = async (payload) => {
  const { data } = await api.post('/mysteries', payload);
  return data;
};

export const getMysteryStatus = async (mysteryId) => {
  const { data } = await api.get(`/mysteries/${mysteryId}/status`);
  return data;
};

export const getMystery = async (mysteryId) => {
  const { data } = await api.get(`/mysteries/${mysteryId}`);
  return data;
};

export const getEvidence = async (mysteryId) => {
  const { data } = await api.get(`/mysteries/${mysteryId}/evidence`);
  return data;
};

export const createSession = async (mysteryId) => {
  const { data } = await api.post(`/mysteries/${mysteryId}/sessions`);
  return data;
};

export const updateProgress = async (sessionId, payload) => {
  const { data } = await api.patch(`/sessions/${sessionId}/progress`, payload);
  return data;
};

export const submitAccusation = async (sessionId, suspectId) => {
  const { data } = await api.post(`/sessions/${sessionId}/accusation`, { suspectId });
  return data;
};

export const getSolution = async (sessionId) => {
  const { data } = await api.get(`/sessions/${sessionId}/solution`);
  return data;
};

export default api;
