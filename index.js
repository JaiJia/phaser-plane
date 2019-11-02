const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const path = require('path');
const static = require('koa-static');

const staticPath = './static/dist';

app.use(static(path.join(__dirname, staticPath)));

app.use(router.routes(),router.allowedMethods());

app.listen(3000, () => {
    console.log(`Start Playing Now!`);
});