// 设置编译列表中不包括 docs/ 和 node_modules/ 下的文件
fis.config.set('project.exclude', ["docs/**", "node_modules/**"]);

var $ = require('nodeajax');
$.run({
    // 静态资源目录
    static: '../dist/'
})