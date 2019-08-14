package com.zl.pojo;

import java.math.BigDecimal;

public class PersonalAsset {
    private Long id;

    private Long personalLoanInfoId;

    private String assetType;

    private String assetDescription;

    private BigDecimal assetValue;

    public PersonalAsset(Long id, Long personalLoanInfoId, String assetType, String assetDescription, BigDecimal assetValue) {
        this.id = id;
        this.personalLoanInfoId = personalLoanInfoId;
        this.assetType = assetType;
        this.assetDescription = assetDescription;
        this.assetValue = assetValue;
    }

    public PersonalAsset() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPersonalLoanInfoId() {
        return personalLoanInfoId;
    }

    public void setPersonalLoanInfoId(Long personalLoanInfoId) {
        this.personalLoanInfoId = personalLoanInfoId;
    }

    public String getAssetType() {
        return assetType;
    }

    public void setAssetType(String assetType) {
        this.assetType = assetType == null ? null : assetType.trim();
    }

    public String getAssetDescription() {
        return assetDescription;
    }

    public void setAssetDescription(String assetDescription) {
        this.assetDescription = assetDescription == null ? null : assetDescription.trim();
    }

    public BigDecimal getAssetValue() {
        return assetValue;
    }

    public void setAssetValue(BigDecimal assetValue) {
        this.assetValue = assetValue;
    }
}