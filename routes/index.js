const router =require("koa-router")();

router.get("/",async (ctx)=>{
    ctx.render("default/text");
});
module.exports=router.routes();
