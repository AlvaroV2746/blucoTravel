// Normaliza nombres para comparar municipios con títulos de sección ("Guatapé" vs "Guatape").
export const normalizeName = (value) =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

// Convierte el nombre del municipio en el segmento de URL: "San Rafael" -> "san-rafael".
export const toMunicipalitySlug = (name) =>
  normalizeName(name)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
