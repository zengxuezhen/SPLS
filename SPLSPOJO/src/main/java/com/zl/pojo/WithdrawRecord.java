package com.zl.pojo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * 提现记录实体类【此类暂无作用】
 * @author Administrator
 * 映射数据库表withdraw_record
 */
public class WithdrawRecord implements Serializable {
	
	private static final long serialVersionUID = -614021586941835863L;
	//主键
    private Integer id;
    //提现记录编号
    private String recordNo;
    //提现时间
    @JsonFormat(pattern="yyyy-MM-dd HH-mm-ss",timezone="GMT+8")
    @DateTimeFormat(pattern="yyyy-MM-dd HH-mm-ss")
    private Date createTime;
    //提现金额
    private BigDecimal amount;
    //提现操作用户主键
    private Integer userId;

    public WithdrawRecord(Integer id, String recordNo, Date createTime, BigDecimal amount, Integer userId) {
        this.id = id;
        this.recordNo = recordNo;
        this.createTime = createTime;
        this.amount = amount;
        this.userId = userId;
    }

    public WithdrawRecord() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRecordNo() {
        return recordNo;
    }

    public void setRecordNo(String recordNo) {
        this.recordNo = recordNo == null ? null : recordNo.trim();
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

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}