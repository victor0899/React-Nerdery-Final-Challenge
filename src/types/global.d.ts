// Definición de módulos
declare module '*.svg' {
    const content: string;
    export default content;
  }
  
  // Variables de entorno
  interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_AUTH_TOKEN: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
  // Extensiones de Window
  interface Window {
    fs: {
      readFile: (path: string, options?: { encoding?: string }) => Promise<any>;
    };
  }
  
  // Tipos globales compartidos
  type Status = 'success' | 'error' | 'loading' | 'idle';
  
  // Tipado para temas y estilos
  type Theme = 'light' | 'dark';
  
  // Tipado para estados de UI comunes
  interface Pagination {
    page: number;
    limit: number;
    total: number;
  }
  
  interface SortConfig {
    field: string;
    direction: 'asc' | 'desc';
  }
  
  // Utilidades de tipado global
  type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
  };
  
  // Si estás usando imágenes o archivos estáticos
  declare module '*.png';
  declare module '*.jpg';
  declare module '*.jpeg';