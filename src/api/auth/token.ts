export type StoredToken = {
  // access_token: string;
  // refresh_token: string;
  // role: string;
  // username: string;
  // timeStamp: number;
  id: string;
  username: string;
  email: string;
  role: string;
};

const TOKEN_KEY = "auth_token";
const TOKEN_TTL_MS = 1800000;

const isExpired = (timeStamp?: number): boolean => {
  if (!timeStamp) return false;

  const now = new Date().getTime();
  const diff = now - timeStamp;

  return diff > TOKEN_TTL_MS;
};

const setToken = (token: StoredToken): void => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

const getToken = (): StoredToken | null => {
  let result = null;

  const storedToken = localStorage.getItem(TOKEN_KEY);
  if (storedToken) {
    result = JSON.parse(storedToken);
  }

  return result;
};

const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export { getToken, setToken, removeToken, isExpired };
