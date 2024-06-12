import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import {
  fetchUsuarios as fetchUsuariosAPI,
  fetchUsuarioById as fetchUsuarioByIdAPI,
  createUsuario as createUsuarioAPI,
  updateUsuario as updateUsuarioAPI,
  deleteUsuario as deleteUsuarioAPI
} from '../api/usuario.api';
import { Usuario, FetchParams } from '../interfaces';

type UseUsuariosReturn = {
  usuarios: Usuario[];
  total: number;
  loading: boolean;
  error: AxiosError | null;
  fetchUsuarios: (params?: FetchParams) => Promise<void>;
  fetchUsuarioById: (id: string) => Promise<Usuario | null>;
  createUsuario: (newUsuario: Omit<Usuario, 'id'>) => Promise<void>;
  updateUsuario: (id: string, updatedUsuario: Omit<Usuario, 'id'>) => Promise<void>;
  deleteUsuario: (id: string) => Promise<void>;
};

const useUsuarios = (): UseUsuariosReturn => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchUsuarios = useCallback(async (params: FetchParams = {}) => {
    setLoading(true);
    try {
      const { data, total } = await fetchUsuariosAPI(params);
      setUsuarios(data);
      setTotal(total);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUsuarioById = async (id: string): Promise<Usuario | null> => {
    setLoading(true);
    try {
      const data = await fetchUsuarioByIdAPI(id);
      setError(null);
      return data;
    } catch (err) {
      setError(err as AxiosError);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createUsuario = async (newUsuario: Omit<Usuario, 'id'>) => {
    setLoading(true);
    try {
      const data = await createUsuarioAPI(newUsuario);
      setUsuarios((prev) => [...prev, data]);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const updateUsuario = async (id: string, updatedUsuario: Omit<Usuario, 'id'>) => {
    setLoading(true);
    try {
      const data = await updateUsuarioAPI(id, updatedUsuario);
      setUsuarios((prev) =>
        prev.map((usuario) => (usuario.id === id ? data : usuario))
      );
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const deleteUsuario = async (id: string) => {
    setLoading(true);
    try {
      await deleteUsuarioAPI(id);
      setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  return { usuarios, total, loading, error, fetchUsuarios, fetchUsuarioById, createUsuario, updateUsuario, deleteUsuario };
};

export default useUsuarios;
