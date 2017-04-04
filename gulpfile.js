// 使用gulp构建服务器重启以及浏览器刷新
// * router里包含app的首页以及api接口，首页只是占位作用，api才是服务端主要文件
// 1. 当服务端api文件改变，服务端重启，更新接口数据，相应浏览器也需要刷新，重新获取接口数据
// 2. 当只修改app中的src时，则交由webpack的热更新实现即可
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var path = require('path');
var bs = require('browser-sync').create();
var ROOT = path.resolve(__dirname);
var server = path.resolve(ROOT, 'server');
// browser-sync配置，配置里启动nodemon任务
gulp.task('browser-sync', ['nodemon'], function() {
    bs.init(null, {
        // 默认起的是3000端口
        proxy: "http://localhost:8080/index.html",
        port: 4000
    });
});
// browser-sync 监听文件
gulp.task('server', ['browser-sync'], function() {
    gulp.watch(['./server.js', './server/**', './server-token/**'], ['bs-delay']);
});


// 延时刷新
gulp.task('bs-delay', function() {
    setTimeout(function() {
        bs.reload();
        console.log('重启完毕!');
    }, 2000);
});

// 服务器重启
gulp.task('nodemon', function(cb) {
    // 设个变量来防止重复重启
    var started = false;
    nodemon({
        script: 'server.js',
        // 监听文件的后缀
        ext: "js html",
        env: {
            'NODE_ENV': 'development'
        },
        // 监听的路径
        watch: [
            server
        ]
    }).on('start', function() {
        if (!started) {
            cb();
            started = true;
        }
    })
});