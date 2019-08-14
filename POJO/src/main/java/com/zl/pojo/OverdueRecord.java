package com.zl.pojo;

import java.util.Date;

public class OverdueRecord {
    private Long id;

    private Long subjectMatterId;

    private Short term;

    private Short overdueStatus;

    private Date createTime;

    public OverdueRecord(Long id, Long subjectMatterId, Short term, Short overdueStatus, Date createTime) {
        this.id = id;
        this.subjectMatterId = subjectMatterId;
        this.term = term;
        this.overdueStatus = overdueStatus;
        this.createTime = createTime;
    }

    public OverdueRecord() {
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

    public Short getTerm() {
        return term;
    }

    public void setTerm(Short term) {
        this.term = term;
    }

    public Short getOverdueStatus() {
        return overdueStatus;
    }

    public void setOverdueStatus(Short overdueStatus) {
        this.overdueStatus = overdueStatus;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}