import React from 'react';
import ReactDOM from 'react-dom/client';
import PersonComponent from './component/person.component.tsx';
import { CssBaseline } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <PersonComponent />
  </React.StrictMode>,
);
