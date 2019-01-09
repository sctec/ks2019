const router = require("koa-router")();
const baoming = require("./user/baoming.js");
const index = require("./user/index-user.js");
const info = require("./user/info.js");
const url = require("url");

router.use(async (ctx, next) => {
    ctx.state.__HOST__ = "http://" + ctx.request.header.host;
    let pathname = url.parse(ctx.request.url).pathname.substring(1);
    //左侧菜单栏选中
    let splitUrl = pathname.split("/");
    // console.log(splitUrl);
    ctx.state.G = {
        url: splitUrl,
        userinfo2: ctx.session.userinfo2,
        prevPage: ctx.request.headers["referer"]
    };
    //权限判断
    if (ctx.session.userinfo2) {
        await next();
    } else {
        if (pathname == "admin/register/doregister" || pathname == "admin/register" || pathname == "admin/login" || pathname == "admin/login/dologin") {
            await next();
        } else {
            ctx.redirect("/admin/login");
        }
    }
});
router.get("/", async (ctx) => {
    ctx.render("user/index");
});

router.use(index);
router.use("/baoming", baoming);
router.use("/info", info);


module.exports = router.routes();