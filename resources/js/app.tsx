import { createRoot } from 'react-dom/client';

function App() {
    return (
        <div>
            <h1>React funcionando!</h1>
            <p>Laravel 13 + React + Vite</p>
        </div>
    );
}

const element = document.getElementById('app');

if (element) {
    createRoot(element).render(<App />);
}