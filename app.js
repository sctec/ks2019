const Koa = require("koa");
const router = require("koa-router")();
const static = require("koa-static");
const render = require("koa-art-template");
const path = require("path");
const session = require("koa-session");
const bodyParser = require("koa-bodyparser");
const jsonp = require("koa-jsonp");
const sd = require("silly-datetime");
const cors = require("koa2-cors");

//实例化
const app = new Koa();
//配置jsonp的中间件
app.use(jsonp());
//配置post提交数据的中间件
app.use(bodyParser());
//配置后台允许跨域
app.use(cors());
//配置session的中间件
app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:sess',
    maxAge: 600000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true, /*每次请求都重新设置session*/
    renew: false,
};
app.use(session(CONFIG, app));

//配置模板引擎
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production',
    dateFormat: dateFormat = function (value) {
        return sd.format(value, "YYYY-MM-DD HH:mm")
    }
});
//配置静态资源中间件
app.use(static(__dirname + "/public"));

const admin = require("./routes/admin.js");
const user = require("./routes/user.js");
const index = require("./routes/index.js");

router.use("/admin", admin);
router.use("/user", user);
router.use(index);

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3001);
