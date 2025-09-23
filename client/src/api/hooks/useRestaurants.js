import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../axios';

export const useRestaurants = () => {
  const queryClient = useQueryClient();

  const restaurantsQuery = useQuery({
    queryKey: ['restaurants'],
    queryFn: async () => {
      const response = await api.get('/restaurants');
      return response.data;
    }
  });

  const createRestaurantMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await api.post('/restaurants', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    }
  });

  return { restaurantsQuery, createRestaurantMutation };
};
