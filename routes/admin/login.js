const router = require('koa-router')();
const tools = require('../../model/tools.js');
const DB = require('../../model/db.js');

router.get('/', async (ctx) => {
    await ctx.render('admin/login');
});

//post
router.post('/dologin', async (ctx) => {
    let stu_id = ctx.request.body.stu_id;
    let password = ctx.request.body.password;
    var result = await DB.find('users', {"stu_id": stu_id, "password": tools.md5(password)});
    if (result[0] && result[0].sys_user == 1) {
        // console.log('成功');
        // console.log(result[0]);
        ctx.session.userinfo = result[0];
        ctx.redirect(ctx.state.__HOST__ + '/admin');
    } else if (result[0] && result[0].sys_user == 0) {
        ctx.session.userinfo2 = result[0];
        ctx.redirect(ctx.state.__HOST__ + '/user');
    } else {
        ctx.render('admin/error', {
            message: '用户名或者密码错误',
            redirect: ctx.state.__HOST__ + '/admin/login'
        });
    }
});

router.get('/loginout', async (ctx) => {
    ctx.session.userinfo = null;
    ctx.redirect(ctx.state.__HOST__ + "/admin/login");
});

module.exports = router.routes();