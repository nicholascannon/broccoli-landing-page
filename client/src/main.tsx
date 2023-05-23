import React from 'react';
import ReactDOM from 'react-dom/client';
import { LandingPage } from './pages/landing';

import './reset.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
    <React.StrictMode>
        <LandingPage />
    </React.StrictMode>
);
