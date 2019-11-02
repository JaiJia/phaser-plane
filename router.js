const Router = require('koa-router');
const router = new Router();
// const fs = require('fs');
// const path = require('path');
// const static = require('koa-static');

// const staticPath = './static';

// router.get('/', static(path.join(__dirname, staticPath)));

router.get('/', ctx => {
    ctx.body = 'home';
});

router.get('/user', ctx => {
    ctx.body = 'user';
});

router.get('/404', ctx => {
    ctx.body = '404';
});

module.exports = router;