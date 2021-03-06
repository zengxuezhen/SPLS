;/*!/client/widget/calculator/loan/resultItem.js*/
define("p2p:widget/calculator/loan/resultItem.js", function(require, exports, module) {
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
      , ResultItem = (require("common:node_modules/react-dom/index"),
    function(_React$Component) {
        function ResultItem(props) {
            _classCallCheck(this, ResultItem),
            _React$Component.call(this, props)
        }
        return _inherits(ResultItem, _React$Component),
        ResultItem.prototype.render = function() {
            var data = this.props.data;
            return React.createElement("div", {
                id: "tablebox",
                className: "calculator-list bd-bottom "
            }, React.createElement("h2", {
                className: "section-title"
            }, "本息回收时间表"), React.createElement("table", {
                width: "100%",
                className: "time-table"
            }, React.createElement("thead", null, React.createElement("tr", {
                className: "head-color"
            }, React.createElement("th", {
                className: "text-center",
                width: "15%"
            }, "月份"), React.createElement("th", {
                className: "text-center",
                width: "25%"
            }, "月收本息"), React.createElement("th", {
                className: "text-center",
                width: "20%"
            }, "月收本金"), React.createElement("th", {
                className: "text-center",
                width: "20%"
            }, "月收利息"), React.createElement("th", {
                className: "text-center"
            }, "待收本息"))), React.createElement("tbody", null, Object.keys(data).map(function(key) {
                var item = data[key];
                return React.createElement("tr", {
                    className: "text-center " + item.itemStyle,
                    key: key
                }, React.createElement("td", null, item.mounth, "月"), React.createElement("td", null, item.mbenxi), React.createElement("td", null, item.mbenjin), React.createElement("td", null, item.mlixi), React.createElement("td", null, item.shengyu))
            }))))
        }
        ,
        ResultItem
    }(React.Component));
    module.exports = ResultItem
});
;/*!/client/widget/calculator/loan/result.js*/
define("p2p:widget/calculator/loan/result.js", function(require, exports, module) {
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
      , ResultItem = (require("common:node_modules/react-dom/index"),
    require("p2p:widget/calculator/loan/resultItem"))
      , ResultTable = function(_React$Component) {
        function ResultTable(props) {
            _classCallCheck(this, ResultTable),
            _React$Component.call(this, props)
        }
        return _inherits(ResultTable, _React$Component),
        ResultTable.prototype.render = function() {
            var data = this.props.data;
            return React.createElement("div", null, React.createElement("div", {
                className: "calculator-info "
            }, React.createElement("div", {
                className: "ui-box-title-new fn-clear"
            }, React.createElement("h2", {
                className: "section-title bd-bottom"
            }, "收益描述 ")), React.createElement("div", {
                className: "fn-clear result-info-wrap bd-bottom"
            }, React.createElement("dl", {
                className: "fn-left result-info-item"
            }, React.createElement("dt", null, "- 出借金额 -"), React.createElement("dd", null, React.createElement("span", {
                className: "highlight num-family"
            }, data.borrowAmount), "元")), React.createElement("div", {
                className: "fn-left result-info-split"
            }), React.createElement("dl", {
                className: "fn-left result-info-item"
            }, React.createElement("dt", null, "- 应收利息 -"), React.createElement("dd", null, React.createElement("span", {
                className: "highlight num-family"
            }, data.gain), "元")), React.createElement("div", {
                className: "fn-left result-info-split"
            }), React.createElement("dl", {
                className: "fn-left result-info-item"
            }, React.createElement("dt", null, "- 月收本息 -"), React.createElement("dd", null, React.createElement("span", {
                className: "highlight num-family"
            }, data.monthlyRepay), "元")))), React.createElement(ResultItem, {
                data: data.table
            }))
        }
        ,
        ResultTable
    }(React.Component);
    module.exports = ResultTable
});
;/*!/client/widget/monthrise/detail/detail.js*/
define("p2p:widget/monthrise/detail/detail.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var $ = require("common:widget/lib/jquery/jquery")
      , service = require("common:widget/ui/service/service-factory")
      , Dialog = require("common:widget/ui/dialog/dialog")
      , p2pService = service.getService("p2p")
      , utils = require("common:widget/ui/utils/utils")
      , Detail = function() {
        function Detail() {
            _classCallCheck(this, Detail),
            this.modal = ""
        }
        return Detail.prototype.setStaticData = function(key, value) {
            this[key] = value
        }
        ,
        Detail.prototype.getStaticData = function(key) {
            return this[key]
        }
        ,
        Detail.prototype.init = function(args) {
            var _this = this
              , info = args.detail.advanceQuitTime
              , quitDay = args.detail.quitDay;
            this.createModal(info),
            $(document).on("click", ".de-right .apply-out", function() {
                _this.modalShow(quitDay)
            }),
            $(".btn-cancel").on("click", function() {
                _this.modalHide()
            }),
            $(".btn-sure").on("click", function() {
                _this.applyOut()
            }),
            $(document).on("click", ".cancel-out", function() {
                _this.cancelOut(1)
            })
        }
        ,
        Detail.prototype.createModal = function(info) {
            var sure = $('<div class="text-center info" style="padding:20px 0px">现在申请退出会在' + info + '处理退出，申请是否继续</div><span class="j-btn j-btn-orange j-btn-small btn-sure">确定</span><span class="j-btn j-btn-white j-btn-small btn-cancel">取消</span>');
            this.modal = Dialog.modalDialog({
                title: "申请退出",
                width: "400px",
                height: "220px",
                cssClass: "applyout-dialog",
                maskConfig: {
                    cssClass: "applyout-mask"
                },
                btnContainer: sure,
                content: $("#confirm-apply-out")
            })
        }
        ,
        Detail.prototype.modalShow = function() {
            this.modal.show()
        }
        ,
        Detail.prototype.modalHide = function() {
            this.modal.onCloseClick()
        }
        ,
        Detail.prototype.applyOut = function() {
            var _this2 = this
              , params = {
                subPointId: utils.getSearchConf().subPointId,
                type: 0
            };
            p2pService.applyOrCancelOut(params).then(function(res) {
                res.requestStatus !== p2pService.STATUS.ERROR && (_this2.modal.onCloseClick(),
                $(".apply-out").remove(),
                $(".profit").before('<div class="button cancel-out">取消退出</div>'))
            })
        }
        ,
        Detail.prototype.cancelOut = function() {
            var that = this
              , params = {
                subPointId: utils.getSearchConf().subPointId,
                type: 1
            };
            p2pService.applyOrCancelOut(params).then(function() {
                $(".cancel-out").remove(),
                $(".profit").before('<div class="button apply-out">申请退出</div>');
                var html = $('<div class="text-center info" style="padding:20px 0;">您已取消该期月升计划退出申请</div>');
                that.tipModel = Dialog.modalDialog({
                    title: "提示",
                    width: "400px",
                    height: "220px",
                    cssClass: "cancel-dialog",
                    btnContainer: html
                }),
                that.tipModel.show()
            })
        }
        ,
        Detail
    }();
    module.exports = new Detail
});
;/*!/client/widget/monthrise/rateEchart/rateEchart.js*/
define("p2p:widget/monthrise/rateEchart/rateEchart.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var $ = require("common:widget/lib/jquery/jquery")
      , Rate = function() {
        function Rate() {
            _classCallCheck(this, Rate),
            this.num = 0
        }
        return Rate.prototype.setStaticData = function(key, value) {
            this[key] = value
        }
        ,
        Rate.prototype.getStaticData = function(key) {
            return this[key]
        }
        ,
        Rate.prototype.init = function(args) {
            var _this = this
              , len = args.list.length;
            $(".echart-le").on("click", function() {
                _this.slideLeft()
            }),
            $(".echart-ri").on("click", function() {
                _this.slideRight(len)
            })
        }
        ,
        Rate.prototype.slideRight = function(len) {
            var num = this.num;
            if (13 - len >= num)
                return $(".echart-ri").removeClass("to-right-lan"),
                $(".echart-ri").addClass("to-right-gray"),
                !1;
            num--;
            var left = 76 * num;
            $(".position-div").stop().animate({
                left: left
            }),
            this.num = num,
            $(".echart-le").removeClass("to-left-gray"),
            $(".echart-le").addClass("to-left-lan")
        }
        ,
        Rate.prototype.slideLeft = function() {
            var num = this.num;
            if (num >= 0)
                return $(".echart-le").removeClass("to-left-lan"),
                $(".echart-le").addClass("to-left-gray"),
                !1;
            num++;
            var left = 76 * num;
            $(".position-div").stop().animate({
                left: left
            }),
            this.num = num,
            $(".echart-ri").removeClass("to-right-gray"),
            $(".echart-ri").addClass("to-right-lan")
        }
        ,
        Rate
    }();
    module.exports = new Rate
});
;/*!/client/widget/monthrise/record/ListItem.js*/
define("p2p:widget/monthrise/record/ListItem.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var React = require("common:node_modules/react/react")
      , ListItem = (require("common:node_modules/react-dom/index"),
    function() {
        function ListItem() {
            _classCallCheck(this, ListItem)
        }
        return ListItem.prototype.renderRow = function(item, index) {
            return React.createElement("div", {
                className: index % 2 == 0 ? "record-list-item" : "record-list-item even"
            }, React.createElement("a", {
                className: "id",
                href: "/loan-" + item.loanId + ".html",
                target: "_blank"
            }, React.createElement("img", {
                src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABqUlEQVQ4jaWUQUsbQRTHf24kTQMLq4FKthQMPdT0ZA45NJ7cowcFwUubL7CU2px68ajeLaXkCzRePPkF4qn1sEI8GQOVOTlpBZuBgTRZCO2hdnHYJQHzP715/N9vHu8NM1PZa70BPgFzPEw9YNuaEsJd7UdrSsh/zVuTHK6TZndzEddJj/VNBOnBCK/oUK0sjPXNVPZaf+4nvu4sT2JHWtk/j+LZJEO9KaP4uHXLUj7Lwevn1A6vCISm+uoJvucaNTFQ7fCK696QpXyWD2vPqFYW+PLtp+FpthWdH7/HgwKhOXr7EiACSBUaHqnCWC5x2O8b3wmExvdcpAqxMykALrv9JHu8oxf5LP5qPjrrwYj1Uo6nc48A2N1cNIrrJ106d3ADJHtDGqc3hnm16FAu2EgVcia0MRvZGyZ3pAcjAqGj7jZKOTZKOZpthZ1J4XsugdCctBXHrVvjQuMduU4a33MpF2zsTIpAaBqnNxG8XLBZL+Xwig5ShWx9vkjuSKqQTrdPp9un2VaxzQRCEwhN3UljPzYXHnvZD5XFv/9kWv2ygHeAmgKigNpfDTmd6MY9K9cAAAAASUVORK5CYII=",
                alt: ""
            }), React.createElement("span", null, item.loanId)), React.createElement("div", {
                className: "money"
            }, item.lendAmount, "元"), React.createElement("div", {
                className: "count"
            }, item.share, "份"), React.createElement("div", {
                className: "time"
            }, item.time), React.createElement("div", {
                className: "status"
            }, item.status), React.createElement("a", {
                className: "contract",
                href: "/p2p/contract/loan?type=user&loanId=" + item.loanId,
                target: "_blank"
            }, "合同"))
        }
        ,
        ListItem
    }());
    module.exports = new ListItem
});
;/*!/client/widget/monthrise/record/record.js*/
define("p2p:widget/monthrise/record/record.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source)
                Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key])
        }
        return target
    }
      , utils = require("common:widget/ui/utils/utils")
      , React = require("common:node_modules/react/react")
      , ReactDOM = require("common:node_modules/react-dom/index")
      , List = require("common:widget/react-ui/RList/List")
      , ListItem = require("p2p:widget/monthrise/record/ListItem")
      , numeral = require("common:node_modules/numeral/numeral")
      , moment = require("common:node_modules/moment/moment")
      , Record = function() {
        function Record() {
            _classCallCheck(this, Record)
        }
        return Record.prototype.init = function(data) {
            this.createRowDom = this.createRowDom.bind(this),
            this.renderRecord(this.formatter(data), 0, 10, document.getElementById("recordMain"))
        }
        ,
        Record.prototype.formatter = function(result) {
            result.data.list;
            return result
        }
        ,
        Record.prototype.formatItem = function(item) {
            var out = {};
            for (var i in item)
                item.hasOwnProperty(i) && (out[i] = item[i]);
            return out.time = moment(out.lendTime).format("YYYY-MM-DD"),
            out.lendAmount = numeral(out.lendAmount).format("0, 0.00"),
            out.status = this.resolveStatus(out.status),
            out
        }
        ,
        Record.prototype.resolveStatus = function(key) {
            var status = {
                0: "招标中",
                1: "再次满标",
                2: "已流标",
                3: "还款中",
                4: "逾期",
                5: "坏账",
                6: "已结标",
                7: "首次申请",
                8: "首次满标",
                9: "预售",
                10: "等待招标",
                11: "放款中",
                12: "流标中",
                13: "转让中",
                14: "已转让"
            };
            return status[key]
        }
        ,
        Record.prototype.renderRecord = function(result, startNum, limit, dom) {
            var params = {
                subPointId: utils.getSearchConf().subPointId
            };
            ReactDOM.render(React.createElement(List, _extends({}, result, {
                moudleServiceName: "p2p",
                url: "getLoanLenderRecord",
                ajaxParams: params,
                isHeadNeed: "no",
                isHeadNeedOrder: "no",
                createRowDom: this.createRowDom,
                startNum: startNum,
                limit: limit,
                offset: 5
            })), dom)
        }
        ,
        Record.prototype.createRowDom = function(item, index) {
            return item = this.formatItem(item),
            ListItem.renderRow(item, index)
        }
        ,
        Record
    }();
    module.exports = new Record
});
;/*!/client/widget/newUser/history/getProductStatus.js*/
define("p2p:widget/newUser/history/getProductStatus.js", function(require, exports, module) {
    module.exports = function(reserveStatus, status) {
        var status_cn = "";
        if (-1 != reserveStatus)
            switch (reserveStatus) {
            case 1:
                status_cn = "等待预约";
                break;
            case 2:
                status_cn = "等待预约";
                break;
            case 3:
                status_cn = "预约出借";
                break;
            default:
                status_cn = "非法状态"
            }
        else
            switch (status) {
            case "0":
                status_cn = "等待预定";
                break;
            case "1":
                status_cn = "预定";
                break;
            case "2":
                status_cn = "预定满额";
                break;
            case "3":
                status_cn = "等待开放加入";
                break;
            case "4":
                status_cn = "立即加入";
                break;
            case "5":
                status_cn = "已满标";
                break;
            case "6":
                status_cn = "还款中";
                break;
            case "7":
                status_cn = "开放期";
                break;
            case "8":
                status_cn = "已退出";
                break;
            case "9":
                status_cn = "提前加入";
                break;
            default:
                status_cn = "非法状态"
            }
        return status_cn
    }
});
;/*!/client/widget/newUser/history/history.jsx*/
define("p2p:widget/newUser/history/history.jsx", function(require, exports, module) {
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
      , Pagination = require("common:widget/react-ui/RList/pagination/Pagination")
      , getProductStatus = require("p2p:widget/newUser/history/getProductStatus.js")
      , service = require("common:widget/ui/service/service-factory")
      , ReactHistoryBlock = function(_React$Component) {
        function ReactHistoryBlock() {
            _classCallCheck(this, ReactHistoryBlock),
            _React$Component.apply(this, arguments)
        }
        return _inherits(ReactHistoryBlock, _React$Component),
        ReactHistoryBlock.prototype.componentWillMount = function() {
            this.setState({
                list: this.props.historyData.list,
                totalCount: this.props.historyData.totalCount,
                startNum: 0,
                ajaxParams: {},
                isLoading: !1
            }),
            this.loadData = this.loadData.bind(this),
            this.getTableDom = this.getTableDom.bind(this),
            this.getPaginationDom = this.getPaginationDom.bind(this)
        }
        ,
        ReactHistoryBlock.prototype.render = function() {
            var state = this.state
              , recommData = state.list
              , tableDom = this.getTableDom(recommData)
              , paginationDom = this.getPaginationDom()
              , loadingClassName = "list-loading " + (this.state.isLoading ? "show" : "hide");
            return React.createElement("div", {
                className: "history-box"
            }, React.createElement("div", {
                className: "title-box"
            }, "历史期数与回报 ", React.createElement("span", {
                className: "safe-tip"
            }, "新手专享项目仅限于未出借过P2P项目的用户")), React.createElement("div", {
                className: "list-box"
            }, tableDom), paginationDom, React.createElement("div", {
                className: loadingClassName
            }))
        }
        ,
        ReactHistoryBlock.prototype.getPaginationDom = function() {
            var props = this.props
              , state = this.state
              , totalCount = state.totalCount
              , pageNum = Math.ceil(totalCount / props.limit);
            return props.historyData.totalCount > props.limit ? React.createElement(Pagination, _extends({}, props, {
                startNum: state.startNum,
                pageNum: pageNum,
                ajaxParams: state.ajaxParams,
                loadData: this.loadData
            })) : ""
        }
        ,
        ReactHistoryBlock.prototype.loadData = function(params) {
            var _this = this
              , startNum = params.startNum
              , ajaxParams = params.ajaxParams;
            if (startNum != this.state.startNum) {
                var paramData = {
                    startNum: startNum,
                    limit: this.props.limit
                };
                this.setState({
                    isLoading: !0
                }),
                Object.assign(paramData, paramData, ajaxParams);
                var serviceName = this.props.serviceName.split(".")
                  , moudleService = service.getService(serviceName[0]);
                moudleService[serviceName[1]](paramData).then(function(out) {
                    if (out.requestStatus !== moudleService.STATUS.ERROR) {
                        var rsp = out.data;
                        _this.setState({
                            list: rsp.data.list,
                            totalCount: rsp.data.totalCount,
                            startNum: startNum,
                            isLoading: !1,
                            ajaxParams: ajaxParams
                        })
                    }
                })
            }
        }
        ,
        ReactHistoryBlock.prototype.getTableDom = function(recommData) {
            var getRateDom = (this.props,
            function(obj) {
                return 0 != obj.extraInterestRate ? React.createElement("td", {
                    className: "rate"
                }, obj.baseInterestRate, React.createElement("em", null, "%"), " + " + obj.extraInterestRate, React.createElement("em", null, "%")) : React.createElement("td", {
                    className: "rate"
                }, obj.baseInterestRate, React.createElement("em", null, "%"))
            }
            );
            return React.createElement("table", {
                className: "react-history-table"
            }, React.createElement("thead", null, React.createElement("tr", {
                className: "table-head"
            }, React.createElement("th", null, "计划名称"), React.createElement("th", null, "加入人次"), React.createElement("th", null, "计划金额"), React.createElement("th", null, "扣费后年利率"), React.createElement("th", null, "累计利息回报"), React.createElement("th", {
                className: "status"
            }, "状态"))), React.createElement("tbody", null, recommData ? recommData.map(function(obj) {
                var text = getProductStatus(obj.reserveStatus, obj.status);
                return React.createElement("tr", {
                    className: "list",
                    key: "history-" + obj.id
                }, React.createElement("td", {
                    className: "name"
                }, React.createElement("a", {
                    title: "点击查看" + obj.name + "详情",
                    target: "_blank",
                    href: "/uplan-" + obj.id + ".html"
                }, obj.name)), React.createElement("td", {
                    className: "join-num"
                }, obj.subPointCount, "人"), React.createElement("td", {
                    className: "amount"
                }, obj.amount, "元"), getRateDom(obj), React.createElement("td", {
                    className: "earn"
                }, obj.earnInterest, "元"), React.createElement("td", {
                    className: "6" == obj.status ? "status orange" : "status"
                }, "4" == obj.status || 3 == obj.reserveStatus ? React.createElement("a", {
                    className: "btn-part-in",
                    title: "立即加入" + obj.name,
                    href: "/uplan-" + obj.id + ".html"
                }, text) : text))
            }) : ""))
        }
        ,
        ReactHistoryBlock
    }(React.Component);
    module.exports = ReactHistoryBlock
});
;/*!/client/widget/newUser/recommend/recommend.jsx*/
define("p2p:widget/newUser/recommend/recommend.jsx", function(require, exports, module) {
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
      , ReactRecommondBlock = function(_React$Component) {
        function ReactRecommondBlock() {
            _classCallCheck(this, ReactRecommondBlock),
            _React$Component.apply(this, arguments)
        }
        return _inherits(ReactRecommondBlock, _React$Component),
        ReactRecommondBlock.prototype.render = function() {
            var recommData = this.props.data.financePlan_list
              , bannerDOM = recommData.map(function(obj, key) {
                var reserveStatus = obj.reserveStatus
                  , btnDom = null;
                if (-1 != reserveStatus)
                    if (3 > reserveStatus) {
                        var reserveTimeF = moment(obj.reserveTime).format("MM月DD日 HH:mm");
                        btnDom = React.createElement("a", {
                            className: "detail-link detail-link-big",
                            href: "/uplan-" + obj.id + ".html"
                        }, reserveTimeF, "开放加入")
                    } else
                        btnDom = React.createElement("a", {
                            className: "detail-link",
                            href: "/uplan-" + obj.id + ".html"
                        }, "预约出借");
                else
                    btnDom = React.createElement("a", {
                        className: "detail-link",
                        href: "/uplan-" + obj.id + ".html"
                    }, 6 == obj.unifyStatus ? "立即加入" : "查看详情");
                return React.createElement("div", {
                    className: "product-box",
                    key: "product-" + key
                }, React.createElement("div", {
                    className: "product-title-box"
                }, React.createElement("span", {
                    className: "product-label"
                }, "新手专享"), React.createElement("span", {
                    className: "title"
                }, obj.name), React.createElement("span", {
                    className: "slogan"
                }, "*甄选精品限量发布 新人仅可加入一次")), React.createElement("div", {
                    className: "prodect-detail-box"
                }, React.createElement("div", {
                    className: "col-3"
                }, React.createElement("div", {
                    className: "font-36 orange number-box"
                }, obj.expectedRate, React.createElement("em", null, "%")), React.createElement("div", {
                    className: "num-tips"
                }, "扣费后年利率")), React.createElement("div", {
                    className: "col-3 left-right-border"
                }, React.createElement("div", {
                    className: "font-36 black number-box"
                }, obj.lockPeriod, React.createElement("em", null, "月")), React.createElement("div", {
                    className: "num-tips"
                }, "锁定期")), React.createElement("div", {
                    className: "col-3"
                }, React.createElement("div", {
                    className: "number-box"
                }, btnDom), React.createElement("div", {
                    className: "num-tips"
                }, "精选短期 回报更佳"))))
            });
            return React.createElement("div", {
                className: "recommend-list"
            }, bannerDOM)
        }
        ,
        ReactRecommondBlock
    }(React.Component);
    module.exports = ReactRecommondBlock
});
;/*!/client/widget/uplan/wdg-index-list/history/getProductStatus.js*/
define("p2p:widget/uplan/wdg-index-list/history/getProductStatus.js", function(require, exports, module) {
    module.exports = function(reserveStatus, status) {
        var status_cn = "";
        if (-1 != reserveStatus)
            switch (reserveStatus) {
            case 1:
                status_cn = "等待预约";
                break;
            case 2:
                status_cn = "等待预约";
                break;
            case 3:
                status_cn = "预约出借";
                break;
            default:
                status_cn = "非法状态"
            }
        else
            switch (status) {
            case "0":
                status_cn = "等待预定";
                break;
            case "1":
                status_cn = "预定";
                break;
            case "2":
                status_cn = "预定满额";
                break;
            case "3":
                status_cn = "等待开放出借";
                break;
            case "4":
                status_cn = "授权出借";
                break;
            case "5":
                status_cn = "已满额";
                break;
            case "6":
                status_cn = "还款中";
                break;
            case "7":
                status_cn = "开放期";
                break;
            case "8":
                status_cn = "已退出";
                break;
            case "9":
                status_cn = "提前出借";
                break;
            default:
                status_cn = "非法状态"
            }
        return status_cn
    }
});
;/*!/client/widget/uplan/wdg-index-list/history/historyTr.jsx*/
define("p2p:widget/uplan/wdg-index-list/history/historyTr.jsx", function(require, exports, module) {
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
      , getProductStatus = require("p2p:widget/uplan/wdg-index-list/history/getProductStatus.js")
      , ReactHistoryTR = function(_React$Component) {
        function ReactHistoryTR() {
            _classCallCheck(this, ReactHistoryTR),
            _React$Component.apply(this, arguments)
        }
        return _inherits(ReactHistoryTR, _React$Component),
        ReactHistoryTR.prototype.componentWillMount = function() {
            this.setState({
                hover: !1
            }),
            this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this),
            this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this)
        }
        ,
        ReactHistoryTR.prototype.onMouseEnterHandler = function() {
            this.setState({
                hover: !0
            })
        }
        ,
        ReactHistoryTR.prototype.onMouseLeaveHandler = function() {
            this.setState({
                hover: !1
            })
        }
        ,
        ReactHistoryTR.prototype.render = function() {
            var props = this.props
              , obj = props.obj
              , trClassName = "list";
            this.state.hover && (trClassName = "list hover");
            var openURL = "/uplan-" + obj.id + ".html"
              , text = getProductStatus(obj.reserveStatus, obj.status);
            return React.createElement("tr", {
                className: trClassName,
                key: "history-" + obj.id,
                onMouseEnter: this.onMouseEnterHandler,
                onMouseLeave: this.onMouseLeaveHandler
            }, React.createElement("td", {
                className: "name"
            }, React.createElement("a", {
                title: "点击查看" + obj.name + "详情",
                target: "_blank",
                href: openURL
            }, obj.name)), React.createElement("td", {
                className: "join-num"
            }, obj.subPointCount, "人"), React.createElement("td", {
                className: "amount"
            }, obj.amount, "元"), props.getRateDom(obj), React.createElement("td", {
                className: "earn"
            }, obj.earnInterest, "元"), React.createElement("td", {
                className: "6" == obj.status ? "status orange" : "status"
            }, "4" == obj.status || 3 == obj.reserveStatus ? React.createElement("a", {
                className: "btn-part-in",
                href: openURL
            }, text) : text))
        }
        ,
        ReactHistoryTR
    }(React.Component);
    module.exports = ReactHistoryTR
});
;/*!/client/widget/uplan/wdg-index-list/history/history.jsx*/
define("p2p:widget/uplan/wdg-index-list/history/history.jsx", function(require, exports, module) {
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
      , Pagination = require("common:widget/react-ui/RList/pagination/Pagination")
      , HistoryTr = require("p2p:widget/uplan/wdg-index-list/history/historyTr.jsx")
      , service = require("common:widget/ui/service/service-factory")
      , ReactHistoryBlock = function(_React$Component) {
        function ReactHistoryBlock() {
            _classCallCheck(this, ReactHistoryBlock),
            _React$Component.apply(this, arguments)
        }
        return _inherits(ReactHistoryBlock, _React$Component),
        ReactHistoryBlock.prototype.componentWillMount = function() {
            this.setState({
                list: this.props.historyData.list,
                totalCount: this.props.historyData.totalCount,
                startNum: 0,
                ajaxParams: {},
                isLoading: !1
            }),
            this.loadData = this.loadData.bind(this),
            this.getTableDom = this.getTableDom.bind(this)
        }
        ,
        ReactHistoryBlock.prototype.render = function() {
            var props = this.props
              , state = this.state
              , recommData = state.list
              , totalCount = state.totalCount
              , pageNum = Math.ceil(totalCount / props.limit)
              , tableDom = this.getTableDom(recommData)
              , loadingClassName = "list-loading " + (state.isLoading ? "show" : "hide");
            return React.createElement("div", {
                id: "uIndexProductListBox"
            }, React.createElement("div", {
                className: "title-box"
            }, "历史期数与利息回报"), React.createElement("div", {
                className: "list-box"
            }, tableDom), React.createElement(Pagination, _extends({}, props, {
                startNum: state.startNum,
                pageNum: pageNum,
                ajaxParams: this.state.ajaxParams,
                loadData: this.loadData
            })), React.createElement("div", {
                className: loadingClassName
            }))
        }
        ,
        ReactHistoryBlock.prototype.loadData = function(params) {
            var _this = this
              , startNum = params.startNum
              , ajaxParams = params.ajaxParams;
            if (startNum != this.state.startNum) {
                var paramData = {
                    startNum: startNum,
                    limit: this.props.limit
                };
                this.setState({
                    isLoading: !0
                }),
                Object.assign(paramData, paramData, ajaxParams);
                var serviceName = this.props.serviceName.split(".")
                  , moudleService = service.getService(serviceName[0]);
                moudleService[serviceName[1]](paramData).then(function(out) {
                    if (out.requestStatus !== moudleService.STATUS.ERROR) {
                        var rsp = out.data;
                        _this.setState({
                            list: rsp.data.list,
                            totalCount: rsp.data.totalCount,
                            startNum: startNum,
                            isLoading: !1,
                            ajaxParams: ajaxParams
                        })
                    }
                })
            }
        }
        ,
        ReactHistoryBlock.prototype.getTableDom = function(recommData) {
            var getRateDom = (this.props,
            function(obj) {
                return 0 != obj.extraInterestRate ? React.createElement("td", {
                    className: "rate"
                }, obj.baseInterestRate.toFixed(1), React.createElement("em", null, "%"), " + " + obj.extraInterestRate.toFixed(1), React.createElement("em", null, "%")) : React.createElement("td", {
                    className: "rate"
                }, obj.expectedYearRate.toFixed(1), React.createElement("em", null, "%"))
            }
            );
            return React.createElement("table", {
                className: "react-history-table"
            }, React.createElement("thead", null, React.createElement("tr", {
                className: "table-head"
            }, React.createElement("th", null, "服务期数"), React.createElement("th", null, "授权出借人次"), React.createElement("th", null, "可出借金额"), React.createElement("th", null, "扣费后年利率", React.createElement("span", {
                className: "icon-we-tip-info"
            }, React.createElement("div", {
                className: "info-tips-box"
            }, React.createElement("span", {
                className: "triangle"
            }), React.createElement("span", {
                className: "info-tips"
            }, " 按扣费后年利率计算的利息不代表对实际获得利息的承诺")))), React.createElement("th", null, "累计利息回报"), React.createElement("th", {
                className: "status"
            }, "状态"))), React.createElement("tbody", null, recommData ? recommData.map(function(obj, key) {
                return React.createElement(HistoryTr, {
                    obj: obj,
                    getRateDom: getRateDom,
                    key: key
                })
            }) : ""))
        }
        ,
        ReactHistoryBlock
    }(React.Component);
    module.exports = ReactHistoryBlock
});
