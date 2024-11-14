// public/bundle.js
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from '../../views/App'; // Pastikan path ini benar sesuai struktur Anda
import '../stylesheets/style.css';

// Ambil props awal dari server
const initialProps = window.__INITIAL_PROPS__;

// Lakukan rehydration komponen `App` pada elemen `#root`
hydrateRoot(document.getElementById('root'), <App {...initialProps} />);
