import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';


import App from './src/App';

const element = document.getElementById('app');

if (element) {
    createRoot(element).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}