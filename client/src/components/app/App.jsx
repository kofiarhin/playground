import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import AuthSync from '../auth-sync/AuthSync.jsx';
import './app.styles.scss';

const App = () => (
  <div className="app-container">
    <header className="app-header">
      <h1 className="app-title">MERN Boilerplate</h1>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    <main className="app-main">
      <SignedOut>
        <p className="app-text">Sign in to sync your account and continue.</p>
        <SignInButton mode="modal">
          <button className="app-button" type="button">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <AuthSync />
      </SignedIn>
    </main>
  </div>
);

export default App;
