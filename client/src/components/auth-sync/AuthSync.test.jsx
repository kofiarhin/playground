import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

const setupClerkMocks = ({ isLoaded, isSignedIn, user }) => ({
  useAuth: () => ({ isLoaded, isSignedIn, getToken: vi.fn().mockResolvedValue('token') }),
  useUser: () => ({ user })
});

const setupAuthSyncMock = (state) => ({
  default: () => state
});

describe('AuthSync', () => {
  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('triggers sync when signed in', async () => {
    const mutate = vi.fn();
    vi.doMock('@clerk/clerk-react', () =>
      setupClerkMocks({
        isLoaded: true,
        isSignedIn: true,
        user: { primaryEmailAddress: { emailAddress: 'test@example.com' }, fullName: 'Test User' }
      })
    );
    vi.doMock('../../hooks/useAuthSync.js', () =>
      setupAuthSyncMock({ mutate, isPending: true, isSuccess: false, isError: false, error: null })
    );

    const { default: AuthSync } = await import('./AuthSync.jsx');

    render(<AuthSync />);

    expect(mutate).toHaveBeenCalledWith({
      email: 'test@example.com',
      name: 'Test User'
    });
    expect(screen.getByText('Sync in progress...')).toBeInTheDocument();
  });

  it('shows error message when sync fails', async () => {
    const mutate = vi.fn();
    vi.doMock('@clerk/clerk-react', () =>
      setupClerkMocks({
        isLoaded: true,
        isSignedIn: true,
        user: { primaryEmailAddress: { emailAddress: 'test@example.com' }, fullName: 'Test User' }
      })
    );
    vi.doMock('../../hooks/useAuthSync.js', () =>
      setupAuthSyncMock({
        mutate,
        isPending: false,
        isSuccess: false,
        isError: true,
        error: { message: 'Sync failed' }
      })
    );

    const { default: AuthSync } = await import('./AuthSync.jsx');

    render(<AuthSync />);

    expect(screen.getByText('Sync failed')).toBeInTheDocument();
  });

  it('redirects when sync is successful', async () => {
    const mutate = vi.fn();
    const assign = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { assign },
      writable: true
    });

    vi.doMock('@clerk/clerk-react', () =>
      setupClerkMocks({
        isLoaded: true,
        isSignedIn: true,
        user: { primaryEmailAddress: { emailAddress: 'test@example.com' }, fullName: 'Test User' }
      })
    );
    vi.doMock('../../hooks/useAuthSync.js', () =>
      setupAuthSyncMock({
        mutate,
        isPending: false,
        isSuccess: true,
        isError: false,
        error: null
      })
    );

    const { default: AuthSync } = await import('./AuthSync.jsx');

    render(<AuthSync />);

    expect(assign).toHaveBeenCalledWith('/dashboard');
    expect(screen.getByText('Sync complete. Redirecting...')).toBeInTheDocument();
  });

  it('does not trigger sync when signed out', async () => {
    const mutate = vi.fn();
    vi.doMock('@clerk/clerk-react', () =>
      setupClerkMocks({
        isLoaded: false,
        isSignedIn: false,
        user: null
      })
    );
    vi.doMock('../../hooks/useAuthSync.js', () =>
      setupAuthSyncMock({ mutate, isPending: false, isSuccess: false, isError: false, error: null })
    );

    const { default: AuthSync } = await import('./AuthSync.jsx');

    render(<AuthSync />);

    expect(mutate).not.toHaveBeenCalled();
  });
});
