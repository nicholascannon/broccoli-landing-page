import React from 'react';
import ReactDOM from 'react-dom/client';
import { ModalEngine } from './modal-engine/modal-engine';
import { LandingPage } from './pages/landing/landing-page';

import './reset.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
    <React.StrictMode>
        <ModalEngine>
            <LandingPage />
        </ModalEngine>
    </React.StrictMode>
);
