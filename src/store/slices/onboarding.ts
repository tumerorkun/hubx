import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { reduxPersistMMKVAdapter } from '../persistant';

const initialState = { isComplete: false };

const slice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setIsComplete(state, action: PayloadAction<boolean>) {
      state.isComplete = action.payload;
    },
  },
});

export default {
  slice,
  persistConfig: { key: 'onboarding', storage: reduxPersistMMKVAdapter },
};
