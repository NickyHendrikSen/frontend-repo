'use client'
import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from 'redux-persist/integration/react';

interface ProviderProps {
  children?: any;
}

export const Providers = ({children} : ProviderProps) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        {children}
      </Provider>
    </PersistGate>
  );
}