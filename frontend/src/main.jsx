import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';  // Importa o componente com as rotas

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />  {/* Renderiza o App com BrowserRouter e Routes */}
  </StrictMode>,
);
