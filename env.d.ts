/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROJECT_URL_SUPABASE: string
  readonly VITE_SUPABASE_API_KEY: string
  // agrega aquí otras variables que tengas
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
