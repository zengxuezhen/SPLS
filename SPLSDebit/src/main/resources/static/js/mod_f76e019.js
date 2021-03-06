var require, define;
!function(global) {
    function createScript(url, onerror) {
        if (!(url in scriptsMap)) {
            scriptsMap[url] = !0;
            var script = document.createElement("script");
            if (onerror) {
                var tid;
                !function() {
                    var onload = function() {
                        clearTimeout(tid)
                    };
                    tid = setTimeout(onerror, require.timeout),
                    script.onerror = function() {
                        clearTimeout(tid),
                        onerror()
                    }
                    ,
                    "onload"in script ? script.onload = onload : script.onreadystatechange = function() {
                        ("loaded" == this.readyState || "complete" == this.readyState) && onload()
                    }
                }()
            }
            return script.type = "text/javascript",
            script.src = url,
            head.appendChild(script),
            script
        }
    }
    function loadScript(id, callback, onerror) {
        var queue = loadingMap[id] || (loadingMap[id] = []);
        queue.push(callback);
        var url, res = resMap[id] || resMap[id + ".js"] || {}, pkg = res.pkg;
        url = pkg ? pkgMap[pkg].url : res.url || id,
        createScript(url, onerror && function() {
            onerror(id)
        }
        )
    }
    if (!require) {
        var head = document.getElementsByTagName("head")[0]
          , loadingMap = {}
          , factoryMap = {}
          , modulesMap = {}
          , scriptsMap = {}
          , resMap = {}
          , pkgMap = {};
        define = function(id, factory) {
            id = id.replace(/\.js$/i, ""),
            factoryMap[id] = factory;
            var queue = loadingMap[id];
            if (queue) {
                for (var i = 0, n = queue.length; n > i; i++)
                    queue[i]();
                delete loadingMap[id]
            }
        }
        ,
        require = function(id) {
            if (id && id.splice)
                return require.async.apply(this, arguments);
            id = require.alias(id);
            var mod = modulesMap[id];
            if (mod)
                return mod.exports;
            var factory = factoryMap[id];
            if (!factory)
                throw "[ModJS] Cannot find module `" + id + "`";
            mod = modulesMap[id] = {
                exports: {}
            };
            var ret = "function" == typeof factory ? factory.apply(mod, [require, mod.exports, mod]) : factory;
            return ret && (mod.exports = ret),
            mod.exports
        }
        ,
        require.async = function(names, onload, onerror) {
            function findNeed(depArr) {
                for (var i = 0, n = depArr.length; n > i; i++) {
                    var dep = require.alias(depArr[i]);
                    if (dep in factoryMap) {
                        var child = resMap[dep] || resMap[dep + ".js"];
                        child && "deps"in child && findNeed(child.deps)
                    } else if (!(dep in needMap)) {
                        needMap[dep] = !0,
                        needNum++,
                        loadScript(dep, updateNeed, onerror);
                        var child = resMap[dep] || resMap[dep + ".js"];
                        child && "deps"in child && findNeed(child.deps)
                    }
                }
            }
            function updateNeed() {
                if (0 == needNum--) {
                    for (var args = [], i = 0, n = names.length; n > i; i++)
                        args[i] = require(names[i]);
                    onload && onload.apply(global, args)
                }
            }
            "string" == typeof names && (names = [names]);
            var needMap = {}
              , needNum = 0;
            findNeed(names),
            updateNeed()
        }
        ,
        require.resourceMap = function(obj) {
            var k, col;
            col = obj.res;
            for (k in col)
                col.hasOwnProperty(k) && (resMap[k] = col[k]);
            col = obj.pkg;
            for (k in col)
                col.hasOwnProperty(k) && (pkgMap[k] = col[k])
        }
        ,
        require.loadJs = function(url) {
            createScript(url)
        }
        ,
        require.loadCss = function(cfg) {
            if (cfg.content) {
                var sty = document.createElement("style");
                sty.type = "text/css",
                sty.styleSheet ? sty.styleSheet.cssText = cfg.content : sty.innerHTML = cfg.content,
                head.appendChild(sty)
            } else if (cfg.url) {
                var link = document.createElement("link");
                link.href = cfg.url,
                link.rel = "stylesheet",
                link.type = "text/css",
                head.appendChild(link)
            }
        }
        ,
        require.alias = function(id) {
            return id.replace(/\.js$/i, "")
        }
        ,
        require.timeout = 5e3
    }
}(this);
