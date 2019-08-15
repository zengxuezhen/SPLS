package com.zl.pojo;

import java.io.Serializable;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
/*
 * 逾期记录表实体类
 * 
 * */
public class OverdueRecord implements Serializable {
	
/**
	 * 
	 */
	private static final long serialVersionUID = 4239904087589524200L;
//	主键ID
    private Long id;
//	标的表外键
    private Long subjectMatterId;
//	第几期
    private Short term;
//	逾期状态
    private Short overdueStatus;
//	记录创建时间
    @JsonFormat(pattern="yyyy-MM-dd HH-mm-ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH-mm-ss")
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