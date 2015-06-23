fis.config.merge({
    roadmap : {
        //所有静态资源文件都增加 /dist 作为前缀
        domain : '/dist'
    }
})

var $ = require('nodeajax');
$.run({
    static: '../'
})