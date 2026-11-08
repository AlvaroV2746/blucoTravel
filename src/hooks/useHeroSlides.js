import { useEffect, useState } from 'react';
import { data as fallbackSlides } from '../data/tours';

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_BASE_URL = import.meta.env.DEV
  ? ''
  : (configuredApiUrl || 'https://inventario.blucotravel.com');
const POLL_INTERVAL_MS = 45000;

const mapSlide = (slide) => ({
  id: slide.id,
  img: slide.imageUrl,
  targetUrl: slide.targetUrl || '',
  description: slide.description || '',
});

export function useHeroSlides() {
  const [slides, setSlides] = useState(fallbackSlides);

  useEffect(() => {
    let active = true;
    let controller = null;

    const loadSlides = async () => {
      controller?.abort();
      controller = new AbortController();

      try {
        const response = await fetch(`${API_BASE_URL}/api/public/slides`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`No se pudieron cargar los slides (${response.status}).`);
        }

        const payload = await response.json();
        const remoteSlides = Array.isArray(payload?.data)
          ? payload.data.map(mapSlide)
          : [];

        if (!active) return;

        setSlides(remoteSlides.length > 0 ? remoteSlides : fallbackSlides);
      } catch (error) {
        if (error.name === 'AbortError' || !active) return;
        setSlides(fallbackSlides);
      }
    };

    loadSlides();
    const intervalId = setInterval(loadSlides, POLL_INTERVAL_MS);

    return () => {
      active = false;
      clearInterval(intervalId);
      controller?.abort();
    };
  }, []);

  return slides;
}
