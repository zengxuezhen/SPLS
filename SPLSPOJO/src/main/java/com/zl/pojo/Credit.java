package com.zl.pojo;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 债权信息实体类
 * @author Administrator
 * 映射数据库表CREDIT
 */
public class Credit implements Serializable {
    
	private static final long serialVersionUID = -5027863570074646330L;
	//主键（自增）
	private Integer id;
	//债权表编号
    private String deptNo;
    //债权拥有者用户主键（债主）
    private Integer debtorUserId;
    //贷款人用户主键
    private Integer creditorUserId;
    //所属标的主键
    private Integer loanId;
    //持有债权金额
    private BigDecimal amount;
    
    public Credit(Integer id, String deptNo, Integer debtorUserId, Integer creditorUserId, Integer loanId, BigDecimal amount) {
        this.id = id;
        this.deptNo = deptNo;
        this.debtorUserId = debtorUserId;
        this.creditorUserId = creditorUserId;
        this.loanId = loanId;
        this.amount = amount;
    }

    public Credit() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDeptNo() {
        return deptNo;
    }

    public void setDeptNo(String deptNo) {
        this.deptNo = deptNo == null ? null : deptNo.trim();
    }

    public Integer getDebtorUserId() {
        return debtorUserId;
    }

    public void setDebtorUserId(Integer debtorUserId) {
        this.debtorUserId = debtorUserId;
    }

    public Integer getCreditorUserId() {
        return creditorUserId;
    }

    public void setCreditorUserId(Integer creditorUserId) {
        this.creditorUserId = creditorUserId;
    }

    public Integer getLoanId() {
        return loanId;
    }

    public void setLoanId(Integer loanId) {
        this.loanId = loanId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}