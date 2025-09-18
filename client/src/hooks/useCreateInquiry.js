import { useMutation } from '@tanstack/react-query';
import { submitInquiry } from '../services/inquiryService.js';

const useCreateInquiry = () =>
  useMutation({
    mutationFn: submitInquiry,
  });

export default useCreateInquiry;
