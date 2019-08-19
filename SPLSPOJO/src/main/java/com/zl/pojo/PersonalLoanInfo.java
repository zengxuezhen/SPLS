package com.zl.pojo;

import java.io.Serializable;
import java.math.BigDecimal;
/*
 * 贷款个人信息表实体类
 * */
public class PersonalLoanInfo implements Serializable {

	private static final long serialVersionUID = 803733284729720111L;
//	主键
    private Long id;
//	认证表外键
    private Long userId;
//	学历
    private String educationBackgroud;
//	月收入
    private BigDecimal monthlyIncome;
//  婚姻状态
    private String maritalStatus;
//  审核处理状态
    private Integer status;

    public PersonalLoanInfo(Long id, Long userId, String educationBackgroud, BigDecimal personalAssetsId, BigDecimal monthlyIncome, String maritalStatus, BigDecimal maxAmount, BigDecimal activeAmount, Integer status) {
        this.id = id;
        this.userId = userId;
        this.educationBackgroud = educationBackgroud;
        this.monthlyIncome = monthlyIncome;
        this.maritalStatus = maritalStatus;
        this.status=status;
    }

    public PersonalLoanInfo() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEducationBackgroud() {
        return educationBackgroud;
    }

    public void setEducationBackgroud(String educationBackgroud) {
        this.educationBackgroud = educationBackgroud == null ? null : educationBackgroud.trim();
    }

    public BigDecimal getMonthlyIncome() {
        return monthlyIncome;
    }

    public void setMonthlyIncome(BigDecimal monthlyIncome) {
        this.monthlyIncome = monthlyIncome;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus == null ? null : maritalStatus.trim();
    }

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

    
}