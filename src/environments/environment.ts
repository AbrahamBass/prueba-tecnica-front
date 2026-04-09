declare global {
  interface Window {
    __env: any;
  }
}

export const environment = {
  production: false,
  apiUrl: window.__env?.apiUrl || 'http://localhost:5012/api'
};