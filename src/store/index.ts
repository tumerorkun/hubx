import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import onboarding from './slices/onboarding';
import {
  TypedUseSelectorHook,
  useDispatch as useNativeDispatch,
  useSelector as useNativeSelector,
} from 'react-redux';
import { api } from '@/apis';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  onboarding: persistReducer(
    onboarding.persistConfig,
    onboarding.slice.reducer,
  ),
});

export const store = configureStore({
  devTools: true,
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

export const storePersistor = persistStore(store);
export const actions = {
  ...onboarding.slice.actions,
};

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export const useDispatch = () => useNativeDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useNativeSelector;
