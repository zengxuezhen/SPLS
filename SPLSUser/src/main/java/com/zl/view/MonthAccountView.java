package com.zl.view;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 封装前端显示的月账信息
 * @author 王静
 *
 */
public class MonthAccountView implements Serializable {

	private static final long serialVersionUID = -4413212866467340252L;
	//月份
	private String monthTime;
	//月总收入
	private BigDecimal incomeTotal;
	//月总支出
	private BigDecimal payTotal;
	//月出借
	private BigDecimal lendAmount;
	//月贷款
	private BigDecimal loanAmount;
	//用户
	private Long userId;
	
	public BigDecimal getIncomeTotal() {
		return incomeTotal;
	}
	public void setIncomeTotal(BigDecimal incomeTotal) {
		this.incomeTotal = incomeTotal;
	}
	public BigDecimal getPayTotal() {
		return payTotal;
	}
	public void setPayTotal(BigDecimal payTotal) {
		this.payTotal = payTotal;
	}
	public BigDecimal getLendAmount() {
		return lendAmount;
	}
	public void setLendAmount(BigDecimal lendAmount) {
		this.lendAmount = lendAmount;
	}
	public BigDecimal getLoanAmount() {
		return loanAmount;
	}
	public void setLoanAmount(BigDecimal loanAmount) {
		this.loanAmount = loanAmount;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getMonthTime() {
		return monthTime;
	}
	public void setMonthTime(String monthTime) {
		this.monthTime = monthTime;
	}
	@Override
	public String toString() {
		return "AccountMonthView [monthTime=" + monthTime + ", incomeTotal=" + incomeTotal + ", payTotal=" + payTotal
				+ ", lendAmount=" + lendAmount + ", loanAmount=" + loanAmount + ", userId=" + userId + "]";
	}
}
