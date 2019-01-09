const router = require('koa-router')();
const tools = require('../../model/tools.js');
const DB = require('../../model/db.js');

router.get('/', async (ctx) => {
    await ctx.render('admin/register');
});

//post
router.post('/doregister', async (ctx) => {
    let stu_id = ctx.request.body.stu_id;
    let name = ctx.request.body.name;
    let sex = ctx.request.body.sex;
    let password = ctx.request.body.password;
    let repassword = ctx.request.body.repassword;
    if (password != repassword) {
        ctx.render('admin/error', {
            message: '密码不一致',
            redirect: ctx.state.__HOST__ + '/admin/register'
        });
    }
    var result = await DB.find('users', {"stu_id": stu_id});
    if (result[0]) {
        ctx.render('admin/error', {
            message: '用户名重复',
            redirect: ctx.state.__HOST__ + '/admin/register'
        });
    } else {
        let addResult = await DB.insert("users", {
            "stu_id": stu_id,
            "name": name,
            "sex": sex,
            "sys_user": parseInt(0),    //是否为系统管理员
            "password": tools.md5(password),
            "created_at": new Date(),
            "bm_state": parseInt(0),    //比赛状态
            "pro_type": "",     //比赛类型
            "pro_name": "",     //比赛标识
            "pro_id": parseInt(-1),       //比赛编号
            "pro_num": parseInt(-1),    //比赛赛道
            "user_score": parseFloat(0), //比赛成绩
            "user_record": parseInt(0),  //个人记录
            "college": "",//学院
            "class": "",//班级
            "pro_hold": parseFloat(-1),
        });
        // console.log(addResult.ops[0]);
        if (addResult) {
            ctx.session.userinfo2 = addResult.ops[0];
            ctx.redirect(ctx.state.__HOST__ + '/user');
            // await ctx.render('admin/login');
        }
    }
});

module.exports = router.routes();