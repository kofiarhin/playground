import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../axios';

export const useMenu = (restaurantId) => {
  const queryClient = useQueryClient();

  const menuQuery = useQuery({
    queryKey: ['menu', restaurantId],
    queryFn: async () => {
      const response = await api.get(`/restaurants/${restaurantId}/menu`);
      return response.data;
    },
    enabled: Boolean(restaurantId)
  });

  const invalidateMenu = () => {
    queryClient.invalidateQueries({ queryKey: ['menu', restaurantId] });
  };

  const createMenuMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await api.post(`/restaurants/${restaurantId}/menu`, payload);
      return response.data;
    },
    onSuccess: invalidateMenu
  });

  const updateMenuMutation = useMutation({
    mutationFn: async ({ itemId, ...payload }) => {
      const response = await api.put(`/restaurants/${restaurantId}/menu/${itemId}`, payload);
      return response.data;
    },
    onSuccess: invalidateMenu
  });

  const deleteMenuMutation = useMutation({
    mutationFn: async (itemId) => {
      const response = await api.delete(`/restaurants/${restaurantId}/menu/${itemId}`);
      return response.data;
    },
    onSuccess: invalidateMenu
  });

  return { menuQuery, createMenuMutation, updateMenuMutation, deleteMenuMutation };
};
