export function storeToken(key: string, token: string): void {
  localStorage.setItem(key, token);
}

export function getStoredToken(key: string): string | null {
  return localStorage.getItem(key);
}

export function removeToken(key: string): void {
  return localStorage.removeItem(key);
}
