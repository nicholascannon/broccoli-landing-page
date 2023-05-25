import React from 'react';
import ReactDOM from 'react-dom/client';
import { ModalEngine } from '../common/modals/modal-engine';
import { LandingPage } from './landing/landing-page';

export const mountApp = () => {
    ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(<App />);
};

const App = () => {
    return (
        <React.StrictMode>
            <ModalEngine>
                <LandingPage />
            </ModalEngine>
        </React.StrictMode>
    );
};
