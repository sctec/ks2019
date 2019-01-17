const router = require("koa-router")();
const DB = require("../../model/db.js");
const tools = require("../../model/tools.js");
const fs = require('fs');
const XLSX = require('xlsx');

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
        let searchResult = await DB.find("users", {"pro_type": pro_type, "user_record": parseInt(1)});
        await ctx.render("admin/statistics/project-search", {
            listNum: searchResult.length || 0,
            list: searchResult,
        });
    } catch (e) {
        ctx.body = "查找失败";
    }
});

//下载报表
router.get("/project-download", async (ctx) => {
    const _headers = ['比赛类别', '破纪录人数'];
    const _data = [];
    let m100Object = {};
    let m1000Object = {};
    let f100Object = {};
    let f800Object = {};

    let M100Result = await DB.find("users", {"user_record": parseInt(1), "pro_type": "M100"});
    m100Object["比赛类别"] = "男子100米";
    m100Object["破纪录人数"] = M100Result.length;
    let M1000Result = await DB.find("users", {"user_record": parseInt(1), "pro_type": "M1000"});
    m1000Object["比赛类别"] = "男子1000米";
    m1000Object["破纪录人数"] = M1000Result.length;
    let F100Result = await DB.find("users", {"user_record": parseInt(1), "pro_type": "F100"});
    f100Object["比赛类别"] = "女子100米";
    f100Object["破纪录人数"] = F100Result.length;
    let F800Result = await DB.find("users", {"user_record": parseInt(1), "pro_type": "F800"});
    f800Object["比赛类别"] = "女子800米";
    f800Object["破纪录人数"] = F800Result.length;

    _data.push(m100Object);
    _data.push(m1000Object);
    _data.push(f100Object);
    _data.push(f800Object);

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
            SheetNames: ['比赛类别报表'],
            Sheets: {
                '比赛类别报表': Object.assign({}, output, {'!ref': ref})
            }
        };

        // 导出 Excel
        XLSX.writeFile(workbook, '比赛类别报表.xlsx')
    }
    await dlXlsx();
    //类型
    ctx.type = '.xlsx';
    //请求返回，生成的xlsx文件
    ctx.body = fs.readFileSync('比赛类别报表.xlsx');
    //请求返回后，删除生成的xlsx文件，不删除也行，下次请求回覆盖
    fs.unlink('比赛类别报表.xlsx');
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
        let searchResult = await DB.find("users", {"class": parameter, "user_record": parseInt(1)});
        await ctx.render('admin/statistics/class-search', {
            listNum: searchResult.length || 0,
            list: searchResult,
        });
    } catch (e) {
        ctx.body = "查找失败";
    }
});


module.exports = router.routes();