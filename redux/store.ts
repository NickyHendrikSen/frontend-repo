'use client'
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { apiSlice } from "./features/api/apiSlice"
import authSlice from "./features/auth/authSlice"
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
  key: process.env.NEXT_PUBLIC_FINGERPRINT_NAME ?? "root",
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  // reducer:{
  //   [apiSlice.reducerPath]: apiSlice.reducer,
  //   auth: authSlice,
  //   course: courseSlice,
  //   cart: cartSlice,
  //   social: socialSlice,
  // },
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(apiSlice.middleware)
})

const persistor = persistStore(store);
export { store, persistor };

const initializeApp = async () => {
  await store.dispatch(apiSlice.endpoints.loadProfile.initiate({}, {forceRefetch: true}))
}

initializeApp();