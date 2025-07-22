
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AppProvider } from './context/app.context.jsx';

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <App />
  </AppProvider>
)
