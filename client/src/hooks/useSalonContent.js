import { useQuery } from '@tanstack/react-query';
import { getSalonContent } from '../services/contentService.js';

const useSalonContent = () =>
  useQuery({
    queryKey: ['salon-content'],
    queryFn: getSalonContent,
  });

export default useSalonContent;
