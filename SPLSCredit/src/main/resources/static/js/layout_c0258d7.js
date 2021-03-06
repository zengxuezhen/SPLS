define("common:page/layout.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    require("common:node_modules/html5shiv/dist/html5shiv"),
    require("common:node_modules/es5-shim/es5-shim"),
    require("common:node_modules/es5-shim/es5-sham"),
    require("common:node_modules/matchmedia-polyfill/matchMedia"),
    require("common:widget/lib/classList/classList"),
    require("common:widget/lib/console-polyfill/console-polyfill");
    var utils = require("common:widget/ui/utils/utils")
      , Promise = require("common:node_modules/bluebird/js/browser/bluebird")
      , webpCheck = require("common:node_modules/webp-check/index");
    require("common:node_modules/we-status/dist/index");
    var split = require("common:widget/ui/splitNotice/splitNotice")
      , bond = require("common:widget/ui/bondNotice/bondNotice")
      , hasSpitDialog = split.init();
    if (!hasSpitDialog) {
        var locationHref = location.href;
        locationHref.indexOf("59eee86985c66d1e7bad03b1") > 0 || bond.init()
    }
    window.Promise = Promise;
    var statistic = require("common:widget/ui/statistic/statistic")
      , tplConf = window.tplConf;
    try {
        tplConf.autoPV && tplConf.pageKey && statistic.pv({
            pageKey: tplConf.pageKey
        })
    } catch (e) {}
    var Layout = function() {
        function Layout() {
            _classCallCheck(this, Layout)
        }
        return Layout.prototype.initUtmOperate = function() {
            utils.saveUtmParams()
        }
        ,
        Layout
    }();
    try {
        webpCheck.init()
    } catch (err) {}
    !function() {
        if (window.tplConf.isProduction) {
            var bp = document.createElement("script")
              , curProtocol = window.location.protocol.split(":")[0];
            bp.src = "https" === curProtocol ? "https://zz.bdstatic.com/linksubmit/push.js" : "http://push.zhanzhang.baidu.com/push.js";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(bp, s)
        }
    }(),
    module.exports = new Layout
});
