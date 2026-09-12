import {createRoot} from 'react-dom/client';
import {Checks} from './checks/Checks';
import './styles/theme.css';
import './styles/foundation.css';
import './styles/preview-themes.css';
createRoot(document.getElementById('root')!).render(<Checks/>);
