package com.zl.pojo;

import java.math.BigDecimal;
import java.util.Date;

public class RepaymentRecord {
    private Long id;

    private Long subjectMatterId;

    private BigDecimal amount;

    private Short term;

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