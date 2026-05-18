// Global module declarations to satisfy TypeScript for non-TS imports
declare module 'react-dom/client';
declare module 'leaflet/dist/leaflet.css';
declare module '*.css';
declare module '*.scss';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';

interface ImportMetaEnv {
  [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
