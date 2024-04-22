import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true, // Importante para el envío de cookies en cada solicitud
});

export default instance;
