import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../api/hooks/useAuth';
import content from '../constants/content.json';

const Register = () => {
  const navigate = useNavigate();
  const { registerMutation } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerMutation.mutate(form, {
      onSuccess: () => navigate('/')
    });
  };

  return (
    <section>
      <h1>{content.register.headline}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} required />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
        <button type="submit" disabled={registerMutation.isLoading}>
          {content.register.cta}
        </button>
      </form>
      <p>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </section>
  );
};

export default Register;
