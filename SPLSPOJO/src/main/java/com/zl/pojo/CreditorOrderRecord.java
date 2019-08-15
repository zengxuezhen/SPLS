package com.zl.pojo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * 债权人转让信息订单记录表
 * @author Administrator
 * 映射数据库表CREDITOR_ORDER_RECORD
 */
public class CreditorOrderRecord implements Serializable {
    
	private static final long serialVersionUID = -6713488017540259630L;
	//主键
	private Long id;
	//转让编号
    private Long recordNo;
    //买入债权用户
    private Long buyerUerId;
    //转让金额
    private BigDecimal amount;
    //债权对应的原标
    private Long subjectMatterId;
    //合同借据路径
    private String contractUrl;
    //转让记录生成时间
    @JsonFormat(pattern="yyyy-MM-dd HH-mm-ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH-mm-ss")
    private Date createTime;
    //卖出债权用户
    private Long sellerUserId;
    //原始标的ID
    private Long originSubjectMatterId;

    public CreditorOrderRecord(Long id, Long recordNo, Long buyerUerId, BigDecimal amount, Long subjectMatterId, String contractUrl, Date createTime, Long sellerUserId, Long originSubjectMatterId) {
        this.id = id;
        this.recordNo = recordNo;
        this.buyerUerId = buyerUerId;
        this.amount = amount;
        this.subjectMatterId = subjectMatterId;
        this.contractUrl = contractUrl;
        this.createTime = createTime;
        this.sellerUserId = sellerUserId;
        this.originSubjectMatterId = originSubjectMatterId;
    }

    public CreditorOrderRecord() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRecordNo() {
        return recordNo;
    }

    public void setRecordNo(Long recordNo) {
        this.recordNo = recordNo;
    }

    public Long getBuyerUerId() {
        return buyerUerId;
    }

    public void setBuyerUerId(Long buyerUerId) {
        this.buyerUerId = buyerUerId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Long getSubjectMatterId() {
        return subjectMatterId;
    }

    public void setSubjectMatterId(Long subjectMatterId) {
        this.subjectMatterId = subjectMatterId;
    }

    public String getContractUrl() {
        return contractUrl;
    }

    public void setContractUrl(String contractUrl) {
        this.contractUrl = contractUrl == null ? null : contractUrl.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Long getSellerUserId() {
        return sellerUserId;
    }

    public void setSellerUserId(Long sellerUserId) {
        this.sellerUserId = sellerUserId;
    }

    public Long getOriginSubjectMatterId() {
        return originSubjectMatterId;
    }

    public void setOriginSubjectMatterId(Long originSubjectMatterId) {
        this.originSubjectMatterId = originSubjectMatterId;
    }
}