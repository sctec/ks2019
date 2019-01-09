const router = require('koa-router')();
const tools = require('../../model/tools.js');
const DB = require('../../model/db.js');

router.get('/', async (ctx) => {
    if (ctx.state.G.userinfo2.bm_state === 1) {
        ctx.body = "你已成功报名，请在“比赛信息”中查看相关信息";
    } else if (ctx.state.G.userinfo2.bm_state === 0) {
        await ctx.render('user/baoming');
    }

});

//post
router.post('/', async (ctx) => {
    let pro_type = ctx.request.body.pro_type;
    let theclass = ctx.request.body.class;
    let pro_result = await DB.find("projects", {"pro_type": pro_type});
    let bm_success = false;
    let bm_pro_name = null;
    let pro_num = null;
    for (let i = 0; i < pro_result.length; i++) {
        let pro_full_state = pro_result[i].pro_full_state;
        if (pro_full_state === 0) {
            let pro_id = pro_result[i]._id;
            let pro_man = pro_result[i].pro_man;
            let pro_now_num = parseInt(pro_result[i].pro_now_num);
            //做更改
            pro_man.push(ctx.state.G.userinfo2.stu_id);
            pro_now_num += 1;
            pro_num = parseInt(pro_result[i].pro_now_num);

            if (parseInt(pro_result[i].pro_now_num) == parseInt(pro_result[i].pro_max_num)) {
                pro_full_state == parseInt(1);
            }
            bm_success = true;
            bm_pro_name = pro_result[i].pro_name;
            var result = await DB.update('projects', {"_id": DB.getObjectId(pro_id)}, {
                "pro_man": pro_man,
                "pro_now_num": parseInt(pro_now_num),
                "pro_full_state": parseInt(pro_full_state),
            });
            break;
        }
    }

    if (bm_success === true) {
        //当前有名额时在用户表中插入相关信息
        var result = await DB.update('users', {"_id": DB.getObjectId(ctx.state.G.userinfo2._id)}, {
            "pro_type": pro_type,
            "class": theclass,
            "bm_state": parseInt(1),
            "pro_name": bm_pro_name,
            "pro_num": parseInt(pro_num),
            "pro_id": Math.floor(Math.random() * 999999),
        });
        if (result) {
            ctx.session.userinfo2.bm_state = parseInt(1);
            ctx.body = "报名成功";
        }
    } else if (bm_success === false) {
        ctx.body = "报名人数已满";
    }


});

router.get('/baomingout', async (ctx) => {
    ctx.session.userinfo = null;
    ctx.redirect(ctx.state.__HOST__ + "/admin/login");
});

module.exports = router.routes();