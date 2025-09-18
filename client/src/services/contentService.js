import { BASE_URL } from './env.js';

export const getSalonContent = async () => {
  const response = await fetch(`${BASE_URL}/api/content`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Unable to load LuxeAura content.');
  }

  return response.json();
};
