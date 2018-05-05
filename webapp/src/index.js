import dva from 'dva';

import router from './router';
import menu from './models/menu';

const app = dva();

// models
app.model(menu);

// router
app.router(router);

// here we go
app.start('#root');
