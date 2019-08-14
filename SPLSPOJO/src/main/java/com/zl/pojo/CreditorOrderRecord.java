package com.zl.pojo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 债权人转让信息订单记录表
 * @author Administrator
 * 映射数据库表CREDITOR_ORDER_RECORD
 */
public class CreditorOrderRecord implements Serializable {
    
	private static final long serialVersionUID = -6713488017540259630L;
	//主键
	private Integer id;
	//转让编号
    private Long recordNo;
    //买入债权用户
    private Integer buyerUerId;
    //转让金额
    private BigDecimal amount;
    //债权对应的原标
    private Integer subjectMatterId;
    //合同借据路径
    private String contractUrl;
    //转让记录生成时间
    private Date createTime;
    //卖出债权用户
    private Integer sellerUserId;
    //
    private Integer originSubjectMatterId;

    public CreditorOrderRecord(Integer id, Long recordNo, Integer buyerUerId, BigDecimal amount, Integer subjectMatterId, String contractUrl, Date createTime, Integer sellerUserId, Integer originSubjectMatterId) {
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getRecordNo() {
        return recordNo;
    }

    public void setRecordNo(Long recordNo) {
        this.recordNo = recordNo;
    }

    public Integer getBuyerUerId() {
        return buyerUerId;
    }

    public void setBuyerUerId(Integer buyerUerId) {
        this.buyerUerId = buyerUerId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Integer getSubjectMatterId() {
        return subjectMatterId;
    }

    public void setSubjectMatterId(Integer subjectMatterId) {
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

    public Integer getSellerUserId() {
        return sellerUserId;
    }

    public void setSellerUserId(Integer sellerUserId) {
        this.sellerUserId = sellerUserId;
    }

    public Integer getOriginSubjectMatterId() {
        return originSubjectMatterId;
    }

    public void setOriginSubjectMatterId(Integer originSubjectMatterId) {
        this.originSubjectMatterId = originSubjectMatterId;
    }
}