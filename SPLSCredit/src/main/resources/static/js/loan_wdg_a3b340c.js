;/*!/client/widget/list/list-main/list-main.js*/
define("loan:widget/list/list-main/list-main.js", function(require, exports, module) {
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var React = require("common:node_modules/react/react")
      , numeral = (require("common:node_modules/react-dom/index"),
    require("common:node_modules/numeral/numeral"))
      , LoanListMain = function() {
        function LoanListMain() {
            _classCallCheck(this, LoanListMain)
        }
        return LoanListMain.prototype.resolveMaxLength = function(string) {
            return string.length > 16 ? string.substring(0, 16) + "..." : string
        }
        ,
        LoanListMain.prototype.renderHeader = function() {
            var data = {
                headItems: [{
                    sortName: "INTEREST",
                    sortNameC: "年利率",
                    sortType: "asc",
                    isOrder: !1,
                    liClassName: "h-rate"
                }, {
                    sortNameC: "借款标题",
                    isSelected: !1,
                    isOrder: !1,
                    liClassName: "h-name"
                }, {
                    sortName: "MONTH",
                    sortNameC: "期限",
                    sortType: "asc",
                    isOrder: !1,
                    liClassName: "h-limit"
                }, {
                    sortNameC: "金额",
                    sortType: "asc",
                    isOrder: !1,
                    liClassName: "h-money"
                }, {
                    sortName: "FINISHEDRATIO",
                    sortNameC: "进度",
                    sortType: "asc",
                    isOrder: !1,
                    liClassName: "h-overage"
                }, {
                    sortNameC: "重置",
                    isSelected: !1,
                    isOrder: !1,
                    liClassName: "h-action icon-we-zhongzhiicon"
                }]
            };
            return data
        }
        ,
        LoanListMain.prototype.renderRow = function(item, index) {
            var finish = parseInt(item.finishedRatio)
              , processStyle = {
                width: item.finishedRatio + "%"
            };
            item.amount = numeral(item.amount).format("0,00");
            var interest = numeral(item.interest).format("0.00")
              , badge = this.getBadge(item.displayLoanType);
            return React.createElement("div", {
                className: "loan-list-item" + (index % 2 == 1 ? " even" : "")
            }, React.createElement("div", {
                className: "rate"
            }, React.createElement("i", null, interest), React.createElement("span", null, "%")), React.createElement("div", {
                className: "name"
            }, React.createElement("div", {
                className: "name-top"
            }, React.createElement("span", {
                className: "badge"
            }, badge), " ", React.createElement("a", {
                href: "/loan-" + item.loanId + ".html",
                target: "_blank"
            }, this.resolveMaxLength(item.title))), React.createElement("div", {
                className: "list-no"
            }, "NO." + item.loanId)), React.createElement("div", {
                className: "limit"
            }, item.leftMonths, "个月"), React.createElement("div", {
                className: "money"
            }, item.amount, "元"), React.createElement("div", {
                className: "overage"
            }, React.createElement("div", {
                className: "percentage"
            }, finish, "%"), React.createElement("div", {
                className: "outer"
            }, React.createElement("span", {
                className: "inner",
                style: processStyle
            }))), React.createElement("div", {
                className: "action"
            }, "OPEN" == item.status && React.createElement("a", {
                className: "btn",
                href: "/loan-" + item.loanId + ".html",
                target: "_blank"
            }, "出借"), "FIRST_READY" == item.status && React.createElement("a", {
                className: "completed",
                href: "/loan-" + item.loanId + ".html",
                target: "_blank"
            }, "已满标"), "IN_PROGRESS" == item.status && React.createElement("a", {
                className: "completed",
                href: "/loan-" + item.loanId + ".html",
                target: "_blank"
            }, "还款中")))
        }
        ,
        LoanListMain.prototype.getBadge = function(type) {
            var typeMap = {
                SDRZ: "实",
                XYRZ: "信",
                JGDB: "保",
                ZNLC: "智"
            };
            return typeMap[type] ? typeMap[type] : ""
        }
        ,
        LoanListMain
    }();
    module.exports = new LoanListMain
});
