import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import App from './App.tsx';

import './index.css';
import { ConfigProvider, theme } from "antd";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
      <App />
    </ConfigProvider>
  </Provider>
);
