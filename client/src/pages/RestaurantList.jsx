import { Link } from 'react-router-dom';
import { useRestaurants } from '../api/hooks/useRestaurants';
import content from '../constants/content.json';

const RestaurantList = () => {
  const { restaurantsQuery } = useRestaurants();
  if (restaurantsQuery.isLoading) {
    return <p>Loading restaurants...</p>;
  }
  return (
    <section>
      <h1>{content.restaurantList.headline}</h1>
      <ul>
        {restaurantsQuery.data?.data?.map((restaurant) => (
          <li key={restaurant._id}>
            <Link to={`/restaurants/${restaurant._id}`}>{restaurant.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RestaurantList;
