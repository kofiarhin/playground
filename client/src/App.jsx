import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import StatusScreen from './components/StatusScreen/StatusScreen';
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import Gallery from './pages/Gallery/Gallery';
import Contact from './pages/Contact/Contact';
import useSalonContent from './hooks/useSalonContent';
import { useDispatch, useSelector } from './lib/reactRedux.js';
import { selectContent, setContent } from './store/slices/contentSlice.js';

const App = () => {
  const { data, isLoading, isError, error } = useSalonContent();
  const dispatch = useDispatch();
  const content = useSelector(selectContent);

  useEffect(() => {
    if (data) {
      dispatch(setContent(data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <StatusScreen message="Preparing your LuxeAura experience..." />;
  }

  if (isError) {
    return <StatusScreen message={error?.message || 'Unable to load experience.'} variant="error" />;
  }

  if (!content) {
    return <StatusScreen message="Preparing your LuxeAura experience..." />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
