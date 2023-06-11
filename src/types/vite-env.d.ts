/// <reference types="vite/client" />
declare const VITE_VERSION: string;

interface ImportMetaEnv {
  readonly VITE_USERNAME: string;
  readonly VITE_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
