/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_FOOTBALL_DATA_TOKEN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
