import { MMKV } from 'react-native-mmkv';

export const persistantStorage = new MMKV();

export const reduxPersistMMKVAdapter = {
  setItem: async (key: string, value: string) => {
    persistantStorage.set(key, value);
    return true;
  },
  getItem: async (key: string) => persistantStorage.getString(key),
  removeItem: async (key: string) => {
    persistantStorage.delete(key);
  },
};
