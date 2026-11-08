import { useEffect, useState } from 'react';
import { data as fallbackSlides } from '../data/tours';

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_BASE_URL = configuredApiUrl || 'https://inventario.blucotravel.com';

const POLL_INTERVAL_MS = 45000;

const mapSlide = (slide) => ({
  id: slide.id,
  img: slide.imageUrl,
  imageUrl: slide.imageUrl,
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
        const targetUrl = `${API_BASE_URL}/api/public/slides`;
        console.log('Consultando slides en:', targetUrl); 

        const response = await fetch(targetUrl, {
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

        if (remoteSlides.length > 0) {
          setSlides(remoteSlides);
        } else {
          setSlides(fallbackSlides);
        }
      } catch (error) {
        if (error.name === 'AbortError' || !active) return;
        console.error('Error al sincronizar slides públicos:', error);
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