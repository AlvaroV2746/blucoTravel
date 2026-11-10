const HEX_COLOR = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

export const hasThemeColor = (color) => HEX_COLOR.test(color ?? '');

export function hexToRgba(color, alpha) {
  if (!hasThemeColor(color)) {
    return `rgba(15, 23, 42, ${alpha})`;
  }

  let hex = color.slice(1);
  if (hex.length === 3) {
    hex = hex.split('').map((char) => char + char).join('');
  }

  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
