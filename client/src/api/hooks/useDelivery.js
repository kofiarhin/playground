import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../axios';

export const useDelivery = (orderId) => {
  const queryClient = useQueryClient();

  const deliveryQuery = useQuery({
    queryKey: ['delivery', orderId],
    queryFn: async () => {
      const response = await api.get(`/delivery/${orderId}`);
      return response.data;
    },
    enabled: Boolean(orderId)
  });

  const updateDeliveryMutation = useMutation({
    mutationFn: async ({ status, eta }) => {
      const response = await api.patch(`/delivery/${orderId}`, { status, eta });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['delivery', orderId] });
    }
  });

  return { ...deliveryQuery, updateDeliveryMutation };
};
