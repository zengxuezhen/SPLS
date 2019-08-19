define("loan:page/list/list.js", function(require, exports, module) {
    "use strict";
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source)
                Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key])
        }
        return target
    }
      , React = require("common:node_modules/react/react")
      , ReactDOM = require("common:node_modules/react-dom/index")
      , List = require("common:widget/react-ui/RList/List")
      , ListMain = require("loan:widget/list/list-main/list-main")
      , RiskTips = require("common:widget/p2p/risk-tips/risk-tips");
    module.exports = {
        init: function(data, riskTipsData) {
            this.renderList(data, 0, 10, document.getElementById("loanMain")),
            this.renderRiskTips(riskTipsData, document.getElementById("loanRiskTips"))
        },
        renderRiskTips: function(riskTipsData, dom) {
            ReactDOM.render(React.createElement(RiskTips, {
                riskTipsData: riskTipsData,
                type: "loan"
            }), dom)
        },
        renderList: function(result, startNum, limit, dom) {
            var params = {};
            ReactDOM.render(React.createElement(List, _extends({}, result, {
                moudleServiceName: "loan",
                url: "getLoanList",
                ajaxParams: params,
                isHeadNeed: "yes",
                isHeadNeedOrder: "yes",
                createHeadDom: this.createHeadDom,
                createRowDom: this.createRowDom,
                startNum: startNum,
                limit: limit,
                offset: 5
            })), dom)
        },
        createRowDom: function(item, index) {
            return ListMain.renderRow(item, index)
        },
        createHeadDom: function() {
            return ListMain.renderHeader()
        }
    }
});
