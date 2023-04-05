import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider locale={enUS}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
