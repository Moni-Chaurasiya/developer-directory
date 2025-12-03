import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {  
    'Content-Type': 'application/json'
  }
});
export const getDevelopers = async (params={}) => {
    const response = await api.get('/developers', { params });
    return response.data;
};
export const createDeveloper = async (developerData) => {
    const response = await api.post('/developers', developerData);
    return response.data;
};
export default api;