import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
   // baseURL: 'http://localhost:5000/api',
    headers: {  
    'Content-Type': 'application/json'
  }
});



api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const signup= async (data)=>{
  const response= await api.post('/auth/signup',data);
  return response.data
}

export const login =async (data) =>{
  const response= await api.post('auth/login',data);
  return response.data;
}

export const getMe = async ()=>{
  const response=await api.get('/auth/me');
  return response.data;
}

export const getDevelopers = async (params={}) => {
    const response = await api.get('/developers', { params });
    return response.data;
};

export const createDeveloper = async (developerData) => {
    const response = await api.post('/developers', developerData,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
};
export const updateDeveloper=async (id,formData)=>{
  const response=await api.put(`/developers/${id}`, formData,{
    headers:{
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data;
}
export const getDeveloperById= async (id) =>{
  const response= await api.get(`/developers/${id}`);
  return response.data;
}
export const deleteDeveloper= async (id)=>{
  const response= await api.delete(`/developers/${id}`);
  return response.data;
}

export default api;