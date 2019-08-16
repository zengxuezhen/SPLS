package com.zl.pojo;

import java.io.Serializable;
import java.math.BigDecimal;
/*
 * 还款方式实体类
 * */
public class RepaymentMethod implements Serializable {

	private static final long serialVersionUID = -592916143122529034L;
//	主键
	private BigDecimal id;
//  还款方式名称
    private String methodName;
//  还款方式描述
    private String description;
//    正常还款年化利率
    private BigDecimal normalInterestRate;
//    逾期还款日利率，万分之一(按天算)
    private BigDecimal overdueInterestRate;
//	提前还款日利率，万分之一(按天算)
    private BigDecimal prepaymentInterestRate;

    public RepaymentMethod(BigDecimal id, String methodName, String description, BigDecimal normalInterestRate, BigDecimal overdueInterestRate, BigDecimal prepaymentInterestRate) {
        this.id = id;
        this.methodName = methodName;
        this.description = description;
        this.normalInterestRate = normalInterestRate;
        this.overdueInterestRate = overdueInterestRate;
        this.prepaymentInterestRate = prepaymentInterestRate;
    }

    public RepaymentMethod() {
        super();
    }

    public BigDecimal getId() {
        return id;
    }

    public void setId(BigDecimal id) {
        this.id = id;
    }

    public String getMethodName() {
        return methodName;
    }

    public void setMethodName(String methodName) {
        this.methodName = methodName == null ? null : methodName.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public BigDecimal getNormalInterestRate() {
        return normalInterestRate;
    }

    public void setNormalInterestRate(BigDecimal normalInterestRate) {
        this.normalInterestRate = normalInterestRate;
    }

    public BigDecimal getOverdueInterestRate() {
        return overdueInterestRate;
    }

    public void setOverdueInterestRate(BigDecimal overdueInterestRate) {
        this.overdueInterestRate = overdueInterestRate;
    }

    public BigDecimal getPrepaymentInterestRate() {
        return prepaymentInterestRate;
    }

    public void setPrepaymentInterestRate(BigDecimal prepaymentInterestRate) {
        this.prepaymentInterestRate = prepaymentInterestRate;
    }
}