define("p2p:page/calculator/calculator.js", function(require, exports, module) {
    "use strict";
    var $ = require("common:widget/lib/jquery/jquery")
      , calc = require("common:widget/ui/utils/calculator")
      , React = require("common:node_modules/react/react")
      , ReactDOM = require("common:node_modules/react-dom/index")
      , ResultTable = require("p2p:widget/calculator/loan/result")
      , Tip = (require("common:node_modules/numeral/numeral"),
    require("common:widget/ui/toolTip/toolTip"))
      , service = require("common:widget/ui/service/service-factory")
      , calculatorService = service.getService("p2p")
      , $statistic = require("common:node_modules/glpb-components-common/src/index").weStatistic;
    module.exports = {
        init: function() {
            this.bindEvent(),
            this.initTip()
        },
        initTip: function() {
            var defaultStyle = {
                "z-index": 99,
                left: "188px",
                top: "2px"
            };
            new Tip({
                id: "touziAmount",
                msg: "投资金额为1000的整数倍",
                style: Object.assign({
                    width: "120px"
                }, defaultStyle)
            }),
            new Tip({
                id: "fixedAmount",
                msg: "500-20000元之间，100的倍数",
                style: defaultStyle
            }),
            new Tip({
                id: "borrowAmount",
                msg: "出借金额50的倍数",
                style: defaultStyle
            }),
            new Tip({
                id: "yearRate",
                msg: "利率范围5%-24%",
                style: defaultStyle
            }),
            new Tip({
                id: "repayDate",
                msg: "借款期限须为1-48个月",
                style: defaultStyle
            })
        },
        bindEvent: function() {
            this.tabSwitch(),
            this.selectOption(),
            this.submitUplanForm(),
            this.submitPremiumForm(),
            this.submitSalaryFrom(),
            this.submitLoanForm()
        },
        tabSwitch: function() {
            var oLi = $("#calculate li");
            oLi.on("click", function() {
                var idx = $(this).index();
                oLi.each(function(index, item) {
                    $(item).removeClass("ui-tab-item-current")
                }),
                $(this).addClass("ui-tab-item-current"),
                $("#calculate-tab-item > div").each(function(index, item) {
                    $(item).removeClass("ui-tab-content-current"),
                    index == idx && $(item).addClass("ui-tab-content-current")
                })
            })
        },
        selectOption: function() {
            $(document).click(function(e) {
                var target = e.target;
                $(target).parent("span").hasClass("arrow") || ($(target).parent("div").hasClass("J_select_btn") || $(".J_popBox").css("display", "none"),
                "touziAmount" != $(target).attr("id") && $("#J_touziAmount_hint").css("display", "none"))
            }),
            $(".J_select_btn").click(function(e) {
                $(".J_popBox").css("display", "none");
                var ul_dom = $(e.currentTarget).parent().find("ul");
                "block" == ul_dom.css("display") ? ul_dom.css("display", "none") : ul_dom.css("display", "block")
            });
            var oLi = $(".J_popBox li");
            oLi.mouseover(function(e) {
                $(e.currentTarget).attr("class", "selected")
            }),
            oLi.mouseleave(function(e) {
                $(e.currentTarget).attr("class", "")
            }),
            oLi.click(function(e) {
                var value = $(e.currentTarget).attr("datavalue")
                  , txt = $(e.currentTarget).find("span").text()
                  , dom = $(e.currentTarget).parent().parent()
                  , rateDict = {
                    3: 10,
                    6: 11,
                    9: 12,
                    12: 12,
                    15: 13,
                    18: 13,
                    24: 13,
                    36: 13
                }
                  , lockPeriod = $(e.currentTarget).attr("month");
                $("#UType").attr("lockPeriod", lockPeriod);
                var yearRate = void 0;
                return dom.find("input").attr("value", value),
                dom.find(".J_txt").text(txt),
                "RRGXD" == value || "RRSYD" == value || "RRWSD" == value ? (location.href = "/borrow/calculator.action?prodType=" + value,
                !1) : ($(".noinput-p").css("display", "none"),
                void (value && rateDict[value] && (yearRate = rateDict[value],
                $("#yearRate").val(yearRate).parent().find(".error-p").css("display", "none"))))
            })
        },
        submitUplanForm: function() {
            function checkUplanForm() {
                var input = $("#touziAmount")
                  , value = input.val();
                return value ? value % 1e3 === 0 && _this.checkNumber(value) && value > 0 ? !0 : (_this.showVerifyInfo(input, $("#touziAmount-error-label"), "投资金额范围须为1000的整数倍且不能为空"),
                !1) : (_this.showVerifyInfo(input, $("#touziAmount-error-label"), "不能为空"),
                !1)
            }
            var _this = this;
            $("#touziAmount").on("keyup", function() {
                checkUplanForm() && _this.removeVerifyInfo($(this), $("#touziAmount-error-label"))
            }),
            $(".uplan-form").submit(function(e) {
                return checkUplanForm() && ($statistic.eventRaw({
                    eventId: "click calculating",
                    extra: {
                        product_type: "U计划",
                        month: $("#UType").attr("lockPeriod"),
                        cash_draw_type: $("#rType").val(),
                        amount: $("#touziAmount").val()
                    },
                    callback: function() {
                        calculatorService.getUplanCalculator(_this.getUplanFormData()).then(function(res) {
                            if (0 == res.data.status) {
                                var data = res.data.data
                                  , value = data.interest && data.interest.length > 0 ? data.interest[0].value : 0;
                                $("#J_CJJE").text(parseFloat($("#touziAmount").val()).toFixed(2)),
                                $("#J_YQSY").text(value)
                            }
                        })
                    }
                }),
                e.preventDefault()),
                !1
            })
        },
        submitSalaryFrom: function() {
            function checkSalaryFrom() {
                var input = $("#fixedAmount")
                  , value = input.val();
                return value ? value >= 500 && 2e4 >= value && value % 100 === 0 && _this.checkNumber(value) ? !0 : (_this.showVerifyInfo(input, $("#fixedAmount-error-label"), "金额500-20000元之间，且100的倍数"),
                !1) : (_this.showVerifyInfo(input, $("#fixedAmount-error-label"), "不能为空"),
                !1)
            }
            var _this = this;
            $("#fixedAmount").on("keyup", function() {
                checkSalaryFrom() && _this.removeVerifyInfo($(this), $("#fixedAmount-error-label"))
            }),
            $(".salary-form").submit(function(e) {
                return checkSalaryFrom() && ($statistic.eventRaw({
                    eventId: "click calculating",
                    extra: {
                        product_type: "薪计划",
                        month: $("#isfixMonth").data("month"),
                        amount: $("#fixedAmount").val()
                    },
                    callback: function() {
                        calculatorService.getInvestCalculator(_this.getInvestFormData()).then(function(res) {
                            if (0 == res.data.status) {
                                var data = res.data.data;
                                $("#isFixAount").text(data.total),
                                $("#isFixRate").text(data.rate),
                                $("#isFixEarn").text(data.earn)
                            }
                        })
                    }
                }),
                e.preventDefault()),
                !1
            })
        },
        submitLoanForm: function() {
            var _this = this
              , inputs = ["#borrowAmount", "#yearRate", "#repayDate"]
              , verify = {
                "#borrowAmount": function(selector) {
                    var input = $(selector)
                      , value = input.val();
                    return value ? value % 50 === 0 && _this.checkNumber(value) ? !0 : (_this.showVerifyInfo(input, $("#borrowAmount-error-label"), "出借金额范围须为50的倍数"),
                    !1) : (_this.showVerifyInfo(input, $("#borrowAmount-error-label"), "不能为空"),
                    !1)
                },
                "#yearRate": function(selector) {
                    var input = $(selector)
                      , value = input.val();
                    return value ? value >= 5 && 24 >= value ? !0 : (_this.showVerifyInfo(input, $("#yearRate-error-label"), "您输入的借款年利率超出范围，请重新输入！"),
                    !1) : (_this.showVerifyInfo(input, $("#yearRate-error-label"), "不能为空"),
                    !1)
                },
                "#repayDate": function(selector) {
                    var input = $(selector)
                      , value = input.val();
                    return value ? _this.checkNumber(value) ? value > 0 && 48 >= value ? !0 : (_this.showVerifyInfo(input, $("#repayDate-error-label"), "借款期限须为1-48个月"),
                    !1) : (_this.showVerifyInfo(input, $("#repayDate-error-label"), "请输入正整数"),
                    !1) : (_this.showVerifyInfo(input, $("#repayDate-error-label"), "不能为空"),
                    !1)
                }
            };
            inputs.forEach(function(item) {
                $(item).on("keyup", function() {
                    verify[item](item) && _this.removeVerifyInfo($(this), $(item + "-error-label"))
                })
            }),
            $(".loan-form").submit(function() {
                var result = [];
                inputs.forEach(function(item) {
                    result.push(verify[item](item))
                }),
                $statistic.eventRaw({
                    eventId: "click calculating",
                    extra: {
                        product_type: "散标投资",
                        amount: $("#borrowAmount").val(),
                        interest: $("#yearRate").val(),
                        month: $("#repayDate").val(),
                        repay_type: "DEBX" == $("#repayType").val() ? "等额本息" : "每月付息，到期还本"
                    }
                });
                for (var i = 0; i < result.length; i++)
                    if (!result[i])
                        return !1;
                return _this.calcLoan(),
                !1
            })
        },
        submitPremiumForm: function() {
            function checkPremiumForm() {
                var input = $("#premiumAmount")
                  , value = input.val()
                  , start = input.data("start")
                  , append = input.data("append");
                if (!value)
                    return _this.showVerifyInfo(input, $("#premiumAmount-error-label"), "不能为空"),
                    !1;
                if (start == append) {
                    if (value % start != 0)
                        return _this.showVerifyInfo(input, $("#premiumAmount-error-label"), "输入金额需为" + start + "元的整数倍"),
                        !1
                } else if ((value - start) % append != 0)
                    return _this.showVerifyInfo(input, $("#premiumAmount-error-label"), "递增金额需为" + append + "元的整数倍"),
                    !1;
                return !0
            }
            var _this = this;
            $("#premiumAmount").on("keyup", function() {
                var val = $(this).val();
                0 > val && $(this).val(Math.abs(val)),
                checkPremiumForm() && _this.removeVerifyInfo($(this), $("#premiumAmount-error-label"))
            }),
            $(".premium-form").on("submit", function(e) {
                checkPremiumForm() && calculatorService.getPremiumCalculator(_this.getPremiumFormData()).then(function(res) {
                    "success" == res.requestStatus && _this.renderPremiumResult(res.data.data)
                }),
                e.preventDefault()
            })
        },
        checkNumber: function(value) {
            var RE_CASH = /^(([1-9]{1}\d*)|([0]{1}))?$/;
            return RE_CASH.test(value)
        },
        showVerifyInfo: function(inputSelector, tipSelector, text) {
            inputSelector.addClass("error"),
            tipSelector.text(text),
            tipSelector.css({
                display: "block"
            })
        },
        removeVerifyInfo: function(inputSelector, tipSelector) {
            inputSelector.removeClass("error"),
            tipSelector.css({
                display: "none"
            })
        },
        _fixedFloat2: function(floatNumber) {
            return "string" == typeof floatNumber && (floatNumber = parseFloat(floatNumber, 10)),
            parseFloat(Math.round(100 * floatNumber) / 100, 10).toFixed(2)
        },
        calcLoan: function() {
            var el = $("#calcForm")[0]
              , calcArr = $(el).serializeArray()
              , res = calc(calc.arrToObj(calcArr))
              , data = res.calc();
            data.borrowAmount = "" == $.trim($("#borrowAmount").val()) ? 0 : $.trim($("#borrowAmount").val()),
            data.gain = 0,
            $.each(data.table, function(k, v) {
                data.gain += parseFloat(v.mlixi)
            }),
            data.gain = this._fixedFloat2(data.gain),
            data.monthlyRepayB = this._fixedFloat2(data.monthlyRepay + .003 * data.borrowAmount),
            data.mounthRate = this._fixedFloat2(data.mounthRate),
            data.monthlyRepay = isNaN(data.monthlyRepay) ? "0.00" : this._fixedFloat2(data.monthlyRepay),
            data.borrowAmount = this._fixedFloat2(data.borrowAmount),
            res = null;
            var J_tit = $(".J_tit").eq(0).text();
            data.isShowTable = "借款设置" == J_tit && "false" == data.isShowTable ? !1 : !0,
            "理财计算器 " == J_tit && (data.isShowTable = $("#isShowTable").is(":checked")),
            ReactDOM.render(React.createElement(ResultTable, {
                data: data
            }), document.getElementById("calcResult")),
            this.scrollTop()
        },
        scrollTop: function() {
            var offsetTop = $("#calculate-tab").offset().top;
            offsetTop && $("body").animate({
                scrollTop: offsetTop
            }, 800)
        },
        getUplanFormData: function() {
            return {
                amount: $("#touziAmount").val(),
                cashType: $("#rType").val(),
                lockPeriod: $("#UType").attr("lockPeriod")
            }
        },
        getInvestFormData: function() {
            return {
                amount: $("#fixedAmount").val(),
                repayTime: $("#isfixMonth").data("month")
            }
        },
        getPremiumFormData: function() {
            var input = $("#premiumAmount");
            return {
                amount: input.val(),
                cmsParam: input.data("condition")
            }
        },
        renderPremiumResult: function(data) {
            $(".result-table .year-res-first").text(data.twYearExpIncome + "元"),
            $(".result-table .year-res-second").text(data.thYearExpIncome + "元"),
            $(".result-table .year-res-third").text(data.twfYearExpIncome + "元"),
            $(".result-table .day-res-first").text(parseFloat(data.twDayExpIncome).toFixed(2) + "元"),
            $(".result-table .day-res-second").text(parseFloat(data.thDayExpIncome).toFixed(2) + "元"),
            $(".result-table .day-res-third").text(parseFloat(data.twfDayExpIncome).toFixed(2) + "元");
            var table = $(".premium-result .table-wrap");
            table.show(),
            $(".premium-result").hasClass("premium-result-pb20") || $(".premium-result").addClass("premium-result-pb20")
        }
    }
});
