// $(function(){
//     app.toggle();
// });
var app={
    toggle:function(el,collectionName,attr,id){
        $.get('/admin/changeStatus',{collectionName:collectionName,attr:attr,id:id},function(data) {
            if (data.success) {
                if (el.src.indexOf('yes') != -1) {
                    el.src = './images/no.gif';
                } else {
                    el.src = './images/yes.gif';
                }
            }
        })
    },
    // confirmDelete(){
    //     $('.delete').click(function(){
    //         var flag=confirm('您确定要删除吗?');
    //         return flag;
    //     })
    // }
};


























