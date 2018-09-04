const Koa = require('koa');
const app = new Koa();
const Config = require('./config/config');
const onerror = require('koa-onerror');

onerror(app);

app.use(async(ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    //$ctx.method == 使用的请求方式 || $ctx.url == 请求的地址
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.listen(Config.node.port);