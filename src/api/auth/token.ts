import { UserData } from "../../contexts/AppContext/AppContext";

const TOKEN_KEY = "auth_token";

const setToken = (token: UserData): void => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

const getToken = (): UserData | null => {
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

export { getToken, setToken, removeToken };
