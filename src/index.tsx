import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './components/app/app';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
