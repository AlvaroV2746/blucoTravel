import { useEffect } from 'react';
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';

const RATING_LABEL = {
  good: 'good',
  'needs-improvement': 'needs-improvement',
  poor: 'poor',
};

const WebVitalsReporter = () => {
  useEffect(() => {
    const report = (metric) => {
      const { name, value, rating } = metric;
      if (import.meta.env.DEV) {
        console.info(
          `[WebVitals] ${name}: ${Math.round(value)} (${RATING_LABEL[rating] || rating})`
        );
      }
    };

    onLCP(report);
    onINP(report);
    onCLS(report);
    onFCP(report);
    onTTFB(report);
  }, []);

  return null;
};

export default WebVitalsReporter;