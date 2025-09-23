import { useMutation, useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import api from '../axios';
import { loginSuccess, logout } from '../../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.get('/auth/me');
      return response.data;
    },
    enabled: false
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(loginSuccess(data.data));
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await api.post('/auth/register', payload);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(loginSuccess(data.data));
    }
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  return { loginMutation, registerMutation, profileQuery, handleLogout };
};
