import { AxiosError } from 'axios';

interface ResponseData {
  errors?: BackendErrors;
}

interface BackendErrors {
  [key: string]: string;
}

export const handleAxiosError = (error: any, setError: Function) => {
  const axiosError = error as AxiosError;
  if (axiosError.response && axiosError.response.data && typeof axiosError.response.data === 'object' && 'errors' in axiosError.response.data) {
    const responseData = axiosError.response.data as ResponseData;
    const backendErrors: BackendErrors = responseData.errors!;
    Object.keys(backendErrors).forEach(field => {
      setError(field, {
        type: "server",
        message: backendErrors[field],
      });
    });
  }
};
  
