package com.zl.view;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 用于封装每月查询出的交易记录
 * @author 王静
 *
 */
public class TradeMonthView implements Serializable {

	private static final long serialVersionUID = -5123991100404052423L;
	//月份
	private String monthTime;
	//交易类型
	private Integer tradeType;
	//金额
	private BigDecimal amount;
	//用户
	private Long userId;
	
	public String getMonthTime() {
		return monthTime;
	}
	public void setMonthTime(String monthTime) {
		this.monthTime = monthTime;
	}
	public Integer getTradeType() {
		return tradeType;
	}
	public void setTradeType(Integer tradeType) {
		this.tradeType = tradeType;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	@Override
	public String toString() {
		return "TradeMonthView [monthTime=" + monthTime + ", tradeType=" + tradeType + ", amount=" + amount
				+ ", userId=" + userId + "]";
	}
}
