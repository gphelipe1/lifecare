import jwtDecode from 'jwt-decode';
import api from './api';
import { DynamicObject } from '../Types/Generic';

export const TOKEN_KEY = '@lifecare-Token';
export const USER_KEY = '@lifecare-User';
export const NAME_KEY = '@lifecare-Name';

export const getUser = (): string | null => localStorage.getItem(USER_KEY);
export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const getName = (): string | null => localStorage.getItem(NAME_KEY);

export const getRole = (): string | null => {
    const token = getToken();
    if (token)
    {
      const decoded: DynamicObject = jwtDecode(token.replace('Bearer ', ''));
      return decoded?.role;
    }
    return null;
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(NAME_KEY);
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (token === null) {
    return false;
  }
  const tokenDecoded = jwtDecode(token.replace('Bearer ', '')) as { exp: number };
  if (Date.now() < tokenDecoded.exp * 1000) {
    return true;
  }
  logout();
  return false;
};

const tokenStorage = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

const userStorage = (user: string): void => {
  localStorage.setItem(USER_KEY, user);
};

const nameStorage = (name: string): void => {
  localStorage.setItem(NAME_KEY, name);
}

api.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  async (error) => {
    console.log(error);
  }
);

export async function signIn(valueForm: { username: string, password: string }): Promise<DynamicObject> {
  try {
    const response = await api.post('user/signin', valueForm);
   
    tokenStorage(response.data.token);
    nameStorage(response.data.name)
    userStorage(valueForm.username);

    console.log(response.data);
    return response;
  } catch (err) {
    return {
      has_error: true,
      err
    };
  }
}

export async function signUp(valueForm: { username: string, name: string, password: string }): Promise<any> {
  try {
    const response = await api.post('user/signup', valueForm);

    return response.status;
  } catch (err) {
    return {
      has_error: true,
      err
    };
  }
}