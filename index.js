/*
 * author: ralf
 * ly nodejs mvc project
 */

var koa = require('koa');

var args = process.argv.splice(2);

//自定义部分
var route = require('./modules/route')

var app = koa();


//router
// app.use(router(app)); //开启路由
route.call(this,app)


app.on('error', function(err){
    console.log(err);
});


app.listen(8090);


// var exec = require('child_process').execSync;
// var spawn = require('child_process').spawn,
// // ls = spawn('ttt');
// exec('source ./ttt')

// var exec = require('child_process').execSync;
// // var cmd = 'nohup node --harmony ../index.js dev &'
// exec('source ttt');
