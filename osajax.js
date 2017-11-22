
(function () {

    function type(v) {
        return Object.prototype.toString.apply(v).slice(8,-1);
    }
    function each(v,f) {
        for (var k in v) {
            f(k,v[k]);
        }
    }

    function getObj(obj) {
        return type(obj)=='String'?{
            url:obj
        }:obj;
    }
    function ajax(method,obj) {
        return new Promise(function (resolve) {
            var xhr = new XMLHttpRequest();
            obj.headers && each(obj.headers,function (k,v) {
                xhr.setRequestHeader(k,v);
            });
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4){
                    resolve(xhr);
                }
            };
            xhr.open(method,obj.url);
            switch (method){
                case 'head':
                case 'get':
                    xhr.send();break;
                case 'post':
                    xhr.send(obj.body);break;
            }
        });
    }

    var o = {
        head:function (obj) {
            return ajax('head',getObj(obj));
        },
        get:function (obj) {
            return ajax('get',getObj(obj));
        },
        post:function (obj) {
            return ajax('post',obj);
        }
    };
    if (typeof module === 'object' && typeof module.exports === 'object'){
        module.exports = o;
    }
    else{
        window.osajax = o;
    }
})();

