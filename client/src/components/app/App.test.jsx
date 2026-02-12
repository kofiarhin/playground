import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

const createClerkMocks = ({ signedIn }) => ({
  SignedIn: ({ children }) => (signedIn ? <div>{children}</div> : null),
  SignedOut: ({ children }) => (!signedIn ? <div>{children}</div> : null),
  SignInButton: ({ children }) => <div>{children}</div>,
  UserButton: () => <div>UserButton</div>
});

describe('App', () => {
  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('renders signed out content', async () => {
    const mocks = createClerkMocks({ signedIn: false });
    vi.doMock('@clerk/clerk-react', () => mocks);
    vi.doMock('../auth-sync/AuthSync.jsx', () => ({
      default: () => <div>AuthSync</div>
    }));
    const { default: App } = await import('./App.jsx');

    render(<App />);

    expect(screen.getByText('Sign in to sync your account and continue.')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('renders signed in content', async () => {
    const mocks = createClerkMocks({ signedIn: true });
    vi.doMock('@clerk/clerk-react', () => mocks);
    vi.doMock('../auth-sync/AuthSync.jsx', () => ({
      default: () => <div>AuthSync</div>
    }));
    const { default: App } = await import('./App.jsx');

    render(<App />);

    expect(screen.getByText('UserButton')).toBeInTheDocument();
    expect(screen.getByText('AuthSync')).toBeInTheDocument();
  });
});
