const router = require("koa-router")();
const DB = require("../../model/db.js");
const tools = require("../../model/tools.js");

router.get("/", async (ctx) => {
    let page = ctx.query.page || 1;
    let pageSize = 15;
    let count = await DB.count("users", {"sys_user": 0, "sex": "女", "bm_state": parseInt(1), "pro_type": "F100"});
    let result = await DB.find("users", {"sys_user": 0, "sex": "女", "bm_state": parseInt(1), "pro_type": "F100"}, {}, {
        page: page,
        pageSize: pageSize,
        sortJson: {"user_score": 1}
    });
    for (i = 0; i < result.length; i++) {
        let stu_id_update = result[i].stu_id;
        let updateResult = await DB.update('users', {"stu_id": stu_id_update}, {
            "user_paiming": i + 1,
        });
    }
    let classifyresult = await DB.find("projects", {"pro_type": "F100", "pro_state": 1});
    await ctx.render("admin/F100/F100-list", {
        list: result,
        listNum: count,
        classify: classifyresult,
        page: page,
        totalPages: Math.ceil(count / pageSize)
    });
});

router.post("/F100-search", async (ctx) => {
    try {
        let pro_name = ctx.request.body.pro_name;
        // console.log(pro_name);
        // console.log(state);
        let searchResult = await DB.find("users", {"pro_name": pro_name,});
        let classifyresult = await DB.find("projects", {"pro_type": "F100"});
        // console.log(classifyresult);
        await ctx.render("admin/F100/F100-list", {
            listNum: searchResult.length,
            list: searchResult,
            classify: classifyresult,
        });
    } catch (err) {
        ctx.body = {
            code: 401,
            message: "添加失败"
        }
    }
});

router.get("/F100-edit", async (ctx) => {
    try {
        let id = ctx.query.id;
        let result = await DB.find("users", {"_id": DB.getObjectId(id)});
        await ctx.render('admin/F100/F100-edit', {
            list: result[0],
        });
    } catch (e) {
        ctx.body = "页面出错";
    }

});

router.post('/F100-doedit', async (ctx) => {
    try {
        console.log("aaa");
        let id = ctx.request.body.id;
        let user_score = parseFloat(ctx.request.body.user_score);
        let charesult = await DB.find("users", {"_id": DB.getObjectId(id)});
        if (parseFloat(user_score) < charesult[0].pro_hold) {
            var user_record = parseInt(1);
        }

        let result = await DB.find("users", {
            "sys_user": 0,
            "sex": "女",
            "bm_state": parseInt(1),
            "pro_type": "F100"
        }, {}, {
            page: page,
            pageSize: pageSize,
            sortJson: {"user_score": 1}
        });
        for (i = 0; i < result.length; i++) {
            let stu_id_update = result[i].stu_id;
            let updateResult = await DB.update('users', {"stu_id": stu_id_update}, {
                "user_paiming": i + 1,
            });
        }
        let updateResult = await DB.update('users', {"_id": DB.getObjectId(id)}, {
            "user_score": parseFloat(user_score),
            "user_record": user_record
        });
        ctx.body = "修改成功";
    } catch (e) {
        ctx.body = "修改失败";
    }
});

router.get("/class-search", async (ctx) => {
    try {
        ctx.render('admin/F100/class-search');
    } catch (e) {
        ctx.body = "页面出错";
    }

});

router.post('/class-search', async (ctx) => {
    try {
        let class_search = ctx.request.body.class;
        console.log(class_search);
        let searchResult = await DB.find("users", {"class": class_search, "pro_type": "F100"});
        await ctx.render("admin/F100/class-search", {
            listNum: searchResult.length,
            list: searchResult,
        });
    } catch (e) {
        ctx.body = "查找失败";
    }
});

module.exports = router.routes();