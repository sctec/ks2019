const router = require('koa-router')();
const DB = require('../../model/db.js');

router.get('/', async (ctx) => {
    ctx.render('admin/index');
});


router.get('/changeStatus', async (ctx) => {
    let collectionName = ctx.query.collectionName;
    /*数据库表*/
    let attr = ctx.query.attr;
    /*属性*/
    let id = ctx.query.id;
    /*更新的 id*/

    let data = await DB.find(collectionName, {"_id": DB.getObjectId(id)});


    if (data.length > 0) {
        if (data[0][attr] == 1) {
            var json = {
                /*es6 属性名表达式*/
                [attr]: 0
            };
        } else {
            var json = {
                [attr]: 1
            };
        }

        let updateResult = await DB.update(collectionName, {"_id": DB.getObjectId(id)}, json);

        if (updateResult) {
            ctx.body = {"message": '更新成功', "success": true};
        } else {
            ctx.body = {"message": "更新失败", "success": false}
        }

    } else {
        ctx.body = {"message": '更新失败,参数错误', "success": false};
    }
});

/*公共的删除方法*/
router.delete('/remove', async (ctx) => {
    //console.log(ctx.query);
    try {
        let collection = ctx.query.collection;
        /*数据库表*/
        let id = ctx.query.id;
        /*删除 id*/
        console.log(collection);
        console.log(id);
        let result = await DB.remove(collection, {"_id": DB.getObjectId(id)});
        //返回到哪里?
        ctx.body = {
            code: 200,
            message: "删除成功"
        }
        // return result;
    } catch (err) {
        ctx.body = {
            code: 401,
            message: "删除失败"
        }
        // ctx.redirect(ctx.state.G.prevPage);
    }
});

module.exports = router.routes();