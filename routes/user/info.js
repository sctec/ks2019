const router = require('koa-router')();
const tools = require('../../model/tools.js');
const DB = require('../../model/db.js');

router.get('/', async (ctx) => {
    let userId = ctx.state.G.userinfo2._id;
    let bm_state = ctx.state.G.userinfo2.bm_state;
    let result = await DB.find("users", {"_id": DB.getObjectId(userId)});
    if (bm_state == 0) {
        ctx.body = "你还未报名，请先报名";
    }
    else if (bm_state == 1) {
        ctx.render('user/info', {
            list: result,
        });
    }
});


module.exports = router.routes();