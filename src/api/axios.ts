import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true, // Importante para el envío de cookies en cada solicitud
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config.__isRetryRequest
    ) {
      // El token ha expirado o es inválido, intenta renovarlo
      let retries = 0;
      const maxRetries = 2;
      while (retries < maxRetries) {
        try {
          // Agrega encabezados para evitar el almacenamiento en caché de la respuesta
          const config = {
            ...error.config,
            headers: {
              ...error.config.headers,
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
              Expires: "0",
            },
          };
          await axios.get("/auth/refresh", config);
          error.config.__isRetryRequest = true;
          return axios(error.config);
        } catch (refreshError) {
          retries++;
        }
      }
      // Manejo adicional o redirigir al usuario al inicio de sesión
      return Promise.reject(error);
    }
    // Si no es un error de autorización o no se puede renovar el token, rechaza la solicitud con el error original
    return Promise.reject(error);
  }
);

export default axiosInstance;
