import { LocalStorageKeys, LocalStorageKeysEnum } from 'constants/localstorage';

interface IUserLocalStorage {
  setItem: (key: LocalStorageKeys, value: string) => void;
  getItem: (key: LocalStorageKeys) => string | null;
  removeItem: (key: LocalStorageKeys) => void;
}

const useLocalStorage = (): IUserLocalStorage => ({
  setItem(key, value) {
    localStorage.setItem(key, value);
  },
  getItem(key) {
    return localStorage.getItem(key);
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
});

export { useLocalStorage };
