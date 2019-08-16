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
	private Long id;
	//债权表编号
    private String creditNo;
    //债权拥有者用户主键（债主）
    private Long debitorUserId;
    //贷款人用户主键
    private Long creditorUserId;
    //所属标的主键
    private Long subjectId;
    //持有债权金额
    private BigDecimal amount;
    //所属标的
    public Credit(Long id, String deptNo, Long debtorUserId, Long creditorUserId, Long loanId, BigDecimal amount) {
        this.id = id;
        this.creditNo = deptNo;
        this.debitorUserId = debtorUserId;
        this.creditorUserId = creditorUserId;
        this.subjectId = loanId;
        this.amount = amount;
    }

    public Credit() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCreditNo() {
        return creditNo;
    }

    public void setCreditNo(String creditNo) {
        this.creditNo = creditNo == null ? null : creditNo.trim();
    }

    public Long getDebitorUserId() {
        return debitorUserId;
    }

    public void setDebitorUserId(Long debtorUserId) {
        this.debitorUserId = debtorUserId;
    }

    public Long getCreditorUserId() {
        return creditorUserId;
    }

    public void setCreditorUserId(Long creditorUserId) {
        this.creditorUserId = creditorUserId;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long loanId) {
        this.subjectId = loanId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}