package com.zl.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.zl.pojo.BankCard;
import com.zl.pojo.TradeRecord;
import com.zl.query.Paging;
import com.zl.view.TradeRecordView;

/**
 * 交易【充值提现】和记录相关业务操作
 * @author 王静
 *
 */
public interface TradeService {

	/**
	 * 查询用户所有的充值提现记录并分页条件显示:封装显示记录对象TradeRecordView
	 * @param paging 分页条件
	 * @param session 会话，获取用户
	 * @return
	 */
	List<TradeRecordView> queryTradeRecordPaging(Paging paging,HttpSession session);
	
	/**
	 * 用户使用支付宝充值新增充值记录，变更账号余额
	 * @param notify_json 支付宝支付回调返回的json
	 * @param request	支付宝支付回调请求
	 * @return
	 * @throws Exception
	 */
	int addTradeRecordAlipay(String notify_json, HttpServletRequest request) throws Exception;
	
	/**
	 * 用户使用银行卡充值新增充值记录，变更账号余额（模拟操作）
	 * @param card
	 * @return
	 */
	int addTradeRecordBank(BankCard card, HttpSession session);
	/**
	 * 用户将账户余额提现到银行卡记录，变更账户银行卡余额（模拟操作）
	 * @param card
	 * @return
	 */
	int withdrawRecordBank(BankCard card);
	/**
	 * 查询该Id对应的详细交易记录
	 * @param id
	 * @return
	 */
	TradeRecord queryTradeRecordById(Integer id);
}
