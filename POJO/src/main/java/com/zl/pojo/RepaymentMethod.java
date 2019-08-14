package com.zl.pojo;

import java.math.BigDecimal;

public class RepaymentMethod {
    private BigDecimal id;

    private String methodName;

    private String description;

    private BigDecimal normalInterestRate;

    private BigDecimal overdueInterestRate;

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