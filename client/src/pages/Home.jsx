import { Link } from 'react-router-dom';
import content from '../constants/content.json';

const Home = () => {
  return (
    <section>
      <h1>{content.home.headline}</h1>
      <Link to="/restaurants">{content.home.cta}</Link>
    </section>
  );
};

export default Home;
