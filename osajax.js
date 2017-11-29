
(function () {
    function type(v) {
        return Object.prototype.toString.apply(v).slice(8,-1);
    }
    function eachArr(v,f) {
        for (var i=0;i<v.length;i++) {
            f(i,v[i]);
        }
    }
    function eachObj(v,f) {
        for (var k in v) {
            f(k,v[k]);
        }
    }
    // 参数可以为字符串
    function getObj(obj) {
        return type(obj)=='String'?{
            url:obj
        }:obj;
    }
    function ajax(method,obj) {
        return new Promise(function (resolve) {
            var xhr = new XMLHttpRequest();
            obj.headers && eachObj(obj.headers,function (k,v) {
                xhr.setRequestHeader(k,v);
            });
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4){
                    resolve(xhr);
                }
            };
            xhr.open(method,obj.url);
            xhr.send(obj.body?obj.body:'');
        });
    }

    var osajax = {};
    // 不需要 body 的请求
    eachArr(['head','get','copy','purge','unlock'],function (k,v) {
        osajax[v] = function (obj) {
            return ajax(v,getObj(obj));
        }
    })
    // 可能需要 body 的请求
    eachArr(['post','put','patch','delete','options','link','unlink','lock','propfind','view'],function (k,v) {
        osajax[v] = function (obj) {
            return ajax(v,obj);
        }
    })
    // 支持 commonjs 和 标签引用
    if (typeof module === 'object' && typeof module.exports === 'object'){
        module.exports = osajax;
    }
    else{
        this.osajax = osajax;
    }
})();

