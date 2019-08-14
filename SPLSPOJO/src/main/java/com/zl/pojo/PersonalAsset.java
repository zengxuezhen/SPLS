package com.zl.pojo;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 个人资产表对应实体类
 */
public class PersonalAsset implements Serializable{
	

	private static final long serialVersionUID = -2865745045002382532L;
//	主键ID
    private Long id;
//  个人贷款信息表外键
    private Long personalLoanInfoId;
//  资产类型
    private String assetType;
//	资产描述
    private String assetDescription;
//	资产价值
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