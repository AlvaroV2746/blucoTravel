import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../utils/api';

function usePublicList(path) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch(`${API_BASE_URL}${path}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        if (active) setData(Array.isArray(payload?.data) ? payload.data : []);
      })
      .catch(() => {
        if (active) setData([]);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [path]);

  return { data, isLoading };
}

export const useMunicipalities = () => usePublicList('/api/public/municipalities');
export const useFeaturedPackages = () => usePublicList('/api/public/featured-packages');
