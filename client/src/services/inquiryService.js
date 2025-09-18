import { BASE_URL } from './env.js';

export const submitInquiry = async (payload) => {
  const response = await fetch(`${BASE_URL}/api/inquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('We were unable to secure your reservation request.');
  }

  return response.json();
};
