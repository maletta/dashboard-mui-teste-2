import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { defaultTheme } from 'styles/themeMui';

import reportWebVitals from './reportWebVitals';
import router from './routes';

// import './styles/global.css';

// Referêncioa de dashboard
// https://htmlstream.com/preview/front-dashboard-v2.1.1/ecommerce.html

//https://material-kit-pro-react.devias.io/dashboard

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
