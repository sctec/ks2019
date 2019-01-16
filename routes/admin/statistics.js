const router = require("koa-router")();
const DB = require("../../model/db.js");
const tools = require("../../model/tools.js");

router.get("/project-stat", async (ctx) => {
    try {
        let m100Object = {};
        let m1000Object = {};
        let f100Object = {};
        let f800Object = {};
        let list = [];

        let M100Result = await DB.find("users", {"user_record": parseInt(1), "pro_type": "M100"});
        m100Object["pro_type"] = "男子100米";
        m100Object["number"] = M100Result.length;
        let M1000Result = await DB.find("users", {"user_record": parseInt(1), "pro_type": "M1000"});
        m1000Object["pro_type"] = "男子1000米";
        m1000Object["number"] = M1000Result.length;
        let F100Result = await DB.find("users", {"user_record": parseInt(1), "pro_type": "F100"});
        f100Object["pro_type"] = "女子100米";
        f100Object["number"] = F100Result.length;
        let F800Result = await DB.find("users", {"user_record": parseInt(1), "pro_type": "F800"});
        f800Object["pro_type"] = "女子800米";
        f800Object["number"] = F800Result.length;

        list.push(m100Object);
        list.push(m1000Object);
        list.push(f100Object);
        list.push(f800Object);
        ctx.render('admin/statistics/project-list', {
            list: list,
        });
    } catch (e) {
        ctx.body = "页面出错";
    }

});
router.post('/project-search', async (ctx) => {
    try {
        let pro_type = ctx.request.body.pro_type;
        let searchResult = await DB.find("users", {"pro_type": pro_type,"user_record": parseInt(1)});
        await ctx.render("admin/statistics/project-search", {
            listNum: searchResult.length || 0,
            list: searchResult,
        });
    } catch (e) {
        ctx.body = "查找失败";
    }
});
router.get("/class-stat", async (ctx) => {
    try {
        ctx.render('admin/statistics/class-search');
    } catch (e) {
        ctx.body = "页面出错";
    }

});
router.post('/class-search', async (ctx) => {
    try {
        let parameter = ctx.request.body.parameter;
        let searchResult = await DB.find("users", {"class": parameter,"user_record":parseInt(1)});
        await ctx.render('admin/statistics/class-search', {
            listNum: searchResult.length || 0,
            list: searchResult,
        });
    } catch (e) {
        ctx.body = "查找失败";
    }
});
// router.get("/name-search", async (ctx) => {
//     try {
//         ctx.render('admin/search', {
//             bc: "name",
//             bcname: "按姓名查找"
//         });
//     } catch (e) {
//         ctx.body = "页面出错";
//     }
//
// });
// router.post('/name-search', async (ctx) => {
//     try {
//         let parameter = ctx.request.body.parameter;
//         let searchResult = await DB.find("users", {"name": parameter});
//         await ctx.render("admin/search", {
//             listNum: searchResult.length || 0,
//             list: searchResult,
//             bc: "name",
//             bcname: "按姓名查找"
//         });
//     } catch (e) {
//         ctx.body = "查找失败";
//     }
// });

module.exports = router.routes();