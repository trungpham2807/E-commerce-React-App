import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux"
import { store, persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    {/* Persist redux */}
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);