import dva from 'dva';
import React from 'react';
import App from './app';

import './index.scss';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/user.js').default); // 神奇 居然要default 否则找不到namespace
app.model(require('./models/order.js').default);
app.model(require('./models/data.js').default);
app.model(require('./models/role.js').default);
app.model(require('./models/employee.js').default);



// 4. Router
app.router(() => <App />);

// 5. Start
app.start('#app');
