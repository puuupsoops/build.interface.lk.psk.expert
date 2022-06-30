
interface ImportMetaEnv {
    readonly VITE_APP_API_LOCATION: string;
    readonly VITE_APP_DOC_LOCATION: string;
    readonly VITE_APP_WS_LOCATION: string;
    readonly VITE_APP_SITE_LOCATION: string;
    readonly VITE_APP_DADATA_LOCATION: string;
    readonly VITE_APP_DADATA_TOKEN: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

  declare const APP_VERSION: string;