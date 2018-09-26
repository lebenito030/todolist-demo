const Koa = require('koa');
const config = require('./config/default');
const app = new Koa();


app.use(async ctx => {
    ctx.body = 'Hello World';
});

app.listen(config.port);

console.log('Done');