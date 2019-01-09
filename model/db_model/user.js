let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//  数据库集合名称：project
let userSchema = new Schema({
    //学号
    stu_id: {
        type: String,
        required: true,
    },
    //姓名
    name: {
        type: String,
        required: true,
    },
    //密码
    password: {
        type: String,
        required: true,
    },
    //性别：
    sex: {
        type: String,
        required: true,
    },
    //状态：
    state: {
        type: Number,
        required: true,
    },
    //学院：
    college: {
        type: String,
        required: true,
    },
    //班级
    class: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('User', userSchema);
