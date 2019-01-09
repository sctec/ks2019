const router = require("koa-router")();
const DB = require("../../model/db.js");
const tools = require("../../model/tools.js");

router.get("/M100", async (ctx) => {
    var page = 1;
    var pageSize = 100;
    var result = await DB.find('projects', {"pro_type": "M100"}, {}, {
        page: page,
        pageSize: pageSize,
        sortJson: {"created_at": -1}
    });
    ctx.render("admin/classify/classify-list", {
        list: result,
        bc: "M100",
    });
});
router.get("/M100-add", async (ctx) => {
    let identresult = await DB.find("projects", {"pro_type": "M100"});
    let identArry = new Array();
    for (let i = 0; i < identresult.length; i++) {
        identArry[i] = identresult[i].pro_identification;
    }
    await ctx.render("admin/classify/classify-add", {
        pro_identification: identArry,
        bc: "M100",
    });
});
router.post("/M100-add", async (ctx) => {
    try {
        let pro_name = ctx.request.body.pro_name;
        let pro_identification = ctx.request.body.pro_identification;
        let pro_max_num = ctx.request.body.pro_max_num;
        let pro_start_time = ctx.request.body.pro_start_time;
        let pro_hold = ctx.request.body.pro_hold;
        let addResult = await DB.insert("projects", {
            "pro_type": "M100",
            "pro_name": pro_name,
            "pro_identification": pro_identification,
            "pro_state": parseInt(0),
            "pro_now_num": parseInt(0),
            "pro_man": [],
            "pro_full_state": parseInt(0),
            "pro_max_num": parseInt(pro_max_num),
            "pro_hold": parseFloat(pro_hold),
            "pro_start_time": pro_start_time,
        });

        ctx.body = {
            code: 200,
            messgae: "添加成功"
        }
    } catch (err) {
        ctx.body = {
            code: 401,
            message: "添加失败"
        }
    }
});
router.get("/M100-edit", async (ctx) => {
    var identresult = await DB.find("projects", {"pro_type": "M100"});
    var identArry = new Array();
    for (let i = 0; i < identresult.length; i++) {
        identArry[i] = identresult[i].pro_identification;
    }
    let id = ctx.query.id;
    let result = await DB.find("projects", {"_id": DB.getObjectId(id), "pro_type": "M100"});
    await ctx.render("admin/classify/classify-edit", {
        list: result[0],
        bc: "M100",
        pro_identification: identArry,
    });
});
router.post("/M100-doedit", async (ctx) => {
    try {
        let id = ctx.request.body.pro_id;
        let pro_name = ctx.request.body.pro_name;
        let pro_identification = ctx.request.body.pro_identification;
        let pro_max_num = ctx.request.body.pro_max_num;
        let pro_start_time = ctx.request.body.pro_start_time;
        let pro_hold = ctx.request.body.pro_hold;

        let updateResult = await DB.update("projects", {"_id": DB.getObjectId(id), "pro_type": "M100"}, {
            "pro_name": pro_name,
            "pro_identification": pro_identification,
            "pro_max_num": pro_max_num,
            "pro_start_time": pro_start_time,
            "pro_hold": pro_hold
        });
        console.log("修改成功");
        ctx.body = {
            code: 200,
            message: "修改成功"
        }
    } catch (err) {
        ctx.body = {
            code: 404,
            message: "修改失败"
        }
    }
});

router.get("/F100", async (ctx) => {
    var page = 1;
    var pageSize = 100;
    var result = await DB.find('projects', {"pro_type": "F100"}, {}, {
        page: page,
        pageSize: pageSize,
        sortJson: {"created_at": -1}
    });
    ctx.render("admin/classify/classify-list", {
        list: result,
        bc: "F100",
    });
});
router.get("/F100-add", async (ctx) => {
    let identresult = await DB.find("projects", {"pro_type": "F100"});
    let identArry = new Array();
    for (let i = 0; i < identresult.length; i++) {
        identArry[i] = identresult[i].pro_identification;
    }
    await ctx.render("admin/classify/classify-add", {
        pro_identification: identArry,
        bc: "F100",
    });
});
router.post("/F100-add", async (ctx) => {
    try {
        let pro_name = ctx.request.body.pro_name;
        let pro_identification = ctx.request.body.pro_identification;
        let pro_max_num = ctx.request.body.pro_max_num;
        let pro_start_time = ctx.request.body.pro_start_time;
        let pro_hold = ctx.request.body.pro_hold;
        console.log(pro_start_time);
        let addResult = await DB.insert("projects", {
            "pro_type": "F100",
            "pro_name": pro_name,
            "pro_identification": pro_identification,
            "pro_state": parseInt(0),
            "pro_now_num": parseInt(0),
            "pro_man": [],
            "pro_full_state": parseInt(0),
            "pro_max_num": parseInt(pro_max_num),
            "pro_hold": parseFloat(pro_hold),
            "pro_start_time": pro_start_time,
        });

        ctx.body = {
            code: 200,
            messgae: "添加成功"
        }
    } catch (err) {
        ctx.body = {
            code: 401,
            message: "添加失败"
        }
    }
});
router.get("/F100-edit", async (ctx) => {
    var identresult = await DB.find("projects", {"pro_type": "F100"});
    var identArry = new Array();
    for (let i = 0; i < identresult.length; i++) {
        identArry[i] = identresult[i].pro_identification;
    }
    let id = ctx.query.id;
    let result = await DB.find("projects", {"_id": DB.getObjectId(id), "pro_type": "F100"});
    await ctx.render("admin/classify/classify-edit", {
        list: result[0],
        bc: "F100",
        pro_identification: identArry,
    });
});
router.post("/F100-doedit", async (ctx) => {
    try {
        let id = ctx.request.body.pro_id;
        let pro_name = ctx.request.body.pro_name;
        let pro_identification = ctx.request.body.pro_identification;
        let pro_max_num = ctx.request.body.pro_max_num;
        let pro_start_time = ctx.request.body.pro_start_time;
        let pro_hold = ctx.request.body.pro_hold;

        let updateResult = await DB.update("projects", {"_id": DB.getObjectId(id), "pro_type": "F100"}, {
            "pro_name": pro_name,
            "pro_identification": pro_identification,
            "pro_max_num": pro_max_num,
            "pro_start_time": pro_start_time,
            "pro_hold": pro_hold
        });
        console.log("修改成功");
        ctx.body = {
            code: 200,
            message: "修改成功"
        }
    } catch (err) {
        ctx.body = {
            code: 404,
            message: "修改失败"
        }
    }
});

router.get("/M1000", async (ctx) => {
    var page = 1;
    var pageSize = 100;
    var result = await DB.find('projects', {"pro_type": "M1000"}, {}, {
        page: page,
        pageSize: pageSize,
        sortJson: {"created_at": -1}
    });
    ctx.render("admin/classify/classify-list", {
        list: result,
        bc: "M1000",
    });
});
router.get("/M1000-add", async (ctx) => {
    let identresult = await DB.find("projects", {"pro_type": "M1000"});
    let identArry = new Array();
    for (let i = 0; i < identresult.length; i++) {
        identArry[i] = identresult[i].pro_identification;
    }
    await ctx.render("admin/classify/classify-add", {
        pro_identification: identArry,
        bc: "M1000",
    });
});
router.post("/M1000-add", async (ctx) => {
    try {
        let pro_name = ctx.request.body.pro_name;
        let pro_identification = ctx.request.body.pro_identification;
        let pro_max_num = ctx.request.body.pro_max_num;
        let pro_start_time = ctx.request.body.pro_start_time;
        let pro_hold = ctx.request.body.pro_hold;
        var pro_var = 'M1000';
        let addResult = await DB.insert("projects", {
            "pro_type": "M1000",
            "pro_name": pro_name,
            "pro_identification": pro_identification,
            "pro_state": parseInt(0),
            "pro_now_num": parseInt(0),
            "pro_man": [],
            "pro_full_state": parseInt(0),
            "pro_max_num": parseInt(pro_max_num),
            "pro_hold": parseFloat(pro_hold),
            "pro_start_time": pro_start_time,
        });

        ctx.body = {
            code: 200,
            messgae: "添加成功"
        }
    } catch (err) {
        ctx.body = {
            code: 401,
            message: "添加失败"
        }
    }
});
router.get("/M1000-edit", async (ctx) => {
    var identresult = await DB.find("projects", {"pro_type": "M1000"});
    var identArry = new Array();
    for (let i = 0; i < identresult.length; i++) {
        identArry[i] = identresult[i].pro_identification;
    }
    let id = ctx.query.id;
    let result = await DB.find("projects", {"_id": DB.getObjectId(id), "pro_type": "M1000"});
    await ctx.render("admin/classify/classify-edit", {
        list: result[0],
        bc: "M1000",
        pro_identification: identArry,
    });
});
router.post("/M1000-doedit", async (ctx) => {
    try {
        let id = ctx.request.body.pro_id;
        let pro_name = ctx.request.body.pro_name;
        let pro_identification = ctx.request.body.pro_identification;
        let pro_max_num = ctx.request.body.pro_max_num;
        let pro_start_time = ctx.request.body.pro_start_time;
        let pro_hold = ctx.request.body.pro_hold;

        let updateResult = await DB.update("projects", {"_id": DB.getObjectId(id), "pro_type": "M1000"}, {
            "pro_name": pro_name,
            "pro_identification": pro_identification,
            "pro_max_num": pro_max_num,
            "pro_start_time": pro_start_time,
            "pro_hold": pro_hold
        });
        console.log("修改成功");
        ctx.body = {
            code: 200,
            message: "修改成功"
        }
    } catch (err) {
        ctx.body = {
            code: 404,
            message: "修改失败"
        }
    }
});

router.get("/F800", async (ctx) => {
    var page = 1;
    var pageSize = 100;
    var result = await DB.find('projects', {"pro_type": "F800"}, {}, {
        page: page,
        pageSize: pageSize,
        sortJson: {"created_at": -1}
    });
    ctx.render("admin/classify/classify-list", {
        list: result,
        bc: "F800",
    });
});
router.get("/F800-add", async (ctx) => {
    let identresult = await DB.find("projects", {"pro_type": "F800"});
    let identArry = new Array();
    for (let i = 0; i < identresult.length; i++) {
        identArry[i] = identresult[i].pro_identification;
    }
    await ctx.render("admin/classify/classify-add", {
        pro_identification: identArry,
        bc: "F800",
    });
});
router.post("/F800-add", async (ctx) => {
    try {
        let pro_name = ctx.request.body.pro_name;
        let pro_identification = ctx.request.body.pro_identification;
        let pro_max_num = ctx.request.body.pro_max_num;
        let pro_start_time = ctx.request.body.pro_start_time;
        let pro_hold = ctx.request.body.pro_hold;
        let addResult = await DB.insert("projects", {
            "pro_type": "F800",
            "pro_name": pro_name,
            "pro_identification": pro_identification,
            "pro_state": parseInt(0),
            "pro_now_num": parseInt(0),
            "pro_man": [],
            "pro_full_state": parseInt(0),
            "pro_max_num": parseInt(pro_max_num),
            "pro_hold": parseFloat(pro_hold),
            "pro_start_time": pro_start_time,
        });

        ctx.body = {
            code: 200,
            messgae: "添加成功"
        }
    } catch (err) {
        ctx.body = {
            code: 401,
            message: "添加失败"
        }
    }
});
router.get("/F800-edit", async (ctx) => {
    var identresult = await DB.find("projects", {"pro_type": "F800"});
    var identArry = new Array();
    for (let i = 0; i < identresult.length; i++) {
        identArry[i] = identresult[i].pro_identification;
    }
    let id = ctx.query.id;
    let result = await DB.find("projects", {"_id": DB.getObjectId(id), "pro_type": "F800"});
    await ctx.render("admin/classify/classify-edit", {
        list: result[0],
        bc: "F800",
        pro_identification: identArry,
    });
});
router.post("/F800-doedit", async (ctx) => {
    try {
        let id = ctx.request.body.pro_id;
        let pro_name = ctx.request.body.pro_name;
        let pro_identification = ctx.request.body.pro_identification;
        let pro_max_num = ctx.request.body.pro_max_num;
        let pro_start_time = ctx.request.body.pro_start_time;
        let pro_hold = ctx.request.body.pro_hold;

        let updateResult = await DB.update("projects", {"_id": DB.getObjectId(id), "pro_type": "F800"}, {
            "pro_name": pro_name,
            "pro_identification": pro_identification,
            "pro_max_num": pro_max_num,
            "pro_start_time": pro_start_time,
            "pro_hold": pro_hold
        });
        console.log("插入成功");
        ctx.body = {
            code: 200,
            message: "修改成功"
        }
    } catch (err) {
        ctx.body = {
            code: 404,
            message: "修改失败"
        }
    }
});

module.exports = router.routes();