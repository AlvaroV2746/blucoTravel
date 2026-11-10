const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const PRODUCTION_API_URL = 'https://inventario.blucotravel.com';

// En desarrollo las peticiones relativas pasan por el proxy de Vite (/api -> localhost:4000),
// así no hay problemas de CORS con el puerto del sitio.
export const API_BASE_URL = configuredApiUrl || (import.meta.env.DEV ? '' : PRODUCTION_API_URL);
