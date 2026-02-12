import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import useAuthSync from '../../hooks/useAuthSync.js';
import './auth-sync.styles.scss';

const AuthSync = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const { mutate, isPending, isSuccess, isError, error } = useAuthSync({ getToken });

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) {
      return;
    }

    mutate({
      email: user.primaryEmailAddress?.emailAddress,
      name: user.fullName || user.username || 'User'
    });
  }, [isLoaded, isSignedIn, user, mutate]);

  useEffect(() => {
    if (isSuccess) {
      window.location.assign('/dashboard');
    }
  }, [isSuccess]);

  return (
    <section className="auth-sync">
      <h2 className="auth-sync-title">Syncing your account</h2>
      {isPending && <p className="auth-sync-text">Sync in progress...</p>}
      {isSuccess && <p className="auth-sync-text">Sync complete. Redirecting...</p>}
      {isError && <p className="auth-sync-text">{error.message}</p>}
    </section>
  );
};

export default AuthSync;
