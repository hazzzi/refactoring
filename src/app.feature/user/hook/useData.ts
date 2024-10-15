import { BASE_URL } from '@/app.module/api/environment';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function useData<T>(url: string, initialData?: T) {
  const [data, setData] = useState<T | null>(initialData ?? null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    axios
      .get<T>(`${BASE_URL}${url}`)
      .then((data) => {
        if (!ignore) {
          setData(data.data);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  return { error, loading, data };
}
