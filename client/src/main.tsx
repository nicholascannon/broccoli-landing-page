import React from 'react';
import ReactDOM from 'react-dom/client';
import { ModalEngine } from './modals/modal-engine';

import './reset.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
    <React.StrictMode>
        <ModalEngine>
            <LandingPage />
        </ModalEngine>
    </React.StrictMode>
);
