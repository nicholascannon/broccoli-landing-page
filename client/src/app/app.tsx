import React from 'react';
import ReactDOM from 'react-dom/client';
import { ModalEngine } from '../common/modals/modal-engine';
import { LandingPage } from './landing/landing-page';
import { ErrorBoundary } from '../common/error-boundary/boundary';

export const mountApp = () => {
    ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(<App />);
};

export const App = () => {
    return (
        <React.StrictMode>
            <ErrorBoundary fallback={<p>Something went wrong!</p>}>
                <ModalEngine>
                    <LandingPage />
                </ModalEngine>
            </ErrorBoundary>
        </React.StrictMode>
    );
};
