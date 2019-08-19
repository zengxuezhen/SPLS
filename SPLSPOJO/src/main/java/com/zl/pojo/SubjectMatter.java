package com.zl.pojo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 标（产品）的实体类
 * @author Administrator
 * 映射数据库表SUBJECT_MATTER
 */
public class SubjectMatter implements Serializable {
    
	private static final long serialVersionUID = 3391937959367938881L;
	//主键
	private Long id;
	//标的编号
    private String matterNo;
    //标的状态
    private Integer status;
    //发标的用户（贷款人）主键
    private Long debtorUserId; 
    //贷款金额
    private BigDecimal loanAmount;
    //此标创建的时间
    private Date createTime;
    //借款用途
    private String purpose;
    //标的名称
    private String title;
    //此标对应的类型表主键
    private Integer typeId;

    public SubjectMatter(Long id, String matterNo, Integer status, Long debtorUserId, BigDecimal loanAmount, Date createTime, String purpose, String title, Integer typeId) {
        this.id = id;
        this.matterNo = matterNo;
        this.status = status;
        this.debtorUserId = debtorUserId;
        this.loanAmount = loanAmount;
        this.createTime = createTime;
        this.purpose = purpose;
        this.title = title;
        this.typeId = typeId;
    }

    public SubjectMatter() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMatterNo() {
        return matterNo;
    }

    public void setMatterNo(String matterNo) {
        this.matterNo = matterNo;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Long getDebtorUserId() {
        return debtorUserId;
    }

    public void setDebtorUserId(Long debtorUserId) {
        this.debtorUserId = debtorUserId;
    }

    public BigDecimal getLoanAmount() {
        return loanAmount;
    }

    public void setLoanAmount(BigDecimal loanAmount) {
        this.loanAmount = loanAmount;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose == null ? null : purpose.trim();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }
}