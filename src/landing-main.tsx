import React from 'react';
import { createRoot } from 'react-dom/client';
import { Landing } from './landing/Landing';
import './styles/theme.css';
import './styles/foundation.css';
import './styles/preview-themes.css';
import './styles/landing.css';

createRoot(document.getElementById('root')!).render(<React.StrictMode><Landing /></React.StrictMode>);
