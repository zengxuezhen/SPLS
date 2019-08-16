package com.zl.pojo;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 标（产品）类型的实体类
 * @author Administrator
 * 映射数据库表SUBJECT_MATTER_TYPE
 */
public class SubjectMatterType implements Serializable {
    
	private static final long serialVersionUID = 5004891905025626854L;
	//主键
	private Short id;
	//类型的编号
    private String typeNo;
    //类型名
    private String typeName;
    //标（产品）的成标期限
    private Short period;
    //该标对应的还款方式主键
    private Short repaymentMethodId;
    //最低投资额
    private BigDecimal minAmount;
    //最高投资额
    private BigDecimal maxAmount;
    //借款期数（月）
    private BigDecimal debtPeriod;
    //关联还款方式
    private RepaymentMethod repaymentMethod;

    public SubjectMatterType(Short id, String typeNo, String typeName, Short period, Short repaymentMethodId, BigDecimal minAmount, BigDecimal maxAmount, BigDecimal debtPeriod) {
        this.id = id;
        this.typeNo = typeNo;
        this.typeName = typeName;
        this.period = period;
        this.repaymentMethodId = repaymentMethodId;
        this.minAmount = minAmount;
        this.maxAmount = maxAmount;
        this.debtPeriod = debtPeriod;
    }

    public SubjectMatterType() {
        super();
    }

    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public String getTypeNo() {
        return typeNo;
    }

    public void setTypeNo(String typeNo) {
        this.typeNo = typeNo == null ? null : typeNo.trim();
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName == null ? null : typeName.trim();
    }

    public Short getPeriod() {
        return period;
    }

    public void setPeriod(Short period) {
        this.period = period;
    }

    public Short getRepaymentMethodId() {
        return repaymentMethodId;
    }

    public void setRepaymentMethodId(Short repaymentMethodId) {
        this.repaymentMethodId = repaymentMethodId;
    }

    public BigDecimal getMinAmount() {
        return minAmount;
    }

    public void setMinAmount(BigDecimal minAmount) {
        this.minAmount = minAmount;
    }

    public BigDecimal getMaxAmount() {
        return maxAmount;
    }

    public void setMaxAmount(BigDecimal maxAmount) {
        this.maxAmount = maxAmount;
    }

    public BigDecimal getDebtPeriod() {
        return debtPeriod;
    }

    public void setDebtPeriod(BigDecimal debtPeriod) {
        this.debtPeriod = debtPeriod;
    }

	public RepaymentMethod getRepaymentMethod() {
		return repaymentMethod;
	}

	public void setRepaymentMethod(RepaymentMethod repaymentMethod) {
		this.repaymentMethod = repaymentMethod;
	}
}