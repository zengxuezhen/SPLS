package com.zl.pojo;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 模拟公司平台账户信息
 * @author Administrator
 *
 */
public class CompanyCard implements Serializable {

	private static final long serialVersionUID = -1009431741481090641L;
	//主键
	private Integer id;
	//公司平台账户金额
	private BigDecimal amount;
	//公司平台账户卡号
	private String cardNo;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	public String getCardNo() {
		return cardNo;
	}
	public void setCardNo(String cardNo) {
		this.cardNo = cardNo;
	}
	@Override
	public String toString() {
		return "CompanyCard [id=" + id + ", amount=" + amount + ", cardNo=" + cardNo + "]";
	}
	
	
}
