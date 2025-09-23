import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMenu } from '../../api/hooks/useMenu';

const MenuEdit = () => {
  const navigate = useNavigate();
  const { restaurantId, itemId } = useParams();
  const { menuQuery, createMenuMutation, updateMenuMutation } = useMenu(restaurantId);
  const [form, setForm] = useState({ name: '', description: '', category: '', price: 0 });

  useEffect(() => {
    if (itemId !== 'new') {
      const existing = menuQuery.data?.data?.find((item) => item._id === itemId);
      if (existing) {
        setForm({
          name: existing.name,
          description: existing.description,
          category: existing.category,
          price: existing.price
        });
      }
    }
  }, [itemId, menuQuery.data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (itemId === 'new') {
      createMenuMutation.mutate(form, {
        onSuccess: () => navigate(`/dashboard/restaurants/${restaurantId}/menu`)
      });
    } else {
      updateMenuMutation.mutate(
        { itemId, ...form },
        { onSuccess: () => navigate(`/dashboard/restaurants/${restaurantId}/menu`) }
      );
    }
  };

  return (
    <section>
      <h1>{itemId === 'new' ? 'Create menu item' : 'Edit menu item'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} required />
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" value={form.description} onChange={handleChange} />
        <label htmlFor="category">Category</label>
        <input id="category" name="category" value={form.category} onChange={handleChange} />
        <label htmlFor="price">Price</label>
        <input id="price" name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required />
        <button type="submit">Save</button>
      </form>
    </section>
  );
};

export default MenuEdit;
