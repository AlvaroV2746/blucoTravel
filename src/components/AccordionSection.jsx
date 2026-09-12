import React from 'react';
import { useTranslation } from 'react-i18next';

const AccordionSection = ({ sectionKey, toggleSection, openSections, children }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div onClick={() => toggleSection(sectionKey)} className="subPlaces">
        {t(sectionKey)}
      </div>
      {openSections[sectionKey] && <div className="my-4">{children}</div>}
    </div>
  );
};

export default AccordionSection;