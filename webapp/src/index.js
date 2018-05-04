import dva from 'dva';
import router from './router';

const app = dva();

// models
// app.model();

// router
app.router(router);

// here we go
app.start('#root');
