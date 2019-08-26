package com.zl.pojo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * 平台账户信息实体类
 * 
 * @author Administrator 映射数据库表ACCOUNT_INFO
 */

public class AccountInfo implements Serializable {

	private static final long serialVersionUID = 1241499456142281802L;
	// 主键
	private Long id;
	// 平台账号编号
	private String accountNo;
	// 平台账户可用余额
	private BigDecimal activeAmount;
	// 平台账户冻结金额
	private BigDecimal frozenAmount;
	// 平台账户开通时间
	@JsonFormat(pattern = "yyyy-MM-dd HH-mm-ss")
	@DateTimeFormat(pattern = "yyyy-MM-dd HH-mm-ss")
	private Date createTime;
	// 此账户对应用户主键
	private Long userId;
	// 平台账户最大额度
	private BigDecimal maxAmount;
	// 平台账户交易密码
	private String password;
	
	public AccountInfo(Long id, String accountNo, BigDecimal activeAmount, BigDecimal frozenAmount, Date createTime,
			Long userId) {
		this.id = id;
		this.accountNo = accountNo;
		this.activeAmount = activeAmount;
		this.frozenAmount = frozenAmount;
		this.createTime = createTime;
		this.userId = userId;
	}

	public AccountInfo() {
		super();
	}

	public BigDecimal getMaxAmount() {
		return maxAmount;
	}

	public void setMaxAmount(BigDecimal maxAmount) {
		this.maxAmount = maxAmount;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo == null ? null : accountNo.trim();
	}

	public BigDecimal getActiveAmount() {
		return activeAmount;
	}

	public void setActiveAmount(BigDecimal activeAmount) {
		this.activeAmount = activeAmount;
	}

	public BigDecimal getFrozenAmount() {
		return frozenAmount;
	}

	public void setFrozenAmount(BigDecimal frozenAmount) {
		this.frozenAmount = frozenAmount;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "AccountInfo [id=" + id + ", accountNo=" + accountNo + ", activeAmount=" + activeAmount
				+ ", frozenAmount=" + frozenAmount + ", createTime=" + createTime + ", userId=" + userId + "]";
	}

}