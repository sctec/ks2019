const router = require("koa-router")();
const DB = require("../../model/db.js");
const tools = require("../../model/tools.js");

router.get("/", async (ctx) => {
    let page = ctx.query.page || 1;
    let pageSize = 200;
    let count = await DB.count("users", {"bm_state": parseInt(1)});

    let result = await DB.find("users", {"bm_state": parseInt(1)}, {}, {
        page: page,
        pageSize: pageSize
    });
    // console.log(result);
    await ctx.render('admin/users-list', {
        listNum: count,
        list: result,
        page: page,
        totalPages: Math.ceil(count / pageSize)
    });
});

// router.get("/member_add", async (ctx) => {
//     await ctx.render('admin/member/member-add');
// });
//
// router.get("/member-edit", async (ctx) => {
//     let id = ctx.query.id;
//     let result = await DB.find("users", {"_id": DB.getObjectId(id)});
//     await ctx.render('admin/member/member-edit', {
//         list: result[0]
//     });
// });
// router.post('/member_doedit', async (ctx) => {
//     console.log(ctx.request.body);  //{ username: 'admin', password: '123456' }
//     try {
//         let id = ctx.request.body.id;
//         let email = ctx.request.body.email;
//         let nickname = ctx.request.body.nickname;
//         let phone = ctx.request.body.phone;
//         let charactor = ctx.request.body.charactor;
//         let updateResult = await DB.update('users', {"_id": DB.getObjectId(id)}, {
//             "phone": phone,
//             "email": email,
//             "nickname": nickname,
//             "charactor": charactor,
//         });
//         console.log("插入成功");
//         ctx.body = {
//             code: 200,
//             message: "修改成功"
//         }
//     } catch (errs) {
//         ctx.body = {
//             code: 401,
//             message: "修改失败"
//         }
//     }
// });
//
// router.get("/member-password", async (ctx) => {
//     let id = ctx.query.id;
//     let result = await DB.find("users", {"_id": DB.getObjectId(id)});
//     await ctx.render('admin/member/member-password', {
//         list: result[0],
//     });
// });
//
// router.post("/member-dopassword", async (ctx) => {
//     try {
//         console.log(ctx.request.body);
//         let id = ctx.request.body.id;
//         let password = ctx.request.body.password;
//         let updatepassword = await DB.update("users", {"_id": DB.getObjectId(id)}, {"password": tools.md5(password)});
//         ctx.redirect(ctx.state.__HOST__ + "/admin/user");
//     } catch (err) {
//         await ctx.render('admin/error', {
//             message: err,
//         });
//     }
// });


module.exports = router.routes();