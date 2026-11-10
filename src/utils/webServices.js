export const WEB_SERVICE_TYPE = 'web-service';

const isEnglish = (lang) => lang === 'en';

export const pickLocalizedText = (item, field, lang) => {
  const english = item[`${field}En`];
  return isEnglish(lang) && english ? english : item[field] ?? '';
};

export const pickLocalizedList = (item, field, lang) => {
  const english = item[`${field}En`];
  return isEnglish(lang) && Array.isArray(english) && english.length > 0
    ? english
    : item[field] ?? [];
};

export function toWebServiceActivity(item, lang, sectionTitle = '') {
  const images = item.images ?? [];
  const includedServices = pickLocalizedList(item, 'includedServices', lang);

  return {
    id: item.id,
    type: WEB_SERVICE_TYPE,
    name: pickLocalizedText(item, 'title', lang),
    desc: pickLocalizedText(item, 'description', lang),
    stats: includedServices.join(' · '),
    img: images[0] ?? '',
    gallery: images,
    locationName: sectionTitle,
    isDynamic: true,
  };
}

export function findWebServiceActivity(sections, id, lang) {
  for (const section of sections) {
    for (const subSection of section.subSections ?? []) {
      const item = (subSection.items ?? []).find((entry) => entry.id === id);
      if (item) {
        return toWebServiceActivity(item, lang, pickLocalizedText(section, 'title', lang));
      }
    }
  }

  return null;
}

export function translateActivityText(t, value, isDynamic = false) {
  if (!value) return '';
  return isDynamic ? value : t(value);
}
