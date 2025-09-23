import { Link, useParams } from 'react-router-dom';
import { useMenu } from '../../api/hooks/useMenu';

const MenuList = () => {
  const { restaurantId } = useParams();
  const { menuQuery, deleteMenuMutation } = useMenu(restaurantId);

  if (menuQuery.isLoading) {
    return <p>Loading menu...</p>;
  }

  return (
    <section>
      <h1>Menu items</h1>
      <Link to={`/dashboard/restaurants/${restaurantId}/menu/new`}>Create item</Link>
      <ul>
        {menuQuery.data?.data?.map((item) => (
          <li key={item._id}>
            <span>
              {item.name} - ${item.price.toFixed(2)}
            </span>
            <Link to={`/dashboard/restaurants/${restaurantId}/menu/${item._id}`}>Edit</Link>
            <button type="button" onClick={() => deleteMenuMutation.mutate(item._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MenuList;
