const router = require("koa-router")();
const DB = require("../../model/db.js");
const tools = require("../../model/tools.js");
const fs = require('fs');
const XLSX = require('xlsx');


router.get("/", async (ctx) => {
    let page = ctx.query.page || 1;
    let pageSize = 1500;
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

//下载报表
router.get("/F100-download", async (ctx) => {
    const _headers = ['学号', '姓名', '班级', '比赛编号', "比赛分组", "比赛赛道", "比赛成绩", "比赛排名", "比赛记录"];
    const _data = [];
    let result = await DB.find("users", {"sys_user": 0, "sex": "女", "bm_state": parseInt(1), "pro_type": "F100"}, {}, {
        page: parseInt(1),
        pageSize: parseInt(1500),
        sortJson: {"user_score": 1}
    });
    for (i = 0; i < result.length; i++) {
        let stu_id_update = result[i].stu_id;
        let addjson = {};
        addjson["学号"] = result[i].stu_id;
        addjson["姓名"] = result[i].name;
        addjson["班级"] = result[i].class;
        addjson["比赛编号"] = result[i].pro_id;
        addjson["比赛分组"] = result[i].pro_name;
        addjson["比赛赛道"] = result[i].pro_num;//比赛赛道
        addjson["比赛成绩"] = result[i].user_score;
        addjson["比赛排名"] = i + 1;
        addjson["比赛记录"] = result[i].user_record;
        _data.push(addjson);
        let updateResult = await DB.update('users', {"stu_id": stu_id_update}, {
            "user_paiming": i + 1,
        });
    }

    const dlXlsx = () => {
        const headers = _headers
            .map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65 + i) + 1}))
            // 为 _headers 添加对应的单元格位置
            // [ { v: 'id', position: 'A1' },
            //   { v: 'name', position: 'B1' },
            //   { v: 'age', position: 'C1' },
            //   { v: 'country', position: 'D1' },
            .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
        // 转换成 worksheet 需要的结构
        // { A1: { v: 'id' },
        //   B1: { v: 'name' },
        //   C1: { v: 'age' },
        //   D1: { v: 'country' },

        const data = _data
            .map((v, i) => _headers.map((k, j) => Object.assign({}, {
                v: v[k],
                position: String.fromCharCode(65 + j) + (i + 2)
            })))
            // 匹配 headers 的位置，生成对应的单元格数据
            // [ [ { v: '1', position: 'A2' },
            //     { v: 'test1', position: 'B2' },
            //     { v: '30', position: 'C2' },
            //     { v: 'China', position: 'D2' }],
            //   [ { v: '2', position: 'A3' },
            //     { v: 'test2', position: 'B3' },
            //     { v: '20', position: 'C3' },
            //     { v: 'America', position: 'D3' }],
            //   [ { v: '3', position: 'A4' },
            //     { v: 'test3', position: 'B4' },
            //     { v: '18', position: 'C4' },
            //     { v: 'Unkonw', position: 'D4' }] ]
            .reduce((prev, next) => prev.concat(next))
            // 对刚才的结果进行降维处理（二维数组变成一维数组）
            // [ { v: '1', position: 'A2' },
            //   { v: 'test1', position: 'B2' },
            //   { v: '30', position: 'C2' },
            //   { v: 'China', position: 'D2' },
            //   { v: '2', position: 'A3' },
            //   { v: 'test2', position: 'B3' },
            //   { v: '20', position: 'C3' },
            //   { v: 'America', position: 'D3' },
            //   { v: '3', position: 'A4' },
            //   { v: 'test3', position: 'B4' },
            //   { v: '18', position: 'C4' },
            //   { v: 'Unkonw', position: 'D4' },
            .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
        // 转换成 worksheet 需要的结构
        //   { A2: { v: '1' },
        //     B2: { v: 'test1' },
        //     C2: { v: '30' },
        //     D2: { v: 'China' },
        //     A3: { v: '2' },
        //     B3: { v: 'test2' },
        //     C3: { v: '20' },
        //     D3: { v: 'America' },
        //     A4: { v: '3' },
        //     B4: { v: 'test3' },
        //     C4: { v: '18' },
        //     D4: { v: 'Unkonw' }
        // 合并 headers 和 data
        const output = Object.assign({}, headers, data);
        // 获取所有单元格的位置
        const outputPos = Object.keys(output);
        // 计算出范围
        const ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];

        // 构建 workbook 对象
        const workbook = {
            SheetNames: ['女子100米'],
            Sheets: {
                '女子100米': Object.assign({}, output, {'!ref': ref})
            }
        };

        // 导出 Excel
        XLSX.writeFile(workbook, '女子100米.xlsx')
    }
    await dlXlsx();
    //类型
    ctx.type = '.xlsx';
    //请求返回，生成的xlsx文件
    ctx.body = fs.readFileSync('女子100米.xlsx');
    //请求返回后，删除生成的xlsx文件，不删除也行，下次请求回覆盖
    fs.unlink('女子100米.xlsx');
});


module.exports = router.routes();