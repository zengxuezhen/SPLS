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
    private Long idId;
//	学历
    private String educationBackgroud;
//	月收入
    private BigDecimal monthlyIncome;
//  婚姻状态
    private String maritalStatus;
//  贷款额度
    private BigDecimal maxAmount;
//  可用额度
    private BigDecimal activeAmount;
//  审核处理状态
    private Integer status;

    public PersonalLoanInfo(Long id, Long idId, String educationBackgroud, BigDecimal personalAssetsId, BigDecimal monthlyIncome, String maritalStatus, BigDecimal maxAmount, BigDecimal activeAmount, Integer status) {
        this.id = id;
        this.idId = idId;
        this.educationBackgroud = educationBackgroud;
        this.monthlyIncome = monthlyIncome;
        this.maritalStatus = maritalStatus;
        this.maxAmount=maxAmount;
        this.activeAmount=activeAmount;
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

    public Long getIdId() {
        return idId;
    }

    public void setIdId(Long idId) {
        this.idId = idId;
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

	public BigDecimal getMaxAmount() {
		return maxAmount;
	}

	public void setMaxAmount(BigDecimal maxAmount) {
		this.maxAmount = maxAmount;
	}

	public BigDecimal getActiveAmount() {
		return activeAmount;
	}

	public void setActiveAmount(BigDecimal activeAmount) {
		this.activeAmount = activeAmount;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

    
}