import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../api/hooks/useAuth';
import content from '../constants/content.json';

const Login = () => {
  const navigate = useNavigate();
  const { loginMutation } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginMutation.mutate(form, {
      onSuccess: () => navigate('/')
    });
  };

  return (
    <section>
      <h1>{content.login.headline}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
        <button type="submit" disabled={loginMutation.isLoading}>
          {content.login.cta}
        </button>
      </form>
      <p>
        Need an account? <Link to="/register">Register</Link>
      </p>
    </section>
  );
};

export default Login;
