package com.zl.pojo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
/*
 *还款记录表
 */
public class RepaymentRecord implements Serializable {

	private static final long serialVersionUID = 9005179369748151300L;
//	主键
    private Long id;
//	标的表外键
    private Long subjectMatterId;
//    还款金额
    private BigDecimal amount;
//	第几期
    private Short term;
//    记录创建时间
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    public RepaymentRecord(Long id, Long subjectMatterId, BigDecimal amount, Short term, Date createTime) {
        this.id = id;
        this.subjectMatterId = subjectMatterId;
        this.amount = amount;
        this.term = term;
        this.createTime = createTime;
    }

    public RepaymentRecord() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSubjectMatterId() {
        return subjectMatterId;
    }

    public void setSubjectMatterId(Long subjectMatterId) {
        this.subjectMatterId = subjectMatterId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Short getTerm() {
        return term;
    }

    public void setTerm(Short term) {
        this.term = term;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}