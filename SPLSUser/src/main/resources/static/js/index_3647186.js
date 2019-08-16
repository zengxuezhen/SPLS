define("p2p:page/uplan/index/index.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var $ = require("common:widget/lib/jquery/jquery")
      , service = require("common:widget/ui/service/service-factory")
      , p2pService = service.getService("p2p")
      , React = require("common:node_modules/react/react")
      , ReactDOM = require("common:node_modules/react-dom/index")
      , ReactHistoryUPlan = require("p2p:widget/uplan/wdg-index-list/history/history.jsx")
      , ReactSlick = require("common:widget/react-ui/RSlick/RSlick.jsx")
      , $statistic = require("common:node_modules/glpb-components-common/src/index").weStatistic
      , RiskTips = require("common:widget/p2p/risk-tips/risk-tips")
      , UplanIndex = function() {
        function UplanIndex() {
            _classCallCheck(this, UplanIndex),
            this.uplanPeriods = "",
            this.uplanPeriodArr = [],
            this.$uplanAmount = null,
            this.$uplanAmountErrorlabel = null,
            this.$calcbt = null
        }
        return UplanIndex.prototype.init = function(historyData, bannerData, uplanPeriods, riskTipsData) {
            this.uplanPeriods = uplanPeriods,
            this.uplanPeriodArr = uplanPeriods ? uplanPeriods.split(",") : [],
            this.handle(),
            this.initCalJQIDData(),
            this.cal(),
            this.bindCalEvent(),
            this.renderRiskTips(riskTipsData, document.getElementById("loanRiskTips"))
        }
        ,
        UplanIndex.prototype.renderRiskTips = function(riskTipsData, dom) {
            ReactDOM.render(React.createElement(RiskTips, {
                riskTipsData: riskTipsData,
                type: "uplan"
            }), dom)
        }
        ,
        UplanIndex.prototype.handle = function() {
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
        ,
        UplanIndex.prototype.initBanner = function(dom, banner) {
            banner && ReactDOM.render(React.createElement(ReactSlick, {
                bannerData: banner
            }), dom)
        }
        ,
        UplanIndex.prototype.initCalJQIDData = function() {
            this.$uplanAmount = $("#uplanAmount"),
            this.$uplanAmountErrorlabel = $("#uplanAmount-error-label"),
            this.$calcbt = $("#calcbt")
        }
        ,
        UplanIndex.prototype.initProductList = function(dom, historyData) {
            ReactDOM.render(React.createElement(ReactHistoryUPlan, {
                historyData: historyData,
                limit: "10",
                serviceName: "p2p.getFinancePlanList"
            }), dom)
        }
        ,
        UplanIndex.prototype.cal = function() {
            var _this2 = this
              , lockPeriods = this.uplanPeriods
              , amount = $("#uplanAmount").val();
            if (this.updateAnimate(),
            this.validate(this.$uplanAmount, this.$uplanAmountErrorlabel)) {
                var params = {
                    amount: amount,
                    lockPeriods: lockPeriods,
                    cashType: "INVEST"
                };
                p2pService.getUplanCalByLockedPeriod(params).then(function(res) {
                    if (res.requestStatus === p2pService.STATUS.ERROR)
                        return void _this2.calAnimateAndSetV(null);
                    var data = res.data.data;
                    _this2.calAnimateAndSetV(data)
                })["catch"](function(error) {
                    console.log("获取计算结果异常" + error)
                })
            }
        }
        ,
        UplanIndex.prototype.calAnimateAndSetV = function(data) {
            for (var _this = this, uplanPeriodArr = this.uplanPeriodArr, length = this.uplanPeriodArr.length, i = 0; length > i; i++) {
                var period = uplanPeriodArr[i]
                  , width = _this.getWidth(i);
                $("#income" + period).animate({
                    width: width
                }, 800);
                var rv = "v" + period
                  , v = data ? data[rv] ? data[rv] : "0.00" : 0;
                _this.setIncomeV(period, v)
            }
        }
        ,
        UplanIndex.prototype.setIncomeV = function(period, v) {
            v += "元",
            $("#incomeV" + period).text(v)
        }
        ,
        UplanIndex.prototype.getWidth = function(index) {
            var width = "35px";
            switch (index) {
            case 1:
                width = "51px";
                break;
            case 2:
                width = "90px";
                break;
            case 3:
                width = "109px";
                break;
            case 4:
                width = "138px";
                break;
            case 5:
                width = "185px";
                break;
            default:
                width = "35px"
            }
            return width
        }
        ,
        UplanIndex.prototype.updateAnimate = function() {
            $(".cal-income").animate({
                width: "0px"
            })
        }
        ,
        UplanIndex.prototype.bindCalEvent = function() {
            var _this3 = this;
            this.$uplanAmount.on("keyup", function() {
                _this3.validate(_this3.$uplanAmount, _this3.$uplanAmountErrorlabel)
            }),
            this.$calcbt.on("click", function() {
                _this3.cal()
            })
        }
        ,
        UplanIndex.prototype.validate = function($amountObj, $errorMsg) {
            var value = $amountObj.val();
            return $amountObj.val(value.replace(/\D/g, "")),
            /^\d{1,}$/.test(value) && value % 1e3 == 0 && 0 != value ? ($errorMsg.css("visibility", "hidden"),
            $amountObj.removeClass("error-input").addClass("success-input"),
            !0) : ($errorMsg.css("visibility", "visible"),
            $amountObj.removeClass("success-input").addClass("error-input"),
            !1)
        }
        ,
        UplanIndex
    }()
      , uplanIndex = new UplanIndex;
    module.exports = uplanIndex
});
