// src/env.d.ts
/// <reference types="vite/client" />

// (Optional) declare any custom env variables for autocompletion
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_OTHER_SECRET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

