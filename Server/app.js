const Koa = require('koa');
const config = require('./config/config');
const api = require('./routes/api');
const jwt = require('koa-jwt');
const koaRouter = require('koa-router');
const json = require('koa-json');
const koaBodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new koaRouter();

app.use(koaBodyParser());
app.use(json());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                success: false,
                token: null,
                info: 'Protected resource, use Authorization header to get access'
            }
        } else {
            throw err;
        }
    }
});

app.on('error', function(err) {
    console.log(err);
});

router.use('/api', api.routes());

app.use(router.routes());

app.listen(config.port,() => {
    console.log(`Koa is listening in ${config.port}`);
});