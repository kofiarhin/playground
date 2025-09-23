import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMenu } from '../api/hooks/useMenu';
import { useCart } from '../api/hooks/useCart';
import MenuFilters from '../components/MenuFilters';
import MenuCard from '../components/MenuCard';

const RestaurantDetail = () => {
  const { restaurantId } = useParams();
  const { menuQuery } = useMenu(restaurantId);
  const { addItemMutation } = useCart();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const items = menuQuery.data?.data || [];
  const categories = useMemo(() => [...new Set(items.map((item) => item.category))], [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? item.category === category : true;
      return matchesSearch && matchesCategory;
    });
  }, [items, search, category]);

  const handleAdd = (item) => {
    addItemMutation.mutate({ menuItemId: item._id, quantity: 1 });
  };

  if (menuQuery.isLoading) {
    return <p>Loading menu...</p>;
  }

  return (
    <section>
      <h1>Menu</h1>
      <MenuFilters
        search={search}
        onSearchChange={setSearch}
        categories={categories}
        activeCategory={category}
        onCategoryChange={setCategory}
      />
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {filteredItems.map((item) => (
          <MenuCard key={item._id} item={item} onAdd={handleAdd} />
        ))}
      </div>
    </section>
  );
};

export default RestaurantDetail;
