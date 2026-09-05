import React from 'react';
import { useTranslation } from 'react-i18next';

const ActivityDetailView = ({ activity, onBack }) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="bg-white rounded-xl shadow-2xl border border-sky-100 overflow-hidden">
        <div className="h-96 w-full bg-sky-100">
          <img src={activity.img} alt={t(activity.name)} className="w-full h-full object-cover" />
        </div>
        <div className="p-10">
          <h2 className="text-4xl font-black text-blue-900 uppercase mb-4">
            {t(activity.name)}
          </h2>
          <div className="inline-block bg-sky-100 text-blue-900 px-4 py-2 rounded-full font-semibold mb-6">
            {t(activity.stats)}
          </div>
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            {t(activity.desc)}
          </p>
          <button
            onClick={onBack}
            className="bg-cyan-500 text-white font-bold py-4 px-8 rounded text-lg"
          >
            {t('common.goBack')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailView;