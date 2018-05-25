// get app
const app = require("./src/app");

// run it
app.listen(3000, '127.0.0.1', null, () => {
  console.log('ELEGANT server is started');
});
