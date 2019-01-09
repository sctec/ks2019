const router = require("koa-router")();
const DB = require("../../model/db.js");
const tools = require("../../model/tools.js");

router.get("/class-search", async (ctx) => {
    try {
        ctx.render('admin/search', {
            bc: "class",
            bcname: "按班级查找"
        });
    } catch (e) {
        ctx.body = "页面出错";
    }

});
router.post('/class-search', async (ctx) => {
    try {
        let parameter = ctx.request.body.parameter;
        let searchResult = await DB.find("users", {"class": parameter});
        await ctx.render("admin/search", {
            listNum: searchResult.length || 0,
            list: searchResult,
            bc: "class",
            bcname: "按班级查找"
        });
    } catch (e) {
        ctx.body = "查找失败";
    }
});
router.get("/stuid-search", async (ctx) => {
    try {
        ctx.render('admin/search', {
            bc: "stu_id",
            bcname: "按学号查找"
        });
    } catch (e) {
        ctx.body = "页面出错";
    }

});
router.post('/stuid-search', async (ctx) => {
    try {
        let parameter = ctx.request.body.parameter;
        let searchResult = await DB.find("users", {"stu_id": parameter});
        await ctx.render("admin/search", {
            listNum: searchResult.length || 0,
            list: searchResult,
            bc: "stuid",
            bcname: "按学号查找"
        });
    } catch (e) {
        ctx.body = "查找失败";
    }
});
router.get("/name-search", async (ctx) => {
    try {
        ctx.render('admin/search', {
            bc: "name",
            bcname: "按姓名查找"
        });
    } catch (e) {
        ctx.body = "页面出错";
    }

});
router.post('/name-search', async (ctx) => {
    try {
        let parameter = ctx.request.body.parameter;
        let searchResult = await DB.find("users", {"name": parameter});
        await ctx.render("admin/search", {
            listNum: searchResult.length || 0,
            list: searchResult,
            bc: "name",
            bcname: "按姓名查找"
        });
    } catch (e) {
        ctx.body = "查找失败";
    }
});

module.exports = router.routes();