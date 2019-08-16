define("uplan:page/product/detail/detail.js", function(require, exports, module) {
    "use strict";
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
      , ReactDOM = require("common:node_modules/react-dom/index")
      , RProductUplanDetail = require("uplan:widget/product/detail/RProductUplanDetail/RProductUplanDetail")
      , $ = require("common:widget/lib/jquery/jquery")
      , $statistic = require("common:node_modules/glpb-components-common/src/index").weStatistic
      , RUplanProductDetailIndex = function(_React$Component) {
        function RUplanProductDetailIndex() {
            _classCallCheck(this, RUplanProductDetailIndex),
            _React$Component.apply(this, arguments)
        }
        return _inherits(RUplanProductDetailIndex, _React$Component),
        RUplanProductDetailIndex.prototype.render = function() {
            var props = this.props;
            return React.createElement(RProductUplanDetail, props)
        }
        ,
        RUplanProductDetailIndex
    }(React.Component)
      , uplanDetail = {
        renderDom: function(isLogin, detailInfo, buyResult, riskInfo, riskTipsData) {
            ReactDOM.render(React.createElement(RUplanProductDetailIndex, {
                detailInfo: detailInfo,
                isLogin: isLogin,
                buyResult: buyResult,
                riskInfo: riskInfo,
                riskTipsData: riskTipsData
            }), document.getElementById("uplan-product-detail")),
            $(".wdg-index-banner .banner-img-box").on("click", function() {
                var _this = this;
                $statistic.eventRaw({
                    eventId: "pc_uplan_list_page_click_banner",
                    extra: {
                        link: $(_this).attr("src")
                    }
                })
            })
        }
    };
    module.exports = uplanDetail
});
