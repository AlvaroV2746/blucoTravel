import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('about.title')}</h2>
      <p className="text-gray-600 body-font mb-8">{t('about.description')}</p>
    </div>
  );
};

export default AboutPage;