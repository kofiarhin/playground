import { useMutation } from '@tanstack/react-query';

const useAuthSync = ({ getToken }) => {
  const syncUserRequest = async ({ email, name }) => {
    const token = await getToken();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ email, name })
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || 'Sync failed');
    }

    return response.json();
  };

  return useMutation({
    mutationFn: syncUserRequest
  });
};

export default useAuthSync;
