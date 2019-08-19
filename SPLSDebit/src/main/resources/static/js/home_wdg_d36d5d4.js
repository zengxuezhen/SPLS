;/*!/client/widget/index/carousel/carousel.js*/
define("home:widget/index/carousel/carousel.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var $ = require("common:widget/lib/jquery/jquery")
      , Carousel = function() {
        function Carousel() {
            _classCallCheck(this, Carousel),
            this.num = 0,
            this.time = ""
        }
        return Carousel.prototype.setStaticData = function(key, value) {
            this[key] = value
        }
        ,
        Carousel.prototype.getStaticData = function(key) {
            return this[key]
        }
        ,
        Carousel.prototype.init = function() {
            var _this = this
              , time = setInterval(function() {
                _this.setTimer()
            }, 5e3);
            this.setStaticData("time", time);
            var that = this;
            $(".carousel .spot span").on("click", function() {
                that.clickSwitch(this, that)
            })
        }
        ,
        Carousel.prototype.setTimer = function() {
            var num = this.getStaticData("num")
              , total = $(".carousel li").length;
            $(".carousel li").eq(num).fadeOut(600),
            $(".carousel .spot span").eq(num).removeClass("active"),
            num++,
            num >= total && (num = 0),
            $(".carousel li").eq(num).fadeIn(600),
            $(".carousel .spot span").eq(num).addClass("active"),
            this.setStaticData("num", num)
        }
        ,
        Carousel.prototype.clickSwitch = function(e) {
            var _this2 = this
              , index = $(e).index()
              , time = this.getStaticData("time");
            clearInterval(time),
            $(".carousel .spot span").eq(index).siblings("span").attr("class", ""),
            $(".carousel .spot span").eq(index).attr("class", "active"),
            $(".carousel li").eq(index).fadeIn(600),
            $(".carousel li").eq(index).siblings("li").fadeOut(600),
            this.setStaticData("num", index),
            clearInterval(time),
            this.setStaticData("time", setInterval(function() {
                _this2.setTimer()
            }, 5e3))
        }
        ,
        Carousel
    }();
    module.exports = new Carousel
});
;/*!/client/widget/index/debt/debt.js*/
define("home:widget/index/debt/debt.js", function(require, exports, module) {
    "use strict";
    {
        var $ = require("common:widget/lib/jquery/jquery");
        require("common:node_modules/numeral/numeral")
    }
    module.exports = {
        init: function() {
            this.bindEvent(),
            this.resoleData(),
            this.moreHoverEffect(),
            this.trClickEvent()
        },
        bindEvent: function() {
            var oTr = $(".regular-container .t-caption tbody tr");
            oTr.hover(function() {
                $(this).addClass("hover")
            }, function() {
                oTr.removeClass("hover")
            })
        },
        resoleData: function() {
            $(".debt-container .data-list .progress").each(function(index, item) {
                var percentage = $(item).attr("data-percent");
                $(item).find(".percentage-text").text(parseInt(percentage) + "%"),
                $(item).find(".inner").width(1.2 * percentage)
            })
        },
        moreHoverEffect: function() {
            $(".r-more").hover(function() {
                $(this).addClass("hover"),
                $(this).find("img").attr({
                    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjE0RTY0N0VDMEUxMTFFNjhBRDk5MjJEODM3NDJCMEMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjE0RTY0N0RDMEUxMTFFNjhBRDk5MjJEODM3NDJCMEMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDg5NUFCMUFCQzI3MTFFNkEyNjNCMTg1NTI1M0REREMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDg5NUFCMUJCQzI3MTFFNkEyNjNCMTg1NTI1M0REREMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4JKpunAAAAjVBMVEX/fjH/7OD/69//59n/+PT/gjj/dST/kE//s4f/dSP/z7P/qXf/i0f/eCn/gTj/49P/fTH/fzP/+/j/qnj/+vf/qXb/fjL/gzn/kE7/qnn/eCj/jUn/5NX/diX/59j/q3n/zrL/jEj/dyf/s4b/yar/697/7OH/pXH/jUr/pnL/y6z/tIj/+fb/ch////+ht8aqAAAAL3RSTlP/////////////////////////////////////////////////////////////AFqlOPcAAAEASURBVHjajJPploMgDIUjUlHU2tbu+z5reP/HG2pPJYAyvb/E+x2DSS6oVlwexHy3m4uD5OYtvB5YXmKrMmcOMPlJ0FKSTigQbdDThhmgGmOHxtULYICdAvYEpifsUTFtgBR7lT6AKGvPi2+nWMY0kJvzVe0dYqaAk/5A7BIlB2ndO1axTUioMUjUIDBICBhhkBhBgj7BP8zQfAA/ldoSwC2Bw0jdF6SE8P1oQC9ZB339mzLo60bRVvv+moOamePA9R/DouPeun4zbrIwX5Xt4+W5ckXvyv2+t7T/r73+RkeVglnRS8PRa8K7NvY5v3np1vE/rpaQZbBcHUn8/wQYAHNcnIyDN29TAAAAAElFTkSuQmCC"
                })
            }, function() {
                $(this).removeClass("hover"),
                $(this).find("img").attr({
                    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjE0RTY0N0FDMEUxMTFFNjhBRDk5MjJEODM3NDJCMEMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjE0RTY0NzlDMEUxMTFFNjhBRDk5MjJEODM3NDJCMEMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDg5NUFCMUFCQzI3MTFFNkEyNjNCMTg1NTI1M0REREMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDg5NUFCMUJCQzI3MTFFNkEyNjNCMTg1NTI1M0REREMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4gNS6dAAAANlBMVEXa2tro6Ojd3d35+fn4+Pjg4OD9/f3h4eHy8vLr6+vb29vn5+fx8fHq6ur6+vrc3NzZ2dn///9/BJNqAAAAEnRSTlP//////////////////////wDiv78SAAAAz0lEQVR42oyT2RaDIAxEE9m1DeH/f7ZoqyxR6Dwpc88hZBJIl6xHFwGiQ2/LKZwfhCtfWpF6IAA3gtAAZFjIUAF05BtFfQJ062eCfoDhB5kvEPhRYQeo1L+8usuAMoDl/yXKxQS26k9UPbFa8E3dKqmW8IA8JBAcDwkHfZM6IsfLkrBbeagE9v7pChA5LJRoqa5wQz8XiUM/P9MP/dyoutXSB9uEJfw9rDpu3ftH3NXAbLr1+f3fyM2Hdjr288WZr96xvBUCqMR2P63/R4ABAOBSOtarLmH+AAAAAElFTkSuQmCC"
                })
            })
        },
        trClickEvent: function() {
            var eventArr = [$(".fund .data-list tr"), $(".regular .data-list tr"), $(".debt-container .data-list tr")];
            eventArr.forEach(function(item) {
                item.on("click", function() {
                    window.open($(this).find("a").attr("href"))
                })
            })
        }
    }
});
;/*!/client/widget/index/regular/regular.js*/
define("home:widget/index/regular/regular.js", function(require, exports, module) {
    "use strict";
    var $ = require("common:widget/lib/jquery/jquery")
      , exchangeUtils = require("common:widget/ui/utils/exchange-utils")
      , utils = require("common:widget/ui/utils/utils");
    module.exports = {
        init: function() {
            this.resoleData(),
            this.resolveButtonStatus()
        },
        resoleData: function() {
            $(".regular .data-list .progress").each(function(index, item) {
                var percentage = $(item).attr("data-now") / $(item).attr("data-total")
                  , percent = 100 * percentage;
                $(item).find(".percentage-text").text(parseFloat(percent.toFixed(2)) + "%"),
                $(item).find(".inner").width(120 * percentage)
            })
        },
        resolveButtonStatus: function() {
            $(".regular .data-list .action").each(function(index, item) {
                var btn = $(item).find("a")
                  , status = btn.data("status")
                  , btnData = exchangeUtils.btnType(status);
                if (2 == status) {
                    var timeDiv = btn.find(".time")
                      , time = timeDiv.data("time");
                    timeDiv.html("还有" + utils.formatDateHour(time))
                } else
                    btn.html(btnData.buttonName)
            })
        }
    }
});
;/*!/client/widget/index/salary/salary.js*/
define("home:widget/index/salary/salary.js", function(require, exports, module) {
    var $ = require("common:widget/lib/jquery/jquery");
    module.exports = {
        init: function() {
            this.bindEvent(),
            this.resolveBtnStatus("#J_btn_status")
        },
        bindEvent: function() {
            $(".salary .plan").on("click", function() {
                window.open($(this).find("a").attr("href"))
            })
        },
        resolveBtnStatus: function(id) {
            var _this = this
              , el = $(id)
              , status = parseInt(el.data("status"), 10)
              , totaltime = el.data("wait") - 0 || 0
              , type = el.data("type")
              , timeid = void 0
              , fn = function() {
                totaltime -= 1,
                _this.formatSeconds(totaltime, id, status, type),
                0 >= totaltime && (clearInterval(timeid),
                location.reload())
            };
            return el.length <= 0 || -1 === status || 0 >= totaltime || 3 !== status && 0 !== status ? !1 : (timeid = setInterval(fn, 1e3),
            void fn.call(this))
        },
        formatSeconds: function(value, el, sta, type) {
            var theTime = parseInt(value, 10)
              , theTime1 = 0
              , theTime2 = 0
              , theTime3 = 0;
            theTime > 60 && (theTime1 = parseInt(theTime / 60, 0),
            theTime = parseInt(theTime % 60, 0),
            theTime1 > 60 && (theTime2 = parseInt(theTime1 / 60, 0),
            theTime1 = parseInt(theTime1 % 60, 0)),
            theTime2 > 24 && (theTime3 = parseInt(theTime2 / 24, 0),
            theTime2 = parseInt(theTime2 % 24, 0)));
            var result = void 0;
            result = theTime3 > 0 ? parseInt(theTime3, 0) + "天" + parseInt(theTime2, 0) + "时" : theTime2 > 0 ? parseInt(theTime2, 0) + "时" + parseInt(theTime1, 0) + "分" : parseInt(theTime1, 0) + "分" + parseInt(theTime, 0) + "秒",
            0 === sta && (result += "XJH" == type ? "后加入" : "后预定"),
            3 === sta && (result += "后加入"),
            $(el).html(result)
        }
    }
});
;/*!/client/widget/index/fund/fund.js*/
define("home:widget/index/fund/fund.js", function(require, exports, module) {
    "use strict";
    var $ = require("common:widget/lib/jquery/jquery")
      , regular = require("home:widget/index/regular/regular")
      , debt = require("home:widget/index/debt/debt")
      , salary = require("home:widget/index/salary/salary");
    module.exports = {
        init: function() {
            this.bindEvent(),
            regular.init(),
            debt.init(),
            salary.init(),
            this.moreHoverEffect()
        },
        bindEvent: function() {
            var oTr = $(".fund-container .t-caption tbody tr");
            oTr.hover(function() {
                $(this).addClass("hover")
            }, function() {
                oTr.removeClass("hover")
            })
        },
        moreHoverEffect: function() {
            $(".r-more").hover(function() {
                $(this).addClass("hover"),
                $(this).find("img").attr({
                    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjE0RTY0N0VDMEUxMTFFNjhBRDk5MjJEODM3NDJCMEMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjE0RTY0N0RDMEUxMTFFNjhBRDk5MjJEODM3NDJCMEMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDg5NUFCMUFCQzI3MTFFNkEyNjNCMTg1NTI1M0REREMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDg5NUFCMUJCQzI3MTFFNkEyNjNCMTg1NTI1M0REREMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4JKpunAAAAjVBMVEX/fjH/7OD/69//59n/+PT/gjj/dST/kE//s4f/dSP/z7P/qXf/i0f/eCn/gTj/49P/fTH/fzP/+/j/qnj/+vf/qXb/fjL/gzn/kE7/qnn/eCj/jUn/5NX/diX/59j/q3n/zrL/jEj/dyf/s4b/yar/697/7OH/pXH/jUr/pnL/y6z/tIj/+fb/ch////+ht8aqAAAAL3RSTlP/////////////////////////////////////////////////////////////AFqlOPcAAAEASURBVHjajJPploMgDIUjUlHU2tbu+z5reP/HG2pPJYAyvb/E+x2DSS6oVlwexHy3m4uD5OYtvB5YXmKrMmcOMPlJ0FKSTigQbdDThhmgGmOHxtULYICdAvYEpifsUTFtgBR7lT6AKGvPi2+nWMY0kJvzVe0dYqaAk/5A7BIlB2ndO1axTUioMUjUIDBICBhhkBhBgj7BP8zQfAA/ldoSwC2Bw0jdF6SE8P1oQC9ZB339mzLo60bRVvv+moOamePA9R/DouPeun4zbrIwX5Xt4+W5ckXvyv2+t7T/r73+RkeVglnRS8PRa8K7NvY5v3np1vE/rpaQZbBcHUn8/wQYAHNcnIyDN29TAAAAAElFTkSuQmCC"
                })
            }, function() {
                $(this).removeClass("hover"),
                $(this).find("img").attr({
                    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjE0RTY0N0FDMEUxMTFFNjhBRDk5MjJEODM3NDJCMEMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjE0RTY0NzlDMEUxMTFFNjhBRDk5MjJEODM3NDJCMEMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDg5NUFCMUFCQzI3MTFFNkEyNjNCMTg1NTI1M0REREMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDg5NUFCMUJCQzI3MTFFNkEyNjNCMTg1NTI1M0REREMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4gNS6dAAAANlBMVEXa2tro6Ojd3d35+fn4+Pjg4OD9/f3h4eHy8vLr6+vb29vn5+fx8fHq6ur6+vrc3NzZ2dn///9/BJNqAAAAEnRSTlP//////////////////////wDiv78SAAAAz0lEQVR42oyT2RaDIAxEE9m1DeH/f7ZoqyxR6Dwpc88hZBJIl6xHFwGiQ2/LKZwfhCtfWpF6IAA3gtAAZFjIUAF05BtFfQJ062eCfoDhB5kvEPhRYQeo1L+8usuAMoDl/yXKxQS26k9UPbFa8E3dKqmW8IA8JBAcDwkHfZM6IsfLkrBbeagE9v7pChA5LJRoqa5wQz8XiUM/P9MP/dyoutXSB9uEJfw9rDpu3ftH3NXAbLr1+f3fyM2Hdjr288WZr96xvBUCqMR2P63/R4ABAOBSOtarLmH+AAAAAElFTkSuQmCC"
                })
            })
        },
        resolveData: function() {
            var riskMap = {
                1: "低",
                2: "中",
                3: "高"
            };
            $(".fund-container .data-list .risk").each(function(index, item) {
                $(item).text(riskMap[$(item).text()])
            });
            var typeMap = {
                1: "股票",
                2: "债权",
                3: "混合",
                4: "货币",
                5: "保本",
                6: "指数",
                7: "QDII",
                0: "其他类型"
            };
            $(".fund-container .data-list .type").each(function(index, item) {
                $(item).text(typeMap[$(item).text()])
            })
        }
    }
});
;/*!/client/widget/index/lend-risk-tips/lend-risk-tips.js*/
define("home:widget/index/lend-risk-tips/lend-risk-tips.js", function(require, exports, module) {
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    function _inherits(subClass, superClass) {
        if ("function" != typeof superClass && null !== superClass)
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    }
    var React = require("common:node_modules/react/react")
      , ReactTooltip = (require("common:widget/react-ui/RWETooltip/RWETooltip"),
    require("common:node_modules/react-tooltip/dist/index"))
      , RiskTips = function(_React$Component) {
        function RiskTips(props) {
            _classCallCheck(this, RiskTips),
            _React$Component.call(this, props)
        }
        return _inherits(RiskTips, _React$Component),
        RiskTips.prototype.render = function() {
            var _props = this.props
              , _props$riskTipsData = _props.riskTipsData
              , riskTipsData = void 0 === _props$riskTipsData ? {} : _props$riskTipsData
              , type = _props.type
              , cmsData = riskTipsData[type];
            return React.createElement("div", {
                className: "index-risk-tip"
            }, React.createElement("div", {
                className: "risk-tip-title"
            }, "自动投标服务"), React.createElement("div", {
                className: "index-risk-content"
            }, React.createElement("div", {
                className: "introduce-info pr-14"
            }, React.createElement("span", null, cmsData.introduceTitle), React.createElement("div", {
                "data-tip": cmsData.introduceContent,
                "data-for": "introduce-risk-sadFace",
                className: "icon-we-tips"
            }), React.createElement(ReactTooltip, {
                id: "introduce-risk-sadFace",
                html: "true",
                type: "light",
                effect: "solid",
                place: "right",
                border: !0
            })), React.createElement("div", {
                className: "introduce-info"
            }, React.createElement("span", null, cmsData.informTitle), React.createElement("div", {
                "data-tip": cmsData.informContent,
                "data-for": "inform-risk-sadFace",
                className: "icon-we-tips"
            }), React.createElement(ReactTooltip, {
                id: "inform-risk-sadFace",
                html: "true",
                type: "light",
                effect: "solid",
                place: "left",
                border: !0
            }))))
        }
        ,
        RiskTips
    }(React.Component);
    module.exports = RiskTips
});
;/*!/client/widget/index/newbee/newbee.js*/
define("home:widget/index/newbee/newbee.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var $ = require("common:widget/lib/jquery/jquery")
      , NewBee = function() {
        function NewBee() {
            _classCallCheck(this, NewBee)
        }
        return NewBee.prototype.init = function(dom, cmsData) {
            var body = "";
            dom.article && (body = dom.article.body),
            $(".notice .info").append(body),
            $(".notice .notice-l p span").on("click", this.open),
            $(".tips").hover(function() {
                $(this).find(".tips-bg").attr("src", "/ps/static/home/widget/index/newbee/assets/tips_1_8ea68e3.png")
            }, function() {
                $(this).find(".tips-bg").attr("src", "/ps/static/home/widget/index/newbee/assets/tips_2_a59e926.png")
            });
            var blank = cmsData ? cmsData.blank.desc : ""
              , risk = cmsData ? cmsData.risk.desc : "";
            $(".blank_data").html(blank),
            $(".risk_data").html(risk)
        }
        ,
        NewBee.prototype.open = function() {
            $(".info").toggle(200)
        }
        ,
        NewBee
    }();
    module.exports = new NewBee
});
;/*!/client/widget/index/novice/novice.js*/
define("home:widget/index/novice/novice.js", function() {});
;/*!/client/widget/index/premium/premium.js*/
define("home:widget/index/premium/premium.js", function(require, exports, module) {
    var $ = require("common:widget/lib/jquery/jquery");
    module.exports = {
        init: function() {
            this.bindEvent()
        },
        bindEvent: function() {
            $(".premium-container .plan").on("click", function() {
                window.open($(this).find("a").attr("href"))
            })
        },
        resolveBtnStatus: function(id) {
            var _this = this
              , el = $(id)
              , status = parseInt(el.data("status"), 10)
              , totaltime = el.data("wait") - 0 || 0
              , type = el.data("type")
              , timeid = void 0
              , fn = function() {
                totaltime -= 1,
                _this.formatSeconds(totaltime, id, status, type),
                0 >= totaltime && (clearInterval(timeid),
                location.reload())
            };
            return el.length <= 0 || -1 === status || 0 >= totaltime || 3 !== status && 0 !== status ? !1 : (timeid = setInterval(fn, 1e3),
            void fn.call(this))
        },
        formatSeconds: function(value, el, sta, type) {
            var theTime = parseInt(value, 10)
              , theTime1 = 0
              , theTime2 = 0
              , theTime3 = 0;
            theTime > 60 && (theTime1 = parseInt(theTime / 60, 0),
            theTime = parseInt(theTime % 60, 0),
            theTime1 > 60 && (theTime2 = parseInt(theTime1 / 60, 0),
            theTime1 = parseInt(theTime1 % 60, 0)),
            theTime2 > 24 && (theTime3 = parseInt(theTime2 / 24, 0),
            theTime2 = parseInt(theTime2 % 24, 0)));
            var result = void 0;
            result = theTime3 > 0 ? parseInt(theTime3, 0) + "天" + parseInt(theTime2, 0) + "时" : theTime2 > 0 ? parseInt(theTime2, 0) + "时" + parseInt(theTime1, 0) + "分" : parseInt(theTime1, 0) + "分" + parseInt(theTime, 0) + "秒",
            0 === sta && (result += "XJH" == type ? "后加入" : "后预定"),
            3 === sta && (result += "后加入"),
            $(el).html(result)
        }
    }
});
;/*!/client/widget/register/register.jsx*/
define("home:widget/register/register.jsx", function(require, exports, module) {
    "use stript";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    function _inherits(subClass, superClass) {
        if ("function" != typeof superClass && null !== superClass)
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    }
    function noop() {}
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source)
                Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key])
        }
        return target
    }
      , React = require("common:node_modules/react/react")
      , RForm = (require("common:node_modules/react-dom/index"),
    require("common:widget/react-ui/RForm/RForm"))
      , RPhoneCodeImage = require("common:widget/react-ui/RPhoneCodeImage/RPhoneCodeImage.jsx")
      , TextInput = RForm.TextInput
      , Checkbox = RForm.Checkbox
      , Register = function(_React$Component) {
        function Register(props) {
            _classCallCheck(this, Register),
            _React$Component.call(this, props),
            this.state = {
                isRequest: !1,
                errorMsg: "",
                countTime: "发送验证码",
                countClass: "getMobileCode count-down-blue"
            },
            this.handleSubmit = this.handleSubmit.bind(this)
        }
        return _inherits(Register, _React$Component),
        Register.prototype.handleSubmit = function() {
            this.props.handleSubmitClick()
        }
        ,
        Register.prototype.render = function() {
            var props = this.props
              , errorClass = "validate-error-con error"
              , submitText = props.submitText || "注册领优惠劵"
              , submitBtnClass = "ui-button-register " + (props.submitBtnClass || "ui-button-orange")
              , error = React.createElement("div", {
                className: "submit-error-info"
            })
              , phoneProps = {
                name: "username",
                id: "phone",
                className: "ui-form-item phone-con",
                errorClass: errorClass,
                placeholder: "输入手机号码",
                validate: {
                    blur: ["required", "isMobile", "isMobileAvailable"]
                }
            }
              , passwrodProps = {
                type: "password",
                name: "password",
                id: "password",
                className: "ui-form-item password-con",
                errorClass: errorClass,
                placeholder: "登录密码",
                validate: {
                    blur: ["required", "isPassWord", {
                        fn: "minlength",
                        message: "numPswLetter",
                        args: 6
                    }, {
                        fn: "maxlength",
                        message: "numPswLetter",
                        args: 16
                    }],
                    focus: [{
                        fn: "minlength",
                        message: "numPswLetter",
                        args: 6
                    }, {
                        fn: "maxlength",
                        message: "numPswLetter",
                        args: 16
                    }]
                }
            }
              , randCodeProps = {
                name: "randCode",
                id: "randCode",
                className: "ui-form-item rank-code-con",
                errorClass: errorClass,
                placeholder: "图片验证码",
                validate: {
                    blur: ["required", {
                        fn: "isLengthEqual",
                        message: "phoneCodeMsgLength",
                        args: 4
                    }]
                }
            }
              , codeImageProps = {
                className: "code-box"
            }
              , phoneCodeProps = {
                name: "mobileCode",
                id: "mobileCode",
                className: "ui-form-item phone-code-con",
                errorClass: errorClass,
                placeholder: "短信验证码",
                validate: {
                    blur: ["required", {
                        fn: "isLengthEqual",
                        message: "phoneCodeMsgLength",
                        args: 4
                    }]
                }
            }
              , checkboxProps = {
                name: "agree",
                label: "我已阅读并同意",
                className: "ui-form-item agree-con",
                errorClass: errorClass,
                checked: !0,
                validate: {
                    change: [{
                        fn: "isChecked",
                        message: "agree"
                    }]
                }
            };
            return React.createElement("div", {
                className: "ui-form-con"
            }, React.createElement(RForm, {
                ref: "form",
                method: "post",
                action: "/rrdRegist!lpRegist.action",
                onSubmit: this.handleSubmit
            }, React.createElement(TextInput, phoneProps, " "), React.createElement(TextInput, randCodeProps, React.createElement(RPhoneCodeImage, _extends({
                ref: "codeImage"
            }, codeImageProps))), React.createElement(TextInput, phoneCodeProps, React.createElement("a", {
                className: this.state.countClass
            }, this.state.countTime)), React.createElement(TextInput, passwrodProps, " "), React.createElement(Checkbox, checkboxProps, React.createElement("a", {
                href: "/agreement/user/currency/name/user.register",
                target: "_blank"
            }, "《人人贷WE理财注册服务协议》")), React.createElement("input", {
                type: "hidden",
                name: "registerSource",
                value: this.props.registerSource
            }), React.createElement("input", {
                type: "hidden",
                name: "id",
                value: this.props.id
            }), React.createElement("input", {
                type: "hidden",
                name: "promotion",
                value: this.props.promotion
            }), React.createElement("input", {
                type: "hidden",
                name: "inviteCode",
                value: this.props.inviteCode
            }), React.createElement("input", {
                type: "hidden",
                name: "intention",
                value: this.props.intention
            }), React.createElement("input", {
                type: "submit",
                className: submitBtnClass,
                value: submitText
            }), error))
        }
        ,
        Register
    }(React.Component);
    Register.defaultProps = {
        handleSubmitClick: noop
    },
    module.exports = Register
});
