const Koa = require('koa');
const config = require('./config/config');
const app = new Koa();

app.use(async ctx => {
    ctx.body = 'Hello World';
});

app.listen(config.port);

console.log('Koa is done');