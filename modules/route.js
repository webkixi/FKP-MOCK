/**
 * Module dependencies.
 */
var fs = require('fs');
var path = require('path')
var router = require('koa-router')();
var __ = require("lodash");


var getObjType = function(object){
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

/**
 * 过滤渲染文件
 * {param1} {json}   this.params
 * {param2} {json}   json of parse this.path
 * return   {boleean}
**/
function *filterRendeFile(pms, rjson){
    var rtn = false;
    var ext = rjson.ext;
    var cat = pms.cat;

    var exts = ['.css','.js','.swf','.jpg','.jpeg','.png','.bmp','.ico'];
    var tempExts = ['.html','.shtml'];
    var noPassCat = ['css','js','img','imgs','image','images'];

    if(!ext)
        rtn = true;

    if(__.indexOf(tempExts, ext) > -1)
        rtn = true;

    if(__.indexOf(noPassCat, cat) > -1)
        rtn = false;

    return rtn;
}


/**
 * 生成路由标签
 * {param1} {json}   this.params
 * {param2} {json}   json of parse this.path
 * return   {string} route tag, like 'index' , 'h5/lazypage'
**/
function *createTempPath2(pms,rjson){
    var params = pms;
    var route = false;

    var cat = params.cat, title = params.title, id = params.id;
    var gtpy = getObjType;

    if(id){
        route = title
        ? cat+'/'+title
        : cat;
    }

    else if(title){
        title = title.replace(rjson.ext,'');
        route = gtpy(title)==='Number'
        ? cat
        : cat+'/'+title;
    }

    else if(cat){
        cat = cat.replace(rjson.ext,'');
        route = gtpy(cat)==='Number'
        ? 'index'
        : cat;
    }

    else{
        route = 'index'
    }

    return route;
}

/**
 * 路由分配
 * {param1} koa implement
 * {param2} map of static file
 * return rende pages
**/
function init(app){
	console.log("router/init")
    app.use(router.routes());


    function *forBetter(){
        var param = this.params;
        console.log(param);
        if(param.cat === 'region'){
            yield getRegion.call(this);
        }
        
        else
            yield distribute.call(this)
    }

    router
    //.redirect('/firm/detail/view.html', '/firm/view.html')


    .get('/',forBetter)
    .get('/:cat',forBetter)
    .get('/:cat/:title',forBetter)
    .get('/:cat/:title/:id',forBetter)

    .post('/:cat',forBetter)
    .post('/:cat/:title',forBetter)

}

//获取地址
function *getRegion(){
    var body={};
    if(this.method==='GET'){
        body = this.query;
    }
}



/**
 * 路由配置
 * {param1} koa implement
 * {param2} map of static file
 * return rende pages
**/
function *distribute(){

console.log('router/distribute')
    //绑定url地址解析
    this.local = this.req._parsedUrl;

    var routeJson = path.parse(this.path);

        var isRender = yield filterRendeFile(this.params,routeJson);
        var params = this.params;
        var pageData = {};

        route = isRender
        ? yield createTempPath2.call(this,this.params,routeJson)
        : false

            if (route){
				if (fs.existsSync(path.join(__dirname,'./json/'+route+'.json') )){
					pageData = yield JSON.parse(fs.readFileSync(path.join(__dirname,'./json/'+route+'.json')));
				}
				yield returnJson.call(this,true,route,pageData);
            }

            else{
                yield returnJson.call(this,false);
            }

}

function *returnJson(stat,route,data){
    if (stat){
        this.body = JSON.stringify(data);
    }
    else
        this.body = '{"stat": 0}';
}


module.exports = init
