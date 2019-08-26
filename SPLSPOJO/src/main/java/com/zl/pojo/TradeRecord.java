package com.zl.pojo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * 交易记录实体类
 * @author Administrator
 * 映射数据库表TRADE_RECORD
 */
public class TradeRecord implements Serializable {
    
	private static final long serialVersionUID = -8760818574711753324L;
	//主键
	private Long id;
	//充值记录编号
    private String topUpNo;
    //充值时间
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date createTime;
    //交易类型
    private Integer tradeType;
    //充值金额
    private BigDecimal amount;
    //充值操作用户主键
    private  Long userId;
    //此次交易后账户结余
    private BigDecimal balance;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTopUpNo() {
        return topUpNo;
    }

    public void setTopUpNo(String topUpNo) {
        this.topUpNo = topUpNo == null ? null : topUpNo.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
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

	public Integer getTradeType() {
		return tradeType;
	}

	public void setTradeType(Integer tradeType) {
		this.tradeType = tradeType;
	}

	public BigDecimal getBalance() {
		return balance;
	}

	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}
    
    
}