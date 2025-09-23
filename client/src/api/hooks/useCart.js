import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import api from '../axios';

export const useCart = () => {
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.auth.token);

  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await api.get('/cart');
      return response.data;
    },
    enabled: Boolean(token)
  });

  const invalidateCart = () => {
    queryClient.invalidateQueries({ queryKey: ['cart'] });
    queryClient.invalidateQueries({ queryKey: ['orders'] });
  };

  const addItemMutation = useMutation({
    mutationFn: async ({ menuItemId, quantity }) => {
      const response = await api.post('/cart/items', { menuItemId, quantity });
      return response.data;
    },
    onSuccess: invalidateCart
  });

  const updateItemMutation = useMutation({
    mutationFn: async ({ itemId, quantity }) => {
      const response = await api.put(`/cart/items/${itemId}`, { quantity });
      return response.data;
    },
    onSuccess: invalidateCart
  });

  const removeItemMutation = useMutation({
    mutationFn: async (itemId) => {
      const response = await api.delete(`/cart/items/${itemId}`);
      return response.data;
    },
    onSuccess: invalidateCart
  });

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post('/cart/checkout');
      return response.data;
    },
    onSuccess: invalidateCart
  });

  return {
    data: cartQuery.data,
    isLoading: cartQuery.isLoading,
    addItemMutation,
    updateItemMutation,
    removeItemMutation,
    checkoutMutation
  };
};
