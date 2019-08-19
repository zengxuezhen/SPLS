;/*!/client/widget/account/accountInfo/info.jsx*/
define("user:widget/account/accountInfo/info.jsx", function(require, exports, module) {
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
      , UserAccountInfo = function(_React$Component) {
        function UserAccountInfo() {
            _classCallCheck(this, UserAccountInfo),
            _React$Component.apply(this, arguments)
        }
        return _inherits(UserAccountInfo, _React$Component),
        UserAccountInfo.prototype.componentDidMount = function() {
            var _this = this
              , account_box_left = $(".accountInfo").offset().left;
            $(".user-safe .notCertified").hover(function() {
                $(".tool-tips-box").show();
                var text = $(this).attr("data-txt").split("||");
                text[1] = '<a href="' + $(this).attr("href") + '">' + text[1] + "</a>";
                var showHtml = text.join("");
                $(".tool-tips-box").css("left", $(this).offset().left - account_box_left + 25 + "px"),
                $(".tool-tips-content").html(showHtml)
            }, function() {
                $(".tool-tips-box").hide()
            }),
            $(".btn-close").on("click", function() {
                $(".tool-tip-box").hide()
            }),
            $(".user-safe .alreadyCertified").hover(function() {
                $(".tool-tips-box").show();
                var a_index = $(this).index()
                  , showHtml = "";
                switch (a_index) {
                case 0:
                    showHtml = "您已完成手机绑定 " + _this.props.userData.userInfo.mobile + '。<a href="/user/setting/toModifyMobileByOpen?type=modify">修改</a>';
                    break;
                case 1:
                    showHtml = "您已实名认证。";
                    break;
                case 2:
                    showHtml = '您已设置交易密码。<a href="/account/cashPwd!toModify.action">修改</a>';
                    break;
                case 3:
                    showHtml = '您已完成邮箱绑定。<a href="/user/setting/toModifyEmail">修改</a>'
                }
                $(".tool-tips-box").css("left", $(this).offset().left - account_box_left + 25 + "px"),
                $(".tool-tips-content").html(showHtml)
            }, function() {
                $(".tool-tips-box").hide()
            }),
            $(".tool-tips-box").hover(function() {
                $(this).show()
            }, function() {
                $(this).hide()
            })
        }
        ,
        UserAccountInfo.prototype.render = function() {
            var props = this.props.userData
              , mobilePassedIcon = "true" == props.userInfo.bindMobile ? "alreadyCertified cellphone" : "notCertified cellphone"
              , idPassed = props.userInfo.idPassed || "true" == props.userInfo.idPassed ? "alreadyCertified man" : "notCertified man"
              , setPasswordIcon = "true" == props.userInfo.hasSetFundPassword ? "alreadyCertified lock" : "notCertified lock"
              , mailIcon = "true" == props.userInfo.bindEmail ? "alreadyCertified mail-done" : "notCertified mail";
            console.log(props.userInfo);
            var lastLoginTime = new Date(props.userInfo.lastLoginTime);
            return lastLoginTime = utils.formatDateSecond(lastLoginTime),
            React.createElement("section", {
                className: "accountInfo"
            }, React.createElement("div", {
                className: "user-info"
            }, React.createElement("a", {
                className: "user-img-link",
                href: "/user/setting/accountInfo"
            }, React.createElement("img", {
                className: "user-img",
                src: props.userInfo.userAvatar,
                alt: ""
            })), React.createElement("span", {
                className: "user-name"
            }, props.userInfo.nickName), "object" != typeof props.userInfo.lastLoginTime || Object.keys(props.userInfo.lastLoginTime).length ? React.createElement("span", {
                className: "last-login"
            }, "上次登录时间 ", React.createElement("em", null, lastLoginTime)) : null), React.createElement("div", {
                className: "user-safe"
            }, React.createElement("a", {
                className: mobilePassedIcon,
                href: "true" == props.userInfo.bindMobile ? "/user/setting/accountInfo" : "/user/setting/toModifyMobileByOpen?type=bind",
                "data-txt": "绑定手机，使您的账户更加安全。||立即绑定"
            }), React.createElement("a", {
                className: idPassed,
                title: props.userInfo.idPassed || "true" == props.userInfo.idPassed ? "" : "您还未实名认证",
                href: props.userInfo.idPassed || "true" == props.userInfo.idPassed ? "/user/setting/accountInfo" : "/user/setting/toCreateAccountByCust",
                "data-txt": "您还未实名认证。||实名认证"
            }), React.createElement("a", {
                className: setPasswordIcon,
                title: "true" == props.userInfo.hasSetFundPassword ? "" : "未设置基金交易密码",
                href: "true" == props.userInfo.hasSetFundPassword ? "/account/cashPwd!toModify.action" : "/account/bindRole.action?type=CASHPASSWORD",
                "data-txt": "未设置基金交易密码。||去设置"
            }), React.createElement("a", {
                className: mailIcon,
                href: "true" == props.userInfo.bindEmail ? "/user/setting/accountInfo" : "/user/setting/bindRole?type=EMAIL",
                "data-txt": "绑定邮箱，使您的账户更加安全。||立即绑定"
            }), React.createElement("span", {
                className: "safe-level"
            }, "安全等级：", props.userInfo.securityLevel)), React.createElement("div", {
                className: "tool-tip-box"
            }, React.createElement("div", {
                className: "triangle-top"
            }), React.createElement("em", {
                className: "triangle-bottom"
            }), React.createElement("div", {
                className: "tool-tips"
            }), React.createElement("span", {
                className: "btn-close"
            }, "×")), React.createElement("div", {
                className: "tool-tips-box"
            }, React.createElement("div", {
                className: "triangle-left"
            }), React.createElement("em", {
                className: "triangle-right"
            }), React.createElement("div", {
                className: "tool-tips-content"
            })))
        }
        ,
        UserAccountInfo
    }(React.Component);
    module.exports = UserAccountInfo
});
;/*!/client/widget/account/bankLayer/bankLayer.jsx*/
define("user:widget/account/bankLayer/bankLayer.jsx", function(require, exports, module) {
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
      , BankLayer = (require("common:widget/ui/utils/utils"),
    function(_React$Component) {
        function BankLayer(props) {
            _classCallCheck(this, BankLayer),
            _React$Component.call(this, props)
        }
        return _inherits(BankLayer, _React$Component),
        BankLayer.prototype.render = function() {
            var layerShow = this.props.layerShow ? "top-layer display-block" : "top-layer display-none"
              , userInfo = this.props.userInfo
              , dialogTitle = "true" == userInfo.hasCreateAccount ? "true" == userInfo.hasSetPassword ? "您的账户资金已存管至民生银行" : "您的账户资金已存管至民生银行" : "个人账户升级为民生存管账户"
              , dialogSubTitle = "true" == userInfo.hasCreateAccount ? "true" == userInfo.hasSetPassword ? "" : "需要重新设置交易密码以便于您能正常理财" : "请开通存管账户以便于您能正常理财"
              , dialogBtnText = "true" == userInfo.hasCreateAccount ? "true" == userInfo.hasSetPassword ? "我知道了" : "设置交易密码" : "开通民生银行存管账户"
              , dialogBtnLink = "true" == userInfo.hasCreateAccount ? "true" == userInfo.hasSetPassword ? "javascript:void(0)" : "/rrdRegist!createPassword.action" : "/user/setting/toCreateAccountByCust";
            return React.createElement("section", {
                className: layerShow
            }, React.createElement("div", {
                className: "layer-bg",
                onClick: this.props.onLayerClose
            }), React.createElement("div", {
                className: "layer-body"
            }, React.createElement("span", {
                className: "j-dialog-close-btn",
                onClick: this.props.onLayerClose
            }, "×"), React.createElement("img", {
                className: "cmbc-logo",
                src: "/ps/static/user/widget/account/bankLayer/assets/cmbc-dialog-logo_0179a0c.png",
                alt: ""
            }), React.createElement("p", {
                className: "mbc-dialog-title"
            }, dialogTitle), React.createElement("p", {
                className: "mbc-dialog-subtitle"
            }, dialogSubTitle), React.createElement("a", {
                className: "dialog-btn",
                href: dialogBtnLink
            }, dialogBtnText)))
        }
        ,
        BankLayer
    }(React.Component));
    module.exports = BankLayer
});
;/*!/client/widget/account/assetDetails/assetDetails.jsx*/
define("user:widget/account/assetDetails/assetDetails.jsx", function(require, exports, module) {
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
      , pie = require("common:widget/ui/echarts/pie")
      , $ = require("common:widget/lib/jquery/jquery")
      , AssetDetail = (require("user:widget/account/bankLayer/bankLayer.jsx"),
    function(_React$Component) {
        function AssetDetail(props) {
            _classCallCheck(this, AssetDetail),
            _React$Component.call(this, props)
        }
        return _inherits(AssetDetail, _React$Component),
        AssetDetail.prototype.componentDidMount = function() {
            var accountInfo = this.props.userData.accountInfo
              , option = {
                title: {
                    show: !0,
                    text: "资产占比",
                    textAlign: "middle",
                    textBaseline: "middle",
                    left: "38%",
                    top: "48%",
                    textStyle: {
                        color: "#848484",
                        fontWeight: "normal",
                        fontSize: "14"
                    }
                },
                series: [{
                    name: "资产占比",
                    type: "pie",
                    radius: ["67%", "92%"],
                    clockwise: !1,
                    labelLine: {
                        normal: {
                            show: !1
                        }
                    },
                    label: {
                        normal: {
                            show: !1
                        },
                        emphasis: {
                            show: !1
                        }
                    },
                    data: [{
                        value: parseFloat(accountInfo.fundAsset.replace(/,/g, "")),
                        name: "基金",
                        itemStyle: {
                            normal: {
                                color: "#ffc435"
                            }
                        }
                    }, {
                        value: parseFloat(accountInfo.fofAsset.replace(/,/g, "")),
                        name: "组合",
                        itemStyle: {
                            normal: {
                                color: "#ffaa25"
                            }
                        }
                    }, {
                        value: parseFloat(accountInfo.p2pAsset.replace(/,/g, "")),
                        name: "P2P",
                        itemStyle: {
                            normal: {
                                color: "#0460cd"
                            }
                        }
                    }, {
                        value: parseFloat(accountInfo.fixedAsset.replace(/,/g, "")),
                        name: "定期理财",
                        itemStyle: {
                            normal: {
                                color: "#2e8ef2"
                            }
                        }
                    }]
                }]
            };
            pie.init("assetDetailPie", option),
            $(".assetDetailTable dd").hover(function() {
                var index = $(this).parent().children("dd").index(this);
                pie.hoverTicket(index)
            }, function() {
                pie.dispatchTicket()
            })
        }
        ,
        AssetDetail.prototype.render = function() {
            var accountInfo = (this.props.userData.userInfo,
            this.props.userData.accountInfo);
            return React.createElement("div", {
                className: "assetDetail"
            }, React.createElement("dl", {
                className: "assetDetailTable"
            }, React.createElement("dt", null, React.createElement("ul", null, React.createElement("li", {
                className: "asset-type-th"
            }, "资产"), React.createElement("li", {
                className: "asset-percent"
            }, "占比"), React.createElement("li", null, "总资产"), React.createElement("li", null, "累计收益"))), React.createElement("dd", null, React.createElement("a", {
                href: "/fund/userFundAction!myFundListPage.action",
                target: "_blank"
            }, React.createElement("ul", null, React.createElement("li", {
                className: "asset-type"
            }, React.createElement("span", {
                className: "dot-3"
            }, "●"), "基金"), React.createElement("li", {
                className: "asset-percent"
            }, accountInfo.fundAssetPercentage), React.createElement("li", {
                className: "totalAsset"
            }, accountInfo.fundAsset, "元"), React.createElement("li", {
                className: "totalIncome"
            }, accountInfo.fundEarning, "元")))), React.createElement("dd", null, React.createElement("a", {
                href: "/fof/user/holdList",
                target: "_blank"
            }, React.createElement("ul", null, React.createElement("li", {
                className: "asset-type"
            }, React.createElement("span", {
                className: "dot-4"
            }, "●"), "组合"), React.createElement("li", {
                className: "asset-percent"
            }, accountInfo.fofAssetPercentage), React.createElement("li", {
                className: "totalAsset"
            }, accountInfo.fofAsset, "元"), React.createElement("li", {
                className: "totalIncome"
            }, accountInfo.fofEarning, "元")))), React.createElement("dd", null, React.createElement("a", {
                href: window.tplConf.we_renrendai_host + "/user/account/p2p/index",
                target: "_blank"
            }, React.createElement("ul", null, React.createElement("li", {
                className: "asset-type"
            }, React.createElement("span", {
                className: "dot-1"
            }, "●"), "P2P"), React.createElement("li", {
                className: "asset-percent"
            }, accountInfo.p2pAssetPercentage), React.createElement("li", {
                className: "totalAsset"
            }, accountInfo.p2pAsset, "元"), React.createElement("li", {
                className: "totalIncome"
            }, accountInfo.p2pEarning, "元")))), React.createElement("dd", null, React.createElement("a", {
                href: "/exchange/user/account",
                target: "_blank"
            }, React.createElement("ul", null, React.createElement("li", {
                className: "asset-type"
            }, React.createElement("span", {
                className: "dot-2"
            }, "●"), "定期理财"), React.createElement("li", {
                className: "asset-percent"
            }, accountInfo.fixedAssetPercentage), React.createElement("li", {
                className: "totalAsset"
            }, accountInfo.fixedAsset, "元"), React.createElement("li", {
                className: "totalIncome"
            }, accountInfo.fixedEarning, "元"))))), React.createElement("div", {
                className: "assetDetailPie",
                id: "assetDetailPie"
            }))
        }
        ,
        AssetDetail
    }(React.Component));
    module.exports = AssetDetail
});
;/*!/client/widget/account/assetMovements/assetMovements.jsx*/
define("user:widget/account/assetMovements/assetMovements.jsx", function(require, exports, module) {
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
      , lineGraph = require("common:widget/ui/echarts/lineGraph")
      , $ = require("common:widget/lib/jquery/jquery")
      , utils = require("common:widget/ui/utils/utils")
      , AssetMovements = function(_React$Component) {
        function AssetMovements() {
            _classCallCheck(this, AssetMovements),
            _React$Component.apply(this, arguments)
        }
        return _inherits(AssetMovements, _React$Component),
        AssetMovements.prototype.componentDidMount = function() {
            if (this.checkData())
                this.createLineGraph();
            else {
                var no_data_img = "/ps/static/user/widget/account/assetMovements/assets/no-data_e8eb58a.png";
                $("#assetLineBox").append("<img src='" + no_data_img + "'>")
            }
        }
        ,
        AssetMovements.prototype.checkData = function() {
            var hasNotEmptyData = !1;
            return this.props.userData.accountHistory.list.forEach(function(value) {
                (0 != value.asset || 0 != value.earning) && (hasNotEmptyData = !0)
            }),
            hasNotEmptyData
        }
        ,
        AssetMovements.prototype.createLineGraph = function() {
            var accountHistory = this.props.userData.accountHistory
              , dateList = accountHistory.list.map(function(str) {
                var Date = utils.getLocalTime(str.date);
                return str = utils.formatMonthDate(Date)
            })
              , assetList = accountHistory.list.map(function(str) {
                return parseFloat(str.asset)
            })
              , profitList = accountHistory.list.map(function(str) {
                return parseFloat(str.earning)
            })
              , option = {
                legend: {
                    data: [{
                        name: "资产（元）",
                        icon: "image:///ps/static/user/widget/account/assetMovements/assets/blue_b596ac2.png"
                    }, {
                        name: "利息回报（元）",
                        icon: "image:///ps/static/user/widget/account/assetMovements/assets/yellow_7da013e.png"
                    }],
                    x: "center",
                    bottom: 30,
                    itemGap: 130,
                    selectedMode: !1
                },
                color: ["#0460cd", "#ffaa25"],
                tooltip: {
                    show: !0,
                    trigger: "axis",
                    formatter: "{b0}{a0}：{c0}元<br/>{b1}{a1}：{c1}元"
                },
                grid: {
                    show: !1,
                    bottom: 90
                },
                textStyle: {
                    color: "#848484"
                },
                xAxis: [{
                    type: "category",
                    boundaryGap: !1,
                    data: dateList,
                    splitLine: {
                        show: !0,
                        lineStyle: {
                            color: "#f4f4f4"
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#f4f4f4"
                        }
                    }
                }],
                yAxis: [{
                    name: "资产（元）",
                    nameGap: 30,
                    type: "value",
                    axisLine: {
                        lineStyle: {
                            color: "#f4f4f4"
                        }
                    },
                    splitLine: {
                        show: !0,
                        lineStyle: {
                            color: "#f4f4f4"
                        }
                    }
                }, {
                    name: "利息回报（元）",
                    nameGap: 30,
                    type: "value",
                    axisLine: {
                        lineStyle: {
                            color: "#f4f4f4"
                        }
                    },
                    splitLine: {
                        show: !1
                    }
                }],
                series: [{
                    name: "资产（元）",
                    type: "line",
                    smooth: !0,
                    symbol: "none",
                    sampling: "average",
                    data: assetList,
                    lineStyle: {
                        normal: {
                            color: "#0460cd",
                            width: 3
                        }
                    }
                }, {
                    yAxisIndex: 1,
                    name: "利息回报（元）",
                    type: "line",
                    smooth: !0,
                    symbol: "none",
                    sampling: "average",
                    data: profitList,
                    lineStyle: {
                        normal: {
                            color: "#ffaa25",
                            width: 3
                        }
                    }
                }]
            };
            lineGraph.init("assetLineBox", option)
        }
        ,
        AssetMovements.prototype.render = function() {
            return React.createElement("div", {
                className: "asset-movement"
            }, React.createElement("div", {
                className: "title"
            }, "资产利息回报走势图"), React.createElement("div", {
                className: "assetLineBox",
                id: "assetLineBox"
            }))
        }
        ,
        AssetMovements
    }(React.Component);
    module.exports = AssetMovements
});
;/*!/client/widget/account/monthbills/detail/RDetail.jsx*/
define("user:widget/account/monthbills/detail/RDetail.jsx", function(require, exports, module) {
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
      , numeral = (require("common:node_modules/react-dom/index"),
    require("common:node_modules/numeral/numeral"))
      , MonthBillsDetail = (require("common:widget/lib/jquery/jquery"),
    function(_React$Component) {
        function MonthBillsDetail() {
            _classCallCheck(this, MonthBillsDetail),
            _React$Component.apply(this, arguments)
        }
        return _inherits(MonthBillsDetail, _React$Component),
        MonthBillsDetail.prototype.render = function() {
            var data = this.props.data;
            return React.createElement("div", {
                className: "month-bill-detail"
            }, React.createElement("div", {
                className: "month-bill-info fn-clear"
            }, React.createElement("div", {
                className: "fn-left left-w"
            }, React.createElement("h4", null, React.createElement("span", {
                className: "title"
            }, "本月已赚取金额"), React.createElement("span", {
                className: "solid"
            }, "|"), React.createElement("span", null, "您在人人贷累计利息回报 ", React.createElement("em", {
                className: "num-y"
            }, numeral(data.totalEarnedAmount).format("0,0.00")), "元")), React.createElement("p", {
                className: "total-num"
            }, React.createElement("span", null, numeral(data.monthEarnedAmount).format("0,0.00")), "元"), React.createElement("div", {
                className: "fn-clear info-list"
            }, React.createElement("ul", {
                className: "fn-left info-profit-list"
            }, React.createElement("li", null, React.createElement("span", {
                className: "icon-type uplan"
            }), "U享服务/优选服务已赚金额 ", numeral(data.subEarnedAmountUplan).format("0,0.00"), "元"), React.createElement("li", null, React.createElement("span", {
                className: "icon-type autoinvestplan"
            }), "薪享服务已赚金额 ", numeral(data.subEarnedAmountFixed).format("0,0.00"), "元"), React.createElement("li", null, React.createElement("span", {
                className: "icon-type loan"
            }), "债权已赚金额 ", numeral(data.mainEarnedAmount).format("0,0.00"), "元"), React.createElement("li", null, React.createElement("span", {
                className: "icon-type uplan-y"
            }), "月升计划 ", numeral(data.subEarnedAmountMonthlyRise).format("0,0.00"), "元")), React.createElement("div", {
                className: "fn-right assetDetailPie",
                id: "assetDetailPie-profit"
            }))), React.createElement("div", {
                className: "fn-right right-w"
            }, React.createElement("h4", null, React.createElement("span", {
                className: "title"
            }, "本月已出借金额"), React.createElement("span", {
                className: "solid"
            }, "|"), React.createElement("span", null, "您在人人贷累计出借 ", React.createElement("em", {
                className: "num-y"
            }, numeral(data.totalLendAmount).format("0,0.00")), "元")), React.createElement("p", {
                className: "total-num"
            }, React.createElement("span", null, numeral(data.monthLendAmount).format("0,0.00")), "元"), React.createElement("div", {
                className: "fn-clear info-list"
            }, React.createElement("ul", {
                className: "fn-left info-invest-list"
            }, React.createElement("li", null, React.createElement("span", {
                className: "icon-type uplan"
            }), "U享服务/优选服务出借金额 ", numeral(data.subLendAmountUplan).format("0,0.00"), "元"), React.createElement("li", null, React.createElement("span", {
                className: "icon-type autoinvestplan"
            }), "薪享服务出借金额 ", numeral(data.subLendAmountFixed).format("0,0.00"), "元"), React.createElement("li", null, React.createElement("span", {
                className: "icon-type loan"
            }), "债权出借金额 ", numeral(data.mainLendAmount).format("0,0.00"), "元"), React.createElement("li", null, React.createElement("span", {
                className: "icon-type uplan-y"
            }), "月升计划 ", numeral(data.subLendAmountMonthlyRise).format("0,0.00"), "元")), React.createElement("div", {
                className: "fn-right assetDetailPie",
                id: "assetDetailPie-invest"
            })))), React.createElement("div", {
                className: "month-bill-article fn-clear"
            }, React.createElement("div", {
                className: "fn-left left-w"
            }, React.createElement("div", {
                className: "fn-clear"
            }, React.createElement("dl", {
                className: "fn-left mr140"
            }, React.createElement("dt", null, React.createElement("span", null, numeral(data.monthlyRechargeAmount).format("0,0.00")), "元"), React.createElement("dd", null, "本月充值金额")), React.createElement("dl", {
                className: "fn-left"
            }, React.createElement("dt", null, React.createElement("span", null, numeral(data.monthlyWithdrawAmount).format("0,0.00")), "元"), React.createElement("dd", null, "本月提现金额")))), React.createElement("div", {
                className: "fn-right right-w"
            }, React.createElement("p", null, "您在人人贷累计充值", numeral(data.rechargeAmount).format("0,0.00"), "元，累计提现", numeral(data.withdrawAmount).format("0,0.00"), "元 ", React.createElement("a", {
                href: "/user/record/p2p?tab=2"
            }, "查看交易明细 >")))))
        }
        ,
        MonthBillsDetail
    }(React.Component));
    module.exports = MonthBillsDetail
});
;/*!/client/widget/account/monthbills/list/RList.jsx*/
define("user:widget/account/monthbills/list/RList.jsx", function(require, exports, module) {
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
      , numeral = (require("common:node_modules/react-dom/index"),
    require("common:node_modules/numeral/numeral"))
      , MonthBillsList = function(_React$Component) {
        function MonthBillsList() {
            _classCallCheck(this, MonthBillsList),
            _React$Component.apply(this, arguments)
        }
        return _inherits(MonthBillsList, _React$Component),
        MonthBillsList.prototype.render = function() {
            var data = this.props.data;
            return React.createElement("div", {
                className: "color-white-bg"
            }, React.createElement("table", {
                className: "month-bill-table"
            }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {
                className: "name"
            }, "项目名称"), React.createElement("th", {
                className: "total-profit"
            }, "累计已赚取金额"), React.createElement("th", {
                className: "month-profit"
            }, "本月已赚金额"), React.createElement("th", {
                className: "hold-money"
            }, "出借本金"), React.createElement("th", {
                className: "hold-num"
            }, "当前持有笔数"))), React.createElement("tbody", null, React.createElement("tr", {
                className: "even"
            }, React.createElement("td", null, "U享服务/优选服务"), React.createElement("td", null, React.createElement("span", {
                className: "num-y"
            }, numeral(data.totalEarnedAmountUplan).format("0,0.00"), "元")), React.createElement("td", null, numeral(data.subEarnedAmountUplan).format("0,0.00"), "元"), React.createElement("td", null, numeral(data.uplanAmount).format("0,0.00"), "元"), React.createElement("td", null, data.uplanCount)), React.createElement("tr", null, React.createElement("td", null, "月升计划"), React.createElement("td", null, React.createElement("span", {
                className: "num-y"
            }, numeral(data.totalEarnedAmountMonthlyRise).format("0,0.00"), "元")), React.createElement("td", null, numeral(data.subEarnedAmountMonthlyRise).format("0,0.00"), "元"), React.createElement("td", null, numeral(data.monthlyRiseAmount).format("0,0.00"), "元"), React.createElement("td", null, data.monthlyRiseCount)), React.createElement("tr", {
                className: "even"
            }, React.createElement("td", null, "薪享服务"), React.createElement("td", null, React.createElement("span", {
                className: "num-y"
            }, numeral(data.totalEarnedAmountFixed).format("0,0.00"), "元")), React.createElement("td", null, numeral(data.subEarnedAmountFixed).format("0,0.00"), "元"), React.createElement("td", null, numeral(data.fixedAmount).format("0,0.00"), "元"), React.createElement("td", null, data.fixedCount)), React.createElement("tr", null, React.createElement("td", null, "债权"), React.createElement("td", null, React.createElement("span", {
                className: "num-y"
            }, numeral(data.totalEarnedAmountMain).format("0,0.00"), "元")), React.createElement("td", null, numeral(data.mainEarnedAmount).format("0,0.00"), "元"), React.createElement("td", null, numeral(data.claimsAmount).format("0,0.00"), "元"), React.createElement("td", null, data.claimsCount)))))
        }
        ,
        MonthBillsList
    }(React.Component);
    module.exports = MonthBillsList
});
;/*!/client/widget/account/monthbills/info/RInfo.jsx*/
define("user:widget/account/monthbills/info/RInfo.jsx", function(require, exports, module) {
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
      , echarts = (require("common:node_modules/react-dom/index"),
    require("common:widget/ui/echarts/echarts.min"))
      , RWeDialog = require("common:widget/react-ui/RWeDialog/RWeDialog")
      , ReDetail = require("user:widget/account/monthbills/detail/RDetail.jsx")
      , ReList = require("user:widget/account/monthbills/list/RList.jsx")
      , service = require("common:widget/ui/service/service-factory")
      , userService = service.getService("user")
      , ReMonthBillsInfo = function(_React$Component) {
        function ReMonthBillsInfo(props) {
            _classCallCheck(this, ReMonthBillsInfo),
            _React$Component.call(this, props),
            this.state = {
                monthListDisplay: !1,
                data: this.props.data,
                monthData: this.props.monthData,
                monthLastDate: this.props.monthData.monthLastDate[0],
                monthNow: this.props.monthData.monthList[0],
                tipText: null,
                dialogShowing: !1
            }
        }
        return _inherits(ReMonthBillsInfo, _React$Component),
        ReMonthBillsInfo.prototype.componentDidMount = function() {
            0 == this.props.data.status && this.assetPieFn()
        }
        ,
        ReMonthBillsInfo.prototype.showWeDialog = function(tipText) {
            this.setState({
                dialogShowing: !0,
                tipText: tipText
            })
        }
        ,
        ReMonthBillsInfo.prototype.hideWeDialog = function() {
            this.setState({
                dialogShowing: !1
            })
        }
        ,
        ReMonthBillsInfo.prototype.handleClick = function(index) {
            var month = this.state.monthData.monthArr[index];
            this.setState({
                monthListDisplay: !1
            }),
            this.loadData(month, index)
        }
        ,
        ReMonthBillsInfo.prototype.showMonthList = function() {
            this.state.monthListDisplay = !this.state.monthListDisplay,
            this.setState({
                monthListDisplay: this.state.monthListDisplay
            })
        }
        ,
        ReMonthBillsInfo.prototype.assetPieFn = function() {
            var _this = this
              , monthData = this.state.data.data.monthlyBillVo
              , option = [{
                name: "profit",
                data: {
                    title: {
                        show: !0,
                        textAlign: "middle",
                        textBaseline: "middle",
                        left: "38%",
                        top: "48%",
                        textStyle: {
                            color: "#848484",
                            fontWeight: "normal",
                            fontSize: "14"
                        }
                    },
                    series: [{
                        type: "pie",
                        radius: ["40%", "70%"],
                        clockwise: !1,
                        labelLine: {
                            normal: {
                                show: !1
                            }
                        },
                        label: {
                            normal: {
                                show: !1
                            },
                            emphasis: {
                                show: !1
                            }
                        },
                        data: [{
                            value: monthData.subEarnedAmountUplan,
                            name: "U享服务/优选服务",
                            itemStyle: {
                                normal: {
                                    color: "#FFC435"
                                }
                            }
                        }, {
                            value: monthData.subEarnedAmountFixed,
                            name: "薪享服务",
                            itemStyle: {
                                normal: {
                                    color: "#FFAA26"
                                }
                            }
                        }, {
                            value: monthData.mainEarnedAmount,
                            name: "债权",
                            itemStyle: {
                                normal: {
                                    color: "#045FCD"
                                }
                            }
                        }, {
                            value: monthData.subEarnedAmountMonthlyRise,
                            name: "月升计划",
                            itemStyle: {
                                normal: {
                                    color: "#2E8EF2"
                                }
                            }
                        }]
                    }]
                }
            }, {
                name: "invest",
                data: {
                    title: {
                        show: !0,
                        textAlign: "middle",
                        textBaseline: "middle",
                        left: "38%",
                        top: "48%",
                        textStyle: {
                            color: "#848484",
                            fontWeight: "normal",
                            fontSize: "14"
                        }
                    },
                    series: [{
                        type: "pie",
                        radius: ["40%", "70%"],
                        clockwise: !1,
                        labelLine: {
                            normal: {
                                show: !1
                            }
                        },
                        label: {
                            normal: {
                                show: !1
                            },
                            emphasis: {
                                show: !1
                            }
                        },
                        data: [{
                            value: monthData.subLendAmountUplan,
                            name: "U享服务/优选服务",
                            itemStyle: {
                                normal: {
                                    color: "#FFC435"
                                }
                            }
                        }, {
                            value: monthData.subLendAmountFixed,
                            name: "薪享服务",
                            itemStyle: {
                                normal: {
                                    color: "#FFAA26"
                                }
                            }
                        }, {
                            value: monthData.mainLendAmount,
                            name: "债权",
                            itemStyle: {
                                normal: {
                                    color: "#045FCD"
                                }
                            }
                        }, {
                            value: monthData.subLendAmountMonthlyRise,
                            name: "月升计划",
                            itemStyle: {
                                normal: {
                                    color: "#2E8EF2"
                                }
                            }
                        }]
                    }]
                }
            }];
            option.map(function(value, index) {
                _this.assetPie(option[index].name, option[index].data, index)
            })
        }
        ,
        ReMonthBillsInfo.prototype.assetPie = function(name, option, index) {
            var myChart = "myChart" + index;
            myChart = echarts.init(document.getElementById("assetDetailPie-" + name)),
            myChart.setOption(option, !0),
            $(".info-" + name + "-list li").hover(function() {
                var index = $(this).parent().children("li").index(this);
                myChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: index
                })
            }, function() {
                for (var dataLen = option.series[0].data.length; --dataLen >= 0; )
                    myChart.dispatchAction({
                        type: "downplay",
                        seriesIndex: 0,
                        dataIndex: dataLen
                    })
            })
        }
        ,
        ReMonthBillsInfo.prototype.loadData = function(month, index) {
            var _this = this;
            userService.getMonthBillsInfo({
                billMonth: month
            }).then(function(out) {
                if (out.requestStatus === userService.STATUS.ERROR)
                    return void _this.showWeDialog("网络异常，请稍候再试。");
                var rsp = out.data;
                return rsp.data ? (_this.setState({
                    data: rsp,
                    monthNow: _this.props.monthData.monthList[index],
                    monthLastDate: _this.props.monthData.monthLastDate[index]
                }),
                void _this.assetPieFn()) : void _this.showWeDialog(rsp.message)
            })["catch"](function(error) {
                _this.showWeDialog(error.message)
            })
        }
        ,
        ReMonthBillsInfo.prototype.render = function() {
            var _this = this
              , result = this.state.data
              , data = result.data.monthlyBillVo
              , monthData = this.state.monthData
              , monthNow = this.state.monthNow
              , monthLastDate = this.state.monthLastDate
              , tipText = this.state.tipText
              , monthListClass = "select-list"
              , detailDom = void 0
              , listDom = void 0
              , weDialog = void 0;
            this.state.monthListDisplay || (monthListClass += " fn-hide"),
            0 == result.status ? (detailDom = React.createElement(ReDetail, {
                data: data
            }),
            listDom = React.createElement(ReList, {
                data: data
            })) : detailDom = React.createElement("div", {
                className: "no-data-text"
            }, " ", result.message);
            var monthList = monthData.monthList.map(function(value, index) {
                return React.createElement("li", {
                    key: index,
                    onClick: _this.handleClick.bind(_this, index)
                }, React.createElement("a", null, value))
            });
            if (this.state.dialogShowing) {
                var weProps = {
                    showing: !0,
                    onRequestClose: this.hideWeDialog.bind(this)
                };
                weDialog = React.createElement(RWeDialog, weProps, React.createElement("div", {
                    className: "tip-content"
                }, tipText))
            }
            return React.createElement("div", null, React.createElement("div", {
                className: "color-white-bg mb20 month-bill-content"
            }, weDialog, React.createElement("div", {
                className: "ui-title fn-clear"
            }, React.createElement("div", {
                className: "fn-left"
            }, "月度账单 ", monthLastDate ? React.createElement("span", {
                className: "article"
            }, "*所有数据截止", monthLastDate) : ""), React.createElement("div", {
                className: "fn-right"
            }, React.createElement("div", {
                className: "select-group"
            }, monthNow ? React.createElement("p", {
                className: "select-text"
            }, React.createElement("i", {
                className: "icon-we-calendar"
            }), React.createElement("span", {
                onClick: this.showMonthList.bind(this)
            }, monthNow), React.createElement("span", {
                className: "ml10 icon-down3"
            })) : "", React.createElement("div", {
                className: monthListClass
            }, React.createElement("ul", null, monthList))))), detailDom), listDom)
        }
        ,
        ReMonthBillsInfo
    }(React.Component);
    module.exports = ReMonthBillsInfo
});
;/*!/client/widget/account/p2p/wdg-asset-statistics/wdg-asset-statistics.jsx*/
define("user:widget/account/p2p/wdg-asset-statistics/wdg-asset-statistics.jsx", function(require, exports, module) {
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
      , pie = require("common:widget/ui/echarts/pie")
      , $ = require("common:widget/lib/jquery/jquery")
      , utils = require("common:widget/ui/utils/utils")
      , RWETooltip = require("common:widget/react-ui/RWETooltip/RWETooltip")
      , AssetStatistics = function(_React$Component) {
        function AssetStatistics() {
            _classCallCheck(this, AssetStatistics),
            _React$Component.apply(this, arguments)
        }
        return _inherits(AssetStatistics, _React$Component),
        AssetStatistics.prototype.renderStatistics = function() {
            var props = this.props
              , uplan = {}
              , premium = {}
              , autoInvest = {}
              , loan = {};
            uplan.assets = utils.commaFloat(props.p2pAssetData.financePlanAsset),
            uplan.sumPlanInterest = utils.commaFloat(props.p2pAssetData.financePlanEarning),
            premium.assets = utils.commaFloat(props.p2pAssetData.premiumPlanAsset),
            premium.sumPlanInterest = utils.commaFloat(props.p2pAssetData.premiumPlanEarning),
            autoInvest.assets = utils.commaFloat(props.p2pAssetData.autoInvestPlanAsset),
            autoInvest.sumPlanInterest = utils.commaFloat(props.p2pAssetData.autoInvestPlanEarning),
            loan.assets = utils.commaFloat(props.p2pAssetData.userLoanAsset),
            loan.earnInterestAmount = utils.commaFloat(props.p2pAssetData.userLoanEarning);
            var tooltipProps_uplan_profit = {
                id: "user-account-tooltip-uplan-profit",
                place: "bottom",
                tip: "\n                    利息循环出借金额" + utils.commaFloat(props.p2pAssetData.financePlanInterestReinvestedAmount) + "元<br>\n                    已提取金额" + utils.commaFloat(props.p2pAssetData.financePlanTotalCashDrawInterest) + "元\n                ",
                delayHide: 100
            }
              , uplanProfitTip = React.createElement(RWETooltip, tooltipProps_uplan_profit)
              , tooltipProps_loan_profit = {
                id: "user-account-tooltip-loan-profit",
                place: "bottom",
                tip: "\n                    利息回报" + utils.commaFloat(props.p2pAssetData.userLoanInterestRepayment) + "元<br>\n                    债权转让盈亏" + utils.commaFloat(props.p2pAssetData.userLoanTransferEarn) + "元\n                ",
                delayHide: 100
            }
              , loanProfitTip = React.createElement(RWETooltip, tooltipProps_loan_profit);
            return React.createElement("dl", null, React.createElement("dt", {
                className: "fn-clear"
            }, React.createElement("div", {
                className: "p2p-name"
            }, "服务类型/项目类型"), React.createElement("div", {
                className: "p2p-hold"
            }, "持有资产"), React.createElement("div", {
                className: "p2p-profit"
            }, "累计利息")), React.createElement("dd", {
                className: "fn-clear"
            }, React.createElement("div", {
                className: "p2p-name"
            }, React.createElement("span", {
                className: "p2p-dot p2p-dot-monthly"
            }), "优选自动投标服务"), React.createElement("div", {
                className: "p2p-hold"
            }, 0 != premium.assets ? premium.assets : "0.00", "元"), React.createElement("div", {
                className: "p2p-profit"
            }, 0 != premium.sumPlanInterest ? premium.sumPlanInterest : "0.00", "元")), React.createElement("dd", {
                className: "fn-clear"
            }, React.createElement("div", {
                className: "p2p-name"
            }, React.createElement("span", {
                className: "p2p-dot p2p-dot-uplan"
            }), "U享自动投标服务"), React.createElement("div", {
                className: "p2p-hold"
            }, uplan.assets, "元"), React.createElement("div", {
                className: "p2p-profit"
            }, uplan.sumPlanInterest, "元 ", uplanProfitTip)), React.createElement("dd", {
                className: "fn-clear"
            }, React.createElement("div", {
                className: "p2p-name"
            }, React.createElement("span", {
                className: "p2p-dot p2p-dot-autoinvest"
            }), "薪享自动投标服务"), React.createElement("div", {
                className: "p2p-hold"
            }, autoInvest.assets, "元"), React.createElement("div", {
                className: "p2p-profit"
            }, autoInvest.sumPlanInterest, "元")), React.createElement("dd", {
                className: "fn-clear"
            }, React.createElement("div", {
                className: "p2p-name"
            }, React.createElement("span", {
                className: "p2p-dot p2p-dot-loan"
            }), "散标债权"), React.createElement("div", {
                className: "p2p-hold"
            }, loan.assets, "元"), React.createElement("div", {
                className: "p2p-profit"
            }, loan.earnInterestAmount, "元 ", loanProfitTip)))
        }
        ,
        AssetStatistics.prototype.componentDidMount = function() {
            if (!this.props.p2pAssetData)
                return null;
            var p2pAsset = this.props.p2pAssetData
              , loanValue = parseFloat(p2pAsset.userLoanAsset)
              , option = {
                title: {
                    show: !0,
                    text: "资产占比",
                    textAlign: "middle",
                    textBaseline: "middle",
                    left: "38%",
                    top: "48%",
                    textStyle: {
                        color: "#848484",
                        fontWeight: "normal",
                        fontSize: "14"
                    }
                },
                series: [{
                    name: "资产占比",
                    type: "pie",
                    radius: ["67%", "92%"],
                    clockwise: !1,
                    labelLine: {
                        normal: {
                            show: !1
                        }
                    },
                    label: {
                        normal: {
                            show: !1
                        },
                        emphasis: {
                            show: !1
                        }
                    },
                    data: [{
                        value: p2pAsset.premiumPlanAsset < 0 ? 0 : p2pAsset.premiumPlanAsset,
                        name: "优选计划",
                        itemStyle: {
                            normal: {
                                color: "#ffab00"
                            }
                        }
                    }, {
                        value: p2pAsset.financePlanAsset < 0 ? 0 : p2pAsset.financePlanAsset,
                        name: "U计划",
                        itemStyle: {
                            normal: {
                                color: "#ffc617"
                            }
                        }
                    }, {
                        value: p2pAsset.autoInvestPlanAsset < 0 ? 0 : p2pAsset.autoInvestPlanAsset,
                        name: "薪计划",
                        itemStyle: {
                            normal: {
                                color: "#0159d0"
                            }
                        }
                    }, {
                        value: 0 > loanValue ? 0 : loanValue,
                        name: "散标债权",
                        itemStyle: {
                            normal: {
                                color: "#288af5"
                            }
                        }
                    }]
                }]
            };
            pie.init("assetStatisticsPie", option),
            $(".p2p-asset-detail dd").hover(function() {
                var index = $(this).parent().children("dd").index(this);
                pie.hoverTicket(index)
            }, function() {
                pie.dispatchTicket()
            })
        }
        ,
        AssetStatistics.prototype.render = function() {
            if (!this.props.p2pAssetData)
                return null;
            var statistic = this.renderStatistics();
            return React.createElement("div", {
                className: "p2p-index-asset-statistics"
            }, React.createElement("div", {
                className: "p2p-title"
            }, "P2P资产", React.createElement("ul", {
                className: "p2p-link-list fn-clear"
            }, React.createElement("li", null, React.createElement("a", {
                href: "/user/bank/werrdMyBank"
            }, "P2P银行卡")), React.createElement("li", null, React.createElement("a", {
                href: "/user/account/returns"
            }, "回账查询")), React.createElement("li", null, React.createElement("a", {
                href: "/user/account/monthbills"
            }, "月账单")), React.createElement("li", null, React.createElement("a", {
                href: "/user/record/p2p?tab=2"
            }, "交易记录")))), React.createElement("div", {
                className: "p2p-asset-detail"
            }, statistic, React.createElement("div", {
                className: "assetStatisticsPie",
                id: "assetStatisticsPie"
            })))
        }
        ,
        AssetStatistics
    }(React.Component);
    module.exports = AssetStatistics
});
;/*!/client/widget/account/p2p/wdg-premium-renewal-dialog/wdg-premium-renewal-dialog.js*/
define("user:widget/account/p2p/wdg-premium-renewal-dialog/wdg-premium-renewal-dialog.js", function(require, exports, module) {
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
      , RWeStatusDialog = require("common:widget/react-ui/RWeStatusDialog/RWeStatusDialog")
      , RForm = require("common:widget/react-ui/RForm/RForm")
      , RToast = require("common:widget/react-ui/RToast/RToast")
      , RWETooltip = require("common:widget/react-ui/RWETooltip/RWETooltip")
      , moment = require("common:node_modules/moment/moment")
      , numeral = require("common:node_modules/numeral/numeral")
      , service = require("common:widget/ui/service/service-factory")
      , uplanService = service.getService("uplan")
      , RUserPremiumRenewalDialog = function(_React$Component) {
        function RUserPremiumRenewalDialog(props) {
            _classCallCheck(this, RUserPremiumRenewalDialog),
            _React$Component.call(this, props),
            this.state = {
                showPremiumRenewalDialog: !0,
                checked: !1,
                premiumInfo: null,
                riskInfo: null,
                inActivity: null,
                errorMsg: null,
                disabled: !1,
                showResult: !1,
                resultStatus: null,
                resultMsg: "",
                tab: 100,
                isAuthoriseTen: !1,
                monthsList: [],
                scoreDeductionData: null
            },
            this.closePremiumRenewalDialog = this.closePremiumRenewalDialog.bind(this),
            this.premiumRenewalSuccess = this.premiumRenewalSuccess.bind(this),
            this.doRenewal = this.doRenewal.bind(this),
            this.checkAgree = this.checkAgree.bind(this),
            this.jumpToRisk = this.jumpToRisk.bind(this),
            this.changeTab = this.changeTab.bind(this),
            this.handleScoreDeductChecked = this.handleScoreDeductChecked.bind(this),
            this.__repeatSubmit = !1
        }
        return _inherits(RUserPremiumRenewalDialog, _React$Component),
        RUserPremiumRenewalDialog.prototype.changeTab = function(tab) {
            this.setState({
                tab: tab,
                scoreDeductChecked: !1
            })
        }
        ,
        RUserPremiumRenewalDialog.prototype.jumpToRisk = function() {
            var _props = this.props
              , type = _props.type
              , financePlanId = _props.financePlanId
              , subPointId = _props.subPointId;
            location.href = "detailPremium" == type ? "/user/risk/riskPc?type=detailPremium&financePlanId=" + financePlanId + "&subPointId=" + subPointId : "/user/risk/riskPc?type=listPremium"
        }
        ,
        RUserPremiumRenewalDialog.prototype.closePremiumRenewalDialog = function() {
            this.props.closeRenewalDialog()
        }
        ,
        RUserPremiumRenewalDialog.prototype.premiumRenewalSuccess = function() {
            this.props.closeRenewalDialog(),
            location.reload()
        }
        ,
        RUserPremiumRenewalDialog.prototype.componentDidMount = function() {
            var subPointId = this.props.subPointId
              , that = this;
            $.ajax({
                url: "/user/account/p2p/premiumConfirmRollOverInfo",
                type: "POST",
                data: {
                    subPointId: subPointId
                },
                dataType: "json",
                success: function(res) {
                    if (0 == res.status) {
                        var info = res.data.info
                          , maxMonth = info.maxMonth
                          , nowTime = moment(info.nowTime).add(maxMonth, "months").format("x")
                          , tab = 100;
                        tab = nowTime >= info.expireDate ? maxMonth : 100,
                        that.setState({
                            premiumInfo: res.data.info,
                            riskInfo: res.data.riskInfo,
                            inActivity: res.data.inActivity,
                            tab: tab,
                            monthsList: res.data.monthsList
                        }),
                        that._getUserDeduction()
                    } else
                        that.setState({
                            showResult: !0,
                            resultStatus: -9999,
                            resultMsg: res.message || "网络异常，请稍后再试"
                        })
                },
                error: function(e) {
                    that.setState({
                        showResult: !0,
                        resultStatus: -9999,
                        resultMsg: e.message || "网络异常，请稍后再试"
                    })
                }
            })
        }
        ,
        RUserPremiumRenewalDialog.prototype._getUserDeduction = function() {
            var _this = this
              , premiumInfo = this.state.premiumInfo;
            uplanService.getUserDeduction({
                amount: premiumInfo.assets
            }).then(function(res) {
                if (res = res.data,
                0 === res.status) {
                    var scoreDeductionData = res.data;
                    _this.setState({
                        scoreDeductionData: scoreDeductionData
                    })
                }
            })["catch"](function(e) {
                _this.setState({
                    showResult: !0,
                    resultStatus: -9999,
                    resultMsg: e.message || "网络异常，请稍后再试"
                })
            })
        }
        ,
        RUserPremiumRenewalDialog.prototype.handleScoreDeductChecked = function(e) {
            var state = this.state
              , classNames = e.target.className;
            classNames.indexOf("disabled") > -1 || this.setState({
                scoreDeductChecked: !state.scoreDeductChecked
            })
        }
        ,
        RUserPremiumRenewalDialog.prototype.doRenewal = function() {
            var subPointId = this.props.subPointId
              , _state = this.state
              , disabled = _state.disabled
              , tab = _state.tab
              , scoreDeductChecked = _state.scoreDeductChecked
              , months = "";
            100 !== tab && (months = tab);
            var that = this;
            if (disabled)
                return !1;
            var checked = this.state.checked;
            return checked ? this.__repeatSubmit ? !1 : (this.__repeatSubmit = !0,
            void $.ajax({
                url: "/user/account/p2p/premiumConfirmRollOver",
                type: "POST",
                data: {
                    subPointId: subPointId,
                    months: months,
                    useScore: scoreDeductChecked ? 1 : 0
                },
                dataType: "json",
                success: function(res) {
                    69018 == res.status ? RToast.info(res.message || "当前期限额度不足，请选择其他期限或明日再试", 3e3) : that.setState({
                        showResult: !0,
                        resultStatus: res.status,
                        resultMsg: res.message || "网络异常，请稍后再试"
                    }),
                    that.__repeatSubmit = !1
                },
                error: function(e) {
                    that.setState({
                        showResult: !0,
                        resultStatus: -9999,
                        resultMsg: e.message || "网络异常，请稍后再试"
                    }),
                    that.__repeatSubmit = !1
                }
            })) : (this.setState({
                errorMsg: "请阅读并同意协议"
            }),
            !1)
        }
        ,
        RUserPremiumRenewalDialog.prototype.checkAgree = function() {
            var curStatus = !this.state.checked;
            this.setState({
                checked: curStatus,
                errorMsg: curStatus ? "" : "请阅读并同意协议"
            })
        }
        ,
        RUserPremiumRenewalDialog.prototype.renderResult = function() {
            var _state2 = this.state
              , resultStatus = _state2.resultStatus
              , resultMsg = _state2.resultMsg
              , premiumInfo = _state2.premiumInfo
              , inActivity = _state2.inActivity
              , conentDom = null
              , buttons = null;
            if (0 == resultStatus) {
                var cashBack = null;
                "true" == inActivity && premiumInfo.amount > 0 && (cashBack = React.createElement("div", {
                    className: "cash-back-txt"
                }, "稍后可在我的账户中查看奖励金额")),
                conentDom = React.createElement("div", null, React.createElement("div", {
                    className: "success-txt"
                }, "转固定期成功"), cashBack),
                buttons = [{
                    text: "我知道了",
                    event: this.premiumRenewalSuccess,
                    skin: "orange"
                }]
            } else
                conentDom = React.createElement("div", null, resultMsg),
                buttons = [{
                    text: "我知道了",
                    event: this.closePremiumRenewalDialog,
                    skin: "orange"
                }];
            var dialogProps = {
                onRequestClose: this.closePremiumRenewalDialog,
                buttons: buttons,
                status: resultStatus,
                message: conentDom
            };
            return React.createElement(RWeStatusDialog, dialogProps)
        }
        ,
        RUserPremiumRenewalDialog.prototype.renderRenewal = function() {
            var _this2 = this
              , state = this.state
              , checked = state.checked
              , premiumInfo = state.premiumInfo
              , riskInfo = state.riskInfo
              , errorMsg = state.errorMsg
              , disabled = state.disabled
              , inActivity = state.inActivity
              , tab = state.tab
              , monthsList = state.monthsList
              , scoreDeductionData = state.scoreDeductionData
              , premiumRenewalProps = {
                showing: !0,
                title: "",
                onRequestClose: this.closePremiumRenewalDialog
            }
              , formProps = {
                action: "/user/account/p2p/premiumConfirmRollOver",
                method: "POST",
                id: "uer-premium-renewal-form"
            };
            if (!premiumInfo)
                return null;
            var joinBtnProps = {
                className: "j-btn  j-btn-super-big j-btn-orange",
                text: "确认转固定期"
            };
            disabled && (joinBtnProps.className += " j-btn-disabled ");
            var btnDom = React.createElement("input", {
                className: joinBtnProps.className,
                type: "submit",
                value: joinBtnProps.text
            });
            if (riskInfo) {
                var riskFlag = riskInfo.riskFlag
                  , isRisk = riskInfo.isRisk;
                riskFlag && !isRisk && (btnDom = React.createElement("div", null, React.createElement("div", {
                    className: "j-btn j-btn-super-big j-btn-orange",
                    onClick: this.jumpToRisk
                }, "先测评，再转固定期"), React.createElement("div", {
                    className: "risk-tips-content"
                }, "为了向您提供更优质的服务，保护您的合法权益，请您配合完成测试")))
            }
            var FixedMonthDom = [];
            monthsList.forEach(function(data, index) {
                FixedMonthDom.push(React.createElement("div", {
                    className: "time-radio",
                    key: index,
                    onClick: _this2.changeTab.bind(_this2, data)
                }, React.createElement("i", {
                    className: tab === data ? "icon-we-juse" : "icon-we-yuanquan"
                }), React.createElement("em", null, data, "个月")))
            });
            var fixedTerm = React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "转固定期至"), React.createElement("span", {
                className: "value months-list-item orange-highlight"
            }, React.createElement("div", {
                className: "time-radio",
                onClick: this.changeTab.bind(this, 100)
            }, React.createElement("i", {
                className: 100 === tab ? "icon-we-juse" : "icon-we-yuanquan"
            }), React.createElement("em", null, "自由服务期结束日")), FixedMonthDom))
              , expireDate = premiumInfo.expireDate
              , lockingStatus = premiumInfo.lockingStatus
              , endLockingTime = premiumInfo.endLockingTime
              , freedomRolloverMonths = premiumInfo.freedomRolloverMonths
              , expireDatePartText = ""
              , expireDateText = null
              , month = -1;
            if (100 !== tab) {
                if (0 == lockingStatus)
                    expireDatePartText = "固定服务期结束日",
                    expireDate = moment(parseInt(endLockingTime)).add(tab, "months").format("x");
                else {
                    var nowTime = parseInt(premiumInfo.nowTime) || (new Date).getTime();
                    expireDate = moment(parseInt(nowTime)).add(tab, "months").format("x"),
                    expireDatePartText = "转固定期操作日"
                }
                expireDateText = expireDatePartText + "+" + tab + "个月",
                month = tab
            } else
                month = freedomRolloverMonths;
            expireDate = moment(parseInt(expireDate)).format("YYYY-MM-DD");
            var cashBack = null;
            if ("true" == inActivity) {
                var backAmount = premiumInfo.expireBackAmount;
                100 !== tab && (backAmount = premiumInfo["after" + tab + "Month"]),
                backAmount && (cashBack = React.createElement("div", {
                    className: "cash-back"
                }, React.createElement("img", {
                    src: "https://s0.renrendai.com/cms/5864b0d6a24d131067ef7956/premium/renewal.png"
                }), "转固定期可获得奖励 ", React.createElement("span", {
                    className: "orange"
                }, numeral(backAmount).format("0,0.00"), "元")))
            }
            var errorMsgDom = null;
            errorMsg && (errorMsgDom = React.createElement("div", {
                className: "error-msg"
            }, errorMsg));
            var scoreTooltipProps = {
                id: "user-premium-transfer-tooltip-01",
                place: "left",
                tip: '<div style="line-height:22px;">\n                    <span>1、100积分可抵扣1元人民币，抵现时使用积分为100的整数倍。<br></span>\n                    <span>2、单笔最多用积分抵扣转固金额的1%。<br></span>\n                    <span>3、转固定期至12个月及以上期限可用。<br></span>\n                    <span>4、抵扣金额在成功转固定期后发放至您的账户。<br></span>\n                </div>\n                ',
                delayHide: 100
            }
              , scoreDeductDom = null;
            if (scoreDeductionData && month >= 12) {
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
                    className: "score-deduct-agree-checkbox  " + (state.scoreDeductChecked ? "icon-we-xuanzhong" : "icon-we-yuanquan") + "  " + disabledClassName,
                    onClick: function(e) {
                        return _this2.handleScoreDeductChecked(e)
                    }
                }), React.createElement("span", null, deductionAmountF, "元"), scoreDeductExtraDom))
            }
            var premiumRenewalDialog = React.createElement(RDialog, premiumRenewalProps, React.createElement("div", {
                className: "account-show-premium-renewal-content"
            }, React.createElement("div", {
                className: "account-show-premium-renewal-title"
            }, "转固定期 ", React.createElement("a", {
                href: "https://www.renrendai.com/help/investment/5940a970cfb0740f025f372a",
                target: "_blank"
            }, "转固定期规则")), React.createElement("div", {
                className: "account-show-premium-renewal-yellow-tip"
            }, React.createElement("img", {
                className: "light",
                src: "https://s0.renrendai.com/cms/5864b0d6a24d131067ef7956/premium/light.png"
            }), " 确认转固定期后，到期日前不可提前退出"), React.createElement(RForm, _extends({}, formProps, {
                onSubmit: this.doRenewal
            }), fixedTerm, React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "到期日"), React.createElement("span", {
                className: "value orange-highlight"
            }, expireDate), React.createElement("span", {
                className: "value-text"
            }, expireDateText)), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "扣费后年利率"), React.createElement("span", {
                className: "value orange-highlight"
            }, numeral(premiumInfo.yearRate).format("0,0.0"), "%")), scoreDeductDom, React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("div", {
                className: "plan-agreement"
            }, React.createElement("div", null, React.createElement("span", {
                className: checked ? "agreement-check-img icon-we-gouxuanicon" : "agreement-check-img icon-we-weigouxuanicon",
                onClick: this.checkAgree
            }), React.createElement("span", {
                className: "agreement-desc"
            }, "我已阅读并同意签署", React.createElement("a", {
                href: "https://www.renrendai.com/agreement/user/currency/cmsId/5c19e0b94e8a8b589cae663a",
                target: "_blank"
            }, "《优选服务补充协议》"), "， 已确认", React.createElement("a", {
                href: "https://www.renrendai.com/agreement/contract/currency/cmsId/5bb06ea3e141322c89974537",
                target: "_blank"
            }, "《风险揭示书》"))))), cashBack, errorMsgDom, React.createElement("div", {
                className: "ui-confirm-submit-box text-center"
            }, btnDom))));
            return premiumRenewalDialog
        }
        ,
        RUserPremiumRenewalDialog.prototype.render = function() {
            var showResult = this.state.showResult
              , dom = showResult ? this.renderResult() : this.renderRenewal();
            return dom
        }
        ,
        RUserPremiumRenewalDialog
    }(React.Component);
    module.exports = RUserPremiumRenewalDialog
});
;/*!/client/widget/account/p2p/wdg-tab-autoinvest/wdg-tab-autoinvest.jsx*/
define("user:widget/account/p2p/wdg-tab-autoinvest/wdg-tab-autoinvest.jsx", function(require, exports, module) {
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
      , List = require("common:widget/react-ui/RList/ListV2.0")
      , service = require("common:widget/ui/service/service-factory")
      , p2pService = service.getService("p2p")
      , autoinvestService = service.getService("autoinvest")
      , utils = require("common:widget/ui/utils/utils")
      , autoinvestPayWindow = require("autoinvest:widget/user/detail/pay-popup/pay-popup")
      , RWETooltip = require("common:widget/react-ui/RWETooltip/RWETooltip")
      , AssetAutoInvest = function(_React$Component) {
        function AssetAutoInvest(props) {
            _classCallCheck(this, AssetAutoInvest),
            _React$Component.call(this, props),
            this.state = {
                listData: null,
                startNum: 0
            },
            this.payMoneySubmit = this.payMoneySubmit.bind(this)
        }
        return _inherits(AssetAutoInvest, _React$Component),
        AssetAutoInvest.prototype.handleUpdateAutoInvest = function(data, startNum) {
            this.setState({
                listData: data,
                startNum: startNum
            })
        }
        ,
        AssetAutoInvest.prototype.handleUnPayTip = function(allowRechargeAdvanceDays) {
            var username = this.props.username
              , payWindow = new autoinvestPayWindow({
                type: "UNPAY",
                data: {
                    nickname: username,
                    allowDays: allowRechargeAdvanceDays
                }
            });
            payWindow.show()
        }
        ,
        AssetAutoInvest.prototype.handlePayTheLatest = function(item) {
            var _this = this
              , state = this.state
              , dueAccountMoney = state.listData.data.availablePoint || 0
              , currentPayWindow = new autoinvestPayWindow({
                type: "PAY",
                submitCallback: _this.payMoneySubmit,
                data: {
                    id: item.shouldRechargePeriod,
                    amount: item.monthlyRechargeAmount,
                    autoInvestPlanRecordId: item.shouldRechargeRecordId,
                    autoinvestId: item.autoInvestPlanId,
                    dueAccountMoney: dueAccountMoney
                }
            });
            currentPayWindow.show()
        }
        ,
        AssetAutoInvest.prototype.handlePayThePrevious = function(item) {
            var _this = this
              , state = this.state
              , dueAccountMoney = state.listData.data.availablePoint || 0
              , currentPayWindow = new autoinvestPayWindow({
                type: "ADD_PAY",
                submitCallback: _this.payMoneySubmit,
                data: {
                    id: item.shouldRechargePeriod,
                    amount: item.monthlyRechargeAmount,
                    autoInvestPlanRecordId: item.shouldRechargeRecordId,
                    payDate: item.overduePayDate,
                    totalDueDays: item.totalOverdueDays,
                    dueDays: item.overdueDays,
                    maxDueDays: item.maxAllowOverdueDays,
                    autoinvestId: item.autoInvestPlanId,
                    dueAccountMoney: dueAccountMoney
                }
            });
            currentPayWindow.show()
        }
        ,
        AssetAutoInvest.prototype.payMoneySubmit = function(data) {
            var username = this.props.username
              , formData = {
                autoInvestPlanRecordId: data.autoInvestPlanRecordId,
                couponId: data.couponId
            };
            autoinvestService.autoinvestRecharge(formData).then(function(res) {
                0 == res.data.status ? new autoinvestPayWindow({
                    type: "NORMAL",
                    data: {
                        text: res.data.message,
                        nickname: username,
                        success: !0,
                        title: "成功"
                    },
                    submitCallback: function() {
                        window.location.reload()
                    },
                    cancelCallback: function() {
                        window.location.reload()
                    }
                }).show() : new autoinvestPayWindow({
                    type: "NORMAL",
                    data: {
                        text: res.data.message,
                        nickname: username,
                        title: "失败"
                    }
                }).show()
            })
        }
        ,
        AssetAutoInvest.prototype.createAutoInvestRow = function(item) {
            var _this2 = this
              , nextDate = null;
            nextDate = "EXITING" == item.status || "EXITED" == item.status ? React.createElement("div", {
                className: "p2p-account-filed w250"
            }, React.createElement("p", null, item.endLockingTime.substring(0, 10)), React.createElement("p", null, "退出日期")) : React.createElement("div", {
                className: "p2p-account-filed w250"
            }, React.createElement("p", null, item.nextRechargeDate), React.createElement("p", null, "下次出借日"));
            var link = "/autoinvest/user/" + item.autoInvestPlanId
              , status = null;
            status = "EXITING" == item.status ? React.createElement("a", {
                className: "pay-btn exited-btn stay-current-page",
                title: "",
                href: "javascript:"
            }, "退出中") : "EXITED" == item.status ? React.createElement("a", {
                className: "pay-btn exited-btn stay-current-page",
                title: "",
                href: "javascript:"
            }, "已退出") : item.displayPayment ? "0" == item.overduePay ? React.createElement("a", {
                className: "pay-btn stay-current-page",
                href: "javascript:",
                title: "",
                onClick: this.handlePayTheLatest.bind(this, item)
            }, "支付") : React.createElement("a", {
                className: "pay-btn stay-current-page",
                href: "javascript:",
                title: "",
                onClick: this.handlePayThePrevious.bind(this, item)
            }, "补支付") : React.createElement("a", {
                className: "pay-btn disabled stay-current-page",
                title: "",
                href: "javascript:"
            }, "支付");
            var tooltipProps_autoinvest_earn = {
                id: "user-account-tooltip-autoinvest-earn",
                place: "right",
                tip: "\n                    累计利息" + utils.commaFloat(item.totalEarnInterest) + "元<br>\n                    延期费用" + utils.commaFloat(item.overdueFee) + "元\n                ",
                delayHide: 100
            }
              , unPayTips = null;
            return "EXITING" != item.status && "EXITED" != item.status && (item.displayPayment || (unPayTips = React.createElement("span", {
                className: "un-pay-tips"
            }, "距离出借日", item.allowRechargeAdvanceDays, "天内开放支付"))),
            React.createElement("dl", {
                onClick: function(e) {
                    return _this2.handleGoToDetail(link, e)
                },
                title: "点击查看详情"
            }, React.createElement("dt", null, item.autoInvestPlanName, " ", React.createElement("span", {
                className: "target"
            }, item.aipCustomName), " ", unPayTips), React.createElement("dd", {
                className: "fn-clear"
            }, React.createElement("div", {
                className: "p2p-account-filed w240"
            }, React.createElement("div", {
                className: "p2p-account-filed-line"
            }, utils.commaFloat(item.totalEarnInterest - item.overdueFee), "元 ", React.createElement(RWETooltip, tooltipProps_autoinvest_earn)), React.createElement("p", null, "已获利息")), React.createElement("div", {
                className: "p2p-account-filed w212"
            }, React.createElement("p", null, item.alreadyRechargePeriod, "/12期"), React.createElement("p", null, "已出借期数")), React.createElement("div", {
                className: "p2p-account-filed w247"
            }, React.createElement("p", null, utils.commaFloat(item.monthlyRechargeAmount), "元"), React.createElement("p", null, "月出借本金")), nextDate, React.createElement("div", {
                className: "p2p-account-filed action"
            }, status)))
        }
        ,
        AssetAutoInvest.prototype.loadData = function() {
            var _this3 = this;
            p2pService.getUserAutoInvestList().then(function(out) {
                if (out.requestStatus !== p2pService.STATUS.ERROR) {
                    var rsp = out.data;
                    _this3.setState({
                        listData: rsp
                    })
                }
            })
        }
        ,
        AssetAutoInvest.prototype.renderList = function() {
            var list = null
              , data = this.state.listData
              , startNum = this.state.startNum;
            return data ? list = React.createElement(List, _extends({}, data, {
                moudleServiceName: "p2p",
                url: "getUserAutoInvestList",
                isHeadNeed: "no",
                isHeadNeedOrder: "no",
                createRowDom: this.createAutoInvestRow.bind(this),
                updateTheData: this.handleUpdateAutoInvest.bind(this),
                noDataText: "没有薪享服务",
                startNum: startNum,
                limit: 20,
                offset: 5
            })) : (list = React.createElement("div", {
                className: "list-loading-whole"
            }, React.createElement("div", {
                className: "list-loading"
            })),
            this.loadData()),
            list
        }
        ,
        AssetAutoInvest.prototype.handleGoToDetail = function(link, e) {
            $(e.target).hasClass("stay-current-page") || (location.href = link)
        }
        ,
        AssetAutoInvest.prototype.render = function() {
            var list = null;
            return this.props.autoInvestSelected && (list = this.renderList()),
            React.createElement("div", {
                className: "p2p-account-autoinvest-tab-content"
            }, list)
        }
        ,
        AssetAutoInvest
    }(React.Component);
    module.exports = AssetAutoInvest
});
;/*!/client/widget/account/p2p/wdg-tab-loan-batch-transfer-out-dialog/wdg-tab-loan-batch-transfer-out-dialog.js*/
define("user:widget/account/p2p/wdg-tab-loan-batch-transfer-out-dialog/wdg-tab-loan-batch-transfer-out-dialog.js", function(require, exports, module) {
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
      , RForm = require("common:widget/react-ui/RForm/RForm")
      , utils = require("common:widget/ui/utils/utils")
      , AssetsLoanTransferOut = (require("common:widget/react-ui/RWETooltip/RWETooltip"),
    function(_React$Component) {
        function AssetsLoanTransferOut(props) {
            _classCallCheck(this, AssetsLoanTransferOut),
            _React$Component.call(this, props),
            this.state = {
                checked: !1,
                disabled: !1,
                errMsg: "",
                transferFee: 0,
                summary: 0,
                lenderIds: "",
                shares: "",
                loanId: ""
            },
            this.doSubmit = this.doSubmit.bind(this)
        }
        return _inherits(AssetsLoanTransferOut, _React$Component),
        AssetsLoanTransferOut.prototype.doSubmit = function(e) {
            var state = this.state;
            return state.checked ? void (state.disabled || e.target.submit()) : void this.errorText("转让前请阅读并同意协议")
        }
        ,
        AssetsLoanTransferOut.prototype.checkAgree = function() {
            var agree = !this.state.checked;
            this.setState({
                checked: agree
            }),
            agree ? this.setState({
                disabled: !1,
                errMsg: ""
            }) : this.errorText("转让前请阅读并同意协议")
        }
        ,
        AssetsLoanTransferOut.prototype.errorText = function(text) {
            this.setState({
                disabled: !0,
                errMsg: text
            })
        }
        ,
        AssetsLoanTransferOut.prototype.update = function(item) {
            this.setState({
                disabled: !1,
                errMsg: ""
            });
            var discount = 1
              , price = discount * item.value
              , fee = price * item.fee;
            this.setState({
                transferFee: utils.fixFloat2(fee),
                summary: utils.fixFloat2(price - fee),
                lenderIds: item.lenderIds,
                shares: item.shares,
                loanId: item.loanId
            })
        }
        ,
        AssetsLoanTransferOut.prototype.componentDidMount = function() {
            var props = this.props
              , batch = props.batchTransferOutProps
              , ids = []
              , shares = []
              , loanIds = []
              , fee = null
              , items = batch._items;
            Object.keys(items).forEach(function(k) {
                var _item = items[k];
                _item.lenderId && _item.availableShares && (ids.push(_item.lenderId),
                loanIds.push(_item.loanId),
                shares.push(_item.availableShares),
                fee || (fee = _item.fee || .01))
            });
            var ret = {
                count: batch._count,
                value: batch._value,
                lenderIds: ids.join(","),
                shares: shares.join(","),
                fee: fee,
                loanId: loanIds[0]
            };
            ret.summary = utils.fixFloat2(ret.value - ret.fee),
            ret.value = utils.fixFloat2(ret.value),
            this.update(ret)
        }
        ,
        AssetsLoanTransferOut.prototype.render = function() {
            var props = this.props
              , state = this.state
              , batch = props.batchTransferOutProps
              , dialogProps = {
                showing: !0,
                title: "批量债权转出",
                dialog: {
                    className: "user-account-p2p-dialog",
                    style: {
                        width: 700
                    }
                },
                onRequestClose: props.onRequestBatchTransferOutClose
            }
              , formProps = {
                action: "/user/account/p2p/transferOut",
                method: "POST"
            }
              , submitClass = "j-btn  j-btn-super-big j-btn-orange";
            state.disabled && (submitClass = "j-btn  j-btn-super-big j-btn-disabled");
            var contractUrl = "/p2p/contract/transfer?loanId=" + state.loanId;
            return React.createElement(RDialog, dialogProps, React.createElement("div", {
                className: "user-account-p2p-body user-account-p2p-body-transfer-out"
            }, React.createElement(RForm, _extends({}, formProps, {
                onSubmit: this.doSubmit
            }), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("div", {
                className: "label"
            }, "共转让债权"), React.createElement("div", {
                className: "value"
            }, batch._count, "笔")), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("div", {
                className: "label"
            }, "总价值"), React.createElement("div", {
                className: "value"
            }, utils.fixFloat2(batch._value), "元")), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("div", {
                className: "label"
            }, "总价格"), React.createElement("div", {
                className: "value"
            }, utils.fixFloat2(batch._value), "元")), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("div", {
                className: "label"
            }, "转让费用"), React.createElement("div", {
                className: "value"
            }, state.transferFee, "元")), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("div", {
                className: "label"
            }, "预计收入总金额"), React.createElement("div", {
                className: "value"
            }, state.summary, "元")), React.createElement("input", {
                type: "hidden",
                name: "disCount",
                value: "1.0"
            }), React.createElement("input", {
                type: "hidden",
                name: "lenderId",
                value: state.lenderIds
            }), React.createElement("input", {
                type: "hidden",
                name: "share",
                value: state.shares
            }), React.createElement("div", {
                className: "info-item"
            }, React.createElement("div", {
                className: "transfer-agreement"
            }, React.createElement("div", {
                className: this.state.checked ? "check-bug j-checked" : "check-bug"
            }, React.createElement("span", {
                className: "check-img",
                onClick: this.checkAgree.bind(this)
            }), React.createElement("span", null, "我已阅读并同意签署", React.createElement("a", {
                className: "more-than",
                href: contractUrl,
                target: "_blank"
            }, "《债权转让及受让协议》"))))), React.createElement("div", {
                className: "error-text"
            }, state.errMsg), React.createElement("div", {
                className: "ui-confirm-submit-box  mt10 text-center"
            }, React.createElement("input", {
                type: "submit",
                className: submitClass,
                value: "确定"
            })))))
        }
        ,
        AssetsLoanTransferOut
    }(React.Component));
    module.exports = AssetsLoanTransferOut
});
;/*!/client/widget/account/p2p/wdg-tab-loan-cancel-transfer-dialog/wdg-tab-loan-cancel-transfer-dialog.js*/
define("user:widget/account/p2p/wdg-tab-loan-cancel-transfer-dialog/wdg-tab-loan-cancel-transfer-dialog.js", function(require, exports, module) {
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
      , RForm = require("common:widget/react-ui/RForm/RForm")
      , AssetsLoanTransferringCancel = (require("common:widget/ui/utils/utils"),
    function(_React$Component) {
        function AssetsLoanTransferringCancel(props) {
            _classCallCheck(this, AssetsLoanTransferringCancel),
            _React$Component.call(this, props),
            this.doCancel = this.doCancel.bind(this)
        }
        return _inherits(AssetsLoanTransferringCancel, _React$Component),
        AssetsLoanTransferringCancel.prototype.doCancel = function(e) {
            e.target.submit()
        }
        ,
        AssetsLoanTransferringCancel.prototype.render = function() {
            var props = this.props
              , dialogProps = (this.state,
            {
                showing: !0,
                title: "撤销债权转让",
                dialog: {
                    className: "user-account-p2p-dialog",
                    style: {
                        width: 700
                    }
                },
                onRequestClose: props.onRequestTransferringCancelClose
            })
              , formProps = {
                action: "/user/account/p2p/cancelTransferring",
                method: "POST"
            };
            return React.createElement(RDialog, dialogProps, React.createElement("div", {
                className: "user-account-p2p-body"
            }, React.createElement(RForm, _extends({}, formProps, {
                onSubmit: this.doCancel
            }), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "ID"), React.createElement("span", {
                className: "value orange-highlight"
            }, props.cancelProps.transferId)), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "债权价值"), React.createElement("span", {
                className: "value orange-highlight"
            }, props.cancelProps.totalPrice, "元")), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "转让系数"), React.createElement("span", {
                className: "value orange-highlight"
            }, props.cancelProps.discountRatio, "%")), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "转让价格"), React.createElement("span", {
                className: "value orange-highlight"
            }, props.cancelProps.totalAmount, "元")), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "转让费用"), React.createElement("span", {
                className: "value orange-highlight"
            }, props.cancelProps.fee, "元")), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "转让后预期收入"), React.createElement("span", {
                className: "value orange-highlight"
            }, props.cancelProps.summary, "元")), React.createElement("input", {
                type: "hidden",
                name: "transferId",
                value: props.cancelProps.transferId
            }), React.createElement("div", {
                className: "ui-confirm-submit-box  mt30 text-center"
            }, React.createElement("input", {
                type: "submit",
                className: "j-btn  j-btn-super-big j-btn-orange",
                value: "撤销"
            })))))
        }
        ,
        AssetsLoanTransferringCancel
    }(React.Component));
    module.exports = AssetsLoanTransferringCancel
});
;/*!/client/widget/account/p2p/wdg-tab-loan-holding-item/wdg-tab-loan-holding-item.jsx*/
define("user:widget/account/p2p/wdg-tab-loan-holding-item/wdg-tab-loan-holding-item.jsx", function(require, exports, module) {
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
      , utils = require("common:widget/ui/utils/utils")
      , p2pUtil = utils.p2pUtil
      , RWETooltip = require("common:widget/react-ui/RWETooltip/RWETooltip")
      , service = require("common:widget/ui/service/service-factory")
      , p2pService = service.getService("p2p")
      , AssetsLoanHoldingItem = function(_React$Component) {
        function AssetsLoanHoldingItem(props) {
            _classCallCheck(this, AssetsLoanHoldingItem),
            _React$Component.call(this, props),
            this.state = {
                showingBorrowerInfo: !1,
                showDetailContent: !1,
                holdingTransferInData: null
            }
        }
        return _inherits(AssetsLoanHoldingItem, _React$Component),
        AssetsLoanHoldingItem.prototype.handleToggleCheckBox = function(e, item) {
            var $ele = $(e.target);
            $ele.hasClass("icon-we-checkbox") ? ($ele.removeClass("icon-we-checkbox").addClass("icon-we-checkbox-active"),
            this.props.handleTheLoan(item, "add")) : ($ele.removeClass("icon-we-checkbox-active").addClass("icon-we-checkbox"),
            this.props.handleTheLoan(item, "remove"))
        }
        ,
        AssetsLoanHoldingItem.prototype.handleTransferOut = function(item) {
            this.props.handleTransferOutSingleLoan(item)
        }
        ,
        AssetsLoanHoldingItem.prototype.handleShowDetailContent = function(txt, ele) {
            var that = this
              , srcEle = $(ele.target)
              , state = this.state;
            "aTarget" == txt && (srcEle = srcEle.next()),
            srcEle.attr({
                "class": srcEle.hasClass("icon-we-down") ? "icon-we-up stay-current-page" : "icon-we-down stay-current-page"
            }),
            that.setState({
                showDetailContent: !state.showDetailContent
            })
        }
        ,
        AssetsLoanHoldingItem.prototype.handleOpenBorrowerInfo = function(loanId) {
            var props = this.props;
            $.ajax({
                url: "/user/account/p2p/getLoanBorrowerInfo",
                type: "get",
                data: {
                    loanId: loanId
                },
                dataType: "json",
                success: function(rsp) {
                    0 == rsp.status && props.handleBorrowerInfo(!0, rsp.data)
                }
                .bind(this),
                error: function(e) {
                    props.showMessageTip(e)
                }
            })
        }
        ,
        AssetsLoanHoldingItem.prototype.onlyShowLenderDetail = function(item) {
            var contractLink = "/p2p/contract/loan?type=user&loanId=" + item.loanId;
            return React.createElement("div", {
                className: "p2p-account-transfer-detail-whole"
            }, React.createElement("dl", {
                className: "fn-clear no-line"
            }, React.createElement("dd", {
                className: "w100"
            }, React.createElement("a", {
                href: contractLink
            }, "合同")), React.createElement("dd", {
                className: "w200"
            }, React.createElement("a", {
                href: "javascript:",
                onClick: this.handleOpenBorrowerInfo.bind(this, item.loanId)
            }, "借款人信息"))))
        }
        ,
        AssetsLoanHoldingItem.prototype.loadTransferInData = function(loanId) {
            var _this = this
              , paramData = {
                loanId: loanId,
                limit: 1e4
            };
            p2pService.getUserLoanTransferInList(paramData).then(function(out) {
                if (out.requestStatus !== p2pService.STATUS.ERROR) {
                    var rsp = out.data;
                    _this.setState({
                        holdingTransferInData: rsp
                    })
                }
            })
        }
        ,
        AssetsLoanHoldingItem.prototype.createHoldingTransferInHead = function() {
            return React.createElement("dl", {
                className: "fn-clear p2p-account-transfer-detail-header"
            }, React.createElement("dd", {
                className: "w200"
            }, "转入时债权价值"), React.createElement("dd", {
                className: "w180"
            }, "剩余期数"), React.createElement("dd", {
                className: "w180"
            }, "转让价格"), React.createElement("dd", {
                className: "w180"
            }, "盈亏"), React.createElement("dd", {
                className: "w190"
            }, "转入时间"), React.createElement("dd", {
                className: "w85"
            }, " "))
        }
        ,
        AssetsLoanHoldingItem.prototype.createHoldingTransferInRow = function(item) {
            var contractLink = "/p2p/contract/transfer?transferId=" + item.logId
              , amount = utils.commaFloat(item.pricePerShare * item.share);
            return React.createElement("dl", {
                className: "fn-clear"
            }, React.createElement("dd", {
                className: "w200"
            }, amount, "元"), React.createElement("dd", {
                className: "w180"
            }, item.leftPhaseCount, "个月"), React.createElement("dd", {
                className: "w180"
            }, utils.commaFloat(item.pricePerShare * item.share), "元"), React.createElement("dd", {
                className: "w180"
            }, utils.commaFloat(item.profit), "元"), React.createElement("dd", {
                className: "w190"
            }, utils.getDateTime(item.tranfsferDate, "date")), React.createElement("dd", {
                className: "w85 text-center"
            }, React.createElement("a", {
                href: contractLink,
                target: "_blank"
            }, "合同")))
        }
        ,
        AssetsLoanHoldingItem.prototype.renderHoldingTransferInList = function(loanId) {
            var state = this.state
              , data = state.holdingTransferInData
              , list = null;
            if (data) {
                var ajaxParams = {
                    loanId: loanId
                };
                list = React.createElement(List, _extends({}, data, {
                    moudleServiceName: "p2p",
                    url: "getUserLoanTransferInList",
                    ajaxParams: ajaxParams,
                    isHeadNeed: "yes",
                    isHeadNeedOrder: "no",
                    createHeadDom: this.createHoldingTransferInHead,
                    createRowDom: this.createHoldingTransferInRow.bind(this),
                    noDataText: "没有债权转入记录",
                    startNum: 0,
                    limit: 1e4,
                    offset: 5
                }))
            } else
                list = React.createElement("div", {
                    className: "list-loading-whole"
                }, React.createElement("div", {
                    className: "list-loading"
                })),
                this.loadTransferInData(loanId);
            return React.createElement("div", {
                className: "p2p-account-transfer-detail-whole w1020"
            }, list)
        }
        ,
        AssetsLoanHoldingItem.prototype.handleGoToDetail = function(link, e) {
            $(e.target).hasClass("stay-current-page") || (location.href = link)
        }
        ,
        AssetsLoanHoldingItem.prototype.render = function() {
            var _this2 = this
              , _props = this.props
              , item = _props.item
              , index = _props.index
              , showMonthlyRepay = _props.showMonthlyRepay
              , showCheckbox = _props.showCheckbox
              , selectedAll = _props.selectedAll
              , state = this.state
              , dlClassName = "p2p-account-table-row fn-clear";
            index % 2 == 0 && (dlClassName += " light-black");
            var checkboxFiled = null;
            if ("0" == item.isTransferable && showCheckbox) {
                var checkBoxClass = selectedAll ? "checkbox stay-current-page icon-we-checkbox-active" : "checkbox stay-current-page icon-we-checkbox";
                checkboxFiled = React.createElement("span", {
                    className: checkBoxClass,
                    title: "",
                    onClick: function(e) {
                        _this2.handleToggleCheckBox(e, item)
                    }
                })
            }
            var loanType = item.displayLoanType
              , loanTypeName = p2pUtil.loanAllType(loanType)[1]
              , loanTypeTitle = p2pUtil.loanAllType(loanType)[0]
              , loanLink = "/loan-" + item.loanId + ".html"
              , tooltipProps_recovery_amount = {
                id: "user-loan-tooltip-recovery-amount" + item.loanId,
                place: "right",
                tip: "待收本金 " + utils.commaFloat(item.recoveryPrincipal) + "元<br>待收利息 " + utils.commaFloat(item.recoveryInterest) + "元",
                delayHide: 100
            }
              , monthlyRepayTip = null;
            if (item.xxhbMonth) {
                var tooltipProps_monthly_repay = {
                    id: "user-loan-tooltip-monthly-repay" + item.loanId,
                    place: "right",
                    tip: item.xxhbMonth + "个月先息后本阶段，月收利息：" + utils.commaFloat(item.xxhbMonthlyRepay) + "元<br>" + item.debxMonth + "个月等额本息阶段，月收本息：" + item.debxMonthlyRepay + "元",
                    delayHide: 100
                };
                monthlyRepayTip = React.createElement(RWETooltip, tooltipProps_monthly_repay)
            }
            var group = null;
            if (showMonthlyRepay)
                group = React.createElement("dd", {
                    className: "pl20 w130"
                }, utils.commaFloat(item.monthlyRepay), "元 ", monthlyRepayTip);
            else {
                var pricePerShare = item.loanVo.pricePerShare ? item.loanVo.pricePerShare + "元/份" : " ";
                group = React.createElement("dd", {
                    className: "pl20 w130"
                }, pricePerShare, " ")
            }
            var nextRepayDate = item.nextRepayDate ? utils.formatYearMonthDate(new Date(item.nextRepayDate)) : "--"
              , statusClassName = "text-center w70";
            "逾期" == p2pUtil.loanStatus(item.status) && (statusClassName = "text-center font-red w70");
            var contractLink = "/p2p/contract/loan?type=user&loanId=" + item.loanId
              , transferStatus = React.createElement("span", {
                className: "font-gray"
            }, "转让");
            "0" == item.isTransferable && (transferStatus = React.createElement("a", {
                className: "hover-btn stay-current-page",
                title: "",
                href: "javascript:",
                onClick: function() {
                    _this2.handleTransferOut(item)
                }
            }, "转让"));
            var showLender = "OVER_DUE" === item.status || "BAD_DEBT" === item.status
              , onlyIndirect = item.indirect && !showLender
              , onlyShowLender = !item.indirect && showLender
              , noShowDetail = !item.indirect && !showLender
              , indirectShowLender = item.indirect && showLender
              , detailFiled = React.createElement("dd", {
                className: "pl20 font-blue w80"
            }, "--");
            noShowDetail || (detailFiled = React.createElement("dd", {
                className: "pl20 font-blue w80"
            }, React.createElement("a", {
                className: "stay-current-page",
                title: "",
                href: "javascript:",
                onClick: this.handleShowDetailContent.bind(this, "aTarget")
            }, "明细"), React.createElement("em", {
                className: "icon-we-down stay-current-page",
                title: "",
                onClick: this.handleShowDetailContent.bind(this, "")
            })));
            var detailContent = null;
            return onlyShowLender && state.showDetailContent && (detailContent = this.onlyShowLenderDetail(item)),
            onlyIndirect && state.showDetailContent && (detailContent = this.renderHoldingTransferInList(item.loanId)),
            indirectShowLender && state.showDetailContent && (detailContent = React.createElement("div", null, this.onlyShowLenderDetail(item), this.renderHoldingTransferInList(item.loanId))),
            React.createElement("div", null, React.createElement("dl", {
                className: dlClassName,
                onClick: function(e) {
                    return _this2.handleGoToDetail(loanLink, e)
                },
                title: "点击查看详情"
            }, React.createElement("dd", {
                className: "pl20 w50 no-line"
            }, checkboxFiled, " "), React.createElement("dd", {
                className: "w130"
            }, React.createElement("em", {
                className: "ui-loantype",
                title: loanTypeTitle
            }, loanTypeName), item.loanId), React.createElement("dd", {
                className: "pl20 w100"
            }, utils.fixFloat2(item.interest), "%"), React.createElement("dd", {
                className: "text-center w95"
            }, item.leftPhases, "/", item.mouths, "期"), React.createElement("dd", {
                className: "pl20 w145"
            }, utils.commaFloat(item.recoveryAmount), "元 ", React.createElement(RWETooltip, tooltipProps_recovery_amount)), group, React.createElement("dd", {
                className: "text-center w105"
            }, nextRepayDate), React.createElement("dd", {
                className: statusClassName
            }, item.transferShare > 0 ? "转让中" : p2pUtil.loanStatus(item.status)), React.createElement("dd", {
                className: "text-center font-blue w80"
            }, React.createElement("a", {
                className: "stay-current-page",
                title: "",
                href: contractLink,
                target: "_blank"
            }, "合同")), detailFiled, React.createElement("dd", {
                className: "text-center last font-orange w95"
            }, transferStatus)), detailContent)
        }
        ,
        AssetsLoanHoldingItem
    }(React.Component);
    module.exports = AssetsLoanHoldingItem
});
;/*!/client/widget/account/p2p/wdg-tab-loan-repaid-item/wdg-tab-loan-repaid-item.jsx*/
define("user:widget/account/p2p/wdg-tab-loan-repaid-item/wdg-tab-loan-repaid-item.jsx", function(require, exports, module) {
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
      , utils = require("common:widget/ui/utils/utils")
      , p2pUtil = utils.p2pUtil
      , service = (require("common:widget/react-ui/RWETooltip/RWETooltip"),
    require("common:widget/ui/service/service-factory"))
      , p2pService = service.getService("p2p")
      , AssetsLoanRepaidItem = function(_React$Component) {
        function AssetsLoanRepaidItem(props) {
            _classCallCheck(this, AssetsLoanRepaidItem),
            _React$Component.call(this, props),
            this.state = {
                showingBorrowerInfo: !1,
                showDetailContent: !1,
                repaidTransferInData: null
            }
        }
        return _inherits(AssetsLoanRepaidItem, _React$Component),
        AssetsLoanRepaidItem.prototype.handleShowDetailContent = function(txt, ele) {
            var srcEle = $(ele.target)
              , state = this.state;
            "aTarget" == txt && (srcEle = srcEle.next()),
            srcEle.attr({
                "class": srcEle.hasClass("icon-we-down") ? "icon-we-up stay-current-page" : "icon-we-down stay-current-page"
            }),
            this.setState({
                showDetailContent: !state.showDetailContent
            })
        }
        ,
        AssetsLoanRepaidItem.prototype.createRepaidTransferInHead = function() {
            return React.createElement("dl", {
                className: "fn-clear p2p-account-transfer-detail-header"
            }, React.createElement("dd", {
                className: "w140"
            }, "受让人"), React.createElement("dd", {
                className: "w140"
            }, "转出时债权价值"), React.createElement("dd", {
                className: "w140"
            }, "转让价格"), React.createElement("dd", {
                className: "w140"
            }, "交易费用"), React.createElement("dd", {
                className: "w140"
            }, "实际收入"), React.createElement("dd", {
                className: "w140"
            }, "盈亏"), React.createElement("dd", {
                className: "w120"
            }, "成交时间"), React.createElement("dd", {
                className: "w100"
            }, " "))
        }
        ,
        AssetsLoanRepaidItem.prototype.createRepaidTransferInRow = function(item) {
            var contractLink = "/p2p/contract/transfer?transferId=" + item.logId
              , flag = null;
            if ("FINANCEPLAN_BID" == item.lenderType) {
                var planLink = "/uplan-" + item.financePlanId + ".html";
                flag = React.createElement("a", {
                    href: planLink,
                    target: "_blank"
                }, "理", item.financePlanId)
            }
            if ("AUTOINVESTPLAN_BID" == item.lenderType) {
                var planLink = "/autoinvest/product/" + item.financePlanId;
                flag = React.createElement("a", {
                    href: planLink,
                    target: "_blank"
                }, "薪")
            }
            var userLink = "/user/profile/profile?userId=" + item.buyerId
              , amount = utils.fixFloat2(item.pricePerShare * item.share)
              , totalPrice = utils.fixFloat2(item.price * item.share)
              , totalFee = utils.fixFloat2(item.fee);
            return React.createElement("dl", {
                className: "fn-clear"
            }, React.createElement("dd", {
                className: "w140"
            }, React.createElement("a", {
                href: userLink
            }, item.toNickName.length > 10 ? item.toNickName.substr(0, 10) + "..." : item.toNickName), flag ? flag : null), React.createElement("dd", {
                className: "w140"
            }, utils.commaFloat(amount), "元"), React.createElement("dd", {
                className: "w140"
            }, utils.commaFloat(totalPrice), "元"), React.createElement("dd", {
                className: "w140"
            }, utils.commaFloat(totalFee), "元"), React.createElement("dd", {
                className: "w140"
            }, utils.commaFloat(item.income), "元"), React.createElement("dd", {
                className: "w140"
            }, utils.commaFloat(item.profit), "元"), React.createElement("dd", {
                className: "w120"
            }, item.tranfsferDate ? utils.getDateTime(item.tranfsferDate, "date") : "", " "), React.createElement("dd", {
                className: "w100"
            }, React.createElement("a", {
                className: "pl-20",
                href: contractLink,
                target: "_blank"
            }, "合同")))
        }
        ,
        AssetsLoanRepaidItem.prototype.loadRepaidTransferData = function(loanId) {
            var _this = this
              , paramData = {
                loanId: loanId,
                limit: 1e4
            };
            p2pService.getUserLoanTransferOutList(paramData).then(function(out) {
                if (out.requestStatus !== p2pService.STATUS.ERROR) {
                    var rsp = out.data;
                    _this.setState({
                        repaidTransferInData: rsp
                    })
                }
            })
        }
        ,
        AssetsLoanRepaidItem.prototype.renderRepaidTransferDetail = function(loanId) {
            var state = this.state
              , data = state.repaidTransferInData
              , list = null;
            if (data) {
                var ajaxParams = {
                    loanId: loanId
                };
                list = React.createElement(List, _extends({}, data, {
                    moudleServiceName: "p2p",
                    url: "getUserLoanTransferOutList",
                    ajaxParams: ajaxParams,
                    isHeadNeed: "yes",
                    isHeadNeedOrder: "no",
                    createHeadDom: this.createRepaidTransferInHead,
                    createRowDom: this.createRepaidTransferInRow.bind(this),
                    noDataText: "没有债权转出记录",
                    startNum: 0,
                    limit: 1e4,
                    offset: 5
                }))
            } else
                list = React.createElement("div", {
                    className: "list-loading-whole"
                }, React.createElement("div", {
                    className: "list-loading"
                })),
                this.loadRepaidTransferData(loanId);
            return React.createElement("div", {
                className: "p2p-account-transfer-detail-whole w1060 pl20"
            }, list)
        }
        ,
        AssetsLoanRepaidItem.prototype.handleGoToDetail = function(link, e) {
            $(e.target).hasClass("stay-current-page") || (location.href = link)
        }
        ,
        AssetsLoanRepaidItem.prototype.render = function() {
            var _this2 = this
              , _props = this.props
              , item = _props.item
              , index = _props.index
              , state = this.state
              , dlClassName = "p2p-account-table-row fn-clear";
            index % 2 == 0 && (dlClassName += " light-black");
            var loanType = item.displayLoanType
              , loanTypeName = p2pUtil.loanAllType(loanType)[1]
              , loanTypeTitle = p2pUtil.loanAllType(loanType)[0]
              , loanLink = "/loan-" + item.loanId + ".html"
              , clearType = void 0;
            clearType = "transfer" == item.finishType ? "债权转让" : "in_repay" == item.finishType ? "提前结清 " : p2pUtil.loanRepaidStatus(item.finishType);
            var transfer = "transfer" == item.finishType
              , contractLink = "/p2p/contract/loan?type=user&loanId=" + item.loanId
              , statusDom = transfer ? React.createElement("dd", {
                className: "pl20 font-blue last w100"
            }, React.createElement("a", {
                className: "stay-current-page",
                title: "",
                href: "javascript:",
                onClick: this.handleShowDetailContent.bind(this, "aTarget")
            }, "明细"), React.createElement("em", {
                className: "icon-we-down stay-current-page",
                title: "",
                onClick: this.handleShowDetailContent.bind(this, "")
            })) : React.createElement("dd", {
                className: "pl20 font-blue last w100"
            }, React.createElement("a", {
                className: "stay-current-page",
                title: "",
                href: contractLink,
                target: "_blank"
            }, "合同"))
              , detailContent = null;
            return transfer && state.showDetailContent && (detailContent = this.renderRepaidTransferDetail(item.loanId)),
            React.createElement("div", null, React.createElement("dl", {
                className: dlClassName,
                onClick: function(e) {
                    return _this2.handleGoToDetail(loanLink, e)
                },
                title: "点击查看详情"
            }, React.createElement("dd", {
                className: "pl20 w160"
            }, React.createElement("em", {
                className: "ui-loantype",
                title: loanTypeTitle
            }, loanTypeName), item.loanId), React.createElement("dd", {
                className: "pl20 w130"
            }, utils.commaFloat(item.amount), "元"), React.createElement("dd", {
                className: "pl20 w130"
            }, utils.commaFloat(item.interest), "%"), React.createElement("dd", {
                className: "pl20 w130"
            }, utils.commaFloat(item.repayMoney), "元"), React.createElement("dd", {
                className: "pl20 w130"
            }, utils.commaFloat(item.earnMoney), "元"), React.createElement("dd", {
                className: "pl20 w160"
            }, item.finishDate ? utils.getDateTime(item.finishDate, "date") : "", " "), React.createElement("dd", {
                className: "pl20 w140"
            }, clearType, " "), statusDom), detailContent)
        }
        ,
        AssetsLoanRepaidItem
    }(React.Component);
    module.exports = AssetsLoanRepaidItem
});
;/*!/client/widget/account/p2p/wdg-tab-loan-transfer-out-dialog/wdg-tab-loan-transfer-out-dialog.js*/
define("user:widget/account/p2p/wdg-tab-loan-transfer-out-dialog/wdg-tab-loan-transfer-out-dialog.js", function(require, exports, module) {
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
      , RForm = require("common:widget/react-ui/RForm/RForm")
      , utils = require("common:widget/ui/utils/utils")
      , RWETooltip = require("common:widget/react-ui/RWETooltip/RWETooltip")
      , agree = !0
      , AssetsLoanTransferOut = function(_React$Component) {
        function AssetsLoanTransferOut(props) {
            _classCallCheck(this, AssetsLoanTransferOut),
            _React$Component.call(this, props),
            this.state = {
                checked: !1,
                availableShares: props.availableShares,
                value: props.value,
                transferFee: 0,
                summary: props.summary,
                disabled: !1,
                errMsg: ""
            },
            this.doSubmit = this.doSubmit.bind(this),
            this.transferOutClose = this.transferOutClose.bind(this)
        }
        return _inherits(AssetsLoanTransferOut, _React$Component),
        AssetsLoanTransferOut.prototype.checkAgree = function() {
            agree = !this.state.checked,
            this.setState({
                checked: agree
            }),
            this.update(this.state.availableShares)
        }
        ,
        AssetsLoanTransferOut.prototype.doSubmit = function(e) {
            var state = this.state;
            return state.checked ? void (state.disabled || e.target.submit()) : void this.errorText("转让前请阅读并同意协议")
        }
        ,
        AssetsLoanTransferOut.prototype.errorText = function(text) {
            this.setState({
                disabled: !0,
                errMsg: text
            })
        }
        ,
        AssetsLoanTransferOut.prototype.handleShareInput = function(e) {
            var value = $(e.target).val();
            if (!isNaN(value)) {
                var newValue = parseInt(value) || "";
                this.setState({
                    availableShares: newValue
                }),
                this.update(newValue)
            }
        }
        ,
        AssetsLoanTransferOut.prototype.update = function(share) {
            var props = this.props;
            this.setState({
                disabled: !1,
                errMsg: ""
            }),
            agree || this.errorText("转让前请阅读并同意协议"),
            0 == share || "" == share ? (this.errorText("请输入正确的份数"),
            share = 0) : share > props.availableShares && (this.errorText("转让份数不能多于" + props.availableShares + "份"),
            share = 0);
            var discount = 1
              , toTransferShares = parseInt(share, 10)
              , pps = (props.availableShares,
            props.interestPerShare)
              , ppsn = props.principalPerShare
              , interest = props.interest
              , pricePerShare = pps - parseFloat(utils.fixFloat2(ppsn * (1 - discount)), 10)
              , price = pricePerShare * toTransferShares
              , fee = pricePerShare * (1 + interest / 100 / 12) * props.fee * toTransferShares;
            fee = Math.floor(100 * fee) / 100,
            this.setState({
                value: utils.fixFloat2(price),
                transferFee: utils.fixFloat2(fee),
                summary: utils.fixFloat2(price - fee)
            })
        }
        ,
        AssetsLoanTransferOut.prototype.componentDidMount = function() {
            this.update(this.state.availableShares)
        }
        ,
        AssetsLoanTransferOut.prototype.transferOutClose = function() {
            var props = this.props;
            agree = !0,
            props.onRequestTransferOutClose()
        }
        ,
        AssetsLoanTransferOut.prototype.render = function() {
            var props = this.props
              , state = this.state
              , dialogProps = {
                showing: !0,
                title: "债权转出",
                dialog: {
                    className: "user-account-p2p-dialog",
                    style: {
                        width: 700
                    }
                },
                onRequestClose: this.transferOutClose
            }
              , formProps = {
                action: "/user/account/p2p/transferOut",
                method: "POST"
            }
              , submitClass = "j-btn  j-btn-super-big j-btn-orange";
            state.disabled && (submitClass = "j-btn  j-btn-super-big j-btn-disabled");
            var tooltipProps_loan_value_per_share = {
                id: "user-loan-tooltip-loan-value-per-share",
                place: "right",
                tip: '一般为转让时的待回收本金与应计利息之和。<a target="_blank" href="https://www.renrendai.com/help/investment/58734407a4a7b30e4b8cff2e">查看详情</a>',
                delayHide: 1e3
            }
              , tooltipProps_loan_transfer_fee = {
                id: "user-loan-tooltip-loan-transfer-fee",
                place: "right",
                tip: "由于债权价值会发生变动，转让费用以债权成交时实际收取费用为准。",
                delayHide: 100
            }
              , tooltipProps_loan_summary = {
                id: "user-loan-tooltip-loan-summary",
                place: "right",
                tip: '由于债权价值会发生变动，最终收入金额可能发生变动。<a target="_blank" href="https://www.renrendai.com/help/investment/58734407a4a7b30e4b8cff2e">查看详情</a>',
                delayHide: 1e3
            }
              , contractUrl = "/p2p/contract/transfer?loanId=" + props.loanId
              , totalValuePerShare = utils.fixFloat2(props.availableShares * props.valuePerShare)
              , totalRepaymentsPerShare = utils.fixFloat2(props.availableShares * props.repaymentsPerShare);
            return React.createElement(RDialog, dialogProps, React.createElement("div", {
                className: "user-account-p2p-body"
            }, React.createElement(RForm, _extends({}, formProps, {
                onSubmit: this.doSubmit
            }), React.createElement("ul", {
                className: "info-item-line fn-clear"
            }, React.createElement("li", {
                className: "w194"
            }, React.createElement("div", {
                className: "info-item-value"
            }, props.termsLeft, "个月"), React.createElement("div", {
                className: "info-item-name"
            }, "剩余期数")), React.createElement("li", {
                className: "w220"
            }, React.createElement("div", {
                className: "info-item-value"
            }, utils.commaFloat(totalValuePerShare), "元"), React.createElement("div", {
                className: "info-item-name"
            }, "当前债权价值 ", React.createElement(RWETooltip, tooltipProps_loan_value_per_share))), React.createElement("li", {
                className: "w185"
            }, React.createElement("div", {
                className: "info-item-value"
            }, utils.commaFloat(totalRepaymentsPerShare), "元"), React.createElement("div", {
                className: "info-item-name"
            }, "当前待收本息"))), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "债权ID"), React.createElement("span", {
                className: "value"
            }, props.loanId)), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "转让价格"), React.createElement("span", {
                className: "value"
            }, utils.commaFloat(totalValuePerShare), "元")), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "预估转让费用"), React.createElement("div", {
                className: "value"
            }, utils.commaFloat(state.transferFee), "元 ", React.createElement(RWETooltip, tooltipProps_loan_transfer_fee))), React.createElement("div", {
                className: "info-item fn-clear"
            }, React.createElement("span", {
                className: "label"
            }, "预计收入"), React.createElement("span", {
                className: "value"
            }, utils.commaFloat(state.summary), " ", React.createElement(RWETooltip, tooltipProps_loan_summary))), React.createElement("div", {
                className: "info-item"
            }, React.createElement("div", {
                className: "transfer-agreement"
            }, React.createElement("div", {
                className: this.state.checked ? "check-bug j-checked" : "check-bug"
            }, React.createElement("span", {
                className: "check-img",
                onClick: this.checkAgree.bind(this)
            }), React.createElement("span", null, "我已阅读并同意签署", React.createElement("a", {
                className: "more-than",
                href: contractUrl,
                target: "_blank"
            }, "《债权转让及受让协议》"))))), React.createElement("input", {
                type: "hidden",
                name: "disCount",
                value: "1.0"
            }), React.createElement("input", {
                type: "hidden",
                name: "lenderId",
                value: props.lenderId
            }), React.createElement("input", {
                type: "hidden",
                name: "share",
                value: props.availableShares
            }), React.createElement("div", {
                className: "error-text"
            }, state.errMsg), React.createElement("div", {
                className: "ui-confirm-submit-box  mt10 text-center"
            }, React.createElement("input", {
                type: "submit",
                className: submitClass,
                value: "确定"
            })))))
        }
        ,
        AssetsLoanTransferOut
    }(React.Component);
    module.exports = AssetsLoanTransferOut
});
;/*!/client/widget/account/p2p/wdg-tab-loan/wdg-tab-loan.jsx*/
define("user:widget/account/p2p/wdg-tab-loan/wdg-tab-loan.jsx", function(require, exports, module) {
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
      , List = require("common:widget/react-ui/RList/ListV2.0")
      , service = require("common:widget/ui/service/service-factory")
      , p2pService = service.getService("p2p")
      , utils = require("common:widget/ui/utils/utils")
      , p2pUtil = utils.p2pUtil
      , RWeDialog = require("common:widget/react-ui/RWeDialog/RWeDialog")
      , RWeStatusDialog = require("common:widget/react-ui/RWeStatusDialog/RWeStatusDialog")
      , HoldingItem = require("user:widget/account/p2p/wdg-tab-loan-holding-item/wdg-tab-loan-holding-item.jsx")
      , RepaidItem = require("user:widget/account/p2p/wdg-tab-loan-repaid-item/wdg-tab-loan-repaid-item.jsx")
      , TransferringCancel = require("user:widget/account/p2p/wdg-tab-loan-cancel-transfer-dialog/wdg-tab-loan-cancel-transfer-dialog")
      , SingleTransferOut = require("user:widget/account/p2p/wdg-tab-loan-transfer-out-dialog/wdg-tab-loan-transfer-out-dialog")
      , BatchTransferOut = require("user:widget/account/p2p/wdg-tab-loan-batch-transfer-out-dialog/wdg-tab-loan-batch-transfer-out-dialog")
      , RWETooltip = require("common:widget/react-ui/RWETooltip/RWETooltip")
      , BatchToTransfer = {
        _items: {},
        _count: 0,
        _value: 0,
        _data: function(item) {
            var ret = {
                loanId: item.loanId,
                lenderId: item.loanLenderId,
                investAmount: utils.fixFloat2(item.share * item.amountPershare),
                investShares: 1 != item.minInvestShares ? item.share / item.minInvestShares : item.share,
                interest: utils.fixFloat2(item.interest),
                interestGained: utils.fixFloat2(item.earnInterest),
                termsLeft: item.leftPhases,
                termsInTotal: item.mouths,
                availableShares: 1 != item.minInvestShares ? item.share / item.minInvestShares : item.share,
                valuePerShare: utils.fixFloat2(1 != item.minInvestShares ? item.currentValuePerShare * item.minInvestShares : item.currentValuePerShare),
                repaymentsPerShare: utils.fixFloat2(1 != item.minInvestShares ? item.recoveryAmountPerShare * item.minInvestShares : item.recoveryAmountPerShare),
                interestPerShare: utils.fixFloat2(1 != item.minInvestShares ? item.loanVo.pricePerShare * item.minInvestShares : item.loanVo.pricePerShare),
                principalPerShare: utils.fixFloat2(item.loanVo.principalPerShareNow),
                fee: item.fee || .01
            };
            return ret.value = utils.fixFloat2(ret.valuePerShare * ret.availableShares),
            ret.summary = utils.fixFloat2(ret.value - ret.fee),
            ret
        },
        add: function(item) {
            var _item = this._data(item)
              , loanId = item.loanId;
            loanId && (this._items[loanId] = _item,
            this._value += parseFloat(_item.value, 10),
            this._count += 1)
        },
        remove: function(item) {
            var loanId = item.loanId;
            loanId && this._items[loanId] && (this._value -= parseFloat(this._items[loanId].value, 10),
            this._count -= 1,
            delete this._items[loanId])
        },
        all: function(action, list) {
            if (this._value = 0,
            this._count = 0,
            this._items = {},
            "add" == action)
                for (var i = 0; i < list.length; i++)
                    "0" == list[i].isTransferable && this.add(list[i])
        },
        update: function() {
            return {
                count: this._count,
                value: utils.fixFloat2(this._value)
            }
        }
    }
      , AssetsLoan = function(_React$Component) {
        function AssetsLoan(props) {
            _classCallCheck(this, AssetsLoan),
            _React$Component.call(this, props),
            this.state = {
                selectedIndex: props.selectedIndex,
                loanHoldingData: null,
                loanHoldingStartNum: 0,
                loanInvestingData: null,
                loanInvestingStartNum: 0,
                loanTransferringData: null,
                loanTransferringStartNum: 0,
                loanRepaidData: null,
                loanRepaidStartNum: 0,
                showMonthlyRepay: !0,
                showBorrowerInfo: !1,
                borrowerInfo: {
                    idNo: "",
                    nickName: "",
                    realName: ""
                },
                showCommonDialog: !1,
                commonStatus: -1,
                commonMessage: "",
                bothTransfer: !1,
                selectedNum: 0,
                selectedValue: 0,
                selectedAll: !1,
                showTransferringCancel: !1,
                cancelProps: null,
                showSingleTransferOut: !1,
                showBatchTransferOut: !1,
                transferOutProps: null,
                batchTransferOutProps: null
            },
            this.handleTheLoan = this.handleTheLoan.bind(this),
            this.handleSelectAll = this.handleSelectAll.bind(this),
            this.renderTransferOutDialog = this.renderTransferOutDialog.bind(this),
            this.onRequestTransferOutClose = this.onRequestTransferOutClose.bind(this),
            this.onRequestBatchTransferOutClose = this.onRequestBatchTransferOutClose.bind(this),
            this.closeCommonDialog = this.closeCommonDialog.bind(this)
        }
        return _inherits(AssetsLoan, _React$Component),
        AssetsLoan.prototype.onTabRequestChange = function(index) {
            var _this = this;
            if (this.setState({
                selectedIndex: index
            }),
            2 != index || this.state.loanInvestingData || this.loadData("BID_LOAN", "loanInvestingData"),
            3 == index && !this.state.loanTransferringData) {
                var paramData = {
                    transferType: "OF_TRANSFERRED",
                    startNum: 0,
                    limit: 20
                };
                p2pService.getUserLoanTransferringList(paramData).then(function(out) {
                    if (out.requestStatus !== p2pService.STATUS.ERROR) {
                        var rsp = out.data;
                        _this.setState({
                            loanTransferringData: rsp
                        })
                    }
                })
            }
            4 != index || this.state.loanRepaidData || this.loadData("FINISH_LOAN", "loanRepaidData")
        }
        ,
        AssetsLoan.prototype.handleShowAllCheckbox = function() {
            this.setState({
                bothTransfer: !0,
                showMonthlyRepay: !1
            })
        }
        ,
        AssetsLoan.prototype.handleHideAllCheckbox = function() {
            this.setState({
                bothTransfer: !1,
                showMonthlyRepay: !0
            })
        }
        ,
        AssetsLoan.prototype.handleUpdateHolding = function(data, startNum) {
            this.setState({
                loanHoldingData: data,
                loanHoldingStartNum: startNum,
                bothTransfer: !1,
                selectedAll: !1,
                selectedNum: 0,
                selectedValue: 0
            })
        }
        ,
        AssetsLoan.prototype.handleUpdateInvesting = function(data, startNum) {
            this.setState({
                loanInvestingData: data,
                loanInvestingStartNum: startNum
            })
        }
        ,
        AssetsLoan.prototype.handleUpdateTransferring = function(data, startNum) {
            this.setState({
                loanTransferringData: data,
                loanTransferringStartNum: startNum
            })
        }
        ,
        AssetsLoan.prototype.handleUpdateRepaid = function(data, startNum) {
            this.setState({
                loanRepaidData: data,
                loanRepaidStartNum: startNum
            })
        }
        ,
        AssetsLoan.prototype.handleTheLoan = function(item, action) {
            var loansObj = void 0;
            switch (action) {
            case "add":
                BatchToTransfer.add(item);
                break;
            case "remove":
                BatchToTransfer.remove({
                    loanId: item.loanId
                })
            }
            loansObj = BatchToTransfer.update(),
            this.setState({
                selectedNum: loansObj.count,
                selectedValue: loansObj.value
            })
        }
        ,
        AssetsLoan.prototype.handleSelectAll = function(e) {
            var list = this.state.loanHoldingData.data.list
              , $ele = $(e.target);
            $ele.hasClass("icon-we-checkbox") ? ($ele.removeClass("icon-we-checkbox").addClass("icon-we-checkbox-active"),
            this.setState({
                selectedAll: !0
            }),
            BatchToTransfer.all("add", list)) : ($ele.removeClass("icon-we-checkbox-active").addClass("icon-we-checkbox"),
            this.setState({
                selectedAll: !1
            }),
            BatchToTransfer.all("remove"));
            var loansObj = BatchToTransfer.update();
            this.setState({
                selectedNum: loansObj.count,
                selectedValue: loansObj.value
            })
        }
        ,
        AssetsLoan.prototype.handleCancelTransfer = function(cancelProps) {
            this.setState({
                showTransferringCancel: !0,
                cancelProps: cancelProps
            })
        }
        ,
        AssetsLoan.prototype.onRequestTransferringCancelClose = function() {
            this.setState({
                showTransferringCancel: !1,
                cancelProps: null
            })
        }
        ,
        AssetsLoan.prototype.handleShowMessageTip = function(err) {
            this.setState({
                showCommonDialog: !0,
                commonStatus: -99999,
                commonMessage: err.message || "请求后端服务出错, 请稍后再试"
            })
        }
        ,
        AssetsLoan.prototype.renderCommonDialog = function() {
            var props = this.props
              , message = this.state.commonMessage
              , status = this.state.commonStatus
              , dialogProps = $.extend({}, props, {
                onRequestClose: this.closeCommonDialog,
                status: status,
                message: message
            });
            return React.createElement(RWeStatusDialog, dialogProps)
        }
        ,
        AssetsLoan.prototype.closeCommonDialog = function() {
            this.setState({
                showCommonDialog: !1
            });
            var status = this.state.commonStatus;
            0 == status && window.location.reload()
        }
        ,
        AssetsLoan.prototype.renderLoanNav = function() {
            var state = this.state
              , props = this.props
              , selected = state.selectedIndex
              , holdListData = state.loanHoldingData ? state.loanHoldingData : null
              , statistics = props.loanStatisticData
              , bothTransferContent = React.createElement("span", {
                className: "font-gray"
            }, "批量转让");
            if (holdListData && holdListData.data && holdListData.data.list && holdListData.data.list.length && (bothTransferContent = React.createElement("a", {
                href: "javascript:",
                onClick: this.handleShowAllCheckbox.bind(this)
            }, "批量转让")),
            state.bothTransfer) {
                var confirmTransferBtn = React.createElement("span", {
                    className: "font-gray ml10"
                }, "确认批量转让");
                state.selectedNum > 0 && state.selectedNum <= 10 && (confirmTransferBtn = React.createElement("a", {
                    href: "javascript:",
                    onClick: this.renderBatchTransferOut.bind(this),
                    className: "ml10"
                }, "确认批量转让")),
                bothTransferContent = React.createElement("div", null, React.createElement("a", {
                    href: "javascript:",
                    onClick: this.handleHideAllCheckbox.bind(this)
                }, "返回"), confirmTransferBtn)
            }
            return React.createElement("ul", {
                className: "p2p-account-type-nav fn-clear"
            }, React.createElement("li", {
                className: 1 == selected ? "choice" : "",
                onClick: this.onTabRequestChange.bind(this, 1)
            }, React.createElement("a", {
                href: "javascript:"
            }, "持有中（", statistics.REPAYING_LOAN_COUNT, "）")), React.createElement("li", {
                className: 2 == selected ? "choice" : "",
                onClick: this.onTabRequestChange.bind(this, 2)
            }, React.createElement("a", {
                href: "javascript:"
            }, "投标中（", statistics.BID_LOAN_COUNT, "）")), React.createElement("li", {
                className: 3 == selected ? "choice" : "",
                onClick: this.onTabRequestChange.bind(this, 3)
            }, React.createElement("a", {
                href: "javascript:"
            }, "转出中（", statistics.TRANSFERRING_COUNT, "）")), React.createElement("li", {
                className: 4 == selected ? "choice" : "",
                onClick: this.onTabRequestChange.bind(this, 4)
            }, React.createElement("a", {
                href: "javascript:"
            }, "已完成（", statistics.FINISH_LOAN_COUNT, "）")), 1 == state.selectedIndex ? React.createElement("li", {
                className: "p2p-account-both-transfer"
            }, bothTransferContent) : null)
        }
        ,
        AssetsLoan.prototype.createHoldingHead = function() {
            var showMonthlyRepay = this.state.showMonthlyRepay
              , text = showMonthlyRepay ? "月收本息" : "债权价值";
            return React.createElement("dl", {
                className: "p2p-account-table-header fn-clear"
            }, React.createElement("dd", {
                className: "pl20 w50 no-line"
            }, " "), React.createElement("dd", {
                className: "w130"
            }, "债权ID"), React.createElement("dd", {
                className: "pl20 w100"
            }, "年利率"), React.createElement("dd", {
                className: "text-center w95"
            }, "剩余期数"), React.createElement("dd", {
                className: "pl20 w145"
            }, "待收本息"), React.createElement("dd", {
                className: "pl20 w130"
            }, text), React.createElement("dd", {
                className: "text-center w105"
            }, "下个还款日"), React.createElement("dd", {
                className: "text-center w70"
            }, "状态"), React.createElement("dd", {
                className: "text-center w80"
            }, " "), React.createElement("dd", {
                className: "pl20 w80"
            }, " "), React.createElement("dd", {
                className: "text-center last w95"
            }, " "))
        }
        ,
        AssetsLoan.prototype.handleBorrowerInfo = function(showBorrowerInfo, borrowerInfo) {
            this.setState({
                showBorrowerInfo: showBorrowerInfo,
                borrowerInfo: borrowerInfo
            })
        }
        ,
        AssetsLoan.prototype.createHoldingRow = function(item, index) {
            var showMonthlyRepay = this.state.showMonthlyRepay;
            return React.createElement(HoldingItem, {
                item: item,
                index: index,
                handleTheLoan: this.handleTheLoan,
                selectedAll: this.state.selectedAll,
                showCheckbox: this.state.bothTransfer,
                showMonthlyRepay: showMonthlyRepay,
                handleTransferOutSingleLoan: this.renderTransferOutDialog,
                handleBorrowerInfo: this.handleBorrowerInfo.bind(this),
                showMessageTip: this.handleShowMessageTip.bind(this)
            })
        }
        ,
        AssetsLoan.prototype.createInvestingHead = function() {
            return React.createElement("dl", {
                className: "p2p-account-table-header fn-clear"
            }, React.createElement("dd", {
                className: "pl20 w170"
            }, "债权ID"), React.createElement("dd", {
                className: "pl20 w130"
            }, "年利率"), React.createElement("dd", {
                className: "pl20 w220"
            }, "出借金额"), React.createElement("dd", {
                className: "pl20 w130"
            }, "期限"), React.createElement("dd", {
                className: "text-center w110"
            }, "信用等级"), React.createElement("dd", {
                className: "pl20 w190"
            }, "剩余时间"), React.createElement("dd", {
                className: "pl20 last w130"
            }, "投标进度"))
        }
        ,
        AssetsLoan.prototype.createInvestingRow = function(item, index) {
            var _this2 = this
              , dlClassName = "p2p-account-table-row fn-clear";
            index % 2 == 0 && (dlClassName += " light-black");
            var loanType = item.displayLoanType
              , loanTypeName = p2pUtil.loanAllType(loanType)[1]
              , loanTypeTitle = p2pUtil.loanAllType(loanType)[0]
              , loanLink = "/loan-" + item.loanId + ".html"
              , progress = parseInt(100 * p2pUtil.bankersRound(item.finishedRatio / 100), 10);
            return React.createElement("dl", {
                className: dlClassName,
                onClick: function(e) {
                    return _this2.handleGoToDetail(loanLink, e)
                },
                title: "点击查看详情"
            }, React.createElement("dd", {
                className: "pl20 w170"
            }, React.createElement("em", {
                className: "ui-loantype",
                title: loanTypeTitle
            }, loanTypeName), item.loanId), React.createElement("dd", {
                className: "pl20 w130"
            }, utils.fixFloat2(item.interest), "%"), React.createElement("dd", {
                className: "pl20 w220"
            }, utils.commaFloat(item.amount), "元"), React.createElement("dd", {
                className: "pl20 w130"
            }, item.months, "个月"), React.createElement("dd", {
                className: "text-center w110"
            }, item.creditLevel), React.createElement("dd", {
                className: "pl20 w190"
            }, 100 == progress ? "--" : item.remainderTime), React.createElement("dd", {
                className: "pl20 last w130"
            }, progress, "%"))
        }
        ,
        AssetsLoan.prototype.createTransferringHead = function() {
            var tooltipProps_loan_transferring = {
                id: "user-loan-tooltip-loan-transferring",
                place: "right",
                tip: '根据定价公式计算出的债权当前的公允价值，会根据债权的交易日期、<br/>状态等进行更新，具体公式请<a target="_blank" href="https://www.renrendai.com/help/investment/58734407a4a7b30e4b8cff2e">查看详情</a>',
                delayHide: 1e3
            };
            return React.createElement("dl", {
                className: "p2p-account-table-header fn-clear"
            }, React.createElement("dd", {
                className: "pl20 w140"
            }, "转让ID"), React.createElement("dd", {
                className: "pl20 w140"
            }, "债权ID"), React.createElement("dd", {
                className: "pl20 w140"
            }, "剩余期数"), React.createElement("dd", {
                className: "pl20 w130"
            }, "年利率"), React.createElement("dd", {
                className: "pl20 w140"
            }, "债权价值", React.createElement(RWETooltip, tooltipProps_loan_transferring)), React.createElement("dd", {
                className: "pl20 w130"
            }, "转让价格"), React.createElement("dd", {
                className: "pl20 w130"
            }, "转让系数"), React.createElement("dd", {
                className: "text-center last w130"
            }, " "))
        }
        ,
        AssetsLoan.prototype.createTransferringRow = function(item, index) {
            var _this3 = this
              , dlClassName = "p2p-account-table-row fn-clear";
            index % 2 == 0 && (dlClassName += " light-black");
            var loanType = item.displayLoanType
              , loanTypeName = p2pUtil.loanAllType(loanType)[1]
              , loanTypeTitle = p2pUtil.loanAllType(loanType)[0]
              , loanLink = "/loan-" + item.loanId + ".html"
              , transferLink = "/transfer-" + item.id + ".html"
              , shares = 1 != item.minInvestShares ? item.share / item.minInvestShares : item.share
              , totalPrice = item.totalPricePershare * shares
              , totalAmount = totalPrice * item.discountRatio
              , fee = item.loanTranfsferVo.fee || 0
              , cancelProps = {
                loanId: item.loanId,
                transferId: item.id,
                sharesTransferred: item.initialShare - shares,
                sharesLeft: shares,
                income: utils.commaFloat(item.loanTranfsferVo.income || 0),
                totalPrice: utils.commaFloat(totalPrice),
                discountRatio: utils.fixFloat2(100 * item.discountRatio),
                totalAmount: utils.commaFloat(totalAmount),
                fee: utils.commaFloat(fee),
                summary: utils.commaFloat(totalAmount - fee)
            };
            return React.createElement("dl", {
                className: dlClassName,
                onClick: function(e) {
                    return _this3.handleGoToDetail(loanLink, e)
                },
                title: "点击查看详情"
            }, React.createElement("dd", {
                className: "pl20 w140"
            }, React.createElement("a", {
                className: "stay-current-page",
                href: transferLink,
                target: "_blank"
            }, item.id)), React.createElement("dd", {
                className: "pl20 w140"
            }, React.createElement("em", {
                className: "ui-loantype",
                title: loanTypeTitle
            }, loanTypeName), item.loanId), React.createElement("dd", {
                className: "pl20 w140"
            }, item.leftPhaseCount, "/", item.months, "期"), React.createElement("dd", {
                className: "pl20 w130"
            }, utils.fixFloat2(item.interest), "%"), React.createElement("dd", {
                className: "pl20 w140"
            }, utils.commaFloat(totalPrice), "元"), React.createElement("dd", {
                className: "pl20 w130"
            }, utils.commaFloat(totalAmount), "元"), React.createElement("dd", {
                className: "pl20 w130"
            }, utils.fixFloat2(item.discountRatio <= 1 ? 100 * item.discountRatio : item.discountRatio), "%"), React.createElement("dd", {
                className: "text-center last w130 font-orange"
            }, React.createElement("a", {
                href: "javascript:",
                className: "hover-btn stay-current-page",
                title: "",
                onClick: this.handleCancelTransfer.bind(this, cancelProps)
            }, "撤销")))
        }
        ,
        AssetsLoan.prototype.createRepaidHead = function() {
            return React.createElement("dl", {
                className: "p2p-account-table-header fn-clear"
            }, React.createElement("dd", {
                className: "pl20 w160"
            }, "债权ID"), React.createElement("dd", {
                className: "pl20 w130"
            }, "出借金额"), React.createElement("dd", {
                className: "pl20 w130"
            }, "年利率"), React.createElement("dd", {
                className: "pl20 w130"
            }, "回收金额"), React.createElement("dd", {
                className: "pl20 w130"
            }, "已赚金额"), React.createElement("dd", {
                className: "pl20 w160"
            }, "完成日期"), React.createElement("dd", {
                className: "pl20 w140"
            }, "完成方式"), React.createElement("dd", {
                className: "pl20 last w100"
            }, " "))
        }
        ,
        AssetsLoan.prototype.createRepaidRow = function(item, index) {
            return React.createElement(RepaidItem, {
                item: item,
                index: index
            })
        }
        ,
        AssetsLoan.prototype.createHoldListFooterDom = function() {
            var _this4 = this
              , state = this.state;
            if (!state.bothTransfer)
                return null;
            var warnTip = null;
            return state.selectedNum > 10 && (warnTip = React.createElement("span", {
                className: "p2p-account-loan-warn"
            }, "单次批量转让上限不超过10笔")),
            React.createElement("div", {
                className: "p2p-account-loan-select-all"
            }, React.createElement("span", {
                className: "checkbox icon-we-checkbox",
                onClick: function(e) {
                    _this4.handleSelectAll(e)
                }
            }), React.createElement("span", null, "全选 选中 ", state.selectedNum, "笔债权，所选债权的当前总价值", state.selectedValue, "元"), warnTip)
        }
        ,
        AssetsLoan.prototype.loadData = function(loanType, data) {
            var _this5 = this
              , paramData = {
                loanType: loanType,
                startNum: 0,
                limit: 20
            };
            p2pService.getUserLoanList(paramData).then(function(out) {
                var _setState;
                if (out.requestStatus !== p2pService.STATUS.ERROR) {
                    var rsp = out.data;
                    _this5.setState((_setState = {},
                    _setState[data] = rsp,
                    _setState))
                }
            })
        }
        ,
        AssetsLoan.prototype.renderHolding = function() {
            var state = this.state
              , data = state.loanHoldingData
              , startNum = state.loanHoldingStartNum
              , list = null;
            if (data) {
                var ajaxParams = {
                    loanType: "REPAYING_LOAN"
                };
                list = React.createElement(List, _extends({}, data, {
                    moudleServiceName: "p2p",
                    url: "getUserLoanList",
                    ajaxParams: ajaxParams,
                    isHeadNeed: "yes",
                    isHeadNeedOrder: "no",
                    createHeadDom: this.createHoldingHead.bind(this),
                    createRowDom: this.createHoldingRow.bind(this),
                    createListFooterDom: this.createHoldListFooterDom.bind(this),
                    updateTheData: this.handleUpdateHolding.bind(this),
                    noDataText: "没有持有中的债权",
                    startNum: startNum,
                    limit: 20,
                    offset: 5
                }))
            } else
                list = React.createElement("div", {
                    className: "list-loading-whole"
                }, React.createElement("div", {
                    className: "list-loading"
                })),
                this.loadData("REPAYING_LOAN", "loanHoldingData");
            return React.createElement("div", {
                className: "p2p-account-table-whole"
            }, list)
        }
        ,
        AssetsLoan.prototype.renderInvesting = function() {
            var state = this.state
              , data = state.loanInvestingData
              , startNum = state.loanInvestingStartNum
              , list = null;
            if (data) {
                var ajaxParams = {
                    loanType: "BID_LOAN"
                };
                list = React.createElement(List, _extends({}, data, {
                    moudleServiceName: "p2p",
                    url: "getUserLoanList",
                    ajaxParams: ajaxParams,
                    isHeadNeed: "yes",
                    isHeadNeedOrder: "no",
                    createHeadDom: this.createInvestingHead,
                    createRowDom: this.createInvestingRow.bind(this),
                    updateTheData: this.handleUpdateInvesting.bind(this),
                    noDataText: "没有投标中的债权",
                    startNum: startNum,
                    limit: 20,
                    offset: 5
                }))
            } else
                list = React.createElement("div", {
                    className: "list-loading-whole"
                }, React.createElement("div", {
                    className: "list-loading"
                }));
            return React.createElement("div", {
                className: "p2p-account-table-whole"
            }, list)
        }
        ,
        AssetsLoan.prototype.renderTransferring = function() {
            var state = this.state
              , data = state.loanTransferringData
              , startNum = state.loanTransferringStartNum
              , list = null;
            if (data) {
                var ajaxParams = {
                    transferType: "OF_TRANSFERRED"
                };
                list = React.createElement(List, _extends({}, data, {
                    moudleServiceName: "p2p",
                    url: "getUserLoanTransferringList",
                    ajaxParams: ajaxParams,
                    isHeadNeed: "yes",
                    isHeadNeedOrder: "no",
                    createHeadDom: this.createTransferringHead,
                    createRowDom: this.createTransferringRow.bind(this),
                    updateTheData: this.handleUpdateTransferring.bind(this),
                    noDataText: "没有转出中的债权",
                    startNum: startNum,
                    limit: 20,
                    offset: 5
                }))
            } else
                list = React.createElement("div", {
                    className: "list-loading-whole"
                }, React.createElement("div", {
                    className: "list-loading"
                }));
            return React.createElement("div", {
                className: "p2p-account-table-whole"
            }, list)
        }
        ,
        AssetsLoan.prototype.renderRepaid = function() {
            var state = this.state
              , data = state.loanRepaidData
              , startNum = state.loanRepaidStartNum
              , list = null;
            if (data) {
                var ajaxParams = {
                    loanType: "FINISH_LOAN"
                };
                list = React.createElement(List, _extends({}, data, {
                    moudleServiceName: "p2p",
                    url: "getUserLoanList",
                    ajaxParams: ajaxParams,
                    isHeadNeed: "yes",
                    isHeadNeedOrder: "no",
                    createHeadDom: this.createRepaidHead,
                    createRowDom: this.createRepaidRow.bind(this),
                    updateTheData: this.handleUpdateRepaid.bind(this),
                    noDataText: "没有已完成的债权",
                    startNum: startNum,
                    limit: 20,
                    offset: 5
                }))
            } else
                list = React.createElement("div", {
                    className: "list-loading-whole"
                }, React.createElement("div", {
                    className: "list-loading"
                }));
            return React.createElement("div", {
                className: "p2p-account-table-whole"
            }, list)
        }
        ,
        AssetsLoan.prototype.hideBorrowerInfoDialog = function() {
            this.setState({
                showBorrowerInfo: !1,
                borrowerInfo: {
                    idNo: "",
                    nickName: "",
                    realName: ""
                }
            })
        }
        ,
        AssetsLoan.prototype.renderBorrowerInfoDialog = function() {
            var state = this.state
              , show = state.showBorrowerInfo;
            if (!show)
                return null;
            var weProps = {
                showing: show,
                title: "借款人信息",
                onRequestClose: this.hideBorrowerInfoDialog.bind(this),
                dialog: {
                    className: "wdg-monthly-cancel-tips",
                    style: {
                        width: 480
                    }
                }
            };
            return React.createElement("div", {
                className: "p2p-account-list-dialog"
            }, React.createElement(RWeDialog, weProps, React.createElement("div", {
                className: "p2p-account-borrower-info-line pt30"
            }, "用户昵称： ", state.borrowerInfo.nickName), React.createElement("div", {
                className: "p2p-account-borrower-info-line"
            }, "真实姓名： ", state.borrowerInfo.realName), React.createElement("div", {
                className: "p2p-account-borrower-info-line"
            }, "身份证号： ", state.borrowerInfo.idNo)))
        }
        ,
        AssetsLoan.prototype.renderTransferOutDialog = function(item) {
            var data = BatchToTransfer._data(item);
            this.setState({
                showSingleTransferOut: !0,
                transferOutProps: data
            })
        }
        ,
        AssetsLoan.prototype.renderBatchTransferOut = function() {
            0 == BatchToTransfer._count || BatchToTransfer._count > 10 || this.setState({
                showBatchTransferOut: !0,
                batchTransferOutProps: BatchToTransfer
            })
        }
        ,
        AssetsLoan.prototype.onRequestTransferOutClose = function() {
            this.setState({
                showSingleTransferOut: !1,
                transferOutProps: null
            })
        }
        ,
        AssetsLoan.prototype.onRequestBatchTransferOutClose = function() {
            this.setState({
                showBatchTransferOut: !1,
                batchTransferOutProps: null
            })
        }
        ,
        AssetsLoan.prototype.handleGoToDetail = function(link, e) {
            $(e.target).hasClass("stay-current-page") || (location.href = link)
        }
        ,
        AssetsLoan.prototype.render = function() {
            var props = this.props
              , state = this.state
              , selected = state.selectedIndex
              , loanNav = this.renderLoanNav()
              , initHoldingList = null;
            props.loanSelected && (initHoldingList = this.renderHolding());
            var borrowInfo = this.renderBorrowerInfoDialog()
              , showCommonDialog = state.showCommonDialog
              , commomDialogDom = this.renderCommonDialog()
              , commomDialog = showCommonDialog ? commomDialogDom : null
              , transferCancelDialog = null;
            state.showTransferringCancel && (transferCancelDialog = React.createElement(TransferringCancel, {
                onRequestTransferringCancelClose: this.onRequestTransferringCancelClose.bind(this),
                cancelProps: state.cancelProps
            }));
            var transferOutDialog = null;
            state.showSingleTransferOut && (transferCancelDialog = React.createElement(SingleTransferOut, _extends({}, state.transferOutProps, {
                onRequestTransferOutClose: this.onRequestTransferOutClose
            })));
            var batchTransferOutDialog = null;
            return state.showBatchTransferOut && (batchTransferOutDialog = React.createElement(BatchTransferOut, {
                batchTransferOutProps: this.state.batchTransferOutProps,
                onRequestBatchTransferOutClose: this.onRequestBatchTransferOutClose
            })),
            React.createElement("div", null, React.createElement("div", {
                className: "p2p-account-loan-tab-content"
            }, loanNav, React.createElement("div", {
                className: 1 == selected ? "loan-type-tab-content choice" : "loan-type-tab-content"
            }, initHoldingList), React.createElement("div", {
                className: 2 == selected ? "loan-type-tab-content choice" : "loan-type-tab-content"
            }, this.renderInvesting()), React.createElement("div", {
                className: 3 == selected ? "loan-type-tab-content choice" : "loan-type-tab-content"
            }, this.renderTransferring()), React.createElement("div", {
                className: 4 == selected ? "loan-type-tab-content choice" : "loan-type-tab-content"
            }, this.renderRepaid())), borrowInfo, transferCancelDialog, transferOutDialog, batchTransferOutDialog, commomDialog)
        }
        ,
        AssetsLoan
    }(React.Component);
    AssetsLoan.defaultProps = {
        selectedIndex: 1
    },
    module.exports = AssetsLoan
});
;/*!/client/widget/account/p2p/wdg-tab-uplan/wdg-tab-uplan.jsx*/
define("user:widget/account/p2p/wdg-tab-uplan/wdg-tab-uplan.jsx", function(require, exports, module) {
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
      , List = require("common:widget/react-ui/RList/ListV2.0")
      , service = require("common:widget/ui/service/service-factory")
      , uplanService = service.getService("uplan")
      , p2pService = service.getService("p2p")
      , utils = require("common:widget/ui/utils/utils")
      , RUserUplanRenewalDialog = require("uplan:widget/user/detail/RUserUplanRenewalDialog/RUserUplanRenewalDialog")
      , RWeStatusDialog = require("common:widget/react-ui/RWeStatusDialog/RWeStatusDialog")
      , RUserUplanQuitDialog = require("uplan:widget/user/detail/RUserUplanQuitDialog/RUserUplanQuitDialog")
      , RWETooltip = require("common:widget/react-ui/RWETooltip/RWETooltip")
      , AssetUplan = function(_React$Component) {
        function AssetUplan(props) {
            _classCallCheck(this, AssetUplan),
            _React$Component.call(this, props),
            this.state = {
                selectedIndex: props.selectedIndex,
                uplanHoldingData: null,
                uplanHoldingStartNum: 0,
                uplanExitingData: null,
                uplanExitingStartNum: 0,
                uplanExitedData: null,
                uplanExitedStartNum: 0,
                holdLoaded: !1,
                exitingLoaded: !1,
                exitedLoaded: !1,
                renewalData: null,
                isLoading: !1,
                showDialog: !1,
                showCommonDialog: !1,
                commonStatus: -1,
                commonMessage: "",
                dialogType: 1,
                isQuitOkDialog: 0,
                quitDetailInfo: null,
                showRiskCommonDialog: !1,
                showRiskCommonDialogType: -1,
                showRiskCommonDialogResult: null
            },
            this.closeDialog = this.closeDialog.bind(this),
            this.closeCommonDialog = this.closeCommonDialog.bind(this),
            this.closeRiskCommonDialog = this.closeRiskCommonDialog.bind(this),
            this.onRequestClose4OldUplan = this.onRequestClose4OldUplan.bind(this),
            this.handleResult = this.handleResult.bind(this),
            this.jumpToRisk = this.jumpToRisk.bind(this),
            this.jumpToRiskAgain = this.jumpToRiskAgain.bind(this)
        }
        return _inherits(AssetUplan, _React$Component),
        AssetUplan.prototype.onTabRequestChange = function(index) {
            this.setState({
                selectedIndex: index
            }),
            2 != index || this.state.uplanExitingData || this.loadData("EXITING_PLAN", "uplanExitingData"),
            3 != index || this.state.uplanExitedData || this.loadData("EXIT_PLAN", "uplanExitedData")
        }
        ,
        AssetUplan.prototype.renderUplanNav = function() {
            var state = this.state
              , props = this.props
              , selected = state.selectedIndex
              , statistics = props.uplanStatisticData;
            return React.createElement("ul", {
                className: "p2p-account-type-nav fn-clear"
            }, React.createElement("li", {
                className: 1 == selected ? "choice" : "",
                onClick: this.onTabRequestChange.bind(this, 1)
            }, React.createElement("a", {
                href: "javascript:"
            }, "服务中（", statistics.financePlanCurrentPlanCount, "）")), React.createElement("li", {
                className: 2 == selected ? "choice" : "",
                onClick: this.onTabRequestChange.bind(this, 2)
            }, React.createElement("a", {
                href: "javascript:"
            }, "退出中（", statistics.financePlanExitingCount, "）")), React.createElement("li", {
                className: 3 == selected ? "choice" : "",
                onClick: this.onTabRequestChange.bind(this, 3)
            }, React.createElement("a", {
                href: "javascript:"
            }, "已退出（", statistics.financePlanExitCount, "）")))
        }
        ,
        AssetUplan.prototype.createHoldingHead = function() {
            return React.createElement("dl", {
                className: "p2p-account-table-header fn-clear"
            }, React.createElement("dd", {
                className: "pl20 w200"
            }, "服务期数"), React.createElement("dd", {
                className: "pl20 w140"
            }, "扣费后年利率"), React.createElement("dd", {
                className: "pl20 w170"
            }, "出借本金"), React.createElement("dd", {
                className: "pl20 w160"
            }, "已获利息"), React.createElement("dd", {
                className: "pl20 w120"
            }, "投标次数"), React.createElement("dd", {
                className: "pl20 w150"
            }, "状态"), React.createElement("dd", {
                className: "text-center last w140"
            }, "操作"))
        }
        ,
        AssetUplan.prototype.showRenewalDialog = function(financeSubPointId, ele) {
            if (!this.state.isLoading) {
                var $ele = $(ele.target);
                this.renewalAjax(financeSubPointId, $ele)
            }
        }
        ,
        AssetUplan.prototype.showQuitDialog = function(item) {
            var quitDetailInfo = {
                financePlanVo: {
                    financeSubPointId: item.financeSubPointId,
                    id: item.id,
                    finalAmount: item.finalAmount,
                    name: item.name
                }
            }
              , that = this;
            that.setState({
                showDialog: !0,
                dialogType: 3,
                quitDetailInfo: quitDetailInfo
            })
        }
        ,
        AssetUplan.prototype.jumpToRisk = function() {
            location.href = "/user/risk/riskPc?type=renewal"
        }
        ,
        AssetUplan.prototype.jumpToRiskAgain = function() {
            this.jumpToRisk(),
            $statistic.eventRaw({
                eventId: "click_join_money_limit_remeaure_word"
            })
        }
        ,
        AssetUplan.prototype.renderRiskCommonDialog = function() {
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
        AssetUplan.prototype.riskValidate = function(isRisk, money, renewalData, $ele) {
            var _this = this;
            return isRisk ? p2pService.checkRiskLimit({
                amount: money
            }).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status
                  , message = data.message;
                if (requestStatus === uplanService.STATUS.SUCCESS && 0 === status)
                    _this.setState({
                        isLoading: !1,
                        renewalData: renewalData,
                        showDialog: !0,
                        dialogType: 1,
                        pageRenewalClassName: "user-plan-button-orange"
                    }),
                    $ele.removeClass("loading-btn");
                else if (80029 == status)
                    _this.setState({
                        showRiskCommonDialog: !0,
                        showRiskCommonDialogType: 1,
                        showRiskCommonDialogResult: data.data
                    }),
                    $ele.removeClass("loading-btn");
                else {
                    if (80030 != status)
                        return Promise.reject(message);
                    _this.setState({
                        showRiskCommonDialog: !0,
                        showRiskCommonDialogType: 2
                    }),
                    $ele.removeClass("loading-btn")
                }
            })["catch"](function(message) {
                console.log("请求判断是否超过风评限额出错：" + message),
                _this.setState({
                    isLoading: !1,
                    showDialog: !1,
                    showCommonDialog: !0,
                    commonStatus: -99999,
                    commonMessage: message || "请求后端服务出错, 请稍后再试",
                    pageRenewalClassName: "user-plan-button-orange"
                }),
                $ele.removeClass("loading-btn")
            }) : (this.setState({
                showDialog: !1,
                showCommonDialog: !1,
                showRiskCommonDialog: !0,
                showRiskCommonDialogType: 0
            }),
            void $ele.removeClass("loading-btn"))
        }
        ,
        AssetUplan.prototype.renewalAjax = function(financeSubPointId, $ele) {
            var _this2 = this;
            this.setState({
                isLoading: !0,
                pageRenewalClassName: "user-plan-button-gray"
            }),
            $ele.addClass("loading-btn"),
            uplanService.getRollOverInfo({
                subPointId: financeSubPointId
            }).then(function(result) {
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                if (requestStatus === uplanService.STATUS.SUCCESS && 0 === status) {
                    var renewalData = data.data
                      , riskInfo = renewalData.riskInfo
                      , rollOverAmount = renewalData.rollOverAmount
                      , riskFlag = riskInfo.riskFlag
                      , isRisk = riskInfo.isRisk;
                    riskFlag ? _this2.riskValidate(isRisk, rollOverAmount, renewalData, $ele) : _this2.setState({
                        isLoading: !1,
                        renewalData: data.data,
                        showDialog: !0,
                        dialogType: 1,
                        pageRenewalClassName: "user-plan-button-orange"
                    }),
                    $ele.removeClass("loading-btn")
                } else {
                    var message = data.message || "请求后端服务出错, 请稍后再试";
                    _this2.setState({
                        isLoading: !1,
                        showDialog: !1,
                        showCommonDialog: !0,
                        commonStatus: status,
                        commonMessage: message,
                        pageRenewalClassName: "user-plan-button-orange"
                    }),
                    $ele.removeClass("loading-btn")
                }
            }).caught(function() {
                _this2.setState({
                    isLoading: !1,
                    showDialog: !1,
                    showCommonDialog: !0,
                    commonStatus: -99999,
                    commonMessage: "请求后端服务出错, 请稍后再试",
                    pageRenewalClassName: "user-plan-button-orange"
                }),
                $ele.removeClass("loading-btn")
            })
        }
        ,
        AssetUplan.prototype.onRequestClose4OldUplan = function() {
            var _this3 = this;
            this.setState({
                isQuitOkDialog: 1
            });
            var detailInfo = this.state.quitDetailInfo
              , financePlanVo = detailInfo.financePlanVo
              , subPointId = financePlanVo.financeSubPointId;
            uplanService.getPlanQuitInfo({
                subPointId: subPointId
            }).then(function(result) {
                _this3.setState({
                    isLoading: !1
                });
                var requestStatus = result.requestStatus
                  , data = result.data || {}
                  , status = data.status;
                if (requestStatus !== uplanService.STATUS.SUCCESS || 0 !== status) {
                    _this3.setState({
                        isLoading: !1,
                        quitData: data,
                        showCommonDialog: !0,
                        commonStatus: -99999,
                        commonMessage: data.message || "请求后端服务出错, 请稍后再试"
                    });
                    var msg = data.message || "请求后端服务出错, 请稍后再试";
                    return Promise.reject(msg)
                }
                _this3.setState({
                    isLoading: !1,
                    quitData: data
                })
            }).caught(function(msg) {
                _this3.setState({
                    isLoading: !1,
                    quitData: {
                        status: -1,
                        message: "网络异常，请稍后再试"
                    },
                    showCommonDialog: !0,
                    commonStatus: -99999,
                    commonMessage: msg || "请求后端服务出错, 请稍后再试"
                })
            })
        }
        ,
        AssetUplan.prototype.createHoldingRow = function(item, index) {
            var _this4 = this
              , dlClassName = "p2p-account-table-row fn-clear";
            index % 2 == 0 && (dlClassName += " light-black");
            var link = "/uplan/user/detail?financePlanId=" + item.id + "&subPointId=" + item.financeSubPointId
              , action = React.createElement("a", {
                className: "hover-btn",
                title: ""
            }, "查看");
            return "PREMIUM" != item.financePlanType && ("REDEMPTION_PERIOD" == item.status && "OLD" == item.category && (action = React.createElement("a", {
                className: "hover-btn stay-current-page",
                title: "",
                href: "javascript:;",
                onClick: this.showQuitDialog.bind(this, item)
            }, "退出")),
            "true" == item.canRollOver && (action = React.createElement("a", {
                className: "hover-btn stay-current-page",
                title: "",
                onClick: this.showRenewalDialog.bind(this, item.financeSubPointId),
                href: "javascript:"
            }, "续期")),
            "true" == item.rollOverAlready && (action = React.createElement("span", {
                className: "disabled"
            }, "已续期")),
            "REDEMPTION_PERIOD" != item.status && "true" != item.canRollOver && "true" != item.rollOverAlready && (action = React.createElement("span", {
                className: "disabled"
            }, "续期"))),
            React.createElement("dl", {
                className: dlClassName,
                onClick: function(e) {
                    return _this4.handleGoToDetail(link, e)
                },
                title: "点击查看详情"
            }, React.createElement("dd", {
                className: "pl20 w200"
            }, item.name), React.createElement("dd", {
                className: "pl20 w140"
            }, item.aveLoanRate, "%"), React.createElement("dd", {
                className: "pl20 w170"
            }, utils.commaFloat(item.finalAmount), "元"), React.createElement("dd", {
                className: "pl20 w160"
            }, utils.commaFloat(item.earnAmount), "元"), React.createElement("dd", {
                className: "pl20 w120"
            }, item.loanBidCount, "次"), React.createElement("dd", {
                className: "pl20 w150"
            }, utils.planStatus(item.isPurcharge, item.category, item.status, item.endLockingTime, item.canRollOver)), React.createElement("dd", {
                className: "text-center last w140 font-orange"
            }, action))
        }
        ,
        AssetUplan.prototype.createExitingHead = function() {
            return React.createElement("dl", {
                className: "p2p-account-table-header fn-clear"
            }, React.createElement("dd", {
                className: "pl20 w230"
            }, "服务期数"), React.createElement("dd", {
                className: "pl20 w220"
            }, "出借本金"), React.createElement("dd", {
                className: "pl20 w210"
            }, "退出前已提取的金额"), React.createElement("dd", {
                className: "pl20 w210"
            }, "已转让债权金额"), React.createElement("dd", {
                className: "pl20 w200 last"
            }, "待转让债权价值"))
        }
        ,
        AssetUplan.prototype.createExitingRow = function(item, index) {
            var _this5 = this
              , dlClassName = "p2p-account-table-row fn-clear";
            index % 2 == 0 && (dlClassName += " light-black");
            var link = "/uplan/user/detail?financePlanId=" + item.id + "&subPointId=" + item.financeSubPointId
              , quitBeforeAmount = utils.commaFloat(utils.fixFloat2((100 * utils.fixFloat2(item.redProgress) + 100 * utils.fixFloat2(item.availablePrice)) / 100))
              , toBeTransferredAmount = utils.commaFloat((100 * utils.fixFloat2(item.remainingAmount) + 100 * utils.fixFloat2(item.disabledLoanAmount)) / 100)
              , tooltipProps_quit_before_amount = {
                id: "user-account-tooltip-quit-before-amount",
                place: "right",
                tip: "\n                    转出金额 " + utils.commaFloat(item.redProgress) + "元<br>\n                    待转出金额 " + utils.commaFloat(item.availablePrice) + "元\n                ",
                delayHide: 100
            }
              , tooltipProps_to_be_transferred_amount = {
                id: "user-account-tooltip-to-be-transferred-amount",
                place: "left",
                tip: "\n                    待转出债权价值 " + utils.commaFloat(item.remainingAmount) + "元<br>\n                    无法转让债权价值 " + utils.commaFloat(item.disabledLoanCount) + "元\n                ",
                delayHide: 100
            };
            return React.createElement("dl", {
                className: dlClassName,
                onClick: function(e) {
                    return _this5.handleGoToDetail(link, e)
                },
                title: "点击查看详情"
            }, React.createElement("dd", {
                className: "pl20 w230"
            }, item.name), React.createElement("dd", {
                className: "pl20 w220"
            }, utils.commaFloat(item.finalAmount), "元"), React.createElement("dd", {
                className: "pl20 w210"
            }, utils.commaFloat(item.totalCashDrawInterest), "元"), React.createElement("dd", {
                className: "pl20 w210"
            }, quitBeforeAmount, "元 ", React.createElement(RWETooltip, tooltipProps_quit_before_amount)), React.createElement("dd", {
                className: "pl20 w200 last"
            }, toBeTransferredAmount, "元 ", React.createElement(RWETooltip, tooltipProps_to_be_transferred_amount)))
        }
        ,
        AssetUplan.prototype.createExitedHead = function() {
            return React.createElement("dl", {
                className: "p2p-account-table-header fn-clear"
            }, React.createElement("dd", {
                className: "pl20 w200"
            }, "服务期数"), React.createElement("dd", {
                className: "pl20 w140"
            }, "回报率"), React.createElement("dd", {
                className: "pl20 w170"
            }, "出借本金"), React.createElement("dd", {
                className: "pl20 w160"
            }, "已获利息"), React.createElement("dd", {
                className: "pl20 w140"
            }, "投标次数"), React.createElement("dd", {
                className: "pl20 w150"
            }, "完成时间"), React.createElement("dd", {
                className: "pl20 w120 last"
            }, "退出途径"))
        }
        ,
        AssetUplan.prototype.createExitedRow = function(item, index) {
            var _this6 = this
              , dlClassName = "p2p-account-table-row fn-clear";
            index % 2 == 0 && (dlClassName += " light-black");
            var link = "/uplan/user/detail?financePlanId=" + item.id + "&subPointId=" + item.financeSubPointId
              , interest = utils.fixFloat2(100 * (utils.fixFloat2(item.earnAmount) / utils.fixFloat2(item.finalAmount)));
            return React.createElement("dl", {
                className: dlClassName,
                onClick: function(e) {
                    return _this6.handleGoToDetail(link, e)
                },
                title: "点击查看详情"
            }, React.createElement("dd", {
                className: "pl20 w200"
            }, item.name), React.createElement("dd", {
                className: "pl20 w140"
            }, interest, "%"), React.createElement("dd", {
                className: "pl20 w170"
            }, utils.commaFloat(item.finalAmount), "元"), React.createElement("dd", {
                className: "pl20 w160"
            }, utils.commaFloat(item.earnAmount), "元"), React.createElement("dd", {
                className: "pl20 w140"
            }, item.loanBidCount, "次"), React.createElement("dd", {
                className: "pl20 w150"
            }, item.redFinishTime.substring(0, 10)), React.createElement("dd", {
                className: "pl20 w120 last"
            }, item.exitWay))
        }
        ,
        AssetUplan.prototype.handleUpdateHolding = function(data, startNum) {
            this.setState({
                uplanHoldingData: data,
                uplanHoldingStartNum: startNum
            })
        }
        ,
        AssetUplan.prototype.handleUpdateExiting = function(data, startNum) {
            this.setState({
                uplanExitingData: data,
                uplanExitingStartNum: startNum
            })
        }
        ,
        AssetUplan.prototype.handleUpdateExited = function(data, startNum) {
            this.setState({
                uplanExitedData: data,
                uplanExitedStartNum: startNum
            })
        }
        ,
        AssetUplan.prototype.loadData = function(planType, data) {
            var _this7 = this
              , paramData = {
                planType: planType,
                startNum: 0,
                limit: 20
            };
            uplanService.getUserUplanList(paramData).then(function(out) {
                var _setState;
                if (out.requestStatus !== uplanService.STATUS.ERROR) {
                    var rsp = out.data;
                    _this7.setState((_setState = {},
                    _setState[data] = rsp,
                    _setState))
                }
            })
        }
        ,
        AssetUplan.prototype.renderHolding = function() {
            var state = this.state
              , data = state.uplanHoldingData
              , startNum = state.uplanHoldingStartNum
              , list = null;
            if (data) {
                var ajaxParams = {
                    planType: "HOLD_PLAN"
                };
                list = React.createElement(List, _extends({}, data, {
                    moudleServiceName: "uplan",
                    url: "getUserUplanList",
                    ajaxParams: ajaxParams,
                    isHeadNeed: "yes",
                    isHeadNeedOrder: "no",
                    createHeadDom: this.createHoldingHead,
                    createRowDom: this.createHoldingRow.bind(this),
                    updateTheData: this.handleUpdateHolding.bind(this),
                    noDataText: "没有服务中的U享",
                    startNum: startNum,
                    limit: 20,
                    offset: 5
                }))
            } else
                list = React.createElement("div", {
                    className: "list-loading-whole"
                }, React.createElement("div", {
                    className: "list-loading"
                }));
            return React.createElement("div", {
                className: "p2p-account-table-whole"
            }, list)
        }
        ,
        AssetUplan.prototype.renderExiting = function() {
            var state = this.state
              , data = state.uplanExitingData
              , startNum = state.uplanExitingStartNum
              , list = null;
            if (data) {
                var ajaxParams = {
                    planType: "EXITING_PLAN"
                };
                list = React.createElement(List, _extends({}, data, {
                    moudleServiceName: "uplan",
                    url: "getUserUplanList",
                    ajaxParams: ajaxParams,
                    isHeadNeed: "yes",
                    isHeadNeedOrder: "no",
                    createHeadDom: this.createExitingHead,
                    createRowDom: this.createExitingRow.bind(this),
                    updateTheData: this.handleUpdateExiting.bind(this),
                    noDataText: "没有退出中的U享",
                    startNum: startNum,
                    limit: 20,
                    offset: 5
                }))
            } else
                list = React.createElement("div", {
                    className: "list-loading-whole"
                }, React.createElement("div", {
                    className: "list-loading"
                }));
            return React.createElement("div", {
                className: "p2p-account-table-whole"
            }, list)
        }
        ,
        AssetUplan.prototype.renderExited = function() {
            var state = this.state
              , data = state.uplanExitedData
              , startNum = state.uplanExitedStartNum
              , list = null;
            if (data) {
                var ajaxParams = {
                    planType: "EXIT_PLAN"
                };
                list = React.createElement(List, _extends({}, data, {
                    moudleServiceName: "uplan",
                    url: "getUserUplanList",
                    ajaxParams: ajaxParams,
                    isHeadNeed: "yes",
                    isHeadNeedOrder: "no",
                    createHeadDom: this.createExitedHead,
                    createRowDom: this.createExitedRow.bind(this),
                    updateTheData: this.handleUpdateExited.bind(this),
                    noDataText: "没有已退出的U享",
                    startNum: startNum,
                    limit: 20,
                    offset: 5
                }))
            } else
                list = React.createElement("div", {
                    className: "list-loading-whole"
                }, React.createElement("div", {
                    className: "list-loading"
                }));
            return React.createElement("div", {
                className: "p2p-account-table-whole"
            }, list)
        }
        ,
        AssetUplan.prototype.componentDidMount = function() {
            this.loadData("HOLD_PLAN", "uplanHoldingData")
        }
        ,
        AssetUplan.prototype.renderCommonDialog = function() {
            var props = this.props
              , message = this.state.commonMessage
              , status = this.state.commonStatus
              , dialogProps = $.extend({}, props, {
                onRequestClose: this.closeCommonDialog,
                status: status,
                message: message
            });
            return React.createElement(RWeStatusDialog, dialogProps)
        }
        ,
        AssetUplan.prototype.closeCommonDialog = function() {
            this.setState({
                showCommonDialog: !1,
                isQuitOkDialog: 0
            });
            var status = this.state.commonStatus;
            0 == status && window.location.reload()
        }
        ,
        AssetUplan.prototype.closeRiskCommonDialog = function() {
            this.setState({
                showRiskCommonDialog: !1,
                isLoading: !1,
                pageRenewalClassName: "user-plan-button-orange"
            })
        }
        ,
        AssetUplan.prototype.handleResult = function(data) {
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
        AssetUplan.prototype.renderDialog = function() {
            var content = null
              , props = this.props
              , state = this.state;
            if (!state.showDialog)
                return content;
            var dialogType = state.dialogType
              , dialogProps = $.extend({}, props, {
                rolloverResultData: state.renewalData,
                onRequestClose: this.closeDialog,
                onRequestClose4OldUplan: this.onRequestClose4OldUplan,
                handleResult: this.handleResult,
                quitData: state.quitData,
                isQuitOkDialog: state.isQuitOkDialog,
                detailInfo: state.quitDetailInfo
            });
            switch (dialogType) {
            case 1:
                content = React.createElement(RUserUplanRenewalDialog, dialogProps);
                break;
            case 3:
                content = React.createElement(RUserUplanQuitDialog, dialogProps)
            }
            return content
        }
        ,
        AssetUplan.prototype.closeDialog = function() {
            this.setState({
                showDialog: !1,
                isQuitOkDialog: 0,
                quitDetailInfo: null
            })
        }
        ,
        AssetUplan.prototype.handleGoToDetail = function(link, e) {
            $(e.target).hasClass("stay-current-page") || (location.href = link)
        }
        ,
        AssetUplan.prototype.render = function() {
            var state = this.state
              , selected = state.selectedIndex
              , showCommonDialog = state.showCommonDialog
              , uplanNav = this.renderUplanNav()
              , dialog = this.renderDialog()
              , commomDialogDom = this.renderCommonDialog()
              , commomDialog = showCommonDialog ? commomDialogDom : null
              , riskCommonDialogDom = this.renderRiskCommonDialog();
            return React.createElement("div", null, React.createElement("div", {
                className: "p2p-account-uplan-tab-content"
            }, uplanNav, React.createElement("div", {
                className: 1 == selected ? "uplan-type-tab-content choice" : "uplan-type-tab-content"
            }, this.renderHolding()), React.createElement("div", {
                className: 2 == selected ? "uplan-type-tab-content choice" : "uplan-type-tab-content"
            }, this.renderExiting()), React.createElement("div", {
                className: 3 == selected ? "uplan-type-tab-content choice" : "uplan-type-tab-content"
            }, this.renderExited())), dialog, commomDialog, riskCommonDialogDom)
        }
        ,
        AssetUplan
    }(React.Component);
    AssetUplan.defaultProps = {
        selectedIndex: 1
    },
    module.exports = AssetUplan
});
;/*!/client/widget/account/p2p/wdg-tab-premium/wdg-tab-premium.jsx*/
define("user:widget/account/p2p/wdg-tab-premium/wdg-tab-premium.jsx", function(require, exports, module) {
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
      , List = require("common:widget/react-ui/RList/ListV2.0")
      , utils = require("common:widget/ui/utils/utils")
      , service = require("common:widget/ui/service/service-factory")
      , uplanService = service.getService("uplan")
      , PremiumRenewalDialog = (require("common:widget/react-ui/RWETooltip/RWETooltip"),
    require("user:widget/account/p2p/wdg-premium-renewal-dialog/wdg-premium-renewal-dialog"))
      , PremiumTransformDialog = require("uplan:widget/user/detail/RUserPremiumTransformDialog/RUserPremiumTransformDialog")
      , moment = require("common:node_modules/moment/moment")
      , $statistic = require("common:node_modules/glpb-components-common/src/index").weStatistic
      , AssetPreminum = function(_React$Component) {
        function AssetPreminum(props) {
            _classCallCheck(this, AssetPreminum),
            _React$Component.call(this, props),
            this.state = {
                selectedIndex: props.selectedIndex,
                uplanHoldingData: null,
                uplanHoldingStartNum: 0,
                uplanExitedData: null,
                uplanExitedStartNum: 0,
                holdLoaded: !1,
                exitedLoaded: !1,
                isLoading: !1,
                showRenewalDialog: !1,
                showPremiumTransformDialog: !1,
                subPointId: ""
            },
            this.showRenewalDialog = this.showRenewalDialog.bind(this),
            this.closeRenewalDialog = this.closeRenewalDialog.bind(this),
            this.showTransformDialog = this.showTransformDialog.bind(this),
            this.closeTransformDialog = this.closeTransformDialog.bind(this)
        }
        return _inherits(AssetPreminum, _React$Component),
        AssetPreminum.prototype.onTabRequestChange = function(index) {
            this.setState({
                selectedIndex: index
            }),
            2 != index || this.state.uplanExitedData || this.loadData("EXITED", "uplanExitedData")
        }
        ,
        AssetPreminum.prototype.renderUplanNav = function() {
            var state = this.state
              , props = this.props
              , selected = state.selectedIndex
              , statistics = props.preminumStatisticData;
            return React.createElement("ul", {
                className: "p2p-account-type-nav fn-clear"
            }, React.createElement("li", {
                className: 1 == selected ? "choice" : "",
                onClick: this.onTabRequestChange.bind(this, 1)
            }, React.createElement("a", {
                href: "javascript:"
            }, "服务中（", statistics.premiumCurrentPlanCount + statistics.premiumExitingCount, "）")), React.createElement("li", {
                className: 2 == selected ? "choice" : "",
                onClick: this.onTabRequestChange.bind(this, 2)
            }, React.createElement("a", {
                href: "javascript:"
            }, "已退出（", statistics.premiumExitCount, "）")))
        }
        ,
        AssetPreminum.prototype.createHoldingHead = function() {
            return React.createElement("dl", {
                className: "p2p-account-table-header fn-clear"
            }, React.createElement("dd", {
                className: "pl20 w200"
            }, "服务期数"), React.createElement("dd", {
                className: "pl20 w130"
            }, "扣费后年利率"), React.createElement("dd", {
                className: "pr20 w150 text-right"
            }, "出借本金"), React.createElement("dd", {
                className: "pr20 w130 text-right"
            }, "已获利息"), React.createElement("dd", {
                className: "pl20 w120"
            }, "投标次数"), React.createElement("dd", {
                className: "pl20 w120"
            }, "状态"), React.createElement("dd", {
                className: "text-center last w230"
            }, "操作"))
        }
        ,
        AssetPreminum.prototype.showRenewalDialog = function(subPointId) {
            this.setState({
                showRenewalDialog: !0,
                subPointId: subPointId
            })
        }
        ,
        AssetPreminum.prototype.closeRenewalDialog = function() {
            this.setState({
                showRenewalDialog: !1
            })
        }
        ,
        AssetPreminum.prototype.showTransformDialog = function(subPointId) {
            this.setState({
                showPremiumTransformDialog: !0,
                subPointId: subPointId
            }),
            $statistic.track("click_myPremiumList_toUplan_btn_pc")
        }
        ,
        AssetPreminum.prototype.closeTransformDialog = function() {
            this.setState({
                showPremiumTransformDialog: !1
            })
        }
        ,
        AssetPreminum.prototype.getPremiumListStatus = function(item) {
            return "EXTIED" == item.subPointStatus ? "已退出" : "EXITING" == item.subPointStatus ? "退出中" : 1 == item.premiumRolloverStatus ? "固定服务期" : 0 === item.lockingStatus ? "固定服务期" : "自由服务期"
        }
        ,
        AssetPreminum.prototype.createHoldingRow = function(item, index) {
            var _this = this
              , dlClassName = (this.props.toUPlanSwitch,
            "p2p-account-table-row fn-clear");
            index % 2 == 0 && (dlClassName += " light-black");
            var link = "/uplan/user/detail?financePlanId=" + item.planId + "&subPointId=" + item.subPointId + "&type=premium"
              , action = React.createElement("a", {
                className: "hover-btn font-orange",
                title: ""
            }, "查看");
            0 === item.premiumRolloverStatus ? (1 === item.canRollover && (action = React.createElement("a", {
                className: "hover-btn font-orange stay-current-page",
                title: "",
                onClick: this.showRenewalDialog.bind(this, item.subPointId)
            }, "转固定期")),
            item.premiumTransformLimit && 1 === item.lockingStatus && (0 === item.transformStatus ? 1 == item.canTransform && (action = React.createElement("div", null, React.createElement("a", {
                className: "hover-btn font-orange stay-current-page",
                title: "",
                onClick: this.showTransformDialog.bind(this, item.subPointId)
            }, "转至U享"), React.createElement("i", {
                className: "line"
            }, " "), React.createElement("a", {
                className: "hover-btn font-orange stay-current-page",
                title: "",
                onClick: this.showRenewalDialog.bind(this, item.subPointId)
            }, "转固定期"))) : action = React.createElement("a", {
                className: "disabled",
                href: "javascript:"
            }, "已转U享-", item.transformPeriod, "月"))) : action = React.createElement("a", {
                className: "disabled",
                href: "javascript:"
            }, "已转固定期");
            var expectedRateUplan = item.expectedRateUplan ? utils.fixFloat2(item.expectedRateUplan) : "0.00";
            return React.createElement("dl", {
                className: dlClassName,
                onClick: function(e) {
                    return _this.handleGoToDetail(link, e)
                },
                title: "点击查看详情"
            }, React.createElement("dd", {
                className: "pl20 w200"
            }, item.name), React.createElement("dd", {
                className: "pl20 w130"
            }, expectedRateUplan, "%"), React.createElement("dd", {
                className: "pr20 w150 text-right"
            }, utils.commaFloat(item.finalAmount), "元"), React.createElement("dd", {
                className: "pr20 w130 text-right"
            }, utils.commaFloat(item.totalEarnInterest), "元"), React.createElement("dd", {
                className: "pl20 w120"
            }, item.bidLoanCount, "次"), React.createElement("dd", {
                className: "pl20 w120"
            }, this.getPremiumListStatus(item)), React.createElement("dd", {
                className: "text-center last w230"
            }, action))
        }
        ,
        AssetPreminum.prototype.createExitedHead = function() {
            return React.createElement("dl", {
                className: "p2p-account-table-header fn-clear"
            }, React.createElement("dd", {
                className: "pl20 w200"
            }, "服务期数"), React.createElement("dd", {
                className: "pl20 w140"
            }, "扣费后年利率"), React.createElement("dd", {
                className: "pl20 w170"
            }, "出借本金"), React.createElement("dd", {
                className: "pl20 w160"
            }, "已获利息"), React.createElement("dd", {
                className: "pl20 w140"
            }, "投标次数"), React.createElement("dd", {
                className: "pl20 w130"
            }, "完成时间"), React.createElement("dd", {
                className: "pl20 w140 last"
            }, "退出途径"))
        }
        ,
        AssetPreminum.prototype.createExitedRow = function(item, index) {
            var _this2 = this
              , dlClassName = "p2p-account-table-row fn-clear";
            index % 2 == 0 && (dlClassName += " light-black");
            var link = "/uplan/user/detail?financePlanId=" + item.planId + "&subPointId=" + item.subPointId + "&type=premium"
              , finishDate = item.finishTime ? moment(item.finishTime).format("YYYY-MM-DD") : "--"
              , quitWay = utils.premiumQuitWay(item.quitWay)
              , expectedRateUplan = item.expectedRateUplan ? utils.fixFloat2(item.expectedRateUplan) : "0.00";
            return React.createElement("dl", {
                className: dlClassName,
                onClick: function(e) {
                    return _this2.handleGoToDetail(link, e)
                },
                title: "点击查看详情"
            }, React.createElement("dd", {
                className: "pl20 w200"
            }, item.name), React.createElement("dd", {
                className: "pl20 w140"
            }, expectedRateUplan, "%"), React.createElement("dd", {
                className: "pl20 w170"
            }, utils.commaFloat(item.finalAmount), "元"), React.createElement("dd", {
                className: "pl20 w160"
            }, utils.commaFloat(item.totalEarnInterest), "元"), React.createElement("dd", {
                className: "pl20 w140"
            }, item.bidLoanCount, "次"), React.createElement("dd", {
                className: "pl20 w130"
            }, finishDate), React.createElement("dd", {
                className: "pl20 w140 last"
            }, quitWay))
        }
        ,
        AssetPreminum.prototype.handleUpdateHolding = function(data, startNum) {
            this.setState({
                uplanHoldingData: data,
                uplanHoldingStartNum: startNum
            })
        }
        ,
        AssetPreminum.prototype.handleUpdateExited = function(data, startNum) {
            this.setState({
                uplanExitedData: data,
                uplanExitedStartNum: startNum
            })
        }
        ,
        AssetPreminum.prototype.loadData = function(planType, data) {
            var _this3 = this
              , paramData = {
                type: planType,
                startNum: 0,
                limit: 20
            };
            uplanService.getUserPremiumList(paramData).then(function(out) {
                var _setState;
                if (out.requestStatus !== uplanService.STATUS.ERROR) {
                    var rsp = out.data;
                    _this3.setState((_setState = {},
                    _setState[data] = rsp,
                    _setState))
                }
            })
        }
        ,
        AssetPreminum.prototype.renderHolding = function() {
            var state = this.state
              , data = state.uplanHoldingData
              , startNum = state.uplanHoldingStartNum
              , list = null;
            if (data) {
                var ajaxParams = {
                    type: "HOLDING"
                };
                list = React.createElement(List, _extends({}, data, {
                    moudleServiceName: "uplan",
                    url: "getUserPremiumList",
                    ajaxParams: ajaxParams,
                    isHeadNeed: "yes",
                    isHeadNeedOrder: "no",
                    createHeadDom: this.createHoldingHead,
                    createRowDom: this.createHoldingRow.bind(this),
                    updateTheData: this.handleUpdateHolding.bind(this),
                    noDataText: "没有服务中的优选服务",
                    startNum: startNum,
                    limit: 20,
                    offset: 5
                }))
            } else
                list = React.createElement("div", {
                    className: "list-loading-whole"
                }, React.createElement("div", {
                    className: "list-loading"
                }));
            return React.createElement("div", {
                className: "p2p-account-table-whole"
            }, list)
        }
        ,
        AssetPreminum.prototype.renderExited = function() {
            var state = this.state
              , data = state.uplanExitedData
              , startNum = state.uplanExitedStartNum
              , list = null;
            if (data) {
                var ajaxParams = {
                    type: "EXITED"
                };
                list = React.createElement(List, _extends({}, data, {
                    moudleServiceName: "uplan",
                    url: "getUserPremiumList",
                    ajaxParams: ajaxParams,
                    isHeadNeed: "yes",
                    isHeadNeedOrder: "no",
                    createHeadDom: this.createExitedHead,
                    createRowDom: this.createExitedRow.bind(this),
                    updateTheData: this.handleUpdateExited.bind(this),
                    noDataText: "没有已退出的优选服务",
                    startNum: startNum,
                    limit: 20,
                    offset: 5
                }))
            } else
                list = React.createElement("div", {
                    className: "list-loading-whole"
                }, React.createElement("div", {
                    className: "list-loading"
                }));
            return React.createElement("div", {
                className: "p2p-account-table-whole"
            }, list)
        }
        ,
        AssetPreminum.prototype.componentDidMount = function() {
            this.loadData("HOLDING", "uplanHoldingData")
        }
        ,
        AssetPreminum.prototype.handleGoToDetail = function(link, e) {
            $(e.target).hasClass("stay-current-page") || (location.href = link)
        }
        ,
        AssetPreminum.prototype.render = function() {
            var state = this.state
              , selected = state.selectedIndex
              , uplanNav = this.renderUplanNav()
              , renewalDialog = state.showRenewalDialog ? React.createElement(PremiumRenewalDialog, {
                subPointId: state.subPointId,
                closeRenewalDialog: this.closeRenewalDialog.bind(this)
            }) : null
              , transformDial = state.showPremiumTransformDialog ? React.createElement(PremiumTransformDialog, {
                subPointId: state.subPointId,
                closeTransformDialog: this.closeTransformDialog
            }) : null;
            return React.createElement("div", null, React.createElement("div", {
                className: "p2p-account-uplan-tab-content"
            }, uplanNav, React.createElement("div", {
                className: 1 == selected ? "uplan-type-tab-content choice" : "uplan-type-tab-content"
            }, this.renderHolding()), React.createElement("div", {
                className: 2 == selected ? "uplan-type-tab-content choice" : "uplan-type-tab-content"
            }, this.renderExited())), renewalDialog, transformDial)
        }
        ,
        AssetPreminum
    }(React.Component);
    AssetPreminum.defaultProps = {
        selectedIndex: 1
    },
    module.exports = AssetPreminum
});
;/*!/client/widget/account/p2p/wdg-tab-main/wdg-tab-main.jsx*/
define("user:widget/account/p2p/wdg-tab-main/wdg-tab-main.jsx", function(require, exports, module) {
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
      , AssetUplan = require("user:widget/account/p2p/wdg-tab-uplan/wdg-tab-uplan.jsx")
      , AssetAutoInvest = require("user:widget/account/p2p/wdg-tab-autoinvest/wdg-tab-autoinvest.jsx")
      , AssetPremium = require("user:widget/account/p2p/wdg-tab-premium/wdg-tab-premium.jsx")
      , AssetLoan = require("user:widget/account/p2p/wdg-tab-loan/wdg-tab-loan.jsx")
      , P2pAccountTab = function(_React$Component) {
        function P2pAccountTab(props) {
            _classCallCheck(this, P2pAccountTab),
            _React$Component.call(this, props),
            this.state = {
                selectedIndex: 0,
                preminumSelected: !1,
                autoInvestSelected: !1,
                loanSelected: !1
            }
        }
        return _inherits(P2pAccountTab, _React$Component),
        P2pAccountTab.prototype.componentDidMount = function() {}
        ,
        P2pAccountTab.prototype.onTabRequestChange = function(index) {
            this.setState({
                selectedIndex: index
            }),
            1 == index && this.setState({
                preminumSelected: !0
            }),
            2 == index && this.setState({
                autoInvestSelected: !0
            }),
            3 == index && this.setState({
                loanSelected: !0
            })
        }
        ,
        P2pAccountTab.prototype.render = function() {
            var state = this.state
              , selected = state.selectedIndex;
            return React.createElement("div", null, React.createElement(RTabs, {
                ref: "tab",
                className: "p2p-account-tab-main",
                onRequestChange: this.onTabRequestChange.bind(this),
                selectedIndex: selected
            }, React.createElement(TabNav, {
                className: "p2p-account-tab"
            }, React.createElement(TabNavItem, null, React.createElement("span", null, "优选"), React.createElement("i", null)), React.createElement(TabNavItem, null, React.createElement("span", null, "U享"), React.createElement("i", null)), React.createElement(TabNavItem, null, React.createElement("span", null, "薪享"), React.createElement("i", null)), React.createElement(TabNavItem, null, React.createElement("span", null, "散标债权"), React.createElement("i", null))), React.createElement(TabPanel, null, React.createElement(TabPanelItem, {
                className: "p2p-type-table"
            }, React.createElement(AssetPremium, {
                toUPlanSwitch: !0,
                preminumSelected: state.preminumSelected,
                preminumStatisticData: this.props.userData.premiumStatisticData
            })), React.createElement(TabPanelItem, {
                className: "p2p-type-table"
            }, React.createElement(AssetUplan, {
                uplanStatisticData: this.props.userData.uplanStatisticData
            })), React.createElement(TabPanelItem, {
                className: "p2p-type-table"
            }, React.createElement(AssetAutoInvest, {
                username: this.props.userData.userName,
                autoInvestSelected: state.autoInvestSelected
            })), React.createElement(TabPanelItem, {
                className: "p2p-type-table"
            }, React.createElement(AssetLoan, {
                loanSelected: state.loanSelected,
                loanStatisticData: this.props.userData.loanStatisticData
            })))))
        }
        ,
        P2pAccountTab
    }(React.Component);
    module.exports = P2pAccountTab
});
;/*!/client/widget/account/p2p/wdg-tab-monthly/wdg-tab-monthly.jsx*/
define("user:widget/account/p2p/wdg-tab-monthly/wdg-tab-monthly.jsx", function(require, exports, module) {
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
      , List = require("common:widget/react-ui/RList/ListV2.0")
      , service = require("common:widget/ui/service/service-factory")
      , p2pService = service.getService("p2p")
      , utils = require("common:widget/ui/utils/utils")
      , RWeStatusDialog = require("common:widget/react-ui/RWeStatusDialog/RWeStatusDialog")
      , RWeDialog = require("common:widget/react-ui/RWeDialog/RWeDialog")
      , AssetMonthly = function(_React$Component) {
        function AssetMonthly(props) {
            _classCallCheck(this, AssetMonthly),
            _React$Component.call(this, props),
            this.state = {
                selectedIndex: props.selectedIndex,
                monthlyHoldingData: null,
                monthlyHoldingStartNum: 0,
                monthlyExitingData: null,
                monthlyExitingStartNum: 0,
                monthlyExitedData: null,
                monthlyExitedStartNum: 0,
                holdLoaded: !1,
                exitingLoaded: !1,
                exitedLoaded: !1,
                showCancelQuitDialog: !1,
                showCommonDialog: !1,
                commonStatus: -1,
                commonMessage: "",
                flag: !1
            },
            this.closeCommonDialog = this.closeCommonDialog.bind(this),
            this.hideCancelQuitDialog = this.hideCancelQuitDialog.bind(this)
        }
        return _inherits(AssetMonthly, _React$Component),
        AssetMonthly.prototype.onTabRequestChange = function(index) {
            this.setState({
                selectedIndex: index
            }),
            2 != index || this.state.monthlyExitingData || this.loadData(2, "monthlyExitingData"),
            3 != index || this.state.monthlyExitedData || this.loadData(1, "monthlyExitedData")
        }
        ,
        AssetMonthly.prototype.handleUpdateHandleMonthly = function(data, startNum) {
            this.setState({
                monthlyHoldingData: data,
                monthlyHoldingStartNum: startNum
            })
        }
        ,
        AssetMonthly.prototype.handleUpdateHandleExiting = function(data, startNum) {
            this.setState({
                monthlyExitingData: data,
                monthlyExitingStartNum: startNum
            })
        }
        ,
        AssetMonthly.prototype.handleUpdateHandleExited = function(data, startNum) {
            this.setState({
                monthlyExitedData: data,
                monthlyExitedStartNum: startNum
            })
        }
        ,
        AssetMonthly.prototype.handleCancelQuit = function(subPointId, link, ele) {
            var _this = this;
            if (1 != this.state.flag) {
                var srcEle = $(ele.target);
                srcEle.hasClass("J_cancelQuit") && $.ajax({
                    url: "/p2p/monthrise/out",
                    type: "get",
                    data: {
                        subPointId: subPointId,
                        type: 1
                    },
                    dataType: "json",
                    beforeSend: function() {
                        srcEle.addClass("loading-btn"),
                        _this.setState({
                            flag: !0
                        })
                    },
                    success: function(data) {
                        0 == data.status ? (this.setState({
                            showCancelQuitDialog: !0
                        }),
                        srcEle.removeClass("loading-btn"),
                        srcEle.attr({
                            "class": "",
                            href: link
                        }).text("查看")) : (this.setState({
                            showCommonDialog: !0,
                            commonStatus: -1,
                            commonMessage: data.message
                        }),
                        srcEle.removeClass("loading-btn")),
                        this.setState({
                            flag: !1
                        })
                    }
                    .bind(this),
                    error: function() {
                        srcEle.removeClass("loading-btn"),
                        _this.setState({
                            showCommonDialog: !0,
                            commonStatus: -1,
                            commonMessage: "取消失败",
                            flag: !1
                        })
                    }
                })
            }
        }
        ,
        AssetMonthly.prototype.renderCommonDialog = function() {
            var props = this.props
              , message = this.state.commonMessage
              , status = this.state.commonStatus
              , dialogProps = $.extend({}, props, {
                onRequestClose: this.closeCommonDialog,
                status: status,
                message: message
            });
            return React.createElement(RWeStatusDialog, dialogProps)
        }
        ,
        AssetMonthly.prototype.closeCommonDialog = function() {
            this.setState({
                showCommonDialog: !1
            });
            var status = this.state.commonStatus;
            0 == status && window.location.reload()
        }
        ,
        AssetMonthly.prototype.renderMonthlyNav = function() {
            var state = this.state
              , props = this.props
              , selected = state.selectedIndex
              , statistics = props.monthlyStatisticData;
            return React.createElement("ul", {
                className: "p2p-account-type-nav fn-clear"
            }, React.createElement("li", {
                className: 1 == selected ? "choice" : "",
                onClick: this.onTabRequestChange.bind(this, 1)
            }, React.createElement("a", {
                href: "javascript:"
            }, "持有中（", statistics.UPLAN_NEW_INPROGRESS_COUNT, "）")), React.createElement("li", {
                className: 2 == selected ? "choice" : "",
                onClick: this.onTabRequestChange.bind(this, 2)
            }, React.createElement("a", {
                href: "javascript:"
            }, "退出中（", statistics.UPLAN_NEW_EXITING_COUNT, "）")), React.createElement("li", {
                className: 3 == selected ? "choice" : "",
                onClick: this.onTabRequestChange.bind(this, 3)
            }, React.createElement("a", {
                href: "javascript:"
            }, "已退出（", statistics.UPLAN_NEW_EXITED_COUNT, "）")))
        }
        ,
        AssetMonthly.prototype.createHoldingHead = function() {
            return React.createElement("dl", {
                className: "p2p-account-table-header fn-clear"
            }, React.createElement("dd", {
                className: "pl20 w180"
            }, "月升计划名称"), React.createElement("dd", {
                className: "pl20 w130"
            }, "已持有时间"), React.createElement("dd", {
                className: "pl20 w160"
            }, "加入金额"), React.createElement("dd", {
                className: "pl20 w150"
            }, "已获利息回报"), React.createElement("dd", {
                className: "pl20 w170"
            }, "当月扣费后年利率"), React.createElement("dd", {
                className: "pl20 w170"
            }, "下月扣费后年利率"), React.createElement("dd", {
                className: "text-center last w120"
            }, " "))
        }
        ,
        AssetMonthly.prototype.createHoldingRow = function(item, index) {
            var dlClassName = "p2p-account-table-row fn-clear";
            index % 2 == 0 && (dlClassName += " light-black");
            var link = "/p2p/monthrise/detail?planId=" + item.id + "&subPointId=" + item.subPointId
              , action = null;
            if (1 == item.isApplyQuit) {
                {
                    var currentTime = new Date(item.currentTime)
                      , quitTime = new Date(item.quitTime)
                      , flag = quitTime.getFullYear() == currentTime.getFullYear() && quitTime.getMonth() == currentTime.getMonth() && quitTime.getDate() == currentTime.getDate();
                    "cancelBtn" + item.subPointId
                }
                action = flag ? React.createElement("a", {
                    className: "unClick"
                }, "取消退出") : React.createElement("a", {
                    className: "hover-btn J_cancelQuit",
                    href: "javascript:",
                    onClick: this.handleCancelQuit.bind(this, item.subPointId, link)
                }, "取消退出")
            } else
                action = React.createElement("a", {
                    className: "hover-btn",
                    href: link
                }, "查看");
            return React.createElement("dl", {
                className: dlClassName
            }, React.createElement("dd", {
                className: "pl20 w180"
            }, React.createElement("a", {
                title: item.name,
                href: link
            }, item.name)), React.createElement("dd", {
                className: "pl20 w130"
            }, item.holdMonths, "个月"), React.createElement("dd", {
                className: "pl20 w160"
            }, utils.commaFloat(item.amount), "元"), React.createElement("dd", {
                className: "pl20 w150"
            }, utils.commaFloat(item.totalEarnInterest), "元"), React.createElement("dd", {
                className: "pl20 w170"
            }, parseFloat(item.currentRate).toFixed(1), "%"), React.createElement("dd", {
                className: "pl20 w170"
            }, item.nextRate && item.nextRate > 0 ? parseFloat(item.nextRate).toFixed(1) + "%" : "--"), React.createElement("dd", {
                className: "text-center last w120 font-light-orange"
            }, action))
        }
        ,
        AssetMonthly.prototype.createExitingHead = function() {
            return React.createElement("dl", {
                className: "p2p-account-table-header fn-clear"
            }, React.createElement("dd", {
                className: "pl20 w310"
            }, "月升计划名称"), React.createElement("dd", {
                className: "pl20 w280"
            }, "加入金额"), React.createElement("dd", {
                className: "pl20 w280"
            }, "已转让债权金额"), React.createElement("dd", {
                className: "last pl20 w210"
            }, "待转让债权金额"))
        }
        ,
        AssetMonthly.prototype.createExitingRow = function(item, index) {
            var dlClassName = "p2p-account-table-row fn-clear";
            index % 2 == 0 && (dlClassName += " light-black");
            var link = "/p2p/monthrise/detail?planId=" + item.id + "&subPointId=" + item.subPointId;
            return React.createElement("dl", {
                className: dlClassName
            }, React.createElement("dd", {
                className: "pl20 w310"
            }, React.createElement("a", {
                title: item.name,
                href: link
            }, item.name)), React.createElement("dd", {
                className: "pl20 w280"
            }, utils.commaFloat(item.amount), "元"), React.createElement("dd", {
                className: "pl20 w280"
            }, utils.commaFloat(item.transferredValue), "元"), React.createElement("dd", {
                className: "last pl20 w210"
            }, utils.commaFloat(item.remainedValue), "元"))
        }
        ,
        AssetMonthly.prototype.createExitedHead = function() {
            return React.createElement("dl", {
                className: "p2p-account-table-header fn-clear"
            }, React.createElement("dd", {
                className: "pl20 w240"
            }, "月升计划名称"), React.createElement("dd", {
                className: "pl20 w210"
            }, "加入金额"), React.createElement("dd", {
                className: "pl20 w220"
            }, "已获利息回报"), React.createElement("dd", {
                className: "pl20 w220"
            }, "退出时持有时间"), React.createElement("dd", {
                className: "last pl20 w190"
            }, "退出处理时间"))
        }
        ,
        AssetMonthly.prototype.createExitedRow = function(item, index) {
            var dlClassName = "p2p-account-table-row fn-clear";
            index % 2 == 0 && (dlClassName += " light-black");
            var link = "/p2p/monthrise/detail?planId=" + item.id + "&subPointId=" + item.subPointId;
            return React.createElement("dl", {
                className: dlClassName
            }, React.createElement("dd", {
                className: "pl20 w240"
            }, React.createElement("a", {
                title: item.name,
                href: link
            }, item.name)), React.createElement("dd", {
                className: "pl20 w210"
            }, utils.commaFloat(item.amount), "元"), React.createElement("dd", {
                className: "pl20 w220"
            }, utils.commaFloat(item.totalEarnInterest), "元"), React.createElement("dd", {
                className: "pl20 w220"
            }, item.holdMonths, "个月"), React.createElement("dd", {
                className: "last pl20 w190"
            }, utils.formatYearMonthDate(new Date(item.quitTime))))
        }
        ,
        AssetMonthly.prototype.loadData = function(status, data) {
            var _this2 = this
              , paramData = {
                status: status,
                startNum: 0,
                limit: 20
            };
            p2pService.getUserMonthlyList(paramData).then(function(out) {
                var _setState;
                if (out.requestStatus !== p2pService.STATUS.ERROR) {
                    var rsp = out.data;
                    _this2.setState((_setState = {},
                    _setState[data] = rsp,
                    _setState))
                }
            })
        }
        ,
        AssetMonthly.prototype.renderHolding = function() {
            var state = this.state
              , data = state.monthlyHoldingData
              , startNum = this.state.monthlyHoldingStartNum
              , list = null;
            if (data) {
                var ajaxParams = {
                    status: 0
                };
                list = React.createElement(List, _extends({}, data, {
                    moudleServiceName: "p2p",
                    url: "getUserMonthlyList",
                    ajaxParams: ajaxParams,
                    isHeadNeed: "yes",
                    isHeadNeedOrder: "no",
                    createHeadDom: this.createHoldingHead,
                    createRowDom: this.createHoldingRow.bind(this),
                    updateTheData: this.handleUpdateHandleMonthly.bind(this),
                    noDataText: "没有持有中的月升计划",
                    startNum: startNum,
                    limit: 20,
                    offset: 5
                }))
            } else
                list = React.createElement("div", {
                    className: "list-loading-whole"
                }, React.createElement("div", {
                    className: "list-loading"
                })),
                this.loadData(0, "monthlyHoldingData");
            return React.createElement("div", {
                className: "p2p-account-table-whole"
            }, list)
        }
        ,
        AssetMonthly.prototype.renderExiting = function() {
            var state = this.state
              , data = state.monthlyExitingData
              , startNum = this.state.monthlyExitingStartNum
              , list = null;
            if (data) {
                var ajaxParams = {
                    status: 2
                };
                list = React.createElement(List, _extends({}, data, {
                    moudleServiceName: "p2p",
                    url: "getUserMonthlyList",
                    ajaxParams: ajaxParams,
                    isHeadNeed: "yes",
                    isHeadNeedOrder: "no",
                    createHeadDom: this.createExitingHead,
                    createRowDom: this.createExitingRow,
                    updateTheData: this.handleUpdateHandleExiting.bind(this),
                    noDataText: "没有退出中的月升计划",
                    startNum: startNum,
                    limit: 20,
                    offset: 5
                }))
            } else
                list = React.createElement("div", {
                    className: "list-loading-whole"
                }, React.createElement("div", {
                    className: "list-loading"
                }));
            return React.createElement("div", {
                className: "p2p-account-table-whole"
            }, list)
        }
        ,
        AssetMonthly.prototype.renderExited = function() {
            var state = this.state
              , data = state.monthlyExitedData
              , startNum = this.state.monthlyExitedStartNum
              , list = null;
            if (data) {
                var ajaxParams = {
                    status: 1
                };
                list = React.createElement(List, _extends({}, data, {
                    moudleServiceName: "p2p",
                    url: "getUserMonthlyList",
                    ajaxParams: ajaxParams,
                    isHeadNeed: "yes",
                    isHeadNeedOrder: "no",
                    createHeadDom: this.createExitedHead,
                    createRowDom: this.createExitedRow,
                    updateTheData: this.handleUpdateHandleExited.bind(this),
                    noDataText: "没有已退出的月升计划",
                    startNum: startNum,
                    limit: 20,
                    offset: 5
                }))
            } else
                list = React.createElement("div", {
                    className: "list-loading-whole"
                }, React.createElement("div", {
                    className: "list-loading"
                }));
            return React.createElement("div", {
                className: "p2p-account-table-whole"
            }, list)
        }
        ,
        AssetMonthly.prototype.hideCancelQuitDialog = function() {
            this.setState({
                showCancelQuitDialog: !1
            })
        }
        ,
        AssetMonthly.prototype.renderCancelQuitDialog = function() {
            var show = this.state.showCancelQuitDialog;
            if (!show)
                return null;
            var weProps = {
                showing: show,
                title: "提示",
                onRequestClose: this.hideCancelQuitDialog,
                dialog: {
                    className: "wdg-monthly-cancel-tips",
                    style: {
                        width: 400
                    }
                }
            };
            return React.createElement("div", {
                className: "p2p-account-list-dialog"
            }, React.createElement(RWeDialog, weProps, React.createElement("div", {
                className: "wdg-monthly-cancel-tips-text"
            }, " 您已取消该期月升计划退出申请 ")))
        }
        ,
        AssetMonthly.prototype.render = function() {
            var props = this.props
              , state = this.state
              , selected = state.selectedIndex
              , initHoldingList = null
              , showCommonDialog = this.state.showCommonDialog
              , monthlyNav = this.renderMonthlyNav();
            props.monthlySelected && (initHoldingList = this.renderHolding());
            var commomDialogDom = this.renderCommonDialog()
              , commomDialog = showCommonDialog ? commomDialogDom : null
              , cancelQuitDialog = this.renderCancelQuitDialog();
            return React.createElement("div", {
                className: "p2p-account-monthly-tab-content"
            }, monthlyNav, React.createElement("div", {
                className: 1 == selected ? "monthly-type-tab-content choice" : "monthly-type-tab-content"
            }, initHoldingList), React.createElement("div", {
                className: 2 == selected ? "monthly-type-tab-content choice" : "monthly-type-tab-content"
            }, this.renderExiting()), React.createElement("div", {
                className: 3 == selected ? "monthly-type-tab-content choice" : "monthly-type-tab-content"
            }, this.renderExited()), commomDialog, cancelQuitDialog)
        }
        ,
        AssetMonthly
    }(React.Component);
    AssetMonthly.defaultProps = {
        selectedIndex: 1
    },
    module.exports = AssetMonthly
});
;/*!/client/widget/account/p2p/wdg-total-asset/wdg-total-asset.jsx*/
define("user:widget/account/p2p/wdg-total-asset/wdg-total-asset.jsx", function(require, exports, module) {
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
      , $statistic = require("common:node_modules/glpb-components-common/src/index").weStatistic
      , P2pTotalAsset = function(_React$Component) {
        function P2pTotalAsset() {
            _classCallCheck(this, P2pTotalAsset),
            _React$Component.apply(this, arguments)
        }
        return _inherits(P2pTotalAsset, _React$Component),
        P2pTotalAsset.prototype.clickNewUserActivity = function() {
            $statistic.eventRaw({
                eventId: "pc_account_page_click_raise_rate_link",
                extra: {}
            })
        }
        ,
        P2pTotalAsset.prototype.render = function() {
            if (!this.props.p2pAssetData)
                return null;
            var _props$p2pAssetData = this.props.p2pAssetData
              , asset = _props$p2pAssetData.asset
              , pointAvailable = _props$p2pAssetData.pointAvailable
              , pointFrozen = _props$p2pAssetData.pointFrozen
              , balanceData = this.props.balanceData
              , tooltipProps_p2p_balance = {
                id: "user-account-tooltip-p2p-balance",
                place: "right",
                tip: "\n                    可用金额" + utils.commaFloat(balanceData.availablePoints) + "元<br>\n                    冻结金额" + utils.commaFloat(balanceData.frozenPoints) + "元\n                ",
                delayHide: 100
            };
            asset = utils.commaFloat(asset);
            var accountBalance = utils.commaFloat(parseFloat(pointAvailable || 0) + parseFloat(pointFrozen || 0))
              , bindCardSupportCMBC = this.props.bindCardSupportCMBC
              , supportCMBCDom = "";
            return 2 == bindCardSupportCMBC.status && (supportCMBCDom = React.createElement("a", {
                className: "new-user-activity-box",
                href: "//www.renrendai.com/help/account/58748a782b30150e3fcc79f0",
                title: "充值方式特殊说明",
                target: "_blank",
                onClick: this.clickNewUserActivity
            }, React.createElement("img", {
                className: "word-bg",
                src: "//www.renrendai.com/cms/5864b0d6a24d131067ef7956/trade/index/bank_special_desc_bg.png",
                alt: ""
            }), React.createElement("p", {
                className: "new-user-activity"
            }, bindCardSupportCMBC.bankName, "充值方式特殊说明 > "))),
            React.createElement("ul", {
                className: "p2p-index-total-asset fn-clear"
            }, React.createElement("li", {
                className: "p2p-border-right"
            }, React.createElement("div", {
                className: "asset-num"
            }, asset, React.createElement("em", null, "元")), React.createElement("h3", null, "P2P总资产")), React.createElement("li", {
                className: "p2p-border-right"
            }, React.createElement("div", {
                className: "asset-num"
            }, accountBalance, React.createElement("em", null, "元 ", React.createElement(RWETooltip, tooltipProps_p2p_balance))), React.createElement("h3", null, "账户余额")), React.createElement("li", {
                className: "p2p-btn fn-clear"
            }, React.createElement("a", {
                className: "p2p-recharge",
                href: "/user/trade/recharge"
            }, "充值"), React.createElement("a", {
                className: "p2p-withdraw",
                href: "/user/trade/withdraw"
            }, "提现"), supportCMBCDom))
        }
        ,
        P2pTotalAsset
    }(React.Component);
    module.exports = P2pTotalAsset
});
;/*!/client/widget/account/returnsRecord/list/RList.js*/
define("user:widget/account/returnsRecord/list/RList.js", function(require, exports, module) {
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
      , List = (require("common:node_modules/react-dom/index"),
    require("common:widget/ui/utils/utils"),
    require("common:widget/react-ui/RList/List"))
      , service = require("common:widget/ui/service/service-factory")
      , moment = (service.getService("user"),
    require("common:node_modules/moment/moment"))
      , ReturnRecordListItem = function(_React$Component) {
        function ReturnRecordListItem(props) {
            _classCallCheck(this, ReturnRecordListItem),
            _React$Component.call(this, props),
            this.state = {}
        }
        return _inherits(ReturnRecordListItem, _React$Component),
        ReturnRecordListItem.prototype.createRowDom = function(item) {
            var hrefUrl = "/loan-" + item.loanId + ".html";
            return item.first ? React.createElement("div", {
                className: "return-record-list-item fn-clear"
            }, React.createElement("div", {
                className: "year-month"
            }, moment(item.date).format("YYYY年MM月")), React.createElement("div", {
                className: "fn-clear"
            }, React.createElement("p", {
                className: "return-time"
            }, moment(item.dateString).format("MM-DD")), React.createElement("p", {
                className: "return-type"
            }, item.type, "（", React.createElement("a", {
                target: "_blank",
                href: hrefUrl
            }, item.loanId), "）"), React.createElement("p", {
                className: "return-num",
                title: item.note
            }, item.note))) : React.createElement("div", {
                className: "return-record-list-item fn-clear"
            }, React.createElement("p", {
                className: "return-time"
            }, moment(item.dateString).format("MM-DD")), React.createElement("p", {
                className: "return-type"
            }, item.type, "（", React.createElement("a", {
                target: "_blank",
                href: hrefUrl
            }, item.loanId), "）"), React.createElement("p", {
                className: "return-num",
                title: item.note
            }, item.note))
        }
        ,
        ReturnRecordListItem.prototype.render = function() {
            var data = this.props.data
              , ajaxParams = {
                backStatus: this.props.backStatus,
                backStartTime: this.props.backStartTime,
                backEndTime: this.props.backEndTime,
                range: this.props.range
            };
            return React.createElement("div", {
                className: "return-record-list"
            }, React.createElement(List, _extends({}, data, {
                moudleServiceName: "user",
                url: "getReturnsRecordList",
                ajaxParams: ajaxParams,
                isHeadNeed: "no",
                isHeadNeedOrder: "no",
                createRowDom: this.createRowDom,
                startNum: 0,
                limit: 10,
                offset: 5
            })))
        }
        ,
        ReturnRecordListItem
    }(React.Component);
    module.exports = ReturnRecordListItem
});
;/*!/client/widget/account/returnsRecord/list/RListInfo.js*/
define("user:widget/account/returnsRecord/list/RListInfo.js", function(require, exports, module) {
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
      , $ = (require("common:node_modules/react-dom/index"),
    require("common:widget/lib/jquery/jquery"))
      , LayDate = require("common:widget/lib/laydate/laydate.dev")
      , RWeDialog = require("common:widget/react-ui/RWeDialog/RWeDialog")
      , ReturnRecordListItem = require("user:widget/account/returnsRecord/list/RList")
      , service = require("common:widget/ui/service/service-factory")
      , userService = service.getService("user")
      , numeral = require("common:node_modules/numeral/numeral")
      , ReturnRecordList = function(_React$Component) {
        function ReturnRecordList(props) {
            _classCallCheck(this, ReturnRecordList),
            _React$Component.call(this, props),
            this.state = {
                yearArr: this.props.yearArr,
                data: this.props.result,
                backStatus: this.props.backStatus,
                backStartTime: this.props.backStartTime,
                backEndTime: this.props.backEndTime,
                result: this.props.result,
                range: null,
                key: null,
                tipText: null,
                dialogShowing: !1
            },
            this.filterWaitHandleClick = this.filterWaitHandleClick.bind(this),
            this.filterAlreadyHandleClick = this.filterAlreadyHandleClick.bind(this)
        }
        return _inherits(ReturnRecordList, _React$Component),
        ReturnRecordList.prototype.componentDidMount = function() {
            var _this = this;
            new LayDate({
                elem: "#back-start-time",
                min: "2010-01-01",
                selectDayCallBackFn: function() {
                    var backStartTime = $("#back-start-time").val()
                      , backEndTime = $("#back-end-time").val();
                    _this.loadData("BACK_UNREP", backStartTime, backEndTime)
                }
            }),
            new LayDate({
                elem: "#back-end-time",
                min: "2010-01-01",
                selectDayCallBackFn: function() {
                    var backStartTime = $("#back-start-time").val()
                      , backEndTime = $("#back-end-time").val();
                    _this.loadData("BACK_UNREP", backStartTime, backEndTime)
                }
            })
        }
        ,
        ReturnRecordList.prototype.showWeDialog = function(tipText) {
            this.setState({
                dialogShowing: !0,
                tipText: tipText
            })
        }
        ,
        ReturnRecordList.prototype.hideWeDialog = function() {
            this.setState({
                dialogShowing: !1
            })
        }
        ,
        ReturnRecordList.prototype.filterWaitHandleClick = function() {
            var backStartTime = this.props.backStartTime
              , backEndTime = this.props.backEndTime;
            this.loadData("BACK_UNREP", backStartTime, backEndTime)
        }
        ,
        ReturnRecordList.prototype.filterAlreadyHandleClick = function() {
            this.loadData("BACK_REP", this.state.backStartTime, this.state.backEndTime, "ONE_MONTH", "最近1个月")
        }
        ,
        ReturnRecordList.prototype.filterAlreadyMonthHandleClick = function(e, _this) {
            var $this = _this
              , time = parseInt(e.item.replace(/[^\d]/g, ""))
              , backStartTime = void 0
              , backEndTime = void 0
              , range = void 0;
            switch (time) {
            case 1:
                backStartTime = backEndTime = null,
                range = "ONE_MONTH";
                break;
            case 3:
                backStartTime = backEndTime = null,
                range = "THREE_MONTHS";
                break;
            case 6:
                backStartTime = backEndTime = null,
                range = "HALF_YEAR";
                break;
            case 12:
                backStartTime = backEndTime = null,
                range = "ONE_YEAR";
                break;
            default:
                backStartTime = time + "-01-01",
                backEndTime = time + "-12-30",
                range = null
            }
            $this.loadData("BACK_REP", backStartTime, backEndTime, range, e.item)
        }
        ,
        ReturnRecordList.prototype.loadData = function(backStatus, backStartTime, backEndTime, range, key) {
            var _this2 = this
              , paramData = {
                backStatus: backStatus,
                backStartTime: backStartTime,
                backEndTime: backEndTime,
                range: range
            };
            userService.getReturnsRecordList(paramData).then(function(out) {
                if (out.requestStatus === userService.STATUS.ERROR)
                    return void _this2.showWeDialog("网络异常，请稍候再试。");
                var rsp = out.data;
                return rsp.data ? void _this2.setState({
                    data: rsp,
                    backStatus: backStatus,
                    backStartTime: backStartTime,
                    backEndTime: backEndTime,
                    range: range,
                    key: key
                }) : void _this2.showWeDialog(rsp.message)
            })["catch"](function(error) {
                this.showWeDialog(error.message)
            })
        }
        ,
        ReturnRecordList.prototype.render = function() {
            var backStatus = this.state.backStatus
              , backStartTime = this.state.backStartTime
              , backEndTime = this.state.backEndTime
              , data = this.state.data
              , yearArr = this.state.yearArr
              , range = this.state.range
              , tipText = this.state.tipText
              , _this = this
              , yearListHtml = void 0
              , listDom = void 0
              , weDialog = void 0
              , selectedDateAmount = 0;
            if (data.data && (selectedDateAmount = numeral(data.data.selectedDateAmount).format("0,0.00")),
            yearArr && (yearListHtml = yearArr.map(function(item, key) {
                return React.createElement("li", {
                    className: item == _this.state.key ? "selected" : null,
                    onClick: _this.filterAlreadyMonthHandleClick.bind(this, {
                        item: item
                    }, _this),
                    value: item,
                    key: key
                }, item)
            })),
            listDom = 0 == data.status ? React.createElement(ReturnRecordListItem, {
                data: data,
                backStatus: backStatus,
                backStartTime: backStartTime,
                backEndTime: backEndTime,
                range: range
            }) : React.createElement("div", {
                className: "no-data-text"
            }, " ", data.message),
            this.state.dialogShowing) {
                var weProps = {
                    showing: !0,
                    onRequestClose: this.hideWeDialog.bind(this)
                };
                weDialog = React.createElement(RWeDialog, weProps, React.createElement("div", {
                    className: "tip-content"
                }, tipText))
            }
            return React.createElement("div", {
                className: "return-record-condition"
            }, weDialog, React.createElement("ul", {
                className: "fn-clear condition-title"
            }, React.createElement("li", {
                onClick: this.filterWaitHandleClick,
                className: "BACK_UNREP" == backStatus ? "selected" : "",
                value: "BACK_UNREP"
            }, "待收回款 ", React.createElement("span", {
                className: "solid"
            })), React.createElement("li", {
                onClick: this.filterAlreadyHandleClick,
                className: "BACK_REP" == backStatus ? "selected" : "",
                value: "BACK_REP"
            }, "已收回款")), React.createElement("div", {
                className: "condition-time"
            }, React.createElement("div", {
                className: "BACK_UNREP" == backStatus ? "fn-clear start-end" : "fn-clear start-end fn-hide",
                id: "UNREPTime"
            }, React.createElement("p", {
                className: "fn-left"
            }, "日期"), React.createElement("div", {
                className: "query-item fn-left",
                id: "normal"
            }, React.createElement("input", {
                className: "ui-input",
                id: "back-start-time",
                readOnly: "readonly",
                value: backStartTime,
                type: "text",
                name: "backStartTime",
                autoComplete: "off"
            }), React.createElement("span", {
                className: "text"
            }, "到"), React.createElement("input", {
                className: "ui-input",
                id: "back-end-time",
                readOnly: "readonly",
                value: backEndTime,
                type: "text",
                name: "backEndTime",
                autoComplete: "off"
            })), React.createElement("p", {
                className: "fn-right query-summary"
            }, "查询期", React.createElement("span", {
                id: "return-status-label"
            }, "待收回报"), "总额：", React.createElement("span", {
                id: "return-total-amount"
            }, selectedDateAmount), "元")), React.createElement("div", {
                className: "BACK_REP" == backStatus ? "month" : "month fn-hide",
                id: "REPTime"
            }, React.createElement("ul", {
                className: "fn-clear"
            }, yearListHtml))), listDom)
        }
        ,
        ReturnRecordList
    }(React.Component);
    module.exports = ReturnRecordList
});
;/*!/client/widget/account/totalAsset/totalAsset.jsx*/
define("user:widget/account/totalAsset/totalAsset.jsx", function(require, exports, module) {
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
      , TotalAsset = function(_React$Component) {
        function TotalAsset() {
            _classCallCheck(this, TotalAsset),
            _React$Component.apply(this, arguments)
        }
        return _inherits(TotalAsset, _React$Component),
        TotalAsset.prototype.render = function() {
            var accountInfo = this.props.userData.accountInfo;
            return React.createElement("ul", {
                className: "TotalAsset"
            }, React.createElement("li", null, React.createElement("h3", null, "总资产"), React.createElement("p", {
                className: "num-family"
            }, accountInfo.asset, React.createElement("em", null, "元"))), React.createElement("li", {
                className: "last-earning"
            }, React.createElement("h3", null, "昨日收益"), React.createElement("p", {
                className: "orange num-family"
            }, accountInfo.lastDailyEarning, React.createElement("em", null, "元"))), React.createElement("li", null, React.createElement("h3", null, "累计收益"), React.createElement("p", {
                className: "num-family"
            }, accountInfo.earning, React.createElement("em", null, "元"))))
        }
        ,
        TotalAsset
    }(React.Component);
    module.exports = TotalAsset
});
;/*!/client/widget/address_picker/index.js*/
define("user:widget/address_picker/index.js", function(require, exports, module) {
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
      , Select = require("common:widget/react-ui/RSelect/RSelect");
    module.exports = function(_React$Component) {
        function AddressPicker() {
            var props = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            _classCallCheck(this, AddressPicker),
            _React$Component.call(this, props),
            this.state = {
                cache: [],
                refs: {
                    1: {},
                    2: {},
                    3: {}
                }
            }
        }
        return _inherits(AddressPicker, _React$Component),
        AddressPicker.prototype._onChange = function(level, code) {
            function cb() {
                this.setState({
                    refs: refs
                }),
                onChange(refs)
            }
            var _this = this
              , _props$onChange = this.props.onChange
              , onChange = void 0 === _props$onChange ? function() {}
            : _props$onChange
              , refs = Object.assign({}, this.state.refs);
            refs[+level - 1 + ""].children.forEach(function(item) {
                item.code === code && (refs[level] = item)
            });
            for (var s = +level + 1; 4 > s; s++)
                refs[s + ""] = null;
            var _ref = refs[level + ""] || {}
              , _ref$children = _ref.children
              , children = void 0 === _ref$children ? [] : _ref$children;
            return children.length ? cb.call(this) : void this._fetchAddress(+level + 1, code, function(result) {
                refs[level].children = result,
                cb.call(_this)
            })
        }
        ,
        AddressPicker.prototype.componentWillMount = function() {
            function _fetch(level) {
                var _this2 = this;
                this._fetchAddress(level, refs[level - 1].code, function(result) {
                    return refs[level - 1].children = result,
                    result.forEach(function(item) {
                        item.code === data[level].code && (refs[level] = item)
                    }),
                    3 > level ? _fetch.call(_this2, level + 1) : (onChange(refs),
                    void _this2.setState({
                        cache: cache,
                        refs: refs
                    }))
                })
            }
            var _props = this.props
              , _props$init = _props.init
              , data = void 0 === _props$init ? {} : _props$init
              , _props$onChange2 = _props.onChange
              , onChange = void 0 === _props$onChange2 ? function() {}
            : _props$onChange2
              , cache = [{
                children: []
            }]
              , refs = {
                0: cache[0]
            };
            _fetch.call(this, 1)
        }
        ,
        AddressPicker.prototype._fetchAddress = function(level, parentCode, cb) {
            var query = "level=" + level;
            parentCode && (query += "&parentCode=" + parentCode),
            $.get("/user/risk/weAddress?" + query, function(res) {
                var list = JSON.parse(res).data || [];
                list.forEach(function(item) {
                    item.label = item.area,
                    item.value = item.code
                }),
                cb(list)
            })
        }
        ,
        AddressPicker.prototype.render = function() {
            var _this3 = this
              , _state = this.state
              , _state$refs = (_state.cache,
            _state.refs)
              , refs = void 0 === _state$refs ? {} : _state$refs
              , config = {
                1: "省",
                2: "市",
                3: "区"
            };
            return React.createElement("div", {
                className: "address-picker-wrap"
            }, Object.keys(config).map(function(level) {
                return React.createElement("div", {
                    key: level
                }, React.createElement("label", null, config[level], ": "), React.createElement(Select, {
                    options: (refs[+level - 1 + ""] || {}).children || [],
                    selectDefaultValue: (refs[level] || {}).code,
                    selectChange: function(e) {
                        return _this3._onChange(level, e)
                    }
                }))
            }))
        }
        ,
        AddressPicker
    }(React.Component)
});
;/*!/client/widget/bank/RExchangeBank/RExchangeBank.js*/
define("user:widget/bank/RExchangeBank/RExchangeBank.js", function(require, exports, module) {
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
    var React = (require("common:widget/lib/jquery/jquery"),
    require("common:node_modules/react/react"))
      , utils = (require("common:node_modules/react-dom/index"),
    require("common:widget/ui/utils/utils"))
      , WeSection = function(_React$Component) {
        function WeSection(props) {
            _classCallCheck(this, WeSection),
            _React$Component.call(this, props),
            this.state = {
                showAddBtn: !0,
                speedy: !1,
                bankCode: "",
                dealCardId: "",
                bankType: ""
            }
        }
        return _inherits(WeSection, _React$Component),
        WeSection.prototype.componentDidMount = function() {
            var bankInfoData = this.props.bankInfoData;
            "2" == bankInfoData.bill99.bindType && this.setState({
                speedy: !0,
                bankCode: bankInfoData.bill99.cardInfo.bankCode,
                dealCardId: bankInfoData.bill99.cardInfo.cardNo.substr(0, 4) + " **** **** " + bankInfoData.bill99.cardInfo.cardNo.substr(-4),
                bankType: utils.bankCode2shortName[bankInfoData.bill99.cardInfo.bankCode],
                showAddBtn: !1
            })
        }
        ,
        WeSection.prototype.render = function() {
            var state = this.state
              , isTrueName = this.props.certificateData.isTrueName || "0"
              , jumpUrl = "/exchange/user/bindCard";
            0 == isTrueName && (jumpUrl = "/account/bindRole.action?type=ID");
            var li = React.createElement("li", {
                className: "card-item add-card",
                title: "新增银行卡"
            }, React.createElement("a", {
                target: "_blank",
                href: jumpUrl,
                style: {
                    display: "block",
                    height: "100%"
                }
            }))
              , quickIcon = "";
            state.speedy && (quickIcon = React.createElement("span", {
                className: "quick-bind-card-icon"
            }, "快捷"));
            var bankIconClass = "bank-info small-bank-icon small-bank-" + state.bankCode;
            return state.showAddBtn || (li = React.createElement("li", {
                className: "card-item"
            }, quickIcon, React.createElement("div", {
                className: bankIconClass
            }, React.createElement("span", {
                className: "bank-icon-mask"
            }), state.bankType), React.createElement("div", {
                className: "card-num num-family"
            }, state.dealCardId))),
            React.createElement("div", null, React.createElement("ul", {
                className: "fn-clear bank-card-list we-card-list"
            }, li))
        }
        ,
        WeSection
    }(React.Component);
    module.exports = WeSection
});
;/*!/client/widget/bank/RFundBank/RFundBank.js*/
define("user:widget/bank/RFundBank/RFundBank.js", function(require, exports, module) {
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
    var $ = require("common:widget/lib/jquery/jquery")
      , React = require("common:node_modules/react/react")
      , WeSection = (require("common:node_modules/react-dom/index"),
    require("common:widget/ui/utils/utils"),
    function(_React$Component) {
        function WeSection(props) {
            _classCallCheck(this, WeSection),
            _React$Component.call(this, props),
            this.state = {
                bankType: "",
                dealCardId: "",
                bankno: ""
            }
        }
        return _inherits(WeSection, _React$Component),
        WeSection.prototype.componentDidMount = function() {
            var fundCardData = this.props.fundCardData;
            fundCardData.data && fundCardData.data.length > 0 && (this.setState({
                bankType: fundCardData.data[0].bankname,
                dealCardId: fundCardData.data[0].card.substr(0, 4) + " **** **** " + fundCardData.data[0].card.substr(-4),
                bankno: fundCardData.data[0].bankno
            }),
            $(".fund_title,.fund_tip").show())
        }
        ,
        WeSection.prototype.render = function() {
            var fundCardData = this.props.fundCardData
              , state = this.state
              , li = ""
              , bankIconClass = "bank-info small-bank-icon small-qianjing-bank-" + state.bankno;
            return li = fundCardData.data && fundCardData.data.length > 0 ? React.createElement("li", {
                className: "card-item"
            }, React.createElement("div", {
                className: bankIconClass
            }, React.createElement("span", {
                className: "bank-icon-mask"
            }), state.bankType), React.createElement("div", {
                className: "card-num num-family"
            }, state.dealCardId), React.createElement("div", {
                className: "status-wrap"
            }, React.createElement("span", {
                className: "card-status"
            }, "基金"))) : React.createElement("li", {
                className: "card-item-no"
            }, " 尚未绑定银行卡"),
            React.createElement("div", null, React.createElement("ul", {
                className: "fn-clear bank-card-list we-card-list"
            }, li))
        }
        ,
        WeSection
    }(React.Component));
    module.exports = WeSection
});
;/*!/client/widget/bank/RP2pBank/RP2pBank.js*/
define("user:widget/bank/RP2pBank/RP2pBank.js", function(require, exports, module) {
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
    var React = (require("common:widget/lib/jquery/jquery"),
    require("common:node_modules/react/react"))
      , utils = (require("common:node_modules/react-dom/index"),
    require("common:widget/ui/utils/utils"))
      , service = require("common:widget/ui/service/service-factory")
      , BankLayer = (service.getService("user"),
    require("user:widget/account/bankLayer/bankLayer.jsx"))
      , P2pSection = function(_React$Component) {
        function P2pSection(props) {
            _classCallCheck(this, P2pSection),
            _React$Component.call(this, props),
            this.state = {
                showAddBtn: !0,
                bankCode: "",
                dealCardId: "",
                isRecharge: !1,
                bankType: "",
                isWithdraw: !1,
                layerShow: !1
            },
            this.handleCheckOpenAccount = this.handleCheckOpenAccount.bind(this),
            this.onLayerClose = this.onLayerClose.bind(this)
        }
        return _inherits(P2pSection, _React$Component),
        P2pSection.prototype.componentDidMount = function() {
            var that = this
              , _props = this.props
              , userInfo = _props.userInfo
              , bankInfo = _props.bankInfo;
            if (userInfo.hasCreateAccount && userInfo.hasSetPassword && "0" != bankInfo.cardStatus) {
                var isRecharge = !1
                  , isWithdraw = !1
                  , bindStatus = bankInfo.cardStatus;
                switch (bindStatus) {
                case "1":
                    isRecharge = !0,
                    isWithdraw = !1;
                    break;
                case "2":
                    isRecharge = !1,
                    isWithdraw = !0;
                    break;
                case "3":
                    isRecharge = !0,
                    isWithdraw = !0
                }
                var cardNo = bankInfo.userTrustBankVo.bankAcc;
                cardNo = cardNo.replace(/^(.{4})(\d+)(.{4}$)/, function(p0, p1, p2, p3) {
                    return p1 + p2.replace(/\w/g, "*") + p3
                }).replace(/(.{4})/g, "$1   ");
                var kqCode = bankInfo.userTrustBankVo.kqCode;
                that.setState({
                    showAddBtn: !1,
                    bankCode: kqCode,
                    dealCardId: cardNo,
                    isRecharge: isRecharge,
                    isWithdraw: isWithdraw,
                    bankType: utils.bankCode2shortName[kqCode]
                })
            }
        }
        ,
        P2pSection.prototype.handleCheckOpenAccount = function(e) {
            var userInfo = this.props.userInfo;
            userInfo.hasCreateAccount && userInfo.hasSetPassword || (e.preventDefault(),
            this.setState({
                layerShow: !0
            }))
        }
        ,
        P2pSection.prototype.onLayerClose = function() {
            this.setState({
                layerShow: !1
            })
        }
        ,
        P2pSection.prototype.render = function() {
            var state = this.state
              , showAddBtn = state.showAddBtn
              , _props2 = this.props
              , bankInfo = (_props2.userInfo,
            _props2.bankInfo)
              , li = React.createElement("li", {
                className: "card-item add-card",
                title: "新增银行卡",
                onClick: this.handleCheckOpenAccount
            }, React.createElement("a", {
                target: "_blank",
                href: "/user/trade/recharge",
                style: {
                    display: "block",
                    height: "100%"
                }
            }))
              , quickIcon = ""
              , bankAction = "";
            0 != bankInfo.cardStatus && bankInfo.userTrustBankVo && 0 == bankInfo.userTrustBankVo.cmbcBindStatus && (bankAction = React.createElement("div", {
                className: "bank-action-wrap"
            }, React.createElement("a", {
                href: "/user/trade/recharge"
            }, "更换"))),
            bankInfo.userTrustBankVo && 0 != bankInfo.userTrustBankVo.cmbcBindStatus && (bankAction = React.createElement("div", {
                className: "bank-action-wrap"
            }, React.createElement("a", {
                href: "javascript:",
                className: "CMBC-unbind-card-btn"
            }, "解绑")));
            var bankIconClass = "bank-info small-bank-icon small-bank-" + state.bankCode;
            return showAddBtn || (li = React.createElement("li", {
                className: "card-item"
            }, quickIcon, bankAction, React.createElement("div", {
                className: bankIconClass
            }, React.createElement("span", {
                className: "bank-icon-mask"
            }), state.bankType), React.createElement("div", {
                className: "card-num num-family"
            }, state.dealCardId), React.createElement("div", {
                className: "status-wrap"
            }))),
            React.createElement("div", null, React.createElement("ul", {
                className: "fn-clear rrd-bank-card-list p2p-card-list"
            }, li), React.createElement(BankLayer, {
                userInfo: this.props.userInfo,
                layerShow: this.state.layerShow,
                onLayerClose: this.onLayerClose
            }))
        }
        ,
        P2pSection
    }(React.Component);
    module.exports = P2pSection
});
;/*!/client/widget/borrower/apply-form/apply-form.js*/
define("user:widget/borrower/apply-form/apply-form.js", function(require, exports, module) {
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var utils = require("common:widget/ui/utils/utils")
      , ApplyForm = function() {
        function ApplyForm() {
            _classCallCheck(this, ApplyForm)
        }
        return ApplyForm.prototype.init = function(pageData, userInfo) {
            this.pageData = pageData,
            this.userInfo = userInfo,
            this.cashFee = 0,
            this.renderBankCardBox(pageData),
            this.handle(),
            $("#withdraw-apply-form").show()
        }
        ,
        ApplyForm.prototype.handle = function() {
            var that = this;
            $("#subWithdraw").on("click", function(e) {
                return $(this).hasClass("btn-unable") ? (e.preventDefault(),
                !1) : void 0
            }),
            $("#cash-num").on("keyup", function() {
                var cashNum = $(this).val()
                  , handle = cashNum.replace(/[^\d.]/g, "");
                if (!/^\d{1,9}(\.\d{0,2})?$/.test(handle)) {
                    var tmp = handle.split(".");
                    if (/\.$/.test(handle) && tmp.length <= 2)
                        return;
                    tmp[0] && (tmp[0].length > 9 && (tmp[0] = tmp[0].slice(0, 9)),
                    handle = Number(tmp[0])),
                    tmp[1] && (tmp[1].length > 2 && (tmp[1] = tmp[1].slice(0, 2)),
                    handle += Number(tmp[1] / 100))
                }
                $(this).val(handle),
                setTimeout(function() {
                    that.checkCashMoney()
                }, 0)
            }),
            $(".btn-cash-all").on("click", function() {
                $("#cash-num").val(that.pageData.maxCashDrawAmountFormat),
                setTimeout(function() {
                    that.checkCashMoney()
                }, 0)
            })
        }
        ,
        ApplyForm.prototype.checkCashMoney = function() {
            var maxCashDrawAmount = this.pageData.maxCashDrawAmount
              , cashNum = this.getUserCashNum();
            1e4 >= cashNum ? $("#cash-fee-tip").attr("class", "cash-fee-tip") : cashNum > maxCashDrawAmount ? $("#cash-fee-tip").attr("class", "cash-fee-tip error-tip") : $("#cash-fee-tip").attr("class", "cash-fee-tip more-than"),
            cashNum > 0 && maxCashDrawAmount >= cashNum && /^\d{1,9}(\.\d{0,2})?$/.test(cashNum) ? $("#subWithdraw").removeClass("btn-unable") : $("#subWithdraw").addClass("btn-unable")
        }
        ,
        ApplyForm.prototype.getUserCashNum = function() {
            var cashNum = $("#cash-num").val();
            return Number(cashNum.replace(/[^\d.]/g, ""))
        }
        ,
        ApplyForm.prototype.renderBankCardBox = function() {
            var bankData = this.pageData.userBank;
            bankData.oldcode = utils.minshengBankCode2rrd(bankData.cmbcCode),
            bankData.name = bankData.bankName,
            bankData.tailNumber = bankData.bankAcc.slice(-4),
            this.pageData.allBanks.map(function(value) {
                value.code == bankData.cmbcCode && (bankData.kqCode = value.kqBankCode)
            });
            var bankHtml = '\n            <div class="withdraw-card fn-left">\n                <i class="small-bank-icon small-bank-' + bankData.kqCode + " small-bank-" + bankData.oldcode + '"></i>' + bankData.name + '<span class="card-tail-number">(' + bankData.tailNumber + ')</span> \n            </div>\n            <input type="hidden" id="userBankId" name="userBankId" value="' + bankData.bankId + '" />\n        ';
            $("#hasBindCardWrap").html(bankHtml)
        }
        ,
        ApplyForm
    }();
    module.exports = new ApplyForm
});
;/*!/client/widget/borrower/message/RDetailList.jsx*/
define("user:widget/borrower/message/RDetailList.jsx", function(require, exports, module) {
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
      , service = require("common:widget/ui/service/service-factory")
      , moment = (service.getService("message"),
    require("common:node_modules/moment/moment"))
      , MessageDetailList = function(_React$Component) {
        function MessageDetailList(props) {
            _classCallCheck(this, MessageDetailList),
            _React$Component.call(this, props),
            this.state = {
                userId: this.props.userId,
                data: this.props.data,
                errorText: null
            }
        }
        return _inherits(MessageDetailList, _React$Component),
        MessageDetailList.prototype.createRowDom = function(item, index) {
            return React.createElement("div", {
                className: "message-detail-list-item",
                key: index
            }, React.createElement("div", {
                className: "content",
                dangerouslySetInnerHTML: {
                    __html: item.content
                }
            }), React.createElement("p", {
                className: "time"
            }, moment(parseInt(item.receiveTime)).format("YYYY-MM-DD HH:mm:ss")))
        }
        ,
        MessageDetailList.prototype.render = function() {
            {
                var _this = this
                  , data = this.props.data;
                data.data.list.map(function(item, index) {
                    return React.createElement("div", {
                        className: "message-detail-list-item",
                        key: index
                    }, React.createElement("div", {
                        className: "content",
                        dangerouslySetInnerHTML: {
                            __html: item.content
                        }
                    }), React.createElement("p", {
                        className: "time"
                    }, moment(parseInt(item.receiveTime)).format("YYYY-MM-DD HH:mm:ss")))
                })
            }
            return React.createElement("div", {
                className: "message-detail-content"
            }, React.createElement("div", {
                className: "ui-account-title fn-clear"
            }, React.createElement("div", {
                className: "fn-left"
            }, "消息通知")), React.createElement("div", {
                className: "message-detail-list"
            }, React.createElement(List, _extends({}, data, {
                moudleServiceName: "message",
                url: "getBorrowerMessageInfoDetail",
                isHeadNeed: "no",
                isHeadNeedOrder: "no",
                createRowDom: function(item, index) {
                    return _this.createRowDom(item, index)
                },
                noDataText: "暂无消息",
                startNum: 0,
                limit: 10,
                offset: 5
            }))))
        }
        ,
        MessageDetailList
    }(React.Component);
    module.exports = MessageDetailList
});
;/*!/client/widget/member/member-list/index.jsx*/
define("user:widget/member/member-list/index.jsx", function(require, exports, module) {
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
      , MemberList = function(_React$Component) {
        function MemberList(props) {
            _classCallCheck(this, MemberList),
            _React$Component.call(this, props),
            this.state = {
                index: 3
            }
        }
        return _inherits(MemberList, _React$Component),
        MemberList.prototype.left = function() {
            var festiveGift = this.props.festiveGift
              , level = this.props.level
              , isMember = this.props.isMember
              , nowStamp = Date.now()
              , userInfo = this.props.userInfo
              , isShowTime = void 0
              , isShowWord = void 0
              , festivalNum = void 0;
            isMember && (isShowTime = !!(nowStamp > new Date(festiveGift.beginDate) && nowStamp < new Date(festiveGift.showEndDate)),
            isShowWord = !!(nowStamp > new Date(festiveGift.beginDate) && nowStamp < new Date(festiveGift.endDate)),
            festivalNum = this.props.memberInfo.festivalNum);
            var birthday = userInfo.isBirth ? React.createElement("div", {
                className: "birthdayAfter"
            }, React.createElement("h1", null, "祝您生日快乐"), React.createElement("p", null, userInfo.value, "元生日礼券已发放至您的账户"), React.createElement("h2", null, React.createElement("sup", null, "￥"), userInfo.value), React.createElement("div", null, React.createElement("a", {
                href: "/user/privilege"
            }, "点击查看"))) : React.createElement("div", {
                className: "birthdayBefore"
            }, React.createElement("h1", null, "生日福利"), React.createElement("p", null, "人人贷为您送上温暖的生日福利"))
              , score = React.createElement("div", {
                className: "score"
            }, React.createElement("h1", null, "积分加速"), React.createElement("p", null, "更高等级享最快积分加速"), !isMember || 6 > level ? React.createElement("div", null, React.createElement("a", {
                href: "/premium.html"
            }, "去升级")) : null)
              , rank = React.createElement("div", {
                className: "rank"
            }, React.createElement("h1", null, "升级积分奖励"), React.createElement("p", null, "积分多多，出借抵扣福利多"), !isMember || 6 > level ? React.createElement("div", null, React.createElement("a", {
                href: "/premium.html"
            }, "去升级")) : null)
              , festival = "";
            festival = !isMember || 5 > level ? React.createElement("div", {
                className: "festival"
            }, React.createElement("h3", null, "升级至铂金卡会员可享")) : isShowTime ? festivalNum ? React.createElement("div", {
                className: "festival"
            }, React.createElement("h4", null, "预祝您新年快乐"), isShowTime ? React.createElement("div", null, React.createElement("a", {
                href: "/user/member/giftPackage"
            }, "点击领取春节礼包")) : null, isShowTime ? React.createElement("p", null, "领取时间：", festiveGift.beginDate, "至", festiveGift.endDate) : null) : React.createElement("div", {
                className: "festival"
            }, React.createElement("h4", null, "预祝您新年快乐"), React.createElement("div", null, React.createElement("a", {
                href: "/user/member/giftPackage"
            }, "已领取，查看领取详情")), React.createElement("p", null, "领取时间：", festiveGift.beginDate, "至", festiveGift.endDate)) : React.createElement("div", {
                className: "festival"
            }, React.createElement("h3", null, "未开放"));
            var arr = [festival, rank, score, birthday];
            return arr[this.props.num]
        }
        ,
        MemberList.prototype.right = function() {
            var rank = ["普通", "橙卡", "蓝卡", "银卡", "金卡", "铂金卡", "钻石卡"]
              , arr = [{
                illustrate: ["铂金卡及以上等级会员可领取节日福利。", "节日礼包包括但不限于实物、电子券等，礼包内容与领取规则以平台届时公布为准。", "节日领取时间请留意会员页面提示或平台通知短信。"],
                gift: ["-", "-", "-", "-", "-", "春节礼包", "春节礼包"]
            }, {
                illustrate: ["首次升级至橙卡及以上等级的会员，可获得升级积分奖励。", "会员体系上线当天，人人贷将根据用户初始等级，发放相应积分奖励。", "跨等级升级的用户，仅发放最高等级积分奖励。"],
                gift: ["-", "500积分", "1,000积分", "2,000积分", "6,000积分", "12,000积分", "30,000积分"]
            }, {
                illustrate: ["橙卡及以上等级会员可享有积分加倍特权。", "积分加倍详情请参照积分指南。"],
                gift: ["加速1.0倍", "加速1.1倍", "加速1.2倍", "加速1.5倍", "加速1.8倍", "加速2.0倍", "加速2.2倍"]
            }, {
                illustrate: ["生日当天各等级会员均可获得与生日当天0点所在会员等级对应的生日优惠券，用户可前往“我的优惠券”查看。", "用户生日以用户实名认证的身份证号码为准。", "生日优惠券可用于优选服务、U享服务（服务期限≥12个月），有效期为30天。具体的使用规则可前往“我的优惠券”查看。"],
                gift: ["8元抵扣券", "18元抵扣券", "28元抵扣券", "58元抵扣券", "128元抵扣券", "188元抵扣券", "288元抵扣券"]
            }]
              , num = this.props.num;
            return React.createElement("div", {
                className: "right"
            }, React.createElement("h3", null, "权益说明"), arr[num].illustrate.map(function(e, i) {
                return 2 === num && 1 === i ? React.createElement("p", {
                    key: i,
                    style: {
                        paddingBottom: 1 === i && 2 === num ? "20px" : null
                    }
                }, "2、积分加倍详情请参照", React.createElement("a", {
                    href: "/help/account/59cba6e5753dcd1eaf3e55d9"
                }, "积分指南"), "。") : React.createElement("p", {
                    key: i,
                    style: {
                        paddingBottom: 1 === i && 2 === num ? "20px" : null
                    }
                }, i + 1, "、", e)
            }), React.createElement("div", {
                className: "table"
            }, React.createElement("div", {
                className: "point"
            }), arr[num].gift.map(function(e, i) {
                return React.createElement("div", {
                    className: "tr",
                    key: i
                }, React.createElement("div", {
                    className: "th1"
                }, rank[i], "会员"), React.createElement("div", {
                    className: "th2"
                }, e))
            })))
        }
        ,
        MemberList.prototype.render = function() {
            return React.createElement("div", {
                className: "memberList"
            }, React.createElement("div", {
                className: "left"
            }, this.left()), this.right())
        }
        ,
        MemberList
    }(React.Component);
    module.exports = MemberList
});
;/*!/client/widget/member/member-detail/index.jsx*/
define("user:widget/member/member-detail/index.jsx", function(require, exports, module) {
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
      , MemberList = require("user:widget/member/member-list/index.jsx")
      , service = require("common:widget/ui/service/service-factory")
      , userService = service.getService("user")
      , MemberDetail = function(_React$Component) {
        function MemberDetail(props) {
            _classCallCheck(this, MemberDetail),
            _React$Component.call(this, props),
            this.state = {
                show: !1,
                num: 3
            },
            this.showRecord = this.showRecord.bind(this),
            this.hiddenDialog = this.hiddenDialog.bind(this),
            this.changeType = this.changeType.bind(this)
        }
        return _inherits(MemberDetail, _React$Component),
        MemberDetail.prototype.showRecord = function() {
            var _this = this;
            userService.memberRewardRecord().then(function(res) {
                0 === res.data.status ? _this.setState({
                    list: res.data.data
                }) : console.error(res.data.message),
                _this.setState({
                    show: !0
                })
            })["catch"](function(err) {
                console.error(err)
            })
        }
        ,
        MemberDetail.prototype.hiddenDialog = function() {
            this.setState({
                show: !1
            })
        }
        ,
        MemberDetail.prototype.getRewardRecord = function() {
            var list = this.state.list
              , dialogProps = {
                showing: this.state.show,
                dialog: {
                    className: "memberDialog",
                    style: list ? {
                        width: 700
                    } : {
                        width: 540,
                        minHeight: 188
                    }
                },
                onRequestClose: this.hiddenDialog
            };
            return React.createElement(RDialog, dialogProps, list ? React.createElement("h1", null, "领取记录") : null, list ? React.createElement("div", {
                className: "recordTable"
            }, React.createElement("div", {
                className: "table"
            }, React.createElement("div", {
                className: "tr fn-clear",
                style: {
                    background: "#FAFAFA"
                }
            }, React.createElement("div", {
                className: "th1"
            }, "获取时间"), React.createElement("div", {
                className: "th2"
            }, "会员权益"), React.createElement("div", {
                className: "th3"
            }, "获取内容")), list.map(function(e, i) {
                return React.createElement("div", {
                    className: "tr fn-clear",
                    key: i
                }, React.createElement("div", {
                    className: "th1"
                }, e.createTime), React.createElement("div", {
                    className: "th2"
                }, e.type), React.createElement("div", {
                    className: "th3"
                }, e.reward))
            }))) : React.createElement("div", {
                className: "noReward"
            }, "暂无领取记录"))
        }
        ,
        MemberDetail.prototype.changeType = function(num) {
            this.setState({
                num: num
            })
        }
        ,
        MemberDetail.prototype.render = function() {
            var _this2 = this
              , level = this.props.memberInfo.level.slice(1)
              , festivalNum = this.props.memberInfo.festivalNum
              , isMember = !0;
            "" === level ? isMember = !1 : level = +level;
            var changeLevel = this.props.activeIndex
              , num = this.state.num
              , rankArr = [["橙卡会员可享", "500积分", "1,000积分", "2,000积分", "6,000积分", "12,000积分", "30,000积分"], ["橙卡会员可享", "每日积分1.1倍", "每日积分1.2倍", "每日积分1.5倍", "每日积分1.8倍", "每日积分2.0倍", "每日积分2.2倍"], ["8元抵扣券", "18元抵扣券", "28元抵扣券", "58元抵扣券", "128元抵扣券", "188元抵扣券", "288元抵扣券"]]
              , icon = [{
                title: "节日关怀",
                detail: changeLevel > 4 ? "精选佳节好礼" : "铂金卡会员可享",
                "class": "icon4_d"
            }, {
                title: "升级奖励",
                detail: rankArr[0][changeLevel],
                "class": "icon3_d"
            }, {
                title: "积分加速",
                detail: rankArr[1][changeLevel],
                "class": "icon2_d"
            }, {
                title: "生日礼包",
                detail: rankArr[2][changeLevel],
                "class": "icon1_d"
            }];
            0 >= changeLevel ? (icon[0]["class"] = "icon4_h",
            icon[1]["class"] = "icon3_h",
            icon[2]["class"] = "icon2_h") : changeLevel > 0 && 5 > changeLevel && (icon[0]["class"] = "icon4_h");
            var festiveGift = this.props.festiveGift
              , nowStamp = Date.now()
              , showTag = !!(level && level > 4 && festivalNum)
              , isShowWord = !!(nowStamp > new Date(festiveGift.beginDate) && nowStamp < new Date(festiveGift.endDate));
            return React.createElement("div", null, React.createElement("div", {
                className: "memberDetail"
            }, this.getRewardRecord(), React.createElement("div", {
                className: "record",
                onClick: this.showRecord
            }, "领取记录"), icon.map(function(e, index) {
                return React.createElement("div", {
                    className: "box",
                    key: index
                }, React.createElement("div", {
                    className: ["icon", e["class"]].join(" "),
                    onClick: _this2.changeType.bind(_this2, index)
                }, num === index ? React.createElement("div", {
                    className: "angle"
                }) : null, isShowWord && showTag && 0 === index ? React.createElement("div", {
                    className: "waitGet"
                }) : null), React.createElement("div", {
                    className: "content"
                }, React.createElement("h3", null, e.title), React.createElement("p", null, e.detail)))
            })), React.createElement(MemberList, {
                num: num,
                festiveGift: this.props.festiveGift,
                level: level,
                isMember: isMember,
                memberInfo: this.props.memberInfo,
                userInfo: this.props.userInfo
            }))
        }
        ,
        MemberDetail
    }(React.Component);
    module.exports = MemberDetail
});
;/*!/client/widget/member/memberCard/memberCard.jsx*/
define("user:widget/member/memberCard/memberCard.jsx", function(require, exports, module) {
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
      , $ = require("common:widget/lib/jquery/jquery")
      , Swiper = require("common:widget/lib/jquery/swiper-4.0.5.min")
      , MemberCard = function(_React$Component) {
        function MemberCard(props) {
            _classCallCheck(this, MemberCard),
            _React$Component.call(this, props),
            this.state = {
                lowIE: !1
            }
        }
        return _inherits(MemberCard, _React$Component),
        MemberCard.prototype.initSwiper = function(levelNumber) {
            var _this = this;
            try {
                !function() {
                    var that = _this;
                    new Swiper("#memberCard .swiper-container",{
                        watchSlidesProgress: !0,
                        slidesPerView: "auto",
                        centeredSlides: !0,
                        slideToClickedSlide: !0,
                        initialSlide: levelNumber,
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev"
                        },
                        on: {
                            progress: function() {
                                for (var i = 0; i < this.slides.length; i++) {
                                    var slide = this.slides.eq(i)
                                      , slideProgress = this.slides[i].progress
                                      , modify = 1;
                                    Math.abs(slideProgress) > 1 && (modify = .2 * (Math.abs(slideProgress) - 1.1) + 1);
                                    var translate = slideProgress * modify * 190 + "px"
                                      , scale = 1 - Math.abs(slideProgress) / 4.5
                                      , zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                                    slide.transform("translateX(" + translate + ") scale(" + scale + ")"),
                                    slide.css("zIndex", zIndex),
                                    slide.css("opacity", 1),
                                    Math.abs(slideProgress) > 3 && slide.css("opacity", 0)
                                }
                                $("#memberCard").css("opacity", 1)
                            },
                            setTransition: function(transition) {
                                for (var i = 0; i < this.slides.length; i++) {
                                    var slide = this.slides.eq(i);
                                    slide.transition(transition)
                                }
                            },
                            slideChangeTransitionEnd: function() {
                                that.props.changeMemberCard(this.activeIndex)
                            }
                        }
                    })
                }()
            } catch (e) {
                console.log("swiper不兼容当前浏览器"),
                this.setState({
                    lowIE: !0
                })
            }
        }
        ,
        MemberCard.prototype.calCurrentCount = function(num) {
            if (num >= 1e4) {
                var str = (num / 1e4).toString();
                if (str.indexOf(".") >= 0) {
                    var left = str.split(".")[0]
                      , right = str.split(".")[1];
                    return right.length >= 2 ? left + "." + right.slice(0, 2) + "万元" : left + "." + right + "万元"
                }
                return str + "万元"
            }
            return num + "元"
        }
        ,
        MemberCard.prototype.calLimitCount = function(num) {
            return num >= 1e4 ? Math.floor(num / 1e4) + "万元" : Math.floor(num) + "元"
        }
        ,
        MemberCard.prototype.calProgress = function() {
            var _props$memberInfo = this.props.memberInfo
              , amount = _props$memberInfo.amount
              , currentLevelAmount = _props$memberInfo.currentLevelAmount;
            return Math.min(Number(amount) / Number(currentLevelAmount), 1)
        }
        ,
        MemberCard.prototype.jumpToInvest = function() {
            window.location.href = "/premium.html"
        }
        ,
        MemberCard.prototype.mapLevelToNumber = function(level) {
            return "L" === level ? 0 : Number(level.substring(1))
        }
        ,
        MemberCard.prototype.componentDidMount = function() {
            var level = this.props.memberInfo.level
              , levelNumber = this.mapLevelToNumber(level);
            this.initSwiper(levelNumber)
        }
        ,
        MemberCard.prototype.renderSlideItem = function(item, index, levelNumber) {
            var _props$memberInfo2 = this.props.memberInfo
              , changeTime = _props$memberInfo2.changeTime
              , levelLabel = _props$memberInfo2.levelLabel
              , amount = _props$memberInfo2.amount
              , currentLevelAmount = _props$memberInfo2.currentLevelAmount
              , level = _props$memberInfo2.level
              , expire = void 0
              , button = void 0
              , levelChange = void 0;
            "L" === level && (levelNumber = -1),
            amount < item.minNum && (levelLabel = 1),
            "number" == typeof changeTime && 1 === levelLabel && (changeTime = changeTime.slice(0, 4) + "-" + changeTime.slice(4, 6) + "-" + changeTime.slice(6),
            expire = "有效期至" + changeTime),
            levelChange = 6 === levelNumber ? 1 === levelLabel ? "/保级" + this.calLimitCount(currentLevelAmount) : "" : 1 === levelLabel ? "/保级" + this.calLimitCount(currentLevelAmount) : "/升级" + this.calLimitCount(currentLevelAmount),
            1 === levelLabel ? button = React.createElement("div", {
                className: "button",
                style: {
                    border: "1px solid " + item.color,
                    color: item.color
                },
                onClick: this.jumpToInvest
            }, "出借保级") : 2 === levelLabel && (button = React.createElement("div", {
                className: "button",
                style: {
                    border: "1px solid " + item.color,
                    color: item.color
                },
                onClick: this.jumpToInvest
            }, "出借升级"));
            var progressWidth = 105 * this.calProgress() + "px";
            return levelNumber === index ? React.createElement("div", {
                className: "swiper-slide",
                key: index,
                style: {
                    background: 'url("//www.renrendai.com/cms/5864b0d6a24d131067ef7956/user/member/P' + index + '.png") no-repeat 0 0 / 100% 100%',
                    color: item.color
                }
            }, React.createElement("div", {
                className: "title"
            }, item.title), React.createElement("div", {
                className: "expire"
            }, expire), 6 !== levelNumber || 1 === levelLabel ? React.createElement("div", null, React.createElement("div", {
                className: "money"
            }, React.createElement("div", {
                className: "current"
            }, "当前", this.calCurrentCount(amount)), React.createElement("div", {
                className: "total"
            }, levelChange)), React.createElement("div", null, React.createElement("div", {
                className: "progress",
                style: {
                    background: item.color
                }
            }), React.createElement("div", {
                className: "progress-active",
                style: {
                    width: progressWidth,
                    background: item.color
                }
            }))) : React.createElement("div", {
                className: "top-level-amount"
            }, "当前在投", this.calCurrentCount(amount)), button) : React.createElement("div", {
                className: "swiper-slide",
                key: index,
                style: {
                    background: 'url("//www.renrendai.com/cms/5864b0d6a24d131067ef7956/user/member/P' + index + '-2.png") no-repeat 0 0 / 100% 100%',
                    color: item.color
                }
            }, React.createElement("div", {
                className: "title"
            }, item.title), React.createElement("div", {
                className: "sub-title"
            }, 6 === index ? "在投资产" + item.min + "及以上" : "在投资产" + item.min + "~" + item.max))
        }
        ,
        MemberCard.prototype.render = function() {
            var _this2 = this
              , level = this.props.memberInfo.level
              , levelNumber = this.mapLevelToNumber(level)
              , memberList = [{
                title: "普通会员",
                color: "#6C7080",
                min: "1000元",
                max: "2万元",
                minNum: 1e3
            }, {
                title: "橙卡会员",
                color: "#B06933",
                min: "2万元",
                max: "5万元",
                minNum: 2e4
            }, {
                title: "蓝卡会员",
                color: "#426492",
                min: "5万元",
                max: "10万元",
                minNum: 5e4
            }, {
                title: "银卡会员",
                color: "#5D5D5D",
                min: "10万元",
                max: "20万元",
                minNum: 1e5
            }, {
                title: "金卡会员",
                color: "#916734",
                min: "20万元",
                max: "50万元",
                minNum: 2e5
            }, {
                title: "铂金卡会员",
                color: "#896256",
                min: "50万元",
                max: "100万元",
                minNum: 5e5
            }, {
                title: "钻石卡会员",
                color: "#6481A5",
                min: "100万元",
                minNum: 1e6
            }];
            return React.createElement("div", {
                className: "member-card-container"
            }, this.state.lowIE ? React.createElement("div", {
                className: "lower-bg"
            }, React.createElement("div", {
                className: "lower-ie10-card"
            }, this.renderSlideItem(memberList[levelNumber], levelNumber, levelNumber))) : React.createElement("div", {
                id: "memberCard"
            }, React.createElement("div", {
                className: "swiper-container"
            }, React.createElement("div", {
                className: "swiper-wrapper"
            }, memberList.map(function(item, index) {
                return _this2.renderSlideItem(item, index, levelNumber)
            })), React.createElement("div", {
                className: "swiper-button-prev"
            }), React.createElement("div", {
                className: "swiper-button-next"
            }))))
        }
        ,
        MemberCard
    }(React.Component);
    module.exports = MemberCard
});
;/*!/client/widget/member/memberRule/memberRule.jsx*/
define("user:widget/member/memberRule/memberRule.jsx", function(require, exports, module) {
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
      , MemberRule = function(_React$Component) {
        function MemberRule(props) {
            _classCallCheck(this, MemberRule),
            _React$Component.call(this, props)
        }
        return _inherits(MemberRule, _React$Component),
        MemberRule.prototype.render = function() {
            return React.createElement("div", {
                className: "memberRule"
            }, React.createElement("div", {
                className: "top"
            }, React.createElement("div", {
                className: "title"
            }, "会员等级规则"), React.createElement("div", {
                className: "subTitle"
            }, "人人贷会员共分为7级，会员等级由用户的在投资金决定。（在投资金=总资产-账户余额）")), React.createElement("div", {
                className: "dataMap"
            }), React.createElement("div", {
                className: "rule"
            }, React.createElement("div", {
                className: "level"
            }, React.createElement("div", {
                className: "levelTitle"
            }, React.createElement("img", {
                className: "levelTitleImg",
                src: "//www.renrendai.com/cms/5864b0d6a24d131067ef7956/user/member/memberRule3.png",
                alt: ""
            }), React.createElement("span", {
                className: "levelTitleText"
            }, "升级规则")), React.createElement("div", {
                className: "levelContent"
            }, "当用户在投资金达到更高会员等级对应的在投资金时，即可升级至相应会员等级"), React.createElement("div", {
                className: "levelUpArrow"
            })), React.createElement("div", {
                className: "level",
                style: {
                    marginTop: "20px"
                }
            }, React.createElement("div", {
                className: "levelTitle"
            }, React.createElement("img", {
                className: "levelTitleImg",
                src: "//www.renrendai.com/cms/5864b0d6a24d131067ef7956/user/member/memberRule4.png",
                alt: ""
            }), React.createElement("span", {
                className: "levelTitleText"
            }, "降级规则")), React.createElement("div", {
                className: "levelContent"
            }, "如用户在投资金不满足当前会员等级标准，则自不满足日起，会员等级保留30个自然日。若用户在第31个自然日的在投资金仍不满足当前会员等级标准，则自动降级至当前在投资金对应的会员等级"), React.createElement("div", {
                className: "levelDownArrow"
            }))))
        }
        ,
        MemberRule
    }(React.Component);
    module.exports = MemberRule
});
;/*!/client/widget/message/detail/RDetailList.jsx*/
define("user:widget/message/detail/RDetailList.jsx", function(require, exports, module) {
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
      , moment = (require("common:widget/react-ui/RList/List"),
    require("common:node_modules/moment/moment"))
      , MessageDetailList = function(_React$Component) {
        function MessageDetailList(props) {
            _classCallCheck(this, MessageDetailList),
            _React$Component.call(this, props),
            this.state = {
                userId: this.props.userId,
                data: this.props.data,
                that: this.props.that,
                innerMailId: this.props.innerMailId,
                commentValue: null,
                textNum: 300,
                errorText: null
            }
        }
        return _inherits(MessageDetailList, _React$Component),
        MessageDetailList.prototype.createRowDom = function(item) {
            return React.createElement("div", {
                className: "message-detail-list-item"
            }, React.createElement("div", {
                className: "content",
                dangerouslySetInnerHTML: {
                    __html: item.content
                }
            }), React.createElement("p", {
                className: "time"
            }, moment(parseInt(item.time)).format("YYYY-MM-DD HH:mm:ss")))
        }
        ,
        MessageDetailList.prototype.render = function() {
            var that = this.state.that
              , data = this.props.data
              , senderId = this.props.senderId
              , userId = that.state.userId
              , title = that.state.detailTitle
              , errorText = this.state.errorText
              , textNum = this.state.textNum
              , commentValue = this.state.commentValue
              , listDom = void 0
              , conversationListDom = void 0;
            return data.data.innerMailTypeChineseName || "1" == senderId ? data.data.list.length && (listDom = data.data.list.map(function(item, index) {
                return React.createElement("div", {
                    className: "message-detail-list-item",
                    key: index
                }, React.createElement("div", {
                    className: "content",
                    dangerouslySetInnerHTML: {
                        __html: item.content
                    }
                }), React.createElement("p", {
                    className: "time"
                }, moment(parseInt(item.time)).format("YYYY-MM-DD HH:mm:ss")))
            })) : (data.data.list.length && (conversationListDom = data.data.list.map(function(item, index) {
                var classStyle = "fn-left conversation-box receiver";
                return item.sender == userId && (classStyle = "fn-right conversation-box sender"),
                React.createElement("div", {
                    className: "fn-clear",
                    key: index
                }, React.createElement("div", {
                    className: classStyle
                }, React.createElement("div", {
                    className: "content",
                    dangerouslySetInnerHTML: {
                        __html: item.content
                    }
                }), React.createElement("p", {
                    className: "time"
                }, moment(parseInt(item.time)).format("YYYY-MM-DD HH:mm:ss"))))
            })),
            listDom = React.createElement("div", {
                className: "conversation-content"
            }, conversationListDom, React.createElement("div", {
                className: "send-from"
            }, React.createElement("input", {
                type: "hidden",
                ref: "receiverValue",
                value: title
            }), React.createElement("textarea", {
                onChange: that.keyUpSendComment.bind(this),
                className: "ui-rrd-textarea",
                name: "send-content",
                ref: "commentValue",
                value: commentValue,
                placeholder: "字数限制300以内"
            }), React.createElement("div", {
                className: "article-box fn-clear"
            }, React.createElement("div", {
                className: "fn-left"
            }, React.createElement("p", {
                className: "text-num-tip"
            }, "还可以输入", React.createElement("span", {
                className: "text-num"
            }, textNum), "字", React.createElement("span", {
                className: "error-tip"
            }, errorText))), React.createElement("div", {
                className: "fn-right"
            }, React.createElement("button", {
                onClick: that.sendData.bind(this, senderId),
                className: "ui-button ui-button-yellow ui-button-xl",
                type: "submit"
            }, "发送")))))),
            React.createElement("div", {
                className: "message-detail-content"
            }, React.createElement("div", {
                className: "ui-account-title fn-clear"
            }, React.createElement("div", {
                className: "fn-left"
            }, title), React.createElement("div", {
                className: "fn-right"
            }, React.createElement("a", {
                href: "/user/message/list"
            }, "返回消息列表"))), React.createElement("div", {
                className: "message-detail-list"
            }, listDom))
        }
        ,
        MessageDetailList
    }(React.Component);
    module.exports = MessageDetailList
});
;/*!/client/widget/message/list/RList.jsx*/
define("user:widget/message/list/RList.jsx", function(require, exports, module) {
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
      , RSelect = (require("common:node_modules/react-dom/index"),
    require("common:widget/ui/utils/utils"),
    require("common:widget/react-ui/RSelect/RSelect"))
      , List = require("common:widget/react-ui/RList/List")
      , RWeDialog = require("common:widget/react-ui/RWeDialog/RWeDialog")
      , service = require("common:widget/ui/service/service-factory")
      , messageService = service.getService("message")
      , moment = require("common:node_modules/moment/moment")
      , MessageList = function(_React$Component) {
        function MessageList(props) {
            _classCallCheck(this, MessageList),
            _React$Component.call(this, props),
            this.state = {
                userId: this.props.userId,
                data: this.props.data,
                that: this.props.that,
                senderId: null,
                innerMailId: null,
                errorText: null,
                commentValue: null,
                textNum: 300,
                receiverValue: null,
                dialogShowing: !1,
                tipShowing: !1,
                tipText: "此操作将删除本次对话，确认要提交吗？",
                disabled: !1,
                delUserQuery: null,
                options: [{
                    label: "人人贷金贝贝",
                    value: "人人贷金贝贝"
                }, {
                    label: "人人贷金妞妞",
                    value: "人人贷金妞妞"
                }]
            }
        }
        return _inherits(MessageList, _React$Component),
        MessageList.prototype.showSendDialog = function() {
            this.setState({
                dialogShowing: !0
            })
        }
        ,
        MessageList.prototype.hideSendDialog = function() {
            this.setState({
                dialogShowing: !1
            })
        }
        ,
        MessageList.prototype.showTipDialog = function(delUserQuery) {
            this.setState({
                tipShowing: !0,
                delUserQuery: delUserQuery
            })
        }
        ,
        MessageList.prototype.hideTipDialog = function() {
            this.setState({
                tipShowing: !1
            })
        }
        ,
        MessageList.prototype.delUserCurrentData = function(delUserQuery) {
            var _this2 = this;
            messageService.postMessageDelUser(delUserQuery).then(function(out) {
                return out.requestStatus === messageService.STATUS.ERROR ? void _this2.setState({
                    errorText: "网络异常，请稍候再试。"
                }) : (0 == out.data.status && window.location.reload(),
                void _this2.setState({
                    errorText: out.data.message
                }))
            })
        }
        ,
        MessageList.prototype.mailType = function(_mailType) {
            var iconType = void 0;
            switch (_mailType) {
            case "MATERIAL_FAILED":
                iconType = "borrowed";
                break;
            case "ADD_OR_ADDTO_FINANCE_RSV":
                iconType = "uplan";
                break;
            case "ADD_OR_ADDTO_FINANCEPLAN":
                iconType = "uplan";
                break;
            case "ADDTO_AUTO_INVEST_PLAN":
                iconType = "invest";
                break;
            case "ADVANCE_REPAY":
                iconType = "borrowed";
                break;
            case "APPLY_OR_SUCCESS_EXIT_FINANCEPLAN":
                iconType = "uplan";
                break;
            case "APPLYAMOUNT_FAILED":
                iconType = "borrowed";
                break;
            case "APPLYAMOUNT_SUCCESS":
                iconType = "borrowed";
                break;
            case "AUTO_INVEST_PLAN_ALLOW_RECHARGE":
                iconType = "invest";
                break;
            case "AUTO_INVEST_PLAN_OVERDUE":
                iconType = "invest";
                break;
            case "BEEN_BID_LOAN_SUCCESS":
                iconType = "borrowed";
                break;
            case "BORROW_FAILED":
                iconType = "borrowed";
                break;
            case "BORROW_SUCCESS":
                iconType = "borrowed";
                break;
            case "CREDIT_OVERDUE":
                iconType = "borrowed";
                break;
            case "DRAWCASH_APPLY":
                iconType = "borrowed";
                break;
            case "MATERIAL_FAILED":
                iconType = "withdraw";
                break;
            case "DRAWCASH_FAILED":
                iconType = "withdraw";
                break;
            case "DRAWCASH_SUCCESS":
                iconType = "withdraw";
                break;
            case "FARMER_LOAN_FAILED":
                iconType = "loan";
                break;
            case "FARMERLOAN_BID_SUC":
                iconType = "loan";
                break;
            case "FINANCE_RSV_OVERDUE":
                iconType = "uplan";
                break;
            case "FRAMERLOAN_COMMENTED_REPLIED":
                iconType = "other";
                break;
            case "GET_ADVANCE_REPAY":
                iconType = "returned";
                break;
            case "GET_REPAY_LOAN":
                iconType = "returned";
                break;
            case "LOAN_BID_FAILED":
                iconType = "loan";
                break;
            case "LOAN_BID_SUCCESS":
                iconType = "loan";
                break;
            case "LOAN_CHECKIN_CLOSED":
                iconType = "borrowed";
                break;
            case "LOAN_CHECKIN_FULL":
                iconType = "borrowed";
                break;
            case "LOAN_COMMENTED":
                iconType = "other";
                break;
            case "LOAN_COMMENTED_REPLIED":
                iconType = "other";
                break;
            case "LOAN_FAILED_FOR_LENDER":
                iconType = "loan";
                break;
            case "LOAN_OPEN_GREATTHAN_HALF":
                iconType = "borrowed";
                break;
            case "LOAN_OPEN_TIMEOUT":
                iconType = "borrowed";
                break;
            case "LOAN_OVERDUE":
                iconType = "borrowed";
                break;
            case "LOAN_REPAY_BY_GUARAN":
                iconType = "other";
                break;
            case "LOAN_REPAY_IN_THREEDAYS":
                iconType = "borrowed";
                break;
            case "LOAN_REPAY_LASTPHASE":
                iconType = "borrowed";
                break;
            case "LOAN_REPAY_SUCCESS":
                iconType = "borrowed";
                break;
            case "LOAN_TRANSFER":
                iconType = "other";
                break;
            case "MATERIAL_SUC":
                iconType = "cailiao";
                break;
            case "RECHARGE_AUTO_INVEST_PLAN":
                iconType = "invest";
                break;
            case "SUCCESS_EXIT_AUTOINVESTPLAN":
                iconType = "invest";
                break;
            case "RECOVER_INTEREST":
                iconType = "uplan";
                break;
            case "SOON_TO_EXPIRE_COUPON":
                iconType = "coupon";
                break;
            case "SUBMIT_APPLICATION":
                iconType = "borrowed";
                break;
            case "UPDATE_CREDIT_POINT":
                iconType = "borrowed";
                break;
            case "UPLAN_ROLL_OVER_AFFIRM":
                iconType = "uplan";
                break;
            case "UPLAN_ROLL_OVER_CANCEL":
                iconType = "uplan";
                break;
            case "UPLAN_ROLL_OVER_DUE":
                iconType = "uplan";
                break;
            case "UPLAN_ROLL_OVER_SUCCESS":
                iconType = "uplan";
                break;
            case "OTHER":
                iconType = "other";
                break;
            case "RECHARGE_SUCCESS":
                iconType = "recharge";
                break;
            case "PASSWORD_SUGGESTION":
                iconType = "password";
                break;
            default:
                iconType = "manual"
            }
            return iconType
        }
        ,
        MessageList.prototype.selectOnChange = function(defaultValue) {
            this.setState({
                receiverValue: defaultValue
            })
        }
        ,
        MessageList.prototype.receiverValueChange = function() {
            this.setState({
                receiverValue: this.refs.receiverValue.value
            })
        }
        ,
        MessageList.prototype.createRowDom = function(item, index, that) {
            var iconType = this.mailType(item.innerMail.type)
              , count = void 0
              , avatar = void 0
              , delBtn = void 0
              , photoStyle = "fn-left icon-type icon-" + iconType
              , title = item.innerMail.title
              , innerMailId = item.innerMail.innerMailId
              , userType = (item.innerMail.sender,
            void 0)
              , privateSenderUserId = void 0
              , senderId = void 0;
            item.innerMail.sender == that.props.userId ? (privateSenderUserId = item.innerMail.addressee,
            senderId = item.innerMail.addressee,
            userType = "sender") : (privateSenderUserId = item.innerMail.sender,
            senderId = item.innerMail.sender,
            userType = "receiver");
            var detailQuery = {
                privateSenderUserId: privateSenderUserId,
                innerMailType: item.innerMail.type
            }
              , delUserQuery = {
                senderId: senderId,
                type: userType
            };
            return 0 != item.count && (count = React.createElement("span", null, item.count)),
            1 == item.innerMail.sender ? (title = item.innerMail.title,
            item.innerMail.title || (title = "系统通知")) : (delBtn = React.createElement("a", {
                className: "del-button",
                onClick: this.showTipDialog.bind(this, delUserQuery)
            }, "删除"),
            item.innerMail.title || (title = item.innerMail.senderNickName),
            item.innerMail.sender == that.props.userId ? (title = item.innerMail.addresseeNickName,
            item.innerMail.addresseeAvatar && (photoStyle = "fn-left icon-type avatar",
            avatar = React.createElement("img", {
                src: item.innerMail.addresseeAvatar
            }))) : (title = item.innerMail.senderNickName,
            item.innerMail.senderAvatar && (photoStyle = "fn-left icon-type avatar",
            avatar = React.createElement("img", {
                src: item.innerMail.senderAvatar
            })))),
            React.createElement("div", {
                className: "message-list-item fn-clear"
            }, React.createElement("div", {
                className: photoStyle
            }, count, avatar), React.createElement("div", {
                className: "fn-right list-right-box"
            }, delBtn, React.createElement("dl", null, React.createElement("dt", {
                className: "fn-clear"
            }, React.createElement("a", {
                className: "fn-left title",
                onClick: that.handleClick.bind(this.state.that, detailQuery, title, innerMailId, senderId)
            }, title), React.createElement("span", {
                className: "fn-right time"
            }, moment(parseInt(item.innerMail.time)).format("YYYY-MM-DD HH:mm:ss"))), React.createElement("dd", {
                dangerouslySetInnerHTML: {
                    __html: item.innerMail.shortContent
                }
            }))))
        }
        ,
        MessageList.prototype.render = function() {
            var _this3 = this
              , that = this.state.that
              , data = that.props.data
              , isRRDAccount = data.data.isRRDAccount
              , errorText = this.state.errorText
              , disabled = this.state.disabled
              , textNum = this.state.textNum
              , commentValue = this.state.commentValue
              , options = this.state.options
              , tipText = this.state.tipText
              , delUserQuery = this.state.delUserQuery
              , tipDialog = void 0
              , selectProp = {
                className: "ui-selcet-list",
                name: "receiverValue",
                selectDefaultValue: this.state.receiverValue,
                options: options,
                placeholder: "发送到",
                selectChange: this.selectOnChange.bind(this)
            }
              , selectComponent = React.createElement(RSelect, selectProp)
              , sendDialog = null
              , sendInput = null;
            if (this.state.dialogShowing) {
                var sendProps = {
                    showing: !0,
                    title: "发送私信",
                    onRequestClose: this.hideSendDialog.bind(this)
                };
                sendInput = "1" == isRRDAccount ? React.createElement("input", {
                    className: "ui-rrd-input",
                    ref: "receiverValue",
                    type: "text",
                    placeholder: "发送到",
                    onChange: this.receiverValueChange.bind(this)
                }) : React.createElement("div", {
                    className: "ui-selcet-item"
                }, selectComponent),
                sendDialog = React.createElement(RWeDialog, sendProps, React.createElement("div", {
                    className: "send-content"
                }, sendInput, React.createElement("textarea", {
                    onChange: that.keyUpSendComment.bind(this),
                    className: "ui-rrd-textarea",
                    name: "send-content",
                    ref: "commentValue",
                    value: commentValue,
                    placeholder: "字数限制300以内"
                }), React.createElement("p", {
                    className: "text-num-tip"
                }, "还可以输入", React.createElement("span", {
                    className: "text-num"
                }, textNum), "字", React.createElement("span", {
                    className: "error-tip"
                }, errorText)), React.createElement("button", {
                    onClick: that.sendData.bind(this),
                    className: "ui-button ui-button-yellow ui-button-xl",
                    type: "submit",
                    disabled: disabled
                }, "确定")))
            }
            if (this.state.tipShowing) {
                var tipProps = {
                    showing: !0,
                    title: "提示信息",
                    onRequestClose: this.hideTipDialog.bind(this)
                };
                tipDialog = React.createElement(RWeDialog, tipProps, React.createElement("div", {
                    className: "del-dailog-content"
                }, React.createElement("div", {
                    className: "tip-content"
                }, tipText), React.createElement("div", {
                    className: "button-box"
                }, React.createElement("button", {
                    onClick: this.delUserCurrentData.bind(this, delUserQuery),
                    className: "ui-button ui-button-yellow ui-button-xl",
                    type: "submit"
                }, "确定"), React.createElement("span", {
                    className: "error-tip"
                }, errorText))))
            }
            return React.createElement("div", {
                className: "message-content"
            }, sendDialog, tipDialog, React.createElement("div", {
                className: "ui-account-title fn-clear"
            }, React.createElement("div", {
                className: "fn-left"
            }, "服务窗"), React.createElement("div", {
                className: "fn-right"
            }, React.createElement("a", {
                href: "/user/message/setting"
            }, "服务窗通知设置"), " |", React.createElement("a", {
                onClick: this.showSendDialog.bind(this)
            }, "发私信"))), React.createElement("div", {
                className: "message-list"
            }, React.createElement(List, _extends({}, data, {
                moudleServiceName: "message",
                url: "getMessageList",
                isHeadNeed: "no",
                isHeadNeedOrder: "no",
                createRowDom: function(item, index) {
                    return _this3.createRowDom(item, index, that)
                },
                startNum: 0,
                limit: 10,
                offset: 5
            }))))
        }
        ,
        MessageList
    }(React.Component);
    module.exports = MessageList
});
;/*!/client/widget/message/info/RListInfo.jsx*/
define("user:widget/message/info/RListInfo.jsx", function(require, exports, module) {
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
      , RWeDialog = (require("common:node_modules/react-dom/index"),
    require("common:widget/lib/jquery/jquery"),
    require("common:widget/ui/utils/utils"),
    require("common:widget/react-ui/RWeDialog/RWeDialog"))
      , RList = require("user:widget/message/list/RList.jsx")
      , RDetailList = require("user:widget/message/detail/RDetailList.jsx")
      , service = require("common:widget/ui/service/service-factory")
      , messageService = service.getService("message")
      , MessageListInfo = function(_React$Component) {
        function MessageListInfo(props) {
            _classCallCheck(this, MessageListInfo),
            _React$Component.call(this, props),
            this.state = {
                userId: this.props.userId,
                data: this.props.data,
                tipErrorText: null,
                weDialogShowing: !1,
                senderId: null,
                innerMailId: null,
                errorText: null,
                detailTitle: null,
                detailQuery: null
            }
        }
        return _inherits(MessageListInfo, _React$Component),
        MessageListInfo.prototype.showWeDialog = function(tipErrorText) {
            this.setState({
                weDialogShowing: !0,
                tipErrorText: tipErrorText
            })
        }
        ,
        MessageListInfo.prototype.hideWeDialog = function() {
            this.setState({
                weDialogShowing: !1
            })
        }
        ,
        MessageListInfo.prototype.sendData = function(senderId) {
            var _this2 = this
              , _this = this
              , receiver = this.state.receiverValue
              , comment = this.refs.commentValue.value
              , innerMailId = this.state.innerMailId;
            if (innerMailId && (receiver = this.refs.receiverValue.value),
            null == receiver || "" == receiver)
                return void this.setState({
                    errorText: "收件人不能为空！"
                });
            if (null == comment || "" == comment)
                return void this.setState({
                    errorText: "邮件内容不能为空！"
                });
            if (comment.length > 300)
                return void this.setState({
                    errorText: "内容不能超过300个字！"
                });
            var paramData = {
                receiver: receiver,
                comment: comment,
                innerMailId: innerMailId
            };
            this.state.disabled = !0,
            messageService.postMessageSend(paramData).then(function(out) {
                if (out.requestStatus === messageService.STATUS.ERROR)
                    return void _this2.setState({
                        errorText: "网络异常，请稍候再试。",
                        disabled: !1
                    });
                var rsp = out.data;
                0 == rsp.status ? _this.props.that.state.innerMailId ? (_this2.setState({
                    commentValue: "",
                    textNum: 300,
                    disabled: !1
                }),
                _this.props.that.loadDetail(_this.props.ajaxParams, _this.props.title, innerMailId, senderId)) : (_this2.setState({
                    errorText: rsp.message,
                    disabled: !1
                }),
                location.reload()) : (_this.setState({
                    errorText: rsp.message
                }),
                setTimeout(function() {
                    _this.setState({
                        errorText: "",
                        disabled: !1
                    })
                }, 5e3))
            })["catch"](function(error) {
                this.setState({
                    errorText: error
                }),
                setTimeout(function() {
                    _this.setState({
                        errorText: "",
                        disabled: !1
                    })
                }, 5e3)
            })
        }
        ,
        MessageListInfo.prototype.keyUpSendComment = function() {
            var commentValue = this.refs.commentValue.value
              , textNum = 300 - parseInt(commentValue.length);
            0 > textNum && (textNum = 0,
            commentValue = commentValue.substring(0, 300)),
            this.setState({
                textNum: textNum,
                commentValue: commentValue,
                errorText: ""
            })
        }
        ,
        MessageListInfo.prototype.handleClick = function(detailQuery, detailTitle, innerMailId, senderId) {
            this.loadDetail(detailQuery, detailTitle, innerMailId, senderId)
        }
        ,
        MessageListInfo.prototype.loadDetail = function(detailQuery, detailTitle, innerMailId, senderId) {
            var _this3 = this
              , _this = this;
            messageService.getMessageDetailList(detailQuery).then(function(out) {
                if (out.requestStatus === messageService.STATUS.ERROR)
                    return void _this3.showWeDialog("网络异常，请稍候再试。");
                var rsp = out.data;
                return rsp.data ? void _this3.setState({
                    data: rsp,
                    detailQuery: detailQuery,
                    detailTitle: detailTitle,
                    innerMailId: innerMailId,
                    senderId: senderId
                }) : void _this3.showWeDialog(rsp.message)
            })["catch"](function(error) {
                _this.showWeDialog(error.message)
            })
        }
        ,
        MessageListInfo.prototype.render = function() {
            var data = this.state.data
              , title = this.state.detailTitle
              , detailQuery = this.state.detailQuery
              , errorText = this.state.errorText
              , innerMailId = this.state.innerMailId
              , tipErrorText = this.state.tipErrorText
              , senderId = this.state.senderId
              , weDialog = void 0;
            if (this.state.weDialogShowing) {
                var weProps = {
                    showing: !0,
                    onRequestClose: this.hideWeDialog.bind(this)
                };
                weDialog = React.createElement(RWeDialog, weProps, React.createElement("div", {
                    className: "tip-content"
                }, tipErrorText))
            }
            return data.data.isRRDAccount ? React.createElement("div", null, weDialog, React.createElement(RList, {
                that: this
            })) : React.createElement("div", null, weDialog, React.createElement(RDetailList, {
                that: this,
                data: data,
                title: title,
                ajaxParams: detailQuery,
                errorText: errorText,
                innerMailId: innerMailId,
                senderId: senderId
            }))
        }
        ,
        MessageListInfo
    }(React.Component);
    module.exports = MessageListInfo
});
;/*!/client/widget/message/tab/RTab.js*/
define("user:widget/message/tab/RTab.js", function(require, exports, module) {
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
      , $ = require("common:widget/lib/jquery/jquery")
      , RSelect = require("common:widget/react-ui/RSelect/RSelect")
      , RWeDialog = require("common:widget/react-ui/RWeDialog/RWeDialog")
      , List = require("common:widget/react-ui/RList/List")
      , service = require("common:widget/ui/service/service-factory")
      , messageService = service.getService("message")
      , moment = require("common:node_modules/moment/moment")
      , typeClassNames = {
        Account: "account-icon",
        Coupon: "coupon-icon",
        Member: "member-icon",
        WebPrivateInnerMail: "private-icon"
    }
      , MessageTab = function(_React$Component) {
        function MessageTab(props) {
            _classCallCheck(this, MessageTab),
            _React$Component.call(this, props),
            this.state = {
                selectedType: "",
                errorText: null,
                commentValue: null,
                textNum: 300,
                disabled: !1,
                errorTextInner: null,
                commentValueInner: null,
                disabledInner: !1,
                textNumInner: 300,
                receiverValue: null,
                dialogShowing: !1,
                unreadCount: this.props.unreadCount,
                data: null,
                options: [{
                    label: "人人贷金贝贝",
                    value: "人人贷金贝贝"
                }, {
                    label: "人人贷金妞妞",
                    value: "人人贷金妞妞"
                }],
                showDialoguesList: !1,
                dialoguesListData: null,
                otherUserId: null,
                otherUserAvatar: "https://www.renrendai.com/cms/5864b0d6a24d131067ef7956/home/account-big.png",
                otherNickName: "",
                loading: !1,
                tipErrorText: null,
                weDialogShowing: !1
            }
        }
        return _inherits(MessageTab, _React$Component),
        MessageTab.prototype.showWeDialog = function(tipErrorText) {
            this.setState({
                weDialogShowing: !0,
                tipErrorText: tipErrorText
            })
        }
        ,
        MessageTab.prototype.hideWeDialog = function() {
            this.setState({
                weDialogShowing: !1
            })
        }
        ,
        MessageTab.prototype.componentDidMount = function() {
            var props = this.props;
            this.handleChangeTab(props.isShowMail ? "WebPrivateInnerMail" : "Account")
        }
        ,
        MessageTab.prototype.componentWillReceiveProps = function(nextProps) {
            this.setState({
                unreadCount: nextProps.unreadCount
            })
        }
        ,
        MessageTab.prototype.showSendDialog = function() {
            this.setState({
                dialogShowing: !0
            })
        }
        ,
        MessageTab.prototype.hideSendDialog = function() {
            this.setState({
                dialogShowing: !1
            })
        }
        ,
        MessageTab.prototype.selectOnChange = function(defaultValue) {
            this.setState({
                receiverValue: defaultValue
            })
        }
        ,
        MessageTab.prototype.receiverValueChange = function() {
            this.setState({
                receiverValue: this.refs.receiverValue.value
            })
        }
        ,
        MessageTab.prototype.handleChangeTab = function(type) {
            this.setState({
                selectedType: type,
                showDialoguesList: !1
            }),
            $(".msg-left-tab li").removeClass("on"),
            $("." + typeClassNames[type]).addClass("on"),
            this.loadData(type)
        }
        ,
        MessageTab.prototype.recalculateCount = function(less) {
            var $msg = $("#header-msgcount")
              , $mail = $(".account-menu .org")
              , total = parseInt($msg.attr("data-msg-count"))
              , count = total - less;
            count - less >= 100 ? ($msg.text(""),
            $msg.removeClass("msgcount-icon").addClass("msgcountmore-icon"),
            $msg.show()) : count > 0 && 100 > count && ($msg.text(count),
            $msg.removeClass("msgcountmore-icon").addClass("msgcount-icon"),
            $msg.show()),
            count > 0 && ($mail.show(),
            $mail.text("(" + count + ")")),
            0 >= count && (count = 0,
            $msg.hide(),
            $mail.hide()),
            $msg.attr("data-msg-count", count)
        }
        ,
        MessageTab.prototype.sendDataByUserId = function() {
            var _this2 = this
              , _this = this
              , state = this.state
              , addressee = state.otherUserId
              , comment = this.refs.commentValueInner.value;
            if (null == addressee || "" == addressee)
                return void this.setState({
                    errorTextInner: "收件人不能为空！"
                });
            if (null == comment || "" == comment)
                return void this.setState({
                    errorTextInner: "邮件内容不能为空！"
                });
            if (comment.length > 300)
                return void this.setState({
                    errorTextInner: "内容不能超过300个字！"
                });
            if (!this.state.disabledInner) {
                var paramData = {
                    addressee: addressee,
                    comment: comment
                };
                this.setState({
                    disabledInner: !0
                }),
                messageService.postMessageInnermailSend(paramData).then(function(out) {
                    if (out.requestStatus === messageService.STATUS.ERROR)
                        return void _this2.setState({
                            errorTextInner: "网络异常，请稍候再试。",
                            disabledInner: !1
                        });
                    var rsp = out.data;
                    return 0 == rsp.status ? (_this.setState({
                        errorTextInner: rsp.message,
                        disabledInner: !1,
                        commentValueInner: "",
                        textNumInner: 300
                    }),
                    _this.openDialoguesList(state.otherUserId, state.otherUserAvatar, state.otherNickName, !1)) : (_this.setState({
                        errorTextInner: rsp.message
                    }),
                    setTimeout(function() {
                        _this.setState({
                            errorTextInner: "",
                            disabledInner: !1
                        })
                    }, 5e3)),
                    null
                })["catch"](function(error) {
                    _this.setState({
                        errorTextInner: error
                    }),
                    setTimeout(function() {
                        _this.setState({
                            errorTextInner: "",
                            disabledInner: !1
                        })
                    }, 5e3)
                })
            }
        }
        ,
        MessageTab.prototype.keyUpSendComment = function() {
            var commentValue = this.refs.commentValue.value
              , textNum = 300 - parseInt(commentValue.length);
            0 > textNum && (textNum = 0,
            commentValue = commentValue.substring(0, 300)),
            this.setState({
                textNum: textNum,
                commentValue: commentValue,
                errorText: ""
            })
        }
        ,
        MessageTab.prototype.keyUpSendCommentInner = function() {
            var commentValueInner = this.refs.commentValueInner.value
              , textNumInner = 300 - parseInt(commentValueInner.length);
            0 > textNumInner && (textNumInner = 0,
            commentValueInner = commentValueInner.substring(0, 300)),
            this.setState({
                textNumInner: textNumInner,
                commentValueInner: commentValueInner,
                errorTextInner: ""
            })
        }
        ,
        MessageTab.prototype.sendDataByNickName = function() {
            var _this3 = this
              , _this = this
              , addresseeNickname = this.state.receiverValue
              , comment = this.refs.commentValue.value;
            if (null == addresseeNickname || "" == addresseeNickname)
                return void this.setState({
                    errorText: "收件人不能为空！"
                });
            if (null == comment || "" == comment)
                return void this.setState({
                    errorText: "邮件内容不能为空！"
                });
            if (comment.length > 300)
                return void this.setState({
                    errorText: "内容不能超过300个字！"
                });
            if (!this.state.disabled) {
                var paramData = {
                    addresseeNickname: addresseeNickname,
                    comment: comment
                };
                this.setState({
                    disabled: !0
                }),
                messageService.postMessageSendByNickname(paramData).then(function(out) {
                    if (out.requestStatus === messageService.STATUS.ERROR)
                        return void _this3.setState({
                            errorText: "网络异常，请稍候再试。",
                            disabled: !1
                        });
                    var rsp = out.data;
                    0 == rsp.status ? (_this.setState({
                        errorText: rsp.message,
                        disabled: !1
                    }),
                    location.reload()) : (_this.setState({
                        errorText: rsp.message
                    }),
                    setTimeout(function() {
                        _this.setState({
                            errorText: "",
                            disabled: !1
                        })
                    }, 5e3))
                })["catch"](function(error) {
                    _this.setState({
                        errorText: error
                    }),
                    setTimeout(function() {
                        _this.setState({
                            errorText: "",
                            disabled: !1
                        })
                    }, 5e3)
                })
            }
        }
        ,
        MessageTab.prototype.renderTab = function() {
            var state = this.state
              , props = this.props
              , privateMail = null;
            return props.isShowMail && (privateMail = React.createElement("li", {
                className: "private-icon",
                onClick: this.handleChangeTab.bind(this, "WebPrivateInnerMail")
            }, "站内信 ", state.unreadCount.WebPrivateInnerMail > 0 ? React.createElement("span", {
                className: "unread-count"
            }, state.unreadCount.WebPrivateInnerMail > 99 ? "..." : state.unreadCount.WebPrivateInnerMail) : null)),
            React.createElement("ul", {
                className: "msg-left-tab"
            }, privateMail, React.createElement("li", {
                className: "account-icon",
                onClick: this.handleChangeTab.bind(this, "Account")
            }, "账户动态 ", state.unreadCount.Account > 0 ? React.createElement("span", {
                className: "unread-count"
            }, state.unreadCount.Account > 99 ? "..." : state.unreadCount.Account) : null), React.createElement("li", {
                className: "member-icon",
                onClick: this.handleChangeTab.bind(this, "Member")
            }, "会员积分 ", state.unreadCount.Member > 0 ? React.createElement("span", {
                className: "unread-count"
            }, state.unreadCount.Member > 99 ? "..." : state.unreadCount.Member) : null), React.createElement("li", {
                className: "coupon-icon",
                onClick: this.handleChangeTab.bind(this, "Coupon")
            }, "优惠券 ", state.unreadCount.Coupon > 0 ? React.createElement("span", {
                className: "unread-count"
            }, state.unreadCount.Coupon > 99 ? "..." : state.unreadCount.Coupon) : null))
        }
        ,
        MessageTab.prototype.loadData = function(type) {
            var _this4 = this
              , state = this.state
              , paramData = {
                type: type,
                startNum: 0,
                limit: 20
            }
              , serviceName = "WebPrivateInnerMail" == type ? "getUserInnermailDialogues" : "getMessageListOfType";
            this.setState({
                loading: !0
            }),
            messageService[serviceName](paramData).then(function(out) {
                if (out.requestStatus === messageService.STATUS.ERROR)
                    return _this4.setState({
                        loading: !1
                    }),
                    void _this4.showWeDialog("网络异常，请稍候再试。");
                var rsp = out.data;
                if (0 != rsp.status && _this4.showWeDialog(rsp.message || "网络异常，请稍候再试。"),
                _this4.setState({
                    data: rsp,
                    loading: !1
                }),
                "WebPrivateInnerMail" != type && state.unreadCount[type] > 0) {
                    var _Object$assign;
                    _this4.recalculateCount(state.unreadCount[type]);
                    var data = Object.assign({}, state.unreadCount, (_Object$assign = {},
                    _Object$assign[type] = 0,
                    _Object$assign));
                    _this4.setState({
                        unreadCount: data
                    })
                }
            })["catch"](function(error) {
                this.showWeDialog(error.message || "网络异常，请稍候再试。")
            })
        }
        ,
        MessageTab.prototype.createRowHasTitleDom = function(item) {
            return React.createElement("div", {
                className: "msg-has-title-row"
            }, React.createElement("div", {
                className: "msg-time"
            }, moment(item.receiveTime).format("YYYY-MM-DD HH:mm")), React.createElement("div", {
                className: "msg-detail"
            }, React.createElement("div", {
                className: "msg-title"
            }, item.title), React.createElement("div", {
                className: "msg-content",
                dangerouslySetInnerHTML: {
                    __html: item.content
                }
            })))
        }
        ,
        MessageTab.prototype.createRowMailListDom = function(item) {
            var unreadCount = null;
            return item.unreadCount > 0 && (unreadCount = React.createElement("span", {
                className: "unread-count"
            }, item.unreadCount)),
            React.createElement("div", {
                className: "private-list"
            }, React.createElement("div", {
                className: "msg-time"
            }, moment(item.receiveTime).format("YYYY-MM-DD HH:mm")), React.createElement("div", {
                className: "dialog-wrap fn-clear",
                onClick: this.openDialoguesList.bind(this, item.otherUserId, item.otherUserAvatar, item.nickName, !0, item.unreadCount)
            }, React.createElement("div", {
                className: "user-avatar"
            }, React.createElement("img", {
                src: item.otherUserAvatar
            })), React.createElement("div", {
                className: "dialog-detail"
            }, React.createElement("div", {
                className: "nick-name"
            }, item.nickName, " ", unreadCount), React.createElement("div", {
                className: "msg-content",
                dangerouslySetInnerHTML: {
                    __html: item.content
                }
            }))))
        }
        ,
        MessageTab.prototype.createRowDialoguesListDom = function(item) {
            var state = this.state
              , props = this.props
              , detail = null;
            return detail = "IN" == item.mailbox ? React.createElement("div", {
                className: "dialogues-detail in fn-clear"
            }, React.createElement("div", {
                className: "user-avatar"
            }, React.createElement("img", {
                src: state.otherUserAvatar
            })), React.createElement("div", {
                className: "dialogues-content"
            }, React.createElement("div", {
                className: "user-name"
            }, state.otherNickName), React.createElement("div", {
                className: "msg-content",
                dangerouslySetInnerHTML: {
                    __html: item.content
                }
            }))) : React.createElement("div", {
                className: "dialogues-detail out fn-clear"
            }, React.createElement("div", {
                className: "user-avatar"
            }, React.createElement("img", {
                src: props.userAvatar
            })), React.createElement("div", {
                className: "dialogues-content"
            }, React.createElement("div", {
                className: "msg-content",
                dangerouslySetInnerHTML: {
                    __html: item.content
                }
            }))),
            React.createElement("div", {
                className: "dialogues-list-wrap"
            }, React.createElement("div", {
                className: "dialogues-item"
            }, React.createElement("div", {
                className: "msg-time"
            }, moment(item.receiveTime).format("YYYY-MM-DD HH:mm")), detail))
        }
        ,
        MessageTab.prototype.openDialoguesList = function(otherUserId, otherUserAvatar, nickName, isLoading, unreadCount) {
            var _this5 = this
              , state = this.state;
            this.setState({
                loading: isLoading
            }),
            messageService.getPrivateInnerMailList({
                otherUserId: otherUserId,
                startNum: 0,
                limit: 20
            }).then(function(out) {
                if (out.requestStatus === messageService.STATUS.ERROR)
                    return void _this5.setState({
                        loading: !1
                    });
                var rsp = out.data;
                0 != rsp.status && (_this5.setState({
                    loading: !1
                }),
                _this5.showWeDialog(rsp.message || "网络异常，请稍候再试。")),
                _this5.setState({
                    showDialoguesList: !0,
                    dialoguesListData: rsp,
                    otherUserId: otherUserId,
                    otherUserAvatar: otherUserAvatar,
                    otherNickName: nickName,
                    loading: !1
                });
                var initCount = state.unreadCount.WebPrivateInnerMail;
                if (initCount > 0) {
                    var lessCount = unreadCount || 0;
                    _this5.recalculateCount(lessCount);
                    var count = initCount - lessCount
                      , data = Object.assign({}, state.unreadCount, {
                        WebPrivateInnerMail: count > 0 ? count : 0
                    });
                    _this5.setState({
                        unreadCount: data
                    })
                }
                return null
            })["catch"](function(error) {
                this.showWeDialog(error.message || "网络异常，请稍候再试。")
            })
        }
        ,
        MessageTab.prototype.renderContent = function() {
            var state = this.state
              , type = state.selectedType
              , list = null
              , data = state.data
              , ajaxParams = {
                type: type
            };
            return list = "WebPrivateInnerMail" == type ? React.createElement(List, _extends({}, data, {
                moudleServiceName: "message",
                url: "getUserInnermailDialogues",
                ajaxParams: ajaxParams,
                isHeadNeed: "no",
                isHeadNeedOrder: "no",
                createRowDom: this.createRowMailListDom.bind(this),
                noDataText: "暂无消息",
                startNum: 0,
                limit: 2e3,
                offset: 5
            })) : React.createElement(List, _extends({}, data, {
                moudleServiceName: "message",
                url: "getMessageListOfType",
                ajaxParams: ajaxParams,
                isHeadNeed: "no",
                isHeadNeedOrder: "no",
                createRowDom: this.createRowHasTitleDom.bind(this),
                noDataText: "暂无消息",
                startNum: 0,
                limit: 20,
                offset: 5
            })),
            React.createElement("div", {
                className: "msg-right-content"
            }, list)
        }
        ,
        MessageTab.prototype.renderDialoguesList = function() {
            var state = (this.props.that,
            this.state)
              , data = state.dialoguesListData
              , errorText = state.errorTextInner
              , textNum = state.textNumInner
              , commentValue = state.commentValueInner
              , ajaxParams = {
                otherUserId: state.otherUserId
            }
              , list = React.createElement(List, _extends({}, data, {
                moudleServiceName: "message",
                url: "getPrivateInnerMailList",
                ajaxParams: ajaxParams,
                isHeadNeed: "no",
                isHeadNeedOrder: "no",
                createRowDom: this.createRowDialoguesListDom.bind(this),
                noDataText: "暂无消息",
                startNum: 0,
                limit: 20,
                offset: 5
            }))
              , sentDialogues = React.createElement("div", {
                className: "send-from"
            }, React.createElement("textarea", {
                onChange: this.keyUpSendCommentInner.bind(this),
                className: "ui-rrd-textarea",
                name: "send-content",
                ref: "commentValueInner",
                value: commentValue,
                placeholder: "字数限制300以内"
            }), React.createElement("div", {
                className: "article-box fn-clear"
            }, React.createElement("div", {
                className: "fn-left"
            }, React.createElement("p", {
                className: "text-num-tip"
            }, "还可以输入", React.createElement("span", {
                className: "text-num"
            }, textNum), "字", React.createElement("span", {
                className: "error-tip"
            }, errorText))), React.createElement("div", {
                className: "fn-right"
            }, React.createElement("button", {
                onClick: this.sendDataByUserId.bind(this, state.otherUserId),
                className: "ui-button ui-button-yellow ui-button-xl",
                type: "submit"
            }, "发送"))));
            return React.createElement("div", {
                className: "msg-right-content"
            }, React.createElement("div", {
                className: "go-back-mail-list"
            }, React.createElement("a", {
                href: "javascript:",
                onClick: this.handleGoBackMail.bind(this)
            }, "返回私信列表")), list, sentDialogues)
        }
        ,
        MessageTab.prototype.handleGoBackMail = function() {
            this.setState({
                selectedType: "WebPrivateInnerMail",
                showDialoguesList: !1,
                dialoguesListData: null
            }),
            this.loadData("WebPrivateInnerMail")
        }
        ,
        MessageTab.prototype.renderSendDialog = function() {
            var props = this.props
              , state = this.state
              , isRRDAccount = (props.that,
            props.isRRDAccount)
              , errorText = state.errorText
              , disabled = state.disabled
              , textNum = state.textNum
              , commentValue = state.commentValue
              , options = state.options
              , selectProp = {
                className: "ui-selcet-list",
                name: "receiverValue",
                selectDefaultValue: this.state.receiverValue,
                options: options,
                placeholder: "发送到",
                selectChange: this.selectOnChange.bind(this)
            }
              , selectComponent = React.createElement(RSelect, selectProp)
              , sendDialog = null
              , sendInput = null;
            if (state.dialogShowing) {
                var sendProps = {
                    showing: !0,
                    title: "发送私信",
                    onRequestClose: this.hideSendDialog.bind(this)
                };
                sendInput = "true" == isRRDAccount ? React.createElement("input", {
                    className: "ui-rrd-input",
                    ref: "receiverValue",
                    type: "text",
                    placeholder: "发送到",
                    onChange: this.receiverValueChange.bind(this)
                }) : React.createElement("div", {
                    className: "ui-selcet-item"
                }, selectComponent),
                sendDialog = React.createElement(RWeDialog, sendProps, React.createElement("div", {
                    className: "send-content"
                }, sendInput, React.createElement("textarea", {
                    onChange: this.keyUpSendComment.bind(this),
                    className: "ui-rrd-textarea",
                    name: "send-content",
                    ref: "commentValue",
                    value: commentValue,
                    placeholder: "字数限制300以内"
                }), React.createElement("p", {
                    className: "text-num-tip"
                }, "还可以输入", React.createElement("span", {
                    className: "text-num"
                }, textNum), "字", React.createElement("span", {
                    className: "error-tip"
                }, errorText)), React.createElement("button", {
                    onClick: this.sendDataByNickName.bind(this),
                    className: "ui-button ui-button-yellow ui-button-xl",
                    type: "submit",
                    disabled: disabled
                }, "确定")))
            }
            return sendDialog
        }
        ,
        MessageTab.prototype.renderTitle = function() {
            return React.createElement("div", {
                className: "ui-account-title fn-clear"
            }, React.createElement("div", {
                className: "fn-left"
            }, "消息中心"), React.createElement("div", {
                className: "fn-right"
            }, React.createElement("a", {
                href: "/user/message/setting"
            }, "消息中心通知设置"), " |", React.createElement("a", {
                onClick: this.showSendDialog.bind(this, "name")
            }, "发私信")))
        }
        ,
        MessageTab.prototype.render = function() {
            var state = this.state
              , sendDialog = this.renderSendDialog()
              , msgTitle = this.renderTitle()
              , leftTab = this.renderTab()
              , tipErrorText = state.tipErrorText
              , weDialog = void 0
              , rightContent = null;
            if (rightContent = state.loading ? React.createElement("div", {
                className: "msg-right-content"
            }, React.createElement("div", {
                className: "list-loading"
            })) : state.showDialoguesList ? this.renderDialoguesList() : this.renderContent(),
            this.state.weDialogShowing) {
                var weProps = {
                    showing: !0,
                    onRequestClose: this.hideWeDialog.bind(this)
                };
                weDialog = React.createElement(RWeDialog, weProps, React.createElement("div", {
                    className: "tip-content"
                }, tipErrorText))
            }
            return React.createElement("div", null, weDialog, sendDialog, React.createElement("div", {
                className: "message-content"
            }, msgTitle, React.createElement("div", {
                className: "message-wrap fn-clear"
            }, leftTab, rightContent)))
        }
        ,
        MessageTab
    }(React.Component);
    module.exports = MessageTab
});
;/*!/client/widget/message/main/RMain.js*/
define("user:widget/message/main/RMain.js", function(require, exports, module) {
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
      , RMsgTab = (require("common:widget/lib/jquery/jquery"),
    require("user:widget/message/tab/RTab"))
      , MessageMain = function(_React$Component) {
        function MessageMain(props) {
            _classCallCheck(this, MessageMain),
            _React$Component.call(this, props)
        }
        return _inherits(MessageMain, _React$Component),
        MessageMain.prototype.render = function() {
            var props = this.props
              , pageDom = (this.state,
            React.createElement(RMsgTab, {
                unreadCount: props.unreadCount,
                that: this,
                userId: props.userId,
                isRRDAccount: props.isRRDAccount,
                userAvatar: props.userAvatar,
                isShowMail: props.isShowMail
            }));
            return React.createElement("div", null, pageDom)
        }
        ,
        MessageMain
    }(React.Component);
    module.exports = MessageMain
});
;/*!/client/widget/privilege/bonuslist/RBonusList.jsx*/
define("user:widget/privilege/bonuslist/RBonusList.jsx", function(require, exports, module) {
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
      , List = (require("common:node_modules/react-dom/index"),
    require("common:widget/react-ui/RList/List"))
      , RWeDialog = require("common:widget/react-ui/RWeDialog/RWeDialog")
      , moment = require("common:node_modules/moment/moment")
      , MyBonusList = function(_React$Component) {
        function MyBonusList(props) {
            _classCallCheck(this, MyBonusList),
            _React$Component.call(this, props),
            this.state = {
                data: this.props.data,
                tipText: null,
                dialogShowing: !1
            }
        }
        return _inherits(MyBonusList, _React$Component),
        MyBonusList.prototype.showWeDialog = function(tipText) {
            this.setState({
                dialogShowing: !0,
                tipText: tipText
            })
        }
        ,
        MyBonusList.prototype.hideWeDialog = function() {
            this.setState({
                dialogShowing: !1
            })
        }
        ,
        MyBonusList.prototype.createHeadDom = function() {
            return React.createElement("ul", {
                className: "bonus-list-header fn-clear"
            }, React.createElement("li", {
                className: "bonus-name"
            }, "好友"), React.createElement("li", {
                className: "bonus-register"
            }, "注册时间"), React.createElement("li", {
                className: "bonus-status"
            }, "出借状态"), React.createElement("li", {
                className: "bonus-reward"
            }, "我的奖励"))
        }
        ,
        MyBonusList.prototype.createRowDom = function(item, index) {
            var itemClass = "fn-clear bonus-list-item "
              , time = void 0
              , product = void 0;
            return index % 2 == 1 && (itemClass += "even"),
            item.investProduct ? (time = moment(item.investTime).format("YYYY年MM月DD日 HH:mm:ss"),
            product = item.investProduct) : (time = "--",
            product = "--"),
            React.createElement("ul", {
                className: itemClass
            }, React.createElement("li", {
                className: "bonus-name"
            }, item.realName), React.createElement("li", {
                className: "bonus-register"
            }, item.registerTime), React.createElement("li", {
                className: "bonus-status"
            }, "1" == item.isFinance ? "已出借" : "未出借"), React.createElement("li", {
                className: "bonus-reward"
            }, item.reward))
        }
        ,
        MyBonusList.prototype.render = function() {
            var data = this.state.data
              , tipText = this.state.tipText
              , weDialog = void 0;
            if (this.state.dialogShowing) {
                var weProps = {
                    showing: !0,
                    onRequestClose: this.hideWeDialog.bind(this)
                };
                weDialog = React.createElement(RWeDialog, weProps, React.createElement("div", {
                    className: "tip-content"
                }, tipText))
            }
            return React.createElement("div", {
                className: "my-bonus-main"
            }, weDialog, React.createElement(List, _extends({}, data, {
                moudleServiceName: "privilege",
                url: "getRewardList",
                isHeadNeed: "yes",
                isHeadNeedOrder: "no",
                createHeadDom: this.createHeadDom,
                createRowDom: this.createRowDom,
                noDataText: "您还未邀请好友，赶快去邀请！",
                startNum: 0,
                limit: 10,
                offset: 5
            })))
        }
        ,
        MyBonusList
    }(React.Component);
    module.exports = MyBonusList
});
;/*!/client/widget/privilege/coupon/RCouponList.jsx*/
define("user:widget/privilege/coupon/RCouponList.jsx", function(require, exports, module) {
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
      , List = (require("common:node_modules/react-dom/index"),
    require("common:widget/react-ui/RList/ListV2.0"))
      , RWeDialog = require("common:widget/react-ui/RWeDialog/RWeDialog")
      , service = require("common:widget/ui/service/service-factory")
      , privilegeService = service.getService("privilege")
      , moment = require("common:node_modules/moment/moment")
      , numeral = require("common:node_modules/numeral/numeral")
      , CouponList = function(_React$Component) {
        function CouponList(props) {
            _classCallCheck(this, CouponList),
            _React$Component.call(this, props),
            this.state = {
                that: this.props.that,
                dialogTipShowing: !1,
                dialogUcodeShowing: !1,
                tipText: null,
                errorTip: null,
                ucodeData: null,
                uplanData: null,
                disabled: !1,
                listData: null,
                startNum: 0
            }
        }
        return _inherits(CouponList, _React$Component),
        CouponList.prototype.showTipDialog = function() {
            this.setState({
                dialogTipShowing: !0
            })
        }
        ,
        CouponList.prototype.hideTipDialog = function() {
            this.setState({
                dialogTipShowing: !1
            })
        }
        ,
        CouponList.prototype.showUcodeDialog = function() {
            this.setState({
                dialogUcodeShowing: !0
            })
        }
        ,
        CouponList.prototype.hideUcodeDialog = function() {
            this.setState({
                dialogUcodeShowing: !1,
                tipText: null,
                errorTip: null
            })
        }
        ,
        CouponList.prototype.timeOut = function() {
            var that = this
              , timer = null;
            clearTimeout(timer),
            timer = setTimeout(function() {
                that.setState({
                    tipText: "",
                    disabled: !1
                })
            }, 5e3)
        }
        ,
        CouponList.prototype._reserveValueFormat = function(number) {
            if (isNaN(number))
                return number;
            if (1e4 > number)
                number = numeral(number).format("0,0") + "元";
            else {
                var temp = numeral(number).divide(1e4)
                  , tempV = temp.value();
                number % 1e4 == 0 ? number = numeral(tempV).format("0,0") + "万元" : (tempV = Math.floor(10 * tempV) / 10,
                number = numeral(tempV).format("0,0.0") + "万元")
            }
            return number
        }
        ,
        CouponList.prototype.goJoinUplan = function(financePlanId, couponId) {
            var _this = this
              , that = this.props.that
              , paramData = {
                couponId: couponId,
                financePlanId: financePlanId
            };
            this.state.disabled || (this.state.disabled = !0,
            privilegeService.postUplanDetail(paramData).then(function(out) {
                return out.requestStatus === privilegeService.STATUS.ERROR ? (that.setState({
                    tipText: "网络异常，请稍候再试。"
                }),
                void _this.timeOut()) : void (0 == out.data.status ? window.location.href = "/uplan/product/detail?financePlanId=" + financePlanId + "&couponId=" + couponId : (_this.hideUcodeDialog(),
                _this.showTipDialog(),
                _this.setState({
                    errorTip: out.data.message,
                    disabled: !1
                })))
            })["catch"](function(error) {
                that.setState({
                    tipText: error.message
                }),
                _this.timeOut()
            }))
        }
        ,
        CouponList.prototype.uCodeDialog = function(couponId) {
            var _this2 = this
              , that = this.props.that
              , paramData = {
                couponId: couponId,
                fromMyCoupons: "fromCoupon"
            };
            privilegeService.postUseUcode(paramData).then(function(out) {
                if (out.requestStatus === privilegeService.STATUS.ERROR)
                    return void that.showWeDialog("网络异常，请稍候再试。");
                var rsp = out.data;
                return rsp.data ? (_this2.showUcodeDialog(),
                void _this2.setState({
                    ucodeData: rsp.data
                })) : void that.showWeDialog(rsp.message)
            })["catch"](function(error) {
                that.showWeDialog(error.message)
            })
        }
        ,
        CouponList.prototype.createUnUseRow = function(item) {
            var remindDom = void 0;
            item.expireRemind && (remindDom = React.createElement("span", {
                className: "remind"
            }, item.expireRemind));
            var incrInterestDays = item.incrInterestDays;
            if ("VOUCHER" == item.couponTypeEng) {
                var tag = item.tag
                  , tagDom = "";
                return tag && (tagDom = React.createElement("li", null, item.tag)),
                React.createElement("li", {
                    className: "voucher"
                }, React.createElement("h2", {
                    className: "money"
                }, item.couponValue ? item.couponValue : "", "元现金券", remindDom), React.createElement("ul", {
                    className: "used-detail"
                }, tagDom, React.createElement("li", null, item.allowBusinessCategoryShow), React.createElement("li", null, moment(item.validDateFrom).format("YYYY年MM月DD日"), "-", moment(item.validDateEnd).format("YYYY年MM月DD日")), React.createElement("li", null, "最低出借金额:", numeral(item.minInvestAmount).format("0,0"), "元")))
            }
            if ("UCODE" == item.couponTypeEng) {
                var tag = item.tag
                  , tagDom = ""
                  , uplanTypeDom = void 0;
                return tag && (tagDom = React.createElement("li", null, item.tag)),
                uplanTypeDom = React.createElement("li", null, "可预约金额：", numeral(item.minInvestAmount).format("0,0"), "元~", numeral(item.maxInvestAmount).format("0,0"), "元"),
                React.createElement("li", {
                    className: "reserve"
                }, React.createElement("h2", {
                    className: "money"
                }, this._reserveValueFormat(item.couponValue), "预约券"), React.createElement("ul", {
                    className: "used-detail"
                }, uplanTypeDom, React.createElement("li", null, item.allowBusinessCategoryShow), React.createElement("li", null, moment(item.validDateFrom).format("YYYY年MM月DD日"), "-", moment(item.validDateEnd).format("YYYY年MM月DD日")), tagDom))
            }
            if ("DISCOUNT" == item.couponTypeEng) {
                var tag = item.tag
                  , tagDom = "";
                return tag && (tagDom = React.createElement("li", null, item.tag)),
                React.createElement("li", {
                    className: "discount"
                }, React.createElement("h2", {
                    className: "money"
                }, item.couponValue ? item.couponValue : "", "元抵扣券", remindDom), React.createElement("ul", {
                    className: "used-detail"
                }, tagDom, React.createElement("li", null, item.allowBusinessCategoryShow), React.createElement("li", null, "限定使用比例：", item.discountRate, "%"), React.createElement("li", null, moment(item.validDateFrom).format("YYYY年MM月DD日"), "-", moment(item.validDateEnd).format("YYYY年MM月DD日"))))
            }
            if ("EXTRA_INTEREST" == item.couponTypeEng) {
                var tag = item.tag
                  , tagDom = void 0
                  , uplanTypeDom = void 0;
                tag && (tagDom = React.createElement("li", null, item.tag)),
                item.maxInvestAmount && (uplanTypeDom = React.createElement("li", null, "出借金额不超过", numeral(item.maxInvestAmount).format("0,0"), "元")),
                item.minInvestAmount && (uplanTypeDom = React.createElement("li", null, "出借金额不少于", numeral(item.minInvestAmount).format("0,0"), "元"));
                var incrInterestDaysText = incrInterestDays ? "（加息" + incrInterestDays + "天）" : "";
                return React.createElement("li", {
                    className: "interest"
                }, React.createElement("h2", {
                    className: "money"
                }, item.incrInterestRate, "%加息券", incrInterestDaysText, remindDom), React.createElement("ul", {
                    className: "used-detail"
                }, tagDom, React.createElement("li", null, item.allowBusinessCategoryShow), uplanTypeDom, React.createElement("li", null, moment(item.validDateFrom).format("YYYY年MM月DD日"), "-", moment(item.validDateEnd).format("YYYY年MM月DD日"))))
            }
            if ("INCR_INTEREST" == item.couponTypeEng) {
                var tag = item.tag
                  , tagDom = "";
                tag && (tagDom = React.createElement("li", null, item.tag));
                var incrInterestDaysText = incrInterestDays ? "（加息" + incrInterestDays + "天）" : "";
                return React.createElement("li", {
                    className: "interest"
                }, React.createElement("h2", {
                    className: "money"
                }, item.incrInterestRate, "%续期加息券", incrInterestDaysText, remindDom), React.createElement("ul", {
                    className: "used-detail"
                }, tagDom, React.createElement("li", null, item.allowBusinessCategoryShow), React.createElement("li", null, "续期", item.incrInterestCurrentBusinessCategoryShow, "时可用"), React.createElement("li", null, moment(item.validDateFrom).format("YYYY年MM月DD日"), "-", moment(item.validDateEnd).format("YYYY年MM月DD日"))))
            }
            var tag = item.tag
              , tagDom = "";
            return tag && (tagDom = React.createElement("li", null, item.tag)),
            React.createElement("li", {
                className: "other"
            }, React.createElement("h2", {
                className: "money"
            }, "充值免费券", remindDom), React.createElement("ul", {
                className: "used-detail"
            }, tagDom, React.createElement("li", null, "仅限充值时使用"), React.createElement("li", null, moment(item.validDateFrom).format("YYYY年MM月DD日"), "-", moment(item.validDateEnd).format("YYYY年MM月DD日"))))
        }
        ,
        CouponList.prototype.createUseRow = function(item) {
            var remindDom = void 0;
            item.consumeTime && (remindDom = React.createElement("span", {
                className: "remind"
            }, moment(item.consumeTime).format("YYYY年MM月DD日"), "使用"));
            var incrInterestDays = item.incrInterestDays;
            if ("VOUCHER" == item.couponTypeEng)
                return React.createElement("li", {
                    className: "voucher"
                }, React.createElement("h2", {
                    className: "money"
                }, item.couponValue ? item.couponValue : "", "元现金券 ", remindDom), React.createElement("ul", {
                    className: "used-detail"
                }, React.createElement("li", null, "出借金额：", numeral(item.investAmount).format("0,0"), "元"), React.createElement("li", null, "交易明细：", item.consumeMemo)));
            if ("UCODE" == item.couponTypeEng) {
                var _name = this._reserveValueFormat(item.couponValue) + "预约券";
                return React.createElement("li", {
                    className: "reserve"
                }, React.createElement("h2", {
                    className: "money"
                }, " ", item.couponValue ? _name : " UCODE", " ", remindDom), React.createElement("ul", {
                    className: "used-detail"
                }, React.createElement("li", null, "出借金额：", numeral(item.investAmount).format("0,0"), "元"), React.createElement("li", null, "交易明细：", item.consumeMemo)))
            }
            if ("DISCOUNT" == item.couponTypeEng)
                return React.createElement("li", {
                    className: "discount"
                }, React.createElement("h2", {
                    className: "money"
                }, item.couponValue ? item.couponValue : "", "元抵扣券", remindDom), React.createElement("ul", {
                    className: "used-detail"
                }, React.createElement("li", null, "出借金额：", numeral(item.investAmount).format("0,0"), "元"), React.createElement("li", null, "交易明细：", item.consumeMemo)));
            if ("EXTRA_INTEREST" == item.couponTypeEng) {
                var incrInterestDaysText = "";
                return incrInterestDays && (incrInterestDaysText = React.createElement("li", null, "加息期限：", incrInterestDays, "天")),
                React.createElement("li", {
                    className: "interest"
                }, React.createElement("h2", {
                    className: "money"
                }, item.incrInterestRate, "%加息券", remindDom), React.createElement("ul", {
                    className: "used-detail"
                }, React.createElement("li", null, "出借金额：", numeral(item.investAmount).format("0,0"), "元"), React.createElement("li", null, "交易明细：", item.consumeMemo), incrInterestDaysText))
            }
            if ("INCR_INTEREST" == item.couponTypeEng) {
                var incrInterestDaysText = "";
                return incrInterestDays && (incrInterestDaysText = React.createElement("li", null, "加息期限：", incrInterestDays, "天")),
                React.createElement("li", {
                    className: "interest"
                }, React.createElement("h2", {
                    className: "money"
                }, item.incrInterestRate, "%续期加息券", remindDom), React.createElement("ul", {
                    className: "used-detail"
                }, React.createElement("li", null, "出借金额：", numeral(item.investAmount).format("0,0"), "元"), React.createElement("li", null, "交易明细：", item.consumeMemo), incrInterestDaysText))
            }
            return React.createElement("li", {
                className: "other"
            }, React.createElement("h2", {
                className: "money"
            }, "充值免费券 ", remindDom, "}"), React.createElement("ul", {
                className: "used-detail"
            }, React.createElement("li", null, "充值金额：", numeral(item.investAmount).format("0,0"), "元")))
        }
        ,
        CouponList.prototype.createExpireRow = function(item) {
            var remindDom = React.createElement("span", {
                className: "remind"
            }, "已失效")
              , incrInterestDays = item.incrInterestDays;
            if ("VOUCHER" == item.couponTypeEng)
                return React.createElement("li", {
                    className: "expired"
                }, React.createElement("h2", {
                    className: "money"
                }, item.couponValue ? item.couponValue : "", "元现金券 ", remindDom), React.createElement("ul", {
                    className: "used-detail"
                }, React.createElement("li", null, item.allowBusinessCategoryShow), React.createElement("li", null, moment(item.validDateFrom).format("YYYY年MM月DD日"), "-", moment(item.validDateEnd).format("YY年MM月DD日"))));
            if ("UCODE" == item.couponTypeEng) {
                var _name2 = this._reserveValueFormat(item.couponValue) + "预约券"
                  , uplanTypeDom = React.createElement("li", null, "限定加入金额：", numeral(item.minInvestAmount).format("0,0"), "元");
                return item.maxInvestAmount > 0 && (uplanTypeDom = React.createElement("li", null, "可预约金额：", numeral(item.minInvestAmount).format("0,0"), "元~", numeral(item.maxInvestAmount).format("0,0"), "元")),
                React.createElement("li", {
                    className: "expired"
                }, React.createElement("h2", {
                    className: "money"
                }, item.couponValue ? _name2 : "UCODE", " ", remindDom), React.createElement("ul", {
                    className: "used-detail"
                }, React.createElement("li", null, item.allowBusinessCategoryShow), uplanTypeDom, React.createElement("li", null, moment(item.validDateFrom).format("YYYY年MM月DD日"), "-", moment(item.validDateEnd).format("YYYY年MM月DD日"))))
            }
            if ("DISCOUNT" == item.couponTypeEng)
                return React.createElement("li", {
                    className: "discount expired"
                }, React.createElement("h2", {
                    className: "money"
                }, item.couponValue ? item.couponValue : "", "元抵扣券", remindDom), React.createElement("ul", {
                    className: "used-detail"
                }, React.createElement("li", null, item.allowBusinessCategoryShow), React.createElement("li", null, "限定使用比例：", item.discountRate, "%"), React.createElement("li", null, moment(item.validDateFrom).format("YYYY年MM月DD日"), "-", moment(item.validDateEnd).format("YYYY年MM月DD日"))));
            if ("EXTRA_INTEREST" == item.couponTypeEng) {
                var uplanTypeDom = void 0;
                item.maxInvestAmount && (uplanTypeDom = React.createElement("li", null, "出借金额不超过", numeral(item.maxInvestAmount).format("0,0"), "元")),
                item.minInvestAmount && (uplanTypeDom = React.createElement("li", null, "出借金额不少于", numeral(item.maxInvestAmount).format("0,0"), "元"));
                var incrInterestDaysText = "";
                return incrInterestDays && (incrInterestDaysText = React.createElement("li", null, "加息", incrInterestDays, "天")),
                React.createElement("li", {
                    className: "expired"
                }, React.createElement("h2", {
                    className: "money"
                }, item.incrInterestRate, "%加息券 ", remindDom), React.createElement("ul", {
                    className: "used-detail"
                }, React.createElement("li", null, item.allowBusinessCategoryShow), uplanTypeDom, React.createElement("li", null, moment(item.validDateFrom).format("YYYY年MM月DD日"), "-", moment(item.validDateEnd).format("YYYY年MM月DD日")), incrInterestDaysText))
            }
            if ("INCR_INTEREST" == item.couponTypeEng) {
                var incrInterestDaysText = "";
                return incrInterestDays && (incrInterestDaysText = React.createElement("li", null, "加息", incrInterestDays, "天")),
                React.createElement("li", {
                    className: "expired"
                }, React.createElement("h2", {
                    className: "money"
                }, item.incrInterestRate, "%续期加息券", remindDom), React.createElement("ul", {
                    className: "used-detail"
                }, React.createElement("li", null, item.allowBusinessCategoryShow), React.createElement("li", null, "限续期", item.incrInterestCurrentBusinessCategoryShow, "时可用"), React.createElement("li", null, moment(item.validDateFrom).format("YYYY年MM月DD日"), "-", moment(item.validDateEnd).format("YYYY年MM月DD日")), incrInterestDaysText))
            }
            return React.createElement("li", {
                className: "expired"
            }, React.createElement("h2", {
                className: "money"
            }, "充值免费券", remindDom), React.createElement("ul", {
                className: "used-detail"
            }, React.createElement("li", null, "仅限充值时使用"), React.createElement("li", null, moment(item.validDateFrom).format("YYYY年MM月DD日"), "-", moment(item.validDateEnd).format("YYYY年MM月DD日"))))
        }
        ,
        CouponList.prototype.handleUpdatedData = function(data, startNum) {
            this.setState({
                listData: data,
                startNum: startNum
            })
        }
        ,
        CouponList.prototype.renderUnUseCoupon = function(searchType) {
            var list = null
              , data = (this.props.that,
            this.props.data)
              , listData = this.state.listData
              , startNum = this.state.startNum;
            listData && 0 == listData.status && (data = this.state.listData);
            var ajaxParams = {
                searchType: searchType
            };
            return list = data ? React.createElement(List, _extends({}, data, {
                moudleServiceName: "privilege",
                url: "getCouponList",
                ajaxParams: ajaxParams,
                isHeadNeed: "no",
                isHeadNeedOrder: "no",
                createRowDom: this.createUnUseRow.bind(this),
                updateTheData: this.handleUpdatedData.bind(this),
                noDataText: "没有未使用的优惠券",
                startNum: startNum,
                limit: 6,
                offset: 5
            })) : React.createElement("div", {
                className: "list-loading-whole"
            }, React.createElement("div", {
                className: "list-loading"
            })),
            React.createElement("div", {
                className: "unuse-coupon-list"
            }, list)
        }
        ,
        CouponList.prototype.renderUseCoupon = function(searchType) {
            var list = null
              , data = (this.props.that,
            this.props.that.state.useCouponData)
              , ajaxParams = {
                searchType: searchType
            };
            return list = data ? React.createElement(List, _extends({}, data, {
                moudleServiceName: "privilege",
                url: "getCouponList",
                ajaxParams: ajaxParams,
                isHeadNeed: "no",
                isHeadNeedOrder: "no",
                createRowDom: this.createUseRow.bind(this),
                noDataText: "没有已使用的优惠券",
                startNum: 0,
                limit: 6,
                offset: 5
            })) : React.createElement("div", {
                className: "list-loading-whole"
            }, React.createElement("div", {
                className: "list-loading"
            })),
            React.createElement("div", {
                className: "use-coupon-list"
            }, list)
        }
        ,
        CouponList.prototype.renderExpireCoupon = function(searchType) {
            var list = null
              , data = this.props.that.state.expireCouponData
              , ajaxParams = {
                searchType: searchType
            };
            return list = data ? React.createElement(List, _extends({}, data, {
                moudleServiceName: "privilege",
                url: "getCouponList",
                ajaxParams: ajaxParams,
                isHeadNeed: "no",
                isHeadNeedOrder: "no",
                createRowDom: this.createExpireRow.bind(this),
                noDataText: "没有已失效的优惠券",
                startNum: 0,
                limit: 6,
                offset: 5
            })) : React.createElement("div", {
                className: "list-loading-whole"
            }, React.createElement("div", {
                className: "list-loading"
            })),
            React.createElement("div", {
                className: "expire-coupon-list"
            }, list)
        }
        ,
        CouponList.prototype.renderList = function() {
            var searchType = this.props.searchType
              , list = null;
            return "HOLD_UNUSE" == searchType && (list = this.renderUnUseCoupon(searchType)),
            "HOLD_USED" == searchType && (list = this.renderUseCoupon(searchType)),
            "HOLD_EXPIRE" == searchType && (list = this.renderExpireCoupon(searchType)),
            list
        }
        ,
        CouponList.prototype.render = function() {
            var _this = this
              , ucodeData = (this.props.that,
            this.state.ucodeData)
              , tipText = this.state.tipText
              , errorTip = this.state.errorTip
              , ucodeDialog = void 0
              , tipDialog = void 0
              , ucodeEndTime = void 0
              , ucodeMinInvestAmount = void 0
              , couponId = void 0
              , financePlanListDom = void 0;
            if (ucodeData && (ucodeEndTime = moment(ucodeData.expireDate).format("YYYY年MM月DD日"),
            ucodeMinInvestAmount = numeral(ucodeData.investAmount).format("0,0"),
            couponId = ucodeData.couponId,
            ucodeData.financePlanList.length && (financePlanListDom = ucodeData.financePlanList.map(function(item, index) {
                return React.createElement("tr", {
                    key: index
                }, React.createElement("td", null, item.name), React.createElement("td", null, React.createElement("em", null, item.compoundRate, "%")), React.createElement("td", null, item.lockPeriod), React.createElement("td", null, React.createElement("a", {
                    onClick: _this.goJoinUplan.bind(_this, item.id, couponId)
                }, "去加入"), " "))
            }))),
            this.state.dialogUcodeShowing) {
                var ucodeProps = {
                    showing: !0,
                    title: "U-CODE使用",
                    onRequestClose: this.hideUcodeDialog.bind(this)
                };
                ucodeDialog = React.createElement(RWeDialog, ucodeProps, React.createElement("div", {
                    className: "privilege-ucode-mask-content"
                }, React.createElement("table", {
                    className: "ucode-mask-table"
                }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", null, "U-CODE有效期至"), React.createElement("td", {
                    className: "con-box"
                }, React.createElement("div", {
                    className: "user-displayName"
                }, ucodeEndTime)), React.createElement("td", null, " ")), React.createElement("tr", null, React.createElement("th", null, "可加入额度"), React.createElement("td", null, ucodeMinInvestAmount, "元"), React.createElement("td", null)), React.createElement("tr", null, React.createElement("td", {
                    colSpan: "3"
                }, React.createElement("table", {
                    className: "ucode-content-table"
                }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {
                    className: "qi"
                }, "可兑换期数"), React.createElement("th", {
                    className: "row"
                }, "预期年收益"), React.createElement("th", {
                    className: "row"
                }, "理财期限"), React.createElement("th", {
                    className: "row"
                }))), React.createElement("tbody", null, financePlanListDom)))))), React.createElement("div", {
                    className: "tip-content"
                }, tipText), React.createElement("div", {
                    className: "ucode-mask-article"
                }, React.createElement("dl", null, React.createElement("dt", null, "温馨提示"), React.createElement("dd", null, "1. U-code仅限在U计划倒计时期间使用，每期U计划中可供U-code提前加入的总金额有限；"), React.createElement("dd", null, "2. 每个U-code只能提前一次加入U计划，且每人每期只能使用一个U-code。")))))
            }
            if (this.state.dialogTipShowing) {
                var tipProps = {
                    showing: !0,
                    onRequestClose: this.hideTipDialog.bind(this)
                };
                tipDialog = React.createElement(RWeDialog, tipProps, React.createElement("div", {
                    className: "privilege-tip-mask-content"
                }, React.createElement("p", {
                    className: "icon-we-failed"
                }), React.createElement("div", {
                    className: "tip-content"
                }, errorTip)))
            }
            return React.createElement("div", {
                className: "my-coupon-content"
            }, ucodeDialog, tipDialog, React.createElement("ul", {
                className: "coupon-un-use coupon-info fn-clear"
            }, this.renderList()))
        }
        ,
        CouponList
    }(React.Component);
    module.exports = CouponList
});
;/*!/client/widget/privilege/coupon/RCoupon.jsx*/
define("user:widget/privilege/coupon/RCoupon.jsx", function(require, exports, module) {
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
      , RWeDialog = (require("common:node_modules/react-dom/index"),
    require("common:widget/react-ui/RList/List"),
    require("common:widget/react-ui/RWeDialog/RWeDialog"))
      , RCouponList = require("user:widget/privilege/coupon/RCouponList.jsx")
      , service = require("common:widget/ui/service/service-factory")
      , privilegeService = service.getService("privilege")
      , transferService = service.getService("transfer")
      , moment = require("common:node_modules/moment/moment")
      , numeral = require("common:node_modules/numeral/numeral")
      , MyCoupon = function(_React$Component) {
        function MyCoupon(props) {
            _classCallCheck(this, MyCoupon),
            _React$Component.call(this, props),
            this.state = {
                data: this.props.data,
                displayName: this.props.displayName,
                searchType: "HOLD_UNUSE",
                selectedIndex: 0,
                tipText: null,
                uplanData: null,
                dialogCouponShowing: !1,
                dialogCouponSucShowing: !1,
                dialogShowing: !1,
                disabled: !1,
                unUseCouponData: null,
                useCouponData: null,
                expireCouponData: null
            },
            this.showWeDialog = this.showWeDialog.bind(this),
            this.hideWeDialog = this.hideWeDialog.bind(this),
            this.onTabRequestChange = this.onTabRequestChange.bind(this)
        }
        return _inherits(MyCoupon, _React$Component),
        MyCoupon.prototype.showWeDialog = function(tipText) {
            this.setState({
                dialogShowing: !0,
                tipText: tipText
            })
        }
        ,
        MyCoupon.prototype.hideWeDialog = function() {
            this.setState({
                dialogShowing: !1,
                tipText: null
            })
        }
        ,
        MyCoupon.prototype.showCouponSucDialog = function() {
            this.setState({
                dialogCouponSucShowing: !0
            })
        }
        ,
        MyCoupon.prototype.hideCouponSucDialog = function() {
            this.setState({
                dialogCouponSucShowing: !1,
                tipText: null
            }),
            window.location.reload()
        }
        ,
        MyCoupon.prototype.showCouponDialog = function() {
            this.setState({
                dialogCouponShowing: !0
            })
        }
        ,
        MyCoupon.prototype.hideCouponDialog = function() {
            this.setState({
                dialogCouponShowing: !1,
                tipText: null
            })
        }
        ,
        MyCoupon.prototype.timeOut = function() {
            var that = this
              , timer = null;
            clearTimeout(timer),
            timer = setTimeout(function() {
                that.setState({
                    tipText: "",
                    disabled: !1
                })
            }, 5e3)
        }
        ,
        MyCoupon.prototype.getBindCoupon = function() {
            var that = this
              , couponValue = this.refs.couponValue.value;
            return couponValue ? void (this.state.disabled || (this.state.disabled = !0,
            transferService.getExchangeCouponCode({
                couponCode: couponValue
            }).then(function(res) {
                res.requestStatus === transferService.STATUS.SUCCESS ? 0 == res.data.status ? (that.setState({
                    uplanData: res.data.data
                }),
                that.hideCouponDialog(),
                that.showCouponSucDialog()) : that.setState({
                    tipText: res.data.message
                }) : that.setState({
                    tipText: "网络异常，请稍候再试。"
                }),
                that.timeOut()
            })["catch"](function(error) {
                that.setState({
                    tipText: error.message
                }),
                that.timeOut()
            }))) : void this.setState({
                tipText: "优惠券密码不能为空"
            })
        }
        ,
        MyCoupon.prototype.goJoinUplan = function(financePlanId, couponId) {
            var that = this
              , paramData = {
                couponId: couponId,
                financePlanId: financePlanId
            };
            this.state.disabled || (this.state.disabled = !0,
            privilegeService.postUplanDetail(paramData).then(function(out) {
                return out.requestStatus === privilegeService.STATUS.ERROR ? (that.setState({
                    tipText: "网络异常，请稍候再试。"
                }),
                void that.timeOut()) : void (0 == out.data.status ? window.location.href = "/uplan/product/detail?financePlanId=" + financePlanId + "&couponId=" + couponId : (that.hideCouponSucDialog(),
                that.showWeDialog(),
                that.setState({
                    tipText: out.data.message,
                    disabled: !1
                })))
            })["catch"](function(error) {
                that.setState({
                    tipText: error.message
                }),
                that.timeOut()
            }))
        }
        ,
        MyCoupon.prototype.onTabRequestChange = function(searchType, selectedIndex) {
            var that = this
              , paramData = {
                searchType: searchType
            };
            privilegeService.getCouponList(paramData).then(function(out) {
                if (out.requestStatus === privilegeService.STATUS.ERROR)
                    return void that.showWeDialog("网络异常，请稍候再试。");
                var rsp = out.data;
                return rsp.data ? (0 == selectedIndex && that.setState({
                    unUseCouponData: rsp,
                    searchType: searchType,
                    selectedIndex: selectedIndex
                }),
                1 == selectedIndex && that.setState({
                    useCouponData: rsp,
                    searchType: searchType,
                    selectedIndex: selectedIndex
                }),
                void (2 == selectedIndex && that.setState({
                    expireCouponData: rsp,
                    searchType: searchType,
                    selectedIndex: selectedIndex
                }))) : void that.showWeDialog(rsp.message)
            })["catch"](function(error) {
                that.showWeDialog(error.message)
            })
        }
        ,
        MyCoupon.prototype.render = function() {
            var that = this
              , data = this.state.data
              , displayName = this.state.displayName
              , selectedIndex = this.state.selectedIndex
              , searchType = this.state.searchType
              , tipText = this.state.tipText
              , uplanData = this.state.uplanData
              , weDialog = void 0
              , couponDialog = void 0
              , couponButtonDom = void 0
              , couponDetailDom = void 0
              , financePlanListDom = void 0
              , uplanListDom = void 0
              , couponType = void 0;
            if ("HOLD_UNUSE" == searchType && (couponButtonDom = React.createElement("div", {
                className: "coupon-button"
            }, React.createElement("a", {
                target: "_blank",
                href: "//www.renrendai.com/help/account/587492fdc72dcd0e1b06a2be"
            }, "查看优惠券使用规则"), React.createElement("span", {
                className: "button-box"
            }, React.createElement("div", {
                className: "button button-yellow",
                onClick: this.showCouponDialog.bind(this)
            }, "兑换优惠券")))),
            this.state.dialogCouponShowing) {
                var couponDialogProps = {
                    showing: !0,
                    title: "优惠券兑换",
                    onRequestClose: this.hideCouponDialog.bind(this)
                };
                couponDialog = React.createElement(RWeDialog, couponDialogProps, React.createElement("div", {
                    className: "privilege-exchange-coupon-content"
                }, React.createElement("table", {
                    className: "exchange-coupon-table"
                }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", null, "昵称"), React.createElement("td", {
                    className: "con-box"
                }, React.createElement("div", {
                    className: "user-displayName"
                }, displayName)), React.createElement("td", null, " ")), React.createElement("tr", null, React.createElement("th", null, "优惠券密码"), React.createElement("td", null, React.createElement("input", {
                    ref: "couponValue",
                    className: "input",
                    type: "text",
                    placeholder: "请输入您要兑换的优惠券密码"
                }), React.createElement("div", {
                    className: "tip-content"
                }, tipText)), React.createElement("td", null, React.createElement("a", {
                    href: "//www.renrendai.com/help/account/587492fdc72dcd0e1b06a2be"
                }, "如何获取？"))), React.createElement("tr", null, React.createElement("th", null, " "), React.createElement("td", null, React.createElement("button", {
                    onClick: this.getBindCoupon.bind(this),
                    className: "button button-yellow"
                }, "确认")), React.createElement("td", null, " ")))), React.createElement("div", {
                    className: "exchange-coupon-article"
                }, React.createElement("dl", null, React.createElement("dt", null, "优惠券兑换温馨提示"), React.createElement("dd", null, "1. 优惠券仅限在有效期内使用，每次只能使用一张，每张仅限使用一次；"), React.createElement("dd", null, "2. 每种类别的优惠券使用规则及使用限制略有不同，详情可见：", React.createElement("a", {
                    href: "//www.renrendai.com/help/account/587492fdc72dcd0e1b06a2be"
                }, "优惠券及其使用规则"), "；"), React.createElement("dd", null, "3. 兑换过的优惠券只对当前账户生效，不能跨账户使用。")))))
            }
            if (this.state.dialogShowing) {
                var weProps = {
                    showing: !0,
                    onRequestClose: this.hideWeDialog.bind(this)
                };
                weDialog = React.createElement(RWeDialog, weProps, React.createElement("div", {
                    className: "privilege-tip-content"
                }, tipText))
            }
            if (this.state.dialogCouponSucShowing) {
                var CouponSucProps = {
                    showing: !0,
                    onRequestClose: this.hideCouponSucDialog.bind(this)
                };
                switch (uplanData.couponTypeEng) {
                case "UCODE":
                    couponType = "U-code";
                    break;
                case "VOUCHER":
                    couponType = "现金券";
                    break;
                case "DISCOUNT":
                    couponType = "抵扣券";
                    break;
                case "INCR_INTEREST":
                    couponType = "续期加息券";
                    break;
                case "EXTRA_INTEREST":
                    couponType = "加息券"
                }
                "UCODE" == uplanData.couponTypeEng ? (uplanData.financePlanList.length ? !function() {
                    var ucodeEndTime = moment(uplanData.expireDate).format("YYYY年MM月DD日")
                      , ucodeMinInvestAmount = numeral(uplanData.couponValue).format("0,0")
                      , couponId = uplanData.couponId;
                    financePlanListDom = uplanData.financePlanList.map(function(item, index) {
                        return React.createElement("tr", {
                            key: index
                        }, React.createElement("td", null, item.name), React.createElement("td", null, React.createElement("em", null, item.compoundRate, "%")), React.createElement("td", null, item.lockPeriod), React.createElement("td", null, React.createElement("a", {
                            onClick: that.goJoinUplan.bind(that, item.id, couponId)
                        }, "去加入"), " "))
                    }),
                    uplanListDom = React.createElement("div", {
                        className: "ucode-mask-content"
                    }, React.createElement("table", {
                        className: "ucode-mask-table"
                    }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", {
                        className: "title"
                    }, "U-CODE有效期至"), React.createElement("td", {
                        className: "con-box"
                    }, React.createElement("div", {
                        className: "user-displayName"
                    }, ucodeEndTime)), React.createElement("td", null, " ")), React.createElement("tr", null, React.createElement("th", {
                        className: "title"
                    }, "可加入额度"), React.createElement("td", null, ucodeMinInvestAmount, "元"), React.createElement("td", null)), React.createElement("tr", null, React.createElement("td", {
                        colSpan: "3"
                    }, React.createElement("table", {
                        className: "ucode-content-table"
                    }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {
                        className: "qi"
                    }, "可兑换期数"), React.createElement("th", {
                        className: "row"
                    }, "预期年收益"), React.createElement("th", {
                        className: "row"
                    }, "理财期限"), React.createElement("th", {
                        className: "row"
                    }))), React.createElement("tbody", null, financePlanListDom)))))))
                }() : uplanListDom = React.createElement("div", {
                    className: "no-uplan-list"
                }, React.createElement("p", null, "对不起，当前无可兑换的U计划，"), React.createElement("p", null, "请您耐心等待下期U计划的发布。")),
                weDialog = React.createElement(RWeDialog, CouponSucProps, React.createElement("div", {
                    className: "privilege-tip-mask-success-content"
                }, React.createElement("p", {
                    className: "icon-we-success"
                }), React.createElement("div", {
                    className: "tip-content"
                }, "恭喜，您已获得U计划加入资格！请选择需要加入的U计划。"), uplanListDom, React.createElement("div", {
                    className: "error-tip"
                }, tipText)))) : weDialog = React.createElement(RWeDialog, CouponSucProps, React.createElement("div", {
                    className: "privilege-tip-mask-success-content"
                }, React.createElement("p", {
                    className: "icon-we-success"
                }), React.createElement("div", {
                    className: "tip-content"
                }, "亲爱的", displayName, ": 恭喜您已经成功兑换", couponType, "！"), React.createElement("a", {
                    className: "ui-rrd-button",
                    href: "/user/privilege"
                }, "去查看")))
            }
            return couponDetailDom = 0 == data.status ? React.createElement(RCouponList, {
                data: data,
                searchType: searchType,
                that: that
            }) : React.createElement("div", {
                className: "no-data"
            }, data.message),
            React.createElement("div", {
                className: "my-coupon-main"
            }, React.createElement("ul", {
                className: "my-coupon-tab"
            }, React.createElement("li", {
                className: 0 == selectedIndex ? "choice" : "",
                onClick: this.onTabRequestChange.bind(this, "HOLD_UNUSE", 0)
            }, React.createElement("span", null, "未使用的优惠券"), React.createElement("i", null)), React.createElement("li", {
                className: 1 == selectedIndex ? "choice" : "",
                onClick: this.onTabRequestChange.bind(this, "HOLD_USED", 1)
            }, React.createElement("span", null, "已使用的优惠券"), React.createElement("i", null)), React.createElement("li", {
                className: 2 == selectedIndex ? "choice" : "",
                onClick: this.onTabRequestChange.bind(this, "HOLD_EXPIRE", 2)
            }, React.createElement("span", null, "已失效的优惠券"), React.createElement("i", null))), weDialog, couponDialog, couponButtonDom, couponDetailDom)
        }
        ,
        MyCoupon
    }(React.Component);
    module.exports = MyCoupon
});
;/*!/client/widget/privilege/invite-register/invite-register.js*/
define("user:widget/privilege/invite-register/invite-register.js", function(require, exports, module) {
    "use strict";
    var $ = require("common:widget/lib/jquery/jquery")
      , Dialog = require("common:widget/ui/dialog/dialog")
      , WeShare = require("common:widget/lib/share/share")
      , dialog = {
        inviteRegisterTips: Dialog.modalDialog({
            width: "700px",
            title: "邀请好友规则",
            content: $("#invite-register-tips"),
            cssClass: "invite-register-dialog",
            maskConfig: {
                cssClass: "user-invite-register-mask"
            }
        }).after("hide", function() {}).after("show", function() {}),
        inviteRegisterCopyTips: Dialog.alertDialog({
            width: "700px",
            height: "310px",
            okText: "确定",
            content: $("#invite-register-copy-tips"),
            cssClass: "invite-register-copy-dialog",
            maskConfig: {
                cssClass: "user-invite-register-copy-mask"
            }
        }).after("hide", function() {}).after("show", function() {})
    }
      , inviteRegister = {
        init: function(shareData) {
            this._zeroClipboard(),
            this._dialogOpen(),
            WeShare.init(shareData)
        },
        _zeroClipboard: function() {
            if (window.clipboardData) {
                var copyBtn = document.getElementById("J_copy_btn");
                copyBtn.onclick = function() {
                    var text = $("#J_copy_btn").attr("data-clipboard-text");
                    window.clipboardData.setData("text", text),
                    dialog.inviteRegisterCopyTips.show()
                }
            } else if (window.Clipboard) {
                var clipboard = new Clipboard("#J_copy_btn");
                clipboard.on("success", function(e) {
                    e.clearSelection(),
                    dialog.inviteRegisterCopyTips.show()
                })
            }
        },
        _dialogOpen: function() {
            $("#eventrules").click(function() {
                dialog.inviteRegisterTips.show()
            })
        },
        _mdtongji: function(v) {
            $.get("/html/blank/blank.html?TAG=" + v, function() {})
        }
    };
    module.exports = inviteRegister
});
;/*!/client/widget/profile/list/wdg-list-main/wdg-list-main.js*/
define("user:widget/profile/list/wdg-list-main/wdg-list-main.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var React = (require("common:node_modules/moment/moment"),
    require("common:node_modules/react/react"))
      , timeUtils = (require("common:node_modules/react-dom/index"),
    require("common:widget/ui/utils/utils"),
    require("common:widget/ui/utils/time-utils"))
      , numeral = require("common:node_modules/numeral/numeral")
      , ListMain = function() {
        function ListMain() {
            _classCallCheck(this, ListMain)
        }
        return ListMain.prototype.headerDomRender = function() {
            return React.createElement("div", {
                className: "list-head"
            }, React.createElement("ul", {
                className: "fn-clear"
            }, React.createElement("li", {
                className: "w180"
            }, "年利率"), React.createElement("li", {
                className: "w180"
            }, "借款标题"), React.createElement("li", {
                className: "w130"
            }, "金额"), React.createElement("li", {
                className: "w131"
            }, "期限"), React.createElement("li", {
                className: "w188"
            }, "逾期情况"), React.createElement("li", {
                className: "w131"
            }, "借款时间"), React.createElement("li", {
                className: "w134"
            }, " ")))
        }
        ,
        ListMain.prototype.rowDomRender = function(item, index) {
            {
                var interest = numeral(item.interest).format("0.00")
                  , title = item.title
                  , amount = numeral(item.amount).format("0,0")
                  , months = item.months
                  , overDued = item.overDued
                  , openTime = timeUtils.formatYearMonthDate(item.openTime)
                  , status = item.status
                  , loanId = item.loanId
                  , productAliasName = item.productAliasName;
                item.title
            }
            title = title.length > 7 ? title.substring(0, 7) + "…" : title,
            overDued = 1 == overDued ? "曾有过逾期记录" : "未发生过逾期";
            var detailUrl = "/loan-" + loanId + ".html"
              , btnStatus = "";
            "OPEN" == status ? btnStatus = React.createElement("a", {
                href: detailUrl,
                className: "open",
                target: "_blank"
            }, "投标") : "READY" == status || "FIRST_READY" == status ? btnStatus = React.createElement("a", {
                href: detailUrl,
                className: "ready",
                target: "_blank"
            }, "已满标") : "IN_PROGRESS" == status ? btnStatus = React.createElement("a", {
                href: detailUrl,
                className: "in-progress",
                target: "_blank"
            }, "还款中") : "CLOSED" == status ? btnStatus = React.createElement("a", {
                href: detailUrl,
                className: "closed",
                target: "_blank"
            }, "已还清") : "OVER_DUE" == status ? btnStatus = React.createElement("a", {
                href: detailUrl,
                className: "over-due",
                target: "_blank"
            }, "已逾期") : "BAD_DEBT" == status ? btnStatus = React.createElement("a", {
                href: detailUrl,
                className: "bad-debt",
                target: "_blank"
            }, "已垫付") : "FIRST_APPLY" == status && (btnStatus = React.createElement("a", {
                href: detailUrl,
                className: "first-apply",
                target: "_blank"
            }, "申请中"));
            var type = "";
            return "实地认证标" == productAliasName ? type = "实" : "机构担保标" == productAliasName ? type = "保" : "信用认证标" == productAliasName || "信用标" == productAliasName ? type = "信" : "智能理财标" == productAliasName && (type = "智"),
            React.createElement("div", {
                className: "list-item" + (index % 2 == 1 ? " even" : " odd")
            }, React.createElement("a", {
                href: detailUrl,
                className: "change-url",
                target: "_blank"
            }, " "), React.createElement("ul", {
                className: "fn-clear"
            }, React.createElement("li", {
                className: "w180"
            }, React.createElement("span", {
                className: "big"
            }, interest), React.createElement("span", {
                className: "small"
            }, "%")), React.createElement("li", {
                className: "w180"
            }, React.createElement("span", {
                className: "icon",
                title: productAliasName
            }, type), React.createElement("span", {
                className: "loan-title"
            }, title)), React.createElement("li", {
                className: "w130"
            }, amount, "元"), React.createElement("li", {
                className: "w131"
            }, months, "个月"), React.createElement("li", {
                className: "w188"
            }, overDued), React.createElement("li", {
                className: "w131"
            }, openTime), React.createElement("li", {
                className: "w134"
            }, btnStatus)))
        }
        ,
        ListMain
    }()
      , listMain = new ListMain;
    module.exports = listMain
});
;/*!/client/widget/record/recordTable/exchangeRecordTable/exchangeRecordTable.js*/
define("user:widget/record/recordTable/exchangeRecordTable/exchangeRecordTable.js", function(require, exports, module) {
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
      , utils = (require("common:node_modules/react-dom/index"),
    require("common:widget/ui/utils/utils"))
      , List = require("common:widget/react-ui/RList/List")
      , Tooltip = require("common:widget/react-ui/RTooltip/Tooltip")
      , moment = require("common:node_modules/moment/moment")
      , RecordTable = function(_React$Component) {
        function RecordTable(props) {
            _classCallCheck(this, RecordTable),
            _React$Component.call(this, props)
        }
        return _inherits(RecordTable, _React$Component),
        RecordTable.prototype.createHeadDom = function() {
            return React.createElement("ul", {
                className: "list-header  dark fn-clear"
            }, React.createElement("li", {
                className: "w314 table-th"
            }, "交易时间"), React.createElement("li", {
                className: "w250 table-th"
            }, "交易类型"), React.createElement("li", {
                className: "w140 text-right table-th p-r-20"
            }, "交易金额"), React.createElement("li", {
                className: "w268 text-right table-th"
            }, "交易状态"))
        }
        ,
        RecordTable.prototype.dataTransfer = function(item) {
            var tradeTypeName = void 0
              , tradeStateName = void 0
              , tradeAmount = void 0;
            tradeStateName = 0 == item.tradeState ? "交易成功" : "交易失败";
            var tradeType = item.tradeType - 0
              , tooltipActiveClassName = "pop-show";
            switch (tradeType) {
            case 1:
                tradeTypeName = "资产投资",
                tooltipActiveClassName = "pop-hide";
                break;
            case 2:
                tradeTypeName = "资产到期退出";
                break;
            case 3:
                tradeTypeName = "产品募集失败"
            }
            return tradeAmount = utils.fixFloat1(item.tradeAmount),
            {
                tradeTypeName: tradeTypeName,
                tradeStateName: tradeStateName,
                tradeAmount: utils.commaFloat(tradeAmount),
                tooltipActiveClassName: tooltipActiveClassName
            }
        }
        ,
        RecordTable.prototype.createRowDom = function(item, i) {
            var itemBgClassName = "list-item fn-clear";
            itemBgClassName += i % 2 === 0 ? " " : " dark";
            var tradeTypeName = void 0
              , tradeStateName = void 0
              , tradeAmount = void 0;
            tradeStateName = 0 == item.tradeState ? "交易成功" : "交易失败";
            var tradeType = item.tradeType - 0
              , tooltipActiveClassName = "pop-show";
            switch (tradeType) {
            case 1:
                tradeTypeName = "资产投资",
                tooltipActiveClassName = "pop-hide";
                break;
            case 2:
                tradeTypeName = "资产到期退出";
                break;
            case 3:
                tradeTypeName = "产品募集失败";
                break;
            default:
                tradeTypeName = "资产投资"
            }
            tradeAmount = utils.fixFloat1(item.tradeAmount);
            var transfer = {
                tradeTypeName: tradeTypeName,
                tradeStateName: tradeStateName,
                tradeAmount: utils.commaFloat(tradeAmount),
                tooltipActiveClassName: tooltipActiveClassName
            }
              , proName = item.productName
              , productName = proName.length > 8 ? proName.substr(0, 8) + "..." : proName
              , tradeTime = item.tradeTime - 0
              , data = moment(tradeTime).format("YYYY-MM-DD")
              , time = moment(tradeTime).format("HH:mm")
              , detailUrl = "/exchange/product/detail?productNo=" + item.productNo;
            return React.createElement("ul", {
                className: itemBgClassName
            }, React.createElement("li", {
                className: "w314"
            }, data, React.createElement("span", {
                className: "light ml10"
            }, time)), React.createElement("li", {
                className: "w250"
            }, transfer.tradeTypeName + " ( ", React.createElement("a", {
                href: detailUrl,
                target: "_blank",
                className: "",
                title: proName
            }, productName), " )"), React.createElement("li", {
                className: "w160 text-right"
            }, React.createElement("em", {
                className: "normal"
            }, transfer.tradeAmount, "元"), React.createElement(Tooltip, {
                tooltipActiveClassName: transfer.tooltipActiveClassName,
                data: "预计1-3个工作日内到账"
            }), React.createElement("div", {
                className: "pop-show" == transfer.tooltipActiveClassName ? "" : "tips-show-hide"
            })), React.createElement("li", {
                className: "w268 text-right"
            }, transfer.tradeStateName))
        }
        ,
        RecordTable.prototype.render = function() {
            var result = this.props.result;
            return React.createElement("div", {
                id: "exchange-record-table"
            }, React.createElement(List, _extends({}, result, {
                moudleServiceName: "user",
                ajaxParams: this.props.filterData,
                url: "getExchangeRecords",
                isHeadNeed: "yes",
                pagination: this.props.pagination,
                isHeadNeedOrder: "no",
                createHeadDom: this.createHeadDom,
                createRowDom: this.createRowDom,
                startNum: 0,
                limit: parseInt(this.props.limit, 10),
                offset: 5
            })))
        }
        ,
        RecordTable
    }(React.Component);
    module.exports = RecordTable
});
;/*!/client/widget/record/recordFilter/exchangeRecordFilter/exchangeRecordFilter.js*/
define("user:widget/record/recordFilter/exchangeRecordFilter/exchangeRecordFilter.js", function(require, exports, module) {
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
      , ExchangeTable = require("user:widget/record/recordTable/exchangeRecordTable/exchangeRecordTable")
      , service = require("common:widget/ui/service/service-factory")
      , userService = service.getService("user")
      , ExchangeFilter = function(_React$Component) {
        function ExchangeFilter(props) {
            _classCallCheck(this, ExchangeFilter),
            _React$Component.call(this, props),
            this.state = {
                filterData: "",
                tableData: this.props.result
            }
        }
        return _inherits(ExchangeFilter, _React$Component),
        ExchangeFilter.prototype.componentDidUpdate = function() {
            this.props.result || this.state.tableData || this.sendAjaxRecords()
        }
        ,
        ExchangeFilter.prototype.sendAjaxRecords = function() {
            var _this = this
              , url = "getExchangeRecords"
              , filter = {
                startNum: 0,
                limit: this.props.limit
            };
            userService[url](filter).then(function(out) {
                if (out.requestStatus !== userService.STATUS.ERROR) {
                    var rsp = out.data;
                    _this.setState({
                        tableData: rsp
                    })
                }
            })
        }
        ,
        ExchangeFilter.prototype.render = function() {
            return 2 == this.props.ishide ? React.createElement("div", {
                className: "recordFilter"
            }, React.createElement(ExchangeTable, {
                result: this.state.tableData,
                tab: this.props.tab,
                startNum: this.props.startNum,
                limit: this.props.limit,
                filterData: this.state.filterData,
                pagination: this.props.pagination
            })) : React.createElement("div", {
                className: "recordFilter"
            }, React.createElement("div", null), React.createElement(ExchangeTable, {
                result: this.state.tableData,
                tab: this.props.tab,
                startNum: this.props.startNum,
                limit: this.props.limit,
                filterData: this.state.filterData,
                pagination: this.props.pagination
            }))
        }
        ,
        ExchangeFilter
    }(React.Component);
    module.exports = ExchangeFilter
});
;/*!/client/widget/record/recordTable/fofRecordTable/fofRecordTable.js*/
define("user:widget/record/recordTable/fofRecordTable/fofRecordTable.js", function(require, exports, module) {
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
      , List = (require("common:node_modules/react-dom/index"),
    require("common:widget/ui/utils/utils"),
    require("common:widget/react-ui/RList/List"))
      , moment = require("common:node_modules/moment/moment")
      , Tooltip = require("common:widget/react-ui/RTooltip/Tooltip")
      , RecordTable = function(_React$Component) {
        function RecordTable(props) {
            _classCallCheck(this, RecordTable),
            _React$Component.call(this, props)
        }
        return _inherits(RecordTable, _React$Component),
        RecordTable.prototype.createHead = function() {
            return React.createElement("ul", {
                className: "list-header  dark fn-clear"
            }, React.createElement("li", {
                className: "w314 table-th"
            }, "交易时间"), React.createElement("li", {
                className: "w250 table-th"
            }, "组合名称"), React.createElement("li", {
                className: "w140 text-right table-th p-r-20"
            }, "交易金额"), React.createElement("li", {
                className: "w268 text-right table-th"
            }, "交易状态"))
        }
        ,
        RecordTable.prototype.createHeadDom = function() {
            return React.createElement("ul", {
                className: "list-header  dark fn-clear"
            }, React.createElement("li", {
                className: "w314 table-th"
            }, "交易时间"), React.createElement("li", {
                className: "w250 table-th"
            }, "组合名称"), React.createElement("li", {
                className: "w140 text-right table-th p-r-20"
            }, "赎回比例/金额"), React.createElement("li", {
                className: "w268 text-right table-th"
            }, "交易状态"))
        }
        ,
        RecordTable.prototype.createHeadHtml = function() {
            return React.createElement("ul", {
                className: "list-header  dark fn-clear"
            }, React.createElement("li", {
                className: "w314 table-th"
            }, "交易时间"), React.createElement("li", {
                className: "w250 table-th"
            }, "组合名称"), React.createElement("li", {
                className: "w140 text-right table-th p-r-20"
            }, "调仓费用"), React.createElement("li", {
                className: "w268 text-right table-th"
            }, "交易状态"))
        }
        ,
        RecordTable.prototype.createRowDom = function(item, i) {
            var status = item.status
              , opType = item.opType
              , asset = item.asset
              , statusName = void 0
              , info = ""
              , money = (asset ? parseFloat(item.asset).toFixed(2) : "0.00") + "元";
            switch (parseInt(status)) {
            case 0:
                statusName = "结果确认中";
                break;
            case 1:
                if (1 == opType)
                    statusName = "申购中";
                else if (2 == opType) {
                    statusName = "赎回中";
                    var transfer = item.transferIntoDate || (new Date).getTime()
                      , _data = moment(parseInt(transfer)).format("YYYY-MM-DD");
                    info = React.createElement("div", {
                        className: "more-line"
                    }, React.createElement("div", {
                        className: "one"
                    }, "预计到账金额:" + (asset ? parseFloat(item.asset).toFixed(2) : "--") + "元"), React.createElement("div", {
                        className: "one"
                    }, "预计到账时间:" + _data))
                } else if (3 == opType) {
                    statusName = "跟踪调仓中";
                    var IntoDate = item.reckonConfirmTime || (new Date).getTime()
                      , date = moment(parseInt(IntoDate)).format("YYYY-MM-DD");
                    info = "此为预估值,预计确认时间:" + date
                }
                break;
            case 2:
                if (1 == opType)
                    statusName = "申购成功",
                    money = parseFloat(item.confirmAmount || 0).toFixed(2) + "元";
                else if (2 == opType) {
                    statusName = "赎回成功",
                    money = parseFloat(item.confirmAmount || 0).toFixed(2) + "元";
                    var transfer = item.transferIntoDate || (new Date).getTime()
                      , _data2 = moment(parseInt(transfer)).format("YYYY-MM-DD");
                    info = "预计到账时间:" + _data2
                } else if (3 == opType) {
                    statusName = "跟踪调仓成功";
                    var IntoDate = item.reckonConfirmTime || (new Date).getTime()
                      , date = moment(parseInt(IntoDate)).format("YYYY-MM-DD");
                    info = "调仓成功时间:" + date
                }
                break;
            case 3:
                1 == opType ? statusName = "申购失败" : 2 == opType ? statusName = "赎回失败" : 3 == opType && (statusName = "跟踪调仓失败",
                info = "此为预估值");
                break;
            case 4:
                if (1 == opType)
                    statusName = "申购部分成功",
                    money = parseFloat(item.confirmAmount || 0).toFixed(2) + "元";
                else if (2 == opType) {
                    statusName = "赎回部分成功",
                    money = parseFloat(item.confirmAmount || 0).toFixed(2) + "元";
                    var transfer = item.transferIntoDate || (new Date).getTime()
                      , _data3 = moment(parseInt(transfer)).format("YYYY-MM-DD");
                    info = "预计到账时间:" + _data3
                } else if (3 == opType) {
                    statusName = "部分跟调成功";
                    var IntoDate = item.reckonConfirmTime || (new Date).getTime()
                      , date = moment(parseInt(IntoDate)).format("YYYY-MM-DD");
                    info = "调仓成功时间:" + date
                }
                break;
            case 9:
                1 == opType ? statusName = "申购已撤销" : 2 == opType ? statusName = "赎回已撤销" : 3 == opType && (statusName = "跟调已撤销")
            }
            2 == opType && 2 != status && 4 != status && (money = parseFloat(100 * parseFloat(item.confirmRatio || 1e-4)).toFixed(2) + "%"),
            3 == opType && (money = parseFloat(item.fee) + "元"),
            3 == opType && 3 == status && (money = "--");
            var itemBgClassName = "list-item fn-clear";
            itemBgClassName += i % 2 === 0 ? " " : " dark";
            var tradeTime = item.ctime - 0
              , data = moment(tradeTime).format("YYYY-MM-DD")
              , time = moment(tradeTime).format("HH:mm");
            return React.createElement("ul", {
                className: itemBgClassName
            }, React.createElement("li", {
                className: "w314"
            }, String(data), React.createElement("span", {
                className: "gray ml10"
            }, String(time))), React.createElement("li", {
                className: "w250"
            }, item.poName), React.createElement("li", {
                className: "w160 text-right"
            }, React.createElement("em", {
                className: "normal"
            }, money), React.createElement(Tooltip, {
                tooltipActiveClassName: info ? "pop-show" : "pop-hide",
                data: info
            }), React.createElement("div", {
                className: info ? "" : "tips-show-hide"
            })), React.createElement("li", {
                className: "w268 text-right"
            }, statusName))
        }
        ,
        RecordTable.prototype.render = function() {
            var result = this.props.result
              , filterData = this.props.filterData
              , opType = filterData.opType
              , createHead = this.createHead;
            return 2 == opType ? createHead = this.createHeadDom : 3 == opType && (createHead = this.createHeadHtml),
            React.createElement("div", {
                id: "fof-record-table"
            }, React.createElement(List, _extends({}, result, {
                moudleServiceName: "user",
                url: "getFofRecords",
                ajaxParams: this.props.filterData,
                isHeadNeed: "yes",
                pagination: this.props.pagination,
                isHeadNeedOrder: "no",
                createHeadDom: createHead,
                createRowDom: this.createRowDom,
                startNum: 0,
                limit: parseInt(this.props.limit, 10),
                offset: 5
            })))
        }
        ,
        RecordTable
    }(React.Component);
    module.exports = RecordTable
});
;/*!/client/widget/record/recordFilter/fofRecordFilter/fofRecordFilter.js*/
define("user:widget/record/recordFilter/fofRecordFilter/fofRecordFilter.js", function(require, exports, module) {
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
      , FofTable = (require("common:widget/react-ui/RList/pagination/Pagination"),
    require("user:widget/record/recordTable/fofRecordTable/fofRecordTable"))
      , service = require("common:widget/ui/service/service-factory")
      , userService = service.getService("user")
      , FofFilter = function(_React$Component) {
        function FofFilter(props) {
            _classCallCheck(this, FofFilter),
            _React$Component.call(this, props);
            var filterData = "";
            filterData = 2 == this.props.ishide ? {
                opType: 1,
                startDate: "",
                endDate: ""
            } : {
                opType: 1,
                startDate: "",
                endDate: ""
            };
            var tableData = props.result;
            this.state = {
                filterData: filterData,
                tableData: tableData,
                time: 1,
                startNum: 0,
                isAjax: !1,
                isOne: !1
            }
        }
        return _inherits(FofFilter, _React$Component),
        FofFilter.prototype.componentDidUpdate = function() {
            var hashConf = utils.getSearchConf()
              , isOne = (parseInt(hashConf.tab || 0, 10),
            this.state.isOne);
            this.props.result || this.state.tableData || isOne || this.sendAjaxRecords()
        }
        ,
        FofFilter.prototype.sendAjaxRecords = function() {
            var _this = this
              , url = "getFofRecords";
            if (!this.state.isAjax) {
                this.state.isAjax = !0;
                var limit = this.props.limit
                  , filterData2 = {
                    startNum: 0,
                    limit: limit
                }
                  , filterData = $.extend({}, this.state.filterData, filterData2);
                userService[url](filterData).then(function(out) {
                    if (out.requestStatus === userService.STATUS.ERROR)
                        return void _this.setState({
                            isOne: !0,
                            isAjax: !1
                        });
                    var rsp = out.data;
                    _this.setState({
                        isOne: !0,
                        isAjax: !1,
                        tableData: rsp
                    })
                }),
                this.setState({
                    isAjax: !0
                })
            }
        }
        ,
        FofFilter.prototype.chooseDate = function(num, type) {
            var _this2 = this
              , filterData = this.state.filterData
              , startDate = ""
              , endDate = ""
              , date = new Date
              , nowTime = date.getTime()
              , year = date.getFullYear()
              , month = date.getMonth()
              , day = date.getDate();
            if ("time" == type) {
                switch (num) {
                case 1:
                    startDate = "",
                    endDate = "";
                    break;
                case 2:
                    startDate = parseInt(new Date(year,month,day,0,0,0).getTime()),
                    endDate = parseInt(nowTime);
                    break;
                case 3:
                    startDate = parseInt(nowTime - 2592e6),
                    endDate = parseInt(nowTime);
                    break;
                case 4:
                    startDate = parseInt(nowTime - 80352e5),
                    endDate = parseInt(nowTime);
                    break;
                case 5:
                    startDate = parseInt(nowTime - 31104e6),
                    endDate = parseInt(nowTime)
                }
                filterData.startDate = startDate,
                filterData.endDate = endDate,
                this.setState({
                    filterData: filterData,
                    time: num,
                    startNum: 0
                }, function() {
                    _this2.sendAjaxRecords()
                })
            } else
                "op" == type && (filterData.opType = num,
                this.setState({
                    filterData: filterData,
                    startNum: 0
                }, function() {
                    _this2.sendAjaxRecords()
                }))
        }
        ,
        FofFilter.prototype.createFilterHtml = function() {
            var time = this.state.time
              , opType = this.state.filterData.opType
              , html = React.createElement("div", {
                className: "condition"
            }, React.createElement("div", {
                className: "fn-clear time"
            }, React.createElement("div", {
                className: "opt-tit"
            }, "起止日期"), React.createElement("div", {
                className: "time-opt " + (1 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 1, "time")
            }, "全部"), React.createElement("div", {
                className: "time-opt " + (2 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 2, "time")
            }, "今天"), React.createElement("div", {
                className: "time-opt " + (3 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 3, "time")
            }, "最近1个月"), React.createElement("div", {
                className: "time-opt " + (4 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 4, "time")
            }, "最近3个月"), React.createElement("div", {
                className: "time-opt " + (5 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 5, "time")
            }, "最近1年")), React.createElement("div", {
                className: "fn-clear ty"
            }, React.createElement("div", {
                className: "opt-tit"
            }, "交易类型"), React.createElement("div", {
                className: "ty-opt sin " + (1 == opType ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 1, "op")
            }, "申购"), React.createElement("div", {
                className: "ty-opt sin " + (3 == opType ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 3, "op")
            }, "调仓"), React.createElement("div", {
                className: "ty-opt sin " + (2 == opType ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 2, "op")
            }, "赎回")));
            return html
        }
        ,
        FofFilter.prototype.createHeadDom = function() {
            return React.createElement("ul", {
                className: "list-header  dark fn-clear"
            }, React.createElement("li", {
                className: "w314 "
            }, "交易时间"), React.createElement("li", {
                className: "w250 "
            }, "组合名称"), React.createElement("li", {
                className: "w160 text-right"
            }, "赎回比例/金额"), React.createElement("li", {
                className: "w268 text-right"
            }, "交易状态"))
        }
        ,
        FofFilter.prototype.createRowDom = function(item, i) {
            var status = item.status
              , opType = item.opType
              , statusName = void 0;
            switch (parseInt(status)) {
            case 0:
                statusName = "未确认";
                break;
            case 1:
                1 == opType ? statusName = "申购处理中" : 2 == opType && (statusName = "赎回处理中");
                break;
            case 2:
                1 == opType ? statusName = "申购成功" : 2 == opType && (statusName = "赎回成功");
                break;
            case 3:
                1 == opType ? statusName = "申购失败" : 2 == opType && (statusName = "赎回失败");
                break;
            case 4:
                1 == opType ? statusName = "申购部分成功" : 2 == opType && (statusName = "赎回部分成功");
                break;
            case 9:
                statusName = "撤单"
            }
            var itemBgClassName = "list-item fn-clear";
            itemBgClassName += i % 2 === 0 ? " " : " dark";
            {
                var tradeTime = 1e3 * (item.ctime - 0);
                moment(tradeTime).format("YYYY-MM-DD"),
                moment(tradeTime).format("HH:mm")
            }
            return React.createElement("ul", {
                className: itemBgClassName
            }, React.createElement("li", {
                className: "w314"
            }, tradeTime), React.createElement("li", {
                className: "w250"
            }, item.poName), React.createElement("li", {
                className: "w160 text-right"
            }, item.confirmRatio + "%"), React.createElement("li", {
                className: "w268 text-right"
            }, statusName))
        }
        ,
        FofFilter.prototype.render = function() {
            if (2 == this.props.ishide)
                return React.createElement("div", {
                    className: "recordFilter"
                }, React.createElement(FofTable, {
                    result: this.state.tableData,
                    tab: this.props.tab,
                    limit: this.props.limit,
                    filterData: this.state.filterData,
                    pagination: this.props.pagination
                }));
            var filterHtml = this.createFilterHtml();
            return React.createElement("div", {
                className: "recordFilter"
            }, filterHtml, React.createElement(FofTable, {
                result: this.state.tableData,
                tab: this.props.tab,
                limit: this.props.limit,
                filterData: this.state.filterData,
                pagination: this.props.pagination
            }))
        }
        ,
        FofFilter
    }(React.Component);
    module.exports = FofFilter
});
;/*!/client/widget/record/recordTable/fundRecordTable/fundRecordTable.js*/
define("user:widget/record/recordTable/fundRecordTable/fundRecordTable.js", function(require, exports, module) {
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
      , List = (require("common:node_modules/react-dom/index"),
    require("common:widget/ui/utils/utils"),
    require("common:widget/react-ui/RList/List"))
      , Tooltip = require("common:widget/react-ui/RTooltip/Tooltip")
      , moment = require("common:node_modules/moment/moment")
      , RecordTable = function(_React$Component) {
        function RecordTable(props) {
            _classCallCheck(this, RecordTable),
            _React$Component.call(this, props)
        }
        return _inherits(RecordTable, _React$Component),
        RecordTable.prototype.createHead = function() {
            return React.createElement("ul", {
                className: "list-header  dark fn-clear"
            }, React.createElement("li", {
                className: "w314 table-th"
            }, "交易时间"), React.createElement("li", {
                className: "w250 table-th"
            }, "基金简称"), React.createElement("li", {
                className: "w150 text-right p-r-10 table-th"
            }, "赎回份数"), React.createElement("li", {
                className: "w268 text-right table-th"
            }, "交易状态"))
        }
        ,
        RecordTable.prototype.createHeadDom = function() {
            return React.createElement("ul", {
                className: "list-header  dark fn-clear"
            }, React.createElement("li", {
                className: "w314 table-th"
            }, "交易时间"), React.createElement("li", {
                className: "w250 table-th"
            }, "基金简称"), React.createElement("li", {
                className: "w150 text-right p-r-10 table-th"
            }, "交易金额"), React.createElement("li", {
                className: "w268 text-right table-th"
            }, "交易状态"))
        }
        ,
        RecordTable.prototype.createBonusDom = function() {
            return React.createElement("ul", {
                className: "list-header  dark fn-clear"
            }, React.createElement("li", {
                className: "w314 table-th"
            }, "交易时间"), React.createElement("li", {
                className: "w250 table-th"
            }, "基金简称"), React.createElement("li", {
                className: "w150 text-right p-r-10 table-th"
            }, "分红金额/份额"), React.createElement("li", {
                className: "w268 text-right table-th"
            }, "交易状态"))
        }
        ,
        RecordTable.prototype.createRowDom = function(item, i) {
            var status = item.status
              , opType = item.opType
              , tradeType = item.tradeType
              , statusName = void 0
              , information = item.fundChannel || "YM"
              , info = "信息来源：珠海盈米财富管理有限公司";
            switch (information) {
            case "YM":
                info = "信息来源：珠海盈米财富管理有限公司";
                break;
            case "QJ":
                info = "信息来源：北京钱景财富投资管理有限公司"
            }
            var money = parseFloat(item.sum || 0).toFixed(2) + "元";
            parseFloat(item.sum) || (money = parseFloat(item.shares || 0).toFixed(2) + "份");
            var reckonArriveTime = item.reckonArriveTime || (new Date).getTime()
              , todayTime = moment(parseInt(reckonArriveTime)).format("YYYY-MM-DD")
              , tipsStatus = 1;
            switch (parseInt(status)) {
            case -1:
                statusName = "结果待确认";
                break;
            case 0:
                1 == opType ? statusName = "申购中" : 2 == opType ? (statusName = "赎回中",
                tipsStatus = 2,
                money = (item.shares || "--") + "份") : 4 == opType && (statusName = "认购中");
                break;
            case 1:
                1 == opType ? statusName = "申购中" : 4 == opType && (statusName = "认购中"),
                "039" == tradeType && (statusName = "定投中");
                break;
            case 2:
                statusName = "赎回中",
                tipsStatus = 2,
                money = (item.shares || "--") + "份";
                break;
            case 3:
                1 == opType ? statusName = "申购成功" : 2 == opType ? (statusName = "赎回成功",
                tipsStatus = 3,
                money = (item.shares || "--") + "份") : 4 == opType ? statusName = "认购成功" : 5 == opType && (statusName = "分红成功"),
                "039" == tradeType && (statusName = "定投成功");
                break;
            case 4:
                1 == opType ? statusName = "申购失败" : 2 == opType ? (statusName = "赎回失败",
                money = (item.shares || "--") + "份") : 4 == opType && (statusName = "认购失败"),
                "039" == tradeType && (statusName = "定投失败");
                break;
            case 5:
                1 == opType ? statusName = "部分申购成功" : 3 == opType && (statusName = "部分认购成功");
                break;
            case 9:
                1 == opType ? statusName = "申购已撤销" : 2 == opType ? statusName = "赎回已撤销" : 4 == opType && (statusName = "认购已撤销"),
                "039" == tradeType && (statusName = "定投已撤销");
                break;
            default:
                statusName = ""
            }
            var tipsText = ""
              , tipsClassName = "pop-hide"
              , tipsShowHide = "";
            2 == tipsStatus ? (tipsText = "预计到账时间：" + todayTime,
            tipsClassName = "pop-show",
            tipsShowHide = "tips-show-hide") : 3 == tipsStatus && (tipsText = React.createElement("div", {
                className: "more-line"
            }, React.createElement("div", {
                className: "one"
            }, "到账金额：" + parseFloat(item.sum || 0).toFixed(2) + "元"), React.createElement("div", {
                className: "one"
            }, "到账时间：" + todayTime)),
            tipsClassName = "pop-show",
            tipsShowHide = "tips-show-hide");
            var itemBgClassName = "list-item fn-clear";
            itemBgClassName += i % 2 === 0 ? " " : " dark";
            var tradeTime = parseInt(item.ctime - 0)
              , data = moment(tradeTime).format("YYYY-MM-DD")
              , time = moment(tradeTime).format("HH:mm");
            return React.createElement("ul", {
                className: itemBgClassName
            }, React.createElement("li", {
                className: "w314"
            }, data, React.createElement("span", {
                className: "gray ml10"
            }, time)), React.createElement("li", {
                className: "w250"
            }, React.createElement("em", {
                className: "normal"
            }, item.fundName), React.createElement(Tooltip, {
                tooltipActiveClassName: info ? "pop-show" : "pop-hide",
                data: info
            })), React.createElement("li", {
                className: "w160 text-right"
            }, React.createElement("em", {
                className: "normal"
            }, money), React.createElement(Tooltip, {
                tooltipActiveClassName: tipsClassName,
                data: tipsText
            }), React.createElement("div", {
                className: tipsShowHide
            })), React.createElement("li", {
                className: "w268 text-right"
            }, statusName))
        }
        ,
        RecordTable.prototype.render = function() {
            var result = this.props.result
              , filterData = this.props.filterData
              , opType = filterData.opType
              , createDom = this.createHeadDom;
            return 2 == opType && (createDom = this.createHead),
            5 == opType && (createDom = this.createBonusDom),
            React.createElement("div", {
                id: "fund-record-table"
            }, React.createElement(List, _extends({}, result, {
                moudleServiceName: "user",
                url: "getFundRecords",
                ajaxParams: this.props.filterData,
                isHeadNeed: "yes",
                pagination: this.props.pagination,
                isHeadNeedOrder: "no",
                createHeadDom: createDom,
                createRowDom: this.createRowDom,
                startNum: 0,
                limit: parseInt(this.props.limit, 10),
                offset: 5
            })))
        }
        ,
        RecordTable
    }(React.Component);
    module.exports = RecordTable
});
;/*!/client/widget/record/recordFilter/fundRecordFilter/fundRecordFilter.js*/
define("user:widget/record/recordFilter/fundRecordFilter/fundRecordFilter.js", function(require, exports, module) {
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
      , FundTable = require("user:widget/record/recordTable/fundRecordTable/fundRecordTable")
      , service = require("common:widget/ui/service/service-factory")
      , userService = service.getService("user")
      , FundFilter = function(_React$Component) {
        function FundFilter(props) {
            _classCallCheck(this, FundFilter),
            _React$Component.call(this, props);
            var filterData = "";
            filterData = 2 == this.props.ishide ? {
                opType: 1,
                startDate: "",
                endDate: ""
            } : {
                opType: 1,
                startDate: "",
                endDate: ""
            },
            this.state = {
                filterData: filterData,
                tableData: this.props.result,
                time: 1,
                tradeType: "",
                isAjax: !1
            }
        }
        return _inherits(FundFilter, _React$Component),
        FundFilter.prototype.componentDidUpdate = function() {
            var hashConf = utils.getSearchConf()
              , urlIndex = parseInt(hashConf.tab || 0, 10);
            this.props.result || this.state.tableData || urlIndex == this.props.tab || this.sendAjaxRecords()
        }
        ,
        FundFilter.prototype.sendAjaxRecords = function() {
            var _this = this
              , url = "getFundRecords";
            if (!this.state.isAjax) {
                this.state.isAjax = !0;
                var limit = this.props.limit
                  , filterData2 = {
                    startNum: 0,
                    limit: limit
                }
                  , filterData = $.extend({}, this.state.filterData, filterData2);
                userService[url](filterData).then(function(out) {
                    if (out.requestStatus !== userService.STATUS.ERROR) {
                        var rsp = out.data;
                        _this.setState({
                            tableData: rsp,
                            isAjax: !1
                        })
                    }
                }),
                this.setState({
                    isAjax: !0
                })
            }
        }
        ,
        FundFilter.prototype.chooseDate = function(num, type) {
            var _this2 = this
              , filterData = this.state.filterData
              , startDate = ""
              , endDate = ""
              , date = new Date
              , nowTime = date.getTime()
              , year = date.getFullYear()
              , month = date.getMonth()
              , day = date.getDate();
            if ("time" == type) {
                switch (num) {
                case 1:
                    startDate = "",
                    endDate = "";
                    break;
                case 2:
                    startDate = parseInt(new Date(year,month,day,0,0,0).getTime() / 1e3, 10),
                    endDate = parseInt(nowTime);
                    break;
                case 3:
                    startDate = parseInt((nowTime - 2592e6) / 1e3, 10),
                    endDate = parseInt(nowTime);
                    break;
                case 4:
                    startDate = parseInt((nowTime - 80352e5) / 1e3, 10),
                    endDate = parseInt(nowTime);
                    break;
                case 5:
                    startDate = parseInt((nowTime - 31104e6) / 1e3, 10),
                    endDate = parseInt(nowTime)
                }
                filterData.startDate = startDate,
                filterData.endDate = endDate,
                this.setState({
                    filterData: filterData,
                    time: num
                }, function() {
                    _this2.sendAjaxRecords()
                })
            } else
                "op" == type ? (filterData.opType = num,
                this.setState({
                    filterData: filterData,
                    tradeType: ""
                }, function() {
                    _this2.sendAjaxRecords()
                })) : "tradeType" == type && (filterData.tradeType = "039",
                filterData.opType = "",
                this.setState({
                    filterData: filterData,
                    tradeType: 1
                }, function() {
                    _this2.sendAjaxRecords()
                }))
        }
        ,
        FundFilter.prototype.createFilterHtml = function() {
            var time = this.state.time
              , opType = this.state.filterData.opType
              , tradeType = this.state.tradeType
              , html = React.createElement("div", {
                className: "condition"
            }, React.createElement("div", {
                className: "fn-clear time"
            }, React.createElement("div", {
                className: "opt-tit"
            }, "起止日期"), React.createElement("div", {
                className: "time-opt " + (1 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 1, "time")
            }, "全部"), React.createElement("div", {
                className: "time-opt " + (2 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 2, "time")
            }, "今天"), React.createElement("div", {
                className: "time-opt " + (3 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 3, "time")
            }, "最近1个月"), React.createElement("div", {
                className: "time-opt " + (4 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 4, "time")
            }, "最近3个月"), React.createElement("div", {
                className: "time-opt " + (5 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 5, "time")
            }, "最近1年")), React.createElement("div", {
                className: "fn-clear ty"
            }, React.createElement("div", {
                className: "opt-tit"
            }, "交易类型"), React.createElement("div", {
                className: "ty-opt sin " + (1 == opType ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 1, "op")
            }, "申购"), React.createElement("div", {
                className: "ty-opt sin " + (2 == opType ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 2, "op")
            }, "赎回"), React.createElement("div", {
                className: "ty-opt sin " + (4 == opType ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 4, "op")
            }, "认购"), React.createElement("div", {
                className: "ty-opt sin " + (1 == tradeType ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 1, "tradeType")
            }, "定投"), React.createElement("div", {
                className: "ty-opt sin " + (5 == opType ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 5, "op")
            }, "分红")));
            return html
        }
        ,
        FundFilter.prototype.render = function() {
            if (2 == this.props.ishide)
                return React.createElement("div", {
                    className: "recordFilter"
                }, React.createElement(FundTable, {
                    result: this.state.tableData,
                    tab: this.props.tab,
                    limit: this.props.limit,
                    filterData: this.state.filterData,
                    pagination: this.props.pagination
                }));
            var filterHtml = this.createFilterHtml();
            return React.createElement("div", {
                className: "recordFilter"
            }, filterHtml, React.createElement(FundTable, {
                result: this.state.tableData,
                tab: this.props.tab,
                limit: this.props.limit,
                filterData: this.state.filterData,
                pagination: this.props.pagination
            }))
        }
        ,
        FundFilter
    }(React.Component);
    module.exports = FundFilter
});
;/*!/client/widget/record/recordTable/p2pRecordTable/p2pRecordTable.js*/
define("user:widget/record/recordTable/p2pRecordTable/p2pRecordTable.js", function(require, exports, module) {
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
      , List = (require("common:node_modules/react-dom/index"),
    require("common:widget/ui/utils/utils"),
    require("common:widget/react-ui/RList/List"))
      , Tooltip = require("common:widget/react-ui/RTooltip/Tooltip")
      , moment = require("common:node_modules/moment/moment")
      , RecordTable = function(_React$Component) {
        function RecordTable(props) {
            _classCallCheck(this, RecordTable),
            _React$Component.call(this, props)
        }
        return _inherits(RecordTable, _React$Component),
        RecordTable.prototype.createHeadDom = function() {
            return React.createElement("ul", {
                className: "list-header  dark fn-clear"
            }, React.createElement("li", {
                className: "w314 table-th"
            }, "交易时间"), React.createElement("li", {
                className: "w250 table-th"
            }, "交易类型"), React.createElement("li", {
                className: "w140 text-right p-r-20 table-th"
            }, "交易金额"), React.createElement("li", {
                className: "w268 text-right table-th"
            }, "结余"))
        }
        ,
        RecordTable.prototype.createRowDom = function(item, i) {
            var income = "number" == typeof item.income || "string" == typeof item.income ? item.income : 0
              , loanId = "number" == typeof item.loanId || "string" == typeof item.loanId ? item.loanId : ""
              , pay = "number" == typeof item.pay || "string" == typeof item.pay ? item.pay : 0
              , banlance = "number" == typeof item.banlance || "string" == typeof item.banlance ? item.banlance : 0
              , notes = "number" == typeof item.notes || "string" == typeof item.notes ? item.notes : ""
              , operation = "number" == typeof item.operation || "string" == typeof item.operation ? item.operation : ""
              , time = item.time
              , year = ""
              , min = "";
            time = time > 0 ? parseInt(time, 10) : null,
            time && (year = moment(time).format("YYYY-MM-DD "),
            min = moment(time).format("HH:mm"));
            var itemBgClassName = "list-item fn-clear";
            itemBgClassName += i % 2 === 0 ? " " : " dark";
            var beforeSign = ""
              , afterSign = "";
            loanId ? (beforeSign = "( ",
            afterSign = " )") : (beforeSign = "",
            afterSign = "");
            var money = pay ? "- " + parseFloat(pay).toFixed(2) : "+" + parseFloat(income).toFixed(2)
              , moneyClassName = pay ? "pay" : "income";
            return item.operation && "提现手续费" === item.operation && 0 === pay && (money = "-0.00",
            moneyClassName = "pay"),
            React.createElement("ul", {
                className: itemBgClassName
            }, React.createElement("li", {
                className: "w314"
            }, year, React.createElement("span", {
                className: "gray ml10"
            }, min)), React.createElement("li", {
                className: "w250"
            }, operation + " ", beforeSign, React.createElement("a", {
                href: window.tplConf.we_renrendai_host + "/loan-" + loanId + ".html",
                target: "_blank"
            }, loanId), afterSign), React.createElement("li", {
                className: "w160 text-right"
            }, React.createElement("em", {
                className: moneyClassName
            }, money + "元"), React.createElement(Tooltip, {
                tooltipActiveClassName: notes ? "pop-show" : "pop-hide",
                data: notes
            }), React.createElement("div", {
                className: notes ? "" : "tips-show-hide"
            })), React.createElement("li", {
                className: "w268 text-right"
            }, parseFloat(banlance).toFixed(2) + "元"))
        }
        ,
        RecordTable.prototype.render = function() {
            var result = this.props.result;
            return React.createElement("div", {
                id: "p2p-record-table"
            }, React.createElement(List, _extends({}, result, {
                moudleServiceName: "user",
                url: "getP2pRecords",
                ajaxParams: this.props.filterData,
                isHeadNeed: "yes",
                pagination: this.props.pagination,
                isHeadNeedOrder: "no",
                createHeadDom: this.createHeadDom,
                createRowDom: this.createRowDom,
                startNum: 0,
                limit: parseInt(this.props.limit, 10),
                offset: 5
            })))
        }
        ,
        RecordTable
    }(React.Component);
    module.exports = RecordTable
});
;/*!/client/widget/record/recordFilter/p2pRecordFilter/p2pRecordFilter.js*/
define("user:widget/record/recordFilter/p2pRecordFilter/p2pRecordFilter.js", function(require, exports, module) {
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
      , P2pTable = require("user:widget/record/recordTable/p2pRecordTable/p2pRecordTable")
      , service = require("common:widget/ui/service/service-factory")
      , userService = service.getService("user")
      , RecordFilter = function(_React$Component) {
        function RecordFilter(props) {
            _classCallCheck(this, RecordFilter),
            _React$Component.call(this, props);
            var filterData = "";
            filterData = 2 == this.props.ishide ? {
                type: "ALL",
                time: "ALL"
            } : {
                type: "ALL",
                time: "ALL"
            },
            this.state = {
                filterData: filterData,
                tableData: this.props.result,
                time: 1,
                isAjax: !1,
                isLoading: !1
            }
        }
        return _inherits(RecordFilter, _React$Component),
        RecordFilter.prototype.componentDidUpdate = function() {
            var hashConf = utils.getSearchConf()
              , urlIndex = parseInt(hashConf.tab, 10);
            this.props.result || this.state.tableData || urlIndex == this.props.tab || this.sendAjaxRecords()
        }
        ,
        RecordFilter.prototype.sendAjaxRecords = function() {
            var _this = this
              , url = "getP2pRecords";
            if (!this.state.isAjax) {
                this.setState({
                    isLoading: !0
                }),
                this.state.isAjax = !0;
                var limit = this.props.limit
                  , filterData2 = {
                    startNum: 0,
                    limit: limit
                }
                  , filterData3 = $.extend({}, this.state.filterData, filterData2);
                userService[url](filterData3).then(function(out) {
                    if (out.requestStatus !== userService.STATUS.ERROR) {
                        var rsp = out.data;
                        _this.setState({
                            tableData: rsp,
                            isAjax: !1,
                            isLoading: !1
                        })
                    }
                }),
                this.setState({
                    isAjax: !0
                })
            }
        }
        ,
        RecordFilter.prototype.chooseDate = function(num, type) {
            var _this2 = this
              , filterData = this.state.filterData
              , time = this.state.time
              , obj = void 0;
            if ("time" == type) {
                switch (delete filterData.year,
                delete filterData.startMonth,
                delete filterData.endMonth,
                num) {
                case "ALL":
                    filterData.time = "ALL",
                    time = 1;
                    break;
                case "ONE_MONTH":
                    filterData.time = "ONE_MONTH",
                    time = 2;
                    break;
                case "THREE_MONTH":
                    filterData.time = "THREE_MONTH",
                    time = 3;
                    break;
                case "SIX_MONTH":
                    filterData.time = "SIX_MONTH",
                    time = 4;
                    break;
                case "ONE_YEAR":
                    filterData.time = "ONE_YEAR",
                    time = 5
                }
                obj = {
                    filterData: filterData,
                    time: time
                }
            } else if ("year" == type) {
                switch (filterData.startMonth = 1,
                filterData.endMonth = 12,
                delete filterData.time,
                num) {
                case 2017:
                    filterData.year = 2017,
                    time = 12;
                    break;
                case 2016:
                    filterData.year = 2016,
                    time = 11;
                    break;
                case 2015:
                    filterData.year = 2015,
                    time = 6;
                    break;
                case 2014:
                    filterData.year = 2014,
                    time = 7;
                    break;
                case 2013:
                    filterData.year = 2013,
                    time = 8;
                    break;
                case 2012:
                    filterData.year = 2012,
                    time = 9;
                    break;
                case 2011:
                    filterData.year = 2011,
                    time = 10
                }
                obj = {
                    filterData: filterData,
                    time: time
                }
            } else
                "type" == type && (filterData.type = num,
                obj = {
                    filterData: filterData
                });
            this.setState(obj, function() {
                _this2.sendAjaxRecords()
            })
        }
        ,
        RecordFilter.prototype.onMoreData = function(num, e) {
            var more = e.currentTarget;
            more.style.display = "none";
            var moreHide = void 0;
            1 == num ? (moreHide = this.refs.moreHide,
            moreHide.style.display = "block",
            this.refs.nomore.style.display = "block") : (moreHide = this.refs.moreHide,
            moreHide.style.display = "none",
            this.refs.yesmore.style.display = "block")
        }
        ,
        RecordFilter.prototype.createFilterHtml = function() {
            var time = this.state.time
              , type = this.state.filterData.type
              , Uplay = ["UPLAN", "JOIN_UPLAN", "CASHDRAW_UPLAN"]
              , Invest = ["AUTO_INVEST_PLAN", "JOIN_AUTOINVESTPLAN", "RECHARGE_AUTOINVESTPLAN"]
              , Loan = ["LOAN_AND_TRANSFER", "LOAN", "REPAID", "IN_REPAID", "BUY_DEBT", "LOAN_TRANSFER"]
              , NewPlan = ["NEWPLAN", "JOIN_NEWPLAN", "CASHDRAW_NEWPLAN"]
              , PreferencePlan = ["PREMIUM", "REGISTER_FINANCE_PLAN_PREMIUM", "FINANCE_PLAN_PREMIUM_CASHDRAW"]
              , filter = this.state.filterData
              , filterUrl = utils.json2query(filter)
              , url = "/account/capital!transactionExport.action?" + filterUrl
              , html = React.createElement("div", {
                className: "condition"
            }, React.createElement("div", {
                className: "fn-clear time"
            }, React.createElement("div", {
                className: "opt-tit"
            }, "起止日期"), React.createElement("div", {
                className: "time-opt " + (1 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, "ALL", "time")
            }, "全部"), React.createElement("div", {
                className: "time-opt " + (2 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, "ONE_MONTH", "time")
            }, "最近1个月"), React.createElement("div", {
                className: "time-opt " + (3 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, "THREE_MONTH", "time")
            }, "3个月"), React.createElement("div", {
                className: "time-opt " + (4 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, "SIX_MONTH", "time")
            }, "6个月"), React.createElement("div", {
                className: "time-opt " + (5 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, "ONE_YEAR", "time")
            }, "1年"), React.createElement("a", {
                href: "#",
                className: "more",
                ref: "yesmore",
                onClick: this.onMoreData.bind(this, 1)
            }, "更多 ", React.createElement("span", {
                className: "icon-down3"
            }))), React.createElement("div", {
                className: "fn-clear time year hide",
                ref: "moreHide",
                style: {
                    paddingTop: "0px",
                    display: "none"
                }
            }, React.createElement("div", {
                className: "time-opt " + (12 == time ? "selected" : ""),
                style: {
                    marginLeft: "81px"
                },
                onClick: this.chooseDate.bind(this, 2017, "year")
            }, "2017年"), React.createElement("div", {
                className: "time-opt " + (11 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 2016, "year")
            }, "2016年"), React.createElement("div", {
                className: "time-opt " + (6 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 2015, "year")
            }, "2015年"), React.createElement("div", {
                className: "time-opt " + (7 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 2014, "year")
            }, "2014年"), React.createElement("div", {
                className: "time-opt " + (8 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 2013, "year")
            }, "2013年"), React.createElement("div", {
                className: "time-opt " + (9 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 2012, "year")
            }, "2012年"), React.createElement("div", {
                className: "time-opt " + (10 == time ? "selected" : ""),
                onClick: this.chooseDate.bind(this, 2011, "year")
            }, "2011年"), React.createElement("a", {
                href: "#",
                className: "less",
                onClick: this.onMoreData.bind(this, 2),
                ref: "nomore"
            }, "收起 ", React.createElement("span", {
                className: "icon-up3"
            }))), React.createElement("div", {
                className: "fn-clear ty"
            }, React.createElement("div", {
                className: "opt-tit"
            }, "交易类型"), React.createElement("div", {
                className: "ty-opt sin " + ("ALL" == type ? "selected" : ""),
                onClick: this.chooseDate.bind(this, "ALL", "type")
            }, "全部"), React.createElement("div", {
                className: "ty-opt sin " + ("RECHARGE" == type ? "selected" : ""),
                onClick: this.chooseDate.bind(this, "RECHARGE", "type")
            }, "充值"), React.createElement("div", {
                className: "ty-opt sin " + ("CASHDRAW" == type ? "selected" : ""),
                onClick: this.chooseDate.bind(this, "CASHDRAW", "type")
            }, "提现"), React.createElement("div", {
                className: "ty-opt sin " + (Uplay.indexOf(type) >= 0 ? "selected" : "")
            }, React.createElement("span", {
                className: "text"
            }, "U享/U计划"), " ", React.createElement("span", {
                className: "icon-down3"
            }), React.createElement("div", {
                className: "selectshow"
            }, React.createElement("ul", null, React.createElement("li", {
                className: type == Uplay[0] ? "selected" : "",
                "data-v": "UPLAN",
                onClick: this.chooseDate.bind(this, "UPLAN", "type")
            }, "全部"), React.createElement("li", {
                className: type == Uplay[1] ? "selected" : "",
                "data-v": "JOIN_UPLAN",
                onClick: this.chooseDate.bind(this, "JOIN_UPLAN", "type")
            }, "加入U享/U计划"), React.createElement("li", {
                className: type == Uplay[2] ? "selected" : "",
                "data-v": "CASHDRAW_UPLAN",
                onClick: this.chooseDate.bind(this, "CASHDRAW_UPLAN", "type")
            }, "U享/U计划回款")))), React.createElement("div", {
                className: "ty-opt sin " + (PreferencePlan.indexOf(type) >= 0 ? "selected" : "")
            }, React.createElement("span", {
                className: "text"
            }, "优选/优选计划"), " ", React.createElement("span", {
                className: "icon-down3"
            }), React.createElement("div", {
                className: "selectshow"
            }, React.createElement("ul", null, React.createElement("li", {
                className: type == PreferencePlan[0] ? "selected" : "",
                "data-v": "PREMIUM",
                onClick: this.chooseDate.bind(this, "PREMIUM", "type")
            }, "全部"), React.createElement("li", {
                className: type == PreferencePlan[1] ? "selected" : "",
                "data-v": "REGISTER_FINANCE_PLAN_PREMIUM",
                onClick: this.chooseDate.bind(this, "REGISTER_FINANCE_PLAN_PREMIUM", "type")
            }, "加入优选/优选计划"), React.createElement("li", {
                className: type == PreferencePlan[2] ? "selected" : "",
                "data-v": "FINANCE_PLAN_PREMIUM_CASHDRAW",
                onClick: this.chooseDate.bind(this, "FINANCE_PLAN_PREMIUM_CASHDRAW", "type")
            }, "优选/优选计划回款")))), React.createElement("div", {
                className: "ty-opt sin " + (NewPlan.indexOf(type) >= 0 ? "selected" : "")
            }, React.createElement("span", {
                className: "text"
            }, "月升计划"), React.createElement("span", {
                className: "icon-down3"
            }), React.createElement("div", {
                className: "selectshow"
            }, React.createElement("ul", null, React.createElement("li", {
                className: type == NewPlan[0] ? "selected" : "",
                "data-v": "NEWPLAN",
                onClick: this.chooseDate.bind(this, "NEWPLAN", "type")
            }, "全部"), React.createElement("li", {
                className: type == NewPlan[1] ? "selected" : "",
                "data-v": "JOIN_NEWPLAN",
                onClick: this.chooseDate.bind(this, "JOIN_NEWPLAN", "type")
            }, "加入月升计划"), React.createElement("li", {
                className: type == NewPlan[2] ? "selected" : "",
                "data-v": "CASHDRAW_NEWPLAN",
                onClick: this.chooseDate.bind(this, "CASHDRAW_NEWPLAN", "type")
            }, "月升计划回款")))), React.createElement("div", {
                className: "ty-opt " + (Invest.indexOf(type) >= 0 ? "selected" : "")
            }, React.createElement("span", {
                className: "text"
            }, "薪享/薪计划"), " ", React.createElement("span", {
                className: "icon-down3"
            }), React.createElement("div", {
                className: "selectshow"
            }, React.createElement("ul", null, React.createElement("li", {
                className: type == Invest[0] ? "selected" : "",
                "data-v": "AUTO_INVEST_PLAN",
                onClick: this.chooseDate.bind(this, "AUTO_INVEST_PLAN", "type")
            }, "全部"), React.createElement("li", {
                className: type == Invest[1] ? "selected" : "",
                "data-v": "JOIN_AUTOINVESTPLAN",
                onClick: this.chooseDate.bind(this, "JOIN_AUTOINVESTPLAN", "type")
            }, "加入薪享/薪计划"), React.createElement("li", {
                className: type == Invest[2] ? "selected" : "",
                "data-v": "RECHARGE_AUTOINVESTPLAN",
                onClick: this.chooseDate.bind(this, "RECHARGE_AUTOINVESTPLAN", "type")
            }, "支付薪享/薪计划")))), React.createElement("div", {
                className: "ty-opt sin " + (Loan.indexOf(type) >= 0 ? "selected" : "")
            }, React.createElement("span", {
                className: "text"
            }, "债权/散标 "), React.createElement("span", {
                className: "icon-down3"
            }), React.createElement("div", {
                className: "selectshow"
            }, React.createElement("ul", null, React.createElement("li", {
                className: type == Loan[0] ? "selected" : "",
                "data-v": "LOAN_AND_TRANSFER",
                onClick: this.chooseDate.bind(this, "LOAN_AND_TRANSFER", "type")
            }, "全部"), React.createElement("li", {
                className: type == Loan[1] ? "selected" : "",
                "data-v": "LOAN",
                onClick: this.chooseDate.bind(this, "LOAN", "type")
            }, "投资散标"), React.createElement("li", {
                className: type == Loan[2] ? "selected" : "",
                "data-v": "REPAID",
                onClick: this.chooseDate.bind(this, "REPAID", "type")
            }, "回收本息"), React.createElement("li", {
                className: type == Loan[3] ? "selected" : "",
                "data-v": "IN_REPAID",
                onClick: this.chooseDate.bind(this, "IN_REPAID", "type")
            }, "提前回收债权"), React.createElement("li", {
                className: type == Loan[4] ? "selected" : "",
                "data-v": "BUY_DEBT",
                onClick: this.chooseDate.bind(this, "BUY_DEBT", "type")
            }, "购买债权"), React.createElement("li", {
                className: type == Loan[5] ? "selected" : "",
                "data-v": "LOAN_TRANSFER",
                onClick: this.chooseDate.bind(this, "LOAN_TRANSFER", "type")
            }, "债权转让")))), React.createElement("div", {
                className: "ty-opt sin " + ("OTHER" == type ? "selected" : ""),
                value: "OTHER",
                onClick: this.chooseDate.bind(this, "OTHER", "type")
            }, "其它"), React.createElement("a", {
                id: "export",
                href: url,
                target: "_blank",
                className: "fn-right"
            }, "导出查询结果")));
            return html
        }
        ,
        RecordFilter.prototype.render = function() {
            var isLoading = this.state.isLoading ? "list-loading show" : "list-loading hide";
            if (2 == this.props.ishide)
                return React.createElement("div", {
                    className: "recordFilter"
                }, React.createElement("div", {
                    className: isLoading
                }), React.createElement(P2pTable, {
                    result: this.state.tableData,
                    tab: this.props.tab,
                    limit: this.props.limit,
                    filterData: this.state.filterData,
                    pagination: this.props.pagination
                }));
            var filterHtml = this.createFilterHtml();
            return React.createElement("div", {
                className: "recordFilter"
            }, React.createElement("div", {
                className: isLoading
            }), filterHtml, React.createElement(P2pTable, {
                result: this.state.tableData,
                tab: this.props.tab,
                limit: this.props.limit,
                filterData: this.state.filterData,
                pagination: this.props.pagination
            }))
        }
        ,
        RecordFilter
    }(React.Component);
    module.exports = RecordFilter
});
;/*!/client/widget/record/recordTab/recordTab.js*/
define("user:widget/record/recordTab/recordTab.js", function(require, exports, module) {
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
      , utils = require("common:widget/ui/utils/utils")
      , TabWrap = require("common:widget/react-ui/RTabs/RTabs")
      , TabNavItem = TabWrap.TabNavItem
      , TabNav = TabWrap.TabNav
      , TabPanelItem = TabWrap.TabPanelItem
      , TabPanel = TabWrap.TabPanel
      , RTabs = TabWrap.RTabs
      , ExchangeFilter = require("user:widget/record/recordFilter/exchangeRecordFilter/exchangeRecordFilter")
      , FundFilter = require("user:widget/record/recordFilter/fundRecordFilter/fundRecordFilter")
      , FofFilter = require("user:widget/record/recordFilter/fofRecordFilter/fofRecordFilter")
      , P2pFilter = require("user:widget/record/recordFilter/p2pRecordFilter/p2pRecordFilter")
      , RecordTab = function(_React$Component) {
        function RecordTab(props) {
            _classCallCheck(this, RecordTab),
            _React$Component.call(this, props);
            var tabIndex = 0
              , isAutoScroll = !1
              , hashConf = utils.getSearchConf();
            if (hashConf && hashConf.hasOwnProperty("tab")) {
                isAutoScroll = !1;
                var tempIndex = parseInt(hashConf.tab, 10) || 0;
                tabIndex = tempIndex
            }
            this.state = {
                selectedIndex: tabIndex,
                autoScrollOnMount: isAutoScroll,
                filterData: {}
            },
            this.onTabRequestChange = this.onTabRequestChange.bind(this)
        }
        return _inherits(RecordTab, _React$Component),
        RecordTab.prototype.componentDidMount = function() {
            var _this = this;
            this.state.autoScrollOnMount && setTimeout(function() {
                try {
                    var con = ReactDOM.findDOMNode(_this.refs.tab);
                    con.scrollIntoView()
                } catch (e) {}
            }, 300)
        }
        ,
        RecordTab.prototype.onTabRequestChange = function(index) {
            this.setState({
                selectedIndex: index
            })
        }
        ,
        RecordTab.prototype.filterDataChange = function(filter) {
            this.setState({
                filterData: filter
            })
        }
        ,
        RecordTab.prototype.render = function() {
            var hashConf = (this.state.selectedIndex,
            utils.getSearchConf())
              , urlIndex = parseInt(hashConf.tab || 0, 10)
              , reOne = ""
              , reTwo = ""
              , reThr = ""
              , reFour = "";
            0 == urlIndex ? reOne = this.props.result : 1 == urlIndex ? reTwo = this.props.result : 2 == urlIndex ? reThr = this.props.result : 3 == urlIndex && (reFour = this.props.result);
            var navItemClass = "detail-tab-nav-item"
              , style = 2 == this.props.ishide ? {
                paddingTop: "16px"
            } : {}
              , isFilter = this.props.isFilter
              , FilterTab = React.createElement(TabNav, null, React.createElement(TabNavItem, {
                className: navItemClass
            }, "基金"), React.createElement(TabNavItem, {
                className: navItemClass
            }, "组合"), React.createElement(TabNavItem, {
                className: navItemClass
            }, "P2P"), React.createElement(TabNavItem, {
                className: navItemClass
            }, "定期理财"));
            return 1 == isFilter && (FilterTab = []),
            React.createElement(RTabs, {
                ref: "tab",
                id: "record-header-tab",
                className: "record-tab-class",
                onRequestChange: this.onTabRequestChange,
                selectedIndex: this.state.selectedIndex
            }, FilterTab, React.createElement("div", {
                style: style
            }), React.createElement(TabPanel, null, React.createElement(TabPanelItem, {
                className: "redord-detail-panel-item"
            }, React.createElement(FundFilter, {
                result: reOne,
                limit: this.props.limit,
                startNum: this.props.startNum,
                ishide: this.props.ishide,
                tab: this.state.selectedIndex,
                filter: this.filterDataChange,
                pagination: this.props.pagination
            })), React.createElement(TabPanelItem, {
                className: "record-detail-panel-item"
            }, React.createElement(FofFilter, {
                result: reTwo,
                limit: this.props.limit,
                startNum: this.props.startNum,
                ishide: this.props.ishide,
                tab: this.state.selectedIndex,
                filter: this.filterDataChange,
                pagination: this.props.pagination
            })), React.createElement(TabPanelItem, {
                className: "record-detail-panel-item"
            }, React.createElement(P2pFilter, {
                result: reThr,
                limit: this.props.limit,
                style: style,
                startNum: this.props.startNum,
                ishide: this.props.ishide,
                tab: this.state.selectedIndex,
                filter: this.filterDataChange,
                pagination: this.props.pagination
            })), React.createElement(TabPanelItem, {
                className: "record-detail-panel-item"
            }, React.createElement(ExchangeFilter, {
                result: reFour,
                limit: this.props.limit,
                startNum: this.props.startNum,
                ishide: this.props.ishide,
                tab: this.state.selectedIndex,
                filter: this.filterDataChange,
                pagination: this.props.pagination
            }))))
        }
        ,
        RecordTab
    }(React.Component);
    module.exports = RecordTab
});
;/*!/client/widget/setting/RLoginPassword/RLoginPassword.js*/
define("user:widget/setting/RLoginPassword/RLoginPassword.js", function(require, exports, module) {
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
      , service = require("common:widget/ui/service/service-factory")
      , userService = service.getService("user")
      , $statistic = (require("common:widget/ui/utils/utils"),
    require("common:node_modules/glpb-components-common/src/index").weStatistic)
      , RLgoinPassword = function(_React$Component) {
        function RLgoinPassword(props) {
            _classCallCheck(this, RLgoinPassword),
            _React$Component.call(this, props),
            this.doSetLoginPassword = this.doSetLoginPassword.bind(this),
            this.handleChange = this.handleChange.bind(this),
            this.validatePassword = this.validatePassword.bind(this),
            this.state = {
                inputValue: "",
                errorMessage: "",
                isCanClick: !1,
                inputErrorClassName: "",
                isLoading: !1
            }
        }
        return _inherits(RLgoinPassword, _React$Component),
        RLgoinPassword.prototype.doSetLoginPassword = function() {
            var _this = this
              , isLoading = this.state.isLoading;
            if (isLoading)
                return !1;
            var type = this.props.type
              , password = this.state.inputValue;
            this.setState({
                isLoading: !0,
                errorMessage: ""
            }),
            userService.doSetLoginPassword({
                password: password,
                type: type
            }).then(function(result) {
                var data = result.data || {};
                if (result.requestStatus !== userService.STATUS.SUCCESS) {
                    var message = data.message || "请求后端服务出错, 请稍后再试";
                    return Promise.reject(message)
                }
                var jumpURL = data.data.jumpURL;
                if (0 != data.status) {
                    var message = data.message;
                    message = encodeURIComponent(message),
                    type = encodeURIComponent(type),
                    location.href = jumpURL + "?message=" + message + "&type=" + type
                } else
                    location.href = jumpURL
            })["catch"](function(message) {
                _this.setState({
                    isLoading: !1,
                    errorMessage: message || "网络异常，请稍后再试"
                })
            }),
            "isOutAccount" == type && $statistic.eventRaw({
                eventId: "click_determine_set_password_register",
                extra: {}
            })
        }
        ,
        RLgoinPassword.prototype.handleChange = function(e) {
            var target = e.target
              , value = target.value
              , isPass = this.validatePassword(value);
            this.setState({
                inputValue: value,
                isCanClick: isPass,
                errorMessage: isPass ? "" : "请设置8～16位数字、字母或符号组合",
                inputErrorClassName: isPass ? "" : "input-login-password-error"
            })
        }
        ,
        RLgoinPassword.prototype.validatePassword = function(value) {
            var isPassGroup = !/^(?![0-9]+$)(?![a-zA-Z]+$)(?![~!@#$%^&*._]+$)[0-9A-Za-z~!@#$%^&*._]{8,16}$/.test(value);
            return isPassGroup ? !1 : !0
        }
        ,
        RLgoinPassword.prototype.render = function() {
            var props = this.props
              , state = this.state
              , type = props.type
              , isCanClick = state.isCanClick
              , errorMessage = state.errorMessage
              , inputErrorClassName = state.inputErrorClassName
              , isLoading = state.isLoading
              , btnDom = "";
            btnDom = isCanClick && !isLoading ? React.createElement("input", {
                className: "j-btn  j-btn-super-big   j-btn-orange ",
                type: "button",
                value: "确定",
                onClick: this.doSetLoginPassword
            }) : React.createElement("span", {
                className: "j-btn  j-btn-super-big   j-btn-disabled "
            }, " 确定");
            var inputDesc = "8-16位数字、字母或符号组合"
              , isInAccount = "isInAccount" == type ? "" : React.createElement("div", {
                className: "jump-set-login-password"
            }, React.createElement("div", null, React.createElement("a", {
                href: "/user/setting/openAccount"
            }, "跳过")));
            return React.createElement("div", {
                id: "login-password-form-wrapper"
            }, React.createElement(RForm, {
                id: "login-password-form"
            }, React.createElement("div", {
                className: "ui-set-login-input-item"
            }, React.createElement("label", {
                className: "ui-set-login-label",
                "for": "loginPassword"
            }, "设置密码"), React.createElement("input", {
                type: "password",
                onChange: this.handleChange.bind(this),
                name: "password",
                placeholder: inputDesc,
                className: "input-login-password " + inputErrorClassName,
                minLength: 8,
                maxLength: 16
            }), React.createElement("label", {
                className: "ui-error-message"
            }, " ", errorMessage, " ")), React.createElement("div", {
                className: "ui-confirm-submit-box "
            }, btnDom), isInAccount))
        }
        ,
        RLgoinPassword
    }(React.Component);
    module.exports = RLgoinPassword
});
;/*!/client/widget/setting/wdg-bind-role/wdg-bind-email/wdg-bind-email.js*/
define("user:widget/setting/wdg-bind-role/wdg-bind-email/wdg-bind-email.js", function(require, exports, module) {
    "use strict";
    var glpbCommon = (require("common:widget/ui/utils/utils"),
    require("common:node_modules/glpb-components-common/src/ValidateProvider/RRDValidator"))
      , service = require("common:widget/ui/service/service-factory")
      , settingService = service.getService("setting")
      , bindEmail = {
        init: function() {
            this.error = "不能为空";
            var that = this;
            $("#sub-set-email-btn").on("click", function() {
                that.sendNewEmail()
            }),
            $("#email").keyup(function() {
                that.validateEmail()
            })
        },
        sendNewEmail: function() {
            var _this = this
              , that = this;
            if (!that.validateEmail()) {
                var email = ($("#checkType").val(),
                $("#email").val());
                settingService.sendCheckBindEmail({
                    email: email
                }).then(function(res) {
                    if (res.requestStatus !== settingService.STATUS.SUCCESS) {
                        var msg = res.data ? res.data.message : "请求后端服务出错, 请稍后再试";
                        return Promise.reject(new Error(msg))
                    }
                    var data = res.data;
                    if (0 == data.status) {
                        var $s = $(".success");
                        if (!$s.length)
                            return;
                        $(".inputs").delay(1e3).slideUp(),
                        $s.delay(1e3).slideDown(),
                        setTimeout(function() {
                            location.href = "/user/setting/accountInfo"
                        }, 3e3)
                    } else
                        _this.error = data.message,
                        _this.errorModal(0)
                }).caught(function(e) {
                    $(".error").text(e.message)
                })
            }
        },
        validateEmail: function() {
            var email = $("#email").val()
              , vali = glpbCommon.validate
              , isEmail = vali.isEmail(email);
            return email ? isEmail ? (this.error = "",
            this.errorModal(0),
            !1) : (this.error = "请输入有效的邮箱地址",
            this.errorModal(0),
            !0) : (this.error = "邮箱不能为空",
            this.errorModal(0),
            !0)
        },
        errorModal: function(num) {
            $("label.error").eq(num).text(this.error),
            this.error ? $(".ui-input-setting").eq(num).addClass("error") : $(".ui-input-setting").eq(num).removeClass("error")
        }
    };
    module.exports = bindEmail
});
;/*!/client/widget/setting/wdg-open-account/wdg-open-account.js*/
define("user:widget/setting/wdg-open-account/wdg-open-account.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var $ = require("common:widget/lib/jquery/jquery")
      , glpbCommon = require("common:node_modules/glpb-components-common/src/index")
      , RRDValidator = glpbCommon.RRDValidator
      , statistic = require("common:widget/ui/statistic/statistic")
      , utils = require("common:widget/ui/utils/utils")
      , OpenAccount = function() {
        function OpenAccount() {
            _classCallCheck(this, OpenAccount)
        }
        return OpenAccount.prototype.init = function(bankListData) {
            this.initBankLimitBox(bankListData),
            this.canBindCardInCMBC = !1,
            this.handle(),
            statistic.eventRaw({
                eventId: "Enter_PC_login_Result"
            })
        }
        ,
        OpenAccount.prototype.validName = function() {
            var realNameDom = $("#realName")
              , realName = realNameDom.val()
              , errorDom = $("#real-name-error")
              , isSpace = -1 == String(realName).indexOf(" ") ? !0 : !1;
            return "" == realName ? (realNameDom.addClass("hightlight-border"),
            errorDom.text("姓名不能为空"),
            !1) : isSpace ? RRDValidator.validate.isRealName(realName) ? (realNameDom.removeClass("hightlight-border"),
            errorDom.text(""),
            !0) : (realNameDom.addClass("hightlight-border"),
            errorDom.text("请正确输入您的姓名"),
            !1) : (realNameDom.addClass("hightlight-border"),
            errorDom.text("不能有空格"),
            !1)
        }
        ,
        OpenAccount.prototype.validNo = function() {
            var idNoDom = $("#idNo")
              , idNo = idNoDom.val().replace(/\s/g, "")
              , errorDom = $("#id-no-error");
            return "" == idNo ? (idNoDom.addClass("hightlight-border"),
            errorDom.text("身份证号不能为空"),
            !1) : RRDValidator.validate.isIDNum(idNo) ? (idNoDom.removeClass("hightlight-border"),
            errorDom.text(""),
            !0) : (idNoDom.addClass("hightlight-border"),
            errorDom.text("请正确输入您的二代身份证号码"),
            !1)
        }
        ,
        OpenAccount.prototype.validCardNo = function() {
            var cardNoDom = $("#cardNo")
              , cardNo = cardNoDom.val().replace(/\s/g, "")
              , errorDom = $("#card-no-error");
            return "" == cardNo ? (cardNoDom.addClass("hightlight-border"),
            errorDom.text("不能为空"),
            !1) : cardNo.length < 6 ? (cardNoDom.addClass("hightlight-border"),
            errorDom.text("请填写银行卡号前6位"),
            !1) : (cardNoDom.removeClass("hightlight-border"),
            errorDom.text(""),
            !0)
        }
        ,
        OpenAccount.prototype.handleCardNo = function() {
            var cardNoDom = $("#cardNo")
              , cardId = cardNoDom.val().replace(/\D/g, "");
            cardId.length > 6 && (cardId = cardId.slice(0, 6)),
            cardNoDom.val(/\S{5}/.test(cardId) ? cardId.replace(/\s/g, "").replace(/(.{4})/g, "$1 ") : cardId),
            this.checkIsSupportByCardNum(cardId)
        }
        ,
        OpenAccount.prototype.handle = function() {
            var that = this
              , $bankListModalCloseBtn = $(".icon-we-close");
            $("#realName").on("keyup", function() {
                that.validName()
            }),
            $("#idNo").on("keyup", function() {
                that.validNo()
            }),
            $("#cardNo").on("keyup paste", function(e) {
                return e.keyCode && "8" == e.keyCode ? !1 : void setTimeout(function() {
                    that.handleCardNo()
                }, 0)
            }),
            $("#btn-submit").on("click", function(e) {
                statistic.eventRaw({
                    eventId: "Click_PC_login_Result"
                });
                var validName = that.validName()
                  , validNo = that.validNo()
                  , validCardNo = that.validCardNo();
                if (validCardNo) {
                    var binCode = $("#cardNo").val().replace(/\D/g, "");
                    that.checkIsSupportByCardNum(binCode)
                }
                return validName && validNo && validCardNo && that.canBindCardInCMBC ? void 0 : (e.preventDefault(),
                !1)
            }),
            $(".support-bank-list-btn").on("click", function() {
                that.showModal(".modal-quota-box")
            }),
            $bankListModalCloseBtn.on("click", function() {
                that.hideModal()
            }),
            $("#bind-card-info-box").on("click", ".btn-cmbc-not-support-recharge", function() {
                that.showModal(".modal-cmbc-not-support-recharge-box")
            })
        }
        ,
        OpenAccount.prototype.showModal = function(modalId) {
            $(".modal-content").hide(),
            $(modalId + ",.bank-list-modal-box").show()
        }
        ,
        OpenAccount.prototype.hideModal = function() {
            $(".bank-list-modal-box").hide()
        }
        ,
        OpenAccount.prototype.initBankLimitBox = function(bankListData) {
            var bankListHtml = "";
            bankListData.length > 0 && bankListData.map(function(list) {
                var oldCode = utils.minshengBankCode2rrd(list.code);
                bankListHtml += '<tr>\n                    <td><span class="bank-name"><i class="small-bank-icon small-bank-' + list.kqCode + " small-bank-" + oldCode + '"></i>' + list.bankName + '</span></td>\n                    <td><span class="bank-limit">' + list.rechargeTip.replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&gt;/g, ">") + "</span></td>\n                </tr>"
            }),
            $("#recharge-bank-limit-list").append(bankListHtml)
        }
        ,
        OpenAccount.prototype.checkIsSupportByCardNum = function(bin) {
            var cardNoDom = $("#cardNo")
              , $cardNumErrorDom = $("#card-no-error");
            $(".submit-tip").text("");
            var that = this;
            if (bin.length >= 6) {
                var url = "/user/trade/getBankInfo"
                  , data = {
                    binCode: bin
                };
                $.get(url, data, function(res) {
                    if (res = JSON.parse(res),
                    that.canBindCardInCMBC = !1,
                    0 == res.status)
                        if (res.data && 1 == res.data.length) {
                            var bankData = res.data[0];
                            1 == bankData.bindCardStatus ? (cardNoDom.removeClass("hightlight-border"),
                            that.canBindCardInCMBC = !0,
                            $("#bankId").val(bankData.bankId),
                            $("#bank-name").attr("class", "small-bank-icon small-bank-" + bankData.kqCode + " small-bank-" + bankData.code).text(bankData.bankName),
                            $("#bank-limit").html(0 == bankData.payCardStatus ? '<em class="warning">当前银行仅支持网银/转账充值，建议更换银行卡</em> <span class="icon-we-jingshiicon btn-cmbc-not-support-recharge"></span>' : bankData.rechargeTip),
                            $cardNumErrorDom.text(""),
                            $("#bind-card-info-box").slideDown()) : (cardNoDom.addClass("hightlight-border"),
                            $cardNumErrorDom.text("暂不支持当前银行"),
                            $("#bind-card-info-box").slideUp())
                        } else
                            cardNoDom.addClass("hightlight-border"),
                            $cardNumErrorDom.text("暂不支持当前银行"),
                            $("#bind-card-info-box").slideUp();
                    else
                        cardNoDom.addClass("hightlight-border"),
                        $cardNumErrorDom.text(res.message),
                        $("#bind-card-info-box").slideUp()
                })
            }
        }
        ,
        OpenAccount
    }();
    module.exports = new OpenAccount
});
;/*!/client/widget/setting/wdg-refresh-avatar/wdg-refresh-avatar.js*/
define("user:widget/setting/wdg-refresh-avatar/wdg-refresh-avatar.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var $ = require("common:widget/lib/jquery/jquery");
    require("common:widget/lib/jquery/cropper.min");
    var $loading = require("common:widget/ui/loading/loading")
      , RefreshAvatar = function() {
        function RefreshAvatar() {
            _classCallCheck(this, RefreshAvatar)
        }
        return RefreshAvatar.prototype.initToBlob = function() {
            HTMLCanvasElement.prototype.toBlob || Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
                value: function(callback, type, quality) {
                    for (var binStr = atob(this.toDataURL(type, quality).split(",")[1]), len = binStr.length, arr = new Uint8Array(len), i = 0; len > i; i++)
                        arr[i] = binStr.charCodeAt(i);
                    callback(new Blob([arr],{
                        type: type || "image/png"
                    }))
                }
            })
        }
        ,
        RefreshAvatar.prototype.lessThanIE9 = function() {
            var DEFAULT_VERSION = "9.0"
              , ua = navigator.userAgent.toLowerCase()
              , isIE = ua.indexOf("msie") > -1;
            if (isIE) {
                var safariVersion = ua.match(/msie ([\d.]+)/)[1];
                return parseFloat(safariVersion) < parseFloat(DEFAULT_VERSION)
            }
            return !1
        }
        ,
        RefreshAvatar.prototype.init = function() {
            this.lessThanIE9() ? $(".user-avatar").on("click", function() {
                alert("您的浏览器版本过低，暂不支持修改用户头像。请下载IE9及以上版本，或者使用人人贷理财App操作。")
            }) : (this.$imgCropper = $("#checkedImg"),
            this.initToBlob(),
            this.handle())
        }
        ,
        RefreshAvatar.prototype.handle = function() {
            var that = this;
            $("#avatarSubmit").on("click", function() {
                $loading.show();
                var select_img = $("#uploadImg")[0].files;
                return 0 == select_img.length ? (alert("请选择图片，用户头像支持jpg、png、gif格式的图片文件"),
                void $loading.hide()) : void that.$imgCropper.cropper("getCroppedCanvas").toBlob(function(blob) {
                    var form = new FormData;
                    form.append("file", blob);
                    var fileName = (new Date).valueOf() + "-" + parseInt(1e5 * Math.random());
                    form.append("fileName", fileName),
                    $.ajax({
                        type: "post",
                        url: "/user/upload/avatar",
                        data: form,
                        contentType: !1,
                        processData: !1,
                        success: function(data) {
                            var upload_data = JSON.parse(data);
                            1001 == upload_data.status ? (alert("登录状态失效，请重新登录！"),
                            location.href = "/login") : 0 == upload_data.status ? (alert("修改头像成功！"),
                            location.reload()) : (alert(upload_data.message),
                            $loading.hide())
                        },
                        error: function() {
                            alert("网络错误，请稍后重试！"),
                            $loading.hide()
                        }
                    })
                }, "image/jpeg", .5)
            }),
            $("#uploadImg").on("change", function(e) {
                var files = e.target.files;
                if (files && files.length > 0) {
                    var select_img = files[0];
                    if (!that.isImageFile(select_img))
                        return void alert("用户头像仅支持jpg、png、gif格式的图片文件");
                    if (select_img.size > 1048576)
                        return void alert("文件大小超过1M，请重新选择图像");
                    $("#uploadError").text(""),
                    $("#avatarName").text(select_img.name),
                    that.select_img_url = window.URL.createObjectURL(select_img),
                    $("#checkedImg").attr("src", that.select_img_url),
                    that.initCropper()
                }
            }),
            $("#closeBtn").on("click", function() {
                $("#uploadImgModal").fadeOut()
            }),
            $(".btn-avator-operate").on("click", function() {
                var method = $(this).data("method")
                  , option = $(this).data("option");
                try {
                    that.$imgCropper.cropper(method, option)
                } catch (e) {
                    alert("请先选择图片！")
                }
            }),
            $(".user-avatar").on("click", function() {
                $("#uploadImgModal").fadeIn()
            })
        }
        ,
        RefreshAvatar.prototype.initCropper = function() {
            this.$imgCropper.cropper({
                aspectRatio: 1,
                preview: ".avatar-preview",
                viewMode: 1
            }),
            this.$imgCropper.cropper("replace", this.select_img_url)
        }
        ,
        RefreshAvatar.prototype.isImageFile = function(file) {
            return file.type ? /^image\/\w+$/.test(file.type) : /\.(jpg|jpeg|png|gif)$/.test(file)
        }
        ,
        RefreshAvatar
    }();
    module.exports = new RefreshAvatar
});
;/*!/client/widget/trade/recharge/bind-card-again-prompt-box/bind-card-again-prompt-box.js*/
define("user:widget/trade/recharge/bind-card-again-prompt-box/bind-card-again-prompt-box.js", function(require, exports, module) {
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var CmbcBindCardBox = function() {
        function CmbcBindCardBox() {
            _classCallCheck(this, CmbcBindCardBox)
        }
        return CmbcBindCardBox.prototype.init = function() {
            this.handle()
        }
        ,
        CmbcBindCardBox.prototype.handle = function() {
            $(".close-cmbc-bind-card-modal-btn").on("click", function() {
                $(".recharge-bind-card-again-prompt-box").hide()
            })
        }
        ,
        CmbcBindCardBox
    }();
    module.exports = new CmbcBindCardBox
});
;/*!/client/widget/trade/recharge/cmbc-recharge/checkInput.js*/
define("user:widget/trade/recharge/cmbc-recharge/checkInput.js", function(require, exports, module) {
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var CheckInput = function() {
        function CheckInput() {
            _classCallCheck(this, CheckInput)
        }
        return CheckInput.prototype.checkMessageCode = function($dom, needGetCodeAgain, token, externalRefNumber) {
            var value = $dom.val();
            return needGetCodeAgain ? ($dom.next(".input-error").text("请重新获取短信验证码"),
            this.shakeDom($dom),
            !1) : token && externalRefNumber ? /^\d{6}$/.test(value) ? ($dom.next(".input-error").text(""),
            $dom.removeClass("error-border"),
            !0) : ($dom.next(".input-error").text("请输入正确的验证码"),
            this.shakeDom($dom),
            !1) : ($dom.next(".input-error").text("请先获取短信验证码"),
            this.shakeDom($dom),
            !1)
        }
        ,
        CheckInput.prototype.checkMoney = function($dom, isFirstRecharge) {
            var value = $dom.val().replace(/,/g, "");
            return value ? (value = Number(value),
            isNaN(value) || 0 >= value ? ($dom.next(".input-error").text("请输入正确的充值金额"),
            this.shakeDom($dom),
            !1) : value.toString().split(".").length > 1 && value.toString().split(".")[1].length > 2 ? ($dom.next(".input-error").text("请输入正确的充值金额，最多保留两位小数"),
            this.shakeDom($dom),
            !1) : "yes" == isFirstRecharge && $dom.data("first-limit") && $dom.data("first-limit") < value || "yes" == isFirstRecharge && !$dom.data("first-limit") && $dom.data("single-limit") && $dom.data("single-limit") < value || "no" == isFirstRecharge && $dom.data("single-limit") && $dom.data("single-limit") < value ? ($dom.next(".input-error").text("充值金额超出限额，请分笔充值或使用网银/转账充值"),
            this.shakeDom($dom),
            !1) : ($dom.next(".input-error").text(""),
            $dom.removeClass("error-border"),
            !0)) : ($dom.next(".input-error").text("充值金额不能为空"),
            this.shakeDom($dom),
            !1)
        }
        ,
        CheckInput.prototype.checkTel = function($dom) {
            var tel = $dom.val();
            return /^1[34578]\d{9}$/.test(tel) ? ($dom.next(".input-error").text(""),
            $dom.removeClass("error-border"),
            !0) : ($dom.next(".input-error").text("请输入正确的手机号"),
            $dom.addClass("error-border"),
            this.shakeDom($dom),
            !1)
        }
        ,
        CheckInput.prototype.checkBankCode = function($dom) {
            var cardId = $dom.val().replace(/\D/g, "");
            return "" == cardId ? ($dom.next(".input-error").text("银行卡号不能为空").show(),
            this.shakeDom($dom),
            !1) : !/^[0-9]*$/.test(cardId) || cardId.length < 6 ? (this.shakeDom($dom),
            $dom.next(".input-error").text("请输入银行卡号前6位数字").show(),
            !1) : ($dom.removeClass("error-border"),
            $dom.next(".input-error").text("").hide(),
            !0)
        }
        ,
        CheckInput.prototype.shakeDom = function($dom) {
            $dom.addClass("error-border")
        }
        ,
        CheckInput
    }();
    module.exports = new CheckInput
});
;/*!/client/widget/trade/recharge/cmbc-recharge/cmbc-recharge.js*/
define("user:widget/trade/recharge/cmbc-recharge/cmbc-recharge.js", function(require, exports, module) {
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var $ = require("common:widget/lib/jquery/jquery")
      , checkInput = require("user:widget/trade/recharge/cmbc-recharge/checkInput.js")
      , utils = require("common:widget/ui/utils/utils")
      , CmbcRecharge = function() {
        function CmbcRecharge() {
            _classCallCheck(this, CmbcRecharge)
        }
        return CmbcRecharge.prototype.init = function(cmbcPayData, bankListData) {
            this.cmbcPayData = cmbcPayData,
            this.bankListData = bankListData,
            this.initView(),
            this.handle()
        }
        ,
        CmbcRecharge.prototype.initView = function() {
            if (this.cmbcPayData) {
                var bindStatus = this.cmbcPayData.bindStatus
                  , payCardStatus = this.cmbcPayData.payCardStatus
                  , cardNo = (this.cmbcPayData.bindCardStatus,
                this.cmbcPayData.cardNo);
                "2" !== bindStatus ? ($(".recharge-without-card ").show(),
                ("3" === bindStatus || "1" === bindStatus && "1" === payCardStatus) && -1 === cardNo.indexOf("*") && ($("#quick-recharge-bank-card-input-without-card").val(cardNo.replace(/\s/g, "").replace(/(.{4})/g, "$1 ")),
                this.checkSupportQuickRechargeByCardNum(cardNo)),
                this.initBankLimitBox()) : "0" == payCardStatus ? $(".recharge-without-valid-card").show() : (this.initBankLimitBox(),
                $(".recharge-with-valid-cmbc-card").show())
            }
        }
        ,
        CmbcRecharge.prototype.handle = function() {
            var that = this;
            $(".quick-recharge-bank-card-input").on("keyup", function(e) {
                var cardId = $(this).val().replace(/\D/g, "");
                return e.keyCode && "8" == e.keyCode ? !1 : (cardId.length > 6 && (cardId = cardId.slice(0, 6)),
                $(this).val(/\S{5}/.test(cardId) ? cardId.replace(/\s/g, "").replace(/(.{4})/g, "$1 ") : cardId),
                void that.checkSupportQuickRechargeByCardNum(cardId))
            }),
            $(".quick-recharge-input-money").on("keyup", function() {
                checkInput.checkMoney($(this), $(this).data("first-recharge"));
                var money = $(this).val().replace(/,/g, "");
                $(this).val(money.replace(/^\d+/g, function(m) {
                    return m.replace(/(?=(?!^)(\d{3})+$)/g, ",")
                }))
            }),
            $("#btn-recharge-bind-valid-cmbc-card").on("click", function(e) {
                var $rechargeInput = $(this).parents(".quick-recharge-form").find(".quick-recharge-input-money");
                return that.checkFormInput($rechargeInput) ? void 0 : (e.preventDefault(),
                !1)
            }),
            $(".btn-cmbc-bind-card").on("click", function() {
                var $cardIdDom = $("#cmbc-bind-card-without-card").find(".quick-recharge-bank-card-input")
                  , pan = $cardIdDom.val().replace(/\D/g, "");
                return !that.showBankModalByCardNum && pan.length >= 6 ? void that.checkSupportQuickRechargeByCardNum(pan) : checkInput.checkBankCode($cardIdDom) ? that.bankData && "0" == that.bankData.payCardStatus && "confirm-bind-card-not-support-pay-by-cmbc" != $(this).attr("id") ? void that.showQuickRechargeModal(".modal-cmbc-not-support-recharge-box") : void $("#cmbc-bind-card-without-card").submit() : void 0
            }),
            $(".close-recharge-modal-btn").on("click", function() {
                that.hideQuickRechargeModal()
            }),
            $(".support-bank-btn").on("click", function() {
                that.showQuickRechargeModal(".modal-quota-box")
            }),
            $(".cmbc-unbind-card-btn").on("click", function() {
                $("#CMBCUnBindCardForm").submit()
            })
        }
        ,
        CmbcRecharge.prototype.checkFormInput = function($moneyDom, $cardIdDom, $telDom) {
            var ret_status = !0;
            return $cardIdDom && !checkInput.checkBankCode($cardIdDom) && (ret_status = !1),
            $moneyDom && !checkInput.checkMoney($moneyDom, $moneyDom.data("first-recharge")) && (ret_status = !1),
            $telDom && !checkInput.checkTel($telDom) && (ret_status = !1),
            ret_status
        }
        ,
        CmbcRecharge.prototype.showQuickRechargeModal = function(modalId) {
            $(".modal-content").hide(),
            $(".quick-recharge-modal-box," + modalId).show()
        }
        ,
        CmbcRecharge.prototype.hideQuickRechargeModal = function() {
            $(".quick-recharge-modal-box").hide()
        }
        ,
        CmbcRecharge.prototype.checkSupportQuickRechargeByCardNum = function(bin) {
            var that = this;
            if (bin.length >= 6) {
                var url = "/user/trade/getBankInfo"
                  , data = {
                    binCode: bin
                };
                $.get(url, data, function(res) {
                    if (res = JSON.parse(res),
                    0 == res.status)
                        if (res.data && 1 == res.data.length) {
                            var bankData = res.data[0];
                            that.bankData = bankData,
                            "0" === bankData.bindCardStatus || "1" === that.cmbcPayData.bindStatus && "1" === bankData.bindCardStatus && "0" === bankData.payCardStatus ? ($(".quick-recharge-bank-card-input").next(".input-error").text("暂不支持该银行"),
                            $(".quick-recharge-bind-card-box").slideUp(),
                            that.showBankModalByCardNum = !1) : (that.showBankModalByCardNum = !0,
                            $(".cmbc-bind-card-bankId").val(bankData.bankId),
                            $("#quick-recharge-bank-icon-without-card").attr("class", "small-bank-icon small-bank-" + bankData.kqCode + " small-bank-" + bankData.code),
                            $("#quick-recharge-bank-name-without-card").text(bankData.bankName),
                            $("#quick-recharge-bank-card-input-without-card").removeClass("error-border").next(".input-error").text(""),
                            $("#quick-recharge-bank-limit-without-card").html(bankData.rechargeTip),
                            $(".quick-recharge-bind-card-box").slideDown())
                        } else
                            that.shakeDom($(".quick-recharge-bank-card-input")),
                            $(".quick-recharge-bank-card-input").next(".input-error").text("暂不支持该银行"),
                            $(".quick-recharge-bind-card-box").slideUp(),
                            that.showBankModalByCardNum = !1;
                    else
                        $("#quick-recharge-bank-card-input-without-card").addClass("error-border").next(".input-error").text(res.message),
                        $(".quick-recharge-bind-card-box").slideUp(),
                        that.showBankModalByCardNum = !1
                })
            } else
                $(".quick-recharge-bind-card-box").slideUp()
        }
        ,
        CmbcRecharge.prototype.shakeDom = function($dom) {
            $dom.addClass("error-border")
        }
        ,
        CmbcRecharge.prototype.initBankLimitBox = function() {
            var bankListData = this.bankListData
              , bankListHtml = "";
            bankListData && bankListData.length > 0 && bankListData.map(function(list) {
                var oldCode = utils.minshengBankCode2rrd(list.code);
                bankListHtml += '<tr>\n                    <td><span class="bank-name"><i class="small-bank-icon small-bank-' + list.kqCode + " small-bank-" + oldCode + '"></i>' + list.bankName + '</span></td>\n                    <td><span class="bank-limit">' + list.rechargeTip.replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&gt;/g, ">") + "</span></td>\n                </tr>"
            }),
            $("#recharge-bank-limit-list").append(bankListHtml)
        }
        ,
        CmbcRecharge.prototype.initBankIcon = function() {
            var oldCode = utils.minshengBankCode2rrd(this.cmbcPayData.code);
            $("#quick-recharge-without-valid-card-icon").attr("class", "small-bank-icon small-bank-" + this.cmbcPayData.bankCode + " small-bank-" + oldCode)
        }
        ,
        CmbcRecharge
    }();
    module.exports = new CmbcRecharge
});
;/*!/client/widget/trade/recharge/onlineBank/bank-list/bank-logo-map.js*/
define("user:widget/trade/recharge/onlineBank/bank-list/bank-logo-map.js", function(require, exports, module) {
    var bankLogoMap = {
        "00": {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/CMBC.png",
            "short": "CMBC",
            oldcode: "305"
        },
        "01": {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/ICBC.png",
            "short": "ICBC",
            oldcode: "102"
        },
        "02": {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/BOC.png",
            "short": "BOC",
            oldcode: "104"
        },
        "03": {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/CCB.png",
            "short": "CCB",
            oldcode: "105"
        },
        "04": {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/ABC.png",
            "short": "ABC",
            oldcode: "103"
        },
        "05": {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/BCOM.png",
            "short": "BCOM",
            oldcode: "301"
        },
        "06": {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/CMB.png",
            "short": "CMB",
            oldcode: "308"
        },
        "07": {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/CIB.png",
            "short": "CIB",
            oldcode: "309"
        },
        "08": {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/CITIC.png",
            "short": "CITIC",
            oldcode: "302"
        },
        "09": {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/CEB.png",
            "short": "CEB",
            oldcode: "303"
        },
        10: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/SDB.png",
            "short": "SDB",
            oldcode: "307"
        },
        11: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/HXB.png",
            "short": "HXB",
            oldcode: "304"
        },
        12: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/PSBC.png",
            "short": "PSBC",
            oldcode: "403"
        },
        13: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/BJYH.png",
            "short": "BJYH",
            oldcode: "320"
        },
        14: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/GDB.png",
            "short": "GDB",
            oldcode: "306"
        },
        15: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/SPDB.png",
            "short": "SPDB",
            oldcode: "310"
        },
        16: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/ZSYH.png",
            "short": "ZSYH",
            oldcode: "336"
        },
        17: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/WSYH.png",
            "short": "WSYH",
            oldcode: "321"
        },
        19: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/JSYH.png",
            "short": "JSYH",
            oldcode: "322"
        },
        20: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/SHYH.png",
            "short": "SHYH",
            oldcode: "323"
        },
        21: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/NJYH.png",
            "short": "NJYH",
            oldcode: "324"
        },
        22: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/HZYH.png",
            "short": "HZYH",
            oldcode: "325"
        },
        23: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/SZYH.png",
            "short": "SZYH",
            oldcode: "326"
        },
        24: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/NBYH.png",
            "short": "NBYH",
            oldcode: "327"
        },
        25: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/WZYH.png",
            "short": "WZYH",
            oldcode: "328"
        },
        26: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/TZYH.png",
            "short": "TZYH",
            oldcode: "329"
        },
        27: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/BSYH.png",
            "short": "BSYH",
            oldcode: "330"
        },
        28: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/HEBYH.png",
            "short": "HEBYH",
            oldcode: "331"
        },
        29: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/BHYH.png",
            "short": "BHYH",
            oldcode: "332"
        },
        30: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/DYYH.png",
            "short": "DYYH",
            oldcode: "333"
        },
        31: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/SHNSYH.png",
            "short": "SHNSYH",
            oldcode: "334"
        },
        32: {
            url: "//www.we.com/cms/5864b0d6a24d131067ef7956/bank/logo/BJNSYH.png",
            "short": "BJNSYH",
            oldcode: "335"
        }
    };
    module.exports = bankLogoMap
});
;/*!/client/widget/trade/recharge/onlineBank/bank-list/bank-list.js*/
define("user:widget/trade/recharge/onlineBank/bank-list/bank-list.js", function(require, exports, module) {
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var $ = require("common:widget/lib/jquery/jquery")
      , bankLogoMap = require("user:widget/trade/recharge/onlineBank/bank-list/bank-logo-map.js")
      , utils = require("common:widget/ui/utils/utils")
      , BankList = function() {
        function BankList() {
            _classCallCheck(this, BankList)
        }
        return BankList.prototype.init = function(plateData) {
            this.bankListInit(plateData),
            this.handle()
        }
        ,
        BankList.prototype.handle = function() {
            var that = this;
            $("#logo-box").on("click", ".more-logo", function() {
                $("#logo-box li").removeClass("display-none"),
                $(".more-logo").remove()
            }),
            $("#logo-box").on("click", "label", function() {
                if (!$(this).hasClass("input-checked-label")) {
                    $(".input-checked-label").removeClass("input-checked-label"),
                    $(".banks-limit-table table").hide();
                    var $tableDom = $("." + $(this).data("short") + "-table");
                    $tableDom.show();
                    var radioValue = $(this).data("value");
                    $("#bankId").val(radioValue),
                    $(this).addClass("input-checked-label")
                }
            }),
            $("#logo-box label").hover(function() {
                $(this).addClass("input-hover-label")
            }, function() {
                $(".input-hover-label").removeClass("input-hover-label")
            }),
            $("#rechargeAmount").on("keyup", function() {
                that.checkFormInput()
            }),
            $("#sub-recharge").on("click", function(e) {
                if (!that.checkFormInput())
                    return e.preventDefault(),
                    !1;
                var selectedBank = $(".input-checked-label").data("code");
                utils.utmsourceUtil.setCookie("cd", selectedBank, 365)
            })
        }
        ,
        BankList.prototype.checkFormInput = function() {
            var value = $("#rechargeAmount").val();
            return value ? (value = Number(value),
            isNaN(value) ? ($("#input-error").text("请输入正确的充值金额"),
            $("#rechargeAmount").addClass("error-border"),
            !1) : value > 5e5 || 1 > value ? ($("#input-error").text("单笔充值金额应大于或等于1元且小于或等于50万元"),
            $("#rechargeAmount").addClass("error-border"),
            !1) : value.toString().split(".").length > 1 && value.toString().split(".")[1].length > 2 ? ($("#input-error").text("请输入正确的充值金额，最多保留两位小数"),
            $("#rechargeAmount").addClass("error-border"),
            !1) : ($("#rechargeAmount").removeClass("error-border"),
            $("#input-error").text(""),
            !0)) : ($("#input-error").text("充值金额不能为空"),
            $("#rechargeAmount").addClass("error-border"),
            !1)
        }
        ,
        BankList.prototype.bankListInit = function(data) {
            var formatData = {
                rows: []
            }
              , bankRows = data.rows;
            bankRows.map(function(item, index) {
                var tmp = {};
                tmp.code = item.code,
                tmp.short = bankLogoMap[tmp.code] ? bankLogoMap[tmp.code].short : bankRows[index].name,
                tmp.bankInfoId = item.id,
                tmp.fullName = item.name,
                tmp.logo = bankLogoMap[tmp.code] ? bankLogoMap[tmp.code].url : "",
                tmp.className = "",
                formatData.rows.push(tmp)
            });
            var dataRecord = this.getUserRecentBanks(bankRows);
            if (dataRecord.rows.length) {
                var recentBank = null;
                formatData.rows = formatData.rows.filter(function(value) {
                    return dataRecord.rows[0] != value.code ? !0 : (recentBank = value,
                    !1)
                }),
                formatData.rows = [recentBank].concat(formatData.rows)
            }
            var isMore = !1
              , showNum = formatData.rows.length;
            showNum > 7 && (isMore = !0,
            showNum = 6),
            this.renderBankLogo(formatData, isMore, showNum)
        }
        ,
        BankList.prototype.renderBankLogo = function(formatData, isMore, showLogoNum) {
            var _this = this
              , logoBoxHtml = "";
            formatData.rows.map(function(value, index) {
                showLogoNum ? (index % 5 == 4 && (value.className += " last-row-el"),
                index >= showLogoNum && (value.className += " display-none"),
                logoBoxHtml += _this.getLogoHtml(value)) : showLogoNum || (logoBoxHtml += _this.getLogoHtml(value))
            }),
            isMore && (logoBoxHtml += '<li class="more-logo" title="点击查看更多银行">更多银行 <span class="icon-down3"></span></li>'),
            $("#logo-box").html(logoBoxHtml);
            var $defaultLabel = $(".logo-label").eq(0);
            $defaultLabel.addClass("input-checked-label"),
            $("." + $defaultLabel.data("short") + "-table").show(),
            $("#bankId").val($defaultLabel.data("value"))
        }
        ,
        BankList.prototype.getLogoHtml = function(logoData) {
            var logoHtml = '\n            <li class="' + logoData.className + '" title="' + logoData.fullName + '">\n                <label class="logo-label" data-code="' + logoData.code + '" data-short="' + logoData.short + '" data-value="' + logoData.bankInfoId + '">\n                    <img alt="' + logoData.fullName + '" src="' + logoData.logo + '"/>\n                    <span class="checked-modal"></span>\n                    <img src="//www.renrendai.com/cms/5864b0d6a24d131067ef7956/bank/checked/logo-checked.png?t=20170728" class="checked-icon"/>\n                </label>\n            </li>\n        ';
            return logoHtml
        }
        ,
        BankList.prototype.compact = function(arr) {
            var result = arr.filter(function(value) {
                return null !== value && void 0 != value && "" != value
            });
            return result.slice(0, 4)
        }
        ,
        BankList.prototype.getUserRecentBanks = function(allBank) {
            var cookie_cd = utils.utmsourceUtil.getCookie("cd")
              , cardArr = [];
            cookie_cd && (cardArr = this.compact(cookie_cd.split(",")));
            var result = {};
            return result.rows = [],
            result.updateCode = [],
            cardArr.map(function(value) {
                allBank.map(function(bankValue) {
                    value == bankValue.code && result.rows.push(value)
                })
            }),
            result
        }
        ,
        BankList
    }();
    module.exports = new BankList
});
;/*!/client/widget/trade/withdraw/apply-form/apply-form.js*/
define("user:widget/trade/withdraw/apply-form/apply-form.js", function(require, exports, module) {
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var utils = require("common:widget/ui/utils/utils")
      , ApplyForm = function() {
        function ApplyForm() {
            _classCallCheck(this, ApplyForm)
        }
        return ApplyForm.prototype.init = function(pageData, userInfo) {
            this.pageData = pageData,
            this.userInfo = userInfo,
            this.cashFee = 0,
            this.renderBankCardBox(pageData),
            this.handle(),
            $("#withdraw-apply-form").show()
        }
        ,
        ApplyForm.prototype.handle = function() {
            var that = this;
            $("#subWithdraw").on("click", function(e) {
                return $(this).hasClass("btn-unable") ? (e.preventDefault(),
                !1) : void 0
            }),
            $("#cash-num").on("keyup", function() {
                var cashNum = $(this).val()
                  , handle = cashNum.replace(/[^\d.]/g, "");
                if (!/^\d{1,9}(\.\d{0,2})?$/.test(handle)) {
                    var tmp = handle.split(".");
                    if (/\.$/.test(handle) && tmp.length <= 2)
                        return;
                    tmp[0] && (tmp[0].length > 9 && (tmp[0] = tmp[0].slice(0, 9)),
                    handle = Number(tmp[0])),
                    tmp[1] && (tmp[1].length > 2 && (tmp[1] = tmp[1].slice(0, 2)),
                    handle += Number(tmp[1] / 100))
                }
                $(this).val(handle),
                setTimeout(function() {
                    that.checkCashMoney()
                }, 0)
            }),
            $(".btn-cash-all").on("click", function() {
                $("#cash-num").val(that.pageData.maxCashDrawAmountFormat),
                setTimeout(function() {
                    that.checkCashMoney()
                }, 0)
            })
        }
        ,
        ApplyForm.prototype.checkCashMoney = function() {
            var maxCashDrawAmount = this.pageData.maxCashDrawAmount
              , cashNum = this.getUserCashNum();
            1e4 >= cashNum ? $("#cash-fee-tip").attr("class", "cash-fee-tip") : cashNum > maxCashDrawAmount ? $("#cash-fee-tip").attr("class", "cash-fee-tip error-tip") : $("#cash-fee-tip").attr("class", "cash-fee-tip more-than"),
            cashNum > 0 && maxCashDrawAmount >= cashNum && /^\d{1,9}(\.\d{0,2})?$/.test(cashNum) ? $("#subWithdraw").removeClass("btn-unable") : $("#subWithdraw").addClass("btn-unable")
        }
        ,
        ApplyForm.prototype.getUserCashNum = function() {
            var cashNum = $("#cash-num").val();
            return Number(cashNum.replace(/[^\d.]/g, ""))
        }
        ,
        ApplyForm.prototype.renderBankCardBox = function() {
            var bankData = this.pageData.userBank;
            bankData.oldcode = utils.minshengBankCode2rrd(bankData.cmbcCode),
            bankData.name = bankData.bankName,
            bankData.tailNumber = bankData.bankAcc.slice(-4),
            this.pageData.allBanks.map(function(value) {
                value.code == bankData.cmbcCode && (bankData.kqCode = value.kqBankCode)
            });
            var bankHtml = '\n            <div class="withdraw-card fn-left">\n                <i class="small-bank-icon small-bank-' + bankData.kqCode + " small-bank-" + bankData.oldcode + '"></i>' + bankData.name + '<span class="card-tail-number">(' + bankData.tailNumber + ')</span> \n            </div>\n            <input type="hidden" id="userBankId" name="userBankId" value="' + bankData.bankId + '" />\n        ';
            $("#hasBindCardWrap").html(bankHtml)
        }
        ,
        ApplyForm
    }();
    module.exports = new ApplyForm
});
;/*!/client/widget/trade/withdraw/bind-card/bind-card.js*/
define("user:widget/trade/withdraw/bind-card/bind-card.js", function(require, exports, module) {
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var bankLayer = require("common:widget/ui/bankLayer/bankLayer")
      , WithdrawBindCard = (require("common:widget/ui/utils/utils"),
    function() {
        function WithdrawBindCard() {
            _classCallCheck(this, WithdrawBindCard)
        }
        return WithdrawBindCard.prototype.init = function(pageData, userInfo) {
            this.pageData = pageData,
            this.userInfo = userInfo,
            this.cardNum = null,
            !userInfo || "false" != userInfo.HasCreateAccount && "false" != userInfo.HasSetPassword || bankLayer.init(userInfo),
            this.handle(),
            $("#withdraw-bind-card-box").show()
        }
        ,
        WithdrawBindCard.prototype.checkCardId = function(cardId) {
            return "" == cardId ? ($("#card-id-error").text("请输入银行卡号").show(),
            $("#card-id").addClass("error-border"),
            !1) : !/^[0-9]*$/.test(cardId) || cardId.length < 6 ? ($("#card-id").addClass("error-border"),
            $("#card-id-error").text("请输入银行卡号前6位").show(),
            !1) : this.supportBank ? ($("#card-id").removeClass("error-border"),
            $("#card-id-error").text("").hide(),
            !0) : !1
        }
        ,
        WithdrawBindCard.prototype.validateForm = function() {
            var cardId = $("#card-id").val().replace(/\s/g, "")
              , cardNumValid = this.checkCardId(cardId);
            cardNumValid && this.supportBank && $("#bind-card-form").submit()
        }
        ,
        WithdrawBindCard.prototype.closeBankList = function() {
            $("#bank-list").hide()
        }
        ,
        WithdrawBindCard.prototype.handle = function() {
            var that = this;
            $("#bindCardSubmit").on("click", function(e) {
                var userInfo = that.userInfo;
                return !userInfo || "false" != userInfo.HasCreateAccount && "false" != userInfo.HasSetPassword ? (that.validateForm(),
                !1) : (bankLayer.show(userInfo),
                e.preventDefault(),
                !1)
            }),
            $("#card-id").on("keyup", function(e) {
                var cardId = $(this).val().replace(/\D/g, "");
                return e.keyCode && "8" == e.keyCode ? (that.checkCardId(cardId),
                !1) : (cardId.length > 6 && (cardId = cardId.slice(0, 6)),
                $(this).val(/\S{5}/.test(cardId) ? cardId.replace(/\s/g, "").replace(/(.{4})/g, "$1 ") : cardId),
                void that.checkSupportQuickRechargeByCardNum(cardId))
            })
        }
        ,
        WithdrawBindCard.prototype.checkSupportQuickRechargeByCardNum = function(bin) {
            var that = this;
            if (this.supportBank = !1,
            bin.length >= 6) {
                var url = "/user/trade/getBankInfo"
                  , data = {
                    binCode: bin
                };
                $.get(url, data, function(res) {
                    if (res = JSON.parse(res),
                    0 == res.status)
                        if (res.data && 1 == res.data.length) {
                            var bankData = res.data[0];
                            that.bankData = bankData,
                            "0" === bankData.bindCardStatus ? ($("#card-id-error").text("暂不支持该银行").show(),
                            $("#card-id").addClass("error-border")) : ($("#card-id-error").text("").hide(),
                            $("#card-id").removeClass("error-border"),
                            $("#bankId").val(bankData.bankId),
                            that.supportBank = !0)
                        } else
                            $("#card-id-error").text("暂不支持该银行").show(),
                            $("#card-id").addClass("error-border");
                    else
                        $("#card-id-error").text(res.message).show(),
                        $("#card-id").addClass("error-border")
                })
            }
        }
        ,
        WithdrawBindCard
    }());
    module.exports = new WithdrawBindCard
});
