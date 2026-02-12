import { useEffect } from 'react';
import { render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import useAuthSync from './useAuthSync.js';

const createWrapper = () => {
  const queryClient = new QueryClient();

  const Wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return Wrapper;
};

const TestComponent = ({ getToken, onComplete }) => {
  const { mutateAsync } = useAuthSync({ getToken });

  useEffect(() => {
    const handleSync = async () => {
      try {
        const result = await mutateAsync({ email: 'test@example.com', name: 'Test User' });
        onComplete(result);
      } catch (error) {
        onComplete(error);
      }
    };

    handleSync();
  }, [mutateAsync, onComplete]);

  return null;
};

describe('useAuthSync', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_API_URL', 'http://localhost:5000');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('syncs user when response is ok', async () => {
    const responseData = { success: true };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(responseData)
    });

    const onComplete = vi.fn();
    const getToken = vi.fn().mockResolvedValue('token');

    render(<TestComponent getToken={getToken} onComplete={onComplete} />, {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalledWith(responseData);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:5000/api/auth/sync',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token'
        }
      })
    );
  });

  it('throws when response is not ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({ message: 'Sync failed' })
    });

    const onComplete = vi.fn();
    const getToken = vi.fn().mockResolvedValue('token');

    render(<TestComponent getToken={getToken} onComplete={onComplete} />, {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalled();
    });

    const [error] = onComplete.mock.calls[0];
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Sync failed');
  });
});
