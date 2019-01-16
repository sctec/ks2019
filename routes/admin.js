const router = require("koa-router")();
const login = require("./admin/login.js");
const register = require("./admin/register.js");
const index = require("./admin/index.js");
const classify = require("./admin/classify.js");
const user = require("./admin/user.js");
const M100 = require("./admin/M100.js");
const F100 = require("./admin/F100.js");
const F800 = require("./admin/F800.js");
const M1000 = require("./admin/M1000.js");
const search = require("./admin/search.js");
const statistics = require("./admin/statistics");
const url = require("url");

router.use(async (ctx, next) => {
    ctx.state.__HOST__ = "http://" + ctx.request.header.host;
    let pathname = url.parse(ctx.request.url).pathname.substring(1);
    //左侧菜单栏选中
    let splitUrl = pathname.split("/");
    // console.log(splitUrl);
    ctx.state.G = {
        url: splitUrl,
        userinfo: ctx.session.userinfo,
        prevPage: ctx.request.headers["referer"]
    };
    //权限判断
    if (ctx.session.userinfo) {
        await next();
    } else {
        if (pathname == "admin/register/doregister" || pathname == "admin/register" || pathname == "admin/login" || pathname == "admin/login/dologin" || pathname == "admin/login/code") {
            await next();
        } else {
            ctx.redirect("/admin/login");
        }
    }
});
router.get("/", async (ctx) => {
    ctx.render("admin/index");
});

router.use(index);
router.use("/login", login);
router.use("/user", user);
router.use("/register", register);
router.use("/classify", classify);

router.use("/M100", M100);
router.use("/F100", F100);
router.use("/M1000", M1000);
router.use("/F800", F800);

router.use("/search", search);
router.use("/statistics", statistics);

module.exports = router.routes();