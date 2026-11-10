const HEX_COLOR = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

export const FALLBACK_ACCENT = '#475569';

export const hasThemeColor = (color) => HEX_COLOR.test(color ?? '');

export const resolveAccent = (color) => (hasThemeColor(color) ? color : FALLBACK_ACCENT);

function toRgbChannels(color) {
  let hex = resolveAccent(color).slice(1);
  if (hex.length === 3) {
    hex = hex.split('').map((char) => char + char).join('');
  }

  return [0, 2, 4].map((offset) => parseInt(hex.slice(offset, offset + 2), 16));
}

export function hexToRgba(color, alpha) {
  const [red, green, blue] = toRgbChannels(color);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

const mixWith = (color, target, amount) =>
  `rgb(${toRgbChannels(color)
    .map((channel) => Math.round(channel + (target - channel) * amount))
    .join(', ')})`;

// Aclara el color hacia blanco (0 = original, 1 = blanco).
export const tintColor = (color, amount) => mixWith(color, 255, amount);

// Oscurece el color hacia negro (0 = original, 1 = negro).
export const shadeColor = (color, amount) => mixWith(color, 0, amount);
