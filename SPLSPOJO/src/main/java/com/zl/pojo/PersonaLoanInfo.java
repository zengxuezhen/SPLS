package com.zl.pojo;

import java.math.BigDecimal;

public class PersonaLoanInfo {
    private BigDecimal id;

    private BigDecimal idId;

    private String educationBackgroud;

    private BigDecimal personalAssetsId;

    private BigDecimal monthlyIncome;

    private String maritalStatus;

    private BigDecimal contact1;

    private BigDecimal contact2;

    public PersonaLoanInfo(BigDecimal id, BigDecimal idId, String educationBackgroud, BigDecimal personalAssetsId, BigDecimal monthlyIncome, String maritalStatus, BigDecimal contact1, BigDecimal contact2) {
        this.id = id;
        this.idId = idId;
        this.educationBackgroud = educationBackgroud;
        this.personalAssetsId = personalAssetsId;
        this.monthlyIncome = monthlyIncome;
        this.maritalStatus = maritalStatus;
        this.contact1 = contact1;
        this.contact2 = contact2;
    }

    public PersonaLoanInfo() {
        super();
    }

    public BigDecimal getId() {
        return id;
    }

    public void setId(BigDecimal id) {
        this.id = id;
    }

    public BigDecimal getIdId() {
        return idId;
    }

    public void setIdId(BigDecimal idId) {
        this.idId = idId;
    }

    public String getEducationBackgroud() {
        return educationBackgroud;
    }

    public void setEducationBackgroud(String educationBackgroud) {
        this.educationBackgroud = educationBackgroud == null ? null : educationBackgroud.trim();
    }

    public BigDecimal getPersonalAssetsId() {
        return personalAssetsId;
    }

    public void setPersonalAssetsId(BigDecimal personalAssetsId) {
        this.personalAssetsId = personalAssetsId;
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

    public BigDecimal getContact1() {
        return contact1;
    }

    public void setContact1(BigDecimal contact1) {
        this.contact1 = contact1;
    }

    public BigDecimal getContact2() {
        return contact2;
    }

    public void setContact2(BigDecimal contact2) {
        this.contact2 = contact2;
    }
}