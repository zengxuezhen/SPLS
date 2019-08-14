package com.zl.pojo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 充值记录实体类
 * @author Administrator
 * 映射数据库表TOP_UP_RECORD
 */
public class TopUpRecord implements Serializable {
    
	private static final long serialVersionUID = -8760818574711753324L;
	//主键
	private Integer id;
	//充值记录编号
    private String topUpNo;
    //充值时间
    private Date createTime;
    //充值方式
    private String method;
    //充值金额
    private BigDecimal amount;
    //充值操作用户主键
    private Integer userId;

    public TopUpRecord(Integer id, String topUpNo, Date createTime, String method, BigDecimal amount, Integer userId) {
        this.id = id;
        this.topUpNo = topUpNo;
        this.createTime = createTime;
        this.method = method;
        this.amount = amount;
        this.userId = userId;
    }

    public TopUpRecord() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method == null ? null : method.trim();
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}