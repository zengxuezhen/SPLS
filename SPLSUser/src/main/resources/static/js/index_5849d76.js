define("home:page/index-werenrendai/index.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var $ = require("common:widget/lib/jquery/jquery")
      , Carousel = require("home:widget/index/carousel/carousel")
      , React = require("common:node_modules/react/react")
      , ReactDOM = require("common:node_modules/react-dom/index")
      , fund = require("home:widget/index/fund/fund")
      , NewBee = require("home:widget/index/newbee/newbee")
      , $statistic = require("common:node_modules/glpb-components-common/src/index").weStatistic
      , RiskTips = require("home:widget/index/lend-risk-tips/lend-risk-tips")
      , Home = function() {
        function Home() {
            _classCallCheck(this, Home)
        }
        return Home.prototype.init = function(args) {
            var bee = {
                financeList: args.financeList,
                article: args.article
            }
              , cmsData = args.cmsData
              , realData = args.realData
              , riskTipsData = args.riskTipsData;
            Carousel.init(args),
            NewBee.init(bee, cmsData, realData),
            fund.init(args),
            $(".tu").parent(".hover").hover(function() {
                $(this).find("img").attr("src", "/ps/static/home/static/index/more_2_0e42693.png")
            }, function() {
                $(this).find("img").attr("src", "/ps/static/home/static/index/more_1_c39c4fa.png")
            }),
            this.handle(),
            this.renderRiskTips(riskTipsData, document.getElementById("loanRiskTips"))
        }
        ,
        Home.prototype.renderRiskTips = function(riskTipsData, dom) {
            ReactDOM.render(React.createElement(RiskTips, {
                riskTipsData: riskTipsData,
                type: "index"
            }), dom)
        }
        ,
        Home.prototype.handle = function() {
            $(".newbie-growing-box .activity-btn").on("click", function() {
                var _this = this;
                $statistic.eventRaw({
                    eventId: "pc_index_page_click_newcomer_grow_strategy_button",
                    extra: {
                        buttonText: $(this).text()
                    },
                    callback: function() {
                        $(_this).hasClass("disable-btn") || (location.href = $(_this).attr("href"))
                    }
                })
            }),
            $(".novice-exclusive-box .plan").on("click", function() {
                var _this = this;
                $statistic.eventRaw({
                    eventId: "pc_index_page_click_newcomer_product_button",
                    extra: {}
                }),
                window.open($(_this).find("a").attr("href"))
            }),
            $(".compliance-uplan .index-plan-12").on("click", function() {
                var _this = this;
                $statistic.eventRaw({
                    eventId: "pc_index_page_click_uplan_12_month_button",
                    extra: {}
                }),
                window.open($(_this).find("a").attr("href"))
            })
        }
        ,
        Home
    }();
    module.exports = new Home
});
