import App from './App';
import ReactDOM from 'react-dom/client';
import axios from 'axios';


import './index.css';

axios.defaults.withCredentials = true
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
