;/*!/client/widget/product/detail/common/js/uplan-product-util.js*/
define("uplan:widget/product/detail/common/js/uplan-product-util.js", function(require, exports, module) {
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var utils = require("common:widget/ui/utils/utils")
      , moment = require("common:node_modules/moment/moment")
      , UplanUtils = function() {
        function UplanUtils() {
            _classCallCheck(this, UplanUtils)
        }
        return UplanUtils.prototype.preminumRateAmount = function(money, startDate, month, extraRate) {
            var rate = extraRate / 100
              , interes = 0
              , years = parseInt(month / 12)
              , midDate = moment(startDate).add(12 * years, "months").format("x")
              , midTime = moment(parseInt(midDate || 0))
              , endDate = moment(startDate).add(month, "months").format("x")
              , endTime = moment(parseInt(endDate || 0))
              , days = endTime.diff(midTime, "days")
              , number = 1 + parseFloat(rate)
              , compound = Math.pow(number, years)
              , num1 = compound - 1
              , num2 = compound * rate / 365 * days
              , num3 = parseFloat(num1) + parseFloat(num2);
            return interes = utils.fixFloat2(money * num3)
        }
        ,
        UplanUtils.prototype.preminumRateCouponAmount = function(money, days, extraRate) {
            var rate = extraRate / 100
              , amount = money * rate / 365 * days;
            return amount
        }
        ,
        UplanUtils.prototype.preminumRate = function(M, R, n, D) {
            var I = M * Math.pow(1 + R, n - 1) - M + [M * Math.pow(1 + R, n - 1) * R * D] / 365;
            return I
        }
        ,
        UplanUtils.prototype.simpleInvestAmount = function(Money, R, lockPeriod) {
            var m = lockPeriod;
            R /= 100;
            var I = Money * R * m / 12;
            return 100 * I.toFixed(3) / 100
        }
        ,
        UplanUtils.prototype.compoundInvestAmount = function(Money, R, lockPeriod) {
            var m = lockPeriod;
            R /= 100;
            var I = Money * Math.pow(1 + R / 12, m) - Money;
            return 100 * I.toFixed(2) / 100
        }
        ,
        UplanUtils.prototype.shortTermExpectedAmount = function(M, R, D) {
            R /= 100;
            var amount = M * R / 365 * D;
            return amount
        }
        ,
        UplanUtils.prototype.compoundInterest = function(R, lockPeriod) {
            R /= 100;
            var m = lockPeriod
              , tmp = Math.pow(R / 12 + 1, m) - 1
              , D = 12 * tmp / m;
            return 100 * D
        }
        ,
        UplanUtils.prototype.simpleInterest = function(D, lockPeriod) {
            var me = this;
            D /= 100;
            var m = lockPeriod
              , n = 1 + m * D / 12
              , R = 12 * (Math.pow(n, 1 / m) - 1);
            return me.toCeilFixed(R)
        }
        ,
        UplanUtils.prototype.toCeilFixed = function(number) {
            var n = number.toString()
              , idx = n.indexOf(".")
              , new_n = n.substring(0, idx + 6)
              , last_num = new_n[new_n.length - 1]
              , final_num = "";
            return final_num = last_num > 0 ? parseFloat(new_n) + 1e-4 : new_n,
            final_num = final_num.toString().substring(0, new_n.length - 1),
            100 * parseFloat(final_num)
        }
        ,
        UplanUtils.prototype.updateShortRateAmount = function(businessPayAmount, incrRate, cashWay, compoundInterest, simpleInterest, lockPeriod, incrInterestDays, incrInterestRate) {
            var shortAmount = ""
              , me = this
              , shortRate = parseFloat(compoundInterest);
            shortRate = me.simpleInterest(shortRate, lockPeriod),
            shortRate = utils.fixFloat2(shortRate),
            0 == incrRate && (shortRate = parseFloat(simpleInterest),
            shortRate = utils.fixFloat2(shortRate)),
            "INVEST" == cashWay ? (shortAmount = me.compoundInvestAmount(businessPayAmount, shortRate, lockPeriod),
            shortAmount = utils.fixFloat2(shortAmount),
            shortRate = parseFloat(compoundInterest),
            shortRate = utils.fixFloat2(shortRate)) : (shortRate = parseFloat(simpleInterest),
            shortAmount = me.simpleInvestAmount(businessPayAmount, shortRate, lockPeriod),
            shortAmount = utils.fixFloat2(shortAmount),
            shortRate = utils.fixFloat2(shortRate));
            var couponAmount = me.shortTermExpectedAmount(businessPayAmount, incrInterestDays, incrInterestRate);
            return couponAmount = utils.fixFloat2(couponAmount),
            {
                shortRate: shortRate,
                shortAmount: shortAmount,
                couponAmount: couponAmount
            }
        }
        ,
        UplanUtils.prototype.updateRateAmount = function(businessPayAmount, incrinterestrate, cashWay, compoundInterest, simpleInterest, lockPeriod) {
            var amount = ""
              , me = this
              , compound = parseFloat(compoundInterest)
              , rate = (100 * compound + 100 * parseFloat(incrinterestrate)) / 100;
            return rate = me.simpleInterest(rate, lockPeriod),
            rate = utils.fixFloat2(rate),
            0 == incrinterestrate && (rate = parseFloat(simpleInterest),
            rate = utils.fixFloat2(rate)),
            "INVEST" == cashWay ? (amount = me.compoundInvestAmount(businessPayAmount, rate, lockPeriod),
            amount = utils.fixFloat2(amount),
            rate = (100 * parseFloat(compoundInterest) + 100 * parseFloat(incrinterestrate)) / 100,
            rate = utils.fixFloat2(rate)) : (amount = me.simpleInvestAmount(businessPayAmount, rate, lockPeriod),
            amount = utils.fixFloat2(amount)),
            {
                rate: rate,
                amount: amount
            }
        }
        ,
        UplanUtils.prototype.getPayAmount = function(buyAmount, feeRate) {
            return parseInt(buyAmount, 10) + feeRate * buyAmount
        }
        ,
        UplanUtils.prototype.getNumbersSelectChange = function(params) {
            var me = this
              , rateEnd = null
              , expectedReturn = null
              , amountEnd = null
              , preBuyAllMoneyEnd = null
              , isShowDiscount = !1
              , discount = 0
              , incrInterestDays = ""
              , shortRateAmount = 0
              , couponList = params.couponList
              , preBuyAllMoney = params.preBuyAllMoney
              , cashType = params.cashType
              , compoundInterest = params.compoundInterest
              , simpleInterest = params.simpleInterest
              , lockPeriod = params.lockPeriod
              , couponValue = params.couponValue
              , couponTypeEng = params.couponTypeEng
              , incrInterestRate = params.incrInterestRate
              , couponId = params.couponId
              , businessPayAmount = preBuyAllMoney;
            if (couponList && !couponTypeEng && !incrInterestRate && !couponValue) {
                var initCouponValue = couponList[0];
                initCouponValue && (couponTypeEng = couponTypeEng ? couponTypeEng : initCouponValue.couponTypeEng,
                couponValue = couponValue ? couponValue : initCouponValue.couponValue,
                incrInterestRate = incrInterestRate ? incrInterestRate : initCouponValue.incrInterestRate)
            }
            if (couponList && couponList.map(function(list) {
                var couponNum = list.couponId;
                couponNum == couponId && (incrInterestDays = list.incrInterestDays)
            }),
            "EXTRA_INTEREST" == couponTypeEng)
                if (incrInterestDays) {
                    var _me$updateShortRateAmount = me.updateShortRateAmount(businessPayAmount, 0, cashType, compoundInterest, simpleInterest, lockPeriod, incrInterestDays, incrInterestRate)
                      , shortRate = _me$updateShortRateAmount.shortRate
                      , shortAmount = _me$updateShortRateAmount.shortAmount
                      , couponAmount = _me$updateShortRateAmount.couponAmount;
                    rateEnd = shortRate + "%",
                    amountEnd = shortAmount + " + " + couponAmount + "元",
                    expectedReturn = parseFloat(shortAmount),
                    shortRateAmount = parseFloat(couponAmount)
                } else {
                    var _me$updateRateAmount = me.updateRateAmount(businessPayAmount, incrInterestRate, cashType, compoundInterest, simpleInterest, lockPeriod)
                      , amount = _me$updateRateAmount.amount
                      , rate = _me$updateRateAmount.rate;
                    rateEnd = rate + "%（含加息）",
                    amountEnd = amount + "元",
                    expectedReturn = amount
                }
            else {
                var _me$updateRateAmount2 = me.updateRateAmount(businessPayAmount, 0, cashType, compoundInterest, simpleInterest, lockPeriod)
                  , amount = _me$updateRateAmount2.amount
                  , rate = _me$updateRateAmount2.rate;
                rateEnd = rate + "%",
                amountEnd = amount + "元",
                expectedReturn = amount,
                preBuyAllMoneyEnd = preBuyAllMoney - parseFloat(couponValue || 0),
                0 > preBuyAllMoneyEnd && (preBuyAllMoneyEnd = 0),
                "DISCOUNT" == couponTypeEng && (isShowDiscount = !0,
                discount = couponValue)
            }
            return {
                rateEnd: rateEnd,
                amountEnd: amountEnd,
                expectedReturn: expectedReturn,
                preBuyAllMoneyEnd: preBuyAllMoneyEnd,
                isShowDiscount: isShowDiscount,
                discount: discount,
                shortRateAmount: shortRateAmount
            }
        }
        ,
        UplanUtils.prototype.getNumbersFirst = function(params) {
            var me = this
              , rateEnd = null
              , expectedReturn = null
              , amountEnd = null
              , preBuyAllMoneyEnd = null
              , isShowDiscount = !1
              , discount = 0
              , shortRateAmount = 0
              , couponList = params.couponList
              , preBuyAllMoney = params.preBuyAllMoney
              , cashType = params.cashType
              , compoundInterest = params.compoundInterest
              , simpleInterest = params.simpleInterest
              , lockPeriod = params.lockPeriod
              , businessPayAmount = preBuyAllMoney;
            if (couponList) {
                var initCouponValue = couponList[0];
                if (initCouponValue) {
                    var couponTypeEng = initCouponValue.couponTypeEng
                      , couponValue = initCouponValue.couponValue;
                    if ("EXTRA_INTEREST" == couponTypeEng) {
                        var incrInterestDays = initCouponValue.incrInterestDays
                          , incrInterestRate = initCouponValue.incrInterestRate;
                        if (incrInterestDays) {
                            var _me$updateShortRateAmount2 = me.updateShortRateAmount(businessPayAmount, 0, cashType, compoundInterest, simpleInterest, lockPeriod, incrInterestDays, incrInterestRate)
                              , shortRate = _me$updateShortRateAmount2.shortRate
                              , shortAmount = _me$updateShortRateAmount2.shortAmount
                              , couponAmount = _me$updateShortRateAmount2.couponAmount;
                            rateEnd = shortRate + "%",
                            amountEnd = shortAmount + " + " + couponAmount + "元",
                            expectedReturn = parseFloat(shortAmount),
                            shortRateAmount = parseFloat(couponAmount)
                        } else {
                            var _me$updateRateAmount3 = me.updateRateAmount(businessPayAmount, incrInterestRate, cashType, compoundInterest, simpleInterest, lockPeriod)
                              , amount = _me$updateRateAmount3.amount
                              , rate = _me$updateRateAmount3.rate;
                            rateEnd = rate + "%（含加息）",
                            amountEnd = amount + "元",
                            expectedReturn = amount
                        }
                    } else {
                        var _me$updateRateAmount4 = me.updateRateAmount(businessPayAmount, 0, cashType, compoundInterest, simpleInterest, lockPeriod)
                          , amount = _me$updateRateAmount4.amount
                          , rate = _me$updateRateAmount4.rate;
                        rateEnd = rate + "%",
                        amountEnd = amount + "元",
                        expectedReturn = amount,
                        preBuyAllMoneyEnd = preBuyAllMoney - parseFloat(couponValue || 0),
                        0 > preBuyAllMoneyEnd && (preBuyAllMoneyEnd = 0),
                        "DISCOUNT" == couponTypeEng && (isShowDiscount = !0,
                        discount = couponValue)
                    }
                } else {
                    var _me$updateRateAmount5 = me.updateRateAmount(businessPayAmount, 0, cashType, compoundInterest, simpleInterest, lockPeriod)
                      , amount = _me$updateRateAmount5.amount
                      , rate = _me$updateRateAmount5.rate;
                    rateEnd = rate + "%",
                    amountEnd = amount + "元",
                    expectedReturn = amount,
                    preBuyAllMoneyEnd = preBuyAllMoney,
                    0 > preBuyAllMoneyEnd && (preBuyAllMoneyEnd = 0)
                }
            } else {
                var _me$updateRateAmount6 = me.updateRateAmount(businessPayAmount, 0, cashType, compoundInterest, simpleInterest, lockPeriod)
                  , amount = _me$updateRateAmount6.amount
                  , rate = _me$updateRateAmount6.rate;
                rateEnd = rate + "%",
                amountEnd = amount + "元",
                expectedReturn = amount,
                preBuyAllMoneyEnd = preBuyAllMoney,
                0 > preBuyAllMoneyEnd && (preBuyAllMoneyEnd = 0)
            }
            return {
                rateEnd: rateEnd,
                amountEnd: amountEnd,
                expectedReturn: expectedReturn,
                preBuyAllMoneyEnd: preBuyAllMoneyEnd,
                isShowDiscount: isShowDiscount,
                discount: discount,
                shortRateAmount: shortRateAmount
            }
        }
        ,
        UplanUtils.prototype.getPremiumDeductionData = function(params) {
            var me = this
              , _params$couponList = params.couponList
              , couponList = void 0 === _params$couponList ? [] : _params$couponList
              , preBuyAllMoney = params.preBuyAllMoney
              , simpleInterest = (params.compoundInterest,
            params.simpleInterest)
              , lockPeriod = params.lockPeriod
              , couponId = params.couponId
              , lockStartTime = params.lockStartTime
              , expectedReturn = null
              , isShowDiscount = !1
              , discount = 0
              , shortRateAmount = 0
              , preBuyAllMoneyEnd = preBuyAllMoney
              , amountEnd = me.preminumRateAmount(preBuyAllMoneyEnd, lockStartTime, lockPeriod, simpleInterest)
              , rateEnd = parseFloat(simpleInterest).toFixed(1);
            if (couponId && couponList) {
                var initCouponValue = couponList[0];
                couponList.map(function(list) {
                    var couponNum = list.couponId;
                    couponNum == couponId && (initCouponValue = list)
                });
                var couponTypeEng = initCouponValue.couponTypeEng
                  , couponValue = initCouponValue.couponValue;
                if ("EXTRA_INTEREST" == couponTypeEng) {
                    var incrInterestDays = initCouponValue.incrInterestDays
                      , incrInterestRate = initCouponValue.incrInterestRate;
                    if (incrInterestDays) {
                        var couponAmount = me.preminumRateCouponAmount(preBuyAllMoneyEnd, incrInterestDays, incrInterestRate);
                        rateEnd += "%",
                        expectedReturn = parseFloat(amountEnd),
                        amountEnd = amountEnd + " + " + couponAmount + "元",
                        shortRateAmount = parseFloat(couponAmount)
                    } else {
                        var totalRate = parseFloat(simpleInterest) + parseFloat(incrInterestRate)
                          , _amountEnd = me.preminumRateAmount(preBuyAllMoneyEnd, lockStartTime, lockPeriod, totalRate);
                        totalRate = parseFloat(totalRate).toFixed(1),
                        rateEnd = totalRate + "%（含加息）",
                        expectedReturn = _amountEnd,
                        _amountEnd += "元"
                    }
                } else
                    rateEnd += "%",
                    expectedReturn = amountEnd,
                    amountEnd += "元",
                    preBuyAllMoneyEnd = preBuyAllMoney - couponValue,
                    0 > preBuyAllMoneyEnd && (preBuyAllMoneyEnd = 0),
                    "DISCOUNT" == couponTypeEng && (isShowDiscount = !0,
                    discount = couponValue)
            } else
                rateEnd += "%",
                expectedReturn = amountEnd,
                amountEnd += "元";
            return {
                rateEnd: rateEnd,
                amountEnd: amountEnd,
                expectedReturn: expectedReturn,
                preBuyAllMoneyEnd: preBuyAllMoneyEnd,
                isShowDiscount: isShowDiscount,
                discount: discount,
                shortRateAmount: shortRateAmount
            }
        }
        ,
        UplanUtils
    }()
      , uplanUtils = new UplanUtils;
    module.exports = uplanUtils
});
;/*!/client/widget/product/detail/RCashType/RCashType.js*/
define("uplan:widget/product/detail/RCashType/RCashType.js", function(require, exports, module) {
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
      , RSelect = require("common:widget/react-ui/RSelect/RSelect")
      , RCoupon = (require("common:widget/ui/utils/utils"),
    function(_React$Component) {
        function RCoupon(props) {
            _classCallCheck(this, RCoupon),
            _React$Component.call(this, props)
        }
        return _inherits(RCoupon, _React$Component),
        RCoupon.prototype.render = function() {
            var props = this.props
              , caOptions = (this.state,
            props.caOptions)
              , cashType = props.cashType
              , cashTypeOptions = {
                options: caOptions,
                className: "product-uplan-cashType-select",
                selectDefaultValue: cashType,
                noResultsText: "无可用加息券",
                selectChange: props.selectCashTypeChange
            };
            return React.createElement(RSelect, cashTypeOptions)
        }
        ,
        RCoupon
    }(React.Component));
    module.exports = RCoupon
});
;/*!/client/widget/product/detail/RCoupon/RCoupon.js*/
define("uplan:widget/product/detail/RCoupon/RCoupon.js", function(require, exports, module) {
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
      , RSelect = require("common:widget/react-ui/RSelect/RSelect")
      , RCoupon = (require("common:widget/ui/utils/utils"),
    function(_React$Component) {
        function RCoupon(props) {
            _classCallCheck(this, RCoupon),
            _React$Component.call(this, props)
        }
        return _inherits(RCoupon, _React$Component),
        RCoupon.prototype.render = function() {
            var props = this.props
              , cOptions = (this.state,
            props.cOptions)
              , couponId = props.couponId
              , couponOptions = {
                options: cOptions,
                className: "product-uplan-coupon-select",
                selectDefaultValue: couponId,
                noResultsText: "无可用加息券",
                selectChange: props.selectCouponChange
            };
            return React.createElement(RSelect, couponOptions)
        }
        ,
        RCoupon
    }(React.Component));
    module.exports = RCoupon
});
;/*!/client/widget/product/detail/RProductUplanWaitStatusCountDown/RProductUplanWaitStatusCountDown.js*/
define("uplan:widget/product/detail/RProductUplanWaitStatusCountDown/RProductUplanWaitStatusCountDown.js", function(require, exports, module) {
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
      , moment = (require("common:widget/ui/utils/utils"),
    require("common:node_modules/moment/moment"))
      , RProductUplanWaitStatusCountDown = function(_React$Component) {
        function RProductUplanWaitStatusCountDown(props) {
            _classCallCheck(this, RProductUplanWaitStatusCountDown),
            _React$Component.call(this, props),
            this.state = {
                duration: parseInt(props.duration, 10)
            },
            this.step = props.step || 1,
            this.timer = null
        }
        return _inherits(RProductUplanWaitStatusCountDown, _React$Component),
        RProductUplanWaitStatusCountDown.prototype.componentDidMount = function() {
            this.autoCountdown()
        }
        ,
        RProductUplanWaitStatusCountDown.prototype.componentWillUnmount = function() {
            clearTimeout(this.timer)
        }
        ,
        RProductUplanWaitStatusCountDown.prototype.autoCountdown = function() {
            var _this = this
              , planStatus = this.props.planStatus;
            return 3 !== planStatus && 0 !== planStatus || -1 === planStatus ? (clearTimeout(this.timer),
            !1) : (clearTimeout(this.timer),
            this.state.duration <= this.step && location.reload(),
            void this.setState({
                duration: this.state.duration - this.step
            }, function() {
                _this.timer = setTimeout(function() {
                    _this.autoCountdown()
                }, 1e3)
            }))
        }
        ,
        RProductUplanWaitStatusCountDown.prototype.durationCountdown = function(timeDuration, planStatus) {
            var out = ""
              , outText = ""
              , duration = moment.duration(timeDuration, "seconds")
              , days = duration.days()
              , hours = duration.hours()
              , minutes = duration.minutes();
            return days > 0 && (out += days + "天"),
            (hours > 0 || out) && (out += hours + "时"),
            (minutes > 0 || out) && (out += minutes + "分"),
            0 >= days && (out += duration.seconds() + "秒"),
            3 == planStatus ? outText = "开始加入" : 0 == planStatus && (outText = "后开始预定"),
            {
                out: out,
                outText: outText
            }
        }
        ,
        RProductUplanWaitStatusCountDown.prototype.render = function() {
            var _props = this.props
              , financePlanType = _props.financePlanType
              , planStatus = _props.planStatus
              , duration = this.state.duration
              , _durationCountdown = this.durationCountdown(duration, planStatus)
              , out = _durationCountdown.out
              , outText = _durationCountdown.outText
              , countDownClassName = "prop-big-box-count-down";
            "PREMIUM" == financePlanType && (countDownClassName = "prop-big-box-count-down prop-big-box-count-down-1");
            var dom = React.createElement("ul", {
                className: countDownClassName
            }, React.createElement("li", {
                className: "prop-value"
            }, out), React.createElement("li", {
                className: "prop-name"
            }, outText));
            return React.createElement("div", null, dom)
        }
        ,
        RProductUplanWaitStatusCountDown
    }(React.Component);
    module.exports = RProductUplanWaitStatusCountDown
});
;/*!/client/widget/product/detail/RReserveBtncountDown/RReserveBtncountDown.js*/
define("uplan:widget/product/detail/RReserveBtncountDown/RReserveBtncountDown.js", function(require, exports, module) {
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
      , moment = (require("common:widget/ui/utils/utils"),
    require("common:node_modules/moment/moment"))
      , RReserveBtncountDown = function(_React$Component) {
        function RReserveBtncountDown(props) {
            _classCallCheck(this, RReserveBtncountDown),
            _React$Component.call(this, props),
            this.reserveTime = props.reserveTime,
            this.reserveNodeTime = props.reserveNodeTime,
            this.userDiffTime = (new Date).getTime() - props.reserveNodeTime,
            this.state = {
                duration: null
            },
            this.step = props.step || 1,
            this.timer = null
        }
        return _inherits(RReserveBtncountDown, _React$Component),
        RReserveBtncountDown.prototype.componentWillMount = function() {
            this.autoCountdown()
        }
        ,
        RReserveBtncountDown.prototype.componentDidMount = function() {
            this.autoCountdown()
        }
        ,
        RReserveBtncountDown.prototype.componentWillUnmount = function() {
            clearTimeout(this.timer)
        }
        ,
        RReserveBtncountDown.prototype.autoCountdown = function() {
            var _this = this;
            clearTimeout(this.timer);
            var now = (new Date).getTime();
            now -= this.userDiffTime;
            var duration = moment(this.props.reserveTime).diff(now, "s")
              , changeDuration = this.state.duration ? this.state.duration : duration;
            return changeDuration <= this.step ? void location.reload() : void this.setState({
                duration: duration
            }, function() {
                _this.timer = setTimeout(function() {
                    _this.autoCountdown()
                }, 1e3)
            })
        }
        ,
        RReserveBtncountDown.prototype.durationCountdown = function(timeDuration) {
            var out = ""
              , duration = moment.duration(timeDuration, "s")
              , days = duration.days()
              , hours = duration.hours()
              , minutes = duration.minutes();
            return days > 0 && (out += days + "天"),
            (hours > 0 || out) && (out += hours + "时"),
            (minutes > 0 || out) && (out += minutes + "分"),
            0 >= days && (out += duration.seconds() + "秒"),
            {
                out: out
            }
        }
        ,
        RReserveBtncountDown.prototype.render = function() {
            var duration = this.state.duration
              , _durationCountdown = this.durationCountdown(duration)
              , out = _durationCountdown.out;
            return React.createElement("div", {
                className: "uplan-btn disable"
            }, "距离预约出借还剩", out)
        }
        ,
        RReserveBtncountDown
    }(React.Component);
    module.exports = RReserveBtncountDown
});
;/*!/client/widget/product/detail/RProductUplanJoinDialog/RProductUplanJoinDialog.js*/
define("uplan:widget/product/detail/RProductUplanJoinDialog/RProductUplanJoinDialog.js", function(require, exports, module) {
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
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source)
                Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key])
        }
        return target
    }
      , React = require("common:node_modules/react/react")
      , RDialog = require("common:widget/react-ui/RWeDialog/RWeDialog")
      , RWETooltip = require("common:widget/react-ui/RWETooltip/RWETooltip")
      , RForm = require("common:widget/react-ui/RForm/RForm")
      , RCashType = (require("common:widget/react-ui/RSelect/RSelect"),
    require("uplan:widget/product/detail/RCashType/RCashType"))
      , RCoupon = require("uplan:widget/product/detail/RCoupon/RCoupon")
      , service = (RForm.TextInput,
    require("common:widget/ui/service/service-factory"))
      , uplanService = service.getService("uplan")
      , p2pService = service.getService("p2p")
      , utils = require("common:widget/ui/utils/utils")
      , numeral = require("common:node_modules/numeral/numeral")
      , uplanUtils = require("uplan:widget/product/detail/common/js/uplan-product-util.js")
      , $statistic = require("common:node_modules/glpb-components-common/src/index").weStatistic
      , RProductUplanJoinDialog = function(_React$Component) {
        function RProductUplanJoinDialog(props) {
            _classCallCheck(this, RProductUplanJoinDialog),
            _React$Component.call(this, props),
            this.doJoin = this.doJoin.bind(this),
            this.selectCouponChange = this.selectCouponChange.bind(this),
            this.selectCashTypeChange = this.selectCashTypeChange.bind(this),
            this.checkAgree = this.checkAgree.bind(this),
            this.jumpToRisk = this.jumpToRisk.bind(this),
            this.jumpToBindCard = this.jumpToBindCard.bind(this),
            this.setDeduction = this.setDeduction.bind(this),
            this.state = {
                isFirstRender: !0,
                checked: !1,
                isLoading: !1,
                hideErrorMsg: "",
                errorMsg: "",
                period: null,
                expectedRateUplan: null,
                cashType: null,
                couponId: null,
                couponValue: null,
                couponTypeEng: null,
                incrInterestDays: null,
                incrInterestRate: null,
                couponList: null,
                exceedRiskLimit: !1,
                isDeduction: !1
            }
        }
        return _inherits(RProductUplanJoinDialog, _React$Component),
        RProductUplanJoinDialog.prototype.componentDidMount = function() {
            this.getCouponList()
        }
        ,
        RProductUplanJoinDialog.prototype.getIsRiskLimit = function() {
            var _this = this
              , props = this.props
              , inputValue = props.inputValue
              , riskInfo = props.riskInfo
              , isRisk = riskInfo.isRisk;
            isRisk && p2pService.checkRiskLimit({
                amount: inputValue
            }).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                if (requestStatus === uplanService.STATUS.SUCCESS && 0 === status) {
                    var rel = data.data;
                    _this.setState({
                        exceedRiskLimit: rel.exceedRiskLimit
                    })
                } else {
                    var message = data.message || "获取判断是否超过风评限额败, 请稍后再试";
                    _this.setState({
                        hideErrorMsg: message
                    }),
                    console.log("请求判断是否超过风评限额出错：" + message)
                }
            }).caught(function(msg) {
                _this.setState({
                    hideErrorMsg: msg
                }),
                console.log("请求判断是否超过风评限额出错：" + msg)
            })
        }
        ,
        RProductUplanJoinDialog.prototype.getCouponList = function() {
            var _this2 = this
              , props = this.props
              , detailInfo = props.detailInfo
              , inputValue = props.inputValue
              , financePlan = detailInfo.financePlan
              , financePlanSubPointId = detailInfo.financePlanSubPointId
              , businessId = financePlan.id
              , businessName = financePlan.name
              , buyInRate = financePlan.buyInRate
              , lockPeriod = (financePlan.category,
            financePlan.lockPeriod)
              , uplanType = financePlan.financePlanType
              , novice = financePlan.novice
              , businessCategory = 1 == novice ? "U_NEW" : null == financePlanSubPointId ? "UPLAN" : "U_PLAN_CONTINUE"
              , payAmount = uplanUtils.getPayAmount(inputValue, buyInRate);
            uplanService.getCouponList({
                businessCategory: businessCategory,
                payAmount: payAmount,
                businessId: businessId,
                businessName: businessName,
                lockPeriod: lockPeriod,
                uplanType: uplanType
            }).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                if (requestStatus === uplanService.STATUS.SUCCESS && 0 === status) {
                    var couponRe = data.data || []
                      , couponOne = couponRe[0] || {}
                      , couponId = couponOne.couponId
                      , couponValue = couponOne.couponValue
                      , couponTypeEng = couponOne.couponTypeEng
                      , incrInterestRate = couponOne.incrInterestRate
                      , incrInterestDays = couponOne.incrInterestDays;
                    _this2.setState({
                        couponList: data.data,
                        couponId: couponId,
                        couponValue: couponValue,
                        couponTypeEng: couponTypeEng,
                        incrInterestRate: incrInterestRate,
                        incrInterestDays: incrInterestDays
                    })
                } else {
                    var message = data.message || "获取优惠券列表失败, 请稍后再试";
                    _this2.setState({
                        hideErrorMsg: message
                    }),
                    console.log("请求我的特权列表出错：" + message)
                }
            }).caught(function(msg) {
                _this2.setState({
                    hideErrorMsg: msg
                }),
                console.log("请求我的特权列表出错：" + msg)
            })
        }
        ,
        RProductUplanJoinDialog.prototype.doJoin = function(e) {
            this.setState({
                isLoading: !0
            });
            var target = e.currentTarget
              , disable = $(target).hasClass("j-btn-disabled");
            if (disable)
                return !1;
            var checked = this.state.checked;
            return checked ? void e.target.submit() : (this.setState({
                isLoading: !1,
                errorMsg: "请阅读并同意协议"
            }),
            !1)
        }
        ,
        RProductUplanJoinDialog.prototype.getCashTypeOptions = function() {
            var options = [{
                value: "INVEST",
                label: "循环出借"
            }, {
                value: "RRD",
                label: "提取至账户"
            }];
            return options
        }
        ,
        RProductUplanJoinDialog.prototype.getCouponOptions = function(couponList) {
            var defaultValue = 0
              , options = [];
            return couponList ? (couponList.forEach(function(item) {
                var name = item.name
                  , couponId = item.couponId;
                options.push({
                    value: couponId,
                    label: name
                })
            }),
            options.push({
                value: defaultValue,
                label: "不使用优惠券"
            })) : options.push({
                value: defaultValue,
                label: "无可用的优惠券"
            }),
            options
        }
        ,
        RProductUplanJoinDialog.prototype.selectCashTypeChange = function(val) {
            this.setState({
                cashType: val,
                isFirstRender: !1
            })
        }
        ,
        RProductUplanJoinDialog.prototype.selectCouponChange = function(val) {
            var couponId = void 0
              , couponValue = void 0
              , couponTypeEng = void 0
              , incrInterestRate = void 0
              , incrInterestDays = void 0
              , couponList = this.state.couponList;
            val > 0 ? couponList.forEach(function(item) {
                return couponId = item.couponId,
                couponId == val ? (couponValue = item.couponValue,
                couponTypeEng = item.couponTypeEng,
                incrInterestRate = item.incrInterestRate,
                void (incrInterestDays = item.incrInterestDays)) : void 0
            }) : 0 == val && (couponValue = 0,
            incrInterestRate = 0,
            couponTypeEng = -1,
            incrInterestDays = 0),
            this.setState({
                couponId: val,
                couponValue: couponValue,
                couponTypeEng: couponTypeEng,
                incrInterestRate: incrInterestRate,
                incrInterestDays: incrInterestDays,
                isFirstRender: !1
            })
        }
        ,
        RProductUplanJoinDialog.prototype.checkAgree = function() {
            var curStatus = !this.state.checked;
            this.setState({
                checked: curStatus,
                errorMsg: curStatus ? "" : "请阅读并同意协议"
            })
        }
        ,
        RProductUplanJoinDialog.prototype.jumpToRisk = function() {
            var props = this.props
              , detailInfo = (this.state,
            props.detailInfo)
              , financePlan = detailInfo.financePlan
              , id = financePlan.id;
            location.href = "/user/risk/riskPc?type=uplan&id=" + id
        }
        ,
        RProductUplanJoinDialog.prototype.statisticRiskEvent = function() {
            $statistic.eventRaw({
                eventId: "click_join_money_limit_remeaure_word"
            })
        }
        ,
        RProductUplanJoinDialog.prototype.jumpToBindCard = function() {
            location.href = "/user/trade/recharge"
        }
        ,
        RProductUplanJoinDialog.prototype.getNumbersSelectChange = function(paramsData) {
            var couponList = paramsData.couponList
              , preBuyAllMoney = paramsData.preBuyAllMoney
              , cashType = paramsData.cashType
              , compoundInterest = paramsData.compoundInterest
              , simpleInterest = paramsData.simpleInterest
              , lockPeriod = paramsData.lockPeriod
              , couponId = paramsData.couponId
              , state = this.state
              , couponValue = state.couponValue
              , couponTypeEng = state.couponTypeEng
              , incrInterestRate = state.incrInterestRate
              , params = {
                couponList: couponList,
                preBuyAllMoney: preBuyAllMoney,
                cashType: cashType,
                compoundInterest: compoundInterest,
                simpleInterest: simpleInterest,
                lockPeriod: lockPeriod,
                couponValue: couponValue,
                couponTypeEng: couponTypeEng,
                incrInterestRate: incrInterestRate,
                couponId: couponId
            }
              , result = uplanUtils.getNumbersSelectChange(params);
            return result
        }
        ,
        RProductUplanJoinDialog.prototype.renderFooterDom = function(planStatus, noticeClassName) {
            var footerDom = null;
            return footerDom = 9 == planStatus ? React.createElement("div", {
                className: noticeClassName
            }, React.createElement("div", {
                className: "notice-title"
            }, "温馨提示"), React.createElement("ul", {
                className: "notice-desc "
            }, React.createElement("li", null, "1.利息处理方式一经选择，无法修改。"), React.createElement("li", null, "2.可提取金额为通过U享自动投标服务获取的回报部分，本金部分将继续滚动投标，直至固定服务期限结束，自动退出本计划。"), React.createElement("li", null, "3.兑换优惠券，可点击以下链接", React.createElement("a", {
                href: "/user/privilege#privilege-my-coupon"
            }, "兑换优惠券"), "。"))) : React.createElement("div", {
                className: noticeClassName
            }, React.createElement("div", {
                className: "notice-title"
            }, "温馨提示"), React.createElement("ul", {
                className: "notice-desc "
            }, React.createElement("li", null, "1. 利息处理方式一经选择，无法修改。"), React.createElement("li", null, "2. 可提取金额为通过U享自动投标服务获取的回报部分，本金部分将继续滚动投标，直至固定服务期限结束，自动退出本计划。"), React.createElement("li", null, "3. 兑换优惠券，可点击以下链接", React.createElement("a", {
                href: "/user/privilege#privilege-my-coupon"
            }, "兑换优惠券"), "。"), React.createElement("li", null, "4.  按扣费后年利率计算的利息不代表对实际获得利息的承诺，网贷有风险，出借需谨慎，出借人风险自担。")))
        }
        ,
        RProductUplanJoinDialog.prototype.setDeduction = function() {
            var isDeduction = this.state.isDeduction;
            this.setState({
                isDeduction: !isDeduction
            })
        }
        ,
        RProductUplanJoinDialog.prototype.renderDeductionPointDom = function(isDeductionPoint) {
            if (!isDeductionPoint)
                return null;
            var deductionData = this.props.deductionData || {}
              , _ref = deductionData || {}
              , _ref$availableScore = _ref.availableScore
              , availableScore = void 0 === _ref$availableScore ? 0 : _ref$availableScore
              , _ref$deductionScore = _ref.deductionScore
              , deductionScore = void 0 === _ref$deductionScore ? 0 : _ref$deductionScore
              , _ref$deductionAmount = _ref.deductionAmount
              , deductionAmount = void 0 === _ref$deductionAmount ? 0 : _ref$deductionAmount;
            availableScore = utils.commaInteger(availableScore || 0),
            deductionScore = utils.commaInteger(deductionScore || 0);
            var deductionAmountString = utils.commaNormal(deductionAmount)
              , isDeduction = this.state.isDeduction
              , totalAmount = React.createElement("span", {
                className: "total-amount"
            }, deductionAmountString + "元")
              , pointsText = "共" + availableScore + "，使用" + deductionScore + "抵扣" + deductionAmountString + "元"
              , checkedDom = React.createElement("span", {
                onClick: this.setDeduction,
                className: "points-input Punchecked icon-we-yuanquan"
            });
            isDeduction && (checkedDom = React.createElement("span", {
                onClick: this.setDeduction,
                className: "points-input Pchecked icon-we-xuanzhong"
            })),
            0 >= deductionAmount && (pointsText = "共" + availableScore + "，使用100可抵扣1元",
            checkedDom = React.createElement("span", {
                className: "points-input Punchecked disabled"
            }));
            var tooltipProps = {
                id: "product-uplan-tooltip-01",
                place: "right",
                tip: " 1、100积分可抵扣1元人民币，抵现时使用积分为100的整数倍。<br/>2、单笔最多用积分抵扣出借金额的1%。<br/>3、出借优选、U享（服务期限≥12个月）时可用。",
                delayHide: 100
            };
            return React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "积分抵扣", React.createElement(RWETooltip, tooltipProps)), React.createElement("span", {
                className: "value points-value"
            }, checkedDom, totalAmount, React.createElement("span", {
                className: "total-points"
            }, pointsText)))
        }
        ,
        RProductUplanJoinDialog.prototype.createExpectedReturnDom = function(expectedReturn, isDeductionPoint, shortAmount) {
            void 0 === expectedReturn && (expectedReturn = 0);
            var _state = this.state
              , isDeduction = _state.isDeduction
              , couponTypeEng = _state.couponTypeEng
              , couponValue = _state.couponValue
              , couponId = _state.couponId
              , incrInterestDays = _state.incrInterestDays
              , _ref2 = this.props || {}
              , deductionData = _ref2.deductionData
              , deductionVal = 0;
            if (isDeduction) {
                var deductionAmount = deductionData.deductionAmount;
                deductionVal = parseFloat(deductionAmount)
            }
            var couponVal = 0;
            couponId && (("DISCOUNT" == couponTypeEng || "VOUCHER" == couponTypeEng) && (couponVal = parseFloat(couponValue)),
            "EXTRA_INTEREST" == couponTypeEng && incrInterestDays && (couponVal = parseFloat(shortAmount))),
            expectedReturn = parseInt(100 * expectedReturn) / 100;
            var amount = utils.commaNormal(expectedReturn + deductionVal + couponVal);
            expectedReturn = utils.commaFloat(expectedReturn);
            var deductionValString = utils.commaNormal(deductionVal)
              , showText = "扣费后利息" + expectedReturn + "元";
            couponVal && (showText += "+优惠券" + couponVal + "元"),
            deductionVal && (showText += "+积分抵扣" + deductionValString + "元"),
            showText += "（仅供参考）";
            var expectedText = React.createElement("i", {
                className: "expected-text"
            }, showText);
            return React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "预估收入"), React.createElement("span", {
                className: "value orange-highlight"
            }, amount + "元", expectedText))
        }
        ,
        RProductUplanJoinDialog.prototype.render = function() {
            var props = this.props
              , state = this.state
              , couponList = state.couponList
              , isFirstRender = state.isFirstRender
              , detailInfo = props.detailInfo
              , inputValue = props.inputValue
              , ucodeId = props.ucodeId
              , financePlan = (props.riskInfo,
            detailInfo.financePlan)
              , planStatus = detailInfo.planStatus
              , compoundInterest = detailInfo.compoundInterest
              , avaliablePoint = detailInfo.avaliablePoint
              , nodePayInfo = detailInfo.nodePayInfo
              , lockStartTime = detailInfo.lockStartTime
              , reserveStatus = financePlan.reserveStatus
              , name = financePlan.name
              , id = financePlan.id
              , category = (financePlan.financePlanType,
            financePlan.category)
              , contractHref = "/p2p/contract/finance?id=" + id
              , yearRateDom = null
              , expectedRate = financePlan.expectedRate;
            yearRateDom = "OLD" != category ? compoundInterest : expectedRate;
            var lockPeriod = financePlan.lockPeriod
              , caOptions = this.getCashTypeOptions()
              , cashType = state.cashType ? state.cashType : "INVEST"
              , cOptions = this.getCouponOptions(couponList)
              , couponId = state.couponId || 0 == state.couponId ? state.couponId : cOptions[0].value
              , isChecked = state.checked
              , buyInRate = financePlan.buyInRate
              , preBuyAllMoney = uplanUtils.getPayAmount(inputValue, buyInRate)
              , preBuyAllMoneyEnd = preBuyAllMoney
              , rateEnd = yearRateDom + "%"
              , amountEnd = "正在计算..."
              , expectedReturn = 0
              , simpleInterest = financePlan.expectedRateUplan
              , isShowDiscount = !1
              , discount = 0
              , shortRateAmount = 0
              , result = null
              , paramsData = {
                couponList: couponList,
                rateEnd: rateEnd,
                amountEnd: amountEnd,
                preBuyAllMoney: preBuyAllMoney,
                preBuyAllMoneyEnd: preBuyAllMoneyEnd,
                cashType: cashType,
                compoundInterest: compoundInterest,
                simpleInterest: simpleInterest,
                lockPeriod: lockPeriod,
                lockStartTime: lockStartTime,
                couponId: couponId
            };
            result = isFirstRender ? uplanUtils.getNumbersFirst(paramsData) : this.getNumbersSelectChange(paramsData),
            result && result.rateEnd && (rateEnd = result.rateEnd,
            amountEnd = result.amountEnd,
            expectedReturn = result.expectedReturn || 0,
            preBuyAllMoney = null != result.preBuyAllMoneyEnd ? result.preBuyAllMoneyEnd : preBuyAllMoneyEnd,
            isShowDiscount = result.isShowDiscount,
            discount = result.discount,
            shortRateAmount = result.shortRateAmount);
            var deductionAmount = 0;
            if (state.isDeduction) {
                var pointsAmount = props.deductionData || {};
                deductionAmount = parseFloat(pointsAmount.deductionAmount) || 0,
                preBuyAllMoney = deductionAmount > 0 ? preBuyAllMoney - deductionAmount : preBuyAllMoney
            }
            preBuyAllMoneyEnd = utils.commaNormal(preBuyAllMoney);
            var inputValueF = inputValue ? utils.commaInteger(inputValue) : 0
              , formProps = {
                action: "/uplan/product/planBuy",
                method: "POST",
                id: "product-uplan-join-form"
            }
              , dialogProps = {
                showing: !0,
                title: 9 == planStatus ? "提前出借U享" : -1 != reserveStatus ? "确认预约出借" : "授权出借",
                dialog: {
                    className: "product-uplan-dialog product-uplan-join-dialog",
                    style: {
                        width: 700
                    }
                },
                onRequestClose: props.onRequestClose
            }
              , disCountDom = isShowDiscount ? React.createElement("div", {
                className: "discount-tips"
            }, "本次出借可抵扣", discount, "元") : null
              , ucodeDom = null
              , contractDom = null;
            9 == planStatus ? (ucodeDom = React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "ucode-tip"
            }, 9 == planStatus ? "您正在使用U-CODE提前加入本期U享。" : null)),
            contractDom = React.createElement("span", {
                className: "agreement-desc"
            }, "我已阅读并同意签署", React.createElement("a", {
                href: contractHref,
                target: "_blank"
            }, "《U享服务协议》"), "、", React.createElement("a", {
                href: "https://www.renrendai.com/agreement/user/currency/cmsId/5a9111a116338128d205759a",
                target: "_blank"
            }, "《借款协议（范本）》"), "及 ", React.createElement("a", {
                href: "https://www.renrendai.com/agreement/user/currency/cmsId/5a9122191c9f2a1008c653cb",
                target: "_blank"
            }, "《债权转让及受让协议（范本）》"))) : contractDom = React.createElement("span", {
                className: "agreement-desc"
            }, "我已阅读并同意签署", React.createElement("a", {
                href: contractHref,
                target: "_blank"
            }, "《U享服务协议》"), "、", React.createElement("a", {
                href: "https://www.renrendai.com/agreement/user/currency/cmsId/5a9111a116338128d205759a",
                target: "_blank"
            }, "《借款协议（范本）》"), "及 ", React.createElement("a", {
                href: "https://www.renrendai.com/agreement/user/currency/cmsId/5a9122191c9f2a1008c653cb",
                target: "_blank"
            }, "《债权转让及受让协议（范本）》"), "， 已确认", React.createElement("a", {
                href: "https://www.renrendai.com/agreement/contract/currency/cmsId/5bb06ea3e141322c89974537",
                target: "_blank"
            }, "《风险揭示书》"));
            var joinBtnProps = {
                className: "j-btn  j-btn-super-big "
            };
            state.isLoading ? (joinBtnProps.className += " j-btn-disabled ",
            joinBtnProps.text = -1 != reserveStatus ? "预约出借中" : "授权出借中") : (joinBtnProps.className += " j-btn-orange ",
            joinBtnProps.text = -1 != reserveStatus ? "预约出借" : "授权出借");
            var btnDom = React.createElement("input", {
                className: joinBtnProps.className,
                type: "submit",
                value: joinBtnProps.text
            })
              , noticeClassName = "notice-con notice-con-mt40"
              , rechargeDom = null
              , riskDom = null
              , rechargeValue = numeral(avaliablePoint).subtract(preBuyAllMoney) < 0 ? !0 : !1;
            if (rechargeValue)
                rechargeDom = React.createElement("span", {
                    className: "recharge"
                }, React.createElement("em", {
                    className: "orange"
                }, "您的余额不足"), React.createElement("a", {
                    href: "/user/trade/recharge"
                }, "充值")),
                btnDom = React.createElement("div", {
                    className: "j-btn  j-btn-super-big  j-btn-disabled"
                }, joinBtnProps.text);
            else if (nodePayInfo) {
                var bindStatus = nodePayInfo.bindStatus;
                (0 == bindStatus || 3 == bindStatus) && (btnDom = React.createElement("div", {
                    className: "j-btn  j-btn-super-big  j-btn-orange",
                    onClick: this.jumpToBindCard
                }, joinBtnProps.text))
            }
            var footerDom = this.renderFooterDom(planStatus, noticeClassName)
              , isDeductionPoint = lockPeriod >= 12 ? !0 : !1
              , deductionPointDom = this.renderDeductionPointDom(isDeductionPoint)
              , expectedReturnDom = this.createExpectedReturnDom(expectedReturn, isDeductionPoint, shortRateAmount)
              , DeductionDom = null;
            return isDeductionPoint || (DeductionDom = React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "扣费后利息"), React.createElement("span", {
                className: "value orange-highlight"
            }, amountEnd))),
            React.createElement(RDialog, dialogProps, React.createElement("div", {
                className: "product-uplan-body join-body"
            }, React.createElement(RForm, _extends({}, formProps, {
                onSubmit: this.doJoin
            }), React.createElement("input", {
                type: "hidden",
                name: "financePlanId",
                value: id,
                readOnly: !0
            }), React.createElement("input", {
                type: "hidden",
                name: "cashType",
                value: cashType,
                readOnly: !0
            }), React.createElement("input", {
                type: "hidden",
                name: "amount",
                value: inputValue,
                readOnly: !0
            }), React.createElement("input", {
                type: "hidden",
                name: "couponId",
                value: couponId,
                readOnly: !0
            }), React.createElement("input", {
                type: "hidden",
                name: "ucodeId",
                value: ucodeId,
                readOnly: !0
            }), React.createElement("input", {
                type: "hidden",
                name: "scoreAmount",
                value: deductionAmount,
                readOnly: !0
            }), ucodeDom, React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, 9 == planStatus ? "兑换产品" : "服务期数"), React.createElement("span", {
                className: "value orange-highlight"
            }, name)), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "扣费后年利率"), React.createElement("span", {
                className: "value orange-highlight"
            }, rateEnd)), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "服务期限"), React.createElement("span", {
                className: "value orange-highlight"
            }, lockPeriod, "个月")), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "授权出借本金"), React.createElement("span", {
                className: "value orange-highlight"
            }, inputValueF, "元")), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "利息处理方式"), React.createElement("div", {
                className: "value-width-3"
            }, React.createElement(RCashType, {
                caOptions: caOptions,
                selectCashTypeChange: this.selectCashTypeChange,
                cashType: cashType
            }))), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "优惠券"), React.createElement("div", {
                className: "value-width-3"
            }, React.createElement(RCoupon, {
                cOptions: cOptions,
                selectCouponChange: this.selectCouponChange,
                couponId: couponId
            }), disCountDom)), deductionPointDom, expectedReturnDom, React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "应付金额"), React.createElement("span", {
                className: "value w110"
            }, React.createElement("em", {
                className: "orange"
            }, preBuyAllMoneyEnd, "元")), rechargeDom), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("div", {
                className: "uplan-agreement w540"
            }, React.createElement("div", null, React.createElement("span", {
                className: isChecked ? "agreement-check-img icon-we-gouxuanicon" : "agreement-check-img icon-we-weigouxuanicon",
                onClick: this.checkAgree
            }), contractDom))), React.createElement("div", {
                className: "error-msg"
            }, state.errorMsg), React.createElement("div", {
                className: "ui-confirm-submit-box  mt10 text-center"
            }, btnDom), riskDom, footerDom)))
        }
        ,
        RProductUplanJoinDialog
    }(React.Component);
    module.exports = RProductUplanJoinDialog
});
;/*!/client/widget/product/detail/RProductUplanPreminumJoinDialog/RProductUplanPreminumJoinDialog.js*/
define("uplan:widget/product/detail/RProductUplanPreminumJoinDialog/RProductUplanPreminumJoinDialog.js", function(require, exports, module) {
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
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source)
                Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key])
        }
        return target
    }
      , React = require("common:node_modules/react/react")
      , RDialog = require("common:widget/react-ui/RWeDialog/RWeDialog")
      , RWETooltip = require("common:widget/react-ui/RWETooltip/RWETooltip")
      , RForm = require("common:widget/react-ui/RForm/RForm")
      , RCoupon = (require("common:widget/react-ui/RSelect/RSelect"),
    require("uplan:widget/product/detail/RCashType/RCashType"),
    require("uplan:widget/product/detail/RCoupon/RCoupon"))
      , service = (RForm.TextInput,
    require("common:widget/ui/service/service-factory"))
      , p2pService = service.getService("p2p")
      , uplanService = service.getService("uplan")
      , utils = require("common:widget/ui/utils/utils")
      , numeral = require("common:node_modules/numeral/numeral")
      , uplanUtils = require("uplan:widget/product/detail/common/js/uplan-product-util.js")
      , $statistic = require("common:node_modules/glpb-components-common/src/index").weStatistic
      , RProductUplanJoinDialog = function(_React$Component) {
        function RProductUplanJoinDialog(props) {
            _classCallCheck(this, RProductUplanJoinDialog),
            _React$Component.call(this, props),
            this.doJoin = this.doJoin.bind(this),
            this.selectCouponChange = this.selectCouponChange.bind(this),
            this.checkAgree = this.checkAgree.bind(this),
            this.jumpToRisk = this.jumpToRisk.bind(this),
            this.jumpToBindCard = this.jumpToBindCard.bind(this),
            this.setDeduction = this.setDeduction.bind(this),
            this.state = {
                isFirstRender: !0,
                checked: !1,
                isLoading: !1,
                hideErrorMsg: "",
                errorMsg: "",
                period: null,
                expectedRateUplan: null,
                couponId: null,
                couponValue: null,
                couponTypeEng: null,
                incrInterestRate: null,
                incrInterestDays: null,
                couponList: null,
                exceedRiskLimit: !1,
                isDeduction: !1
            }
        }
        return _inherits(RProductUplanJoinDialog, _React$Component),
        RProductUplanJoinDialog.prototype.componentDidMount = function() {
            this.getCouponList()
        }
        ,
        RProductUplanJoinDialog.prototype.getIsRiskLimit = function() {
            var _this = this
              , props = this.props
              , inputValue = props.inputValue
              , riskInfo = props.riskInfo
              , isRisk = riskInfo.isRisk;
            isRisk && p2pService.checkRiskLimit({
                amount: inputValue
            }).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                if (requestStatus === uplanService.STATUS.SUCCESS && 0 === status) {
                    var rel = data.data;
                    _this.setState({
                        exceedRiskLimit: rel.exceedRiskLimit
                    })
                } else {
                    var message = data.message || "获取判断是否超过风评限额败, 请稍后再试";
                    _this.setState({
                        hideErrorMsg: message
                    }),
                    console.log("请求判断是否超过风评限额出错：" + message)
                }
            }).caught(function(msg) {
                _this.setState({
                    hideErrorMsg: msg
                }),
                console.log("请求判断是否超过风评限额出错：" + msg)
            })
        }
        ,
        RProductUplanJoinDialog.prototype.getCouponList = function() {
            var _this2 = this
              , props = this.props
              , detailInfo = props.detailInfo
              , inputValue = props.inputValue
              , financePlan = detailInfo.financePlan
              , financePlanSubPointId = detailInfo.financePlanSubPointId
              , businessId = financePlan.id
              , businessName = financePlan.name
              , buyInRate = financePlan.buyInRate
              , lockPeriod = (financePlan.category,
            financePlan.lockPeriod)
              , uplanType = financePlan.financePlanType
              , businessCategory = null == financePlanSubPointId ? "PREMIUM" : "PREMIUM_CONTINUE"
              , payAmount = uplanUtils.getPayAmount(inputValue, buyInRate);
            uplanService.getCouponList({
                businessCategory: businessCategory,
                payAmount: payAmount,
                businessId: businessId,
                businessName: businessName,
                lockPeriod: lockPeriod,
                uplanType: uplanType
            }).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                if (requestStatus === uplanService.STATUS.SUCCESS && 0 === status) {
                    var couponRe = data.data || []
                      , couponOne = couponRe[0] || {}
                      , couponId = couponOne.couponId
                      , couponValue = couponOne.couponValue
                      , couponTypeEng = couponOne.couponTypeEng
                      , incrInterestRate = couponOne.incrInterestRate
                      , incrInterestDays = couponOne.incrInterestDays;
                    _this2.setState({
                        couponList: data.data,
                        couponId: couponId,
                        couponValue: couponValue,
                        couponTypeEng: couponTypeEng,
                        incrInterestRate: incrInterestRate,
                        incrInterestDays: incrInterestDays
                    })
                } else {
                    var message = data.message || "请求后端服务出错, 请稍后再试";
                    console.log("请求我的特权列表出错：" + message)
                }
            }).caught(function(msg) {
                console.log("请求我的特权列表出错：" + msg)
            })
        }
        ,
        RProductUplanJoinDialog.prototype.doJoin = function(e) {
            this.setState({
                isLoading: !0
            });
            var target = e.currentTarget
              , disable = $(target).hasClass("j-btn-disabled");
            if (disable)
                return !1;
            var checked = this.state.checked;
            return checked ? void e.target.submit() : (this.setState({
                isLoading: !1,
                errorMsg: "请阅读并同意协议"
            }),
            !1)
        }
        ,
        RProductUplanJoinDialog.prototype.getCouponOptions = function(couponList) {
            var defaultValue = 0
              , options = [];
            return couponList ? (couponList.forEach(function(item) {
                var name = item.name
                  , couponId = item.couponId;
                options.push({
                    value: couponId,
                    label: name
                })
            }),
            options.push({
                value: defaultValue,
                label: "不使用优惠券"
            })) : options.push({
                value: defaultValue,
                label: "无可用的优惠券"
            }),
            options
        }
        ,
        RProductUplanJoinDialog.prototype.selectCouponChange = function(val) {
            var couponId = void 0
              , couponValue = void 0
              , couponTypeEng = void 0
              , incrInterestRate = void 0
              , incrInterestDays = void 0
              , couponList = this.state.couponList;
            val > 0 ? couponList.forEach(function(item) {
                return couponId = item.couponId,
                couponId == val ? (couponValue = item.couponValue,
                couponTypeEng = item.couponTypeEng,
                incrInterestRate = item.incrInterestRate,
                void (incrInterestDays = item.incrInterestDays)) : void 0
            }) : 0 == val && (couponValue = 0,
            incrInterestRate = 0,
            couponTypeEng = -1,
            incrInterestDays = 0),
            this.setState({
                couponId: val,
                couponValue: couponValue,
                couponTypeEng: couponTypeEng,
                incrInterestRate: incrInterestRate,
                incrInterestDays: incrInterestDays,
                isFirstRender: !1
            })
        }
        ,
        RProductUplanJoinDialog.prototype.checkAgree = function() {
            var curStatus = !this.state.checked;
            this.setState({
                checked: curStatus,
                errorMsg: curStatus ? "" : "请阅读并同意协议"
            })
        }
        ,
        RProductUplanJoinDialog.prototype.jumpToRisk = function() {
            var props = this.props
              , detailInfo = (this.state,
            props.detailInfo)
              , financePlan = detailInfo.financePlan
              , id = financePlan.id;
            location.href = "/user/risk/riskPc?type=uplan&id=" + id
        }
        ,
        RProductUplanJoinDialog.prototype.statisticRiskEvent = function() {
            $statistic.eventRaw({
                eventId: "click_join_money_limit_remeaure_word"
            })
        }
        ,
        RProductUplanJoinDialog.prototype.jumpToBindCard = function() {
            location.href = "/user/trade/recharge"
        }
        ,
        RProductUplanJoinDialog.prototype.getPremiumSelectChange = function(paramsData) {
            var couponList = paramsData.couponList
              , preBuyAllMoney = paramsData.preBuyAllMoney
              , compoundInterest = paramsData.compoundInterest
              , simpleInterest = paramsData.simpleInterest
              , lockPeriod = paramsData.lockPeriod
              , couponId = paramsData.couponId
              , lockStartTime = paramsData.lockStartTime
              , state = this.state
              , couponValue = state.couponValue
              , couponTypeEng = state.couponTypeEng
              , incrInterestRate = state.incrInterestRate
              , params = {
                couponList: couponList,
                preBuyAllMoney: preBuyAllMoney,
                compoundInterest: compoundInterest,
                simpleInterest: simpleInterest,
                lockPeriod: lockPeriod,
                couponValue: couponValue,
                couponTypeEng: couponTypeEng,
                incrInterestRate: incrInterestRate,
                lockStartTime: lockStartTime,
                couponId: couponId
            }
              , result = uplanUtils.getPremiumDeductionData(params);
            return result
        }
        ,
        RProductUplanJoinDialog.prototype.setDeduction = function() {
            var isDeduction = this.state.isDeduction;
            this.setState({
                isDeduction: !isDeduction
            })
        }
        ,
        RProductUplanJoinDialog.prototype.renderDeductionPointDom = function() {
            var deductionData = this.props.deductionData || {}
              , _ref = deductionData || {}
              , _ref$availableScore = _ref.availableScore
              , availableScore = void 0 === _ref$availableScore ? 0 : _ref$availableScore
              , _ref$deductionScore = _ref.deductionScore
              , deductionScore = void 0 === _ref$deductionScore ? 0 : _ref$deductionScore
              , _ref$deductionAmount = _ref.deductionAmount
              , deductionAmount = void 0 === _ref$deductionAmount ? 0 : _ref$deductionAmount;
            availableScore = utils.commaInteger(availableScore || 0),
            deductionScore = utils.commaInteger(deductionScore || 0);
            var deductionAmountString = utils.commaNormal(deductionAmount)
              , isDeduction = this.state.isDeduction
              , totalAmount = React.createElement("span", {
                className: "total-amount"
            }, deductionAmountString + "元")
              , pointsText = "共" + availableScore + "，使用" + deductionScore + "抵扣" + deductionAmountString + "元"
              , checkedDom = React.createElement("span", {
                onClick: this.setDeduction,
                className: "points-input Punchecked icon-we-yuanquan"
            });
            isDeduction && (checkedDom = React.createElement("span", {
                onClick: this.setDeduction,
                className: "points-input Pchecked icon-we-xuanzhong"
            })),
            0 >= deductionAmount && (pointsText = "共" + availableScore + "，使用100可抵扣1元",
            checkedDom = React.createElement("span", {
                className: "points-input Punchecked disabled"
            }));
            var tooltipProps = {
                id: "product-uplan-tooltip-01",
                place: "right",
                tip: " 1、100积分可抵扣1元人民币，抵现时使用积分为100的整数倍。<br/>2、单笔最多用积分抵扣出借金额的1%。<br/>3、出借优选、U享（服务期限≥12个月）时可用。",
                delayHide: 100
            };
            return React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "积分抵扣", React.createElement(RWETooltip, tooltipProps)), React.createElement("span", {
                className: "value points-value"
            }, checkedDom, totalAmount, React.createElement("span", {
                className: "total-points"
            }, pointsText)))
        }
        ,
        RProductUplanJoinDialog.prototype.createExpectedReturnDom = function(expectedReturn, shortAmount) {
            void 0 === expectedReturn && (expectedReturn = 0);
            var _state = this.state
              , isDeduction = _state.isDeduction
              , couponTypeEng = _state.couponTypeEng
              , couponValue = _state.couponValue
              , couponId = _state.couponId
              , incrInterestDays = _state.incrInterestDays
              , _ref2 = this.props || {}
              , deductionData = _ref2.deductionData
              , deductionVal = 0;
            if (isDeduction) {
                var deductionAmount = deductionData.deductionAmount;
                deductionVal = parseFloat(deductionAmount)
            }
            var couponVal = 0;
            couponId && (("DISCOUNT" == couponTypeEng || "VOUCHER" == couponTypeEng) && (couponVal = parseFloat(couponValue)),
            "EXTRA_INTEREST" == couponTypeEng && incrInterestDays && (couponVal = parseFloat(shortAmount))),
            expectedReturn = parseInt(100 * expectedReturn) / 100;
            var amount = utils.commaNormal(expectedReturn + deductionVal + couponVal);
            expectedReturn = utils.commaNormal(expectedReturn),
            couponVal = utils.commaNormal(couponVal);
            var deductionValString = utils.commaNormal(deductionVal)
              , showText = "扣费后利息" + expectedReturn + "元";
            couponVal && (showText += "+优惠券" + couponVal + "元"),
            deductionVal && (showText += "+积分抵扣" + deductionValString + "元"),
            showText += "（仅供参考）";
            var expectedText = React.createElement("i", {
                className: "expected-text"
            }, showText);
            return React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "预估收入"), React.createElement("span", {
                className: "value orange-highlight"
            }, amount + "元", expectedText))
        }
        ,
        RProductUplanJoinDialog.prototype.render = function() {
            var props = this.props
              , state = this.state
              , cashType = "RRD"
              , cashLoanType = "INVEST"
              , couponList = state.couponList
              , isFirstRender = state.isFirstRender
              , detailInfo = props.detailInfo
              , inputValue = props.inputValue
              , ucodeId = (props.riskInfo,
            props.ucodeId)
              , financePlan = detailInfo.financePlan
              , compoundInterest = detailInfo.compoundInterest
              , avaliablePoint = detailInfo.avaliablePoint
              , nodePayInfo = detailInfo.nodePayInfo
              , lockStartTime = detailInfo.lockStartTime
              , reserveStatus = financePlan.reserveStatus
              , name = financePlan.name
              , id = financePlan.id
              , category = financePlan.category
              , contractHref = "/p2p/contract/finance?id=" + id
              , yearRateDom = null
              , expectedRate = financePlan.expectedRate;
            yearRateDom = "OLD" != category ? compoundInterest : expectedRate;
            var lockPeriod = financePlan.lockPeriod
              , cOptions = this.getCouponOptions(couponList)
              , couponId = state.couponId || 0 == state.couponId ? state.couponId : cOptions[0].value
              , isChecked = state.checked
              , buyInRate = financePlan.buyInRate
              , preBuyAllMoney = uplanUtils.getPayAmount(inputValue, buyInRate)
              , preBuyAllMoneyEnd = preBuyAllMoney
              , rateEnd = yearRateDom + "%"
              , expectedReturn = 0
              , simpleInterest = financePlan.expectedRateUplan
              , isShowDiscount = !1
              , discount = 0
              , shortRateAmount = 0
              , result = null
              , paramsData = {
                couponList: couponList,
                rateEnd: rateEnd,
                preBuyAllMoney: preBuyAllMoney,
                preBuyAllMoneyEnd: preBuyAllMoneyEnd,
                cashType: cashType,
                compoundInterest: compoundInterest,
                simpleInterest: simpleInterest,
                lockPeriod: lockPeriod,
                lockStartTime: lockStartTime,
                couponId: couponId
            };
            result = isFirstRender ? uplanUtils.getPremiumDeductionData(paramsData) : this.getPremiumSelectChange(paramsData),
            result && result.rateEnd && (rateEnd = result.rateEnd,
            expectedReturn = result.expectedReturn || 0,
            preBuyAllMoney = null != result.preBuyAllMoneyEnd ? result.preBuyAllMoneyEnd : preBuyAllMoneyEnd,
            isShowDiscount = result.isShowDiscount,
            shortRateAmount = result.shortRateAmount,
            discount = result.discount);
            var deductionAmount = 0;
            if (state.isDeduction) {
                var pointsAmount = props.deductionData || {};
                deductionAmount = parseFloat(pointsAmount.deductionAmount) || 0,
                preBuyAllMoney = deductionAmount > 0 ? preBuyAllMoney - deductionAmount : preBuyAllMoney
            }
            preBuyAllMoneyEnd = utils.commaNormal(preBuyAllMoney);
            var inputValueF = inputValue ? utils.commaInteger(inputValue) : 0
              , formProps = {
                action: "/uplan/product/planBuy",
                method: "POST",
                id: "product-uplan-join-form"
            }
              , dialogProps = {
                showing: !0,
                title: -1 != reserveStatus ? "确认预约出借" : "授权出借",
                dialog: {
                    className: "product-uplan-dialog product-uplan-join-dialog",
                    style: {
                        width: 700
                    }
                },
                onRequestClose: props.onRequestClose
            }
              , disCountDom = isShowDiscount ? React.createElement("div", {
                className: "discount-tips"
            }, "本次出借可抵扣", discount, "元") : null
              , joinBtnProps = {
                className: "j-btn  j-btn-super-big "
            };
            state.isLoading ? (joinBtnProps.className += " j-btn-disabled ",
            joinBtnProps.text = -1 != reserveStatus ? "预约出借中" : "授权出借中") : (joinBtnProps.className += " j-btn-orange ",
            joinBtnProps.text = -1 != reserveStatus ? "预约出借" : "授权出借");
            var btnDom = React.createElement("input", {
                className: joinBtnProps.className,
                type: "submit",
                value: joinBtnProps.text
            })
              , noticeClassName = "notice-con notice-con-mt40"
              , rechargeDom = null
              , riskDom = null
              , rechargeValue = numeral(avaliablePoint).subtract(preBuyAllMoney) < 0 ? !0 : !1;
            if (rechargeValue)
                rechargeDom = React.createElement("span", {
                    className: "recharge"
                }, React.createElement("em", {
                    className: "orange"
                }, "您的余额不足"), React.createElement("a", {
                    href: "/user/trade/recharge"
                }, "充值")),
                btnDom = React.createElement("div", {
                    className: "j-btn  j-btn-super-big  j-btn-disabled"
                }, joinBtnProps.text);
            else if (nodePayInfo) {
                var bindStatus = nodePayInfo.bindStatus;
                (0 == bindStatus || 3 == bindStatus) && (btnDom = React.createElement("div", {
                    className: "j-btn  j-btn-super-big  j-btn-orange",
                    onClick: this.jumpToBindCard
                }, joinBtnProps.text))
            }
            var deductionPointDom = this.renderDeductionPointDom()
              , expectedReturnDom = this.createExpectedReturnDom(expectedReturn, shortRateAmount);
            return React.createElement(RDialog, dialogProps, React.createElement("div", {
                className: "product-uplan-body join-preminum-body"
            }, React.createElement(RForm, _extends({}, formProps, {
                onSubmit: this.doJoin
            }), React.createElement("input", {
                type: "hidden",
                name: "financePlanId",
                value: id,
                readOnly: !0
            }), React.createElement("input", {
                type: "hidden",
                name: "cashType",
                value: cashLoanType,
                readOnly: !0
            }), React.createElement("input", {
                type: "hidden",
                name: "amount",
                value: inputValue,
                readOnly: !0
            }), React.createElement("input", {
                type: "hidden",
                name: "couponId",
                value: couponId,
                readOnly: !0
            }), React.createElement("input", {
                type: "hidden",
                name: "preminum",
                value: "preminum",
                readOnly: !0
            }), React.createElement("input", {
                type: "hidden",
                name: "ucodeId",
                value: ucodeId,
                readOnly: !0
            }), React.createElement("input", {
                type: "hidden",
                name: "scoreAmount",
                value: deductionAmount,
                readOnly: !0
            }), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "服务期数"), React.createElement("span", {
                className: "value orange-highlight"
            }, name)), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "扣费后年利率"), React.createElement("span", {
                className: "value orange-highlight"
            }, rateEnd)), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "授权出借本金"), React.createElement("span", {
                className: "value orange-highlight"
            }, inputValueF, "元")), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "利息处理方式"), React.createElement("span", {
                className: "value orange-highlight"
            }, "循环出借")), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "优惠券"), React.createElement("div", {
                className: "value-width-3"
            }, React.createElement(RCoupon, {
                cOptions: cOptions,
                selectCouponChange: this.selectCouponChange,
                couponId: couponId
            }), disCountDom)), deductionPointDom, expectedReturnDom, React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "应付金额"), React.createElement("span", {
                className: "value w110"
            }, React.createElement("em", {
                className: "orange"
            }, preBuyAllMoneyEnd, "元")), rechargeDom), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("div", {
                className: "uplan-agreement w540"
            }, React.createElement("div", null, React.createElement("span", {
                className: isChecked ? "agreement-check-img icon-we-gouxuanicon" : "agreement-check-img icon-we-weigouxuanicon",
                onClick: this.checkAgree
            }), React.createElement("span", {
                className: "agreement-desc"
            }, "我已阅读并同意签署", React.createElement("a", {
                href: contractHref,
                target: "_blank"
            }, "《优选服务协议》"), "、", React.createElement("a", {
                href: "https://www.renrendai.com/agreement/user/currency/cmsId/5a9111a116338128d205759a",
                target: "_blank"
            }, "《借款协议（范本）》"), "及 ", React.createElement("a", {
                href: "https://www.renrendai.com/agreement/user/currency/cmsId/5a9122191c9f2a1008c653cb",
                target: "_blank"
            }, "《债权转让及受让协议（范本）》"), "， 已确认", React.createElement("a", {
                href: "https://www.renrendai.com/agreement/contract/currency/cmsId/5bb06ea3e141322c89974537",
                target: "_blank"
            }, "《风险揭示书》"))))), React.createElement("div", {
                className: "error-msg"
            }, state.errorMsg), React.createElement("div", {
                className: "ui-confirm-submit-box  mt10 text-center"
            }, btnDom), riskDom, React.createElement("div", {
                className: noticeClassName
            }, React.createElement("div", {
                className: "notice-title"
            }, "温馨提示"), React.createElement("ul", {
                className: "notice-desc "
            }, React.createElement("li", null, "1.兑换优惠券，可点击以下链接", React.createElement("a", {
                href: "/user/privilege#privilege-my-coupon"
            }, "兑换优惠券"), "。"), React.createElement("li", null, "2. 按扣费后年利率计算的利息不代表对实际获得利息的承诺，网贷有风险，出借需谨慎，出借人风险自担。"))))))
        }
        ,
        RProductUplanJoinDialog
    }(React.Component);
    module.exports = RProductUplanJoinDialog
});
;/*!/client/widget/product/detail/RReserveCoupon/RReserveCoupon.js*/
define("uplan:widget/product/detail/RReserveCoupon/RReserveCoupon.js", function(require, exports, module) {
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
      , RSelect = require("common:widget/react-ui/RSelect/RSelect")
      , RCoupon = (require("common:widget/ui/utils/utils"),
    function(_React$Component) {
        function RCoupon(props) {
            _classCallCheck(this, RCoupon),
            _React$Component.call(this, props)
        }
        return _inherits(RCoupon, _React$Component),
        RCoupon.prototype.render = function() {
            var props = this.props
              , cOptions = (this.state,
            props.cOptions)
              , couponId = props.couponId
              , couponOptions = {
                options: cOptions,
                className: "product-uplan-rcoupon-select",
                selectDefaultValue: couponId,
                noResultsText: "无可用预约券",
                selectChange: props.selectCouponChange
            };
            return React.createElement(RSelect, couponOptions)
        }
        ,
        RCoupon
    }(React.Component));
    module.exports = RCoupon
});
;/*!/client/widget/product/detail/RProductUplanDetailStatusForm/RProductUplanDetailStatusForm.js*/
define("uplan:widget/product/detail/RProductUplanDetailStatusForm/RProductUplanDetailStatusForm.js", function(require, exports, module) {
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
      , moment = require("common:node_modules/moment/moment")
      , numeral = require("common:node_modules/numeral/numeral")
      , utils = require("common:widget/ui/utils/utils")
      , $statistic = require("common:node_modules/glpb-components-common/src/index").weStatistic
      , service = require("common:widget/ui/service/service-factory")
      , uplanService = service.getService("uplan")
      , p2pService = service.getService("p2p")
      , RWeStatusDialog = (require("common:widget/react-ui/RForm/RForm"),
    require("common:widget/react-ui/RWeStatusDialog/RWeStatusDialog"))
      , RWeOpenAccount = require("common:widget/react-ui/ROpenAccount/ROpenAccount")
      , RReserveBtncountDown = require("uplan:widget/product/detail/RReserveBtncountDown/RReserveBtncountDown")
      , RProductUplanJoinDialog = require("uplan:widget/product/detail/RProductUplanJoinDialog/RProductUplanJoinDialog")
      , RProductUplanPreminumJoinDialog = require("uplan:widget/product/detail/RProductUplanPreminumJoinDialog/RProductUplanPreminumJoinDialog")
      , RReserveCoupon = require("uplan:widget/product/detail/RReserveCoupon/RReserveCoupon")
      , InvestDialog = require("common:widget/ui/investDialog/investDialog")
      , RProductUplanDetailStatusForm = function(_React$Component) {
        function RProductUplanDetailStatusForm(props) {
            _classCallCheck(this, RProductUplanDetailStatusForm),
            _React$Component.call(this, props);
            var buyResult = this.props.buyResult
              , show = buyResult ? !0 : !1;
            this.state = {
                errorMessage: "",
                inputValue: "",
                showDialog: !1,
                isLoading: !1,
                showCommonDialog: show,
                showRiskCommonDialog: !1,
                showRiskCommonDialogType: -1,
                showRiskCommonDialogResult: null,
                couponId: null,
                couponValue: null,
                couponTypeEng: null,
                maxInvestAmount: null,
                minInvestAmount: null,
                reserveAmountTopLimit: null,
                reserveAmountBottomLimit: null,
                couponList: null,
                uplanProductInfoStatusFormClassName: "uplan-product-info-status-form pt40",
                isFirstRender: !0,
                deductionData: null
            },
            this.closeCommonDialog = this.closeCommonDialog.bind(this),
            this.closeRiskCommonDialog = this.closeRiskCommonDialog.bind(this),
            this.closeDialog = this.closeDialog.bind(this),
            this.handleResult = this.handleResult.bind(this),
            this.handleChange = this.handleChange.bind(this),
            this.joinUplan = this.joinUplan.bind(this),
            this.selectRCouponChange = this.selectRCouponChange.bind(this),
            this.getRCouponOptions = this.getRCouponOptions.bind(this),
            this.jumpToRisk = this.jumpToRisk.bind(this),
            this.jumpToRiskAgain = this.jumpToRiskAgain.bind(this)
        }
        return _inherits(RProductUplanDetailStatusForm, _React$Component),
        RProductUplanDetailStatusForm.prototype.componentWillMount = function() {
            var _props = this.props
              , detailInfo = _props.detailInfo
              , isLogin = _props.isLogin
              , couponVo = detailInfo.couponVo
              , financePlan = detailInfo.financePlan
              , reserveStatus = financePlan.reserveStatus;
            couponVo && this.setState({
                inputValue: couponVo.value
            }),
            -1 != reserveStatus && isLogin && this.getRCouponList()
        }
        ,
        RProductUplanDetailStatusForm.prototype.getRCouponList = function() {
            var _this = this;
            this.setState({
                uplanProductInfoStatusFormClassName: "uplan-product-info-status-form pt20 pb20"
            });
            var businessCategory = ""
              , props = this.props
              , detailInfo = (this.state,
            props.detailInfo)
              , financePlan = detailInfo.financePlan
              , financePlanSubPointId = detailInfo.financePlanSubPointId
              , joinAmount = detailInfo.joinAmount
              , reserveAmount = financePlan.reserveAmount
              , reserveLeftAmount = numeral(reserveAmount).subtract(joinAmount).value()
              , singleMaxRegisterAmount = financePlan.singleMaxRegisterAmount
              , businessId = financePlan.id
              , businessName = financePlan.name
              , lockPeriod = financePlan.lockPeriod
              , uplanType = financePlan.financePlanType
              , minRegisterAmount = financePlan.minRegisterAmount
              , novice = financePlan.novice;
            businessCategory = "PREMIUM" == uplanType ? null == financePlanSubPointId ? "PREMIUM" : "PREMIUM_CONTINUE" : 1 == novice ? "U_NEW" : null == financePlanSubPointId ? "UPLAN" : "U_PLAN_CONTINUE",
            uplanService.getReserveCouponList({
                businessCategory: businessCategory,
                businessId: businessId,
                businessName: businessName,
                lockPeriod: lockPeriod,
                uplanType: uplanType,
                minRegisterAmount: minRegisterAmount,
                reserveLeftAmount: reserveLeftAmount,
                singleMaxRegisterAmount: singleMaxRegisterAmount
            }).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                if (requestStatus === uplanService.STATUS.SUCCESS && 0 === status) {
                    var couponList = data.data;
                    if (couponList && couponList.length > 0) {
                        var couponVo = couponList[0]
                          , _getReserveInputRange = _this.getReserveInputRange(couponVo)
                          , maxInvestAmount = _getReserveInputRange.maxInvestAmount
                          , minInvestAmount = _getReserveInputRange.minInvestAmount
                          , reserveAmountTopLimit = _getReserveInputRange.reserveAmountTopLimit
                          , reserveAmountBottomLimit = _getReserveInputRange.reserveAmountBottomLimit;
                        _this.setState({
                            couponList: couponList,
                            couponId: couponVo.couponId,
                            couponValue: couponVo.couponValue,
                            couponTypeEng: couponVo.couponTypeEng,
                            maxInvestAmount: maxInvestAmount,
                            minInvestAmount: minInvestAmount,
                            inputValue: reserveAmountTopLimit,
                            reserveAmountTopLimit: reserveAmountTopLimit,
                            reserveAmountBottomLimit: reserveAmountBottomLimit
                        })
                    } else
                        _this.setState({
                            reserveAmountTopLimit: reserveAmount,
                            reserveAmountBottomLimit: minRegisterAmount
                        })
                } else {
                    var message = data.message || "请求后端服务出错, 请稍后再试";
                    console.log("请求预约券列表出错：" + message)
                }
            })["catch"](function(msg) {
                console.log("请求预约券列表出错：" + msg)
            })
        }
        ,
        RProductUplanDetailStatusForm.prototype.getReserveAmountBottomLimit = function(minRegisterAmount, minInvestAmount) {
            var reserveAmountBottomLimit = minRegisterAmount > minInvestAmount ? minRegisterAmount : minInvestAmount;
            return reserveAmountBottomLimit
        }
        ,
        RProductUplanDetailStatusForm.prototype.getReserveAmountTopLimit = function(reserveLeftAmount, maxInvestAmount, singleMaxRegisterAmount) {
            var reserveAmountTopLimit = Math.min(reserveLeftAmount, maxInvestAmount, singleMaxRegisterAmount);
            return reserveAmountTopLimit = parseInt(reserveAmountTopLimit)
        }
        ,
        RProductUplanDetailStatusForm.prototype.getReserveInputRange = function(item) {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlan = detailInfo.financePlan
              , joinAmount = detailInfo.joinAmount
              , reserveAmount = financePlan.reserveAmount
              , reserveLeftAmount = joinAmount >= 0 ? numeral(reserveAmount).subtract(joinAmount).value() : reserveAmount
              , singleMaxRegisterAmount = financePlan.singleMaxRegisterAmount
              , minRegisterAmount = financePlan.minRegisterAmount ? parseInt(financePlan.minRegisterAmount) : financePlan.minRegisterAmount
              , maxInvestAmount = item.maxInvestAmount ? parseInt(item.maxInvestAmount) : item.maxInvestAmount
              , minInvestAmount = item.minInvestAmount ? parseInt(item.minInvestAmount) : item.minInvestAmount
              , reserveAmountTopLimit = this.getReserveAmountTopLimit(reserveLeftAmount, maxInvestAmount, singleMaxRegisterAmount)
              , reserveAmountBottomLimit = this.getReserveAmountBottomLimit(minRegisterAmount, minInvestAmount);
            return {
                maxInvestAmount: maxInvestAmount,
                minInvestAmount: minInvestAmount,
                reserveAmountTopLimit: reserveAmountTopLimit,
                reserveAmountBottomLimit: reserveAmountBottomLimit
            }
        }
        ,
        RProductUplanDetailStatusForm.prototype.closeDialog = function() {
            {
                var detailInfo = this.props.detailInfo;
                detailInfo.planStatus
            }
            this.setState({
                showDialog: !1,
                inputValue: ""
            })
        }
        ,
        RProductUplanDetailStatusForm.prototype.handleResult = function(data) {
            var status = data.status
              , message = data.message;
            this.setState({
                showDialog: !1,
                showRiskCommonDialog: !1,
                showCommonDialog: !0,
                commonStatus: status,
                commonMessage: message,
                dialogType: -1,
                couponList: null
            })
        }
        ,
        RProductUplanDetailStatusForm.prototype.renderDialog = function() {
            var content = null
              , ucodeId = null
              , props = this.props
              , state = this.state;
            if (!state.showDialog)
                return content;
            var inputValue = state.inputValue
              , dialogType = state.dialogType
              , detailInfo = props.detailInfo
              , riskInfo = props.riskInfo
              , financePlan = (detailInfo.couponVo,
            detailInfo.planStatus,
            detailInfo.financePlan)
              , reserveStatus = financePlan.reserveStatus;
            -1 != reserveStatus && (ucodeId = state.couponId);
            var dialogProps = $.extend({}, props, {
                detailInfo: detailInfo,
                riskInfo: riskInfo,
                ucodeId: ucodeId,
                inputValue: inputValue,
                onRequestClose: this.closeDialog,
                handleResult: this.handleResult,
                couponList: state.couponList,
                deductionData: state.deductionData
            });
            switch (dialogType) {
            case 0:
                content = React.createElement(RProductUplanJoinDialog, dialogProps);
                break;
            case 1:
                content = React.createElement(RProductUplanPreminumJoinDialog, dialogProps)
            }
            return content
        }
        ,
        RProductUplanDetailStatusForm.prototype.jumpToRisk = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlan = detailInfo.financePlan
              , id = financePlan.id;
            location.href = "/user/risk/riskPc?type=uplan&id=" + id
        }
        ,
        RProductUplanDetailStatusForm.prototype.jumpToRiskAgain = function() {
            this.jumpToRisk(),
            $statistic.eventRaw({
                eventId: "click_join_money_limit_remeaure_word"
            })
        }
        ,
        RProductUplanDetailStatusForm.prototype.renderCommonDialog = function() {
            var showCommonDialog = this.state.showCommonDialog
              , buyResult = this.props.buyResult
              , content = React.createElement(RWeOpenAccount, {
                onRequestClose: this.closeCommonDialog
            });
            if (buyResult) {
                var dialogProps = $.extend({}, {
                    onRequestClose: this.closeCommonDialog,
                    status: -99999,
                    message: buyResult.message
                });
                content = React.createElement(RWeStatusDialog, dialogProps)
            }
            return showCommonDialog ? content : null
        }
        ,
        RProductUplanDetailStatusForm.prototype.renderRiskCommonDialog = function() {
            var _state = this.state
              , showRiskCommonDialogType = _state.showRiskCommonDialogType
              , showRiskCommonDialog = _state.showRiskCommonDialog
              , showRiskCommonDialogResult = _state.showRiskCommonDialogResult
              , conentDom = null
              , buttons = null;
            0 == showRiskCommonDialogType ? (conentDom = React.createElement("div", null, "授权出借前需完成风险测评"),
            buttons = [{
                text: "我知道了",
                event: this.closeRiskCommonDialog,
                skin: "white"
            }, {
                text: "去测评",
                event: this.jumpToRisk,
                skin: "orange"
            }]) : 1 == showRiskCommonDialogType ? (conentDom = React.createElement("div", null, "您的风险等级为", React.createElement("em", {
                className: "text-orange-color"
            }, showRiskCommonDialogResult.currentRiskLevel), "，达到", React.createElement("em", {
                className: "text-orange-color"
            }, showRiskCommonDialogResult.nextRiskLevel), "才可出借此项目"),
            buttons = [{
                text: "我知道了",
                event: this.closeRiskCommonDialog,
                skin: "white"
            }, {
                text: "重新测评",
                event: this.jumpToRiskAgain,
                skin: "orange"
            }]) : 2 == showRiskCommonDialogType && (conentDom = React.createElement("div", null, "您当前在平台的出借本金已超出您的风险承受能力，为了您的资金安全，您将不能继续在平台出借。"),
            buttons = [{
                text: "我知道了",
                event: this.closeRiskCommonDialog,
                skin: "orange"
            }]);
            var dialogProps = $.extend({}, {
                onRequestClose: this.closeRiskCommonDialog,
                buttons: buttons,
                status: -99999,
                message: conentDom || "网络异常，请稍后再试"
            });
            return showRiskCommonDialog ? React.createElement(RWeStatusDialog, dialogProps) : null
        }
        ,
        RProductUplanDetailStatusForm.prototype.closeCommonDialog = function() {
            this.setState({
                showCommonDialog: !1
            })
        }
        ,
        RProductUplanDetailStatusForm.prototype.closeRiskCommonDialog = function() {
            this.setState({
                showRiskCommonDialog: !1
            })
        }
        ,
        RProductUplanDetailStatusForm.prototype._validateMultiple = function(value) {
            var isCanJoin = !0
              , errorMessage = ""
              , _props2 = this.props
              , detailInfo = _props2.detailInfo
              , financePlan = (_props2.isLogin,
            detailInfo.financePlan)
              , reserveStatus = (detailInfo.authErrorCode,
            financePlan.reserveStatus)
              , amountMinRegShare = financePlan.minRegisterAmount
              , amountMinRegShareF = utils.commaInteger(amountMinRegShare)
              , amountPerShare = financePlan.registerMultipleAmount
              , amountPerShareF = utils.commaInteger(amountPerShare);
            amountMinRegShare != amountPerShare ? amountMinRegShare > value ? -1 == reserveStatus && (errorMessage = "输入金额需大于" + amountMinRegShareF + "元",
            isCanJoin = !1) : value != amountMinRegShare && (value - amountMinRegShare) % amountPerShare !== 0 && (errorMessage = "递增金额需为" + amountPerShareF + "元的整数倍",
            isCanJoin = !1) : value % amountPerShare !== 0 && (errorMessage = "输入金额需为" + amountPerShareF + "元的整数倍",
            isCanJoin = !1);
            var financeLeftAmount = detailInfo.financeLeftAmount
              , financeLeftAmountString = utils.commaInteger(financeLeftAmount);
            value > financeLeftAmount && (errorMessage = "剩余可出借金额" + financeLeftAmountString + "元",
            isCanJoin = !1);
            var singleMaxRegisterAmount = financePlan.singleMaxRegisterAmount
              , singleMaxRegisterAmountString = utils.commaInteger(singleMaxRegisterAmount);
            return value > singleMaxRegisterAmount && (errorMessage = "单笔可出借金额为" + singleMaxRegisterAmountString + "元",
            isCanJoin = !1),
            {
                errorMessage: errorMessage,
                isCanJoin: isCanJoin
            }
        }
        ,
        RProductUplanDetailStatusForm.prototype.vlidateReserve = function(value, uplanProductInfoStatusFormClassName) {
            var isCanJoin = !0
              , errorMessage = ""
              , state = this.state
              , detailInfo = this.props.detailInfo
              , financePlan = detailInfo.financePlan
              , reserveStatus = financePlan.reserveStatus;
            if (reserveStatus > -1 && state.couponList && state.couponList.length > 0) {
                var reserveAmountBottomLimit = state.reserveAmountBottomLimit
                  , reserveAmountTopLimit = state.reserveAmountTopLimit;
                if (reserveAmountBottomLimit > value || value > reserveAmountTopLimit)
                    if (reserveAmountBottomLimit == reserveAmountTopLimit)
                        errorMessage = "请输入" + reserveAmountBottomLimit + "元",
                        isCanJoin = !1;
                    else {
                        var reserveAmountBottomLimitF = reserveAmountBottomLimit ? utils.commaInteger(reserveAmountBottomLimit) : reserveAmountBottomLimit
                          , reserveAmountTopLimitF = reserveAmountTopLimit ? utils.commaInteger(reserveAmountTopLimit) : reserveAmountTopLimit;
                        errorMessage = "输入金额需在" + reserveAmountBottomLimitF + "元~" + reserveAmountTopLimitF + "元范围内",
                        isCanJoin = !1
                    }
            }
            return {
                errorMessage: errorMessage,
                isCanJoin: isCanJoin,
                uplanProductInfoStatusFormClassName: uplanProductInfoStatusFormClassName
            }
        }
        ,
        RProductUplanDetailStatusForm.prototype.riskValidate = function(isRisk, money) {
            var _this2 = this;
            isRisk ? p2pService.checkRiskLimit({
                amount: money
            }).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status
                  , message = data.message;
                if (requestStatus === uplanService.STATUS.SUCCESS && 0 === status)
                    _this2.openBuyDialog(money);
                else if (80029 == status)
                    _this2.setState({
                        showDialog: !1,
                        showCommonDialog: !1,
                        showRiskCommonDialog: !0,
                        showRiskCommonDialogType: 1,
                        showRiskCommonDialogResult: data.data
                    });
                else {
                    if (80030 != status)
                        return Promise.reject(message);
                    _this2.setState({
                        showDialog: !1,
                        showCommonDialog: !1,
                        showRiskCommonDialog: !0,
                        showRiskCommonDialogType: 2
                    })
                }
            })["catch"](function(msg) {
                console.log("请求判断是否超过风评限额出错：" + msg),
                _this2.setState({
                    showDialog: !1,
                    showCommonDialog: !1,
                    showRiskCommonDialog: !0,
                    showRiskCommonDialogType: -1
                })
            }) : this.setState({
                showDialog: !1,
                showCommonDialog: !1,
                showRiskCommonDialog: !0,
                showRiskCommonDialogType: 0
            })
        }
        ,
        RProductUplanDetailStatusForm.prototype.joinUplan = function(e) {
            var _this3 = this
              , state = this.state
              , _props3 = this.props
              , detailInfo = _props3.detailInfo
              , isLogin = _props3.isLogin
              , riskInfo = _props3.riskInfo
              , financePlan = detailInfo.financePlan
              , hasCreateAccount = detailInfo.hasCreateAccount
              , reserveStatus = financePlan.reserveStatus
              , target = e.currentTarget
              , disable = $(target).hasClass("disable")
              , money = (this.state.inputValue || "") + "";
            if (disable)
                return !1;
            var amountPerShare = financePlan.registerMultipleAmount
              , amountPerShareF = amountPerShare ? utils.commaInteger(amountPerShare) : "0";
            if (money.indexOf(" ") >= 0)
                return this.setState({
                    errorMessage: "请输入正确的金额"
                }),
                !1;
            if (!money || 0 === parseInt(money, 10))
                return this.setState({
                    errorMessage: "输入金额需为" + amountPerShareF + "元的整数倍"
                }),
                !1;
            if (reserveStatus > -1 && state.couponList && state.couponList.length > 0) {
                var errorMessage = ""
                  , isCanJoin = !0
                  , uplanProductInfoStatusFormClassName = state.uplanProductInfoStatusFormClassName;
                if (-1 != reserveStatus) {
                    var reserveResult = this.vlidateReserve(money, uplanProductInfoStatusFormClassName);
                    errorMessage = reserveResult.errorMessage,
                    isCanJoin = reserveResult.isCanJoin
                }
                if (isCanJoin) {
                    var errorResult = this._validateMultiple(money);
                    errorMessage = errorResult.errorMessage,
                    isCanJoin = errorResult.isCanJoin
                }
                if (!isCanJoin)
                    return this.setState({
                        errorMessage: errorMessage
                    }),
                    !1
            }
            if (!isLogin)
                return location.replace("/login"),
                !1;
            if (!hasCreateAccount)
                return this.setState({
                    showDialog: !1,
                    showRiskCommonDialog: !1,
                    showCommonDialog: !0
                }),
                !1;
            var switcher = !1;
            $.ajax({
                url: "/autoinvest/product/riskSwitchStatus",
                type: "post",
                dataType: "json",
                async: !1,
                success: function(res) {
                    0 === res.status && (switcher = res.data.display)
                },
                timeout: 2e3
            }),
            switcher ? new InvestDialog({
                type: "RISK",
                id: "risk",
                submitCallback: function() {
                    _this3.riskInfoDialog(riskInfo, money)
                }
            }).show() : this.riskInfoDialog(riskInfo, money)
        }
        ,
        RProductUplanDetailStatusForm.prototype.riskInfoDialog = function(riskInfo, money) {
            var riskFlag = riskInfo.riskFlag
              , isRisk = riskInfo.isRisk;
            riskFlag ? this.riskValidate(isRisk, money) : this.openBuyDialog(money)
        }
        ,
        RProductUplanDetailStatusForm.prototype.getDeductionPoints = function(amount) {
            var _this4 = this
              , detailInfo = this.props.detailInfo
              , financePlan = detailInfo.financePlan
              , lockPeriod = financePlan.lockPeriod
              , financePlanType = financePlan.financePlanType
              , isDeductionPoints = lockPeriod >= 12 ? !0 : !1;
            "PREMIUM" == financePlanType && (isDeductionPoints = !0);
            var deductionData = {}
              , query = {
                amount: amount
            };
            isDeductionPoints && $.ajax({
                url: "/uplan/user/queryUserDeduction",
                type: "post",
                data: query,
                dataType: "json",
                success: function(res) {
                    0 === res.status && (deductionData = res.data,
                    _this4.setState({
                        deductionData: deductionData
                    }))
                },
                timeout: 2e3
            })
        }
        ,
        RProductUplanDetailStatusForm.prototype.openBuyDialog = function(amount) {
            this.getDeductionPoints(amount);
            var dialogType = 0
              , detailInfo = this.props.detailInfo
              , financePlan = detailInfo.financePlan
              , financePlanType = financePlan.financePlanType;
            "PREMIUM" == financePlanType && (dialogType = 1),
            this.setState({
                showDialog: !0,
                dialogType: dialogType
            })
        }
        ,
        RProductUplanDetailStatusForm.prototype.handleChange = function(e) {
            var state = this.state
              , isCanJoin = !0
              , errorMessage = ""
              , uplanProductInfoStatusFormClassName = state.uplanProductInfoStatusFormClassName
              , _props4 = this.props
              , detailInfo = _props4.detailInfo
              , financePlan = (_props4.isLogin,
            detailInfo.financePlan)
              , reserveStatus = financePlan.reserveStatus
              , target = e.target
              , value = target.value;
            if (value = isNaN(value) ? state.inputValue : value,
            value > 0) {
                if (reserveStatus > -1 && state.couponList && state.couponList.length > 0) {
                    var reserveResult = this.vlidateReserve(value, uplanProductInfoStatusFormClassName);
                    errorMessage = reserveResult.errorMessage,
                    isCanJoin = reserveResult.isCanJoin,
                    uplanProductInfoStatusFormClassName = reserveResult.uplanProductInfoStatusFormClassName
                }
                if (isCanJoin) {
                    var errorResult = this._validateMultiple(value);
                    errorMessage = errorResult.errorMessage
                }
            }
            this.setState({
                uplanProductInfoStatusFormClassName: uplanProductInfoStatusFormClassName,
                errorMessage: errorMessage,
                inputValue: value
            })
        }
        ,
        RProductUplanDetailStatusForm.prototype.getRCouponOptions = function(couponList) {
            var options = [];
            return couponList ? couponList.forEach(function(item) {
                var name = item.name
                  , couponId = item.couponId;
                options.push({
                    value: couponId,
                    label: name
                })
            }) : options.push({
                value: -1,
                label: "无可用预约券"
            }),
            options
        }
        ,
        RProductUplanDetailStatusForm.prototype.selectRCouponChange = function(val) {
            var _this5 = this
              , couponId = null
              , couponValue = null
              , couponTypeEng = null
              , maxInvestAmount = null
              , minInvestAmount = null
              , reserveAmountBottomLimit = 0
              , reserveAmountTopLimit = 0
              , couponList = this.state.couponList;
            -1 != val && (couponList.forEach(function(item) {
                if (couponId = item.couponId,
                couponId == val) {
                    couponValue = item.couponValue,
                    couponTypeEng = item.couponTypeEng;
                    var rangeResult = _this5.getReserveInputRange(item);
                    return maxInvestAmount = rangeResult.maxInvestAmount,
                    minInvestAmount = rangeResult.minInvestAmount,
                    reserveAmountTopLimit = rangeResult.reserveAmountTopLimit,
                    void (reserveAmountBottomLimit = rangeResult.reserveAmountBottomLimit)
                }
            }),
            this.setState({
                couponId: val,
                couponValue: couponValue,
                maxInvestAmount: maxInvestAmount,
                minInvestAmount: minInvestAmount,
                reserveAmountTopLimit: reserveAmountTopLimit,
                reserveAmountBottomLimit: reserveAmountBottomLimit,
                isFirstRender: !1,
                errorMessage: "",
                isCanJoin: !0
            }))
        }
        ,
        RProductUplanDetailStatusForm.prototype.createFormDom = function() {
            var state = this.state
              , _props5 = this.props
              , detailInfo = _props5.detailInfo
              , isLogin = _props5.isLogin
              , financePlan = detailInfo.financePlan
              , financeLeftAmount = detailInfo.financeLeftAmount
              , avaliablePoint = detailInfo.avaliablePoint
              , financePlanSubPointId = detailInfo.financePlanSubPointId
              , isNovice = detailInfo.isNovice
              , joinAmount = (detailInfo.planStatus,
            detailInfo.joinAmount)
              , reserveTime = financePlan.reserveTime
              , reserveStatus = financePlan.reserveStatus
              , reserveNodeTime = financePlan.reserveNodeTime
              , reserveAmount = financePlan.reserveAmount;
            avaliablePoint = avaliablePoint ? utils.commaFloat(avaliablePoint) : "0.00";
            var remainMoneyDom = null;
            remainMoneyDom = isLogin ? React.createElement("div", {
                className: "able-money fn-clear"
            }, React.createElement("span", {
                className: "fn-left"
            }, "账户余额", React.createElement("em", {
                className: "pl6"
            }, avaliablePoint), "元"), React.createElement("a", {
                className: "fn-right",
                target: "_blank",
                href: "/user/trade/recharge"
            }, "充值")) : React.createElement("div", {
                className: "able-money"
            }, "账户余额", React.createElement("a", {
                href: "/login",
                className: "login-a"
            }, "登录"), "后可见");
            var inputBottomDom = null
              , reserveCouponDom = null
              , couponList = null;
            if (-1 != reserveStatus) {
                var joinTopLimitDom = null
                  , reserveLeftAmount = numeral(reserveAmount).subtract(joinAmount)
                  , reserveLeftAmountF = utils.commaInteger(reserveLeftAmount.value());
                if (isLogin) {
                    couponList = state.couponList;
                    var cOptions = this.getRCouponOptions(couponList)
                      , couponId = state.couponId || 0 == state.couponId ? state.couponId : cOptions[0].value;
                    if (reserveCouponDom = React.createElement(RReserveCoupon, {
                        cOptions: cOptions,
                        selectCouponChange: this.selectRCouponChange,
                        couponId: couponId
                    }),
                    couponList && couponList.length) {
                        var reserveAmountTopLimitF = utils.commaInteger(state.reserveAmountTopLimit);
                        joinTopLimitDom = React.createElement("li", {
                            className: "fn-right prop-box-top-limit"
                        }, "预约出借上限", React.createElement("span", {
                            className: "pl5"
                        }, reserveAmountTopLimitF, "元"))
                    }
                }
                inputBottomDom = React.createElement("ul", {
                    className: "fn-clear prop-box"
                }, React.createElement("li", {
                    className: "fn-left"
                }, "剩余预约金额", React.createElement("span", {
                    className: "pl5"
                }, reserveLeftAmountF, "元")), joinTopLimitDom)
            } else {
                var singleMaxRegisterAmount = financePlan.singleMaxRegisterAmount;
                singleMaxRegisterAmount = utils.commaInteger(singleMaxRegisterAmount),
                financeLeftAmount = utils.commaInteger(financeLeftAmount),
                inputBottomDom = React.createElement("ul", {
                    className: "fn-clear prop-box"
                }, React.createElement("li", {
                    className: "fn-left"
                }, "剩余金额", React.createElement("span", {
                    className: "pl5"
                }, financeLeftAmount, "元")), React.createElement("li", {
                    className: "fn-right prop-box-top-limit"
                }, "授权出借上限", React.createElement("span", {
                    className: "pl5"
                }, singleMaxRegisterAmount, "元")))
            }
            var minRegisterAmount = financePlan.minRegisterAmount
              , minRegisterAmountF = utils.commaInteger(minRegisterAmount)
              , registerMultipleAmount = financePlan.registerMultipleAmount
              , registerMultipleAmountF = utils.commaInteger(registerMultipleAmount)
              , placeholderDom = null;
            placeholderDom = minRegisterAmount == registerMultipleAmount ? "输入授权出借本金，为" + registerMultipleAmountF + "元的整数倍" : minRegisterAmountF + "元起投,递增金额" + registerMultipleAmountF + "元";
            var errorMessage = this.state.errorMessage
              , inputGroupClassName = errorMessage ? "uplan-input-group error" : "uplan-input-group"
              , errorMessageDOM = errorMessage ? React.createElement("div", {
                className: "error-message"
            }, errorMessage) : null
              , disableClassName = errorMessage ? " disable" : ""
              , inputDom = React.createElement("input", {
                type: "text",
                ref: "uplanJoin",
                name: "uplanJoin",
                className: "uplan-input",
                placeholder: placeholderDom,
                value: this.state.inputValue,
                onChange: this.handleChange,
                maxLength: 9
            })
              , btnDom = null;
            if (-1 != reserveStatus) {
                if (1 == reserveStatus) {
                    var reserveTimeF = moment(reserveTime).format("MM月DD日 HH:mm");
                    btnDom = React.createElement("div", {
                        className: "uplan-btn disable"
                    }, reserveTimeF, "开放预约")
                } else if (2 == reserveStatus)
                    reserveTime = reserveTime ? parseInt(reserveTime) : reserveTime,
                    btnDom = React.createElement(RReserveBtncountDown, {
                        reserveTime: reserveTime,
                        reserveNodeTime: reserveNodeTime
                    });
                else if (3 == reserveStatus) {
                    var _couponList = state.couponList;
                    btnDom = _couponList && _couponList.length > 0 || !isLogin ? React.createElement("div", {
                        className: "uplan-btn j-btn-orange" + disableClassName,
                        onClick: this.joinUplan
                    }, "预约出借") : React.createElement("div", {
                        className: "uplan-btn disable"
                    }, "预约出借")
                }
            } else {
                var novice = financePlan.novice;
                btnDom = 1 == novice ? 1 == isNovice ? React.createElement("div", {
                    className: "uplan-btn j-btn-orange" + disableClassName,
                    onClick: this.joinUplan
                }, "授权出借") : React.createElement("div", {
                    className: "uplan-btn disable"
                }, "授权出借") : React.createElement("div", {
                    className: "uplan-btn j-btn-orange" + disableClassName,
                    onClick: this.joinUplan
                }, null == financePlanSubPointId ? "授权出借" : "追加")
            }
            return React.createElement("div", {
                className: state.uplanProductInfoStatusFormClassName
            }, remainMoneyDom, React.createElement("div", {
                className: inputGroupClassName
            }, React.createElement("div", {
                className: "uplan-input-inner"
            }, inputDom, React.createElement("span", {
                className: "unit"
            }, "元")), errorMessageDOM), reserveCouponDom, inputBottomDom, btnDom)
        }
        ,
        RProductUplanDetailStatusForm.prototype.render = function() {
            var statusDom = (this.state.showCommonDialog,
            this.createFormDom())
              , dialogDom = this.renderDialog()
              , commomDialogDom = this.renderCommonDialog()
              , riskCommonDialogDom = this.renderRiskCommonDialog();
            return React.createElement("div", {
                className: "uplan-product-info-status fn-left"
            }, statusDom, dialogDom, commomDialogDom, riskCommonDialogDom)
        }
        ,
        RProductUplanDetailStatusForm
    }(React.Component);
    module.exports = RProductUplanDetailStatusForm
});
;/*!/client/widget/product/detail/RProductUplanDetailStatus/RProductUplanDetailStatus.js*/
define("uplan:widget/product/detail/RProductUplanDetailStatus/RProductUplanDetailStatus.js", function(require, exports, module) {
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
      , moment = require("common:node_modules/moment/moment")
      , utils = require("common:widget/ui/utils/utils")
      , RWeStatusDialog = require("common:widget/react-ui/RWeStatusDialog/RWeStatusDialog")
      , RProductUplanWaitStatusCountDown = require("uplan:widget/product/detail/RProductUplanWaitStatusCountDown/RProductUplanWaitStatusCountDown")
      , RProductUplanDetailStatusForm = require("uplan:widget/product/detail/RProductUplanDetailStatusForm/RProductUplanDetailStatusForm")
      , RProductUplanDetailStatus = function(_React$Component) {
        function RProductUplanDetailStatus(props) {
            _classCallCheck(this, RProductUplanDetailStatus),
            _React$Component.call(this, props);
            var buyResult = this.props.buyResult
              , isShow = buyResult ? !0 : !1;
            this.state = {
                showErrorDialog: isShow
            },
            this.closeErrorDialog = this.closeErrorDialog.bind(this)
        }
        return _inherits(RProductUplanDetailStatus, _React$Component),
        RProductUplanDetailStatus.prototype.renderErrorDialog = function() {
            var buyResult = this.props.buyResult
              , content = "";
            if (buyResult) {
                var dialogProps = $.extend({}, {
                    onRequestClose: this.closeErrorDialog,
                    status: -99999,
                    message: buyResult.message
                });
                content = React.createElement(RWeStatusDialog, dialogProps)
            }
            return content
        }
        ,
        RProductUplanDetailStatus.prototype.closeErrorDialog = function() {
            this.setState({
                showErrorDialog: !1
            })
        }
        ,
        RProductUplanDetailStatus.prototype.waitOpenJoinStatus = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlan = detailInfo.financePlan
              , financeDetailWaitTime = detailInfo.financeDetailWaitTime
              , planStatus = detailInfo.planStatus
              , financePlanType = financePlan.financePlanType
              , statusDom = null
              , countDownProps = {
                planStatus: planStatus,
                financePlanType: financePlanType,
                duration: financeDetailWaitTime
            };
            if ("PREMIUM" == financePlanType) {
                var minRegisterAmount = financePlan.minRegisterAmount;
                minRegisterAmount = minRegisterAmount ? utils.commaInteger(minRegisterAmount) : "0",
                statusDom = React.createElement("div", {
                    className: "uplan-product-info-status"
                }, React.createElement("div", {
                    className: "prop-small-box"
                }, "最低出借:", minRegisterAmount, "元"), React.createElement(RProductUplanWaitStatusCountDown, countDownProps), React.createElement("div", {
                    className: "stamp-new"
                }, React.createElement("image", {
                    src: "https://www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/WAIT.png"
                })))
            } else
                statusDom = React.createElement("div", {
                    className: "uplan-product-info-status"
                }, React.createElement("div", {
                    className: "prop-small-box"
                }), React.createElement(RProductUplanWaitStatusCountDown, countDownProps), React.createElement("div", {
                    className: "stamp-new"
                }, React.createElement("image", {
                    src: "https://www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/WAIT.png"
                })));
            var errorDialogDom = this.renderErrorDialog()
              , errorDialog = this.state.showErrorDialog ? errorDialogDom : null;
            return React.createElement("div", null, statusDom, errorDialog)
        }
        ,
        RProductUplanDetailStatus.prototype.joinStatus = function() {
            return React.createElement(RProductUplanDetailStatusForm, this.props)
        }
        ,
        RProductUplanDetailStatus.prototype.fullStatus = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlan = detailInfo.financePlan
              , registerCount = detailInfo.registerCount
              , joinAmount = detailInfo.joinAmount
              , openBuyerCount = (detailInfo.earnInterest,
            detailInfo.openBuyerCount)
              , financePlanType = financePlan.financePlanType
              , statusDom = null;
            return "PREMIUM" == financePlanType ? (joinAmount = joinAmount ? utils.commaFloat(joinAmount) : "0.00",
            statusDom = React.createElement("div", {
                className: "uplan-product-info-status"
            }, React.createElement("div", {
                className: "prop-small-box"
            }, "加入人次：", registerCount), React.createElement("ul", {
                className: "prop-big-box prop-name-orange"
            }, React.createElement("li", {
                className: "prop-value"
            }, joinAmount, React.createElement("i", null, "元")), React.createElement("li", {
                className: "prop-name"
            }, "加入金额")), React.createElement("div", {
                className: "stamp-new"
            }, React.createElement("image", {
                src: "https://www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/READY.png"
            })))) : statusDom = React.createElement("div", {
                className: "uplan-product-info-status"
            }, React.createElement("div", {
                className: "prop-small-box"
            }, "等待计息"), React.createElement("ul", {
                className: "prop-big-box prop-name-orange"
            }, React.createElement("li", {
                className: "prop-value"
            }, openBuyerCount, React.createElement("i", null, "人")), React.createElement("li", {
                className: "prop-name"
            }, "加入人次")), React.createElement("div", {
                className: "stamp-new"
            }, React.createElement("image", {
                src: "https://www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/READY.png"
            }))),
            statusDom
        }
        ,
        RProductUplanDetailStatus.prototype.incommingStatus = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlan = detailInfo.financePlan
              , registerCount = detailInfo.registerCount
              , joinAmount = detailInfo.joinAmount
              , earnInterest = detailInfo.earnInterest
              , quitWaitTime = detailInfo.quitWaitTime
              , financePlanType = financePlan.financePlanType
              , category = financePlan.category
              , statusDom = null;
            return "PREMIUM" == financePlanType ? (joinAmount = joinAmount ? utils.commaFloat(joinAmount) : "0.00",
            statusDom = React.createElement("div", {
                className: "uplan-product-info-status"
            }, React.createElement("div", {
                className: "prop-small-box"
            }, "加入人次：", registerCount, "人"), React.createElement("ul", {
                className: "prop-big-box prop-name-orange"
            }, React.createElement("li", {
                className: "prop-value"
            }, joinAmount, React.createElement("i", null, "元")), React.createElement("li", {
                className: "prop-name"
            }, "加入金额")), React.createElement("div", {
                className: "stamp-new"
            }, React.createElement("image", {
                src: "https://www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/REPAYING.png"
            })))) : (earnInterest = earnInterest ? utils.commaFloat(earnInterest) : "0.00",
            statusDom = React.createElement("div", {
                className: "uplan-product-info-status"
            }, React.createElement("div", {
                className: "prop-small-box"
            }, "OLD" == category ? "距离锁定结束" : "距离退出还有", "：", quitWaitTime, "天"), React.createElement("ul", {
                className: "prop-big-box prop-name-orange"
            }, React.createElement("li", {
                className: "prop-value"
            }, earnInterest, React.createElement("i", null, "元")), React.createElement("li", {
                className: "prop-name"
            }, "已获利息回报")), React.createElement("div", {
                className: "stamp-new"
            }, React.createElement("image", {
                src: "https://www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/REPAYING.png"
            })))),
            statusDom
        }
        ,
        RProductUplanDetailStatus.prototype.openStatus = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlan = detailInfo.financePlan
              , earnInterest = detailInfo.earnInterest
              , endLockingTime = financePlan.endLockingTime;
            return endLockingTime = endLockingTime > 0 ? moment(endLockingTime).format("YYYY-MM-DD") : "",
            earnInterest = earnInterest ? utils.commaFloat(earnInterest) : "0.00",
            React.createElement("div", {
                className: "uplan-product-info-status"
            }, React.createElement("div", {
                className: "prop-small-box"
            }, "固定服务期限结束时间：", endLockingTime), React.createElement("ul", {
                className: "prop-big-box prop-name-orange"
            }, React.createElement("li", {
                className: "prop-value"
            }, earnInterest, React.createElement("i", null, "元")), React.createElement("li", {
                className: "prop-name "
            }, "累计收益")), React.createElement("div", {
                className: "stamp-new"
            }, React.createElement("image", {
                src: "https://www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/OPEN.png"
            })))
        }
        ,
        RProductUplanDetailStatus.prototype.quitStatus = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlan = detailInfo.financePlan
              , registerCount = detailInfo.registerCount
              , joinAmount = detailInfo.joinAmount
              , earnInterest = detailInfo.earnInterest
              , financePlanType = financePlan.financePlanType
              , statusDom = null;
            if ("PREMIUM" == financePlanType)
                joinAmount = joinAmount ? utils.commaFloat(joinAmount) : "0.00",
                statusDom = React.createElement("div", {
                    className: "uplan-product-info-status"
                }, React.createElement("div", {
                    className: "prop-small-box"
                }, "加入人数：", registerCount, "人"), React.createElement("ul", {
                    className: "prop-big-box prop-name-orange"
                }, React.createElement("li", {
                    className: "prop-value"
                }, joinAmount, React.createElement("i", null, "元")), React.createElement("li", {
                    className: "prop-name "
                }, "累计收益")), React.createElement("div", {
                    className: "stamp-new"
                }, React.createElement("image", {
                    src: "https://www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/QUIT.png"
                })));
            else {
                var endLockingTime = financePlan.endLockingTime;
                endLockingTime = moment(endLockingTime).format("YYYY-MM-DD"),
                earnInterest = earnInterest ? utils.commaFloat(earnInterest) : "0.00",
                statusDom = React.createElement("div", {
                    className: "uplan-product-info-status"
                }, React.createElement("div", {
                    className: "prop-small-box"
                }, "退出时间：", endLockingTime), React.createElement("ul", {
                    className: "prop-big-box prop-name-orange"
                }, React.createElement("li", {
                    className: "prop-value"
                }, earnInterest, React.createElement("i", null, "元")), React.createElement("li", {
                    className: "prop-name "
                }, "累计收益")), React.createElement("div", {
                    className: "stamp-new"
                }, React.createElement("image", {
                    src: "https://www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/QUIT.png"
                })))
            }
            return statusDom
        }
        ,
        RProductUplanDetailStatus.prototype.ucodeStatus = function() {
            return React.createElement(RProductUplanDetailStatusForm, this.props)
        }
        ,
        RProductUplanDetailStatus.prototype.render = function() {
            var props = this.props
              , detailInfo = (this.state,
            props.detailInfo)
              , planStatus = detailInfo.planStatus
              , financePlan = detailInfo.financePlan
              , reserveStatus = financePlan.reserveStatus
              , statusDom = null;
            if (-1 != reserveStatus)
                statusDom = this.joinStatus();
            else
                switch (planStatus) {
                case 3:
                    statusDom = this.waitOpenJoinStatus();
                    break;
                case 4:
                    statusDom = this.joinStatus();
                    break;
                case 5:
                    statusDom = this.fullStatus();
                    break;
                case 6:
                    statusDom = this.incommingStatus();
                    break;
                case 7:
                    statusDom = this.openStatus();
                    break;
                case 8:
                    statusDom = this.quitStatus();
                    break;
                case 9:
                    statusDom = this.ucodeStatus()
                }
            return React.createElement("div", {
                className: "uplan-product-info-status fn-left uplan-border"
            }, statusDom)
        }
        ,
        RProductUplanDetailStatus
    }(React.Component);
    module.exports = RProductUplanDetailStatus
});
;/*!/client/widget/product/detail/RProductUplanDetailProduct/RProductUplanDetailProduct.js*/
define("uplan:widget/product/detail/RProductUplanDetailProduct/RProductUplanDetailProduct.js", function(require, exports, module) {
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
      , utils = require("common:widget/ui/utils/utils")
      , RWETooltip = require("common:widget/react-ui/RWETooltip/RWETooltip")
      , RProductUplanDetailStatus = require("uplan:widget/product/detail/RProductUplanDetailStatus/RProductUplanDetailStatus")
      , ReactTooltip = require("common:node_modules/react-tooltip/dist/index")
      , $statistic = require("common:node_modules/glpb-components-common/src/index").weStatistic
      , RProductUplanDetailProduct = function(_React$Component) {
        function RProductUplanDetailProduct(props) {
            _classCallCheck(this, RProductUplanDetailProduct),
            _React$Component.call(this, props)
        }
        return _inherits(RProductUplanDetailProduct, _React$Component),
        RProductUplanDetailProduct.prototype.componentDidMount = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlan = detailInfo.financePlan
              , financeLeftAmount = detailInfo.financeLeftAmount;
            financeLeftAmount = financeLeftAmount ? utils.commaFloat(financeLeftAmount) : "0.00";
            var refer = document.referrer
              , plan_id = financePlan.id
              , plan_name = financePlan.name
              , base_expected_rate = null == financePlan.baseInterestRate ? financePlan.expectedRate : financePlan.baseInterestRate
              , extra_rate = financePlan.extraInterestRate
              , month = financePlan.lockPeriod
              , min_amount = financePlan.minRegisterAmount
              , enter_max = financePlan.singleMaxRegisterAmount
              , total_need_amount = financePlan.amount
              , left_need_amount = financeLeftAmount
              , enter_min = "加入金额" + financePlan.minRegisterAmount + "元起，且为" + financePlan.registerMultipleAmount + "元的整数倍递增。";
            $statistic.track("Enter Plan Detail", {
                source: refer,
                plan_id: plan_id,
                base_expected_rate: base_expected_rate,
                extra_rate: extra_rate,
                month: month,
                min_amount: min_amount,
                plan_name: plan_name,
                enter_max: enter_max,
                total_need_amount: total_need_amount,
                left_need_amount: left_need_amount,
                enter_min: enter_min,
                click_time: (new Date).toString()
            })
        }
        ,
        RProductUplanDetailProduct.prototype.productDetailDom = function() {
            var detailInfo = this.props.detailInfo
              , financePlan = detailInfo.financePlan
              , showInterest = detailInfo.showInterest
              , lockDays = detailInfo.lockDays
              , planStatus = detailInfo.planStatus
              , joinAmount = detailInfo.joinAmount
              , registerCount = detailInfo.registerCount
              , tag = (financePlan.name,
            financePlan.tag)
              , category = (financePlan.id,
            financePlan.category)
              , financePlanType = financePlan.financePlanType
              , expectedRate = financePlan.expectedRate
              , baseInterestRate = financePlan.baseInterestRate;
            baseInterestRate = utils.fixFloat1(baseInterestRate);
            var extraInterestRate = financePlan.extraInterestRate
              , extraInterestRateF = utils.fixFloat1(extraInterestRate)
              , showInterestF = utils.fixFloat1(showInterest)
              , yearRateDom = null;
            yearRateDom = "OLD" != category ? 0 == extraInterestRate || null == extraInterestRate ? React.createElement("li", {
                className: "value"
            }, showInterestF, React.createElement("i", null, "%")) : React.createElement("li", {
                className: "value"
            }, baseInterestRate, React.createElement("i", null, "%"), React.createElement("i", {
                className: "extra-rate-plus"
            }, "+"), React.createElement("em", {
                className: "extra-rate"
            }, extraInterestRateF), React.createElement("i", null, "%")) : React.createElement("li", {
                className: "value"
            }, expectedRate);
            var novice = financePlan.novice
              , lockPeriod = financePlan.lockPeriod
              , periodDom = 1 == novice && 1 == lockPeriod ? React.createElement("li", {
                className: "value"
            }, lockDays, React.createElement("i", null, "天")) : React.createElement("li", {
                className: "value"
            }, lockPeriod, React.createElement("i", null, "个月"))
              , planDom = null;
            if ("PREMIUM" == financePlanType)
                planDom = React.createElement("ul", {
                    className: "invest-money fn-left"
                }, React.createElement("li", {
                    className: "preminum-head-tag"
                }, tag));
            else if (5 == planStatus || 6 == planStatus)
                joinAmount = joinAmount ? utils.commaInteger(joinAmount) : "0",
                planDom = React.createElement("ul", {
                    className: "invest-money fn-left"
                }, React.createElement("li", {
                    className: "value"
                }, joinAmount, React.createElement("i", null, "元")), React.createElement("li", {
                    className: "name"
                }, "出借本金"));
            else {
                var amount = financePlan.amount;
                amount = amount ? utils.commaInteger(amount) : "0",
                planDom = React.createElement("ul", {
                    className: "invest-money fn-left"
                }, React.createElement("li", {
                    className: "value"
                }, amount, React.createElement("i", null, "元")), React.createElement("li", {
                    className: "name"
                }, "可出借金额"))
            }
            var tooltipProps = {
                id: "product-uplan-tooltip-01",
                place: "right",
                tip: " 按扣费后年利率计算的利息不代表对实际获得利息的承诺",
                delayHide: 100
            };
            registerCount = utils.commaInteger(registerCount);
            var singleMaxRegisterAmount = ("PREMIUM" != financePlanType ? React.createElement("li", {
                className: "fn-left"
            }, "近七天加入", React.createElement("span", {
                className: "extra-value"
            }, registerCount, "人")) : null,
            financePlan.singleMaxRegisterAmount);
            singleMaxRegisterAmount = singleMaxRegisterAmount ? utils.commaInteger(singleMaxRegisterAmount) : "--";
            var periodTxt = "PREMIUM" == financePlanType ? "固定服务期限" : "服务期限";
            return React.createElement("div", null, React.createElement("div", {
                className: "product-info-invest fn-clear"
            }, React.createElement("ul", {
                className: "invest-rate fn-left"
            }, yearRateDom, React.createElement("li", {
                className: "name"
            }, "扣费后年利率", React.createElement(RWETooltip, tooltipProps))), React.createElement("ul", {
                className: "invest-period fn-left"
            }, periodDom, React.createElement("li", {
                className: "name"
            }, periodTxt)), planDom), React.createElement("div", {
                className: "product-info-extra"
            }, React.createElement("ul", {
                className: "fn-clear"
            }, React.createElement("li", {
                className: "fn-left w207"
            }, React.createElement("div", null, React.createElement("span", {
                className: "uplan-detail-icon uplan-detail-icon-01"
            }), "民生银行存管")), React.createElement("li", {
                className: "fn-left w236"
            }, React.createElement("div", null, React.createElement("span", {
                className: "uplan-detail-icon uplan-detail-icon-02"
            }), "合规排名位居前列")), React.createElement("li", {
                className: "fn-left"
            }, React.createElement("div", null, React.createElement("span", {
                className: "uplan-detail-icon uplan-detail-icon-03"
            }), "9年稳健运营")))))
        }
        ,
        RProductUplanDetailProduct.prototype.render = function() {
            var props = this.props
              , detailInfo = (this.state,
            props.detailInfo)
              , financePlan = detailInfo.financePlan
              , name = financePlan.name
              , tag = financePlan.tag
              , id = financePlan.id
              , financePlanType = financePlan.financePlanType
              , contractHref = "/p2p/contract/finance?id=" + id
              , productDetailDom = ("PREMIUM" == financePlanType ? null : React.createElement("span", {
                className: "tag"
            }, tag),
            this.productDetailDom())
              , riskTipsData = this.props.riskTipsData || {}
              , cmsData = riskTipsData.uplan || {};
            return React.createElement("div", {
                id: "wdg-detail-uplan-product",
                className: "container_12_1080 color-white-bg"
            }, React.createElement("ul", {
                className: "ui-title fn-clear"
            }, React.createElement("li", {
                className: "fn-left left-tips"
            }, React.createElement("h1", null, name), React.createElement("div", {
                className: "plan-header-tips"
            }, React.createElement("div", {
                className: "tips-text"
            }, cmsData.detailText), React.createElement("div", {
                "data-tip": cmsData.informContent,
                "data-for": "introduce-sadFace",
                className: "icon-we-tips"
            }), React.createElement(ReactTooltip, {
                id: "introduce-sadFace",
                html: "true",
                type: "light",
                effect: "solid",
                place: "bottom",
                border: !0
            }))), React.createElement("li", {
                className: "fn-right"
            }, React.createElement("a", {
                href: contractHref,
                target: "_blank",
                rel: "nofollow"
            }, name, "协议范本"))), React.createElement("div", {
                className: "ui-product-info fn-clear"
            }, React.createElement("div", {
                className: "product-info-main  fn-left"
            }, productDetailDom), React.createElement(RProductUplanDetailStatus, this.props)))
        }
        ,
        RProductUplanDetailProduct
    }(React.Component);
    module.exports = RProductUplanDetailProduct
});
;/*!/client/widget/product/detail/RProductUplanDetailProcess/RProductUplanDetailProcess.js*/
define("uplan:widget/product/detail/RProductUplanDetailProcess/RProductUplanDetailProcess.js", function(require, exports, module) {
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
      , moment = require("common:node_modules/moment/moment")
      , utils = require("common:widget/ui/utils/utils")
      , RProductUplanDetailProcess = function(_React$Component) {
        function RProductUplanDetailProcess(props) {
            _classCallCheck(this, RProductUplanDetailProcess),
            _React$Component.call(this, props)
        }
        return _inherits(RProductUplanDetailProcess, _React$Component),
        RProductUplanDetailProcess.prototype.getPremiumDom = function() {
            var detailInfo = this.props.detailInfo
              , financePlan = detailInfo.financePlan
              , category = detailInfo.category
              , preferredIncomeVo = detailInfo.preferredIncomeVo
              , showInterest = detailInfo.showInterest
              , isLess12 = detailInfo.isLess12
              , finalPeriod = financePlan.finalPeriod
              , lockPeriod = financePlan.lockPeriod
              , subPeriod = finalPeriod - lockPeriod
              , periodDom = subPeriod % 12 == 0 ? subPeriod / 12 + "年" : subPeriod + "个月"
              , tableDom = null;
            if (isLess12 || "true" == isLess12) {
                var premiumExpectedIncome = detailInfo.premiumExpectedIncome
                  , openPeriodIncomeDay = premiumExpectedIncome.openPeriodIncomeDay
                  , openPeriodIncome = premiumExpectedIncome.openPeriodIncome
                  , lockPeriodIncome = premiumExpectedIncome.lockPeriodIncome
                  , lockPeriodIncomeDay = premiumExpectedIncome.lockPeriodIncomeDay;
                openPeriodIncomeDay = openPeriodIncomeDay ? utils.commaFloat(openPeriodIncomeDay) : "0.00",
                openPeriodIncome = openPeriodIncome ? utils.commaFloat(openPeriodIncome) : "0.00",
                lockPeriodIncome = lockPeriodIncome ? utils.commaFloat(lockPeriodIncome) : "0.00",
                lockPeriodIncomeDay = openPeriodIncomeDay ? utils.commaFloat(lockPeriodIncomeDay) : "0.00",
                tableDom = React.createElement("div", {
                    className: "ui-premium-box-item pb30"
                }, React.createElement("div", {
                    className: "second-title pb10 pt30"
                }, "按日计算扣费后利息"), React.createElement("div", {
                    className: "third-title"
                }, "优选服务按日计算扣费后利息，每年滚动出借。按扣费后年利率计算的利息不代表对实际获得利息的承诺。以加入10,000元为例，预估扣费后利息如下："), React.createElement("table", {
                    className: "income-table"
                }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", {
                    className: "t-title"
                }, React.createElement("span", null, "服务阶段")), React.createElement("th", {
                    className: "t-title"
                }, React.createElement("span", null, "扣费后利息")), React.createElement("th", {
                    className: "t-title"
                }, React.createElement("span", null, "日扣费后利息"))), React.createElement("tr", null, React.createElement("td", {
                    className: "t-desc"
                }, React.createElement("span", null, "12个月内")), React.createElement("td", {
                    className: "color-orange-text"
                }, React.createElement("span", null, lockPeriodIncome, "元")), React.createElement("td", {
                    className: "color-orange-text"
                }, React.createElement("span", null, " ", lockPeriodIncomeDay, "元"))), React.createElement("tr", null, React.createElement("td", {
                    className: "t-desc"
                }, React.createElement("span", null, "自由服务期")), React.createElement("td", {
                    className: "color-orange-text"
                }, React.createElement("span", null, openPeriodIncome, "元")), React.createElement("td", {
                    className: "color-orange-text"
                }, React.createElement("span", null, openPeriodIncomeDay, "元"))))))
            } else {
                var twYearExpIncome = preferredIncomeVo.twYearExpIncome
                  , thYearExpIncome = preferredIncomeVo.thYearExpIncome
                  , twfYearExpIncome = preferredIncomeVo.twfYearExpIncome
                  , twDayExpIncome = preferredIncomeVo.twDayExpIncome
                  , thDayExpIncome = preferredIncomeVo.thDayExpIncome
                  , twfDayExpIncome = preferredIncomeVo.twfDayExpIncome;
                twDayExpIncome = twDayExpIncome ? utils.commaFloat(twDayExpIncome) : "0.00",
                thDayExpIncome = twDayExpIncome ? utils.commaFloat(thDayExpIncome) : "0.00",
                twfDayExpIncome = twDayExpIncome ? utils.commaFloat(twfDayExpIncome) : "0.00",
                tableDom = React.createElement("div", {
                    className: "ui-premium-box-item pb30"
                }, React.createElement("div", {
                    className: "second-title pb10 pt30"
                }, "按日计算扣费后利息，扣费后利息逐年递增"), React.createElement("div", {
                    className: "third-title"
                }, "优选服务按日计算扣费后利息，每年滚动出借。按扣费后年利率计算的利息不代表对实际获得利息的承诺。以加入10,000元为例，预估扣费后利息如下："), React.createElement("table", {
                    className: "income-table"
                }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", {
                    className: "t-title"
                }, React.createElement("span", null, "服务阶段")), React.createElement("th", {
                    className: "t-title"
                }, React.createElement("span", null, "年扣费后利息")), React.createElement("th", {
                    className: "t-title"
                }, React.createElement("span", null, "日扣费后利息"))), React.createElement("tr", null, React.createElement("td", {
                    className: "t-desc"
                }, React.createElement("span", null, "12个月内")), React.createElement("td", {
                    className: "color-orange-text"
                }, React.createElement("span", null, twYearExpIncome, "元")), React.createElement("td", {
                    className: "color-orange-text"
                }, React.createElement("span", null, " ", twDayExpIncome, "元"))), React.createElement("tr", null, React.createElement("td", {
                    className: "t-desc"
                }, React.createElement("span", null, "自由服务期第1年")), React.createElement("td", {
                    className: "color-orange-text"
                }, React.createElement("span", null, thYearExpIncome, "元")), React.createElement("td", {
                    className: "color-orange-text"
                }, React.createElement("span", null, thDayExpIncome, "元"))), React.createElement("tr", null, React.createElement("td", {
                    className: "t-desc"
                }, React.createElement("span", null, "自由服务期第2年")), React.createElement("td", {
                    className: "color-orange-text"
                }, React.createElement("span", null, twfYearExpIncome, "元")), React.createElement("td", {
                    className: "color-orange-text"
                }, React.createElement("span", null, twfDayExpIncome, "元"))))))
            }
            return React.createElement("div", {
                className: "ui-premium-box"
            }, React.createElement("div", {
                className: "ui-premium-box-item"
            }, React.createElement("div", {
                className: "second-title pb20"
            }, "退出机制灵活，设", periodDom, "自由服务期"), React.createElement("ul", {
                className: "ul-plan-introduce"
            }, React.createElement("li", {
                className: "bg-gray"
            }, "1、", financePlan.lockPeriod, "个月固定服务期届满后转入自由服务期。"), React.createElement("li", null, "2、自由服务期内，可申请免费退出；平台将在申请后第7日开始债权转让处理，债权转让完成即退出完成。"), React.createElement("li", {
                className: "bg-gray"
            }, "3、自由服务期内，扣费后年利率", "OLD" != category ? showInterest : financePlan.expectedRate, "%，按日计算回报。"), React.createElement("li", null, "4、自由服务期内，退出本次优选服务时可灵活选择退出金额。"), React.createElement("li", {
                className: "bg-gray"
            }, "5、", periodDom, "自由服务期届满后，将自动退出本次优选服务。"))), React.createElement("div", null, tableDom))
        }
        ,
        RProductUplanDetailProcess.prototype.render = function() {
            var props = this.props
              , detailInfo = (this.state,
            props.detailInfo)
              , financePlan = detailInfo.financePlan
              , lockStartTime = detailInfo.lockStartTime
              , planSelfStatus = detailInfo.planSelfStatus
              , category = financePlan.category
              , beginResellingTime = financePlan.beginResellingTime
              , endLockingTime = financePlan.endLockingTime
              , lockPeriod = financePlan.lockPeriod
              , salePeriod = financePlan.salePeriod
              , financePlanType = financePlan.financePlanType
              , beginResellingTimeFormat = beginResellingTime > 0 ? moment(beginResellingTime).format("YYYY-MM-DD") : "--"
              , lockStartTimeFormat = moment(lockStartTime).format("YYYY-MM-DD")
              , endLockingTimeFormat = moment(endLockingTime).format("YYYY年MM月DD日")
              , extraDom = null
              , endLockingDom = null
              , extraTitleDom = null
              , joinUplanHrefDom = null
              , process2NameDom = void 0
              , processOneRectColorClassName = "ui-detail-product-process-info-rect rect-left-gray"
              , processOneBgColorClassName = "fn-left process-date-box-01 bg-gray"
              , processTwoRectColorClassName = "ui-detail-product-process-info-rect rect-left-gray"
              , processThreeRectColorClassName = "ui-detail-product-process-info-rect rect-right-gray"
              , processThreeBgColorClassName = "fn-right process-date-box-02 bg-gray";
            return "PREMIUM" == financePlanType ? (extraTitleDom = React.createElement("div", {
                className: "premium-second-title"
            }, "服务周期"),
            endLockingDom = "转入自由服务期，随时申请退出",
            extraDom = this.getPremiumDom(),
            process2NameDom = "开始计算扣费后利息") : (endLockingDom = "OLD" == category ? "锁定结束" : "到期退出",
            joinUplanHrefDom = React.createElement("a", {
                className: "fn-right",
                href: "https://www.renrendai.com/help/investment/58732de5b436c50e334983c1",
                target: "_blank",
                rel: "nofollow"
            }, "如何选择U享服务"),
            process2NameDom = "开始计算扣费后利息"),
            planSelfStatus >= 4 && (processOneRectColorClassName = "ui-detail-product-process-info-rect rect-left-blue",
            processOneBgColorClassName = "fn-left process-date-box-01 bg-blue"),
            planSelfStatus >= 5 && (processTwoRectColorClassName = "ui-detail-product-process-info-rect rect-left-blue"),
            planSelfStatus >= 6 && (processThreeRectColorClassName = "ui-detail-product-process-info-rect rect-right-blue",
            processThreeBgColorClassName = "fn-right process-date-box-02 bg-blue"),
            React.createElement("div", {
                id: "wdg-detail-uplan-product-process",
                className: "container_12_1080 color-white-bg mt20"
            }, React.createElement("ul", {
                className: "ui-title fn-clear"
            }, React.createElement("li", {
                className: "fn-left"
            }, "服务周期"), joinUplanHrefDom), extraTitleDom, React.createElement("div", {
                className: "ui-detail-product-process"
            }, React.createElement("div", {
                className: "ui-detail-product-process-info fn-clear"
            }, React.createElement("ul", {
                className: "fn-left process-info-box-01"
            }, React.createElement("li", {
                className: "ui-detail-product-process-info-desc"
            }, "服务发布"), React.createElement("li", {
                className: "ui-detail-product-process-info-time"
            }, beginResellingTimeFormat), React.createElement("li", {
                className: processOneRectColorClassName
            })), React.createElement("ul", {
                className: "fn-left  process-info-box-02"
            }, React.createElement("li", {
                className: "ui-detail-product-process-info-desc"
            }, process2NameDom), React.createElement("li", {
                className: "ui-detail-product-process-info-time"
            }, lockStartTimeFormat), React.createElement("li", {
                className: processTwoRectColorClassName
            })), React.createElement("ul", {
                className: "fn-right  process-info-box-03"
            }, React.createElement("li", {
                className: "ui-detail-product-process-info-desc"
            }, endLockingDom), React.createElement("li", {
                className: "ui-detail-product-process-info-time"
            }, endLockingTimeFormat), React.createElement("li", {
                className: processThreeRectColorClassName
            }))), React.createElement("div", {
                className: "ui-detail-product-process-date fn-clear"
            }, React.createElement("div", {
                className: processOneBgColorClassName
            }, salePeriod, "天后开始计息"), React.createElement("div", {
                className: processThreeBgColorClassName
            }, lockPeriod, "个月持续自动投标"))), extraDom)
        }
        ,
        RProductUplanDetailProcess
    }(React.Component);
    module.exports = RProductUplanDetailProcess
});
;/*!/client/widget/product/detail/RProductUplanDetaiTabTntro/RProductUplanDetaiTabTntro.js*/
define("uplan:widget/product/detail/RProductUplanDetaiTabTntro/RProductUplanDetaiTabTntro.js", function(require, exports, module) {
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
      , moment = require("common:node_modules/moment/moment")
      , utils = require("common:widget/ui/utils/utils")
      , RProductUplanDetaiTabTntro = function(_React$Component) {
        function RProductUplanDetaiTabTntro(props) {
            _classCallCheck(this, RProductUplanDetaiTabTntro),
            _React$Component.call(this, props)
        }
        return _inherits(RProductUplanDetaiTabTntro, _React$Component),
        RProductUplanDetaiTabTntro.prototype.getCommonIntro = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlan = detailInfo.financePlan
              , productStr = (detailInfo.showInterest,
            detailInfo.productStr)
              , category = financePlan.category
              , id = financePlan.id
              , contractHref = "/p2p/contract/finance?id=" + id
              , incomeWayDom = null
              , compoundInterest = detailInfo.compoundInterest
              , expectedRateUplan = financePlan.expectedRateUplan;
            expectedRateUplan = expectedRateUplan ? utils.commaFloat(expectedRateUplan) : "0.00",
            incomeWayDom = "OLD" != category ? React.createElement("dl", null, React.createElement("dd", null, "1.循环出借 ", compoundInterest, "%"), React.createElement("dd", null, "2.提取至账户 ", expectedRateUplan, "%"), React.createElement("dd", null, React.createElement("span", {
                className: "em-red"
            }, "*"), "一经选择，无法修改。")) : React.createElement("dl", null, React.createElement("dt", null, "以下三种方式任选其一："), React.createElement("dd", null, "1.循环出借"), React.createElement("dd", null, "2.提取至账户"), React.createElement("dd", null, "3.提取至银行卡")),
            productStr = productStr.replace(/,/g, "、");
            var endLockingTime = financePlan.endLockingTime;
            endLockingTime = moment(endLockingTime).format("YYYY年MM月DD日");
            var minRegisterAmount = financePlan.minRegisterAmount;
            minRegisterAmount = minRegisterAmount ? utils.commaInteger(minRegisterAmount) : "--";
            var registerMultipleAmount = financePlan.registerMultipleAmount;
            registerMultipleAmount = registerMultipleAmount ? utils.commaInteger(registerMultipleAmount) : "--";
            var singleMaxRegisterAmount = financePlan.singleMaxRegisterAmount;
            singleMaxRegisterAmount = singleMaxRegisterAmount ? utils.commaInteger(singleMaxRegisterAmount) : "--";
            var beginResellingTime = financePlan.beginResellingTime
              , lockStartTime = detailInfo.lockStartTime;
            beginResellingTime = beginResellingTime > 0 ? moment(beginResellingTime).format("YYYY年MM月DD日 HH:mm") : null;
            var beginJoinDom = null == beginResellingTime || null == lockStartTime ? "--" : beginResellingTime
              , quitWayDom = "OLD" != category ? "系统将通过债权转让自动完成退出，您所持债权转让完成的具体时间，视债权转让市场交易情况而定。" : React.createElement("span", null, "通过债权转让方式退出。", React.createElement("span", {
                className: "em-red"
            }, "*"), "具体退出完成时间，视债权转让市场交易情况而定。")
              , exitWayDom = "OLD" != category ? React.createElement("span", null, "固定服务期内支持提前退出，详情参见", React.createElement("a", {
                href: contractHref,
                target: "_blank",
                rel: "nofollow"
            }, "《U享服务协议》"), " ") : "不支持天退出"
              , feeDom = null
              , quitRateAdvance = financePlan.quitRateAdvance;
            quitRateAdvance = quitRateAdvance ? utils.fixFloat1(quitRateAdvance) : "0.0";
            var buyInRateDom = financePlan.buyInRate ? financePlan.buyInRate + "%" : "0.0%"
              , interestRateDom = financePlan.interestRate ? financePlan.interestRate + "%" : "0.0%"
              , quitRateDom = financePlan.quitRate ? financePlan.quitRate + "%" : "0.0%"
              , allowAdvanceQuit = financePlan.allowAdvanceQuit || ""
              , quitAmount = React.createElement("dd", null, "提前退出费用：授权出借本金 x ", React.createElement("span", {
                className: "em-orange"
            }, quitRateAdvance, "%"), "，详情参见", React.createElement("a", {
                href: contractHref,
                rel: "nofollow"
            }, "《U享服务协议》"));
            return allowAdvanceQuit || (exitWayDom = "固定服务期限内不支持提前退出",
            quitAmount = ""),
            feeDom = "OLD" != category ? React.createElement("dl", null, React.createElement("dd", null, "服务费用：超出扣费后利息部分作为服务费"), React.createElement("dd", null, "退出费用：", React.createElement("span", {
                className: "em-orange"
            }, quitRateDom)), quitAmount) : React.createElement("dl", null, React.createElement("dd", null, "加入费用：", React.createElement("span", {
                className: "em-orange"
            }, buyInRateDom)), React.createElement("dd", null, "服务费用：", React.createElement("span", {
                className: "em-orange"
            }, interestRateDom)), React.createElement("dd", null, "退出费用：", React.createElement("span", {
                className: "em-orange"
            }, quitRateDom))),
            React.createElement("div", {
                className: "ui-uplan-intro pd20"
            }, React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "期数"), React.createElement("li", {
                className: "item-value fn-left"
            }, financePlan.name)), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear bg-gray"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "服务介绍"), React.createElement("li", {
                className: "item-value fn-left"
            }, financePlan.introduce)), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "投标范围"), React.createElement("li", {
                className: "item-value fn-left"
            }, productStr, "等（详见服务协议）")), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear bg-gray"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "利息处理方式及扣费后年利率"), React.createElement("li", {
                className: "item-value fn-left"
            }, incomeWayDom)), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "自动投标授权服务期限"), React.createElement("li", {
                className: "item-value fn-left"
            }, financePlan.lockPeriod, "个月")), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear bg-gray"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "OLD" != category ? "服务期限结束日" : "固定服务期限结束日期"), React.createElement("li", {
                className: "item-value fn-left"
            }, endLockingTime)), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "授权出借条件"), React.createElement("li", {
                className: "item-value fn-left"
            }, "授权出借金额", minRegisterAmount, "元起，且为", registerMultipleAmount, "元的整数倍递增。")), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear bg-gray"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "授权出借上限制"), React.createElement("li", {
                className: "item-value fn-left"
            }, singleMaxRegisterAmount, "元")), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "授权出借时间"), React.createElement("li", {
                className: "item-value fn-left"
            }, beginJoinDom)), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear bg-gray"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "到期退出方式"), React.createElement("li", {
                className: "item-value fn-left"
            }, quitWayDom)), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "提前退出方式"), React.createElement("li", {
                className: "item-value fn-left"
            }, exitWayDom)), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear bg-gray"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "费用"), React.createElement("li", {
                className: "item-value fn-left"
            }, feeDom)), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "风险揭示书"), React.createElement("li", {
                className: "item-value fn-left"
            }, React.createElement("a", {
                href: "//www.renrendai.com/agreement/contract/currency/cmsId/58ec7c0d090cc9096532d0ca",
                target: "_blank",
                rel: "nofollow"
            }, "【点击查看】"))), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear bg-gray"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "服务协议"), React.createElement("li", {
                className: "item-value fn-left"
            }, React.createElement("a", {
                href: contractHref,
                target: "_blank",
                rel: "nofollow"
            }, "【点击查看】"))))
        }
        ,
        RProductUplanDetaiTabTntro.prototype.getPremiumIntro = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlan = detailInfo.financePlan
              , showInterest = detailInfo.showInterest
              , isLess12 = detailInfo.isLess12
              , id = financePlan.id
              , contractHref = "/p2p/contract/finance?id=" + id
              , extraInterestRate = financePlan.extraInterestRate
              , baseInterestRate = financePlan.baseInterestRate
              , extraInterestRateDom = 0 == extraInterestRate || null == extraInterestRate ? showInterest + "%" : baseInterestRate + "+" + extraInterestRate + "%"
              , quitRateAdvance = financePlan.quitRateAdvance;
            quitRateAdvance = quitRateAdvance ? utils.fixFloat1(quitRateAdvance) : "0.0";
            var minRegisterAmount = financePlan.minRegisterAmount
              , registerMultipleAmount = financePlan.registerMultipleAmount
              , singleMaxRegisterAmount = financePlan.singleMaxRegisterAmount;
            minRegisterAmount = minRegisterAmount ? utils.commaInteger(minRegisterAmount) : "--",
            registerMultipleAmount = registerMultipleAmount ? utils.commaInteger(registerMultipleAmount) : "--",
            singleMaxRegisterAmount = singleMaxRegisterAmount ? utils.commaInteger(singleMaxRegisterAmount) : "--";
            var quitRateDom = (financePlan.buyInRate ? financePlan.buyInRate + "%" : "0.0%",
            financePlan.interestRate ? financePlan.interestRate + "%" : "0.0%",
            financePlan.quitRate ? financePlan.quitRate + "%" : "0.0%")
              , allowAdvanceQuit = financePlan.allowAdvanceQuit || ""
              , quitAmount = React.createElement("dd", null, "提前退出费用：授权出借本金 x ", React.createElement("span", {
                className: "em-orange"
            }, quitRateAdvance, "%"), "，详情参见", React.createElement("a", {
                href: contractHref,
                target: "_blank",
                rel: "nofollow"
            }, "《优选服务协议》"))
              , quitMethod = React.createElement("li", {
                className: "item-value fn-left"
            }, "1、", financePlan.lockPeriod, "个月内，可操作提前退出，提前退出费用为授权出借本金的", quitRateAdvance, "%。", React.createElement("br", null), "2、转入自由服务期后，可随时申请退出，不收取退出费用。平台将在申请后第", financePlan.applyQuitDays, "日受理。 并通过债权转让自动完成退出，您所持债权转让完成的具体时间，视债权转让市场交易情况而定。");
            allowAdvanceQuit || (quitAmount = "",
            quitMethod = React.createElement("li", {
                className: "item-value fn-left"
            }, "转入自由期后，可随时申请退出，不收取退出费用。平台将在申请后第", financePlan.applyQuitDays, "日受理。 并通过债权转让自动完成退出，您所持债权转让完成的具体时间，视债权转让市场交易情况而定。"));
            var periodDom = isLess12 || "true" == isLess12 ? React.createElement("li", {
                className: "item-value fn-left"
            }, "优选服务目前设", financePlan.lockPeriod, "个月的固定服务期限，届满后转入自由服务期，自由服务期到期后自动退出") : React.createElement("li", {
                className: "item-value fn-left"
            }, "优选服务目前设", financePlan.lockPeriod, "个月的固定服务期限，届满后转入自由服务期，自由服务期到期后自动退出");
            return React.createElement("div", {
                className: "ui-uplan-intro"
            }, React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "期数"), React.createElement("li", {
                className: "item-value fn-left"
            }, financePlan.name)), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear  bg-gray"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "服务介绍"), React.createElement("li", {
                className: "item-value fn-left"
            }, financePlan.introduce)), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "自动投标授权服务期限"), periodDom), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear  bg-gray"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "回报说明"), React.createElement("li", {
                className: "item-value fn-left"
            }, "扣费后年利率", extraInterestRateDom, "，出借产生回报将计入下一年度回报计算基数，扣费后利息金额逐年递增。", React.createElement("br", null), "优选服务按日计算回报，申请退出资金中本金部分，回报将计算至实际退出日。未申请退出的资金将继续出借计息。")), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "退出方式"), quitMethod), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear  bg-gray"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "授权出借条件"), React.createElement("li", {
                className: "item-value fn-left"
            }, "授权出借本金", minRegisterAmount, "元起，并以", registerMultipleAmount, "元整数倍递增。每期优选服务个人授权出借上限为", singleMaxRegisterAmount, "元。")), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "费用说明"), React.createElement("li", {
                className: "item-value fn-left"
            }, React.createElement("dl", null, React.createElement("dd", null, "服务费用：超出扣费后利息部分作为服务费"), React.createElement("dd", null, "自由服务期内退出费用：", React.createElement("span", {
                className: "em-orange"
            }, quitRateDom)), quitAmount))), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear bg-gray"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "风险揭示书"), React.createElement("li", {
                className: "item-value fn-left"
            }, React.createElement("a", {
                href: "//www.renrendai.com/agreement/contract/currency/cmsId/58ec7c0d090cc9096532d0ca",
                target: "_blank",
                rel: "nofollow"
            }, "【点击查看】"))), React.createElement("ul", {
                className: "ui-uplan-intro-item fn-clear"
            }, React.createElement("li", {
                className: " item-name fn-left"
            }, "服务协议"), React.createElement("li", {
                className: "item-value fn-left"
            }, React.createElement("a", {
                href: contractHref,
                target: "_blank",
                rel: "nofollow"
            }, "【点击查看】"))))
        }
        ,
        RProductUplanDetaiTabTntro.prototype.render = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlan = detailInfo.financePlan
              , financePlanType = financePlan.financePlanType
              , commonIntro = null;
            return commonIntro = "PREMIUM" == financePlanType ? this.getPremiumIntro() : this.getCommonIntro(),
            React.createElement("div", {
                id: "uplan-product-tab-intro"
            }, commonIntro)
        }
        ,
        RProductUplanDetaiTabTntro
    }(React.Component);
    module.exports = RProductUplanDetaiTabTntro
});
;/*!/client/widget/product/detail/RProductUplanDetaiTabQuestion/RProductUplanDetaiTabQuestion.js*/
define("uplan:widget/product/detail/RProductUplanDetaiTabQuestion/RProductUplanDetaiTabQuestion.js", function(require, exports, module) {
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
      , RProductUplanDetaiTabQuestion = (require("common:node_modules/moment/moment"),
    require("common:widget/ui/utils/utils"),
    function(_React$Component) {
        function RProductUplanDetaiTabQuestion(props) {
            _classCallCheck(this, RProductUplanDetaiTabQuestion),
            _React$Component.call(this, props)
        }
        return _inherits(RProductUplanDetaiTabQuestion, _React$Component),
        RProductUplanDetaiTabQuestion.prototype.getCommonQue = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlan = detailInfo.financePlan
              , novice = financePlan.novice
              , publishDom = 1 == novice ? " 自2016年11月25日起，工作日、周末、节假日U享服务发布时间统一为每日上午10:00(U享服务-新发布时间相对灵活)，其他时间会根据用户出借情况随机发布U享服务，请随时关注官网及APP灵活安排您的出借时间。" : " 自2016年11月25日起，工作日、周末、节假日U享服务发布时间统一为每日上午10:00，其他时间会根据用户出借情况随机发布U享服务，请随时关注官网及APP灵活安排您的出借时间。"
              , quitDom = 1 == novice ? "您所持债权出售完成的具体时间，视债权转让市场交易情况而定。" : null
              , allowAdvanceQuit = financePlan.allowAdvanceQuit || ""
              , question5 = "U享服务具有固定服务期限限制。固定服务期限内，您可操作提前退出，但会产生相应费用，提前退出费用=授权出借本金金额*提前退出费率，不同固定服务期限的U享服务适用不同的提前退出费率，具体以当期U享服务的公示及您签署的《U享服务协议》约定为准。固定服务期限满后自动退出。";
            return allowAdvanceQuit || (question5 = "U享服务具有固定服务期限限制。固定服务期限内不可提前退出，固定服务期限满后自动退出。"),
            React.createElement("div", null, React.createElement("ul", {
                className: "ui-question-item"
            }, React.createElement("li", {
                className: "question"
            }, "Q1：U享服务安全吗？"), React.createElement("li", {
                className: "question-answer"
            }, "人人贷以严谨负责的态度对每笔借款进行严格筛选，同时具备专业的贷后管理团队和高效的催收流程，最大限度的保护出借人的权益。")), React.createElement("ul", {
                className: "ui-question-item"
            }, React.createElement("li", {
                className: "question"
            }, "Q2：U享服务发布时间？"), React.createElement("li", {
                className: "question-answer"
            }, publishDom)), React.createElement("ul", {
                className: "ui-question-item"
            }, React.createElement("li", {
                className: "question"
            }, "Q3：U享服务扣费后年利率有多少？"), React.createElement("li", {
                className: "question-answer"
            }, "U享自动投标服务的服务期限有6种，分别为1个月、3个月、6个月、12个月、24个月、36个月，不同服务期限长度的U享服务扣费后年利率不同，具体以当期U享服务公布的扣费后年利率为准。 按扣费后年利率计算的利息不代表对实际获得利息的承诺，您最终获得的实际利息回报可能与扣费后年利率不一致。")), React.createElement("ul", {
                className: "ui-question-item"
            }, React.createElement("li", {
                className: "question"
            }, "Q4：U享自动投标服务过程中获得的利息如何处理？"), React.createElement("li", {
                className: "question-answer"
            }, " 在U享自动投标服务过程中因出借而获得的利息的处理方式有以下两种：再出借，或由用户自行支配。用户在选择U享服务授权出借时可进行选择，暂不支持中途修改。 ", React.createElement("br", null), "另外，在U享服务退出后，债权转让所得资金及借款回款本息将返回至用户的民生银行存管账户，供用户自行支配。")), React.createElement("ul", {
                className: "ui-question-item"
            }, React.createElement("li", {
                className: "question"
            }, "Q5：固定服务期限是什么？"), React.createElement("li", {
                className: "question-answer"
            }, question5)), React.createElement("ul", {
                className: "ui-question-item"
            }, React.createElement("li", {
                className: "question"
            }, "Q6：U享服务到期后，我如何退出并实现收回本息？"), React.createElement("li", {
                className: "question-answer"
            }, "U享服务到期当日，系统将自动通过债权转让为您收回出借本金，债权转让处理时间一般为1-3个工作日，但平台不承诺转让时效。", quitDom)), React.createElement("div", {
                className: "prompt-info"
            }, "renrendai.com平台仅为信息发布平台，未以任何明示或暗示的方式对出借人提供担保或承诺保本保息，出借人应根据自身的出借偏好和风险承受能力进行独立判断和作出决策，并自行承担资金出借的风险与责任。网贷有风险，出借需谨慎。"))
        }
        ,
        RProductUplanDetaiTabQuestion.prototype.getPremiumQue = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlan = detailInfo.financePlan
              , isLess12 = detailInfo.isLess12
              , question1 = (detailInfo.preferredIncomeVo,
            financePlan.category,
            financePlan.finalPeriod,
            financePlan.lockPeriod,
            isLess12 || "true" == isLess12 ? React.createElement("li", {
                className: "question-answer"
            }, "优选服务的服务期限为授权出借之日起至约定退出日止，设固定服务期", financePlan.lockPeriod, "个月，固定服务期满后转入自由服务期，到期后自动退出") : React.createElement("li", {
                className: "question-answer"
            }, "优选服务的服务期限为授权出借之日起至约定退出日止，设固定服务期", financePlan.lockPeriod, "个月，固定服务期满后转入自由服务期，到期后自动退出"))
              , allowAdvanceQuit = financePlan.allowAdvanceQuit || ""
              , question2 = React.createElement("li", {
                className: "question-answer"
            }, financePlan.lockPeriod, "个月固定服务期内，可在renrendai.com操作提前退出，提前退出费用=授权出借本金金额*2.0%；\u2028转入自由服务期后可在renrendai.com和app端随时申请退出，退出免退出费用，退出金额可灵活选择。")
              , question3 = React.createElement("li", {
                className: "question-answer"
            }, financePlan.lockPeriod, "个月固定服务期内提前退出，平台将在申请当日进行债权转让处理；转入自由服务期后申请退出，平台将在申请后第", financePlan.applyQuitDays, "日进行债权转让处理。债权转让处理时间一般为1-3个工作日，但平台不承诺转让时效，成功退出后资金退回到个人账户余额。");
            return allowAdvanceQuit || (question2 = React.createElement("li", {
                className: "question-answer"
            }, financePlan.lockPeriod, "个月固定服务期内不可退出；转入自由服务期后可在renrendai.com和App端提前申请退出，退出免退出费用，退出金额可灵活选择。"),
            question3 = React.createElement("li", {
                className: "question-answer"
            }, "转入自由服务期后申请退出，平台将在申请后第", financePlan.applyQuitDays, "日进行债权转让处理。债权转让处理时间一般为1-3个工作日，但平台不承诺转让时效，成功退出后资金退回到个人账户余额。")),
            React.createElement("div", null, React.createElement("ul", {
                className: "ui-question-item"
            }, React.createElement("li", {
                className: "question"
            }, "Q1：优选服务的服务期限有多久？"), question1), React.createElement("ul", {
                className: "ui-question-item"
            }, React.createElement("li", {
                className: "question"
            }, "Q2：优选服务如何退出？"), question2), React.createElement("ul", {
                className: "ui-question-item"
            }, React.createElement("li", {
                className: "question"
            }, "Q3：申请退出后多久可完成退出？"), question3), React.createElement("ul", {
                className: "ui-question-item"
            }, React.createElement("li", {
                className: "question"
            }, "Q4：优选自动投标服务过程中获得的利息如何处理？"), React.createElement("li", {
                className: "question-answer"
            }, "在优选自动投标服务过程中因出借而获得的利息的处理方式为循环出借（即每笔借款利息自动再出借）。")), React.createElement("ul", {
                className: "ui-question-item"
            }, React.createElement("li", {
                className: "question"
            }, "Q5：优选服务可以使用优惠券吗？"), React.createElement("li", {
                className: "question-answer"
            }, "选择优选服务，仅可使用现金券、抵扣券。当现金券、抵扣券券面注明支持优选服务授权出借时，此次出借可以使用该券。")), React.createElement("ul", {
                className: "ui-question-item"
            }, React.createElement("li", {
                className: "question"
            }, "Q6：优选服务可以续期吗？"), React.createElement("li", {
                className: "question-answer"
            }, "目前优选服务暂不支持续期功能。")))
        }
        ,
        RProductUplanDetaiTabQuestion.prototype.render = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlan = detailInfo.financePlan
              , financePlanType = financePlan.financePlanType
              , commonQuestion = null;
            return commonQuestion = "PREMIUM" == financePlanType ? this.getPremiumQue() : this.getCommonQue(),
            React.createElement("div", {
                id: "uplan-product-tab-question"
            }, commonQuestion)
        }
        ,
        RProductUplanDetaiTabQuestion
    }(React.Component));
    module.exports = RProductUplanDetaiTabQuestion
});
;/*!/client/widget/product/detail/RProductUplanDetaiTabJoined/RProductUplanDetaiTabJoined.js*/
define("uplan:widget/product/detail/RProductUplanDetaiTabJoined/RProductUplanDetaiTabJoined.js", function(require, exports, module) {
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
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source)
                Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key])
        }
        return target
    }
      , React = require("common:node_modules/react/react")
      , List = require("common:widget/react-ui/RList/List")
      , moment = require("common:node_modules/moment/moment")
      , service = require("common:widget/ui/service/service-factory")
      , uplanService = service.getService("uplan")
      , utils = require("common:widget/ui/utils/utils")
      , RProductUplanDetaiTabJoined = function(_React$Component) {
        function RProductUplanDetaiTabJoined(props) {
            _classCallCheck(this, RProductUplanDetaiTabJoined),
            _React$Component.call(this, props),
            this.state = {
                buyers: null,
                isLoading: !1,
                listDOM: null
            }
        }
        return _inherits(RProductUplanDetaiTabJoined, _React$Component),
        RProductUplanDetaiTabJoined.prototype.componentWillMount = function() {
            this.getBuys()
        }
        ,
        RProductUplanDetaiTabJoined.prototype.getBuys = function() {
            var _this = this;
            this.setState({
                isLoading: !0
            });
            var detailInfo = this.props.detailInfo
              , financePlan = detailInfo.financePlan
              , id = financePlan.id;
            uplanService.getUplanProductBuyers({
                financePlanId: id
            }).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                if (requestStatus === uplanService.STATUS.SUCCESS && 0 === status) {
                    var listDOM = _this.creatListDom(data);
                    _this.setState({
                        buyers: data,
                        isLoading: !1,
                        listDOM: listDOM
                    })
                } else {
                    {
                        data.message || "请求后端服务出错, 请稍后再试"
                    }
                    _this.setState({
                        isLoading: !1
                    })
                }
            }).caught(function() {
                _this.setState({
                    isLoading: !1
                })
            })
        }
        ,
        RProductUplanDetaiTabJoined.prototype.createHeadDom = function() {
            return React.createElement("ul", {
                className: " fn-clear"
            }, React.createElement("li", {
                className: "order-li fn-left"
            }, React.createElement("span", {
                className: "order-span"
            }, "序号")), React.createElement("li", {
                className: "invester-li fn-left"
            }, React.createElement("span", {
                className: "invester-span"
            }, "出借人")), React.createElement("li", {
                className: "amount-li fn-left"
            }, React.createElement("span", {
                className: "amount-span"
            }, "授权出借本金")), React.createElement("li", {
                className: "source-li fn-left"
            }, React.createElement("span", {
                className: "source-span"
            }, "来源")), React.createElement("li", {
                className: "join-time-li fn-left"
            }, React.createElement("span", {
                className: "join-time-span"
            }, "授权出借时间")))
        }
        ,
        RProductUplanDetaiTabJoined.prototype.createRowDom = function(item, index, uniqueKey) {
            var className = index % 2 == 0 ? "ui-list-row fn-clear dark" : "ui-list-row fn-clear"
              , ucodeUsed = !1
              , mobileUsed = !1
              , weUsed = !1;
            item.ucodeId ? ucodeUsed = !0 : "MOBILE" === item.tradeMethod ? mobileUsed = !0 : "PC" === item.tradeMethod && (weUsed = !0);
            var amount = item.amount
              , createTime = item.createTime;
            amount = amount ? utils.commaInteger(amount) : "0",
            createTime = moment(createTime).format("YYYY年MM月DD日 HH:mm");
            var sourceDom = null;
            return ucodeUsed && (sourceDom = React.createElement("i", {
                className: "icon-we-ucode"
            })),
            mobileUsed && (sourceDom = React.createElement("i", {
                className: "icon-we-shoujiicon"
            })),
            weUsed && (sourceDom = React.createElement("i", {
                className: "icon-we-diannaoicon"
            })),
            React.createElement("ul", {
                className: className
            }, React.createElement("li", {
                className: "order-li fn-left"
            }, React.createElement("span", {
                className: "order-span"
            }, uniqueKey + 1)), React.createElement("li", {
                className: "invester-li fn-left"
            }, React.createElement("span", {
                className: "invester-span"
            }, item.nickName)), React.createElement("li", {
                className: "amount-li fn-left"
            }, React.createElement("span", {
                className: "amount-span"
            }, amount, "元")), React.createElement("li", {
                className: "source-li fn-left"
            }, React.createElement("span", {
                className: "source-span"
            }, sourceDom)), React.createElement("li", {
                className: "join-time-li fn-left"
            }, React.createElement("span", {
                className: "join-time-span"
            }, createTime)))
        }
        ,
        RProductUplanDetaiTabJoined.prototype.creatListDom = function(buyers) {
            var detailInfo = this.props.detailInfo
              , financePlan = detailInfo.financePlan
              , id = financePlan.id
              , ajaxParams = {
                financePlanId: id
            };
            return React.createElement("div", {
                id: "uplan-product-tab-join-list"
            }, React.createElement(List, _extends({}, buyers, {
                moudleServiceName: "uplan",
                url: "getUplanProductBuyers",
                ajaxParams: ajaxParams,
                isHeadNeed: "yes",
                isHeadNeedOrder: "no",
                createHeadDom: this.createHeadDom,
                createRowDom: this.createRowDom,
                noDataText: "暂无加入记录",
                startNum: 0,
                limit: 10,
                offset: 5
            })))
        }
        ,
        RProductUplanDetaiTabJoined.prototype.render = function() {
            var state = (this.props,
            this.state)
              , payAmount = 0
              , totalCount = 0
              , buyers = state.buyers;
            buyers && buyers.data && (payAmount = buyers.data.totalJoinAmount,
            totalCount = buyers.data.totalCount,
            payAmount = utils.commaInteger(payAmount),
            totalCount = utils.commaInteger(totalCount));
            var listDOM = this.state.listDOM;
            return React.createElement("div", {
                id: "uplan-product-tab-join"
            }, React.createElement("div", {
                className: "list-info"
            }, "授权出借总人次", React.createElement("i", null, totalCount), "人，授权出借本金总额", React.createElement("i", null, payAmount), "元"), listDOM)
        }
        ,
        RProductUplanDetaiTabJoined
    }(React.Component);
    module.exports = RProductUplanDetaiTabJoined
});
;/*!/client/widget/product/detail/RProductUplanDetaiTabLoanInfo/RProductUplanDetaiTabLoanInfo.js*/
define("uplan:widget/product/detail/RProductUplanDetaiTabLoanInfo/RProductUplanDetaiTabLoanInfo.js", function(require, exports, module) {
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
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source)
                Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key])
        }
        return target
    }
      , React = require("common:node_modules/react/react")
      , List = require("common:widget/react-ui/RList/List")
      , service = (require("common:node_modules/moment/moment"),
    require("common:widget/ui/service/service-factory"))
      , p2pService = service.getService("p2p")
      , $statistic = (require("common:widget/ui/utils/utils"),
    require("common:node_modules/glpb-components-common/src/index").weStatistic)
      , RProductUplanDetaiTabLoanInfo = function(_React$Component) {
        function RProductUplanDetaiTabLoanInfo(props) {
            _classCallCheck(this, RProductUplanDetaiTabLoanInfo),
            _React$Component.call(this, props),
            this.state = {
                loaners: null,
                isLoading: !1,
                listDOM: null
            },
            this.checkMoreClick = this.checkMoreClick.bind(this)
        }
        return _inherits(RProductUplanDetaiTabLoanInfo, _React$Component),
        RProductUplanDetaiTabLoanInfo.prototype.componentWillMount = function() {
            this.getLoaners()
        }
        ,
        RProductUplanDetaiTabLoanInfo.prototype.getLoaners = function() {
            var _this = this;
            this.setState({
                isLoading: !0
            }),
            p2pService.getLoanToBidList({}).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                if (requestStatus === p2pService.STATUS.SUCCESS && 0 === status) {
                    var listDOM = _this.creatListDom(data);
                    _this.setState({
                        loaners: data,
                        isLoading: !1,
                        listDOM: listDOM
                    })
                } else {
                    {
                        data.message || "请求后端服务出错, 请稍后再试"
                    }
                    _this.setState({
                        isLoading: !1
                    })
                }
            }).caught(function() {
                _this.setState({
                    isLoading: !1
                })
            })
        }
        ,
        RProductUplanDetaiTabLoanInfo.prototype.checkMoreClick = function() {
            $statistic.eventRaw({
                eventId: "Click_plan_loan_list_more_info",
                extra: {}
            })
        }
        ,
        RProductUplanDetaiTabLoanInfo.prototype.createHeadDom = function() {
            return React.createElement("ul", {
                className: " fn-clear"
            }, React.createElement("li", {
                className: "order-li fn-left"
            }, React.createElement("span", {
                className: "order-span"
            }, "编号")), React.createElement("li", {
                className: "loan-li fn-left"
            }, React.createElement("span", {
                className: "loan-span"
            }, "借款说明")), React.createElement("li", {
                className: "amount-li fn-left"
            }, React.createElement("span", {
                className: "amount-span"
            }, "借款金额")), React.createElement("li", {
                className: "period-li fn-left"
            }, React.createElement("span", {
                className: "period-span"
            }, "借款期限")), React.createElement("li", {
                className: "check-li fn-left"
            }, React.createElement("span", {
                className: "check-span"
            })))
        }
        ,
        RProductUplanDetaiTabLoanInfo.prototype.createRowDom = function(item, index) {
            var className = index % 2 == 0 ? "ui-list-row fn-clear dark" : "ui-list-row fn-clear"
              , loanId = item.loanId
              , loanHref = "/loan-" + loanId + ".html"
              , title = item.title;
            return title && title.length > 12 && (title = title.substring(0, 12) + "..."),
            React.createElement("a", {
                href: loanHref,
                target: "_blank",
                onClick: this.checkMoreClick,
                className: "ui-list-row-wrap-a"
            }, React.createElement("ul", {
                className: className
            }, React.createElement("li", {
                className: "order-li fn-left"
            }, React.createElement("span", {
                className: "order-span"
            }, loanId)), React.createElement("li", {
                className: "loan-li fn-left"
            }, React.createElement("span", {
                className: "loan-span"
            }, title)), React.createElement("li", {
                className: "amount-li fn-left"
            }, React.createElement("span", {
                className: "amount-span"
            }, item.loanAmount, "元")), React.createElement("li", {
                className: "period-li fn-left"
            }, React.createElement("span", {
                className: "period-span"
            }, item.loanMonths, "个月")), React.createElement("li", {
                className: "check-li fn-left"
            }, React.createElement("span", {
                className: "btn-part-in"
            }, "查看详情"))))
        }
        ,
        RProductUplanDetaiTabLoanInfo.prototype.creatListDom = function(loaners) {
            var ajaxParams = {};
            return React.createElement("div", {
                id: "uplan-product-tab-loan-info-list"
            }, React.createElement(List, _extends({}, loaners, {
                moudleServiceName: "p2p",
                url: "getLoanToBidList",
                ajaxParams: ajaxParams,
                isHeadNeed: "yes",
                isHeadNeedOrder: "no",
                createHeadDom: this.createHeadDom,
                createRowDom: this.createRowDom.bind(this),
                noDataText: "暂无借款信息",
                startNum: 0,
                limit: 10,
                offset: 5
            })))
        }
        ,
        RProductUplanDetaiTabLoanInfo.prototype.render = function() {
            var state = (this.props,
            this.state)
              , detailInfo = this.props.detailInfo
              , financePlan = detailInfo.financePlan
              , financePlanType = financePlan.financePlanType
              , tipText = "温馨提示：该列表仅代表该期U享自动投标服务可能出借标的，实际出借后可在我的账户-该期U享自动投标服务详情页面查询实际投标情况";
            "PREMIUM" == financePlanType && (tipText = "温馨提示：该列表仅代表该期优选自动投标服务可能出借标的，实际出借后可在我的账户-该期优选自动投标服务详情页面查询实际投标情况");
            var listDOM = state.listDOM;
            return React.createElement("div", {
                id: "uplan-product-tab-loan-info"
            }, React.createElement("div", {
                className: "loan-info-record-tips"
            }, tipText), listDOM)
        }
        ,
        RProductUplanDetaiTabLoanInfo
    }(React.Component);
    module.exports = RProductUplanDetaiTabLoanInfo
});
;/*!/client/widget/product/detail/RProductUplanDetaiTabPerformance/RProductUplanDetaiTabPerformance.js*/
define("uplan:widget/product/detail/RProductUplanDetaiTabPerformance/RProductUplanDetaiTabPerformance.js", function(require, exports, module) {
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
      , service = (require("common:node_modules/moment/moment"),
    require("common:widget/ui/service/service-factory"))
      , uplanService = service.getService("uplan")
      , utils = require("common:widget/ui/utils/utils")
      , RProductUplanDetaiTabPerformance = function(_React$Component) {
        function RProductUplanDetaiTabPerformance(props) {
            _classCallCheck(this, RProductUplanDetaiTabPerformance),
            _React$Component.call(this, props),
            this.state = {
                data: null,
                errorMessage: ""
            }
        }
        return _inherits(RProductUplanDetaiTabPerformance, _React$Component),
        RProductUplanDetaiTabPerformance.prototype.componentWillMount = function() {
            var _this = this
              , props = this.props
              , detailInfo = props.detailInfo
              , financePlan = detailInfo.financePlan
              , financePlanId = financePlan.id;
            uplanService.getPlanResult({
                financePlanId: financePlanId
            }).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                if (requestStatus === uplanService.STATUS.SUCCESS && 0 === status) {
                    var financePlanVos = data.data.financePlanVos;
                    _this.setState({
                        data: financePlanVos[0]
                    })
                } else {
                    var message = data.message || "请求后端服务出错, 请稍后再试";
                    console.log("getPlanResult请求出错：" + message)
                }
            }).caught(function(msg) {
                console.log("getPlanResult请求出错：" + msg)
            })
        }
        ,
        RProductUplanDetaiTabPerformance.prototype.getUseTimeName = function(planStatus) {
            var statusName = "满额用时";
            switch (planStatus) {
            case 4:
                statusName = "加入中";
                break;
            case 5:
                statusName = "等待计息";
                break;
            case 6:
                statusName = "正在计息";
                break;
            default:
                statusName = "满额用时"
            }
            return statusName
        }
        ,
        RProductUplanDetaiTabPerformance.prototype.getUseTimeValue = function(planStatus, useTime) {
            var statusValue = null;
            return 4 != planStatus && 5 != planStatus && 6 != planStatus && (statusValue = useTime),
            statusValue
        }
        ,
        RProductUplanDetaiTabPerformance.prototype.getAmountName = function(planStatus) {
            var statusName = "可出借总金额";
            return (5 == planStatus || 6 == planStatus) && (statusName = "出借本金"),
            statusName
        }
        ,
        RProductUplanDetaiTabPerformance.prototype.getAmountValue = function(planStatus, amount, joinAmount) {
            var statusValue = null;
            return statusValue = 5 == planStatus || 6 == planStatus ? joinAmount ? utils.commaInteger(joinAmount) : "0" : amount ? utils.commaInteger(amount) : "0"
        }
        ,
        RProductUplanDetaiTabPerformance.prototype.getViewPlanResult = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlan = detailInfo.financePlan
              , planStatus = detailInfo.planStatus
              , joinAmount = detailInfo.joinAmount
              , data = this.state.data
              , reserveDate = null
              , bidCount = 0
              , borrowCount = 0
              , earnInterest = 0
              , provinceDist = null
              , provinces = -1
              , subPointCount = 0
              , statusUseTImeName = null
              , statusUseTImeValue = null
              , statusAmountName = null
              , statusAmountValue = null
              , amount = 0
              , fundsUseRate = 0
              , averageBidInterest = 0;
            if (amount = financePlan.amount,
            data) {
                var performance = this.state.data;
                reserveDate = performance.reserveDate,
                bidCount = performance.bidCount,
                borrowCount = performance.borrowCount,
                earnInterest = performance.earnInterest,
                earnInterest = earnInterest ? utils.commaFloat(earnInterest) : "0.00",
                subPointCount = performance.subPointCount;
                var useTime = performance.useTime;
                statusUseTImeName = this.getUseTimeName(planStatus),
                statusUseTImeValue = this.getUseTimeValue(planStatus, useTime),
                statusUseTImeName && (statusUseTImeValue || (statusUseTImeValue = "--")),
                provinceDist = performance.provinceDist,
                provinces = performance.provinces,
                statusAmountName = this.getAmountName(planStatus),
                statusAmountValue = this.getAmountValue(planStatus, amount, joinAmount),
                amount = performance.amount,
                amount = amount ? utils.commaInteger(amount) : 0,
                fundsUseRate = performance.fundsUseRate,
                fundsUseRate = fundsUseRate ? utils.commaFloat(fundsUseRate) : "0.00",
                averageBidInterest = performance.averageBidInterest,
                averageBidInterest = averageBidInterest ? utils.commaFloat(averageBidInterest) : "0.00"
            }
            return {
                reserveDate: reserveDate,
                bidCount: bidCount,
                borrowCount: borrowCount,
                earnInterest: earnInterest,
                provinceDist: provinceDist,
                provinces: provinces,
                subPointCount: subPointCount,
                statusUseTImeName: statusUseTImeName,
                statusUseTImeValue: statusUseTImeValue,
                statusAmountName: statusAmountName,
                statusAmountValue: statusAmountValue,
                amount: amount,
                fundsUseRate: fundsUseRate,
                averageBidInterest: averageBidInterest
            }
        }
        ,
        RProductUplanDetaiTabPerformance.prototype.getProvinceDom = function(provinceDist, provinces) {
            if (0 >= provinces)
                return null;
            var x = void 0
              , total = 0;
            for (x in provinceDist)
                total += Number(provinceDist[x]);
            var percentArr = []
              , proviceArr = []
              , allPercent = 0;
            for (x in provinceDist) {
                var percent = Math.floor(Number(provinceDist[x]) / total * 100);
                percent > 0 && (percentArr.push(percent),
                proviceArr.push(x)),
                allPercent += percent
            }
            if (provinceDist) {
                var leftPercent = 100 - allPercent;
                leftPercent > 0 && (percentArr.push(leftPercent),
                proviceArr.push("其它"))
            }
            var proviceItemDom = proviceArr.map(function(item, index) {
                return React.createElement("li", {
                    className: "fn-left",
                    key: index
                }, " ", React.createElement("span", {
                    className: "area-name"
                }, item), React.createElement("span", {
                    className: "area-percent"
                }, percentArr[index], "%"))
            });
            return React.createElement("div", {
                className: "loan-area-box borderTop"
            }, React.createElement("div", {
                className: "loan-area-title"
            }, "借款人地域分布"), React.createElement("ul", {
                className: "loan-area-items fn-clear"
            }, proviceItemDom))
        }
        ,
        RProductUplanDetaiTabPerformance.prototype.getPremiumP = function() {
            var _getViewPlanResult = this.getViewPlanResult()
              , reserveDate = _getViewPlanResult.reserveDate
              , bidCount = _getViewPlanResult.bidCount
              , borrowCount = _getViewPlanResult.borrowCount
              , earnInterest = _getViewPlanResult.earnInterest
              , subPointCount = _getViewPlanResult.subPointCount
              , amount = _getViewPlanResult.amount
              , fundsUseRate = _getViewPlanResult.fundsUseRate
              , averageBidInterest = _getViewPlanResult.averageBidInterest
              , provinceDist = _getViewPlanResult.provinceDist
              , provinces = _getViewPlanResult.provinces
              , provinceDom = this.getProvinceDom(provinceDist, provinces);
            return React.createElement("div", null, React.createElement("div", {
                className: "performance-publish-time"
            }, "发布时间：", reserveDate), React.createElement("div", {
                className: "performance-data-result"
            }, React.createElement("div", {
                className: "ui-performance-data-items fn-clear"
            }, React.createElement("ul", {
                className: "ui-performance-data-item w230 fn-left"
            }, React.createElement("li", {
                className: "item-name"
            }, "优选理财计划总额"), React.createElement("li", {
                className: "item-value"
            }, amount, "元")), React.createElement("ul", {
                className: "ui-performance-data-item w260 fn-left"
            }, React.createElement("li", {
                className: "item-name text-center"
            }, "资金利用率"), React.createElement("li", {
                className: "item-value text-center"
            }, fundsUseRate, "%")), React.createElement("ul", {
                className: "ui-performance-data-item w260 fn-left"
            }, React.createElement("li", {
                className: "item-name text-center"
            }, "自动投标"), React.createElement("li", {
                className: "item-value text-center"
            }, bidCount, "次")), React.createElement("ul", {
                className: "ui-performance-data-item w230 fn-left"
            }, React.createElement("li", {
                className: "item-name pl70"
            }, "平均年利率"), React.createElement("li", {
                className: "item-value pl70"
            }, averageBidInterest, "%"))), React.createElement("div", {
                className: "ui-performance-data-items fn-clear"
            }, React.createElement("ul", {
                className: "ui-performance-data-item w230 fn-left"
            }, React.createElement("li", {
                className: "item-name"
            }, "为用户赚取"), React.createElement("li", {
                className: "item-value"
            }, earnInterest, "元")), React.createElement("ul", {
                className: "ui-performance-data-item w260 fn-left"
            }, React.createElement("li", {
                className: "item-name  text-center"
            }, "加入本期优选用户"), React.createElement("li", {
                className: "item-value text-center "
            }, subPointCount, "位")), React.createElement("ul", {
                className: "ui-performance-data-item w260 fn-left"
            }, React.createElement("li", {
                className: "item-name  text-center"
            }, "得到帮助的借款者"), React.createElement("li", {
                className: "item-value  text-center"
            }, borrowCount, "位")))), React.createElement("div", {
                className: "loan-area fn-hide"
            }, provinceDom))
        }
        ,
        RProductUplanDetaiTabPerformance.prototype.getCommonP = function() {
            var _getViewPlanResult2 = this.getViewPlanResult()
              , reserveDate = _getViewPlanResult2.reserveDate
              , bidCount = _getViewPlanResult2.bidCount
              , borrowCount = _getViewPlanResult2.borrowCount
              , earnInterest = _getViewPlanResult2.earnInterest
              , subPointCount = _getViewPlanResult2.subPointCount
              , statusAmountName = (_getViewPlanResult2.statusUseTImeName,
            _getViewPlanResult2.statusUseTImeValue,
            _getViewPlanResult2.statusAmountName)
              , statusAmountValue = _getViewPlanResult2.statusAmountValue
              , provinceDist = _getViewPlanResult2.provinceDist
              , provinces = _getViewPlanResult2.provinces
              , provinceDom = this.getProvinceDom(provinceDist, provinces);
            return React.createElement("div", null, React.createElement("div", {
                className: "performance-publish-time"
            }, "发布时间：", reserveDate), React.createElement("div", {
                className: "performance-data-result"
            }, React.createElement("div", {
                className: "ui-performance-data-items fn-clear"
            }, React.createElement("ul", {
                className: "ui-performance-data-item w230 fn-left"
            }, React.createElement("li", {
                className: "item-name"
            }, "授权出借人数"), React.createElement("li", {
                className: "item-value "
            }, subPointCount, "位")), React.createElement("ul", {
                className: "ui-performance-data-item w260 fn-left"
            }, React.createElement("li", {
                className: "item-name text-center"
            }, "自动投标"), React.createElement("li", {
                className: "item-value text-center"
            }, bidCount, "次")), React.createElement("ul", {
                className: "ui-performance-data-item w260 fn-left"
            }, React.createElement("li", {
                className: "item-name text-center"
            }, "帮助借款用户"), React.createElement("li", {
                className: "item-value text-center"
            }, borrowCount, "位")), React.createElement("ul", {
                className: "ui-performance-data-item w230 fn-left"
            }, React.createElement("li", {
                className: "item-name pl70"
            }, "为用户赚取"), React.createElement("li", {
                className: "item-value pl70"
            }, earnInterest, "元"))), React.createElement("div", {
                className: "ui-performance-data-items fn-clear borderTop"
            }, React.createElement("ul", {
                className: "ui-performance-data-item w230 fn-left"
            }, React.createElement("li", {
                className: "item-name "
            }, statusAmountName), React.createElement("li", {
                className: "item-value "
            }, statusAmountValue, "元")))), React.createElement("div", {
                className: "loan-area fn-hide"
            }, provinceDom))
        }
        ,
        RProductUplanDetaiTabPerformance.prototype.render = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlan = detailInfo.financePlan
              , category = (financePlan.financePlanType,
            financePlan.category)
              , commonPerformance = null;
            return commonPerformance = "OLD" != category ? this.getCommonP() : this.getPremiumP(),
            React.createElement("div", {
                id: "ui-product-detail-tab-performance"
            }, commonPerformance)
        }
        ,
        RProductUplanDetaiTabPerformance
    }(React.Component);
    module.exports = RProductUplanDetaiTabPerformance
});
;/*!/client/widget/product/detail/RProductUplanDetaiTabReserve/RProductUplanDetaiTabReserve.js*/
define("uplan:widget/product/detail/RProductUplanDetaiTabReserve/RProductUplanDetaiTabReserve.js", function(require, exports, module) {
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
      , moment = require("common:node_modules/moment/moment")
      , service = require("common:widget/ui/service/service-factory")
      , uplanService = service.getService("uplan")
      , utils = require("common:widget/ui/utils/utils")
      , RProductUplanDetaiTabTntro = function(_React$Component) {
        function RProductUplanDetaiTabTntro(props) {
            _classCallCheck(this, RProductUplanDetaiTabTntro),
            _React$Component.call(this, props),
            this.state = {
                reserves: [],
                isLoading: !1
            }
        }
        return _inherits(RProductUplanDetaiTabTntro, _React$Component),
        RProductUplanDetaiTabTntro.prototype.componentDidMount = function() {
            var _this = this;
            this.setState({
                isLoading: !0
            });
            var detailInfo = this.props.detailInfo
              , financePlan = detailInfo.financePlan
              , id = financePlan.id;
            uplanService.getUplanProductReserveRecords({
                financePlanId: id
            }).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                if (requestStatus === uplanService.STATUS.SUCCESS && 0 === status)
                    _this.setState({
                        reserves: data.data,
                        isLoading: !1
                    });
                else {
                    {
                        data.message || "请求后端服务出错, 请稍后再试"
                    }
                    _this.setState({
                        isLoading: !1
                    })
                }
            }).caught(function() {
                _this.setState({
                    isLoading: "hide"
                })
            })
        }
        ,
        RProductUplanDetaiTabTntro.prototype.createRowDom = function() {
            var listItems = null
              , totalCount = 0
              , notPayMoney = 0
              , reserves = this.state.reserves;
            return listItems = reserves.length <= 0 ? React.createElement("div", {
                className: "list-no-data-text"
            }, "暂无预定记录") : reserves.map(function(item, index) {
                var ucodeId = item.ucodeId
                  , nickName = item.nickName
                  , investor = null !== ucodeId && nickName.length > 8 ? nickName.substr(0, 8) + "..." : nickName
                  , planAmount = item.planAmount
                  , createTime = item.createTime
                  , date = moment(createTime).format("YYYY-MM-DD HH:mm")
                  , reserveType = item.reserveType
                  , className = index % 2 == 0 ? "ui-list-row fn-clear dark" : "ui-list-row fn-clear"
                  , ucodeUsed = !1
                  , mobileUsed = !1
                  , weUsed = !1;
                item.ucodeId ? ucodeUsed = !0 : "MOBILE" === item.tradeMethod ? mobileUsed = !0 : "PC" === item.tradeMethod && (weUsed = !0),
                "未支付" == reserveType && (notPayMoney += planAmount),
                totalCount += 1;
                var sourceDom = null;
                return ucodeUsed && (sourceDom = React.createElement("i", {
                    className: "icon-we-ucode"
                })),
                mobileUsed && (sourceDom = React.createElement("i", {
                    className: "icon-we-shoujiicon"
                })),
                weUsed && (sourceDom = React.createElement("i", {
                    className: "icon-we-diannaoicon"
                })),
                React.createElement("ul", {
                    className: className
                }, React.createElement("li", {
                    className: "order-li fn-left"
                }, React.createElement("span", {
                    className: "order-span"
                }, index + 1)), React.createElement("li", {
                    className: "invester-li fn-left"
                }, React.createElement("span", {
                    className: "invester-span"
                }, investor)), React.createElement("li", {
                    className: "amount-li fn-left"
                }, React.createElement("span", {
                    className: "amount-span"
                }, planAmount, "元")), React.createElement("li", {
                    className: "join-time-li fn-left"
                }, React.createElement("span", {
                    className: "join-time-span"
                }, date)), React.createElement("li", {
                    className: "source-li fn-left"
                }, React.createElement("span", {
                    className: "source-span"
                }, sourceDom)), React.createElement("li", {
                    className: "status-li fn-left"
                }, React.createElement("span", {
                    className: "status-span"
                }, reserveType)))
            }),
            {
                listItems: listItems,
                notPayMoney: notPayMoney,
                totalCount: totalCount
            }
        }
        ,
        RProductUplanDetaiTabTntro.prototype.render = function() {
            var state = (this.props,
            this.state)
              , _createRowDom = this.createRowDom()
              , listItems = _createRowDom.listItems
              , notPayMoney = _createRowDom.notPayMoney
              , totalCount = _createRowDom.totalCount;
            notPayMoney = utils.commaInteger(notPayMoney),
            totalCount = utils.commaInteger(totalCount);
            var loadingClassName = "list-loading " + (state.isLoading ? "show" : "hide");
            return React.createElement("div", {
                id: "uplan-product-tab-join"
            }, React.createElement("div", {
                className: "list-info"
            }, "预定人次", React.createElement("i", null, totalCount), "人，未支付金额", React.createElement("i", null, notPayMoney), "元"), React.createElement("div", {
                id: "uplan-product-tab-reserve-list"
            }, React.createElement("ul", {
                className: "ui-list-head fn-clear"
            }, React.createElement("li", {
                className: "order-li fn-left"
            }, React.createElement("span", {
                className: "order-span"
            }, "序号")), React.createElement("li", {
                className: "invester-li fn-left"
            }, React.createElement("span", {
                className: "invester-span"
            }, "投资人")), React.createElement("li", {
                className: "amount-li fn-left"
            }, React.createElement("span", {
                className: "amount-span"
            }, "加入金额")), React.createElement("li", {
                className: "join-time-li fn-left"
            }, React.createElement("span", {
                className: "join-time-span"
            }, "预定时间")), React.createElement("li", {
                className: "source-li fn-left"
            }, React.createElement("span", {
                className: "source-span"
            }, "来源")), React.createElement("li", {
                className: "status-li fn-left"
            }, React.createElement("span", {
                className: "status-span"
            }, "状态"))), listItems), React.createElement("div", {
                className: loadingClassName
            }))
        }
        ,
        RProductUplanDetaiTabTntro
    }(React.Component);
    module.exports = RProductUplanDetaiTabTntro
});
;/*!/client/widget/product/detail/RProductUplanDetaiTab/RProductUplanDetaiTab.js*/
define("uplan:widget/product/detail/RProductUplanDetaiTab/RProductUplanDetaiTab.js", function(require, exports, module) {
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
      , TabWrap = require("common:widget/react-ui/RTabs/RTabs")
      , TabNavItem = TabWrap.TabNavItem
      , TabNav = TabWrap.TabNav
      , TabPanelItem = TabWrap.TabPanelItem
      , TabPanel = TabWrap.TabPanel
      , RTabs = TabWrap.RTabs
      , RProductUplanDetaiTabTntro = require("uplan:widget/product/detail/RProductUplanDetaiTabTntro/RProductUplanDetaiTabTntro")
      , RProductUplanDetaiTabQuestion = require("uplan:widget/product/detail/RProductUplanDetaiTabQuestion/RProductUplanDetaiTabQuestion")
      , RProductUplanDetaiTabJoined = require("uplan:widget/product/detail/RProductUplanDetaiTabJoined/RProductUplanDetaiTabJoined")
      , RProductUplanDetaiTabLoanInfo = require("uplan:widget/product/detail/RProductUplanDetaiTabLoanInfo/RProductUplanDetaiTabLoanInfo")
      , RProductUplanDetaiTabPerformance = require("uplan:widget/product/detail/RProductUplanDetaiTabPerformance/RProductUplanDetaiTabPerformance")
      , RProductUplanDetaiTabReserve = require("uplan:widget/product/detail/RProductUplanDetaiTabReserve/RProductUplanDetaiTabReserve")
      , $statistic = require("common:node_modules/glpb-components-common/src/index").weStatistic
      , utils = require("common:widget/ui/utils/utils")
      , RProductUplanDetaiTab = function(_React$Component) {
        function RProductUplanDetaiTab(props) {
            _classCallCheck(this, RProductUplanDetaiTab),
            _React$Component.call(this, props);
            var tabIndex = 0
              , isAutoScroll = !1
              , hashConf = utils.getHashConf();
            if (hashConf && hashConf.hasOwnProperty("tab")) {
                isAutoScroll = !0;
                var tempIndex = parseInt(hashConf.tab, 10) || 0;
                tabIndex = tempIndex
            }
            this.state = {
                selectedIndex: tabIndex,
                autoScrollOnMount: isAutoScroll
            },
            this.onTabRequestChange = this.onTabRequestChange.bind(this)
        }
        return _inherits(RProductUplanDetaiTab, _React$Component),
        RProductUplanDetaiTab.prototype.componentDidMount = function() {
            var _this = this;
            this.state.autoScrollOnMount && setTimeout(function() {
                try {
                    var con = ReactDOM.findDOMNode(_this.refs.tab);
                    con.scrollIntoView()
                } catch (e) {}
            }, 300)
        }
        ,
        RProductUplanDetaiTab.prototype.onTabRequestChange = function(index) {
            this.setState({
                selectedIndex: index
            }),
            this.loanInfoTabStatistics(index)
        }
        ,
        RProductUplanDetaiTab.prototype.loanInfoTabStatistics = function(index) {
            var detailInfo = this.props.detailInfo
              , financePlan = detailInfo.financePlan
              , financePlanType = financePlan.financePlanType
              , id = financePlan.id
              , eventId = "Click_U_plan_loan";
            "PREMIUM" == financePlanType && (eventId = "Click_premier_plan_loan");
            var isStatistic = "PREMIUM" != financePlanType && 3 == index && id > 56 && 310 >= id || "PREMIUM" != financePlanType && 2 == index && (56 >= id || id > 310) || "PREMIUM" == financePlanType && 2 == index;
            isStatistic && $statistic.eventRaw({
                eventId: eventId,
                extra: {}
            })
        }
        ,
        RProductUplanDetaiTab.prototype.getTabNavItemDom = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlan = detailInfo.financePlan
              , financePlanType = financePlan.financePlanType
              , id = financePlan.id
              , tabNavDom = null
              , navItemClass = "detail-tab-nav-item";
            return "PREMIUM" == financePlanType ? (navItemClass += " detail-tab-nav-item-4",
            tabNavDom = React.createElement(TabNav, null, React.createElement(TabNavItem, {
                className: navItemClass
            }, React.createElement("div", {
                className: "tab-title"
            }, "服务介绍")), React.createElement(TabNavItem, {
                className: navItemClass
            }, React.createElement("div", {
                className: "tab-title"
            }, "出借记录")), React.createElement(TabNavItem, {
                className: navItemClass
            }, React.createElement("div", {
                className: "tab-title"
            }, "借款信息")), React.createElement(TabNavItem, {
                className: navItemClass
            }, React.createElement("div", {
                className: "tab-title"
            }, "常见问题")))) : id > 56 && 310 >= id ? (navItemClass += " detail-tab-nav-item-6",
            tabNavDom = React.createElement(TabNav, null, React.createElement(TabNavItem, {
                className: navItemClass
            }, React.createElement("div", {
                className: "tab-title"
            }, "服务介绍")), React.createElement(TabNavItem, {
                className: navItemClass
            }, React.createElement("div", {
                className: "tab-title"
            }, "预定记录")), React.createElement(TabNavItem, {
                className: navItemClass
            }, React.createElement("div", {
                className: "tab-title"
            }, "出借记录")), React.createElement(TabNavItem, {
                className: navItemClass
            }, React.createElement("div", {
                className: "tab-title"
            }, "借款信息")), React.createElement(TabNavItem, {
                className: navItemClass
            }, React.createElement("div", {
                className: "tab-title"
            }, "服务业绩")), React.createElement(TabNavItem, {
                className: navItemClass
            }, React.createElement("div", {
                className: "tab-title"
            }, "常见问题")))) : (navItemClass += " detail-tab-nav-item-5",
            tabNavDom = React.createElement(TabNav, null, React.createElement(TabNavItem, {
                className: navItemClass
            }, React.createElement("div", {
                className: "tab-title"
            }, "服务介绍")), React.createElement(TabNavItem, {
                className: navItemClass
            }, React.createElement("div", {
                className: "tab-title"
            }, "出借记录")), React.createElement(TabNavItem, {
                className: navItemClass
            }, React.createElement("div", {
                className: "tab-title"
            }, "借款信息")), React.createElement(TabNavItem, {
                className: navItemClass
            }, React.createElement("div", {
                className: "tab-title"
            }, "服务业绩")), React.createElement(TabNavItem, {
                className: navItemClass
            }, React.createElement("div", {
                className: "tab-title"
            }, "常见问题")))),
            tabNavDom
        }
        ,
        RProductUplanDetaiTab.prototype.getTabPanelItemDom = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlan = detailInfo.financePlan
              , financePlanType = financePlan.financePlanType
              , id = financePlan.id
              , tabPanelDom = null;
            return tabPanelDom = "PREMIUM" == financePlanType ? React.createElement(TabPanel, null, React.createElement(TabPanelItem, {
                className: "uplan-detail-panel-item"
            }, React.createElement(RProductUplanDetaiTabTntro, this.props)), React.createElement(TabPanelItem, {
                className: "uplan-detail-panel-item"
            }, React.createElement(RProductUplanDetaiTabJoined, this.props)), React.createElement(TabPanelItem, {
                className: "uplan-detail-panel-item"
            }, React.createElement(RProductUplanDetaiTabLoanInfo, this.props)), React.createElement(TabPanelItem, {
                className: "uplan-detail-panel-item"
            }, React.createElement(RProductUplanDetaiTabQuestion, this.props))) : id > 56 && 310 >= id ? React.createElement(TabPanel, null, React.createElement(TabPanelItem, {
                className: "uplan-detail-panel-item"
            }, React.createElement(RProductUplanDetaiTabTntro, this.props)), React.createElement(TabPanelItem, {
                className: "uplan-detail-panel-item"
            }, React.createElement(RProductUplanDetaiTabReserve, this.props)), React.createElement(TabPanelItem, {
                className: "uplan-detail-panel-item"
            }, React.createElement(RProductUplanDetaiTabJoined, this.props)), React.createElement(TabPanelItem, {
                className: "uplan-detail-panel-item"
            }, React.createElement(RProductUplanDetaiTabLoanInfo, this.props)), React.createElement(TabPanelItem, {
                className: "uplan-detail-panel-item"
            }, React.createElement(RProductUplanDetaiTabPerformance, this.props)), React.createElement(TabPanelItem, {
                className: "uplan-detail-panel-item"
            }, React.createElement(RProductUplanDetaiTabQuestion, this.props))) : React.createElement(TabPanel, null, React.createElement(TabPanelItem, {
                className: "uplan-detail-panel-item"
            }, React.createElement(RProductUplanDetaiTabTntro, this.props)), React.createElement(TabPanelItem, {
                className: "uplan-detail-panel-item"
            }, React.createElement(RProductUplanDetaiTabJoined, this.props)), React.createElement(TabPanelItem, {
                className: "uplan-detail-panel-item"
            }, React.createElement(RProductUplanDetaiTabLoanInfo, this.props)), React.createElement(TabPanelItem, {
                className: "uplan-detail-panel-item"
            }, React.createElement(RProductUplanDetaiTabPerformance, this.props)), React.createElement(TabPanelItem, {
                className: "uplan-detail-panel-item"
            }, React.createElement(RProductUplanDetaiTabQuestion, this.props)))
        }
        ,
        RProductUplanDetaiTab.prototype.render = function() {
            var TabNavDom = this.getTabNavItemDom()
              , TabPanelDom = this.getTabPanelItemDom();
            return React.createElement("div", {
                className: "container_12_1080 color-white-bg mt20",
                id: "uplan-product-tab"
            }, React.createElement(RTabs, {
                ref: "tab",
                onRequestChange: this.onTabRequestChange,
                selectedIndex: this.state.selectedIndex
            }, TabNavDom, TabPanelDom))
        }
        ,
        RProductUplanDetaiTab
    }(React.Component);
    module.exports = RProductUplanDetaiTab
});
;/*!/client/widget/product/detail/RProductUplanDetail/RProductUplanDetail.js*/
define("uplan:widget/product/detail/RProductUplanDetail/RProductUplanDetail.js", function(require, exports, module) {
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
      , RProductUplanDetailProduct = require("uplan:widget/product/detail/RProductUplanDetailProduct/RProductUplanDetailProduct")
      , RProductUplanDetailProcess = require("uplan:widget/product/detail/RProductUplanDetailProcess/RProductUplanDetailProcess")
      , RProductUplanDetaiTab = require("uplan:widget/product/detail/RProductUplanDetaiTab/RProductUplanDetaiTab")
      , RProductUplanDetail = function(_React$Component) {
        function RProductUplanDetail(props) {
            _classCallCheck(this, RProductUplanDetail),
            _React$Component.call(this, props)
        }
        return _inherits(RProductUplanDetail, _React$Component),
        RProductUplanDetail.prototype.render = function() {
            var props = this.props
              , detailInfo = (this.state,
            props.detailInfo);
            return React.createElement("div", null, React.createElement(RProductUplanDetailProduct, props), React.createElement(RProductUplanDetailProcess, {
                detailInfo: detailInfo
            }), React.createElement(RProductUplanDetaiTab, {
                detailInfo: detailInfo
            }))
        }
        ,
        RProductUplanDetail
    }(React.Component);
    module.exports = RProductUplanDetail
});
;/*!/client/widget/user/detail/RCashType/RCashType.js*/
define("uplan:widget/user/detail/RCashType/RCashType.js", function(require, exports, module) {
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
      , RForm = require("common:widget/react-ui/RForm/RForm")
      , service = (require("common:widget/ui/utils/utils"),
    require("common:widget/ui/service/service-factory"))
      , uplanService = service.getService("uplan")
      , RCashType = function(_React$Component) {
        function RCashType(props) {
            _classCallCheck(this, RCashType),
            _React$Component.call(this, props),
            this.onCashTypeChanged = this.onCashTypeChanged.bind(this),
            this.onSubmit = this.onSubmit.bind(this),
            this.state = {
                isLoading: !1,
                cashType: props.cashType
            }
        }
        return _inherits(RCashType, _React$Component),
        RCashType.prototype.onCashTypeChanged = function(e) {
            this.setState({
                cashType: e.currentTarget.value
            })
        }
        ,
        RCashType.prototype.onSubmit = function() {
            if (!this.state.isLoading) {
                var props = this.props
                  , financeSubPointId = (this.state,
                props.financeSubPointId)
                  , financeId = props.financeId
                  , cashType = this.state.cashType;
                this.setState({
                    isLoading: !0
                });
                var data = {
                    subPointId: financeSubPointId,
                    planId: financeId,
                    cashType: cashType
                };
                Promise.race([uplanService.doChangeCashType(data), new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        reject({
                            status: -99999,
                            message: "网络异常，请求超时，请稍后再测试"
                        })
                    }, 1e4)
                }
                )]).then(function(result) {
                    if (result.requestStatus !== uplanService.STATUS.SUCCESS)
                        return props.handleChangeCashType(data),
                        Promise.reject();
                    var _data = result.data;
                    0 == _data.status && (_data.message = "提款方式修改成功！"),
                    props.handleChangeCashType(_data)
                }).caught(function(data) {
                    data = data || {
                        status: -2,
                        message: "网络异常，请稍后再测试"
                    },
                    props.handleChangeCashType(data)
                })
            }
        }
        ,
        RCashType.prototype.render = function() {
            var state = (this.props,
            this.state)
              , cashTypeBtnProps = {
                className: "j-btn  j-btn-small  ",
                cancelClassName: "j-btn  j-btn-small j-btn-cancel",
                onClick: this.doRenewalCancel
            };
            return state.isLoading ? (cashTypeBtnProps.className += " j-btn-disabled ",
            cashTypeBtnProps.text = "确认中") : (cashTypeBtnProps.className += " j-btn-orange ",
            cashTypeBtnProps.text = "确 定"),
            React.createElement("div", {
                className: "user-uplan-cash-type"
            }, React.createElement(RForm, null, React.createElement("ul", null, React.createElement("li", {
                className: "mt10"
            }, React.createElement("div", null, React.createElement("input", {
                type: "radio",
                name: "cashTypeStr",
                value: "INVEST",
                checked: "INVEST" === this.state.cashType,
                onChange: this.onCashTypeChanged
            }), React.createElement("span", {
                className: "ml10 cash-type-name"
            }, "收益再投资")), React.createElement("p", {
                className: "user-uplan-cash-type-desc"
            }, "本优选理财计划所产生收益（利息及罚息）将在还款当日随本优选理财计划继续投标并获取收益。")), React.createElement("li", {
                className: "mt10"
            }, React.createElement("div", null, React.createElement("input", {
                type: "radio",
                name: "cashTypeStr",
                value: "RRD",
                checked: "RRD" === this.state.cashType,
                onChange: this.onCashTypeChanged
            }), React.createElement("span", {
                className: "ml10 cash-type-name"
            }, "当日提取至人人贷账户")), React.createElement("p", {
                className: "user-uplan-cash-type-desc"
            }, "本优选理财计划所产生收益（利息及罚息）依据所投各标的还款当日提取至人人贷账户，不收取任何费用。提至人人贷账户的收益将不再参与本优选理财计划再次投资。"))), React.createElement("div", {
                className: "ui-confirm-submit-box  mt20 text-center"
            }, React.createElement("div", {
                className: cashTypeBtnProps.cancelClassName,
                onClick: this.props.changeCashType
            }, "取消"), React.createElement("div", {
                className: cashTypeBtnProps.className,
                onClick: this.onSubmit
            }, cashTypeBtnProps.text))))
        }
        ,
        RCashType
    }(React.Component);
    module.exports = RCashType
});
;/*!/client/widget/user/detail/RCoupon/RCoupon.js*/
define("uplan:widget/user/detail/RCoupon/RCoupon.js", function(require, exports, module) {
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
      , RSelect = require("common:widget/react-ui/RSelect/RSelect")
      , RCoupon = (require("common:widget/ui/utils/utils"),
    function(_React$Component) {
        function RCoupon(props) {
            _classCallCheck(this, RCoupon),
            _React$Component.call(this, props)
        }
        return _inherits(RCoupon, _React$Component),
        RCoupon.prototype.render = function() {
            var props = this.props
              , cOptions = (this.state,
            props.cOptions)
              , couponId = props.couponId
              , couponOptions = {
                options: cOptions,
                className: "user-uplan-renewal-coupon-select",
                selectDefaultValue: couponId,
                noResultsText: "无可用加息券",
                selectChange: props.selectCouponChange
            };
            return React.createElement(RSelect, couponOptions)
        }
        ,
        RCoupon
    }(React.Component));
    module.exports = RCoupon
});
;/*!/client/widget/user/detail/RPeriod/RPeriod.js*/
define("uplan:widget/user/detail/RPeriod/RPeriod.js", function(require, exports, module) {
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
      , RSelect = require("common:widget/react-ui/RSelect/RSelect")
      , RPeriod = (require("common:widget/ui/utils/utils"),
    function(_React$Component) {
        function RPeriod(props) {
            _classCallCheck(this, RPeriod),
            _React$Component.call(this, props)
        }
        return _inherits(RPeriod, _React$Component),
        RPeriod.prototype.render = function() {
            var props = this.props
              , pOptions = (this.state,
            props.pOptions)
              , lockPeriod = props.lockPeriod
              , periodOptions = {
                options: pOptions,
                className: "user-uplan-renewal-period-select",
                selectDefaultValue: lockPeriod,
                selectChange: props.selectPeriodChange
            };
            return React.createElement(RSelect, periodOptions)
        }
        ,
        RPeriod
    }(React.Component));
    module.exports = RPeriod
});
;/*!/client/widget/user/detail/RUserPremiumDetailTransferUInfo/RUserPremiumDetailTransferUInfo.js*/
define("uplan:widget/user/detail/RUserPremiumDetailTransferUInfo/RUserPremiumDetailTransferUInfo.js", function(require, exports, module) {
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
      , moment = require("common:node_modules/moment/moment")
      , numeral = require("common:node_modules/numeral/numeral")
      , RUserPremiumDetailTransferUInfo = function(_React$Component) {
        function RUserPremiumDetailTransferUInfo(props) {
            _classCallCheck(this, RUserPremiumDetailTransferUInfo),
            _React$Component.call(this, props)
        }
        return _inherits(RUserPremiumDetailTransferUInfo, _React$Component),
        RUserPremiumDetailTransferUInfo.prototype.render = function() {
            var props = this.props
              , detailInfo = (this.state,
            props.detailInfo)
              , financePlanVo = detailInfo.financePlanVo
              , transformStatus = (detailInfo.canTransform,
            detailInfo.transformStatus)
              , transformPeriod = detailInfo.transformPeriod
              , transformTime = detailInfo.transformTime
              , transformCouponData = detailInfo.transformCouponData
              , transformRate = detailInfo.transformRate
              , nowTime = detailInfo.nowTime
              , scoreRecord = detailInfo.scoreRecord
              , planStatus = financePlanVo.planStatus
              , redFinishTime = financePlanVo.redFinishTime
              , titleExtraDom = null;
            if ("EXITED" == planStatus) {
                var redFinishTimeM = moment(parseInt(redFinishTime, 10)).format("YYYY-MM-DD")
                  , nowM = moment(nowTime).format("YYYY-MM-DD");
                moment(redFinishTimeM).isSame(nowM) && (titleExtraDom = React.createElement("li", {
                    className: "fn-right title-extra"
                }, React.createElement("em", null, "次日生效")))
            }
            var transformDate = transformTime ? moment(parseInt(transformTime, 10)).format("YYYY-MM-DD") : "--"
              , couponDom = null
              , couponTextDom = null;
            if (transformCouponData) {
                var couponType = transformCouponData.couponType
                  , isShort = transformCouponData.isShort
                  , value = transformCouponData.value;
                switch (value = value ? numeral(value).format("0,0") : value,
                couponType) {
                case "INCR_INTEREST":
                    var couponName = 1 == isShort ? "（短期）加息券" : "加息券";
                    couponTextDom = value + "%" + couponName;
                    break;
                case "DISCOUNT":
                    couponTextDom = value + "元抵扣券";
                    break;
                case "VOUCHER":
                    couponTextDom = value + "元现金券"
                }
                couponDom = React.createElement("li", {
                    className: "fn-left"
                }, "优惠券", React.createElement("em", null, couponTextDom))
            }
            var transformRateF = transformRate ? numeral(transformRate).format("0,0.00") + "%" : "以实际进入U享当天为准"
              , scoreDom = null;
            if (scoreRecord) {
                var premiumTransformScore = scoreRecord.premiumTransformScore
                  , premiumTransformScoreAmount = scoreRecord.premiumTransformScoreAmount;
                if (premiumTransformScore && premiumTransformScoreAmount) {
                    var premiumTransformScoreF = premiumTransformScore ? numeral(premiumTransformScore).format("0,0") : premiumTransformScore
                      , premiumTransformScoreAmountF = premiumTransformScoreAmount ? numeral(premiumTransformScoreAmount).format("0,0") : premiumTransformScoreAmount;
                    scoreDom = React.createElement("li", {
                        className: "fn-left"
                    }, "积分", React.createElement("em", null, "使用", premiumTransformScoreF, "积分抵扣", premiumTransformScoreAmountF, "元"))
                }
            }
            var dom = null;
            return 1 == transformStatus && (dom = React.createElement("div", {
                id: "wdg-detail-transfer-u-info",
                className: "container_12_1080 color-white-bg mt20"
            }, React.createElement("ul", {
                className: "ui-title fn-clear"
            }, React.createElement("li", {
                className: "fn-left"
            }, "转至U享信息"), titleExtraDom), React.createElement("div", {
                className: "transfer-u-info-content"
            }, React.createElement("ul", {
                className: "fn-clear"
            }, React.createElement("li", {
                className: "fn-left"
            }, "操作日", React.createElement("em", null, transformDate)), React.createElement("li", {
                className: "fn-left"
            }, "转至服务", React.createElement("em", null, "U享（服务期限", transformPeriod, "个月）")), React.createElement("li", {
                className: "fn-left"
            }, "扣费后年利率", React.createElement("em", null, transformRateF)), couponDom, scoreDom)))),
            React.createElement("div", null, dom)
        }
        ,
        RUserPremiumDetailTransferUInfo
    }(React.Component);
    module.exports = RUserPremiumDetailTransferUInfo
});
;/*!/client/widget/user/detail/RUserUplanSendSmsButton/RUserUplanSendSmsButton.js*/
define("uplan:widget/user/detail/RUserUplanSendSmsButton/RUserUplanSendSmsButton.js", function(require, exports, module) {
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
    function geetestInitCallback(obj) {
        captchaObj = obj,
        captchaObj.onReady(function() {}),
        captchaObj.onNextReady(function() {}),
        captchaObj.onClose(function() {}),
        captchaObj.onError(function() {
            captchaObj.reset()
        }),
        captchaObj.onSuccess(function() {
            var result = captchaObj.getValidate() || {}
              , verifData = {
                geetest_challenge: result.geetest_challenge,
                geetest_validate: result.geetest_validate,
                geetest_seccode: result.geetest_seccode
            };
            currentSuccessCallback(verifData)
        })
    }
    function noop() {}
    var React = require("common:node_modules/react/react")
      , $ = (require("common:node_modules/react-dom/index"),
    require("common:widget/lib/jquery/jquery"))
      , isInit = (require("common:widget/lib/gt/gt"),
    !1)
      , captchaObj = null
      , currentSuccessCallback = null
      , RSendSmsButton = function(_React$Component) {
        function RSendSmsButton(props) {
            _classCallCheck(this, RSendSmsButton),
            _React$Component.call(this, props),
            this.onUserClickBtn = this.onUserClickBtn.bind(this),
            this.onGeetestSuccess = this.onGeetestSuccess.bind(this),
            this.onBtnClick = this.onBtnClick.bind(this),
            this.countdown = this.countdown.bind(this),
            this.timer = null,
            this.state = {
                countdown: 0
            }
        }
        return _inherits(RSendSmsButton, _React$Component),
        RSendSmsButton.prototype.componentDidMount = function() {
            var _this = this
              , detailInfo = this.props.detailInfo || {}
              , geettest = detailInfo.geettest || {}
              , geetestData = geettest.geetestData
              , isGeetest = geettest.isGeetest;
            isGeetest ? (isInit || (isInit = !0,
            this.initGt(geetestData)),
            currentSuccessCallback = this.onGeetestSuccess) : $(".r-send-sms-btn").on("click", function() {
                _this.onBtnClick({})
            })
        }
        ,
        RSendSmsButton.prototype.isGeeTest = function() {
            var detailInfo = this.props.detailInfo || {}
              , geettest = detailInfo.geettest || {}
              , isGeetest = (geettest.geetestData,
            geettest.isGeetest);
            return !!isGeetest
        }
        ,
        RSendSmsButton.prototype.initGt = function(geetestData) {
            initGeetest({
                gt: geetestData.gt,
                challenge: geetestData.challenge,
                offline: !geetestData.success,
                new_captcha: geetestData.new_captcha,
                product: "bind",
                width: "300px",
                pure: 1
            }, geetestInitCallback)
        }
        ,
        RSendSmsButton.prototype.componentWillUnmount = function() {
            clearTimeout(this.timer)
        }
        ,
        RSendSmsButton.prototype.onUserClickBtn = function() {
            if (this.isGeeTest()) {
                var hasClass = $(".r-send-sms-btn").hasClass("j-btn-disabled");
                hasClass || captchaObj.verify()
            } else
                this.onBtnClick({})
        }
        ,
        RSendSmsButton.prototype.onGeetestSuccess = function(data) {
            this.onBtnClick(data)
        }
        ,
        RSendSmsButton.prototype.onBtnClick = function(verifData) {
            this.state.countdown > 0 || (this.setState({
                countdown: this.props.duration
            }, this.countdown),
            this.sendRequest(verifData))
        }
        ,
        RSendSmsButton.prototype.sendRequest = function(verifData) {
            var _this2 = this
              , props = this.props
              , finalData = props.data;
            finalData.geetest_challenge = verifData.geetest_challenge,
            finalData.geetest_validate = verifData.geetest_validate,
            finalData.geetest_seccode = verifData.geetest_seccode,
            "function" == typeof props.getData && (finalData = props.getData());
            var options = {
                url: props.url,
                data: finalData,
                method: props.method || "post",
                cache: !1,
                dataType: props.dataType || "json"
            };
            $.ajax(options).done(function(data) {
                _this2.props.handleData(data)
            }).fail(function() {
                _this2.props.handleData({
                    status: -2
                })
            }).always(function() {})
        }
        ,
        RSendSmsButton.prototype.countdown = function() {
            if (this.state.countdown > 0) {
                var temp = this.state.countdown - 1;
                this.setState({
                    countdown: temp
                }),
                temp > 0 && (this.timer = setTimeout(this.countdown, 1e3))
            }
        }
        ,
        RSendSmsButton.prototype.render = function() {
            var props = this.props
              , countdown = this.state.countdown
              , className = "r-send-sms-btn j-btn j-btn-orange " + (props.className || "")
              , text = "获取验证码";
            return countdown > 0 && (text = countdown + 1 + "s重新发送",
            className += " j-btn-disabled"),
            React.createElement("span", {
                className: className,
                onClick: this.onUserClickBtn
            }, text)
        }
        ,
        RSendSmsButton
    }(React.Component);
    RSendSmsButton.defaultProps = {
        className: "",
        duration: 30,
        method: "post",
        url: "",
        data: {},
        getData: null,
        handleData: noop
    },
    module.exports = RSendSmsButton
});
;/*!/client/widget/user/detail/RUserPremiumQuitDialog/RUserPremiumQuitDialog.js*/
define("uplan:widget/user/detail/RUserPremiumQuitDialog/RUserPremiumQuitDialog.js", function(require, exports, module) {
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
      , RDialog = require("common:widget/react-ui/RWeDialog/RWeDialog")
      , RSendSmsButton = require("uplan:widget/user/detail/RUserUplanSendSmsButton/RUserUplanSendSmsButton")
      , RForm = (require("common:widget/react-ui/RWETooltip/RWETooltip"),
    require("common:widget/react-ui/RForm/RForm"))
      , TextInput = RForm.TextInput
      , service = (RForm.ValidateProvider,
    require("common:widget/ui/service/service-factory"))
      , uplanService = service.getService("uplan")
      , moment = require("common:node_modules/moment/moment")
      , numeral = require("common:node_modules/numeral/numeral")
      , $statistic = require("common:node_modules/glpb-components-common/src/index").weStatistic
      , utils = require("common:widget/ui/utils/utils")
      , RUserPremiumQuitDialog = function(_React$Component) {
        function RUserPremiumQuitDialog(props) {
            _classCallCheck(this, RUserPremiumQuitDialog),
            _React$Component.call(this, props),
            this.doPremiumQuit = this.doPremiumQuit.bind(this),
            this.handleChange = this.handleChange.bind(this),
            this.handleSmsResponse = this.handleSmsResponse.bind(this),
            this.state = {
                premiumQuitData: null,
                isLoading: !1,
                errorMsg: "",
                isSendSms: -1,
                userQuitValue: "",
                isAll: -1,
                isAllBtnHasClick: !1,
                quitAllBtnClassName: "",
                geetestStart: !1
            }
        }
        return _inherits(RUserPremiumQuitDialog, _React$Component),
        RUserPremiumQuitDialog.prototype.componentWillMount = function() {
            var _this = this
              , detailInfo = this.props.detailInfo
              , financePlanVo = detailInfo.financePlanVo
              , resultObj = void 0;
            uplanService.getPremiumQuitInfo({
                subPointId: financePlanVo.financeSubPointId
            }).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                if (requestStatus === uplanService.STATUS.SUCCESS && 0 === status) {
                    var resultData = data.data || {}
                      , geetestStart = resultData.geetestStart
                      , userQuitValue = ""
                      , isAll = -1;
                    resultData.amount < 2e3 && (userQuitValue = resultData.amount,
                    isAll = 1),
                    _this.props.premiumQuitCallBack(),
                    $statistic.track("pc_premiumQuit_popup"),
                    _this.setState({
                        premiumQuitData: data.data,
                        userQuitValue: userQuitValue,
                        isAll: isAll,
                        geetestStart: geetestStart
                    })
                } else {
                    var message = data.message || "请求服务出错, 请稍后再试";
                    resultObj = {
                        status: status,
                        message: message || "网络异常，请稍后再试"
                    },
                    _this.props.handleResult(resultObj),
                    _this.props.premiumQuitCallBack(),
                    console.log("请求优选计划可退金额出错：" + message)
                }
            }).caught(function(msg) {
                resultObj = {
                    status: -2,
                    message: msg || "网络异常，请稍后再试"
                },
                _this.props.handleResult(resultObj),
                _this.props.premiumQuitCallBack(),
                console.log("请求优选计划可退金额出错：" + msg)
            })
        }
        ,
        RUserPremiumQuitDialog.prototype.handleSmsResponse = function(result) {
            if (result && 0 === result.status) {
                {
                    result.data
                }
                this.setState({
                    isSendSms: 1,
                    errorMsg: ""
                })
            } else {
                var message = result.message;
                this.setState({
                    errorMsg: message || "发送手机验证码出错, 请稍后再试"
                })
            }
        }
        ,
        RUserPremiumQuitDialog.prototype.doPremiumQuit = function() {
            var _this2 = this
              , state = this.state
              , props = this.props;
            if (!state.isLoading) {
                var userQuitValue = state.userQuitValue
                  , premiumQuitData = state.premiumQuitData
                  , amount = premiumQuitData.amount
                  , detailInfo = props.detailInfo
                  , financePlanVo = detailInfo.financePlanVo;
                if (amount != userQuitValue) {
                    if (!userQuitValue || userQuitValue.indexOf(" ") >= 0 || 0 === parseInt(userQuitValue, 10))
                        return this.setState({
                            errorMsg: "请输入1千的整数倍"
                        }),
                        !1;
                    if (amount >= 2e3) {
                        var extraVlaue = numeral(amount).subtract(userQuitValue).value();
                        if (0 != extraVlaue && 1e3 > extraVlaue)
                            return this.setState({
                                errorMsg: "退出后剩余金额金需≥1000元，请重新输入"
                            }),
                            !1;
                        if (userQuitValue % 1e3 != 0)
                            return this.setState({
                                errorMsg: "请输入1千的整数倍"
                            }),
                            !1
                    }
                }
                var validCode = (this.refs.smsInput.getValue() || "").trim();
                if (!validCode)
                    return void this.setState({
                        errorMsg: "请输入正确的短信验证码"
                    });
                var planId = financePlanVo.id
                  , subPointId = financePlanVo.financeSubPointId;
                $statistic.eventRaw({
                    eventId: 0 == state.isAll ? "Click_PC_YXdropout_confirmbtn" : "Click_PC_YXdropout_alloutbtn"
                }),
                uplanService.doPremiumQuit({
                    planId: planId,
                    subPointId: subPointId,
                    amount: state.userQuitValue,
                    isAll: state.isAll,
                    authCode: validCode
                }).then(function(result) {
                    var requestStatus = result.requestStatus
                      , data = result.data || {}
                      , status = data.status;
                    if (requestStatus === uplanService.STATUS.SUCCESS && 0 === status) {
                        var _result = data.data
                          , days = _result.days
                          , withdrawDate = _result.withdrawDate;
                        status = encodeURIComponent(status),
                        planId = encodeURIComponent(planId),
                        subPointId = encodeURIComponent(subPointId),
                        days = encodeURIComponent(days),
                        withdrawDate = encodeURIComponent(withdrawDate),
                        location.href = "/uplan/user/premiumResult?status=" + status + "&planId=" + planId + "&subPointId=" + subPointId + "&days=" + days + "&withdrawDate=" + withdrawDate
                    } else {
                        var message = data.message || "请求服务出错, 请稍后再试";
                        if (69006 == status || 69005 == status || -6 == status)
                            return _this2.setState({
                                errorMsg: message
                            }),
                            !1;
                        if (60011 === status) {
                            var _message = data.message;
                            return Promise.reject(_message)
                        }
                        message = encodeURIComponent(message),
                        status = encodeURIComponent(status),
                        location.href = "/uplan/user/premiumResult?message=" + message + "&status=" + status,
                        console.log("优选计划申请退出出错：" + message)
                    }
                }).caught(function(msg) {
                    var resultObj = {
                        status: -2,
                        message: msg || "网络异常，请稍后再试"
                    };
                    _this2.props.handleResult(resultObj),
                    console.log("优选计划申请退出出错：" + msg)
                })
            }
        }
        ,
        RUserPremiumQuitDialog.prototype.handleChange = function(e) {
            var target = e.target
              , value = target.value
              , _state = this.state
              , userQuitValue = _state.userQuitValue
              , premiumQuitData = _state.premiumQuitData;
            value = isNaN(value) ? userQuitValue : value;
            var amount = premiumQuitData.amount
              , isAll = 0
              , isAllBtnHasClick = !1;
            amount >= 2e3 && value >= amount && (isAll = 1,
            value = amount,
            isAllBtnHasClick = !0),
            this.setState({
                userQuitValue: value,
                isAll: isAll,
                isAllBtnHasClick: isAllBtnHasClick,
                errorMsg: ""
            })
        }
        ,
        RUserPremiumQuitDialog.prototype.setAllQuit = function() {
            $statistic.eventRaw({
                eventId: "Click_PC_YXdropout_alloutword"
            });
            var amount = this.state.premiumQuitData.amount;
            this.setState({
                isAllBtnHasClick: !0,
                isAll: 1,
                userQuitValue: amount,
                errorMsg: ""
            })
        }
        ,
        RUserPremiumQuitDialog.prototype.render = function() {
            var props = this.props
              , state = this.state
              , detailInfo = props.detailInfo
              , financePlanVo = detailInfo.financePlanVo
              , subPointId = financePlanVo.financeSubPointId
              , premiumQuitData = (financePlanVo.id,
            state.premiumQuitData);
            if (!premiumQuitData)
                return null;
            var isAllBtnHasClick = state.isAllBtnHasClick
              , amount = premiumQuitData.amount
              , withdrawDate = premiumQuitData.withdrawDate
              , mobile = premiumQuitData.mobile
              , amountV = amount ? utils.commaFloat(amount) : "0.00"
              , withdrawDateV = withdrawDate ? moment(withdrawDate).format("YYYY年MM月DD日") : "--";
            mobile = mobile ? mobile.replace(/(.{3}).+(.{4})/, "$1****$2") : "";
            var dialogProps = {
                showing: !0,
                title: "申请退出",
                dialog: {
                    className: "user-uplan-dialog user-premium-quit-dialog",
                    style: {
                        width: 700
                    }
                },
                onRequestClose: props.onRequestClose
            }
              , smsInputProps = {
                placeholder: "发送验证码",
                name: "authCode",
                ref: "smsInput"
            }
              , geettest = detailInfo.geettest;
            geettest.isGeetest = this.state.geetestStart;
            var smsSendBtnProps = {
                className: "sms-send-btn",
                method: "POST",
                url: "/uplan/user/premiumGeetestsendPhoneCode?platform=pc",
                data: {
                    subPointId: subPointId,
                    type: "PREMIUM_QUIT"
                },
                detailInfo: detailInfo,
                handleData: this.handleSmsResponse,
                duration: 60
            }
              , quitBtnProps = {
                className: "j-btn  j-btn-super-big "
            };
            quitBtnProps.className += state.isLoading ? " j-btn-disabled " : " j-btn-orange ";
            var placeholderDom = "请输入1千的整数倍"
              , inputDom = null
              , quitAllBtnClassName = "quit-all-value-btn"
              , inputItemClassName = "";
            if (quitBtnProps.text = 1 == state.isAll ? state.isLoading ? "全部退出中" : "全部退出" : state.isLoading ? "确认退出中" : "确认退出",
            2e3 > amount)
                inputDom = React.createElement("div", {
                    className: "value-width-2 "
                }, React.createElement("div", {
                    className: "input-wrapper"
                }, React.createElement("div", {
                    className: "quit-value-input"
                }, state.userQuitValue)));
            else {
                var allQuitBtnDom = isAllBtnHasClick ? React.createElement("div", {
                    className: quitAllBtnClassName + " noClick"
                }, "全部提现") : React.createElement("div", {
                    className: quitAllBtnClassName + " canClick",
                    onClick: this.setAllQuit.bind(this)
                }, "全部提现");
                inputDom = React.createElement("div", {
                    className: "value-width-2 "
                }, React.createElement("div", {
                    className: "input-wrapper"
                }, React.createElement("input", {
                    type: "text",
                    ref: "quit-value",
                    name: "quit-value",
                    className: "quit-value-input",
                    placeholder: placeholderDom,
                    value: state.userQuitValue,
                    onChange: this.handleChange,
                    maxLength: 9
                }), allQuitBtnDom))
            }
            return inputItemClassName = " input-item",
            React.createElement(RDialog, dialogProps, React.createElement("div", {
                className: "user-uplan-body premium-quit-body"
            }, React.createElement(RForm, null, React.createElement("div", {
                className: "premium-quit-bar"
            }, React.createElement("div", {
                className: "premium-quit-warning"
            }, React.createElement("img", {
                src: "https://www.we.com/cms/5864b0d6a24d131067ef7956/uplan/bulb2x.png"
            }), "温馨提示：如果您申请部分金额退出，退出后的剩余持有资产需≥1000元")), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "可退出金额"), React.createElement("span", {
                className: "value orange-highlight"
            }, amountV, "元")), React.createElement("div", {
                className: inputItemClassName + " info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "退出金额"), inputDom), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "短信验证码"), React.createElement("div", {
                className: "value-width-2"
            }, React.createElement("div", {
                className: "sms-input-con "
            }, React.createElement(TextInput, smsInputProps)), React.createElement(RSendSmsButton, smsSendBtnProps))), React.createElement("div", {
                className: "phone-desc"
            }, "接收短信验证码的手机号：", mobile), React.createElement("div", {
                className: "error-msg"
            }, state.errorMsg), React.createElement("div", {
                className: "ui-confirm-submit-box  mt10 text-center"
            }, React.createElement("input", {
                className: quitBtnProps.className,
                type: "button",
                value: quitBtnProps.text,
                onClick: this.doPremiumQuit
            }), React.createElement("div", {
                className: "premium-quit-tip"
            }, "预计", withdrawDateV, "开始退出")))))
        }
        ,
        RUserPremiumQuitDialog
    }(React.Component);
    module.exports = RUserPremiumQuitDialog
});
;/*!/client/widget/user/detail/RUserPremiumQuitRecord/RUserPremiumQuitRecord.js*/
define("uplan:widget/user/detail/RUserPremiumQuitRecord/RUserPremiumQuitRecord.js", function(require, exports, module) {
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
      , moment = (require("common:widget/lib/jquery/jquery"),
    require("common:node_modules/moment/moment"))
      , UserUplanRecord = function(_React$Component) {
        function UserUplanRecord(props) {
            _classCallCheck(this, UserUplanRecord),
            _React$Component.call(this, props)
        }
        return _inherits(UserUplanRecord, _React$Component),
        UserUplanRecord.prototype.createListHtml = function() {
            var quitRecord = this.props.quitRecord || {}
              , totalCount = quitRecord.totalCount || ""
              , quitData = quitRecord.list || ""
              , quitHtml = [];
            return totalCount > 0 && (quitHtml = quitData.map(function(index, x) {
                var applyQuitFinishTime = index.applyQuitFinishTime
                  , applyQuitFinishDate = moment(parseInt(applyQuitFinishTime)).format("YYYY年MM月DD日")
                  , applyQuitAmount = parseFloat(index.applyQuitAmount).toFixed(2)
                  , applyStatus = "DONE" == index.applyStatus ? React.createElement("span", null, "已完成") : React.createElement("span", {
                    className: "handle"
                }, "处理中");
                return React.createElement("li", {
                    key: x
                }, React.createElement("span", null, applyQuitFinishDate), React.createElement("span", null, applyQuitAmount + "元"), applyStatus)
            })),
            quitHtml
        }
        ,
        UserUplanRecord.prototype.render = function() {
            var detailInfo = this.props.detailInfo
              , financePlanVo = detailInfo.financePlanVo || {}
              , planStatus = financePlanVo.planStatus
              , financePlanType = financePlanVo.financePlanType
              , endLockingTime = financePlanVo.endLockingTime || ""
              , EndLockingTimeStr = endLockingTime ? endLockingTime + " 23:59:59" : ""
              , endLockingTimeStamp = moment(EndLockingTimeStr).format("x")
              , nowTime = moment().format("x")
              , quitRecord = this.props.quitRecord || {}
              , totalCount = quitRecord.totalCount || ""
              , isLockTime = nowTime > endLockingTimeStamp && "INPROGRESS" == planStatus
              , isExti = "EXITING" == planStatus || "EXITED" == planStatus;
            if ("PREMIUM" == financePlanType && (isLockTime || isExti) && totalCount) {
                var listData = this.createListHtml();
                return React.createElement("div", {
                    className: "quit-rcord"
                }, React.createElement("div", {
                    className: "quit-title"
                }, "退出记录"), React.createElement("ul", null, React.createElement("li", {
                    className: "gray-color"
                }, React.createElement("span", null, "预计到账时间"), React.createElement("span", null, "金额(元)"), React.createElement("span", null, "状态")), listData))
            }
            return null
        }
        ,
        UserUplanRecord
    }(React.Component);
    module.exports = UserUplanRecord
});
;/*!/client/widget/user/detail/RUserPremiumTransformDialog/RUserPremiumTransformDialog.js*/
define("uplan:widget/user/detail/RUserPremiumTransformDialog/RUserPremiumTransformDialog.js", function(require, exports, module) {
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
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source)
                Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key])
        }
        return target
    }
      , React = require("common:node_modules/react/react")
      , RDialog = (require("common:node_modules/moment/moment"),
    require("common:widget/react-ui/RWeDialog/RWeDialog"))
      , RWeStatusDialog = require("common:widget/react-ui/RWeStatusDialog/RWeStatusDialog")
      , RWETooltip = require("common:widget/react-ui/RWETooltip/RWETooltip")
      , RForm = require("common:widget/react-ui/RForm/RForm")
      , RPeriod = require("uplan:widget/user/detail/RPeriod/RPeriod")
      , RCoupon = require("uplan:widget/user/detail/RCoupon/RCoupon")
      , service = (RForm.TextInput,
    require("common:widget/ui/service/service-factory"))
      , uplanService = service.getService("uplan")
      , $statistic = (require("common:widget/ui/utils/utils"),
    require("common:node_modules/glpb-components-common/src/index").weStatistic)
      , numeral = (require("common:widget/react-ui/RToast/RToast"),
    require("common:node_modules/numeral/numeral"))
      , RUserPremiumTransformDialog = function(_React$Component) {
        function RUserPremiumTransformDialog(props) {
            _classCallCheck(this, RUserPremiumTransformDialog),
            _React$Component.call(this, props),
            this.state = {
                isLoading: !1,
                lockPeriod: null,
                couponId: null,
                showResult: !1,
                resultStatus: null,
                resultMsg: "",
                transformResultData: null,
                hadConfirmAgreement: !1,
                expectedRateUplan: "",
                canUseCoupon: {},
                scoreDeductChecked: !1,
                scoreDeductionData: null
            },
            this.needRisk = !1,
            this.subPointId = this.props.subPointId,
            this.doTransform = this.doTransform.bind(this),
            this.selectPeriodChange = this.selectPeriodChange.bind(this),
            this.selectCouponChange = this.selectCouponChange.bind(this),
            this.closePremiumTransformDialog = this.closePremiumTransformDialog.bind(this),
            this.confirmAgreement = this.confirmAgreement.bind(this),
            this.handleScoreDeductChecked = this.handleScoreDeductChecked.bind(this)
        }
        return _inherits(RUserPremiumTransformDialog, _React$Component),
        RUserPremiumTransformDialog.prototype.componentDidMount = function() {
            var _this = this;
            uplanService.premiumTransformInfo({
                subPointId: this.subPointId
            }).then(function(res) {
                if (res = res.data,
                0 !== res.status)
                    return Promise.reject({
                        message: res.message
                    });
                var data = res.data
                  , _ref = data.riskInfo || {}
                  , riskFlag = _ref.riskFlag
                  , isRisk = _ref.isRisk;
                riskFlag && !isRisk && (_this.needRisk = !0),
                _this.setState({
                    transformResultData: data,
                    lockPeriod: data.financePlanTemplate.lockPeriod,
                    expectedRateUplan: data.financePlanTemplate.expectedRateUplan,
                    canUseCoupon: data.couponMap
                }),
                _this.transformAmount = data.transformAmount,
                _this.financePlanName = data.financePlanName,
                _this.period = data.period,
                _this.planType = data.planType
            }).then(function() {
                return _this._getCouponList(),
                _this._getUserDeduction(),
                null
            })["catch"](function(e) {
                _this.setState({
                    showResult: !0,
                    resultStatus: -9999,
                    resultMsg: e.message || "网络异常，请稍后再试"
                })
            }),
            $statistic.track("enter_toUplan_page_pc")
        }
        ,
        RUserPremiumTransformDialog.prototype._getUserDeduction = function() {
            var _this2 = this;
            this.transformAmount && uplanService.getUserDeduction({
                amount: this.transformAmount
            }).then(function(res) {
                if (res = res.data,
                0 === res.status) {
                    var scoreDeductionData = res.data;
                    _this2.setState({
                        scoreDeductionData: scoreDeductionData
                    })
                }
            })["catch"](function(e) {
                _this2.setState({
                    showResult: !0,
                    resultStatus: -9999,
                    resultMsg: e.message || "网络异常，请稍后再试"
                })
            })
        }
        ,
        RUserPremiumTransformDialog.prototype._getCouponList = function() {
            var _this3 = this
              , _state = this.state
              , lockPeriod = _state.lockPeriod
              , canUseCoupon = _state.canUseCoupon;
            this.transformAmount && this.period && uplanService.premiumTransformCoupon({
                transformAmount: this.transformAmount,
                financePlanName: this.financePlanName,
                period: this.period,
                renewalLockPeriod: lockPeriod
            }).then(function(res) {
                res = res.data,
                0 === res.status && (canUseCoupon[lockPeriod] = res.data,
                _this3.setState({
                    canUseCoupon: canUseCoupon
                }))
            })["catch"](function(e) {
                _this3.setState({
                    showResult: !0,
                    resultStatus: -9999,
                    resultMsg: e.message || "网络异常，请稍后再试"
                })
            })
        }
        ,
        RUserPremiumTransformDialog.prototype.closePremiumTransformDialog = function() {
            this.props.closeTransformDialog()
        }
        ,
        RUserPremiumTransformDialog.prototype.doTransform = function(e) {
            return this.state.hadConfirmAgreement ? ($statistic.track("click_ensure_toUplan_pc"),
            void e.target.submit()) : !1
        }
        ,
        RUserPremiumTransformDialog.prototype.confirmAgreement = function() {
            var state = this.state;
            this.setState({
                hadConfirmAgreement: !state.hadConfirmAgreement
            })
        }
        ,
        RUserPremiumTransformDialog.prototype.handleRateMap = function(selectFinancePlanTemplateList) {
            var json = {};
            return selectFinancePlanTemplateList && selectFinancePlanTemplateList.forEach(function(element) {
                var lockPeriod = element.lockPeriod
                  , expectedRateUplan = element.expectedRateUplan;
                json[lockPeriod] = expectedRateUplan
            }),
            json
        }
        ,
        RUserPremiumTransformDialog.prototype.handleScoreDeductChecked = function(e) {
            var state = this.state
              , classNames = e.target.className;
            classNames.indexOf("disabled") > -1 || this.setState({
                scoreDeductChecked: !state.scoreDeductChecked
            })
        }
        ,
        RUserPremiumTransformDialog.prototype.getPeriodOptions = function(selectFinancePlanTemplateList) {
            var options = [];
            return selectFinancePlanTemplateList && selectFinancePlanTemplateList.forEach(function(element) {
                var lockPeriod = element.lockPeriod
                  , labelV = "U享（服务期限" + lockPeriod + "个月）"
                  , obj = {
                    value: lockPeriod,
                    label: labelV
                };
                options.push(obj)
            }),
            options
        }
        ,
        RUserPremiumTransformDialog.prototype.getCouponOptions = function(couponMap, period) {
            var options = []
              , coupons = [];
            return couponMap && couponMap[period] && (coupons = couponMap[period]),
            coupons.length > 0 ? (coupons.sort(function(a, b) {
                return "INCR_INTEREST" === a.couponType && "INCR_INTEREST" === b.couponType ? a.couponValue > b.couponValue ? -1 : 1 : "INCR_INTEREST" === a.couponType ? -1 : "INCR_INTEREST" === b.couponType ? 1 : a.couponValue > b.couponValue ? -1 : a.couponValue < b.couponValue ? 1 : a.batchExpireTime < b.batchExpireTime ? -1 : 1
            }),
            coupons.some(function(element) {
                var type = element.couponTypeEng
                  , couponId = element.couponId
                  , couponValue = element.couponValue
                  , labelV = "";
                if ("VOUCHER" == type)
                    labelV = couponValue + "元现金券";
                else {
                    if ("DISCOUNT" != type)
                        return !1;
                    labelV = couponValue + "元抵扣券"
                }
                var obj = {
                    value: couponId,
                    label: labelV
                };
                options.push(obj)
            }),
            options.push({
                value: -1,
                label: "不使用优惠券"
            })) : options = [{
                value: -1,
                label: "无可用优惠券"
            }],
            options
        }
        ,
        RUserPremiumTransformDialog.prototype.selectPeriodChange = function(val) {
            var _this4 = this
              , transformResultData = this.state.transformResultData
              , expectedRateUplanMap = this.handleRateMap(transformResultData.selectFinancePlanTemplateList);
            this.setState({
                lockPeriod: val,
                couponId: null,
                expectedRateUplan: expectedRateUplanMap[val],
                scoreDeductChecked: !1
            }, function() {
                _this4._getCouponList()
            })
        }
        ,
        RUserPremiumTransformDialog.prototype.selectCouponChange = function(val) {
            this.setState({
                couponId: val
            })
        }
        ,
        RUserPremiumTransformDialog.prototype.getConfirmBtn = function() {
            var state = this.state
              , btnClassName = "j-btn  j-btn-super-big "
              , btnText = "确认"
              , couponText = null;
            this.needRisk ? (btnClassName += " j-btn-orange ",
            btnText = "先测评，再转至U享",
            couponText = "为了向您提供更优质的服务，保护您的合法权益，请您配合完成测试") : state.isLoading ? (btnClassName += " j-btn-disabled ",
            btnText = "确认中") : btnClassName += " j-btn-orange ";
            var btnDom = this.needRisk ? React.createElement("a", {
                className: btnClassName,
                style: {
                    color: "#fff"
                },
                href: "/user/risk/riskPc?type=premium2Uplan&financePlanId=" + state.transformResultData.financePlanId + "&subPointId=" + state.transformResultData.subPointId
            }, btnText) : React.createElement("input", {
                className: btnClassName,
                type: "submit",
                value: btnText
            });
            return React.createElement("div", null, React.createElement("div", {
                className: "ui-confirm-submit-box  mt30 text-center"
            }, btnDom), React.createElement("div", {
                className: "confirm-text"
            }, couponText))
        }
        ,
        RUserPremiumTransformDialog.prototype.renderResult = function() {
            var _state2 = this.state
              , resultStatus = _state2.resultStatus
              , resultMsg = _state2.resultMsg
              , conentDom = React.createElement("div", null, resultMsg)
              , buttons = [{
                text: "我知道了",
                event: this.closePremiumTransformDialog,
                skin: "orange"
            }]
              , dialogProps = {
                onRequestClose: this.closePremiumTransformDialog,
                buttons: buttons,
                status: resultStatus,
                message: conentDom
            };
            return React.createElement(RWeStatusDialog, dialogProps)
        }
        ,
        RUserPremiumTransformDialog.prototype.renderTransformDialog = function() {
            var _this5 = this
              , state = this.state
              , transformResultData = state.transformResultData
              , scoreDeductionData = state.scoreDeductionData;
            if (!transformResultData)
                return null;
            var dialogProps = {
                showing: !0,
                dialog: {
                    className: "user-uplan-dialog premium-transform-dialog",
                    style: {
                        width: 700
                    }
                },
                onRequestClose: this.closePremiumTransformDialog
            }
              , leftAmountFormat = (transformResultData.leftAmount,
            transformResultData.leftAmountFormat)
              , transformAmountFormat = transformResultData.transformAmountFormat
              , financePlanTemplate = transformResultData.financePlanTemplate
              , selectFinancePlanTemplateList = transformResultData.selectFinancePlanTemplateList
              , quitDate = transformResultData.quitDate
              , financePlanId = transformResultData.financePlanId
              , transformYellowTip = "确认转至U享服务后，当期优选服务预计" + quitDate + "完成退出，退出完成次日进入U享服务"
              , formProps = {
                action: "/uplan/user/premiumTransform",
                method: "post",
                id: "uer-premium-transform-form"
            }
              , stateLockPeriod = state.lockPeriod || financePlanTemplate.lockPeriod
              , lockPeriodOptions = this.getPeriodOptions(selectFinancePlanTemplateList)
              , couponOptions = this.getCouponOptions(state.canUseCoupon, stateLockPeriod)
              , stateCouponId = state.couponId || couponOptions[0].value
              , scoreTooltipProps = {
                id: "user-premium-transfer-tooltip-01",
                place: "left",
                tip: '<div style="padding-top:5px;padding-bottom:5px;line-height:22px;">\n                    <span>1、100积分可抵扣1元人民币，抵现时使用积分为100的整数倍。<br></span>\n                    <span>2、单笔最多用积分抵扣转投金额的1%。<br></span>\n                    <span>3、转投至12个月及以上期限可用。<br></span>\n                    <span>4、抵扣金额在操作转投后发放至您的账户。<br></span>\n                </div>\n                ',
                delayHide: 100
            }
              , scoreDeductDom = null;
            if (scoreDeductionData && stateLockPeriod >= 12) {
                var scoreDeductExtraDom = null
                  , disabledClassName = ""
                  , deductionScore = scoreDeductionData.deductionScore
                  , deductionAmount = scoreDeductionData.deductionAmount
                  , availableScore = scoreDeductionData.availableScore
                  , availableScoreF = availableScore ? numeral(availableScore).format("0,0") : 0
                  , deductionScoreF = deductionScore ? numeral(deductionScore).format("0,0") : 0
                  , deductionAmountF = deductionAmount ? numeral(deductionAmount).format("0,0") : 0;
                100 > availableScore ? (disabledClassName = "disabled",
                scoreDeductExtraDom = React.createElement("span", {
                    className: "score-deduct-extra"
                }, "共", availableScoreF, "，使用100可抵1元")) : scoreDeductExtraDom = React.createElement("span", {
                    className: "score-deduct-extra"
                }, "共", availableScoreF, "，使用", deductionScoreF, "抵", deductionAmountF, "元"),
                scoreDeductDom = React.createElement("div", {
                    className: "info-item fn-clear"
                }, React.createElement("span", {
                    className: "label"
                }, "积分抵扣", React.createElement(RWETooltip, scoreTooltipProps)), React.createElement("div", {
                    className: "value score-deduct-box"
                }, React.createElement("span", {
                    className: "score-deduct-agree-checkbox " + (state.scoreDeductChecked ? "icon-we-xuanzhong" : "icon-we-yuanquan") + "  " + disabledClassName,
                    onClick: function(e) {
                        return _this5.handleScoreDeductChecked(e)
                    }
                }), React.createElement("span", null, deductionAmountF, "元"), scoreDeductExtraDom))
            }
            return React.createElement(RDialog, dialogProps, React.createElement("div", {
                className: "user-uplan-body renewal-body"
            }, React.createElement("div", {
                className: "uplan-dialog-renewal-title"
            }, "确认转至U享", React.createElement("a", {
                href: "https://www.renrendai.com/help/investment/58732de5b436c50e334983c1",
                target: "_blank"
            }, "查看规则")), React.createElement("div", {
                className: "uplan-dialog-yellow-tip"
            }, React.createElement("img", {
                className: "light",
                src: "https://s0.renrendai.com/cms/5864b0d6a24d131067ef7956/premium/light.png"
            }), transformYellowTip), React.createElement(RForm, _extends({}, formProps, {
                onSubmit: this.doTransform
            }), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "转至服务"), React.createElement("div", {
                className: "value-width-3"
            }, React.createElement(RPeriod, {
                pOptions: lockPeriodOptions,
                selectPeriodChange: this.selectPeriodChange,
                lockPeriod: stateLockPeriod
            }))), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "预估出借本金"), React.createElement("span", {
                className: "value "
            }, transformAmountFormat, "元 ", React.createElement("i", {
                className: "rate-text"
            }, "预估剩余", leftAmountFormat, "元返回至账户余额"))), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "扣费后年利率"), React.createElement("span", {
                className: "value "
            }, state.expectedRateUplan, "%")), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "我的优惠券"), React.createElement("div", {
                className: "value-width-3"
            }, React.createElement(RCoupon, {
                cOptions: couponOptions,
                selectCouponChange: this.selectCouponChange,
                couponId: stateCouponId
            }))), scoreDeductDom, React.createElement("input", {
                type: "hidden",
                name: "subPointId",
                value: this.subPointId
            }), React.createElement("input", {
                type: "hidden",
                name: "couponId",
                value: stateCouponId
            }), React.createElement("input", {
                type: "hidden",
                name: "financePlanId",
                value: financePlanId
            }), React.createElement("input", {
                type: "hidden",
                name: "lockPeriod",
                value: stateLockPeriod
            }), React.createElement("input", {
                type: "hidden",
                name: "useScore",
                value: state.scoreDeductChecked ? 1 : 0
            }), React.createElement("div", {
                className: "fn-clear transfer-confirm-box"
            }, React.createElement("span", {
                className: "agree-checkbox " + (state.hadConfirmAgreement ? "icon-we-gouxuanicon" : "icon-we-weigouxuanicon"),
                onClick: this.confirmAgreement
            }), React.createElement("span", null, "我已阅读并同意签署 ", React.createElement("a", {
                href: "/p2p/contract/premiumTransformU?id=" + this.subPointId,
                target: "_blank"
            }, "《优选服务补充协议》")), React.createElement("p", {
                className: "confirm-agreement-tip " + (state.hadConfirmAgreement && "fn-hide")
            }, "请阅读并同意协议")), this.getConfirmBtn())))
        }
        ,
        RUserPremiumTransformDialog.prototype.render = function() {
            var showResult = this.state.showResult
              , dom = showResult ? this.renderResult() : this.renderTransformDialog();
            return dom
        }
        ,
        RUserPremiumTransformDialog
    }(React.Component);
    module.exports = RUserPremiumTransformDialog
});
;/*!/client/widget/user/detail/RUserUplanEarlyExitDialog/RUserUplanEarlyExitDialog.js*/
define("uplan:widget/user/detail/RUserUplanEarlyExitDialog/RUserUplanEarlyExitDialog.js", function(require, exports, module) {
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
      , RDialog = require("common:widget/react-ui/RWeDialog/RWeDialog")
      , RSendSmsButton = require("uplan:widget/user/detail/RUserUplanSendSmsButton/RUserUplanSendSmsButton")
      , RWETooltip = require("common:widget/react-ui/RWETooltip/RWETooltip")
      , RForm = require("common:widget/react-ui/RForm/RForm")
      , TextInput = RForm.TextInput
      , service = (RForm.ValidateProvider,
    require("common:widget/ui/service/service-factory"))
      , uplanService = service.getService("uplan")
      , utils = require("common:widget/ui/utils/utils")
      , RUserUplanEarlyExitDialog = function(_React$Component) {
        function RUserUplanEarlyExitDialog(props) {
            _classCallCheck(this, RUserUplanEarlyExitDialog),
            _React$Component.call(this, props),
            this.doEarlyExit = this.doEarlyExit.bind(this),
            this.handleSmsResponse = this.handleSmsResponse.bind(this),
            this.state = {
                isLoading: !1,
                errorMsg: "",
                isSendSms: -1
            }
        }
        return _inherits(RUserUplanEarlyExitDialog, _React$Component),
        RUserUplanEarlyExitDialog.prototype.handleSmsResponse = function(result) {
            if (result && 0 === result.status) {
                {
                    result.data
                }
                this.setState({
                    isSendSms: 1,
                    errorMsg: ""
                })
            } else {
                var message = result.message;
                this.setState({
                    errorMsg: message || "发送手机验证码出错, 请稍后再试"
                })
            }
        }
        ,
        RUserUplanEarlyExitDialog.prototype.doEarlyExit = function() {
            var _this = this;
            if (!this.state.isLoading) {
                {
                    var props = this.props
                      , detailInfo = props.detailInfo
                      , financePlanVo = detailInfo.financePlanVo
                      , validCode = (this.refs.smsInput.getValue() || "").trim();
                    this.state.isSendSms
                }
                if (!validCode)
                    return void this.setState({
                        errorMsg: "请输入手机验证码"
                    });
                this.setState({
                    isLoading: !0,
                    errorMsg: ""
                });
                var data = {
                    subPointId: financePlanVo.financeSubPointId,
                    planId: financePlanVo.id,
                    mobileValidCode: validCode
                };
                Promise.race([uplanService.doQuitAdvance(data), new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        reject({
                            status: -99999,
                            message: "网络异常，请求超时，请稍后再试"
                        })
                    }, 1e4)
                }
                )]).then(function(result) {
                    var data = result.data || {};
                    if (result.requestStatus !== uplanService.STATUS.SUCCESS) {
                        var message = data.message || "请求后端服务出错, 请稍后再试";
                        return Promise.reject(message)
                    }
                    0 == data.status && (data.message = "债权挂出中，待全部债权完成转让后即退出此期计划"),
                    _this.props.handleResult(data)
                }).caught(function(message) {
                    data = {
                        status: -2,
                        message: message || "网络异常，请稍后再试"
                    },
                    _this.props.handleResult(data)
                })
            }
        }
        ,
        RUserUplanEarlyExitDialog.prototype.render = function() {
            var props = this.props
              , state = this.state
              , detailInfo = props.detailInfo
              , interest = props.interest
              , financePlanVo = detailInfo.financePlanVo
              , financePlanType = financePlanVo.financePlanType
              , advanceQuitAmount = detailInfo.advanceQuitAmount
              , subPointId = (financePlanVo.id,
            financePlanVo.financeSubPointId)
              , name = financePlanVo.name
              , finalAmount = financePlanVo.finalAmount
              , quitRate = financePlanVo.quitRate;
            quitRate = quitRate.replace(".00", ".0");
            var advanceQuitAmountV = "" != quitRate ? advanceQuitAmount : 0;
            advanceQuitAmountV = advanceQuitAmountV ? utils.commaFloat(advanceQuitAmountV) : "0.00",
            finalAmount = finalAmount ? utils.commaFloat(finalAmount) : "0.00",
            isNaN(interest) || (interest = utils.commaFloat(interest),
            interest += "元");
            var uNameDom = "U享";
            "PREMIUM" == financePlanType && (uNameDom = "优选");
            var dialogProps = {
                showing: !0,
                title: "确认提前退出",
                dialog: {
                    className: "user-uplan-dialog user-uplan-early-exit-dialog",
                    style: {
                        width: 700
                    }
                },
                onRequestClose: props.onRequestClose
            }
              , smsInputProps = {
                placeholder: "发送验证码",
                name: "authCode",
                ref: "smsInput"
            }
              , smsSendBtnProps = {
                className: "sms-send-btn",
                method: "POST",
                url: "/uplan/user/sendGeetestPhoneCode?platform=pc",
                data: {
                    subPointId: subPointId
                },
                detailInfo: detailInfo,
                handleData: this.handleSmsResponse
            }
              , quitBtnProps = {
                className: "j-btn  j-btn-super-big ",
                onClick: this.doBuy
            };
            state.isLoading ? (quitBtnProps.className += " j-btn-disabled ",
            quitBtnProps.text = "确认中") : (quitBtnProps.className += " j-btn-orange ",
            quitBtnProps.text = "确 定");
            var tooltipProps01 = {
                id: "user-uplan-tooltip-ee-01",
                place: "right",
                tip: "此为预估值，具体以实际收到金额为准"
            }
              , tooltipProps02 = {
                id: "user-uplan-tooltip-ee-02",
                place: "right",
                tip: "加入金额*" + quitRate + "%"
            };
            return React.createElement(RDialog, dialogProps, React.createElement("div", {
                className: "user-uplan-body early-exit-body"
            }, React.createElement(RForm, null, React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "退出期数"), React.createElement("span", {
                className: "value orange-highlight"
            }, name)), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "加入本金"), React.createElement("span", {
                className: "value "
            }, finalAmount, "元")), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "预计回收金额"), React.createElement("span", {
                className: "value "
            }, interest, React.createElement(RWETooltip, tooltipProps01))), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "提前退出费用"), React.createElement("span", {
                className: "value "
            }, advanceQuitAmountV, "元", React.createElement(RWETooltip, tooltipProps02))), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "手机验证码"), React.createElement("div", {
                className: "value-width-2"
            }, React.createElement("div", {
                className: "sms-input-con "
            }, React.createElement(TextInput, smsInputProps)), React.createElement(RSendSmsButton, smsSendBtnProps))), React.createElement("div", {
                className: "error-msg"
            }, state.errorMsg), React.createElement("div", {
                className: "ui-confirm-submit-box  mt10 text-center"
            }, React.createElement("div", {
                className: quitBtnProps.className,
                onClick: this.doEarlyExit
            }, quitBtnProps.text)), React.createElement("div", {
                className: "notice-con notice-con-mt40"
            }, React.createElement("div", {
                className: "notice-title"
            }, "温馨提示"), React.createElement("div", {
                className: "notice-desc "
            }, "点击“退出”后，该期", uNameDom, "所持有的债权将进行债权转让，系统会每日定时将出售债权所获得的资金转入您的主账户内，全部债权转让完成具体时间，由债权转让市场的交易情况而定。")))))
        }
        ,
        RUserUplanEarlyExitDialog
    }(React.Component);
    module.exports = RUserUplanEarlyExitDialog
});
;/*!/client/widget/user/detail/RUserUplanRenewalDialog/RUserUplanRenewalDialog.js*/
define("uplan:widget/user/detail/RUserUplanRenewalDialog/RUserUplanRenewalDialog.js", function(require, exports, module) {
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
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source)
                Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key])
        }
        return target
    }
      , React = require("common:node_modules/react/react")
      , moment = require("common:node_modules/moment/moment")
      , RDialog = require("common:widget/react-ui/RWeDialog/RWeDialog")
      , RWeStatusDialog = require("common:widget/react-ui/RWeStatusDialog/RWeStatusDialog")
      , RWETooltip = require("common:widget/react-ui/RWETooltip/RWETooltip")
      , RForm = require("common:widget/react-ui/RForm/RForm")
      , RPeriod = require("uplan:widget/user/detail/RPeriod/RPeriod")
      , RCoupon = require("uplan:widget/user/detail/RCoupon/RCoupon")
      , service = (RForm.TextInput,
    require("common:widget/ui/service/service-factory"))
      , uplanService = service.getService("uplan")
      , utils = require("common:widget/ui/utils/utils")
      , RUserUplanRenewalDialog = function(_React$Component) {
        function RUserUplanRenewalDialog(props) {
            _classCallCheck(this, RUserUplanRenewalDialog),
            _React$Component.call(this, props);
            var rolloverResultData = this.props.rolloverResultData || {}
              , financePlanTemplate = rolloverResultData.financePlanTemplate || {}
              , rollOverType = financePlanTemplate.financePlanType || "ROLL_OVER"
              , rollOverPrincipal = rolloverResultData.rollOverPrincipal
              , lockPeriod = financePlanTemplate.lockPeriod || null;
            "ROLL_OVER_PREMIUM" == rollOverType && (lockPeriod = -12),
            this.doRenewal = this.doRenewal.bind(this),
            this.selectCouponChange = this.selectCouponChange.bind(this),
            this.selectPeriodChange = this.selectPeriodChange.bind(this),
            this.jumpToRisk = this.jumpToRisk.bind(this),
            this.rollOverAmountChange = this.rollOverAmountChange.bind(this),
            this.getCouponList = this.getCouponList.bind(this),
            this.closeUplanRenewalResultDialog = this.closeUplanRenewalResultDialog.bind(this),
            this.setDeduction = this.setDeduction.bind(this),
            this.state = {
                isLoading: !1,
                errorMsg: "",
                couponId: null,
                period: lockPeriod,
                expectedRateUplan: null,
                rollOverType: rollOverType,
                cmbc: {},
                isShowResult: !1,
                resultDialog: {},
                rollOverAmount: rollOverPrincipal,
                rollOverAmountText: "",
                couponList: "",
                pointsData: "",
                isDeduction: !1
            }
        }
        return _inherits(RUserUplanRenewalDialog, _React$Component),
        RUserUplanRenewalDialog.prototype.jumpToRisk = function() {
            location.href = "/user/risk/riskPc?type=renewal"
        }
        ,
        RUserUplanRenewalDialog.prototype.jumpToBindCard = function() {
            location.href = "/user/trade/recharge"
        }
        ,
        RUserUplanRenewalDialog.prototype.getPeriodOptions = function(selectFinancePlanTemplateList) {
            var options = [];
            return selectFinancePlanTemplateList && selectFinancePlanTemplateList.forEach(function(element) {
                var lockPeriod = element.lockPeriod
                  , financePlanType = (element.expectedRateUplan,
                element.financePlanType)
                  , labelV = "";
                "ROLL_OVER_PREMIUM" == financePlanType ? (labelV = "优选（固定服务期限" + lockPeriod + "个月）",
                lockPeriod = -12) : labelV = "U享（" + lockPeriod + "个月）";
                var obj = {
                    value: lockPeriod,
                    label: labelV
                };
                options.push(obj)
            }),
            options
        }
        ,
        RUserUplanRenewalDialog.prototype.getCouponOptions = function(renewalCouponMap, period) {
            var options = [];
            if (renewalCouponMap) {
                var rollOverType = this.state.rollOverType;
                "ROLL_OVER_PREMIUM" == rollOverType && (period = -12);
                var coupons = renewalCouponMap;
                coupons.sort(function(a, b) {
                    return "INCR_INTEREST" === a.couponType && "INCR_INTEREST" === b.couponType ? a.couponValue > b.couponValue ? -1 : 1 : "INCR_INTEREST" === a.couponType ? -1 : "INCR_INTEREST" === b.couponType ? 1 : a.couponValue > b.couponValue ? -1 : a.couponValue < b.couponValue ? 1 : a.batchExpireTime < b.batchExpireTime ? -1 : 1
                }),
                coupons.forEach(function(element) {
                    var type = element.couponType
                      , couponId = element.couponId
                      , couponValue = element.couponValue
                      , batchExpireTime = new Date(element.batchExpireTime)
                      , expireTime = utils.formatDateAllTime(batchExpireTime)[2] || ""
                      , labelV = "";
                    if ("VOUCHER" == type)
                        labelV = couponValue + "元现金券/失效日期" + expireTime;
                    else if ("DISCOUNT" == type)
                        labelV = couponValue + "元抵用券/失效日期" + expireTime;
                    else {
                        var incrInterestRate = element.incrInterestRate
                          , incrInterestDays = element.incrInterestDays
                          , incrInterestCoupon = incrInterestDays ? incrInterestRate + "%加息券/" + incrInterestDays + "天/失效日期" + expireTime : incrInterestRate + "%加息券/失效日期" + expireTime;
                        labelV = "无可用优惠券" == incrInterestRate || "不使用优惠券" == incrInterestRate ? incrInterestRate : incrInterestCoupon
                    }
                    var obj = {
                        value: couponId,
                        label: labelV
                    };
                    options.push(obj)
                })
            }
            return options
        }
        ,
        RUserUplanRenewalDialog.prototype.getRenewalPoints = function() {
            var _this = this
              , state = this.state
              , _props$rolloverResultData = this.props.rolloverResultData
              , rolloverResultData = void 0 === _props$rolloverResultData ? {} : _props$rolloverResultData
              , rolloverScore = rolloverResultData.rolloverScore
              , hasRollOver = rolloverResultData.hasRollOver
              , data = {
                amount: state.rollOverAmount
            };
            1 == hasRollOver && (data.score = rolloverScore),
            uplanService.getUserDeduction(data).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                if (requestStatus === uplanService.STATUS.SUCCESS && 0 === status) {
                    var pointsData = data.data || [];
                    _this.setState({
                        pointsData: pointsData
                    })
                } else
                    _this.setState({
                        pointsData: ""
                    })
            }).caught(function() {
                _this.setState({
                    pointsData: ""
                })
            })
        }
        ,
        RUserUplanRenewalDialog.prototype.getCouponList = function() {
            var _this2 = this
              , state = this.state
              , rolloverResultData = this.props.rolloverResultData || {}
              , financePlanName = rolloverResultData.financePlanName
              , lockPeriod = rolloverResultData.period
              , period = state.period
              , rollOverType = state.rollOverType;
            period = Math.abs(period);
            var renewalBusinessCategory = "ROLL_OVER_PREMIUM" === rollOverType ? "PREMIUM" : "UPLAN"
              , data = {
                businessCategory: "U_PLAN_RENEWAL",
                renewalBusinessCategory: renewalBusinessCategory,
                lockPeriod: lockPeriod,
                renewalLockPeriod: period,
                businessName: financePlanName,
                payAmount: state.rollOverAmount,
                uplanType: "NORMAL"
            };
            uplanService.getUplanCouponList(data).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                if (requestStatus === uplanService.STATUS.SUCCESS && 0 === status) {
                    var couponData = data.data || []
                      , firstCoupon = couponData[0] || {}
                      , couponId = firstCoupon.couponId || 0;
                    _this2.setState({
                        couponList: data.data,
                        couponId: couponId
                    })
                } else {
                    var couponData = data.data || [];
                    _this2.setState({
                        couponList: couponData,
                        couponId: 0
                    })
                }
            }).caught(function(message) {
                _this2.setState({
                    couponList: [],
                    couponId: ""
                })
            })
        }
        ,
        RUserUplanRenewalDialog.prototype.componentWillMount = function() {
            this.getCouponList(),
            this.getRenewalPoints()
        }
        ,
        RUserUplanRenewalDialog.prototype.getExpectedRateUplanFromList = function(oldPeriod, oldExpectedRateUplan, selectFinancePlanTemplateList) {
            var expectedRateUplan = oldExpectedRateUplan
              , rollOverType = this.state.rollOverType;
            return selectFinancePlanTemplateList && selectFinancePlanTemplateList.forEach(function(element) {
                var lockPeriod = element.lockPeriod
                  , financePlanType = element.financePlanType;
                return oldPeriod = Math.abs(oldPeriod),
                oldPeriod == lockPeriod && rollOverType == financePlanType ? void (expectedRateUplan = element.expectedRateUplan) : void 0
            }),
            expectedRateUplan
        }
        ,
        RUserUplanRenewalDialog.prototype.getIncreaseRateUplanFromList = function(oldIncreaseRate, selCouponId, renewalCouponMap, period) {
            var increaseRate = oldIncreaseRate;
            if (renewalCouponMap) {
                var rollOverType = this.state.rollOverType;
                "ROLL_OVER_PREMIUM" == rollOverType && (period = -12);
                var coupons = renewalCouponMap;
                coupons.forEach(function(element) {
                    var incrInterestDays = element.incrInterestDays
                      , couponId = element.couponId
                      , incrInterestRate = incrInterestDays ? "" : element.incrInterestRate;
                    return selCouponId == couponId ? (incrInterestRate = "无可用优惠券" == incrInterestRate || "不使用优惠券" == incrInterestRate ? 0 : incrInterestRate,
                    void (increaseRate = incrInterestRate)) : void 0
                })
            }
            return increaseRate
        }
        ,
        RUserUplanRenewalDialog.prototype.selectPeriodChange = function(val) {
            var _this3 = this
              , rollOverType = "ROLL_OVER";
            -12 == val && (rollOverType = "ROLL_OVER_PREMIUM"),
            this.setState({
                period: val,
                rollOverType: rollOverType,
                couponId: null,
                isDeduction: !1
            }, function() {
                _this3.getCouponList()
            })
        }
        ,
        RUserUplanRenewalDialog.prototype.getDiscountAmount = function(selCouponId, renewalCouponMap, period) {
            var oldAmount = 0;
            if (renewalCouponMap) {
                var rollOverType = this.state.rollOverType;
                "ROLL_OVER_PREMIUM" == rollOverType && (period = -12);
                var coupons = renewalCouponMap;
                coupons.forEach(function(element) {
                    var couponId = element.couponId
                      , couponType = element.couponType;
                    return selCouponId != couponId || "VOUCHER" != couponType && "DISCOUNT" != couponType ? void 0 : void (oldAmount = element.couponValue || 0)
                })
            }
            return oldAmount
        }
        ,
        RUserUplanRenewalDialog.prototype.selectCouponChange = function(val) {
            this.setState({
                couponId: val
            })
        }
        ,
        RUserUplanRenewalDialog.prototype.closeUplanRenewalResultDialog = function() {
            this.props.onRequestClose(),
            location.reload()
        }
        ,
        RUserUplanRenewalDialog.prototype.renderResultDialog = function() {
            var state = this.state
              , resultDialog = state.resultDialog || {}
              , conentDom = null;
            conentDom = 0 == resultDialog.status ? "update" == resultDialog.type ? React.createElement("div", null, React.createElement("div", {
                className: "success-txt"
            }, "修改成功")) : React.createElement("div", null, React.createElement("div", {
                className: "success-txt"
            }, "续期申请已提交"), React.createElement("div", {
                className: "cash-back-txt"
            }, "您可在U享服务详情中查看")) : React.createElement("div", null, resultDialog.message);
            var buttons = [{
                text: "我知道了",
                event: this.closeUplanRenewalResultDialog,
                skin: "orange"
            }]
              , dialogProps = {
                onRequestClose: this.closeUplanRenewalResultDialog,
                buttons: buttons,
                status: resultDialog.status,
                message: conentDom
            };
            return React.createElement(RWeStatusDialog, dialogProps)
        }
        ,
        RUserUplanRenewalDialog.prototype.doUplanRenewal = function(rolloverData) {
            var _this4 = this;
            uplanService.doUplanRenewal(rolloverData).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                if (requestStatus === uplanService.STATUS.SUCCESS && 0 === status) {
                    var uplanData = data.data || {}
                      , authorized = uplanData.authorized;
                    1 != authorized ? _this4.setState({
                        cmbc: uplanData
                    }, function() {
                        _this4.refs.cmbcBank.submit()
                    }) : _this4.setState({
                        isShowResult: !0,
                        resultDialog: data
                    })
                } else
                    _this4.setState({
                        isShowResult: !0,
                        resultDialog: data
                    })
            }).caught(function(message) {
                var data = {
                    status: -2,
                    message: message || "网络异常，请稍后再试"
                };
                _this4.setState({
                    isShowResult: !0,
                    resultDialog: data
                })
            })
        }
        ,
        RUserUplanRenewalDialog.prototype.updateUplanRenewal = function(rolloverData) {
            var _this5 = this;
            uplanService.updateUplanRenewal(rolloverData).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                requestStatus === uplanService.STATUS.SUCCESS && 0 === status ? (data.type = "update",
                _this5.setState({
                    isShowResult: !0,
                    resultDialog: data
                })) : _this5.setState({
                    isShowResult: !0,
                    resultDialog: data
                })
            }).caught(function(message) {
                var data = {
                    status: -2,
                    message: message || "网络异常，请稍后再试"
                };
                _this5.setState({
                    isShowResult: !0,
                    resultDialog: data
                })
            })
        }
        ,
        RUserUplanRenewalDialog.prototype.doRenewal = function(e) {
            var state = this.state
              , rolloverResultData = this.props.rolloverResultData
              , currentTarget = e.currentTarget
              , hasRollOver = rolloverResultData.hasRollOver || "";
            if (!state.rollOverAmountText) {
                var rolloverData = {
                    subPointId: currentTarget.subPointId.value,
                    planId: currentTarget.planId.value,
                    period: currentTarget.period.value,
                    couponId: currentTarget.couponId.value,
                    rollOverType: currentTarget.rollOverType.value,
                    amount: state.rollOverAmount
                };
                1 == hasRollOver ? this.updateUplanRenewal(rolloverData) : (rolloverData.useScore = state.isDeduction ? 1 : 0,
                this.doUplanRenewal(rolloverData))
            }
        }
        ,
        RUserUplanRenewalDialog.prototype.getCalmEndObj = function() {
            var rolloverResultData = this.props.rolloverResultData
              , nowTime = rolloverResultData.nowTime || (new Date).getTime()
              , endLockingTime = parseInt(rolloverResultData.endLockingTime || 0);
            endLockingTime = moment(parseInt(endLockingTime)).startOf("day").format("x");
            var endLockingTimeBefore7Day = moment(parseInt(endLockingTime)).subtract(7, "day").format("x")
              , nowTimeAfter7Day = moment(nowTime).add(7, "day").format("x")
              , calmEndObj = {
                isEndLockingTimeBefore: !1,
                calmDate: ""
            };
            return nowTime >= endLockingTimeBefore7Day && (calmEndObj.isEndLockingTimeBefore = !0),
            calmEndObj.calmDate = Math.min(endLockingTimeBefore7Day, nowTimeAfter7Day),
            calmEndObj
        }
        ,
        RUserUplanRenewalDialog.prototype.render = function() {
            var props = this.props
              , state = this.state
              , rolloverResultData = props.rolloverResultData
              , subPointId = rolloverResultData.subPointId
              , planId = rolloverResultData.financePlanId
              , hasRollOver = rolloverResultData.hasRollOver || ""
              , calmEndDay = rolloverResultData.calmEndDay || ""
              , nodePayInfo = rolloverResultData.nodePayInfo
              , rollOverOrNot = 1
              , financePlanTemplate = rolloverResultData.financePlanTemplate
              , lockPeriod = financePlanTemplate.lockPeriod
              , expectedRateUplan = financePlanTemplate.expectedRateUplan
              , rollOverAmount = state.rollOverAmount
              , selectFinancePlanTemplateList = rolloverResultData.selectFinancePlanTemplateList
              , renewalCouponMap = state.couponList || []
              , firstCoupon = renewalCouponMap[0] || {}
              , firstIncrInterestRate = firstCoupon.incrInterestRate;
            firstIncrInterestRate = "不使用优惠券" === firstIncrInterestRate || "无可用优惠券" === firstIncrInterestRate ? 0 : firstIncrInterestRate;
            var defaultCouponIncrInterestRate = firstIncrInterestRate
              , rollOverType = this.state.rollOverType ? this.state.rollOverType : "ROLL_OVER"
              , allowQuitAdvance = rolloverResultData.allowQuitAdvance
              , stateLockPeriod = this.state.period ? this.state.period : lockPeriod
              , stateCouponId = this.state.couponId
              , pOptions = this.getPeriodOptions(selectFinancePlanTemplateList)
              , cOptions = this.getCouponOptions(renewalCouponMap, stateLockPeriod);
            if (cOptions.length > 0) {
                {
                    cOptions[0].value + ""
                }
                stateCouponId = stateCouponId || 0 == stateCouponId ? stateCouponId : cOptions[0].value
            }
            expectedRateUplan = this.getExpectedRateUplanFromList(stateLockPeriod, expectedRateUplan, selectFinancePlanTemplateList),
            defaultCouponIncrInterestRate = this.getIncreaseRateUplanFromList(defaultCouponIncrInterestRate, stateCouponId, renewalCouponMap, stateLockPeriod),
            expectedRateUplan = utils.commaFloat(expectedRateUplan),
            defaultCouponIncrInterestRate = utils.commaFloat(defaultCouponIncrInterestRate);
            var interestRateDom = 0 != defaultCouponIncrInterestRate ? expectedRateUplan + "%+" + defaultCouponIncrInterestRate + "%" : expectedRateUplan + "%"
              , discountAmount = this.getDiscountAmount(stateCouponId, renewalCouponMap, stateLockPeriod);
            discountAmount = utils.fixFloat2(discountAmount || 0);
            var dialogProps = {
                showing: !0,
                dialog: {
                    className: "user-uplan-dialog user-uplan-renewal-dialog",
                    style: {
                        width: 700
                    }
                },
                onRequestClose: props.onRequestClose
            }
              , renewalBtnProps = {
                className: "j-btn  j-btn-super-big "
            };
            if (state.isLoading)
                renewalBtnProps.className += " j-btn-disabled ",
                renewalBtnProps.text = "续期中";
            else {
                var amount = utils.commaInteger(rollOverAmount);
                renewalBtnProps.className += state.rollOverAmountText ? " j-btn-disabled " : " j-btn-orange ",
                renewalBtnProps.text = 1 == hasRollOver ? "确认修改" : "确认续期"
            }
            var btnDom = React.createElement("input", {
                className: renewalBtnProps.className,
                type: "submit",
                value: renewalBtnProps.text
            })
              , formProps = {
                action: "/uplan/user/rollOver",
                method: "POST",
                id: "uer-uplan-renewal-form"
            };
            if (nodePayInfo) {
                var bindStatus = nodePayInfo.bindStatus;
                (0 == bindStatus || 3 == bindStatus) && (btnDom = React.createElement("div", {
                    className: "j-btn  j-btn-super-big  j-btn-orange",
                    onClick: this.jumpToBindCard
                }, renewalBtnProps.text))
            }
            allowQuitAdvance = 0;
            var cmbc = state.cmbc || {}
              , isShowResult = state.isShowResult;
            if (isShowResult) {
                var renderResultDialog = this.renderResultDialog();
                return renderResultDialog
            }
            var titleName = "确认续期"
              , couponText = ""
              , canCancel = ""
              , calmEndObj = this.getCalmEndObj() || {};
            calmEndObj.isEndLockingTimeBefore ? couponText = "当前U享服务到期前7个自然日(含)内，确认续期后不可修改及取消" : canCancel = moment(parseInt(calmEndObj.calmDate || 0)).format("YYYY-MM-DD") + "前可修改/取消续期";
            var rollCoupon = rolloverResultData.rollCoupon
              , rolloverScoreAmount = rolloverResultData.rolloverScoreAmount;
            if (1 == hasRollOver) {
                var pointsData = this.state.pointsData
                  , _pointsData$deductionAmount = pointsData.deductionAmount
                  , deductionAmount = void 0 === _pointsData$deductionAmount ? 0 : _pointsData$deductionAmount
                  , deductionAmountData = deductionAmount || rolloverScoreAmount;
                if (Math.abs(stateLockPeriod) < 12 && (deductionAmountData = 0),
                state.rollOverAmountText && (deductionAmountData = 0),
                deductionAmountData = utils.commaNormal(deductionAmountData),
                titleName = "修改续期",
                canCancel = moment(parseInt(calmEndDay || 0)).format("YYYY-MM-DD") + "前可修改/取消续期",
                rollCoupon) {
                    var amount = "";
                    "DISCOUNT" == rollCoupon.couponType ? amount = rollCoupon.value + "元抵扣券" : "VOUCHER" == rollCoupon.couponType ? amount = rollCoupon.value + "元现金券" : "INCR_INTEREST" == rollCoupon.couponType && (amount = 1 == rollCoupon.isShort ? rollCoupon.value + "%（短期）加息券" : rollCoupon.value + "%加息券"),
                    couponText = rolloverScoreAmount ? "若确认修改后，您当前的续期享有" + amount + "和已使用积分将不予退还，实际使用积分抵扣" + deductionAmountData + "元。" : "您当前的续期享有" + amount + "，若确认修改后优惠券将不予退还。"
                } else
                    rolloverScoreAmount && (couponText = "若确认修改后，已使用积分将不予退还，实际使用积分抵扣" + deductionAmountData + "元。")
            }
            var canCancelText = "当前服务到期退出完成后，一般3个工作日内进入续期服务。" + canCancel
              , isDeductionPoint = !1;
            Math.abs(stateLockPeriod) >= 12 && (isDeductionPoint = !0);
            var deductionPointDom = this.renderDeductionPointDom(isDeductionPoint);
            return React.createElement(RDialog, dialogProps, React.createElement("div", {
                className: "user-uplan-body renewal-body"
            }, React.createElement("div", {
                className: "uplan-dialog-renewal-title"
            }, titleName, React.createElement("a", {
                href: "https://www.renrendai.com/help/investment/58732de5b436c50e334983c1",
                target: "_blank"
            }, "查看规则")), React.createElement("div", {
                className: "uplan-dialog-yellow-tip"
            }, React.createElement("img", {
                className: "light",
                src: "https://s0.renrendai.com/cms/5864b0d6a24d131067ef7956/premium/light.png"
            }), canCancelText), React.createElement(RForm, _extends({}, formProps, {
                onSubmit: this.doRenewal
            }), React.createElement("input", {
                name: "subPointId",
                type: "hidden",
                value: subPointId,
                readOnly: !0
            }), React.createElement("input", {
                name: "planId",
                type: "hidden",
                value: planId
            }), React.createElement("input", {
                name: "rollOverOrNot",
                type: "hidden",
                value: rollOverOrNot,
                readOnly: !0
            }), React.createElement("input", {
                name: "period",
                type: "hidden",
                value: stateLockPeriod,
                readOnly: !0
            }), React.createElement("input", {
                name: "couponId",
                type: "hidden",
                value: stateCouponId,
                readOnly: !0
            }), React.createElement("input", {
                name: "rollOverType",
                type: "hidden",
                value: rollOverType,
                readOnly: !0
            }), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "续期服务"), React.createElement("div", {
                className: "value-width-3"
            }, React.createElement(RPeriod, {
                pOptions: pOptions,
                selectPeriodChange: this.selectPeriodChange,
                lockPeriod: stateLockPeriod
            }))), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "预估续期本金"), React.createElement("div", {
                className: state.rollOverAmountText ? "input-width yellow-line" : "input-width"
            }, React.createElement("input", {
                className: "amount-width",
                placeholder: "1千的整数倍",
                type: "text",
                value: rollOverAmount,
                onChange: this.rollOverAmountChange
            }), React.createElement("span", null, "元")), React.createElement("div", {
                className: "error-text"
            }, state.rollOverAmountText)), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "预估扣费后年利率"), React.createElement("span", {
                className: "value "
            }, interestRateDom, React.createElement("i", {
                className: "rate-text"
            }, "以进入续期当天的扣费后年利率为准"))), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "我的优惠券"), React.createElement("div", {
                className: "value-width-3"
            }, React.createElement(RCoupon, {
                cOptions: cOptions,
                selectCouponChange: this.selectCouponChange,
                couponId: stateCouponId
            }))), deductionPointDom, React.createElement("div", {
                className: "ui-confirm-submit-box  mt30 text-center"
            }, btnDom), React.createElement("div", {
                className: "confirm-text"
            }, couponText))), React.createElement("div", {
                id: "cmbcRedirect"
            }, React.createElement("form", {
                id: "zxform",
                ref: "cmbcBank",
                action: cmbc.actionUrl,
                method: "post"
            }, React.createElement("input", {
                type: "hidden",
                id: "actionUrl",
                name: "actionUrl",
                value: cmbc.actionUrl
            }), React.createElement("input", {
                type: "hidden",
                id: "context",
                name: "context",
                value: cmbc.context
            }))))
        }
        ,
        RUserUplanRenewalDialog.prototype.renderDeductionPointDom = function(isDeductionPoint) {
            if (!isDeductionPoint)
                return null;
            var props = this.props
              , _props$rolloverResultData2 = props.rolloverResultData
              , rolloverResultData = void 0 === _props$rolloverResultData2 ? {} : _props$rolloverResultData2
              , _rolloverResultData$rolloverScore = rolloverResultData.rolloverScore
              , rolloverScore = void 0 === _rolloverResultData$rolloverScore ? 0 : _rolloverResultData$rolloverScore
              , _rolloverResultData$rolloverScoreAmount = rolloverResultData.rolloverScoreAmount
              , rolloverScoreAmount = void 0 === _rolloverResultData$rolloverScoreAmount ? 0 : _rolloverResultData$rolloverScoreAmount
              , hasRollOver = rolloverResultData.hasRollOver
              , _state = this.state
              , isDeduction = _state.isDeduction
              , pointsData = _state.pointsData
              , rollOverAmount = _state.rollOverAmount
              , rollOverAmountText = _state.rollOverAmountText
              , tooltipProps = {
                id: "product-uplan-renewal-tooltip",
                place: "right",
                tip: "1、100积分可抵扣1元人民币，抵现时使用积分为100的整数倍。<br/> 2、单笔最多用积分抵扣续期金额的1%。<br/>3、续期至优选、U享（服务期限≥12个月）时可用。<br/>4、实际抵扣金额在进入续期时发放至您的账户，且以进入续期时的服务期限和续期金额为准。<br/>5、修改/取消续期时，积分不予返还。",
                delayHide: 100
            };
            if (1 == hasRollOver) {
                if (!rolloverScoreAmount || !rolloverScore)
                    return null;
                var rolloverScoreString = utils.commaInteger(rolloverScore)
                  , _deductionAmount = pointsData && (pointsData.deductionAmount || 0)
                  , amount = _deductionAmount || rolloverScoreAmount;
                rollOverAmountText && (amount = 0),
                amount = utils.commaNormal(amount);
                var _totalAmount = React.createElement("span", {
                    className: "total-amount"
                }, amount + "元");
                return React.createElement("div", {
                    className: "info-item fn-clear"
                }, React.createElement("span", {
                    className: "label"
                }, "积分抵扣", React.createElement(RWETooltip, tooltipProps)), React.createElement("span", {
                    className: "value points-value"
                }, _totalAmount, React.createElement("span", {
                    className: "total-points"
                }, "使用" + rolloverScoreString + "积分抵扣" + amount + "元")))
            }
            var deductionData = pointsData || {}
              , _ref = deductionData || {}
              , _ref$availableScore = _ref.availableScore
              , availableScore = void 0 === _ref$availableScore ? 0 : _ref$availableScore
              , _ref$deductionScore = _ref.deductionScore
              , deductionScore = void 0 === _ref$deductionScore ? 0 : _ref$deductionScore
              , _ref$deductionAmount = _ref.deductionAmount
              , deductionAmount = void 0 === _ref$deductionAmount ? 0 : _ref$deductionAmount;
            availableScore = utils.commaInteger(availableScore || 0),
            deductionScore = utils.commaInteger(deductionScore);
            var deductionAmountString = utils.commaNormal(deductionAmount)
              , totalAmount = React.createElement("span", {
                className: "total-amount"
            }, deductionAmountString + "元")
              , pointsText = "共" + availableScore + "，使用" + deductionScore + "抵扣" + deductionAmountString + "元"
              , checkedDom = React.createElement("span", {
                onClick: this.setDeduction,
                className: "points-input Punchecked icon-we-yuanquan"
            });
            isDeduction && (checkedDom = React.createElement("span", {
                onClick: this.setDeduction,
                className: "points-input Pchecked icon-we-xuanzhong"
            }));
            var rollOverAmountIsZero = parseInt(rollOverAmount) || 0;
            return (0 >= deductionAmount || !rollOverAmountIsZero) && (pointsText = "共" + availableScore + "，使用100可抵扣1元",
            checkedDom = React.createElement("span", {
                className: "points-input Punchecked disabled"
            })),
            rollOverAmountIsZero || (totalAmount = null),
            React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "积分抵扣", React.createElement(RWETooltip, tooltipProps)), React.createElement("span", {
                className: "value points-value"
            }, checkedDom, totalAmount, React.createElement("span", {
                className: "total-points"
            }, pointsText)))
        }
        ,
        RUserUplanRenewalDialog.prototype.setDeduction = function() {
            var isDeduction = this.state.isDeduction;
            this.setState({
                isDeduction: !isDeduction
            })
        }
        ,
        RUserUplanRenewalDialog.prototype.rollOverAmountChange = function(e) {
            var _this6 = this
              , val = e.target.value
              , props = this.props
              , rolloverResultData = props.rolloverResultData
              , rollOverAmount = parseInt(rolloverResultData.rollOverAmount);
            if (isNaN(val))
                return this.setState({
                    rollOverAmountText: "请输入数字",
                    rollOverAmount: val
                });
            if (val > rollOverAmount)
                return this.setState({
                    rollOverAmountText: "最高预估续期金额为" + utils.commaInteger(rollOverAmount) + "元",
                    rollOverAmount: val
                });
            var integerMultiple = val % 1e3;
            return 1e3 > val || 0 !== integerMultiple ? this.setState({
                rollOverAmountText: "续期金额需为1千的整数倍",
                rollOverAmount: val
            }) : void this.setState({
                rollOverAmount: val,
                rollOverAmountText: ""
            }, function() {
                _this6.getCouponList(),
                _this6.getRenewalPoints()
            })
        }
        ,
        RUserUplanRenewalDialog
    }(React.Component);
    module.exports = RUserUplanRenewalDialog
});
;/*!/client/widget/user/detail/RUserUplanRenewalCancelDialog/RUserUplanRenewalCancelDialog.js*/
define("uplan:widget/user/detail/RUserUplanRenewalCancelDialog/RUserUplanRenewalCancelDialog.js", function(require, exports, module) {
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
      , RDialog = require("common:widget/react-ui/RWeDialog/RWeDialog")
      , RForm = require("common:widget/react-ui/RForm/RForm")
      , service = (require("common:widget/react-ui/RWETooltip/RWETooltip"),
    RForm.TextInput,
    require("common:widget/ui/service/service-factory"))
      , uplanService = service.getService("uplan")
      , utils = require("common:widget/ui/utils/utils")
      , RUserUplanRenewalCancelDialog = function(_React$Component) {
        function RUserUplanRenewalCancelDialog(props) {
            _classCallCheck(this, RUserUplanRenewalCancelDialog),
            _React$Component.call(this, props),
            this.doRenewalCancel = this.doRenewalCancel.bind(this),
            this.state = {
                isLoading: !1,
                errorMsg: "",
                isSendSms: -1
            }
        }
        return _inherits(RUserUplanRenewalCancelDialog, _React$Component),
        RUserUplanRenewalCancelDialog.prototype.doRenewalCancel = function() {
            var _this = this;
            if (!this.state.isLoading) {
                var props = this.props
                  , detailInfo = (props.rolloverResultData,
                props.detailInfo)
                  , financePlanTemplate = detailInfo.financePlanTemplate
                  , financePlanVo = detailInfo.financePlanVo
                  , subPointId = financePlanVo.financeSubPointId
                  , planId = financePlanVo.id
                  , rollOverType = financePlanTemplate.financePlanType
                  , lockPeriod = financePlanVo.lockPeriod;
                this.setState({
                    isLoading: !0,
                    errorMsg: ""
                });
                var data = {
                    subPointId: subPointId,
                    planId: planId,
                    rollOverOrNot: 0,
                    period: lockPeriod,
                    rollOverType: rollOverType
                };
                Promise.race([uplanService.rollOverCancel(data), new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        reject({
                            status: -99999,
                            message: "网络异常，请求超时，请稍后再测试"
                        })
                    }, 1e4)
                }
                )]).then(function(result) {
                    var data = result.data || {};
                    if (result.requestStatus !== uplanService.STATUS.SUCCESS) {
                        var message = data.message || "请求后端服务出错, 请稍后再试";
                        return Promise.reject(message)
                    }
                    0 == data.status && (data.message = "取消续期成功"),
                    _this.props.handleResult(data)
                }).caught(function(message) {
                    data = {
                        status: -2,
                        message: message || "网络异常，请稍后再测试"
                    },
                    _this.props.handleResult(data)
                })
            }
        }
        ,
        RUserUplanRenewalCancelDialog.prototype.render = function() {
            var props = this.props
              , state = this.state
              , rolloverResultData = props.rolloverResultData
              , type = rolloverResultData.type || 0
              , amount = rolloverResultData.amount
              , rolloverScore = rolloverResultData.rolloverScore
              , rolloverScoreString = utils.commaInteger(rolloverScore)
              , rolloverScoreAmount = rolloverResultData.rolloverScoreAmount
              , currentDiscountRate = (utils.commaFloat(rolloverScoreAmount),
            rolloverResultData.interest);
            currentDiscountRate = parseFloat(currentDiscountRate);
            var dialogProps = {
                showing: !0,
                dialog: {
                    className: "user-uplan-dialog user-uplan-renewal-cancel-dialog",
                    style: {
                        width: 700
                    }
                },
                onRequestClose: props.onRequestClose
            }
              , renewalCnancelBtnProps = {
                className: "j-btn  j-btn-super-big ",
                onClick: this.doRenewalCancel
            };
            state.isLoading ? (renewalCnancelBtnProps.className += " j-btn-disabled ",
            renewalCnancelBtnProps.text = "确认中") : (renewalCnancelBtnProps.className += " j-btn-orange ",
            renewalCnancelBtnProps.text = "确 定");
            var currentDiscountRateDom = null;
            if (0 == type) {
                var pointsText = "";
                currentDiscountRateDom = React.createElement("ul", {
                    className: "ul-content"
                }, React.createElement("li", {
                    className: "title-name"
                }, "是否取消续期"), React.createElement("li", null, "使用续期服务，让您的资金更有规划")),
                rolloverScoreAmount && (pointsText = "您当前的续期使用" + rolloverScoreString + "积分，若取消续期后积分将不予退还。",
                currentDiscountRateDom = React.createElement("ul", {
                    className: "ul-content"
                }, React.createElement("li", {
                    className: "title-name"
                }, "是否取消续期"), React.createElement("li", null, pointsText)))
            } else {
                var couponeText = "";
                1 == type && (couponeText = currentDiscountRate + "%加息券"),
                3 == type && (couponeText = currentDiscountRate + "%（短期）加息券"),
                2 == type && (couponeText = amount + "元抵扣券"),
                4 == type && (couponeText = amount + "元现金券"),
                couponeText = rolloverScoreAmount ? "您当前的续期享有" + couponeText + "，使用" + rolloverScoreString + "积分，若取消续期后优惠券和积分将不予退还。" : "您当前的续期享有" + couponeText + "，若取消续期后优惠券将不予退还。",
                currentDiscountRateDom = React.createElement("ul", {
                    className: "ul-content"
                }, React.createElement("li", {
                    className: "title-name"
                }, "是否取消续期"), React.createElement("li", null, couponeText))
            }
            return React.createElement(RDialog, dialogProps, React.createElement("div", {
                className: "user-uplan-body renewal-cancel-body"
            }, currentDiscountRateDom, React.createElement("div", {
                className: "ui-confirm-submit-box  mt20 text-center"
            }, React.createElement("div", {
                className: renewalCnancelBtnProps.className,
                onClick: this.doRenewalCancel
            }, renewalCnancelBtnProps.text))))
        }
        ,
        RUserUplanRenewalCancelDialog
    }(React.Component);
    module.exports = RUserUplanRenewalCancelDialog
});
;/*!/client/widget/user/detail/RUserUplanQuitDialog/RUserUplanQuitDialog.js*/
define("uplan:widget/user/detail/RUserUplanQuitDialog/RUserUplanQuitDialog.js", function(require, exports, module) {
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
      , RDialog = require("common:widget/react-ui/RWeDialog/RWeDialog")
      , RForm = require("common:widget/react-ui/RForm/RForm")
      , RWETooltip = require("common:widget/react-ui/RWETooltip/RWETooltip")
      , RSendSmsButton = require("common:widget/react-ui/RSendSmsButton/RSendSmsButton")
      , TextInput = RForm.TextInput
      , service = require("common:widget/ui/service/service-factory")
      , uplanService = service.getService("uplan")
      , utils = require("common:widget/ui/utils/utils")
      , RUserUplanQuitDialog = function(_React$Component) {
        function RUserUplanQuitDialog(props) {
            _classCallCheck(this, RUserUplanQuitDialog),
            _React$Component.call(this, props),
            this.doQuit = this.doQuit.bind(this),
            this.handleSmsResponse = this.handleSmsResponse.bind(this),
            this.state = {
                isLoading: !1,
                errorMsg: "",
                isSendSms: -1
            }
        }
        return _inherits(RUserUplanQuitDialog, _React$Component),
        RUserUplanQuitDialog.prototype.handleSmsResponse = function(result) {
            if (result && 0 === result.status) {
                {
                    result.data
                }
                this.setState({
                    isSendSms: 1,
                    errorMsg: ""
                })
            } else {
                var message = result.message;
                this.setState({
                    errorMsg: message || "发送手机验证码出错, 请稍后再试"
                })
            }
        }
        ,
        RUserUplanQuitDialog.prototype.doQuit = function() {
            var _this = this
              , props = this.props
              , state = this.state;
            if (!state.isLoading) {
                {
                    var detailInfo = props.detailInfo
                      , financePlanVo = detailInfo.financePlanVo
                      , validCode = (this.refs.smsInput.getValue() || "").trim();
                    state.isSendSms
                }
                if (!validCode)
                    return void this.setState({
                        errorMsg: "请输入手机验证码"
                    });
                this.setState({
                    isLoading: !0,
                    errorMsg: ""
                });
                var data = {
                    subPointId: financePlanVo.financeSubPointId,
                    planId: financePlanVo.id,
                    quitType: "RRD",
                    mobileValidCode: validCode
                };
                Promise.race([uplanService.doPlanQuit(data), new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        reject({
                            status: -99999,
                            message: "网络异常，请求超时，请稍后再试"
                        })
                    }, 1e4)
                }
                )]).then(function(result) {
                    var data = result.data || {};
                    if (result.requestStatus !== uplanService.STATUS.SUCCESS) {
                        var message = data.message || "请求后端服务出错, 请稍后再试";
                        return Promise.reject(message)
                    }
                    0 == data.status && (data.message = "系统正在为您挂出债权，请您耐心等待"),
                    _this.props.handleResult(data)
                }).caught(function(message) {
                    data = data || {
                        status: -2,
                        message: message || "网络异常，请稍后再试"
                    },
                    _this.props.handleResult(data)
                })
            }
        }
        ,
        RUserUplanQuitDialog.prototype.getBtnProps = function() {
            var state = (this.props,
            this.state)
              , renewalBtnProps = {
                className: "j-btn  j-btn-super-big ",
                cancelClassName: "j-btn  j-btn-small j-btn-cancel",
                onClick: this.doRenewal
            };
            return state.isLoading ? (renewalBtnProps.className += " j-btn-disabled ",
            renewalBtnProps.text = "确认退出中") : (renewalBtnProps.className += " j-btn-orange ",
            renewalBtnProps.text = "退出"),
            renewalBtnProps
        }
        ,
        RUserUplanQuitDialog.prototype.quitDialog = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlanVo = detailInfo.financePlanVo
              , finalAmount = financePlanVo.finalAmount
              , financePlanType = financePlanVo.financePlanType
              , category = financePlanVo.category
              , name = financePlanVo.name;
            finalAmount = finalAmount ? utils.commaFloat(finalAmount) : "0.00";
            var dialogProps = {
                showing: !0,
                title: "确认退出计划",
                dialog: {
                    className: "user-uplan-dialog user-uplan-quit-dialog",
                    style: {
                        width: 700
                    }
                },
                onRequestClose: props.onRequestClose
            }
              , btnProps = this.getBtnProps()
              , uNameDom = "U计划"
              , contractHrefDom = null;
            return "PREMIUM" == financePlanType ? uNameDom = "优选计划" : "OLD" != category || (uNameDom = "优选计划",
            contractHrefDom = React.createElement("span", null, "详细规则请查看", React.createElement("a", {
                href: "/static/misc/financial-plan-intro.pdf",
                target: "_blank"
            }, "《优选理财计划说明书》"))),
            React.createElement(RDialog, dialogProps, React.createElement("div", {
                className: "user-uplan-body quit-body"
            }, React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "退出期数"), React.createElement("span", {
                className: "value orange-highlight"
            }, name)), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "加入金额"), React.createElement("span", {
                className: "value "
            }, finalAmount, "元")), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "退出方式"), React.createElement("span", {
                className: "value "
            }, "提取至账户")), React.createElement("div", {
                className: "ui-confirm-submit-box  mt30 text-center"
            }, React.createElement("div", {
                className: btnProps.className,
                onClick: this.props.onRequestClose4OldUplan
            }, btnProps.text)), React.createElement("div", {
                className: "notice-con notice-con-mt40"
            }, React.createElement("div", {
                className: "notice-title"
            }, "温馨提示"), React.createElement("div", {
                className: "notice-desc "
            }, "点击“退出”后，该期", uNameDom, "所持有的债权将进行债权转让，全部债权转让完成具体时间，由债权转让市场的交易情况而定。", contractHrefDom))))
        }
        ,
        RUserUplanQuitDialog.prototype.quitOKDialog = function() {
            var props = this.props
              , state = this.state
              , detailInfo = props.detailInfo
              , quitData = props.quitData
              , financePlanVo = detailInfo.financePlanVo
              , finalAmount = financePlanVo.finalAmount;
            finalAmount = finalAmount ? utils.commaFloat(finalAmount) : "0.00";
            var subPointId = financePlanVo.financeSubPointId
              , name = financePlanVo.name
              , expectedExitAmount = "系统正在努力为您计算预计回收金额，请您耐心等待"
              , expectedTotalIncome = "系统正在努力为您计算预计总收入，请您耐心等待";
            quitData && quitData.data && (expectedExitAmount = quitData.data.expectedExitAmount,
            expectedExitAmount = expectedExitAmount ? utils.commaFloat(expectedExitAmount) : "0.00",
            expectedTotalIncome = quitData.data.expectedTotalIncome,
            expectedTotalIncome = expectedTotalIncome ? utils.commaFloat(expectedTotalIncome) : "0.00");
            var smsInputProps = {
                placeholder: "发送验证码",
                name: "authCode",
                ref: "smsInput"
            }
              , smsSendBtnProps = {
                className: "sms-send-btn",
                method: "POST",
                url: "/uplan/user/sendPhoneCode?platform=pc",
                data: {
                    subPointId: subPointId
                },
                handleData: this.handleSmsResponse
            }
              , dialogProps = {
                showing: !0,
                title: "确认退出计划",
                dialog: {
                    className: "user-uplan-dialog user-uplan-quit-dialog",
                    style: {
                        width: 700
                    }
                },
                onRequestClose: props.onRequestClose
            }
              , btnProps = this.getBtnProps()
              , tooltipProps_quit_01 = {
                id: "user-uplan-tooltip-quit_01",
                place: "right",
                tip: "此为预估值，具体以实际收到金额为准",
                delayHide: 100
            }
              , tooltipProps_quit_02 = {
                id: "user-uplan-tooltip-quit_02",
                place: "right",
                tip: "预计总收入 = 预计回收金额 + 退出前已提取金额",
                delayHide: 100
            };
            return React.createElement(RDialog, dialogProps, React.createElement(RForm, null, React.createElement("div", {
                className: "user-uplan-body quit-body"
            }, React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "退出期数"), React.createElement("span", {
                className: "value orange-highlight"
            }, name)), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "加入金额"), React.createElement("span", {
                className: "value "
            }, finalAmount, "元")), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "预计回收金额"), React.createElement("span", {
                className: "value "
            }, expectedExitAmount, "元", React.createElement(RWETooltip, tooltipProps_quit_01))), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "预计总收入"), React.createElement("span", {
                className: "value "
            }, expectedTotalIncome, "元", React.createElement(RWETooltip, tooltipProps_quit_02))), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "退出方式"), React.createElement("span", {
                className: "value "
            }, "提取至账户")), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "手机验证码"), React.createElement("div", {
                className: "value-width-2"
            }, React.createElement("div", {
                className: "sms-input-con "
            }, React.createElement(TextInput, smsInputProps)), React.createElement(RSendSmsButton, smsSendBtnProps))), React.createElement("div", {
                className: "error-msg"
            }, state.errorMsg), React.createElement("div", {
                className: "ui-confirm-submit-box  mt10 text-center pb40"
            }, React.createElement("div", {
                className: btnProps.className,
                onClick: this.doQuit
            }, btnProps.text)))))
        }
        ,
        RUserUplanQuitDialog.prototype.render = function() {
            var isQuitOkDialog = this.props.isQuitOkDialog
              , dom = null;
            return dom = 0 == isQuitOkDialog ? this.quitDialog() : this.quitOKDialog(),
            React.createElement("div", null, dom)
        }
        ,
        RUserUplanQuitDialog
    }(React.Component);
    module.exports = RUserUplanQuitDialog
});
;/*!/client/widget/user/detail/RUserUplanQuitListDialog/RUserUplanQuitListDialog.js*/
define("uplan:widget/user/detail/RUserUplanQuitListDialog/RUserUplanQuitListDialog.js", function(require, exports, module) {
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
      , RDialog = require("common:widget/react-ui/RWeDialog/RWeDialog")
      , utils = require("common:widget/ui/utils/utils")
      , RUserUplanQuitListDialog = function(_React$Component) {
        function RUserUplanQuitListDialog(props) {
            _classCallCheck(this, RUserUplanQuitListDialog),
            _React$Component.call(this, props);
            var exitList = this.props.exitList || "";
            this.state = {
                data: exitList
            }
        }
        return _inherits(RUserUplanQuitListDialog, _React$Component),
        RUserUplanQuitListDialog.prototype.createListDom = function() {
            var data = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0]
              , newList = data.map(function(index, i) {
                var amount = utils.commaFloat(index.amount || 0) + "元"
                  , date = new Date(index.quitAdvanceTime)
                  , quitAdvanceTime = utils.formatDateAllTime(date)
                  , time = quitAdvanceTime[4];
                return React.createElement("tr", {
                    key: i
                }, React.createElement("td", null, index.nickName), React.createElement("td", null, index.financePlanName), React.createElement("td", {
                    className: "amount"
                }, amount), React.createElement("td", null, time))
            });
            return newList
        }
        ,
        RUserUplanQuitListDialog.prototype.render = function() {
            var props = this.props
              , state = this.state.data || []
              , title = ""
              , listDom = React.createElement("div", {
                className: "no-data"
            }, React.createElement("div", {
                className: "icon"
            }), React.createElement("div", {
                className: "no-exit-text"
            }, "目前暂无提前退出"));
            if (state.length > 0) {
                var html = this.createListDom(state);
                listDom = React.createElement("table", {
                    className: "bank-list"
                }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", null, "用户昵称"), React.createElement("th", null, "退出计划名称"), React.createElement("th", null, "退出金额"), React.createElement("th", null, "申请退出时间")), html)),
                title = "已提前退出详情"
            }
            var dialogProps = {
                showing: !0,
                title: title,
                dialog: {
                    className: "user-uplan-dialog user-uplan-early-exit-dialog",
                    style: {
                        width: 700
                    }
                },
                onRequestClose: props.onRequestClose
            };
            return React.createElement(RDialog, dialogProps, React.createElement("div", {
                className: "user-uplan-body early-exit-list-body"
            }, React.createElement("div", {
                className: "detail-box"
            }, listDom)))
        }
        ,
        RUserUplanQuitListDialog
    }(React.Component);
    module.exports = RUserUplanQuitListDialog
});
;/*!/client/widget/user/detail/RUserUplanDetailProductStatus/RUserUplanDetailProductStatus.js*/
define("uplan:widget/user/detail/RUserUplanDetailProductStatus/RUserUplanDetailProductStatus.js", function(require, exports, module) {
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
      , moment = require("common:node_modules/moment/moment")
      , RWeStatusDialog = (require("common:widget/react-ui/RForm/RForm"),
    require("common:widget/react-ui/RWeStatusDialog/RWeStatusDialog"))
      , RUserUplanEarlyExitDialog = require("uplan:widget/user/detail/RUserUplanEarlyExitDialog/RUserUplanEarlyExitDialog")
      , RUserUplanRenewalDialog = require("uplan:widget/user/detail/RUserUplanRenewalDialog/RUserUplanRenewalDialog")
      , RUserUplanRenewalCancelDialog = require("uplan:widget/user/detail/RUserUplanRenewalCancelDialog/RUserUplanRenewalCancelDialog")
      , RUserUplanQuitDialog = require("uplan:widget/user/detail/RUserUplanQuitDialog/RUserUplanQuitDialog")
      , RUserPremiumQuitDialog = require("uplan:widget/user/detail/RUserPremiumQuitDialog/RUserPremiumQuitDialog")
      , RUserUplanQuitListDialog = require("uplan:widget/user/detail/RUserUplanQuitListDialog/RUserUplanQuitListDialog")
      , RWETooltip = require("common:widget/react-ui/RWETooltip/RWETooltip")
      , PremiumRenewalDialog = require("user:widget/account/p2p/wdg-premium-renewal-dialog/wdg-premium-renewal-dialog")
      , PremiumTransformDialog = require("uplan:widget/user/detail/RUserPremiumTransformDialog/RUserPremiumTransformDialog")
      , RToast = require("common:widget/react-ui/RToast/RToast")
      , service = require("common:widget/ui/service/service-factory")
      , uplanService = service.getService("uplan")
      , p2pService = service.getService("p2p")
      , utils = require("common:widget/ui/utils/utils")
      , $statistic = require("common:node_modules/glpb-components-common/src/index").weStatistic
      , UserUplanDetailProduct = function(_React$Component) {
        function UserUplanDetailProduct(props) {
            _classCallCheck(this, UserUplanDetailProduct),
            _React$Component.call(this, props),
            this.showEarlyExitDialog = this.showEarlyExitDialog.bind(this),
            this.showRenewalDialog = this.showRenewalDialog.bind(this),
            this.showRenewalCancelDialog = this.showRenewalCancelDialog.bind(this),
            this.showQuitDialog = this.showQuitDialog.bind(this),
            this.showPremiumQuitDialog = this.showPremiumQuitDialog.bind(this),
            this.closeDialog = this.closeDialog.bind(this),
            this.closeCommonDialog = this.closeCommonDialog.bind(this),
            this.closeRiskCommonDialog = this.closeRiskCommonDialog.bind(this),
            this.handleResult = this.handleResult.bind(this),
            this.onRequestClose4OldUplan = this.onRequestClose4OldUplan.bind(this),
            this.premiumQuitCallBack = this.premiumQuitCallBack.bind(this),
            this.jumpToRisk = this.jumpToRisk.bind(this),
            this.jumpToRiskAgain = this.jumpToRiskAgain.bind(this),
            this.showToast = this.showToast.bind(this),
            this.showPremiumRenewalDialog = this.showPremiumRenewalDialog.bind(this),
            this.closeRenewalDialog = this.closeRenewalDialog.bind(this),
            this.enterPremiumFreePoint = this.enterPremiumFreePoint.bind(this),
            this.showTransformDialog = this.showTransformDialog.bind(this),
            this.closeTransformDialog = this.closeTransformDialog.bind(this),
            this.state = {
                errorMessage: "",
                showDialog: !1,
                showCommonDialog: !1,
                commonStatus: -1,
                commonMessage: "",
                isLoading: !1,
                interest: "获取中...",
                dialogType: 0,
                renewalData: null,
                pageRenewalBtn: "续期",
                pageRenewalCancelBtn: "取消续期",
                pagePremiumQuitBtn: "申请退出",
                pageRenewalClassName: "user-plan-button-orange",
                pagePremiumQuitClassName: "user-plan-button-orange",
                quitData: null,
                isQuitOkDialog: 0,
                exitList: "",
                countDownTime: "",
                isBindClick: "",
                showRiskCommonDialog: !1,
                showRiskCommonDialogType: -1,
                showRiskCommonDialogResult: null,
                showRenewalDialog: !1,
                showPremiumTransformDialog: !1,
                backCash: 0,
                freeTips: "",
                lockTips: "",
                exitLimit: "",
                exitCount: 0
            }
        }
        return _inherits(UserUplanDetailProduct, _React$Component),
        UserUplanDetailProduct.prototype.getFreeEndTime = function(beginSellingTime, salePeriod, finalPeriod) {
            var beginSellingTimeStamp = moment(parseInt(beginSellingTime)).set({
                hour: 23,
                minute: 59,
                second: 59,
                millisecond: 0
            }).format("x")
              , endFreeDate = parseInt(beginSellingTimeStamp) + 864e5 * salePeriod
              , endFreeTime = moment(endFreeDate).add(finalPeriod, "months").format("x");
            return endFreeTime
        }
        ,
        UserUplanDetailProduct.prototype.isPremiumEndTime = function(endFreeTime) {
            var premiumEndObj = {
                isEndSevenDay: !1,
                isEndOneDay: !1
            };
            endFreeTime = moment(parseInt(endFreeTime)).endOf("day").format("x");
            var oneDaysAgo = moment(parseInt(endFreeTime)).subtract(1, "day").format("x")
              , sevenDaysAgo = moment(parseInt(endFreeTime)).subtract(8, "day").format("x")
              , nowTime = moment().format("x");
            return nowTime > sevenDaysAgo && oneDaysAgo >= nowTime && (premiumEndObj.isEndSevenDay = !0),
            nowTime > oneDaysAgo && endFreeTime >= nowTime && (premiumEndObj.isEndOneDay = !0),
            premiumEndObj
        }
        ,
        UserUplanDetailProduct.prototype.showPremiumRenewalDialog = function() {
            this.setState({
                showRenewalDialog: !0
            })
        }
        ,
        UserUplanDetailProduct.prototype.closeRenewalDialog = function() {
            this.setState({
                showRenewalDialog: !1
            })
        }
        ,
        UserUplanDetailProduct.prototype.showTransformDialog = function() {
            $statistic.track("click_myPremiumDetail_toUplan_btn_pc"),
            this.setState({
                showPremiumTransformDialog: !0
            })
        }
        ,
        UserUplanDetailProduct.prototype.closeTransformDialog = function() {
            this.setState({
                showPremiumTransformDialog: !1
            })
        }
        ,
        UserUplanDetailProduct.prototype.showToast = function(text) {
            RToast.info(text, 2e3)
        }
        ,
        UserUplanDetailProduct.prototype.enterPremiumFreePoint = function() {
            $statistic.track("pc_enter_premiumDetail_free")
        }
        ,
        UserUplanDetailProduct.prototype.premiumRenewalStatus = function() {
            var props = this.props
              , state = this.state
              , detailInfo = props.detailInfo
              , backCash = state.backCash
              , freeTips = state.freeTips
              , lockTips = state.lockTips
              , financePlanVo = detailInfo.financePlanVo || {}
              , lockingStatus = detailInfo.lockingStatus
              , canRollover = detailInfo.canRollover
              , premiumRolloverStatus = detailInfo.premiumRolloverStatus
              , isInActivity = detailInfo.isInActivity
              , isPurcharge = (detailInfo.rolloverRewardAmount,
            detailInfo.isPurcharge)
              , canQuit = detailInfo.canQuit
              , canAdvanceQuit = detailInfo.canAdvanceQuit
              , surplusCount = detailInfo.surplusCount
              , allowCount = detailInfo.allowCount
              , _detailInfo$timeList = detailInfo.timeList
              , timeList = void 0 === _detailInfo$timeList ? [] : _detailInfo$timeList
              , advanceQuitLimitSwitch = detailInfo.advanceQuitLimitSwitch
              , freeMonthLimitStatus = detailInfo.freeMonthLimitStatus
              , canTransform = detailInfo.canTransform
              , transformStatus = detailInfo.transformStatus
              , premiumTransformLimit = detailInfo.premiumTransformLimit
              , planStatus = financePlanVo.planStatus
              , id = financePlanVo.id
              , novice = financePlanVo.novice
              , hasFull = financePlanVo.hasFull
              , beginSellingTime = financePlanVo.beginSellingTime
              , salePeriod = financePlanVo.salePeriod
              , finalPeriod = financePlanVo.finalPeriod
              , applyQuitInfo = detailInfo.applyQuitInfo
              , endFreeTime = this.getFreeEndTime(beginSellingTime, salePeriod, finalPeriod)
              , isPremiumEndTime = this.isPremiumEndTime(endFreeTime)
              , hrefDom = "/uplan-" + id + ".html"
              , btnDomR = null
              , btnDom1 = null
              , btnDom2 = null
              , domOneText = null
              , tipsText = null
              , tooltipProps = {
                id: "user-premium-tooltip-1",
                place: "left",
                tip: 0 == lockingStatus ? lockTips : freeTips,
                delayHide: 100
            }
              , rolloverRewardAmountString = utils.commaFloat(backCash || 0)
              , premiumText = "资金有规划，高效利用不间断";
            if (isInActivity && (premiumText = "现在转固定期可获得" + rolloverRewardAmountString + "元奖励"),
            1 === lockingStatus) {
                if (this.enterPremiumFreePoint(),
                0 == premiumRolloverStatus && (1 == premiumTransformLimit && 1 == canTransform && 0 == transformStatus && (btnDomR = React.createElement("a", {
                    className: "user-premium-button user-plan-button-orange fn-left",
                    href: "javascript:void(0)",
                    onClick: this.showTransformDialog
                }, "转至U享")),
                1 == canRollover)) {
                    btnDom1 = React.createElement("a", {
                        className: "user-premium-button user-plan-button-orange fn-left mr-20",
                        href: "javascript:void(0)",
                        onClick: this.showPremiumRenewalDialog
                    }, "转固定期"),
                    domOneText = React.createElement("span", {
                        className: "dom-one-text-tips"
                    }, premiumText, React.createElement(RWETooltip, tooltipProps));
                    var _state = this.state
                      , _state$exitLimit = _state.exitLimit
                      , exitLimit = void 0 === _state$exitLimit ? {} : _state$exitLimit
                      , exitCount = _state.exitCount
                      , count = exitLimit.count
                      , timeStatus = exitLimit.timeStatus
                      , exitDateTips = exitLimit.exitDateTips
                      , isBeforeFirstNode = exitLimit.isBeforeFirstNode
                      , limitSwitch = exitLimit.limitSwitch;
                    if (1 === freeMonthLimitStatus && (limitSwitch = 0),
                    1 === limitSwitch)
                        if (tipsText = React.createElement("div", null, React.createElement("div", {
                            className: "dom-two-text"
                        }, exitDateTips, React.createElement("a", {
                            href: "https://www.renrendai.com/about/pa/1/5c9d649cbd3c082fb9e2a9bb",
                            target: "_blank",
                            className: "show-notice"
                        }, "查看公告")), React.createElement("a", {
                            href: "/uplan/user/premiumQuitDetail",
                            target: "_blank",
                            className: "dom-two-exit-list mt-0"
                        }, React.createElement("span", null, "当日已申请退出详情"), React.createElement("i", {
                            className: "icon-we-jiantou icon-right"
                        }))),
                        1 === timeStatus)
                            btnDom2 = count > 0 ? React.createElement("a", {
                                className: "user-premium-button user-plan-button-white user-plan-button-left mt-10",
                                href: "javascript:void(0)",
                                onClick: this.showPremiumQuitDialog
                            }, "申请退出") : React.createElement("a", {
                                className: "user-premium-button user-plan-button-gray user-plan-button-left mt-10",
                                href: "javascript:void(0)"
                            }, "申请退出");
                        else if (2 === timeStatus)
                            if (exitCount > 0) {
                                var _count = this.timeChangeStr(exitCount)
                                  , countText = "距离申请退出开放 " + _count;
                                btnDom2 = React.createElement("a", {
                                    className: "user-premium-button user-plan-button-gray user-plan-button-left exit-gray-button mt-10",
                                    href: "javascript:void(0)"
                                }, countText)
                            } else
                                btnDom2 = React.createElement("a", {
                                    className: "user-premium-button user-plan-button-white user-plan-button-left mt-10",
                                    href: "javascript:void(0)",
                                    onClick: this.showPremiumQuitDialog
                                }, "申请退出");
                        else
                            btnDom2 = React.createElement("a", {
                                className: "user-premium-button user-plan-button-gray user-plan-button-left mt-10",
                                href: "javascript:void(0)"
                            }, "申请退出"),
                            isBeforeFirstNode && (btnDom2 = count > 0 ? React.createElement("a", {
                                className: "user-premium-button user-plan-button-white user-plan-button-left mt-10",
                                href: "javascript:void(0)",
                                onClick: this.showPremiumQuitDialog
                            }, "申请退出") : React.createElement("a", {
                                className: "user-premium-button user-plan-button-gray user-plan-button-left mt-10",
                                href: "javascript:void(0)"
                            }, "申请退出"));
                    else
                        0 === limitSwitch && (btnDom2 = React.createElement("a", {
                            className: "user-premium-button user-plan-button-white user-plan-button-left mt-10",
                            href: "javascript:void(0)",
                            onClick: this.showPremiumQuitDialog
                        }, "申请退出"))
                }
                if (isPremiumEndTime.isEndSevenDay && 1 === canRollover && 0 == premiumRolloverStatus && (btnDom2 = null,
                domOneText = null,
                tipsText = React.createElement("span", {
                    className: "premium-button-tips"
                }, premiumText, React.createElement(RWETooltip, tooltipProps))),
                applyQuitInfo && !applyQuitInfo.isAllQuit) {
                    var tansformTipsPartText = "";
                    1 == premiumTransformLimit && (tansformTipsPartText = "或转至U享",
                    btnDomR = React.createElement("a", {
                        className: "user-premium-button user-plan-button-gray fn-left",
                        href: "javascript:void(0)"
                    }, "转至U享")),
                    btnDom1 = React.createElement("a", {
                        className: "user-premium-button user-plan-button-gray fn-left mr-20",
                        href: "javascript:void(0)"
                    }, "转固定期"),
                    btnDom2 = React.createElement("a", {
                        className: "user-premium-button user-plan-button-gray",
                        href: "javascript:void(0)"
                    }, "申请退出"),
                    tipsText = React.createElement("span", {
                        className: "premium-button-tips"
                    }, "有一笔退出申请正在处理，退出完成后才可转固定期", tansformTipsPartText, React.createElement(RWETooltip, tooltipProps)),
                    domOneText = null
                }
                (applyQuitInfo && applyQuitInfo.isAllQuit || isPremiumEndTime.isEndOneDay) && (btnDomR = null,
                btnDom1 = null,
                btnDom2 = null,
                tipsText = null,
                domOneText = null)
            } else if ("INPROGRESS" == planStatus && (isPurcharge && 1 != novice ? "false" == hasFull && (btnDom1 = React.createElement("a", {
                className: "user-premium-button user-plan-button-orange",
                target: "_blank",
                href: hrefDom
            }, "追加金额")) : 0 == premiumRolloverStatus && 1 == canRollover && (btnDom1 = React.createElement("a", {
                className: "user-premium-button user-plan-button-orange  mt-0",
                href: "javascript:void(0)",
                onClick: this.showPremiumRenewalDialog
            }, "转固定期"),
            domOneText = React.createElement("span", {
                className: "dom-one-text-tips"
            }, premiumText, React.createElement(RWETooltip, tooltipProps))),
            0 == premiumRolloverStatus && canQuit)) {
                var orangeButtonClassName = 1 == canRollover ? "user-premium-button user-plan-button-white user-plan-button-left mt-10" : "user-premium-button user-plan-button-orange";
                if (1 == advanceQuitLimitSwitch) {
                    var timeArr = timeList.map(function(index) {
                        return moment(index).format("HH:mm") || ""
                    })
                      , timeStr = timeArr.join("、");
                    if (1 == canAdvanceQuit) {
                        var exitNum = React.createElement("div", null, "当前还有", React.createElement("i", {
                            className: "orange"
                        }, surplusCount), "个提前退出名额");
                        btnDom2 = React.createElement("a", {
                            className: orangeButtonClassName,
                            href: "javascript:void(0)",
                            onClick: this.showEarlyExitDialog
                        }, "提前退出"),
                        tipsText = React.createElement("div", {
                            className: "user-button-exit-tips"
                        }, React.createElement("div", null, "每天", timeStr, "分别开放", allowCount, "个名额"), exitNum, React.createElement("div", {
                            className: "quit-link",
                            onClick: this.showEarlyExitList.bind(this)
                        }, "当日已提前退出详情>"))
                    } else {
                        var countDownTime = this.state.countDownTime
                          , isBindClick = this.state.isBindClick;
                        if (countDownTime > 0) {
                            countDownTime = this.timeChangeStr(countDownTime);
                            var countDownStr = "距离提前退出开放 00:" + countDownTime;
                            btnDom2 = React.createElement("a", {
                                className: "user-plan-button user-plan-button-gray cursor-pointer user-plan-button-left count-down-time",
                                href: "javascript:void(0)"
                            }, countDownStr)
                        } else
                            btnDom2 = isBindClick ? React.createElement("a", {
                                className: orangeButtonClassName,
                                href: "javascript:void(0)",
                                onClick: this.showEarlyExitDialog
                            }, "提前退出") : React.createElement("a", {
                                className: "user-plan-button user-plan-button-gray  user-plan-button-left",
                                href: "javascript:void(0)"
                            }, "提前退出");
                        tipsText = React.createElement("div", {
                            className: "user-button-exit-tips"
                        }, React.createElement("div", null, "每天", timeStr, "分别开放", allowCount, "个名额"), React.createElement("div", {
                            className: "quit-link",
                            onClick: this.showEarlyExitList.bind(this)
                        }, "当日已提前退出详情>"))
                    }
                } else
                    btnDom2 = React.createElement("a", {
                        className: orangeButtonClassName,
                        href: "javascript:void(0)",
                        onClick: this.showEarlyExitDialog
                    }, "提前退出")
            }
            0 == premiumTransformLimit && (btnDomR = null);
            var content = React.createElement("div", {
                id: "premium-button-block",
                className: ""
            }, React.createElement("div", {
                className: "fn-clear"
            }, btnDom1, btnDomR), domOneText, btnDom2, tipsText);
            return content
        }
        ,
        UserUplanDetailProduct.prototype.premiumStatus = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlanVo = detailInfo.financePlanVo || {}
              , canAdvanceQuit = detailInfo.canAdvanceQuit
              , surplusCount = detailInfo.surplusCount
              , allowCount = detailInfo.allowCount
              , _detailInfo$timeList2 = detailInfo.timeList
              , timeList = void 0 === _detailInfo$timeList2 ? [] : _detailInfo$timeList2
              , advanceQuitLimitSwitch = detailInfo.advanceQuitLimitSwitch
              , beginSellingTime = financePlanVo.beginSellingTime
              , salePeriod = financePlanVo.salePeriod
              , finalPeriod = financePlanVo.finalPeriod
              , isPurcharge = detailInfo.isPurcharge
              , canQuit = detailInfo.canQuit
              , id = financePlanVo.id
              , planStatus = financePlanVo.planStatus
              , novice = financePlanVo.novice
              , hasFull = financePlanVo.hasFull
              , hrefDom = "/uplan-" + id + ".html"
              , btnDom1 = null
              , btnDom2 = null
              , tipsText = null
              , isPremiumFreeTime = this.isPremiumFreeTime()
              , applyQuitInfo = detailInfo.applyQuitInfo
              , pagePremiumQuitClassName = "user-plan-button " + this.state.pagePremiumQuitClassName + ' cursor-pointer" ';
            if ("INPROGRESS" == planStatus) {
                if (isPurcharge && 1 != novice && "false" == hasFull && (btnDom1 = React.createElement("a", {
                    className: "user-plan-button user-plan-button-orange cursor-pointer",
                    target: "_blank",
                    href: hrefDom
                }, "追加金额")),
                canQuit)
                    if (1 == advanceQuitLimitSwitch) {
                        var timeArr = timeList.map(function(index) {
                            return moment(index).format("HH:mm") || ""
                        })
                          , timeStr = timeArr.join("、");
                        if (1 == canAdvanceQuit) {
                            var exitNum = React.createElement("div", null, "当前还有", React.createElement("i", {
                                className: "orange"
                            }, surplusCount), "个提前退出名额");
                            btnDom2 = React.createElement("a", {
                                className: "user-plan-button user-plan-button-orange cursor-pointer",
                                href: "javascript:void(0)",
                                onClick: this.showEarlyExitDialog
                            }, "提前退出"),
                            tipsText = React.createElement("div", {
                                className: "user-button-exit-tips"
                            }, React.createElement("div", null, "每天", timeStr, "分别开放", allowCount, "个名额"), exitNum, React.createElement("div", {
                                className: "quit-link",
                                onClick: this.showEarlyExitList.bind(this)
                            }, "当日已提前退出详情>"))
                        } else {
                            var countDownTime = this.state.countDownTime
                              , isBindClick = this.state.isBindClick;
                            if (countDownTime > 0) {
                                countDownTime = this.timeChangeStr(countDownTime);
                                var countDownStr = "距离提前退出开放 00:" + countDownTime;
                                btnDom2 = React.createElement("a", {
                                    className: "user-plan-button user-plan-button-gray cursor-pointer user-plan-button-left count-down-time",
                                    href: "javascript:void(0)"
                                }, countDownStr)
                            } else
                                btnDom2 = isBindClick ? React.createElement("a", {
                                    className: "user-plan-button user-plan-button-orange cursor-pointer",
                                    href: "javascript:void(0)",
                                    onClick: this.showEarlyExitDialog
                                }, "提前退出") : React.createElement("a", {
                                    className: "user-plan-button user-plan-button-gray cursor-pointer user-plan-button-left",
                                    href: "javascript:void(0)"
                                }, "提前退出");
                            tipsText = React.createElement("div", {
                                className: "user-button-exit-tips"
                            }, React.createElement("div", null, "每天", timeStr, "分别开放", allowCount, "个名额"), React.createElement("div", {
                                className: "quit-link",
                                onClick: this.showEarlyExitList.bind(this)
                            }, "当日已提前退出详情>"))
                        }
                    } else
                        btnDom2 = React.createElement("a", {
                            className: "user-plan-button user-plan-button-orange cursor-pointer",
                            href: "javascript:void(0)",
                            onClick: this.showEarlyExitDialog
                        }, "提前退出");
                if (1 == isPremiumFreeTime)
                    btnDom2 = React.createElement("a", {
                        className: pagePremiumQuitClassName,
                        href: "javascript:void(0)",
                        onClick: this.showPremiumQuitDialog
                    }, this.state.pagePremiumQuitBtn),
                    applyQuitInfo && (btnDom2 = React.createElement("a", {
                        className: "user-plan-button user-plan-button-gray cursor-pointer user-plan-button-left",
                        href: "javascript:void(0)"
                    }, "申请退出"),
                    tipsText = React.createElement("span", {
                        className: "user-button-tips"
                    }, "您目前有一笔退出申请正在处理，此期间请不要重复申请退出。"));
                else if (2 == isPremiumFreeTime) {
                    var endFreeTime = this.getFreeEndTime(beginSellingTime, salePeriod, finalPeriod)
                      , allQuitTime = moment(parseInt(endFreeTime)).format("YYYY年MM月DD日")
                      , ouitTimeText = allQuitTime + "到期退出";
                    btnDom2 = React.createElement("a", {
                        className: "user-plan-button user-plan-button-gray cursor-pointer user-plan-button-left",
                        href: "javascript:void(0)"
                    }, "申请退出"),
                    tipsText = React.createElement("span", {
                        className: "user-button-tips one-line"
                    }, ouitTimeText)
                }
            }
            var content = React.createElement("div", {
                id: "status-button"
            }, btnDom1, btnDom2, tipsText);
            return content
        }
        ,
        UserUplanDetailProduct.prototype.componentDidMount = function() {
            var _this = this
              , detailInfo = this.props.detailInfo || {}
              , timelist = detailInfo.timeList || []
              , countDown = this.timeChange(timelist) || 0;
            countDown > 0 && this.setState({
                countDownTime: countDown
            }, this.setCounDown);
            var financePlanVo = detailInfo.financePlanVo || {}
              , holdingAsset = detailInfo.rolloverAmount
              , financePlanType = financePlanVo.financePlanType
              , financeSubPointId = financePlanVo.financeSubPointId
              , endLockingTime = financePlanVo.endLockingTime
              , isInActivity = (detailInfo.isAuthoriseTen || "",
            detailInfo.isInActivity)
              , freedomDueTime = detailInfo.freedomDueTime
              , lockingStatus = detailInfo.lockingStatus
              , isInActivityN = isInActivity ? 1 : 0;
            if ("PREMIUM" == financePlanType) {
                var queryData = {
                    subPointId: financeSubPointId,
                    holdingAsset: holdingAsset,
                    freedomDueTime: freedomDueTime,
                    isInActivityN: isInActivityN,
                    lockingStatus: lockingStatus,
                    endLockingTime: endLockingTime
                };
                uplanService.getPremiumBackCash(queryData).then(function(result) {
                    var requestStatus = result.requestStatus
                      , resultData = result.data || {}
                      , data = resultData.data || {}
                      , status = resultData.status
                      , freeTips = ""
                      , lockTips = "";
                    if (requestStatus === uplanService.STATUS.SUCCESS && 0 === status) {
                        var maxAmount = (moment(data.nowTime).add(12, "months").format("x"),
                        data.expireBackAmount)
                          , monthsResData = data.monthsResData;
                        monthsResData && (freeTips = monthsResData.freeTips,
                        lockTips = monthsResData.lockTips),
                        _this.setState({
                            backCash: maxAmount,
                            freeTips: freeTips,
                            lockTips: lockTips
                        })
                    }
                })["catch"](function() {
                    _this.setState({
                        backCash: 0
                    })
                })
            }
            var canRollover = detailInfo.canRollover;
            "PREMIUM" == financePlanType && 1 === canRollover && uplanService.getPremiumExitLimit({}).then(function(result) {
                var resultData = (result.requestStatus,
                result.data || {})
                  , data = resultData.data || {}
                  , status = resultData.status;
                if (0 === status) {
                    var limitSwitch = data.limitSwitch
                      , currentTime = data.currentTime
                      , suplusTimeNode = (data.count,
                    data.suplusTimeNode)
                      , time = suplusTimeNode.time
                      , tenMiutesAgo = moment(parseInt(time)).subtract(10, "m").format("x")
                      , timeStatus = 1
                      , exitCount = 0;
                    1 === limitSwitch && (parseInt(currentTime) > parseInt(time) ? timeStatus = 1 : parseInt(currentTime) > parseInt(tenMiutesAgo) ? (timeStatus = 2,
                    exitCount = parseInt((time - currentTime) / 1e3)) : timeStatus = 3),
                    data.timeStatus = timeStatus,
                    exitCount > 0 ? _this.setState({
                        exitLimit: data,
                        exitCount: exitCount
                    }, _this.setExitCount) : _this.setState({
                        exitLimit: data,
                        exitCount: exitCount
                    })
                }
            })["catch"](function() {
                _this.setState({
                    exitLimit: "",
                    exitCount: 0
                })
            })
        }
        ,
        UserUplanDetailProduct.prototype.setExitCount = function() {
            var _this2 = this
              , timer = setInterval(function() {
                var countDown = _this2.state.exitCount;
                countDown > 0 ? countDown-- : clearInterval(timer),
                _this2.setState({
                    exitCount: countDown
                })
            }, 1e3)
        }
        ,
        UserUplanDetailProduct.prototype.setCounDown = function() {
            var _this3 = this
              , timer = setInterval(function() {
                var countDown = _this3.state.countDownTime;
                countDown > 0 ? countDown-- : clearInterval(timer),
                _this3.setState({
                    countDownTime: countDown,
                    isBindClick: 0 == countDown ? !0 : !1
                })
            }, 1e3)
        }
        ,
        UserUplanDetailProduct.prototype.timeChangeStr = function(date) {
            var minute = 0
              , second = 0;
            return date > 60 ? (second = date % 60,
            minute = parseInt(date / 60)) : second = date,
            10 > second && (second = "0" + second),
            10 > minute && (minute = "0" + minute),
            minute + ":" + second
        }
        ,
        UserUplanDetailProduct.prototype.timeChange = function() {
            {
                var timeList = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0]
                  , detail = this.props.detailInfo || {}
                  , nowTime = detail.nowTime
                  , now = nowTime / 1e3
                  , time = "";
                timeList.map(function(index) {
                    index /= 1e3;
                    var timeDiff = parseInt(index) - parseInt(now);
                    return 180 >= timeDiff ? time = timeDiff : void 0
                })
            }
            return time
        }
        ,
        UserUplanDetailProduct.prototype.uplanStatus = function() {
            var props = this.props
              , state = this.state
              , detailInfo = props.detailInfo
              , financePlanVo = detailInfo.financePlanVo
              , id = financePlanVo.id
              , planStatus = financePlanVo.planStatus
              , isPurcharge = detailInfo.isPurcharge
              , novice = financePlanVo.novice
              , hasFull = financePlanVo.hasFull
              , canQuit = detailInfo.canQuit
              , canRollOver = detailInfo.canRollOver
              , locking = detailInfo.locking
              , rollCanCancel = detailInfo.rollCanCancel
              , calmEndDay = detailInfo.calmEndDay
              , nowTime = detailInfo.nowTime
              , hrefDom = "/uplan-" + id + ".html"
              , canAdvanceQuit = detailInfo.canAdvanceQuit
              , surplusCount = detailInfo.surplusCount
              , allowCount = detailInfo.allowCount
              , timeList = detailInfo.timeList
              , advanceQuitLimitSwitch = detailInfo.advanceQuitLimitSwitch
              , btnDom1 = null
              , btnDom2 = null
              , limitedTips = null
              , pageRenewalClassName = "user-plan-button " + state.pageRenewalClassName + ' cursor-pointer" ';
            if ("INPROGRESS" == planStatus) {
                if (1 == canRollOver)
                    btnDom1 = 0 == locking ? React.createElement("a", {
                        className: pageRenewalClassName,
                        href: "javascript:",
                        onClick: this.showRenewalDialog
                    }, state.pageRenewalBtn) : React.createElement("a", {
                        className: "user-plan-button user-plan-button-gray",
                        href: "javascript:"
                    }, "续 期");
                else if (1 == rollCanCancel) {
                    var calmEndDayDate = calmEndDay && -1 != calmEndDay ? moment(parseInt(calmEndDay || 0)).format("YYYY-MM-DD") : "--"
                      , cancelShow = calmEndDayDate + "前可修改/取消续期设置"
                      , cancelButton = "";
                    calmEndDay > nowTime && (cancelButton = React.createElement("span", {
                        className: "cancel-button",
                        onClick: this.showRenewalCancelDialog
                    }, "取消续期")),
                    btnDom1 = React.createElement("div", {
                        className: "cancel-block"
                    }, React.createElement("a", {
                        className: pageRenewalClassName,
                        href: "javascript:",
                        onClick: this.showRenewalDialog
                    }, "修改续期"), React.createElement("p", {
                        className: "cancel-text"
                    }, cancelShow, cancelButton))
                }
                if (isPurcharge && 1 != novice)
                    "false" == hasFull && (btnDom2 = React.createElement("a", {
                        className: " user-plan-button user-plan-button-orange cursor-pointer",
                        target: "_blank",
                        href: hrefDom
                    }, " 追加金额"));
                else if (canQuit)
                    if (1 == advanceQuitLimitSwitch) {
                        var timeArr = timeList.map(function(index) {
                            return moment(index).format("HH:mm") || ""
                        })
                          , timeStr = timeArr.join("、");
                        if (1 == canAdvanceQuit)
                            btnDom2 = React.createElement("a", {
                                className: "user-plan-button user-plan-button-orange",
                                href: "javascript:",
                                onClick: this.showEarlyExitDialog
                            }, "提前退出"),
                            limitedTips = React.createElement("div", {
                                className: "limited-tips"
                            }, React.createElement("p", null, "每天", timeStr, "分别开放", allowCount, "个名额"), React.createElement("p", null, "当前还有", React.createElement("span", {
                                className: "orange"
                            }, surplusCount, "个"), "提前退出名额"), React.createElement("p", {
                                className: "quit-link",
                                onClick: this.showEarlyExitList.bind(this)
                            }, "当日已提前退出详情>"));
                        else {
                            var countDownTime = this.state.countDownTime
                              , isBindClick = this.state.isBindClick;
                            if (countDownTime > 0) {
                                countDownTime = this.timeChangeStr(countDownTime);
                                var countDownStr = "距离提前退出开放 00:" + countDownTime;
                                btnDom2 = React.createElement("a", {
                                    className: "user-plan-button user-plan-button-gray count-down-time",
                                    href: "javascript:"
                                }, countDownStr)
                            } else
                                btnDom2 = isBindClick ? React.createElement("a", {
                                    className: "user-plan-button user-plan-button-orange",
                                    href: "javascript:",
                                    onClick: this.showEarlyExitDialog
                                }, "提前退出") : React.createElement("a", {
                                    className: "user-plan-button user-plan-button-gray",
                                    href: "javascript:"
                                }, "提前退出");
                            limitedTips = React.createElement("div", {
                                className: "limited-tips"
                            }, React.createElement("p", null, "每天", timeStr, "分别开放", allowCount, "个名额"), React.createElement("p", {
                                className: "quit-link",
                                onClick: this.showEarlyExitList.bind(this)
                            }, "当日已提前退出详情>"))
                        }
                    } else
                        btnDom2 = React.createElement("a", {
                            className: "user-plan-button user-plan-button-orange",
                            href: "javascript:",
                            onClick: this.showEarlyExitDialog
                        }, "提前退出")
            }
            var conttent = React.createElement("div", {
                id: "status-button"
            }, btnDom1, btnDom2, limitedTips);
            return conttent
        }
        ,
        UserUplanDetailProduct.prototype.oldUplanStatus = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlanVo = detailInfo.financePlanVo
              , isPurcharge = detailInfo.isPurcharge
              , id = financePlanVo.id
              , planStatus = financePlanVo.planStatus
              , status = financePlanVo.status
              , hasFull = financePlanVo.hasFull
              , hrefDom = "/uplan-" + id + ".html"
              , btnDom1 = null
              , btnDom2 = null;
            "INPROGRESS" == planStatus && (isPurcharge ? "false" == hasFull && (btnDom1 = React.createElement("a", {
                className: "user-plan-button user-plan-button-orange cursor-pointer",
                target: "_blank",
                href: hrefDom
            }, "追加金额")) : "REDEMPTION_PERIOD" == status && (btnDom1 = React.createElement("a", {
                className: "user-plan-button user-plan-button-orange cursor-pointer",
                href: "javascript:",
                onClick: this.showQuitDialog
            }, "退出")));
            var conttent = React.createElement("div", {
                id: "status-button"
            }, btnDom1, btnDom2);
            return conttent
        }
        ,
        UserUplanDetailProduct.prototype.getImgStamp = function() {
            var props = this.props
              , detailInfo = (this.state,
            props.detailInfo)
              , financePlanVo = detailInfo.financePlanVo
              , isPurcharge = detailInfo.isPurcharge
              , planStatus = financePlanVo.planStatus
              , status = financePlanVo.status
              , category = financePlanVo.category
              , imgHref = null;
            return "INPROGRESS" == planStatus ? isPurcharge || ("PURCHASE_END" == status ? imgHref = "//www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/REPAYING.png" : "REDEMPTION_PERIOD" == status && "OLD" == category ? imgHref = "//www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/OPEN.png" : "REDEMPTION_PERIOD" == status && "OLD" != category && (imgHref = "//www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/REPAYING.png")) : "EXITING" == planStatus ? imgHref = "//www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/QUITING.png" : "EXITED" == planStatus && (imgHref = "//www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/QUIT.png"),
            imgHref
        }
        ,
        UserUplanDetailProduct.prototype.showPremiumQuitDialog = function() {
            var btnText = this.state.pagePremiumQuitBtn;
            return "请求中" == btnText ? !1 : void this.setState({
                showDialog: !0,
                dialogType: 4,
                pagePremiumQuitBtn: "请求中",
                pagePremiumQuitClassName: "user-plan-button-gray"
            })
        }
        ,
        UserUplanDetailProduct.prototype.premiumQuitCallBack = function() {
            this.setState({
                pagePremiumQuitBtn: "申请退出",
                pagePremiumQuitClassName: "user-plan-button-orange"
            })
        }
        ,
        UserUplanDetailProduct.prototype.showEarlyExitList = function() {
            var _this4 = this;
            uplanService.getAllQuitAdvanceList({}).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , list = data.data || {}
                  , listData = list.list || {}
                  , status = data.status;
                requestStatus === uplanService.STATUS.SUCCESS && 0 === status && _this4.setState({
                    showDialog: !0,
                    dialogType: 5,
                    exitList: listData
                })
            })["catch"](function() {
                _this4.setState({
                    exitList: []
                })
            })
        }
        ,
        UserUplanDetailProduct.prototype.showEarlyExitDialog = function() {
            var _this5 = this;
            this.setState({
                showDialog: !0,
                dialogType: 0
            });
            var detailInfo = this.props.detailInfo
              , financePlanVo = detailInfo.financePlanVo
              , subPointId = financePlanVo.financeSubPointId;
            uplanService.getQuitAdvanceInfo({
                subPointId: subPointId
            }).then(function(result) {
                _this5.setState({
                    isLoading: !1
                });
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                return requestStatus !== uplanService.STATUS.SUCCESS || 0 !== status ? Promise.reject(data.message) : void _this5.setState({
                    isLoading: !1,
                    interest: data.data.amount
                })
            })["catch"](function() {
                _this5.setState({
                    isLoading: !1
                })
            })
        }
        ,
        UserUplanDetailProduct.prototype.showRenewalDialog = function() {
            this.state.isLoading || this.renewalAjax(1)
        }
        ,
        UserUplanDetailProduct.prototype.showRenewalCancelDialog = function() {
            this.state.isLoading || this.cancelRenewalAjax()
        }
        ,
        UserUplanDetailProduct.prototype.showQuitDialog = function() {
            this.setState({
                showDialog: !0,
                dialogType: 3
            })
        }
        ,
        UserUplanDetailProduct.prototype.cancelRenewalAjax = function() {
            var _this6 = this;
            this.setState({
                isLoading: !0,
                pageRenewalBtn: "请求中"
            });
            var detailInfo = this.props.detailInfo
              , financePlanVo = detailInfo.financePlanVo
              , subPointId = financePlanVo.financeSubPointId
              , planId = financePlanVo.id
              , btnText = "取消续期";
            uplanService.rollOverCancelInfo({
                subPointId: subPointId,
                planId: planId
            }).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                if (requestStatus !== uplanService.STATUS.SUCCESS || 0 !== status) {
                    var message = data.message || "请求后端服务出错, 请稍后再试";
                    return Promise.reject(message)
                }
                _this6.setState({
                    isLoading: !1,
                    renewalData: data.data,
                    showDialog: !0,
                    dialogType: 2,
                    pageRenewalBtn: btnText
                })
            })["catch"](function(message) {
                _this6.setState({
                    isLoading: !1,
                    showDialog: !1,
                    showCommonDialog: !0,
                    commonStatus: -2,
                    commonMessage: message || "网络异常，请稍后再试",
                    pageRenewalBtn: btnText
                })
            })
        }
        ,
        UserUplanDetailProduct.prototype.jumpToRisk = function() {
            location.href = "/user/risk/riskPc?type=renewal"
        }
        ,
        UserUplanDetailProduct.prototype.jumpToRiskAgain = function() {
            this.jumpToRisk(),
            $statistic.eventRaw({
                eventId: "click_join_money_limit_remeaure_word"
            })
        }
        ,
        UserUplanDetailProduct.prototype.renderRiskCommonDialog = function() {
            var _state2 = this.state
              , showRiskCommonDialogType = _state2.showRiskCommonDialogType
              , showRiskCommonDialog = _state2.showRiskCommonDialog
              , showRiskCommonDialogResult = _state2.showRiskCommonDialogResult
              , conentDom = null
              , buttons = null;
            0 == showRiskCommonDialogType ? (conentDom = React.createElement("div", null, "授权出借前需完成风险测评"),
            buttons = [{
                text: "我知道了",
                event: this.closeRiskCommonDialog,
                skin: "white"
            }, {
                text: "去测评",
                event: this.jumpToRisk,
                skin: "orange"
            }]) : 1 == showRiskCommonDialogType ? (conentDom = React.createElement("div", null, "您的风险等级为", React.createElement("em", {
                className: "text-orange-color"
            }, showRiskCommonDialogResult.currentRiskLevel), "，达到", React.createElement("em", {
                className: "text-orange-color"
            }, showRiskCommonDialogResult.nextRiskLevel), "才可出借此项目"),
            buttons = [{
                text: "我知道了",
                event: this.closeRiskCommonDialog,
                skin: "white"
            }, {
                text: "重新测评",
                event: this.jumpToRiskAgain,
                skin: "orange"
            }]) : 2 == showRiskCommonDialogType && (conentDom = React.createElement("div", null, "您当前在平台的出借本金已超出您的风险承受能力，为了您的资金安全，您将不能继续在平台出借。"),
            buttons = [{
                text: "我知道了",
                event: this.closeRiskCommonDialog,
                skin: "orange"
            }]);
            var dialogProps = $.extend({}, {
                onRequestClose: this.closeRiskCommonDialog,
                buttons: buttons,
                status: -99999,
                message: conentDom || "网络异常，请稍后再试"
            });
            return showRiskCommonDialog ? React.createElement(RWeStatusDialog, dialogProps) : null
        }
        ,
        UserUplanDetailProduct.prototype.riskValidate = function(isRisk, money, renewalData, dialogType, btnText) {
            var _this7 = this;
            return isRisk ? p2pService.checkRiskLimit({
                amount: money
            }).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status
                  , message = data.message;
                if (requestStatus === uplanService.STATUS.SUCCESS && 0 === status)
                    _this7.setState({
                        isLoading: !1,
                        renewalData: renewalData,
                        showDialog: !0,
                        dialogType: dialogType,
                        pageRenewalBtn: btnText,
                        pageRenewalClassName: "user-plan-button-orange"
                    });
                else if (80029 == status)
                    _this7.setState({
                        showRiskCommonDialog: !0,
                        showRiskCommonDialogType: 1,
                        showRiskCommonDialogResult: data.data
                    });
                else {
                    if (80030 != status)
                        return Promise.reject(message);
                    _this7.setState({
                        showRiskCommonDialog: !0,
                        showRiskCommonDialogType: 2
                    })
                }
            })["catch"](function(message) {
                console.log("请求判断是否超过风评限额出错：" + message),
                _this7.setState({
                    isLoading: !1,
                    showDialog: !1,
                    showCommonDialog: !0,
                    commonStatus: -2,
                    commonMessage: message || "网络异常，请稍后再试",
                    pageRenewalBtn: btnText,
                    pageRenewalClassName: "user-plan-button-orange"
                })
            }) : void this.setState({
                showDialog: !1,
                showCommonDialog: !1,
                showRiskCommonDialog: !0,
                showRiskCommonDialogType: 0
            })
        }
        ,
        UserUplanDetailProduct.prototype.renewalAjax = function(dialogType) {
            var _this8 = this;
            this.setState({
                isLoading: !0,
                pageRenewalBtn: "请求中",
                pageRenewalClassName: "user-plan-button-gray"
            });
            var detailInfo = this.props.detailInfo
              , financePlanVo = detailInfo.financePlanVo
              , subPointId = financePlanVo.financeSubPointId
              , btnText = "";
            btnText = 1 == dialogType ? "续期" : "取消续期",
            uplanService.getRollOverInfo({
                subPointId: subPointId
            }).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                if (requestStatus !== uplanService.STATUS.SUCCESS || 0 !== status) {
                    var message = data.message || "请求后端服务出错, 请稍后再试";
                    return Promise.reject(message)
                }
                var renewalData = data.data
                  , riskInfo = renewalData.riskInfo
                  , rollOverAmount = renewalData.rollOverAmount
                  , riskFlag = riskInfo.riskFlag
                  , isRisk = riskInfo.isRisk;
                1 == dialogType && riskFlag ? _this8.riskValidate(isRisk, rollOverAmount, renewalData, dialogType, btnText) : _this8.setState({
                    isLoading: !1,
                    renewalData: renewalData,
                    showDialog: !0,
                    dialogType: dialogType,
                    pageRenewalBtn: btnText,
                    pageRenewalClassName: "user-plan-button-orange"
                })
            })["catch"](function(message) {
                _this8.setState({
                    isLoading: !1,
                    showDialog: !1,
                    showCommonDialog: !0,
                    commonStatus: -2,
                    commonMessage: message || "网络异常，请稍后再试",
                    pageRenewalBtn: btnText,
                    pageRenewalClassName: "user-plan-button-orange"
                })
            })
        }
        ,
        UserUplanDetailProduct.prototype.closeDialog = function() {
            this.setState({
                showDialog: !1,
                isQuitOkDialog: 0
            })
        }
        ,
        UserUplanDetailProduct.prototype.onRequestClose4OldUplan = function() {
            var _this9 = this;
            this.setState({
                isQuitOkDialog: 1
            });
            var detailInfo = this.props.detailInfo
              , financePlanVo = detailInfo.financePlanVo
              , subPointId = financePlanVo.financeSubPointId;
            uplanService.getPlanQuitInfo({
                subPointId: subPointId
            }).then(function(result) {
                _this9.setState({
                    isLoading: !1
                });
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                if (requestStatus !== uplanService.STATUS.SUCCESS || 0 !== status) {
                    var message = data.message || "请求后端服务出错, 请稍后再试";
                    return Promise.reject(message)
                }
                _this9.setState({
                    isLoading: !1,
                    quitData: data
                })
            })["catch"](function(message) {
                _this9.setState({
                    isLoading: !1,
                    showDialog: !1,
                    showCommonDialog: !0,
                    commonStatus: -2,
                    commonMessage: message || "网络异常，请稍后再试"
                })
            })
        }
        ,
        UserUplanDetailProduct.prototype.handleResult = function(data) {
            var status = data.status
              , message = data.message;
            this.setState({
                showDialog: !1,
                showCommonDialog: !0,
                commonStatus: status,
                commonMessage: message
            })
        }
        ,
        UserUplanDetailProduct.prototype.renderDialog = function() {
            var content = null
              , props = this.props
              , state = this.state;
            if (!state.showDialog)
                return content;
            var dialogType = state.dialogType
              , detailInfo = props.detailInfo
              , dialogProps = (props.rolloverResultData,
            $.extend({}, props, {
                detailInfo: detailInfo,
                rolloverResultData: state.renewalData,
                onRequestClose: this.closeDialog,
                onRequestClose4OldUplan: this.onRequestClose4OldUplan,
                handleResult: this.handleResult,
                premiumQuitCallBack: this.premiumQuitCallBack,
                interest: state.interest,
                quitData: state.quitData,
                isQuitOkDialog: state.isQuitOkDialog,
                exitList: state.exitList
            }));
            switch (dialogType) {
            case 0:
                content = React.createElement(RUserUplanEarlyExitDialog, dialogProps);
                break;
            case 1:
                content = React.createElement(RUserUplanRenewalDialog, dialogProps);
                break;
            case 2:
                content = React.createElement(RUserUplanRenewalCancelDialog, dialogProps);
                break;
            case 3:
                content = React.createElement(RUserUplanQuitDialog, dialogProps);
                break;
            case 4:
                content = React.createElement(RUserPremiumQuitDialog, dialogProps);
                break;
            case 5:
                content = React.createElement(RUserUplanQuitListDialog, dialogProps)
            }
            return content
        }
        ,
        UserUplanDetailProduct.prototype.closeCommonDialog = function() {
            this.setState({
                showCommonDialog: !1,
                isQuitOkDialog: 0
            });
            var status = this.state.commonStatus;
            0 == status && window.location.reload()
        }
        ,
        UserUplanDetailProduct.prototype.closeRiskCommonDialog = function() {
            this.setState({
                showRiskCommonDialog: !1,
                isLoading: !1,
                pageRenewalBtn: "续期",
                pageRenewalClassName: "user-plan-button-orange"
            })
        }
        ,
        UserUplanDetailProduct.prototype.renderCommonDialog = function() {
            var props = this.props
              , message = this.state.commonMessage
              , status = this.state.commonStatus
              , dialogProps = $.extend({}, props, {
                onRequestClose: this.closeCommonDialog,
                status: status,
                message: message
            })
              , content = React.createElement(RWeStatusDialog, dialogProps);
            return content
        }
        ,
        UserUplanDetailProduct.prototype.render = function() {
            var props = this.props
              , state = this.state
              , detailInfo = props.detailInfo
              , financePlanVo = detailInfo.financePlanVo
              , category = financePlanVo.category
              , financePlanType = financePlanVo.financePlanType
              , showCommonDialog = this.state.showCommonDialog
              , btnDom = null
              , renewalDialog = null
              , transformDialog = null;
            "PREMIUM" == financePlanType ? (btnDom = this.premiumRenewalStatus(),
            renewalDialog = state.showRenewalDialog ? React.createElement(PremiumRenewalDialog, {
                subPointId: financePlanVo.financeSubPointId,
                financePlanId: financePlanVo.id,
                type: "detailPremium",
                closeRenewalDialog: this.closeRenewalDialog.bind(this)
            }) : null,
            transformDialog = state.showPremiumTransformDialog ? React.createElement(PremiumTransformDialog, {
                subPointId: financePlanVo.financeSubPointId,
                closeTransformDialog: this.closeTransformDialog
            }) : null) : btnDom = "OLD" != category ? this.uplanStatus() : this.oldUplanStatus();
            var imageStamp = this.getImgStamp()
              , imageStampDom = imageStamp ? React.createElement("div", {
                className: "stamp-new"
            }, React.createElement("image", {
                src: imageStamp
            })) : null
              , dialog = this.renderDialog()
              , commomDialogDom = this.renderCommonDialog()
              , commomDialog = showCommonDialog ? commomDialogDom : null
              , riskCommonDialogDom = this.renderRiskCommonDialog();
            return React.createElement("div", {
                className: "product-info-status fn-left"
            }, btnDom, imageStampDom, dialog, commomDialog, riskCommonDialogDom, renewalDialog, transformDialog)
        }
        ,
        UserUplanDetailProduct
    }(React.Component);
    module.exports = UserUplanDetailProduct
});
;/*!/client/widget/user/detail/RUserUplanDetailProduct/RUserUplanDetailProduct.js*/
define("uplan:widget/user/detail/RUserUplanDetailProduct/RUserUplanDetailProduct.js", function(require, exports, module) {
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
      , RUserUplanDetailProductStatus = require("uplan:widget/user/detail/RUserUplanDetailProductStatus/RUserUplanDetailProductStatus")
      , RWETooltip = require("common:widget/react-ui/RWETooltip/RWETooltip")
      , RCashType = require("uplan:widget/user/detail/RCashType/RCashType")
      , utils = require("common:widget/ui/utils/utils")
      , moment = require("common:node_modules/moment/moment")
      , $statistic = require("common:node_modules/glpb-components-common/src/index").weStatistic
      , UserUplanDetailProduct = function(_React$Component) {
        function UserUplanDetailProduct(props) {
            _classCallCheck(this, UserUplanDetailProduct),
            _React$Component.call(this, props),
            this.changeCashType = this.changeCashType.bind(this),
            this.handleChangeCashType = this.handleChangeCashType.bind(this),
            this.state = {
                isShowOldUplanCashType: !1
            }
        }
        return _inherits(UserUplanDetailProduct, _React$Component),
        UserUplanDetailProduct.prototype.componentDidMount = function() {
            var detailInfo = this.props.detailInfo
              , financePlanVo = detailInfo.financePlanVo
              , financePlanType = financePlanVo.financePlanType;
            "PREMIUM" == financePlanType && this.enterPremiumPoint()
        }
        ,
        UserUplanDetailProduct.prototype.enterPremiumPoint = function() {
            $statistic.track("enter_myPremiumDetail_pc")
        }
        ,
        UserUplanDetailProduct.prototype.changeCashType = function() {
            this.setState({
                isShowOldUplanCashType: !this.state.isShowOldUplanCashType
            })
        }
        ,
        UserUplanDetailProduct.prototype.handleChangeCashType = function(data) {
            this.setState({
                isShowOldUplanCashType: !1
            }),
            this.refs.userUplanDetailStatus.handleResult(data)
        }
        ,
        UserUplanDetailProduct.prototype.getCashTypeCN = function(cashType) {
            var cashTypeCN = "";
            return "INVEST" == cashType ? cashTypeCN = "循环出借" : "RRD" == cashType && (cashTypeCN = "提取至账户"),
            cashTypeCN
        }
        ,
        UserUplanDetailProduct.prototype.getQuitTypeCN = function(quitType) {
            var quitTypeCN = "";
            return "RRD" == quitType ? quitTypeCN = "提取至账户" : "BANK" == quitType && (quitTypeCN = "每隔7天提至银行卡"),
            quitTypeCN
        }
        ,
        UserUplanDetailProduct.prototype.getToolTip = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlanVo = detailInfo.financePlanVo
              , tooltipDom = '<div>\n                            <div className="line-01">利息循环出借金额：' + financePlanVo.interestReinvestedAmount + '元</div>\n                            <div className="line-02">已提取金额：' + financePlanVo.totalCashDrawInterest + "元</div>\n                         </div>";
            return tooltipDom
        }
        ,
        UserUplanDetailProduct.prototype.isPremiumFreeTime = function isPremiumFreeTime() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlanVo = detailInfo.financePlanVo || {}
              , endLockingTime = financePlanVo.endLockingTime || ""
              , endLockingTimeStr = endLockingTime ? endLockingTime + " 23:59:59" : ""
              , endLockingTimeStamp = moment(endLockingTimeStr).format("x")
              , nowTime = moment().format("x")
              , isPremiumFreeTime = nowTime > endLockingTimeStamp ? !0 : !1;
            return isPremiumFreeTime
        }
        ,
        UserUplanDetailProduct.prototype.getFreeEndTime = function(beginSellingTime, salePeriod, finalPeriod) {
            var beginSellingTimeStamp = moment(parseInt(beginSellingTime)).set({
                hour: 23,
                minute: 59,
                second: 59,
                millisecond: 0
            }).format("x")
              , endFreeDate = parseInt(beginSellingTimeStamp) + 864e5 * salePeriod
              , endFreeTime = moment(endFreeDate).add(finalPeriod, "months").format("x");
            return endFreeTime
        }
        ,
        UserUplanDetailProduct.prototype.premiumInfoDom = function() {
            {
                var props = this.props
                  , detailInfo = props.detailInfo
                  , canQuit = (detailInfo.applyQuitInfo,
                detailInfo.canQuit)
                  , financePlanVo = detailInfo.financePlanVo
                  , scoreRecord = detailInfo.scoreRecord
                  , userCouponForProduct = detailInfo.userCouponForProduct
                  , freedomDueTime = detailInfo.freedomDueTime
                  , premiumRolloverStatus = detailInfo.premiumRolloverStatus
                  , premiumRolloverCreateTime = (detailInfo.transformStatus,
                detailInfo.premiumRolloverCreateTime)
                  , planStatus = financePlanVo.planStatus
                  , lockPeriod = financePlanVo.lockPeriod
                  , quitRate = financePlanVo.quitRate
                  , finalAmount = financePlanVo.finalAmount
                  , expectedYearRate = financePlanVo.expectedYearRate
                  , earnAmount = financePlanVo.earnAmount;
                financePlanVo.bankId
            }
            finalAmount = finalAmount ? utils.commaInteger(finalAmount) : 0;
            var latestRegTime = financePlanVo.latestRegTime
              , endLockingTime = financePlanVo.endLockingTime
              , redFinishTime = financePlanVo.redFinishTime
              , holdingAsset = financePlanVo.holdingAsset;
            holdingAsset = holdingAsset ? utils.commaFloat(holdingAsset) : 0;
            var exitWay = (financePlanVo.leftLockDay,
            financePlanVo.exitWay)
              , cashType = (financePlanVo.cashDrawDay,
            financePlanVo.cashType)
              , quitType = (this.getCashTypeCN(cashType),
            financePlanVo.quitType)
              , holdingAssetHtml = (this.getQuitTypeCN(quitType),
            React.createElement("ul", {
                className: "has-invest fn-left"
            }, React.createElement("li", {
                className: "value"
            }, finalAmount, React.createElement("i", null, "元")), React.createElement("li", {
                className: "name"
            }, "出借本金")))
              , holdingAssetHtml02 = React.createElement("ul", {
                className: "has-invest fn-left"
            }, React.createElement("li", {
                className: "value"
            }, holdingAsset, React.createElement("i", null, "元")), React.createElement("li", {
                className: "name"
            }, "持有资产"))
              , exitText = "";
            0 == premiumRolloverStatus && canQuit && (exitText = React.createElement("ul", {
                className: "fn-clear"
            }, React.createElement("li", {
                className: "fn-left width100"
            }, " *", lockPeriod, "个月内提前退出费用为加入本金的", quitRate, "%，自由服务期内退出免费")));
            var endLockingTimeShow = React.createElement("li", {
                className: "fn-left"
            }, "固定服务期结束日", React.createElement("span", {
                className: "extra-value"
            }, endLockingTime))
              , premiumRenewalDom = null
              , scoreDeductionDom = null
              , lendScoreDom = null
              , scoreDeductionDomArr = [];
            if (scoreRecord) {
                var lendScore = scoreRecord.lendScore
                  , lendScoreAmount = scoreRecord.lendScoreAmount;
                if (lendScore && lendScoreAmount) {
                    var lendScoreF = utils.commaInteger(lendScore)
                      , lendScoreAmountF = utils.commaInteger(lendScoreAmount);
                    lendScoreDom = "使用" + lendScoreF + "积分抵扣" + lendScoreAmountF + "元",
                    scoreDeductionDomArr.push(lendScoreDom),
                    scoreDeductionDom = React.createElement("ul", {
                        className: "fn-clear"
                    }, React.createElement("li", {
                        className: "fn-left width100_01"
                    }, "积分", React.createElement("span", {
                        className: "extra-value"
                    }, " ", lendScoreDom)))
                }
            }
            var endTimeDate = moment(parseInt(freedomDueTime)).format("YYYY-MM-DD");
            if (1 === premiumRolloverStatus) {
                var premiumRolloverCreateTimeDate = moment(parseInt(premiumRolloverCreateTime)).format("YYYY-MM-DD");
                if (endLockingTimeShow = React.createElement("li", {
                    className: "fn-left"
                }, "转固定期操作日", React.createElement("span", {
                    className: "extra-value"
                }, premiumRolloverCreateTimeDate)),
                premiumRenewalDom = React.createElement("ul", {
                    className: "fn-clear"
                }, React.createElement("li", {
                    className: "fn-left"
                }, "到期日", React.createElement("span", {
                    className: "extra-value"
                }, endTimeDate))),
                scoreRecord) {
                    var premiumRolloverScore = scoreRecord.premiumRolloverScore
                      , premiumRolloverScoreAmount = scoreRecord.premiumRolloverScoreAmount;
                    if (premiumRolloverScore && premiumRolloverScoreAmount) {
                        var premiumRolloverScoreF = utils.commaInteger(premiumRolloverScore)
                          , premiumRolloverScoreAmountF = utils.commaInteger(premiumRolloverScoreAmount)
                          , premiumRolloverScoreDom = "转固定期使用" + premiumRolloverScoreF + "积分抵扣" + premiumRolloverScoreAmountF + "元";
                        scoreDeductionDomArr.push(premiumRolloverScoreDom);
                        var scoreDeductionData = scoreDeductionDomArr.join("、");
                        scoreDeductionDom = React.createElement("ul", {
                            className: "fn-clear"
                        }, React.createElement("li", {
                            className: "fn-left width100_01"
                        }, "积分", React.createElement("span", {
                            className: "extra-value"
                        }, " ", scoreDeductionData)))
                    }
                }
            } else
                1 === detailInfo.lockingStatus && (premiumRenewalDom = React.createElement("ul", {
                    className: "fn-clear"
                }, React.createElement("li", {
                    className: "fn-left"
                }, "自由服务期结束日", React.createElement("span", {
                    className: "extra-value"
                }, endTimeDate))));
            var couponDom = null;
            if (userCouponForProduct && userCouponForProduct.userCouponVos) {
                var userCouponVosText = utils.coupon4Uplan(userCouponForProduct.userCouponVos);
                couponDom = React.createElement("ul", {
                    className: "fn-clear width100_01"
                }, React.createElement("li", {
                    className: "fn-left  width48"
                }, "优惠券"), React.createElement("li", {
                    className: "fn-left  width592"
                }, userCouponVosText))
            }
            var detailBasicDom = React.createElement("div", {
                className: "product-info-extra"
            }, React.createElement("ul", {
                className: "fn-clear"
            }, React.createElement("li", {
                className: "fn-left"
            }, "授权出借日", React.createElement("span", {
                className: "extra-value"
            }, latestRegTime)), endLockingTimeShow), premiumRenewalDom, couponDom, scoreDeductionDom, exitText);
            if ("INPROGRESS" == planStatus) {
                var isPremiumFreeTime = this.isPremiumFreeTime();
                (isPremiumFreeTime || 1 === premiumRolloverStatus) && (holdingAssetHtml = holdingAssetHtml02)
            } else
                "EXITED" == planStatus ? (redFinishTime = moment(parseInt(redFinishTime)).format("YYYY-MM-DD"),
                detailBasicDom = React.createElement("div", {
                    className: "product-info-extra"
                }, React.createElement("ul", {
                    className: "fn-clear"
                }, React.createElement("li", {
                    className: "fn-left"
                }, "授权出借日", React.createElement("span", {
                    className: "extra-value"
                }, latestRegTime)), React.createElement("li", {
                    className: "fn-left"
                }, "固定服务期结束日", React.createElement("span", {
                    className: "extra-value"
                }, endLockingTime))), React.createElement("ul", {
                    className: "fn-clear"
                }, React.createElement("li", {
                    className: "fn-left"
                }, "退出时间", React.createElement("span", {
                    className: "extra-value"
                }, redFinishTime)), React.createElement("li", {
                    className: "fn-left"
                }, "退出途径", React.createElement("span", {
                    className: "extra-value"
                }, exitWay))), couponDom, scoreDeductionDom)) : "EXITING" == planStatus && (holdingAssetHtml = holdingAssetHtml02);
            return React.createElement("div", null, React.createElement("div", {
                className: "product-info-number fn-clear"
            }, React.createElement("ul", {
                className: "has-income fn-left"
            }, React.createElement("li", {
                className: "value"
            }, earnAmount, React.createElement("i", null, "元")), React.createElement("li", {
                className: "name"
            }, "已获利息")), holdingAssetHtml, React.createElement("ul", {
                className: "year-rate fn-left"
            }, React.createElement("li", {
                className: "value"
            }, expectedYearRate, React.createElement("i", null, "%")), React.createElement("li", {
                className: "name"
            }, "扣费后年利率"))), detailBasicDom)
        }
        ,
        UserUplanDetailProduct.prototype.uplanInfoDom = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , _detailInfo$scoreRecord = detailInfo.scoreRecord
              , scoreRecord = void 0 === _detailInfo$scoreRecord ? {} : _detailInfo$scoreRecord
              , userCouponForProduct = detailInfo.userCouponForProduct
              , financePlanVo = detailInfo.financePlanVo
              , planStatus = financePlanVo.planStatus
              , finalAmount = financePlanVo.finalAmount
              , expectedYearRate = financePlanVo.expectedYearRate
              , earnAmount = financePlanVo.earnAmount
              , bankId = financePlanVo.bankId;
            finalAmount = finalAmount ? utils.commaInteger(finalAmount) : 0;
            var latestRegTime = financePlanVo.latestRegTime
              , endLockingTime = financePlanVo.endLockingTime
              , exitWay = (financePlanVo.leftLockDay,
            financePlanVo.exitWay)
              , cashDrawDay = financePlanVo.cashDrawDay
              , cashType = financePlanVo.cashType
              , cashTypeCN = this.getCashTypeCN(cashType)
              , quitType = financePlanVo.quitType
              , dom1 = (this.getQuitTypeCN(quitType),
            "INPROGRESS" != planStatus ? React.createElement("li", {
                className: "fn-left"
            }, "退出途径", React.createElement("span", {
                className: "extra-value"
            }, exitWay)) : "")
              , subDom2 = null != bankId ? React.createElement("span", {
                className: "extra-value"
            }, cashTypeCN, " 每月", cashDrawDay, "日提取至银行卡") : React.createElement("span", {
                className: "extra-value"
            }, cashTypeCN)
              , dom2 = "INPROGRESS" == planStatus ? React.createElement("li", {
                className: "fn-left"
            }, "处理方式", subDom2) : null
              , tooltipDom = this.getToolTip()
              , tooltipProps = {
                id: "user-uplan-tooltip-02",
                place: "right",
                tip: tooltipDom,
                delayHide: 100
            }
              , lendScore = scoreRecord.lendScore || 0
              , lendScoreAmount = scoreRecord.lendScoreAmount || 0
              , lendScoreAmountString = utils.commaNormal(lendScoreAmount)
              , lendScoreString = utils.commaInteger(lendScore)
              , scoreDom = null;
            lendScoreAmount && (scoreDom = React.createElement("ul", {
                className: "fn-clear"
            }, React.createElement("li", {
                className: "fn-left"
            }, "积分", React.createElement("span", {
                className: "extra-value"
            }, "使用" + lendScoreString + "积分抵扣" + lendScoreAmountString + "元"))));
            var couponDom = null;
            if (userCouponForProduct && userCouponForProduct.userCouponVos) {
                var userCouponVosText = utils.coupon4Uplan(userCouponForProduct.userCouponVos);
                couponDom = React.createElement("ul", {
                    className: "fn-clear width100_01"
                }, React.createElement("li", {
                    className: "fn-left  width48"
                }, "优惠券"), React.createElement("li", {
                    className: "fn-left  width592"
                }, userCouponVosText))
            }
            return React.createElement("div", null, React.createElement("div", {
                className: "product-info-number fn-clear"
            }, React.createElement("ul", {
                className: "has-income fn-left"
            }, React.createElement("li", {
                className: "value"
            }, earnAmount, React.createElement("i", null, "元")), React.createElement("li", {
                className: "name"
            }, "已获利息", React.createElement(RWETooltip, tooltipProps))), React.createElement("ul", {
                className: "has-invest fn-left"
            }, React.createElement("li", {
                className: "value"
            }, finalAmount, React.createElement("i", null, "元")), React.createElement("li", {
                className: "name"
            }, "授权出借本金")), React.createElement("ul", {
                className: "year-rate fn-left"
            }, React.createElement("li", {
                className: "value"
            }, expectedYearRate, React.createElement("i", null, "%")), React.createElement("li", {
                className: "name"
            }, "扣费后年利率"))), React.createElement("div", {
                className: "product-info-extra"
            }, React.createElement("ul", {
                className: "fn-clear"
            }, React.createElement("li", {
                className: "fn-left"
            }, "授权出借日", React.createElement("span", {
                className: "extra-value"
            }, latestRegTime)), React.createElement("li", {
                className: "fn-left"
            }, "到期日", React.createElement("span", {
                className: "extra-value"
            }, endLockingTime))), React.createElement("ul", {
                className: "fn-clear"
            }, dom1, dom2), couponDom, scoreDom))
        }
        ,
        UserUplanDetailProduct.prototype.oldUplanInfoDom = function() {
            var props = this.props
              , detailInfo = props.detailInfo
              , financePlanVo = detailInfo.financePlanVo
              , finalAmount = financePlanVo.finalAmount
              , aveLoanRate = financePlanVo.aveLoanRate
              , earnAmount = financePlanVo.earnAmount
              , planStatus = financePlanVo.planStatus
              , bankId = financePlanVo.bankId;
            finalAmount = finalAmount ? utils.commaInteger(finalAmount) : 0;
            var latestRegTime = financePlanVo.latestRegTime
              , endLockingTime = financePlanVo.endLockingTime
              , leftLockDay = financePlanVo.leftLockDay
              , cashDrawDay = (financePlanVo.exitWay,
            financePlanVo.cashDrawDay)
              , cashType = financePlanVo.cashType
              , cashTypeCN = this.getCashTypeCN(cashType)
              , quitType = financePlanVo.quitType
              , quitTypeCN = this.getQuitTypeCN(quitType)
              , subDom2 = null != bankId ? React.createElement("span", {
                className: "extra-value"
            }, cashTypeCN, " 每月", cashDrawDay, "日提取至银行卡") : React.createElement("span", {
                className: "extra-value"
            }, cashTypeCN)
              , oldUplanCashTypeBtntext = this.state.isShowOldUplanCashType ? "收起" : "更改"
              , dom2 = "INPROGRESS" == planStatus ? React.createElement("li", {
                className: "fn-left"
            }, "处理方式", subDom2, React.createElement("a", {
                href: "javascript:void(0)",
                className: "change-cash-style-a",
                onClick: this.changeCashType
            }, oldUplanCashTypeBtntext)) : React.createElement("li", {
                className: "fn-left"
            }, "退出方式", React.createElement("span", {
                className: "extra-value"
            }, quitTypeCN))
              , tooltipDom = this.getToolTip()
              , tooltipProps = {
                id: "user-uplan-tooltip-03",
                place: "right",
                tip: tooltipDom
            };
            return React.createElement("div", null, React.createElement("div", {
                className: "product-info-number fn-clear"
            }, React.createElement("ul", {
                className: "has-income fn-left"
            }, React.createElement("li", {
                className: "value"
            }, earnAmount, React.createElement("i", null, "元")), React.createElement("li", {
                className: "name"
            }, "已赚金额", React.createElement(RWETooltip, tooltipProps))), React.createElement("ul", {
                className: "has-invest fn-left"
            }, React.createElement("li", {
                className: "value"
            }, finalAmount, React.createElement("i", null, "元")), React.createElement("li", {
                className: "name"
            }, "出借金额")), React.createElement("ul", {
                className: "year-rate fn-left"
            }, React.createElement("li", {
                className: "value"
            }, aveLoanRate, React.createElement("i", null, "%")), React.createElement("li", {
                className: "name"
            }, "扣费后年利率"))), React.createElement("div", {
                className: "product-info-extra"
            }, React.createElement("ul", {
                className: "fn-clear"
            }, React.createElement("li", {
                className: "fn-left"
            }, "交易时间", React.createElement("span", {
                className: "extra-value"
            }, latestRegTime)), React.createElement("li", {
                className: "fn-left"
            }, "锁定结束", React.createElement("span", {
                className: "extra-value"
            }, endLockingTime))), React.createElement("ul", {
                className: "fn-clear"
            }, React.createElement("li", {
                className: "fn-left"
            }, "剩余天数", React.createElement("span", {
                className: "extra-value"
            }, leftLockDay, "天")), dom2)))
        }
        ,
        UserUplanDetailProduct.prototype.render = function() {
            var props = this.props
              , state = this.state
              , detailInfo = props.detailInfo
              , financePlanVo = detailInfo.financePlanVo
              , id = financePlanVo.id
              , financeSubPointId = financePlanVo.financeSubPointId
              , category = financePlanVo.category
              , financePlanType = financePlanVo.financePlanType
              , planStatus = financePlanVo.planStatus
              , cashType = financePlanVo.cashType
              , openDetailHref = "/uplan-" + id + ".html"
              , contractOpenHref = "/p2p/contract/finance?id=" + id
              , contractRiskHref = "/p2p/contract/financeRisk?id=" + id
              , fromRollOverPlanName = detailInfo.fromRollOverPlanName || ""
              , fromRollOverTime = detailInfo.fromRollOverTime || ""
              , fromRollOverType = detailInfo.fromRollOverType || ""
              , uplanFrom = "";
            if (fromRollOverPlanName) {
                var fromRollOverDate = moment(fromRollOverTime).format("YYYY-MM-DD")
                  , uplanTime = fromRollOverTime ? "于" + fromRollOverDate : ""
                  , fromRollOverTypeStr = "续期";
                if ("PREMIUM" == fromRollOverType) {
                    fromRollOverTypeStr = "转";
                    var fromRollOverPlanId = detailInfo.fromRollOverPlanId
                      , fromRollOverSubPointId = detailInfo.fromRollOverSubPointId;
                    openDetailHref = "/uplan/user/detail?financePlanId=" + fromRollOverPlanId + "&subPointId=" + fromRollOverSubPointId + "&type=premium"
                }
                uplanTime = "" + uplanTime + fromRollOverTypeStr + "自" + fromRollOverPlanName,
                uplanFrom = React.createElement("span", {
                    className: "form-text"
                }, uplanTime)
            }
            var openDetailDom = "EXITED" != planStatus ? React.createElement("a", {
                href: openDetailHref
            }, "详情") : null
              , contractDom = "OLD" != category ? "PREMIUM" == financePlanType ? "查看优选服务协议" : "查看服务协议" : "查看优选理财计划服务协议"
              , riskDom = "风险揭示书"
              , premiumRolloverStatus = detailInfo.premiumRolloverStatus
              , transformStatus = detailInfo.transformStatus
              , premiumAgreement = null;
            if (1 === premiumRolloverStatus || 1 === transformStatus) {
                var premiumRenewal = "/p2p/contract/premiumRenewal?id=" + id;
                1 === transformStatus && (premiumRenewal = "/p2p/contract/premiumTransformU?id=" + financeSubPointId),
                premiumAgreement = React.createElement("span", null, React.createElement("a", {
                    href: contractOpenHref,
                    target: "_blank"
                }, "查看优选服务协议"), "、", React.createElement("a", {
                    href: premiumRenewal,
                    target: "_blank"
                }, "优选服务补充协议"))
            } else
                premiumAgreement = React.createElement("a", {
                    href: contractOpenHref,
                    target: "_blank"
                }, contractDom);
            var infoDom = null;
            infoDom = "PREMIUM" == financePlanType ? this.premiumInfoDom() : "OLD" != category ? this.uplanInfoDom() : this.oldUplanInfoDom();
            var cashTypeDom = state.isShowOldUplanCashType ? React.createElement(RCashType, {
                financeSubPointId: financeSubPointId,
                financeId: id,
                cashType: cashType,
                changeCashType: this.changeCashType,
                handleChangeCashType: this.handleChangeCashType
            }) : null;
            return React.createElement("div", {
                id: "wdg-detail-uplan-user",
                className: "container_12_1080 color-white-bg"
            }, React.createElement("ul", {
                className: "ui-title fn-clear"
            }, React.createElement("li", {
                className: "fn-left"
            }, financePlanVo.name, uplanFrom, openDetailDom), React.createElement("li", {
                className: "fn-right"
            }, premiumAgreement, this.props.showFinanceContractRisk ? React.createElement("span", null, "、", React.createElement("a", {
                href: contractRiskHref,
                style: {
                    marginLeft: 0
                },
                target: "_blank"
            }, riskDom)) : "")), React.createElement("div", {
                className: "ui-product-info fn-clear"
            }, React.createElement("div", {
                className: "product-info-main  fn-left"
            }, infoDom), React.createElement(RUserUplanDetailProductStatus, {
                detailInfo: detailInfo,
                ref: "userUplanDetailStatus"
            })), cashTypeDom)
        }
        ,
        UserUplanDetailProduct
    }(React.Component);
    module.exports = UserUplanDetailProduct
});
;/*!/client/widget/user/detail/RUserUplanDetailProcess/RUserUplanDetailProcess.js*/
define("uplan:widget/user/detail/RUserUplanDetailProcess/RUserUplanDetailProcess.js", function(require, exports, module) {
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
      , utils = require("common:widget/ui/utils/utils")
      , UserUplanDetailProcess = (require("common:node_modules/moment/moment"),
    function(_React$Component) {
        function UserUplanDetailProcess(props) {
            _classCallCheck(this, UserUplanDetailProcess),
            _React$Component.call(this, props)
        }
        return _inherits(UserUplanDetailProcess, _React$Component),
        UserUplanDetailProcess.prototype.render = function() {
            var props = this.props
              , detailInfo = (this.state,
            props.detailInfo)
              , financePlanVo = detailInfo.financePlanVo
              , planStatus = financePlanVo.planStatus
              , lockingStatus = detailInfo.lockingStatus
              , premiumRolloverStatus = detailInfo.premiumRolloverStatus
              , premiumRolloverTotalInterest = detailInfo.premiumRolloverTotalInterest
              , category = financePlanVo.category
              , financePlanType = financePlanVo.financePlanType
              , earnAmount = financePlanVo.earnAmount
              , totalInterestReceivable = financePlanVo.totalInterestReceivable
              , lockPeriod = financePlanVo.lockPeriod
              , isShow = !1
              , rightTitleText = "自由服务期内每日扣费后利息实时计算"
              , rightTotalReceivableText = lockPeriod + "个月内扣费后利息" + totalInterestReceivable + "元";
            "PREMIUM" == financePlanType ? 0 === lockingStatus ? isShow = "INPROGRESS" == planStatus ? !0 : !1 : 1 === premiumRolloverStatus && (isShow = !0,
            rightTitleText = "",
            totalInterestReceivable = premiumRolloverTotalInterest,
            rightTotalReceivableText = "到期后扣费利息" + premiumRolloverTotalInterest + "元") : isShow = !0;
            var width = parseInt(earnAmount / totalInterestReceivable * 1e3);
            earnAmount = earnAmount ? utils.commaFloat(earnAmount) : "0.00",
            totalInterestReceivable = earnAmount ? utils.commaFloat(totalInterestReceivable) : "0.00";
            var style = {
                width: width ? width : 0
            }
              , rightTitleDom = "PREMIUM" == financePlanType ? React.createElement("li", {
                className: "fn-right"
            }, rightTitleText) : null
              , rightTotalReceivableDom = "PREMIUM" == financePlanType ? React.createElement("div", {
                className: "fn-right end-value"
            }, rightTotalReceivableText) : React.createElement("div", {
                className: "fn-right end-value"
            }, totalInterestReceivable, "元")
              , dom = "OLD" != category && isShow ? React.createElement("div", {
                id: "wdg-detail-process",
                className: "container_12_1080 color-white-bg mt20"
            }, React.createElement("ul", {
                className: "ui-title fn-clear"
            }, React.createElement("li", {
                className: "fn-left"
            }, "回报表现"), rightTitleDom), React.createElement("div", {
                className: "ui-proceess"
            }, React.createElement("div", {
                className: "process-number"
            }, "已获利息：", React.createElement("i", null, earnAmount, "元")), React.createElement("div", {
                className: "process-bg"
            }, React.createElement("div", {
                className: "process-value",
                style: style
            })), React.createElement("div", {
                className: "fn-clear start-end-value"
            }, React.createElement("div", {
                className: "fn-left start-value"
            }, "0元"), rightTotalReceivableDom))) : null;
            return React.createElement("div", null, dom)
        }
        ,
        UserUplanDetailProcess
    }(React.Component));
    module.exports = UserUplanDetailProcess
});
;/*!/client/widget/user/detail/RUserUplanDetailExitProcess/RUserUplanDetailExitProcess.js*/
define("uplan:widget/user/detail/RUserUplanDetailExitProcess/RUserUplanDetailExitProcess.js", function(require, exports, module) {
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
      , utils = require("common:widget/ui/utils/utils")
      , moment = require("common:node_modules/moment/moment")
      , RWETooltip = require("common:widget/react-ui/RWETooltip/RWETooltip")
      , RUserUplanDetailExitProcess = function(_React$Component) {
        function RUserUplanDetailExitProcess(props) {
            _classCallCheck(this, RUserUplanDetailExitProcess),
            _React$Component.call(this, props);
            var detailInfo = props.detailInfo
              , financePlanVo = detailInfo.financePlanVo
              , financePlanType = financePlanVo.financePlanType
              , length = 0;
            if ("PREMIUM" == financePlanType) {
                var quitPremiumRecord = detailInfo.quitPremiumRecord;
                quitPremiumRecord && (length = quitPremiumRecord.list ? quitPremiumRecord.list.length : 0)
            }
            this.state = {
                checkMore: length > 2 ? !0 : !1
            },
            this.checkMoreClick = this.checkMoreClick.bind(this)
        }
        return _inherits(RUserUplanDetailExitProcess, _React$Component),
        RUserUplanDetailExitProcess.prototype.checkMoreClick = function() {
            var checkMore = this.state.checkMore;
            this.setState({
                checkMore: !checkMore
            })
        }
        ,
        RUserUplanDetailExitProcess.prototype.render = function() {
            var props = this.props
              , state = this.state
              , checkMore = state.checkMore
              , detailInfo = props.detailInfo
              , financePlanVo = detailInfo.financePlanVo
              , category = financePlanVo.category
              , financePlanType = financePlanVo.financePlanType
              , isShow = !1
              , dom = null
              , checkMoreDom = null;
            if ("PREMIUM" == financePlanType) {
                var redFinishTime = financePlanVo.redFinishTime;
                if (redFinishTime && moment(parseInt(redFinishTime, 10)).valueOf() < moment([2018, 0, 1]).valueOf())
                    isShow = !1;
                else {
                    var quitPremiumRecord = detailInfo.quitPremiumRecord
                      , _length = quitPremiumRecord && quitPremiumRecord.list ? quitPremiumRecord.list.length : 0;
                    if (_length > 0) {
                        isShow = !0;
                        var statusDom = this.handlePremiumStatusDom(quitPremiumRecord);
                        _length > 2 && (checkMoreDom = checkMore ? React.createElement("div", {
                            className: "check-more",
                            onClick: this.checkMoreClick
                        }, "点击查看更多", React.createElement("img", {
                            src: "//www.we.com/cms/58b528189826fb2215fd730b/uplan/up.png"
                        })) : React.createElement("div", {
                            className: "check-more",
                            onClick: this.checkMoreClick
                        }, "点击收起", React.createElement("img", {
                            src: "//www.we.com/cms/58b528189826fb2215fd730b/uplan/down.png"
                        }))),
                        dom = React.createElement("div", {
                            className: "exit-free-mutile-box"
                        }, statusDom, checkMoreDom)
                    }
                }
            } else {
                {
                    var quitRecord = detailInfo.quitRecord
                      , planStatus = financePlanVo.planStatus;
                    financePlanVo.endLockingTime
                }
                ("EXITING" == planStatus || "EXITED" == planStatus) && (isShow = !0,
                "EXITING" == planStatus ? null == quitRecord.quitAdvanceTime ? dom = this.renderDom4PeriodExitDom() : "OLD" != category && (dom = this.renderDom4EarlyExitProcessDom()) : quitRecord.quitFinishTime < moment([2018, 0, 1]).valueOf() ? isShow = !1 : null == quitRecord.quitAdvanceTime ? dom = this.renderDom4PeriodSuccessExitDom() : "OLD" != category && (dom = this.renderDom4EarlyExitSuccessDom()))
            }
            return isShow ? React.createElement("div", null, React.createElement("div", {
                id: "wdg-detail-exit-process",
                className: "container_12_1080 color-white-bg mt20"
            }, React.createElement("ul", {
                className: "ui-title"
            }, React.createElement("li", null, "退出记录")), dom)) : null
        }
        ,
        RUserUplanDetailExitProcess.prototype.handlePremiumStatusDom = function(quitPremiumRecordData) {
            var _this = this
              , checkMore = this.state.checkMore
              , quitPremiumRecordList = checkMore ? quitPremiumRecordData.list.slice(0, 2) : quitPremiumRecordData.list
              , listDom = quitPremiumRecordList.map(function(item, idx) {
                var dom = null
                  , quitType = item.quitType
                  , status = item.status;
                return 1 == quitType ? dom = _this.renderDom4FreeMoreExitDom(item, quitType, status, idx) : 2 == quitType ? dom = _this.renderDom4FreeMoreExitDom(item, quitType, status, idx) : 3 == quitType ? dom = "EXITING" == status ? _this.renderDom4EarlyExitProcessDom(item) : _this.renderDom4EarlyExitSuccessDom(item) : 4 == quitType && (dom = "EXITING" == status ? _this.renderDom4PeriodExitDom(item) : _this.renderDom4PeriodSuccessExitDom(item)),
                dom
            });
            return React.createElement("div", null, listDom)
        }
        ,
        RUserUplanDetailExitProcess.prototype.renderDom4EarlyExitProcessDom = function(item) {
            var props = this.props
              , detailInfo = (this.state,
            props.detailInfo)
              , financePlanVo = detailInfo.financePlanVo
              , financePlanType = financePlanVo.financePlanType
              , quitApplyTimeF = void 0
              , transferRatio = void 0
              , transferRatioF = void 0
              , beginTimeF = void 0
              , nameDom = "";
            if ("PREMIUM" == financePlanType) {
                {
                    var applyTime = item.applyTime;
                    item.quitFinishTime,
                    item.quitActualAmount,
                    item.quitAmount
                }
                quitApplyTimeF = applyTime ? moment(applyTime).format("YYYY年MM月DD日 HH:mm") : "",
                beginTimeF = quitApplyTimeF,
                transferRatio = item.transferRatio,
                nameDom = "优选"
            } else {
                {
                    var quitRecord = detailInfo.quitRecord
                      , quitApplyTime = quitRecord.quitApplyTime;
                    quitRecord.quitFinishTime,
                    quitRecord.quitAdvanceTime,
                    quitRecord.quitActualAmount
                }
                quitApplyTimeF = quitApplyTime ? moment(quitApplyTime).format("YYYY年MM月DD日 HH:mm") : "",
                beginTimeF = quitApplyTimeF,
                transferRatio = quitRecord.transferRatio,
                nameDom = "U享"
            }
            transferRatioF = transferRatio + "%";
            var style = {
                width: transferRatioF ? transferRatioF : 0
            }
              , tips01 = "您" + nameDom + "服务内的债权将在此时挂出，待债权完成转让后即退出此期"
              , tips02 = nameDom + "服务，成功退出后资金将退回到个人账户余额中。"
              , tooltipDom = '<div>\n                           <div style="padding-bottom:5px">' + tips01 + '</div>\n                           <div style="padding-bottom:5px">' + tips02 + "</div>\n                         </div>"
              , tooltipProps = {
                id: "early-exit-process-tooltip",
                place: "right",
                tip: tooltipDom,
                delayHide: 100
            }
              , ratioDom = null
              , step02LineClassName = null;
            step02LineClassName = "react-left-blue",
            ratioDom = React.createElement("div", {
                className: "ui-exit-process-bar-blue",
                style: style
            }, React.createElement("div", {
                className: "text"
            }, "债权转让进度", transferRatioF));
            var dom = React.createElement("div", {
                className: "early-exit-process-box"
            }, React.createElement("div", {
                className: "ui-exit-process "
            }, React.createElement("div", {
                className: "ui-exit-process-info fn-clear"
            }, React.createElement("ul", {
                className: "ui-exit-process-step ui-exit-process-step-01 fn-left"
            }, React.createElement("li", {
                className: "ui-exit-process-time"
            }, quitApplyTimeF), React.createElement("li", {
                className: "ui-exit-process-desc"
            }, "申请提前退出"), React.createElement("li", {
                className: "ui-exit-process-line react-left-blue"
            })), React.createElement("ul", {
                className: "ui-exit-process-step ui-exit-process-step-02 fn-left"
            }, React.createElement("li", {
                className: "ui-exit-process-time"
            }, beginTimeF), React.createElement("li", {
                className: "ui-exit-process-desc"
            }, "开始退出", React.createElement(RWETooltip, tooltipProps)), React.createElement("li", {
                className: "ui-exit-process-line " + step02LineClassName
            })), React.createElement("ul", {
                className: "ui-exit-process-step ui-exit-process-step-03 fn-left"
            }, React.createElement("li", {
                className: "ui-exit-process-time"
            }), React.createElement("li", {
                className: "ui-exit-process-desc"
            }, "完成退出"), React.createElement("li", {
                className: "ui-exit-process-line react-right-gray"
            }))), React.createElement("div", {
                className: "ui-exit-process-date fn-clear"
            }, React.createElement("div", {
                className: "ui-exit-process-bar-01 fn-left"
            }), React.createElement("div", {
                className: "ui-exit-process-bar-02 fn-left"
            }, ratioDom, React.createElement("div", {
                className: "text"
            }, "债权转让进度", transferRatioF)))));
            return dom
        }
        ,
        RUserUplanDetailExitProcess.prototype.renderDom4EarlyExitSuccessDom = function(item) {
            var props = this.props
              , detailInfo = (this.state,
            props.detailInfo)
              , financePlanVo = detailInfo.financePlanVo
              , financePlanType = financePlanVo.financePlanType
              , quitApplyTimeF = void 0
              , quitFinishTimeF = void 0
              , quitActualAmountF = void 0;
            if ("PREMIUM" == financePlanType) {
                {
                    var applyTime = item.applyTime
                      , quitFinishTime = item.quitFinishTime
                      , quitActualAmount = item.quitActualAmount;
                    item.quitAmount
                }
                quitApplyTimeF = applyTime ? moment(applyTime).format("YYYY年MM月DD日 HH:mm") : "",
                quitFinishTimeF = quitFinishTime ? moment(quitFinishTime).format("YYYY年MM月DD日 HH:mm") : "",
                quitActualAmountF = quitActualAmount ? utils.commaFloat(quitActualAmount) : "0.00"
            } else {
                var quitRecord = detailInfo.quitRecord
                  , quitApplyTime = quitRecord.quitApplyTime
                  , quitFinishTime = quitRecord.quitFinishTime
                  , quitActualAmount = quitRecord.quitActualAmount;
                quitApplyTimeF = quitApplyTime ? moment(quitApplyTime).format("YYYY年MM月DD日 HH:mm") : "",
                quitFinishTimeF = quitFinishTime ? moment(quitFinishTime).format("YYYY年MM月DD日 HH:mm") : "",
                quitActualAmountF = quitActualAmount ? utils.commaFloat(quitActualAmount) : "0.00"
            }
            var dom = React.createElement("div", {
                className: "early-exit-success-box"
            }, React.createElement("div", {
                className: "ui-exit-process-amount"
            }, "退出金额 ", quitActualAmountF, "元"), React.createElement("div", {
                className: "ui-exit-process "
            }, React.createElement("div", {
                className: "ui-exit-process-info fn-clear"
            }, React.createElement("ul", {
                className: "ui-exit-process-step ui-exit-process-step-01 fn-left"
            }, React.createElement("li", {
                className: "ui-exit-process-time"
            }, quitApplyTimeF), React.createElement("li", {
                className: "ui-exit-process-desc ui-exit-process-desc-gray"
            }, "申请提前退出"), React.createElement("li", {
                className: "ui-exit-process-line react-left-gray"
            })), React.createElement("ul", {
                className: "ui-exit-process-step ui-exit-process-step-02 fn-left"
            }, React.createElement("li", {
                className: "ui-exit-process-time"
            }, quitApplyTimeF), React.createElement("li", {
                className: "ui-exit-process-desc ui-exit-process-desc-gray"
            }, "开始退出"), React.createElement("li", {
                className: "ui-exit-process-line react-left-gray"
            })), React.createElement("ul", {
                className: "ui-exit-process-step ui-exit-process-step-03 fn-left"
            }, React.createElement("li", {
                className: "ui-exit-process-time"
            }, quitFinishTimeF), React.createElement("li", {
                className: "ui-exit-process-desc ui-exit-process-desc-gray"
            }, "完成退出"), React.createElement("li", {
                className: "ui-exit-process-line react-right-gray"
            }))), React.createElement("div", {
                className: "ui-exit-process-date fn-clear"
            }, React.createElement("div", {
                className: "ui-exit-process-bar-01 fn-left"
            }), React.createElement("div", {
                className: "ui-exit-process-bar-02 fn-left"
            }))));
            return dom
        }
        ,
        RUserUplanDetailExitProcess.prototype.renderDom4FreeMoreExitDom = function(item, quitType, status, index) {
            var quitApplyTimeF = void 0
              , quitFinishTimeF = void 0
              , quitActualAmountF = void 0
              , transferRatioF = void 0
              , quitAmountF = void 0
              , applyTime = item.applyTime
              , quitFinishTime = item.quitFinishTime
              , quitActualAmount = item.quitActualAmount
              , quitAmount = item.quitAmount
              , transferRatio = item.transferRatio
              , redOpenTime = item.redOpenTime;
            quitApplyTimeF = applyTime ? moment(applyTime).format("YYYY年MM月DD日 HH:mm") : "",
            quitFinishTimeF = quitFinishTime ? moment(quitFinishTime).format("YYYY年MM月DD日 HH:mm") : "",
            quitActualAmountF = quitActualAmount ? utils.commaFloat(quitActualAmount) : "0.00",
            quitAmountF = quitAmount ? utils.commaFloat(quitAmount) : "0.00";
            var title = 1 == quitType ? "申请退出金额 " + quitAmountF + "元" : "已申请全部退出";
            transferRatioF = transferRatio + "%";
            var style = {
                width: transferRatioF ? transferRatioF : 0
            }
              , quitBeginTimeF = redOpenTime ? moment(redOpenTime).format("YYYY年MM月DD日 HH:mm") : ""
              , tooltipDom = '<div>\n                           <div style="padding-bottom:5px">您优选服务内的债权将在此时挂出，待债权完成转</div>\n                           <div style="padding-bottom:5px">让后即退出此期优选服务，成功退出后资金将退回</div>\n                           <div style="padding-bottom:5px">到个人账户余额中。</div>\n                         </div>'
              , tooltipProps = {
                id: "free-process-tooltip-" + index,
                place: "right",
                tip: tooltipDom,
                delayHide: 100
            }
              , dom = null
              , borderTopStyle = 0 == index ? {
                borderTop: "none"
            } : null;
            if ("INIT" == status || "EXITING" == status) {
                var ratioDom = null
                  , step02LineClassName = null;
                !transferRatio || 0 >= transferRatio ? (quitBeginTimeF = "",
                step02LineClassName = "react-left-gray") : (step02LineClassName = "react-left-blue",
                ratioDom = React.createElement("div", {
                    className: "ui-exit-process-bar-blue",
                    style: style
                }, React.createElement("div", {
                    className: "text"
                }, "债权转让进度", transferRatioF))),
                dom = React.createElement("div", {
                    className: "exit-free-all-box"
                }, React.createElement("div", {
                    className: "ui-exit-process-amount",
                    style: borderTopStyle
                }, title), React.createElement("div", {
                    className: "ui-exit-process "
                }, React.createElement("div", {
                    className: "ui-exit-process-info fn-clear"
                }, React.createElement("ul", {
                    className: "ui-exit-process-step ui-exit-process-step-01 fn-left"
                }, React.createElement("li", {
                    className: "ui-exit-process-time"
                }, quitApplyTimeF), React.createElement("li", {
                    className: "ui-exit-process-desc"
                }, "申请退出"), React.createElement("li", {
                    className: "ui-exit-process-line react-left-blue"
                })), React.createElement("ul", {
                    className: "ui-exit-process-step ui-exit-process-step-02 fn-left"
                }, React.createElement("li", {
                    className: "ui-exit-process-time"
                }, quitBeginTimeF), React.createElement("li", {
                    className: "ui-exit-process-desc"
                }, "开始退出 ", React.createElement(RWETooltip, tooltipProps)), React.createElement("li", {
                    className: "ui-exit-process-line " + step02LineClassName
                })), React.createElement("ul", {
                    className: "ui-exit-process-step ui-exit-process-step-03 fn-left"
                }, React.createElement("li", {
                    className: "ui-exit-process-time"
                }), React.createElement("li", {
                    className: "ui-exit-process-desc"
                }, "完成退出"), React.createElement("li", {
                    className: "ui-exit-process-line react-right-gray"
                }))), React.createElement("div", {
                    className: "ui-exit-process-date fn-clear"
                }, React.createElement("div", {
                    className: "ui-exit-process-bar-01 fn-left"
                }, "7天后开始退出，期间持续计息"), React.createElement("div", {
                    className: "ui-exit-process-bar-02 fn-left"
                }, ratioDom, transferRatio ? React.createElement("div", {
                    className: "text"
                }, "债权转让进度", transferRatioF) : null))))
            } else
                "EXITED" == status && (dom = React.createElement("div", {
                    className: "exit-free-more-box"
                }, React.createElement("div", {
                    className: "ui-exit-process-amount",
                    style: borderTopStyle
                }, "退出金额 ", quitActualAmountF, "元"), React.createElement("div", {
                    className: "ui-exit-process "
                }, React.createElement("div", {
                    className: "ui-exit-process-info fn-clear"
                }, React.createElement("ul", {
                    className: "ui-exit-process-step ui-exit-process-step-01 fn-left"
                }, React.createElement("li", {
                    className: "ui-exit-process-time"
                }, quitApplyTimeF), React.createElement("li", {
                    className: "ui-exit-process-desc ui-exit-process-desc-gray"
                }, "申请退出"), React.createElement("li", {
                    className: "ui-exit-process-line react-left-gray"
                })), React.createElement("ul", {
                    className: "ui-exit-process-step ui-exit-process-step-02 fn-left"
                }, React.createElement("li", {
                    className: "ui-exit-process-time"
                }, quitBeginTimeF), React.createElement("li", {
                    className: "ui-exit-process-desc ui-exit-process-desc-gray"
                }, "开始退出"), React.createElement("li", {
                    className: "ui-exit-process-line react-left-gray"
                })), React.createElement("ul", {
                    className: "ui-exit-process-step ui-exit-process-step-03 fn-left"
                }, React.createElement("li", {
                    className: "ui-exit-process-time"
                }, quitFinishTimeF), React.createElement("li", {
                    className: "ui-exit-process-desc ui-exit-process-desc-gray"
                }, "完成退出"), React.createElement("li", {
                    className: "ui-exit-process-line react-right-gray"
                }))), React.createElement("div", {
                    className: "ui-exit-process-date fn-clear"
                }, React.createElement("div", {
                    className: "ui-exit-process-bar-01 fn-left"
                }), React.createElement("div", {
                    className: "ui-exit-process-bar-02 fn-left"
                })))));
            return React.createElement("div", null, dom)
        }
        ,
        RUserUplanDetailExitProcess.prototype.renderDom4PeriodExitDom = function(item) {
            var props = this.props
              , detailInfo = (this.state,
            props.detailInfo)
              , financePlanVo = detailInfo.financePlanVo
              , financePlanType = financePlanVo.financePlanType
              , quitApplyTimeF = void 0
              , transferRatio = void 0
              , transferRatioF = void 0
              , nameDom = "";
            if ("PREMIUM" == financePlanType) {
                {
                    var applyTime = item.applyTime;
                    item.quitFinishTime,
                    item.quitActualAmount,
                    item.quitAmount
                }
                quitApplyTimeF = applyTime ? moment(applyTime).format("YYYY年MM月DD日 HH:mm") : "",
                transferRatio = item.transferRatio
            } else {
                {
                    var quitRecord = detailInfo.quitRecord
                      , quitApplyTime = quitRecord.quitApplyTime;
                    quitRecord.quitFinishTime,
                    quitRecord.quitAdvanceTime,
                    quitRecord.quitActualAmount
                }
                quitApplyTimeF = quitApplyTime ? moment(quitApplyTime).format("YYYY年MM月DD日 HH:mm") : "",
                transferRatio = quitRecord.transferRatio
            }
            transferRatioF = transferRatio + "%";
            var style = {
                width: transferRatioF ? transferRatioF : 0
            }
              , tips01 = "您" + nameDom + "计划内的债权将在此时挂出，待债权完成转让后即退出此期"
              , tips02 = nameDom + "计划，成功退出后资金将退回到个人账户余额中。"
              , tooltipDom = '<div>\n                           <div style="padding-bottom:5px">' + tips01 + '</div>\n                           <div style="padding-bottom:5px">' + tips02 + "</div>\n                         </div>"
              , tooltipProps = {
                id: "period-process-tooltip",
                place: "right",
                tip: tooltipDom,
                delayHide: 100
            }
              , ratioDom = null
              , step02LineClassName = null;
            !transferRatio || 0 >= transferRatio ? (quitApplyTimeF = "",
            step02LineClassName = "react-left-gray") : (step02LineClassName = "react-left-blue",
            ratioDom = React.createElement("div", {
                className: "ui-exit-process-bar-blue",
                style: style
            }, React.createElement("div", {
                className: "text"
            }, "债权转让进度", transferRatioF)));
            var dom = React.createElement("div", {
                className: "exit-free-period-box"
            }, React.createElement("div", {
                className: "ui-exit-process "
            }, React.createElement("div", {
                className: "ui-exit-process-info fn-clear"
            }, React.createElement("ul", {
                className: "ui-exit-process-step ui-exit-process-step-02 fn-left"
            }, React.createElement("li", {
                className: "ui-exit-process-time"
            }, quitApplyTimeF), React.createElement("li", {
                className: "ui-exit-process-desc"
            }, "开始退出 ", React.createElement(RWETooltip, tooltipProps)), React.createElement("li", {
                className: "ui-exit-process-line " + step02LineClassName
            })), React.createElement("ul", {
                className: "ui-exit-process-step ui-exit-process-step-03 fn-left"
            }, React.createElement("li", {
                className: "ui-exit-process-time"
            }), React.createElement("li", {
                className: "ui-exit-process-desc"
            }, "完成退出"), React.createElement("li", {
                className: "ui-exit-process-line react-right-gray"
            }))), React.createElement("div", {
                className: "ui-exit-process-date fn-clear"
            }, React.createElement("div", {
                className: "ui-exit-process-bar-01 fn-left"
            }), React.createElement("div", {
                className: "ui-exit-process-bar-02 fn-left"
            }, ratioDom, transferRatio ? React.createElement("div", {
                className: "text"
            }, "债权转让进度", transferRatioF) : null))));
            return dom
        }
        ,
        RUserUplanDetailExitProcess.prototype.renderDom4PeriodSuccessExitDom = function(item) {
            var props = this.props
              , detailInfo = (this.state,
            props.detailInfo)
              , financePlanVo = detailInfo.financePlanVo
              , financePlanType = financePlanVo.financePlanType
              , quitApplyTimeF = void 0
              , quitFinishTimeF = void 0
              , quitActualAmountF = void 0;
            if ("PREMIUM" == financePlanType) {
                {
                    var applyTime = item.applyTime
                      , quitFinishTime = item.quitFinishTime
                      , quitActualAmount = item.quitActualAmount;
                    item.quitAmount
                }
                quitApplyTimeF = applyTime ? moment(applyTime).format("YYYY年MM月DD日 HH:mm") : "",
                quitFinishTimeF = quitFinishTime ? moment(quitFinishTime).format("YYYY年MM月DD日 HH:mm") : "",
                quitActualAmountF = quitActualAmount ? utils.commaFloat(quitActualAmount) : "0.00"
            } else {
                var quitRecord = detailInfo.quitRecord
                  , quitApplyTime = quitRecord.quitApplyTime
                  , quitFinishTime = quitRecord.quitFinishTime
                  , quitActualAmount = quitRecord.quitActualAmount;
                quitApplyTimeF = quitApplyTime ? moment(quitApplyTime).format("YYYY年MM月DD日 HH:mm") : "",
                quitFinishTimeF = quitFinishTime ? moment(quitFinishTime).format("YYYY年MM月DD日 HH:mm") : "",
                quitActualAmountF = quitActualAmount ? utils.commaFloat(quitActualAmount) : "0.00"
            }
            var dom = React.createElement("div", {
                className: "exit-free-period-success-box"
            }, React.createElement("div", {
                className: "ui-exit-process-amount"
            }, "退出金额 ", quitActualAmountF, "元"), React.createElement("div", {
                className: "ui-exit-process "
            }, React.createElement("div", {
                className: "ui-exit-process-info fn-clear"
            }, React.createElement("ul", {
                className: "ui-exit-process-step ui-exit-process-step-02 fn-left"
            }, React.createElement("li", {
                className: "ui-exit-process-time"
            }, quitApplyTimeF), React.createElement("li", {
                className: "ui-exit-process-desc ui-exit-process-desc-gray"
            }, "开始退出"), React.createElement("li", {
                className: "ui-exit-process-line react-left-gray"
            })), React.createElement("ul", {
                className: "ui-exit-process-step ui-exit-process-step-03 fn-left"
            }, React.createElement("li", {
                className: "ui-exit-process-time"
            }, quitFinishTimeF), React.createElement("li", {
                className: "ui-exit-process-desc ui-exit-process-desc-gray"
            }, "完成退出"), React.createElement("li", {
                className: "ui-exit-process-line react-right-gray"
            }))), React.createElement("div", {
                className: "ui-exit-process-date fn-clear"
            }, React.createElement("div", {
                className: "ui-exit-process-bar-01 fn-left"
            }), React.createElement("div", {
                className: "ui-exit-process-bar-02 fn-left"
            }))));
            return dom
        }
        ,
        RUserUplanDetailExitProcess
    }(React.Component);
    module.exports = RUserUplanDetailExitProcess
});
;/*!/client/widget/user/detail/RUserUplanDetailListItem/RUserUplanDetailListItem.js*/
define("uplan:widget/user/detail/RUserUplanDetailListItem/RUserUplanDetailListItem.js", function(require, exports, module) {
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
    var moment = require("common:node_modules/moment/moment")
      , React = require("common:node_modules/react/react")
      , utils = (require("common:widget/react-ui/RList/List"),
    require("common:widget/ui/utils/utils"))
      , InvestDetail = require("common:widget/p2p/autoinvest/invest-detail/invest-detail")
      , TransferInLog = require("common:widget/p2p/transferInLog/transferInLog")
      , p2pUtil = utils.p2pUtil
      , RUserUplanDetailListItem = function(_React$Component) {
        function RUserUplanDetailListItem(props) {
            _classCallCheck(this, RUserUplanDetailListItem),
            _React$Component.call(this, props),
            this.state = {
                isShowDetails: !1
            },
            this.showDetails = this.showDetails.bind(this)
        }
        return _inherits(RUserUplanDetailListItem, _React$Component),
        RUserUplanDetailListItem.prototype.showDetails = function() {
            this.setState({
                isShowDetails: !this.state.isShowDetails
            })
        }
        ,
        RUserUplanDetailListItem.prototype.componentWillReceiveProps = function() {
            this.setState({
                isShowDetails: !1
            })
        }
        ,
        RUserUplanDetailListItem.prototype.render = function() {
            var _props = this.props
              , item = _props.item
              , index = _props.index
              , subPointId = _props.subPointId
              , financePlanVo = _props.financePlanVo
              , bgCName = "fn-clear list-main-item ";
            index % 2 != 0 && (bgCName += "dark");
            var transferring = !1
              , hasContract = !1
              , loanId = item.loanId
              , loanLink = "/loan-" + loanId + ".html"
              , pdlFlag = item.pdlFlag
              , date = (pdlFlag ? "--" : item.lendShare,
            item.lendTime)
              , time = moment(parseInt(date, 10)).format("YYYY年MM月DD日")
              , statusOrdinal = item.statusOrdinal
              , amount = item.lendAmount ? utils.commaFloat(item.lendAmount) : "0.00"
              , loanType = (item.interest ? utils.commaFloat(item.interest) : "0.00",
            item.displayLoanType)
              , loanTypeName = p2pUtil.loanAllType(loanType)[1]
              , status = p2pUtil.loanStatus(statusOrdinal)
              , isHolding = !1;
            "INPROGRESS" == financePlanVo.planStatus && (isHolding = !0);
            var isTransfer = isHolding && item.indirect;
            ("还款中" == status || "已还清" == status) && (hasContract = !0),
            item.lendShare > 0 && item.transferShare > 0 ? (status = "转让中",
            transferring = !0) : 0 === item.lendShare && (status = "转让完成",
            transferring = !0),
            isTransfer && (transferring = !0);
            var statusDom = transferring ? React.createElement("span", {
                className: "status-span"
            }, status, "（", React.createElement("a", {
                className: "cursor-pointer",
                "data-name": "details",
                onClick: this.showDetails
            }, "明细"), "）") : React.createElement("span", {
                className: "status-span"
            }, status)
              , contractHref = "/p2p/contract/loan?type=user&loanId=" + loanId
              , contractDom = hasContract ? React.createElement("span", {
                className: "contract-span"
            }, React.createElement("a", {
                className: "text",
                href: contractHref,
                target: "_blank"
            }, "合同")) : React.createElement("span", {
                className: "contract-span"
            }, "合同")
              , isShowDetails = this.state.isShowDetails
              , detailsDom = null;
            return isShowDetails && (detailsDom = isTransfer ? React.createElement(TransferInLog, {
                loanId: loanId,
                subPointId: subPointId
            }) : React.createElement(InvestDetail, {
                loanId: loanId,
                subPointId: subPointId,
                pdlFlag: pdlFlag
            })),
            React.createElement("div", null, React.createElement("ul", {
                className: bgCName
            }, React.createElement("li", {
                className: "fn-left w201 loanId-li"
            }, React.createElement("span", {
                className: "loanId-span"
            }, React.createElement("em", {
                className: "ui-loantype",
                title: loanTypeName
            }, loanTypeName), React.createElement("a", {
                className: "loan-id-a",
                href: loanLink,
                target: "_blank"
            }, loanId))), React.createElement("li", {
                className: "fn-left w223 amount-li"
            }, React.createElement("span", {
                className: "amount-span"
            }, amount, "元")), React.createElement("li", {
                className: "fn-left w223 date-li"
            }, React.createElement("span", {
                className: "date-span"
            }, time)), React.createElement("li", {
                className: "fn-left w223 status-li"
            }, statusDom), React.createElement("li", {
                className: "fn-left w201 text-right contract-li "
            }, contractDom)), detailsDom)
        }
        ,
        RUserUplanDetailListItem
    }(React.Component);
    module.exports = RUserUplanDetailListItem
});
;/*!/client/widget/user/detail/RUserUplanDetailPremiumList/RUserUplanDetailPremiumList.js*/
define("uplan:widget/user/detail/RUserUplanDetailPremiumList/RUserUplanDetailPremiumList.js", function(require, exports, module) {
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
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source)
                Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key])
        }
        return target
    }
      , React = (require("common:node_modules/moment/moment"),
    require("common:node_modules/react/react"))
      , service = require("common:widget/ui/service/service-factory")
      , List = (service.getService("uplan"),
    require("common:widget/react-ui/RList/List"))
      , utils = require("common:widget/ui/utils/utils")
      , RUserUplanDetailPremiumList = (utils.p2pUtil,
    require("uplan:widget/user/detail/RUserUplanDetailListItem/RUserUplanDetailListItem"),
    function(_React$Component) {
        function RUserUplanDetailPremiumList(props) {
            _classCallCheck(this, RUserUplanDetailPremiumList),
            _React$Component.call(this, props)
        }
        return _inherits(RUserUplanDetailPremiumList, _React$Component),
        RUserUplanDetailPremiumList.prototype.createHeadDom = function() {
            return React.createElement("ul", {
                className: "list-header  fn-clear"
            }, React.createElement("li", {
                className: "w194 loanId-li"
            }, React.createElement("span", {
                className: "loanId-span"
            }, "预计到账时间")), React.createElement("li", {
                className: "w171 amount-li"
            }, React.createElement("span", {
                className: "amount-span"
            }, "金额")), React.createElement("li", {
                className: "w171 status-li"
            }, React.createElement("span", {
                className: "status-span"
            }, "状态")), React.createElement("li", {
                className: "w194 contract-li text-right"
            }))
        }
        ,
        RUserUplanDetailPremiumList.prototype.createRowDom = function(item, index) {
            var bgCName = "fn-clear list-main-item ";
            return index % 2 != 0 && (bgCName += "dark"),
            React.createElement("div", null, React.createElement("ul", {
                className: bgCName
            }, React.createElement("li", {
                className: "fn-left w194 loanId-li"
            }, React.createElement("span", {
                className: "loanId-span"
            }, " ddddd")), React.createElement("li", {
                className: "fn-left w171 amount-li"
            }, React.createElement("span", {
                className: "amount-span"
            }, "111元")), React.createElement("li", {
                className: "fn-left w171 status-li"
            })))
        }
        ,
        RUserUplanDetailPremiumList.prototype.render = function() {
            var _this = this
              , props = this.props
              , listData = (this.state,
            props.listData)
              , ajaxParams = props.ajaxParams
              , subPointId = props.subPointId
              , financePlanVo = props.financePlanVo
              , isFreePeriod = props.isFreePeriod
              , dom = null;
            return isFreePeriod && listData.data.list.length > 0 && (dom = React.createElement("div", {
                id: "wdg-detail-list",
                className: "container_12_1080 color-white-bg mt20"
            }, React.createElement("ul", {
                className: "ui-title fn-clear"
            }, React.createElement("li", {
                className: "fn-left"
            }, "退出记录")), React.createElement("div", {
                id: "user-detail-record-list"
            }, React.createElement(List, _extends({}, listData, {
                moudleServiceName: "uplan",
                url: "getUserDetailRcordAsync",
                ajaxParams: ajaxParams,
                isHeadNeed: "yes",
                isHeadNeedOrder: "no",
                createHeadDom: this.createHeadDom,
                createRowDom: function(item, index) {
                    return _this.createRowDom(item, index, subPointId, financePlanVo)
                },
                noDataText: "没有退出记录",
                startNum: 0,
                limit: 10,
                offset: 5
            }))))),
            dom
        }
        ,
        RUserUplanDetailPremiumList
    }(React.Component));
    module.exports = RUserUplanDetailPremiumList
});
;/*!/client/widget/user/detail/RUserUplanDetailList/RUserUplanDetailList.js*/
define("uplan:widget/user/detail/RUserUplanDetailList/RUserUplanDetailList.js", function(require, exports, module) {
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
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source)
                Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key])
        }
        return target
    }
      , React = (require("common:node_modules/moment/moment"),
    require("common:node_modules/react/react"))
      , service = require("common:widget/ui/service/service-factory")
      , List = (service.getService("uplan"),
    require("common:widget/react-ui/RList/List"))
      , utils = require("common:widget/ui/utils/utils")
      , RUserUplanDetailListItem = (utils.p2pUtil,
    require("uplan:widget/user/detail/RUserUplanDetailListItem/RUserUplanDetailListItem"))
      , UserUplanDetailList = function(_React$Component) {
        function UserUplanDetailList(props) {
            _classCallCheck(this, UserUplanDetailList),
            _React$Component.call(this, props)
        }
        return _inherits(UserUplanDetailList, _React$Component),
        UserUplanDetailList.prototype.createHeadDom = function() {
            return React.createElement("ul", {
                className: "list-header  fn-clear"
            }, React.createElement("li", {
                className: "w201 loanId-li"
            }, React.createElement("span", {
                className: "loanId-span"
            }, "债权ID")), React.createElement("li", {
                className: "w223 amount-li"
            }, React.createElement("span", {
                className: "amount-span"
            }, "出借金额")), React.createElement("li", {
                className: "w223 date-li"
            }, React.createElement("span", {
                className: "date-span"
            }, "出借时间")), React.createElement("li", {
                className: "w223 status-li"
            }, React.createElement("span", {
                className: "status-span"
            }, "状态")), React.createElement("li", {
                className: "w201 contract-li text-right"
            }))
        }
        ,
        UserUplanDetailList.prototype.createRowDom = function(item, index, subPointId, financePlanVo) {
            return React.createElement(RUserUplanDetailListItem, {
                item: item,
                index: index,
                subPointId: subPointId,
                financePlanVo: financePlanVo
            })
        }
        ,
        UserUplanDetailList.prototype.render = function() {
            var _this = this
              , props = this.props
              , listData = (this.state,
            props.listData)
              , ajaxParams = props.ajaxParams
              , subPointId = props.subPointId
              , financePlanVo = props.financePlanVo;
            return React.createElement("div", {
                id: "wdg-detail-list",
                className: "container_12_1080 color-white-bg mt20"
            }, React.createElement("ul", {
                className: "ui-title fn-clear"
            }, React.createElement("li", {
                className: "fn-left"
            }, "投标记录")), React.createElement("div", {
                id: "user-detail-record-list"
            }, React.createElement(List, _extends({}, listData, {
                moudleServiceName: "uplan",
                url: "getUserDetailRcordAsync",
                ajaxParams: ajaxParams,
                isHeadNeed: "yes",
                isHeadNeedOrder: "no",
                createHeadDom: this.createHeadDom,
                createRowDom: function(item, index) {
                    return _this.createRowDom(item, index, subPointId, financePlanVo)
                },
                noDataText: "没有出借中的标的",
                startNum: 0,
                limit: 10,
                offset: 5
            }))))
        }
        ,
        UserUplanDetailList
    }(React.Component);
    module.exports = UserUplanDetailList
});
;/*!/client/widget/user/detail/RUserUplanRenewalInfo/RUserUplanRenewalInfo.js*/
define("uplan:widget/user/detail/RUserUplanRenewalInfo/RUserUplanRenewalInfo.js", function(require, exports, module) {
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
      , moment = require("common:node_modules/moment/moment")
      , utils = require("common:widget/ui/utils/utils")
      , RUserUplanRenewalInfo = function(_React$Component) {
        function RUserUplanRenewalInfo(props) {
            _classCallCheck(this, RUserUplanRenewalInfo),
            _React$Component.call(this, props)
        }
        return _inherits(RUserUplanRenewalInfo, _React$Component),
        RUserUplanRenewalInfo.prototype.render = function() {
            var detailInfo = this.props.detailInfo || {}
              , rollOverPeriod = detailInfo.rollOverPeriod
              , rollOverType = detailInfo.rollOverType
              , rollOverTime = detailInfo.rollOverTime
              , rollCoupon = detailInfo.rollCoupon
              , calmEndDay = detailInfo.calmEndDay
              , nowTime = detailInfo.nowTime
              , rollOverPrincipal = detailInfo.rollOverPrincipal
              , rollOverRate = detailInfo.rollOverRate
              , scoreRecord = detailInfo.scoreRecord;
            if (!rollOverType)
                return null;
            var rollOverTimeDom = "";
            if (rollOverTime) {
                var rollOverTimeDate = moment(parseInt(rollOverTime || 0)).format("YYYY-MM-DD");
                rollOverTimeDom = React.createElement("div", {
                    className: "list-line"
                }, React.createElement("div", {
                    className: "list-left"
                }, "续期操作日"), React.createElement("div", {
                    className: "list-right"
                }, rollOverTimeDate))
            }
            var uplanText = "";
            "ROLL_OVER" == rollOverType ? uplanText = "U享（" + rollOverPeriod + "个月）" : "ROLL_OVER_PREMIUM" == rollOverType && (uplanText = "优选（固定服务期" + rollOverPeriod + "个月）");
            var couponDom = "";
            if (rollCoupon) {
                var couponText = ""
                  , couponVal = parseFloat(rollCoupon.value) || "--";
                "DISCOUNT" == rollCoupon.couponType ? couponText = couponVal + "元抵扣券" : "VOUCHER" == rollCoupon.couponType ? couponText = couponVal + "元现金券" : "INCR_INTEREST" == rollCoupon.couponType && (couponText = "1" == rollCoupon.isShort ? couponVal + "%（短期）加息券" : couponVal + "%加息券"),
                couponDom = React.createElement("div", {
                    className: "list-line"
                }, React.createElement("div", {
                    className: "list-left"
                }, "优惠券"), React.createElement("div", {
                    className: "list-right"
                }, couponText))
            }
            var calmEndDayDate = calmEndDay && -1 != calmEndDay ? moment(parseInt(calmEndDay || 0)).format("YYYY-MM-DD") : ""
              , cancelText = "";
            nowTime >= calmEndDay && calmEndDayDate && (cancelText = calmEndDayDate + "前可修改/取消续期");
            var rollOverPrincipalText = "预估续期本金"
              , rollRateText = "预估扣费后年利率"
              , rollRate = "以进入续期当天的扣费后年利率为准";
            rollOverRate && (rollOverPrincipalText = "续期本金",
            rollRateText = "扣费后年利率",
            rollRate = rollOverRate + "%");
            var amount = utils.commaInteger(rollOverPrincipal) + "元"
              , rolloverScore = scoreRecord.rolloverScore
              , rolloverScoreAmount = scoreRecord.rolloverScoreAmount
              , rolloverScoreAmountString = utils.commaNormal(rolloverScoreAmount)
              , rolloverScoreString = utils.commaInteger(rolloverScore)
              , pointsDom = null;
            return rolloverScoreAmount && (pointsDom = React.createElement("div", {
                className: "list-line"
            }, React.createElement("div", {
                className: "list-left"
            }, "积分"), React.createElement("div", {
                className: "list-right"
            }, "使用" + rolloverScoreString + "积分抵扣" + rolloverScoreAmountString + "元"))),
            React.createElement("div", {
                className: "uplan-renewal-simple-info"
            }, React.createElement("div", {
                className: "info-title"
            }, React.createElement("h4", null, "续期信息"), React.createElement("span", {
                className: "can-modify"
            }, cancelText)), React.createElement("div", {
                className: "info-content"
            }, rollOverTimeDom, React.createElement("div", {
                className: "list-line"
            }, React.createElement("div", {
                className: "list-left"
            }, "续期服务"), React.createElement("div", {
                className: "list-right"
            }, uplanText)), React.createElement("div", {
                className: "list-line"
            }, React.createElement("div", {
                className: "list-left"
            }, rollOverPrincipalText), React.createElement("div", {
                className: "list-right"
            }, amount)), React.createElement("div", {
                className: "list-line"
            }, React.createElement("div", {
                className: "list-left"
            }, rollRateText), React.createElement("div", {
                className: "list-right"
            }, rollRate)), couponDom, pointsDom))
        }
        ,
        RUserUplanRenewalInfo
    }(React.Component);
    module.exports = RUserUplanRenewalInfo
});
;/*!/client/widget/user/detail/RUserUplanDetail/RUserUplanDetail.js*/
define("uplan:widget/user/detail/RUserUplanDetail/RUserUplanDetail.js", function(require, exports, module) {
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
      , RUserUplanDetailProduct = require("uplan:widget/user/detail/RUserUplanDetailProduct/RUserUplanDetailProduct")
      , RUserUplanDetailProcess = require("uplan:widget/user/detail/RUserUplanDetailProcess/RUserUplanDetailProcess")
      , RUserUplanDetailExitProcess = require("uplan:widget/user/detail/RUserUplanDetailExitProcess/RUserUplanDetailExitProcess")
      , RUserPremiumDetailTransferUInfo = require("uplan:widget/user/detail/RUserPremiumDetailTransferUInfo/RUserPremiumDetailTransferUInfo")
      , RUserUplanDetailPremiumList = require("uplan:widget/user/detail/RUserUplanDetailPremiumList/RUserUplanDetailPremiumList")
      , RUserUplanDetailList = require("uplan:widget/user/detail/RUserUplanDetailList/RUserUplanDetailList")
      , RUserUplanRenewalInfo = require("uplan:widget/user/detail/RUserUplanRenewalInfo/RUserUplanRenewalInfo")
      , UserUplanDetail = function(_React$Component) {
        function UserUplanDetail(props) {
            _classCallCheck(this, UserUplanDetail),
            _React$Component.call(this, props)
        }
        return _inherits(UserUplanDetail, _React$Component),
        UserUplanDetail.prototype.render = function() {
            var props = this.props
              , detailInfo = (this.state,
            props.detailInfo)
              , listData = props.listData
              , ajaxParams = props.ajaxParams
              , isInActivity = props.isInActivity
              , geettest = props.geettest
              , showFinanceContractRisk = props.showFinanceContractRisk;
            detailInfo.geettest = geettest,
            detailInfo.isInActivity = isInActivity;
            var financePlanVo = detailInfo.financePlanVo
              , subPointId = financePlanVo.financeSubPointId;
            return React.createElement("div", null, React.createElement(RUserUplanDetailProduct, {
                detailInfo: detailInfo,
                showFinanceContractRisk: showFinanceContractRisk
            }), React.createElement(RUserUplanDetailProcess, {
                detailInfo: detailInfo
            }), React.createElement(RUserUplanRenewalInfo, {
                detailInfo: detailInfo
            }), React.createElement(RUserUplanDetailExitProcess, {
                detailInfo: detailInfo
            }), React.createElement(RUserPremiumDetailTransferUInfo, {
                detailInfo: detailInfo
            }), React.createElement(RUserUplanDetailPremiumList, {
                listData: listData,
                ajaxParams: ajaxParams,
                subPointId: subPointId,
                financePlanVo: financePlanVo
            }), React.createElement(RUserUplanDetailList, {
                listData: listData,
                ajaxParams: ajaxParams,
                subPointId: subPointId,
                financePlanVo: financePlanVo
            }))
        }
        ,
        UserUplanDetail
    }(React.Component);
    module.exports = UserUplanDetail
});
