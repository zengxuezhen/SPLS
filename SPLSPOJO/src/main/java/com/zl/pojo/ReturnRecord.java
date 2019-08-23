package com.zl.pojo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * 回款记录信息实体类
 * @author Administrator
 * 映射数据库表RETURN_RECORD
 */
public class ReturnRecord implements Serializable {
    
	private static final long serialVersionUID = 445088185055443253L;
	//主键
	private Long id;
	//债权信息主键
    private Long creditId;
    //回款金额
    private BigDecimal amount;
    //当前回款期限
    private Integer term;
    //回款时间
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    public ReturnRecord(Long id, Long creditId, BigDecimal amount, Integer term, Date createTime) {
        this.id = id;
        this.creditId = creditId;
        this.amount = amount;
        this.term = term;
        this.createTime = createTime;
    }

    public ReturnRecord() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCreditId() {
        return creditId;
    }

    public void setCreditId(Long creditId) {
        this.creditId = creditId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Integer getTerm() {
        return term;
    }

    public void setTerm(Integer term) {
        this.term = term;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}