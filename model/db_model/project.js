let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//  数据库集合名称：project
let projectSchema = new Schema({
    //项目类型：比如1000米跑
    pro_type: {
        type: String,
        required: true,
    },
    //项目标识：
    pro_identification: {
        type: String,
        required: true,
    },
    //项目名称：比如男子1000米跑第一场次
    pro_name: {
        type: String,
        required: true,
    },
    //存储运动员的信息
    pro_man: {
        type: Array,
    },
    //当前参赛人数：
    pro_now_num: {
        type: Number,
        required: true,
    },
    //允许参赛人数：比如6人
    pro_max_num: {
        type: Number,
        required: true,
    },
    //开始时间：比如2019/1/10 10:00
    pro_start_time: {
        type: Date,
        default: Date.now()
    },
    //记录保持：
    pro_hold: {
        type: Number,
        default: 0.00
    },
    //项目状态:0：停用；1：正在使用
    pro_state: {
        type: Number,
        default: 0
    },
    //项目人数已满标识：0未满，1：已满
    pro_full_state: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Project', projectSchema);
