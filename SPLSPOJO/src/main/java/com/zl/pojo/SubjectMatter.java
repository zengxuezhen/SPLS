package com.zl.pojo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * 标（产品）的实体类
 * @author Administrator
 * 映射数据库表SUBJECT_MATTER
 */
public class SubjectMatter implements Serializable {
    
	@Override
	public String toString() {
		return "SubjectMatter [id=" + id + ", matterNo=" + matterNo + ", status=" + status + ", debtorUserId="
				+ debtorUserId + ", loanAmount=" + loanAmount + ", isCredit=" + isCredit + ", createTime=" + createTime
				+ ", filledTime=" + filledTime + ", purpose=" + purpose + ", title=" + title + ", typeId=" + typeId
				+ ", originSubjectMatterId=" + originSubjectMatterId + ", repaymentRecordList=" + repaymentRecordList
				+ ", overdueRecordList=" + overdueRecordList + ", subjectMatterType=" + subjectMatterType
				+ ", creditList=" + creditList + "]";
	}

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
    //0:不是债权转让标的 1：是债权转让标的
    private String isCredit;
    //此标创建的时间
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date createTime;
    //满标时间
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date filledTime;
    //借款用途
    private String purpose;
    //标的名称
    private String title;
    //此标对应的类型表主键
    private Integer typeId;
    //债权人转让债权的原始标的Id
    private Long  originSubjectMatterId;
    //关联还款记录
    private List<RepaymentRecord> repaymentRecordList;
    public List<RepaymentRecord> getRepaymentRecordList() {
		return repaymentRecordList;
	}

	public void setRepaymentRecordList(List<RepaymentRecord> repaymentRecordList) {
		this.repaymentRecordList = repaymentRecordList;
	}

	//关联逾期记录
    private List<OverdueRecord> overdueRecordList;
    //关联标的类型
    private SubjectMatterType subjectMatterType;
    
    private List<Credit> creditList;

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

	public SubjectMatterType getSubjectMatterType() {
		return subjectMatterType;
	}

	public void setSubjectMatterType(SubjectMatterType subjectMatterType) {
		this.subjectMatterType = subjectMatterType;
	}

	public Date getFilledTime() {
		return filledTime;
	}

	public void setFilledTime(Date filledTime) {
		this.filledTime = filledTime;
	}

	public List<OverdueRecord> getOverdueRecordList() {
		return overdueRecordList;
	}

	public void setOverdueRecordList(List<OverdueRecord> overdueRecordList) {
		this.overdueRecordList = overdueRecordList;
	}

	public List<Credit> getCreditList() {
		return creditList;
	}

	public void setCreditList(List<Credit> creditList) {
		this.creditList = creditList;
	}

	public String getIsCredit() {
		return isCredit;
	}

	public void setIsCredit(String isCredit) {
		this.isCredit = isCredit;
	}

	public Long getOriginSubjectMatterId() {
		return originSubjectMatterId;
	}

	public void setOriginSubjectMatterId(Long originSubjectMatterId) {
		this.originSubjectMatterId = originSubjectMatterId;
	}



	
}