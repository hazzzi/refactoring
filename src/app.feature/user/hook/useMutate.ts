import { BASE_URL } from '@/app.module/api/environment';
import axios from 'axios';
import { useState } from 'react';

function useMutate<T>(url: string, method: 'post' | 'put' | 'delete') {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const mutate = async (newData?: T | null, onSuccess?: () => void) => {
    setLoading(true);
    setError(null);

    try {
      if (method === 'put') await axios.put(`${BASE_URL}${url}`, newData);
      if (method === 'delete') await axios.delete(`${BASE_URL}${url}`);
      if (method === 'post') await axios.post(`${BASE_URL}${url}`, newData);

      onSuccess?.();
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, mutate };
}

export default useMutate;
