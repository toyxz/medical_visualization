import dva from 'dva';
import React from 'react';
import App from './app';
import indexModel from './models/index.js';
// import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(indexModel);

// 4. Router
app.router(() => <App />);

// 5. Start
app.start('#app');
