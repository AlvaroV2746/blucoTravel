import { useCallback, useEffect, useState } from 'react';
import { API_BASE_URL } from '../utils/api';

const POLL_INTERVAL_MS = 45000;

export function useWebServices() {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    let controller = null;

    const loadServices = async () => {
      controller?.abort();
      controller = new AbortController();

      try {
        const response = await fetch(`${API_BASE_URL}/api/public/web-services`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`No se pudieron cargar los servicios (${response.status}).`);
        }

        const payload = await response.json();
        if (!active) return;

        setSections(Array.isArray(payload?.data) ? payload.data : []);
        setHasError(false);
      } catch (error) {
        if (error.name === 'AbortError' || !active) return;
        console.error('Error al cargar los servicios web:', error);
        setHasError(true);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    loadServices();
    const intervalId = setInterval(loadServices, POLL_INTERVAL_MS);

    return () => {
      active = false;
      clearInterval(intervalId);
      controller?.abort();
    };
  }, [reloadKey]);

  const refetch = useCallback(() => {
    setIsLoading(true);
    setReloadKey((current) => current + 1);
  }, []);

  return { sections, isLoading, hasError, refetch };
}
