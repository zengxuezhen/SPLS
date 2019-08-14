package com.zl.pojo;

import java.io.Serializable;

/**
 * 银行卡信息实体类
 * @author Administrator
 * 映射数据库表BANK_CARD
 */
public class BankCard implements Serializable {
    
	private static final long serialVersionUID = 8438338913613342260L;
	//主键
	private Long id;
	//银行卡号
    private String cardNo;
    //银行卡所属银行
    private String branch;
    //银行卡预留手机号
    private String telephone;
    //所属用户主键
    private Long userId;
    
    public BankCard(Long id, String cardNo, String branch, String telephone, Long userId) {
        this.id = id;
        this.cardNo = cardNo;
        this.branch = branch;
        this.telephone = telephone;
        this.userId = userId;
    }

    public BankCard() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo == null ? null : cardNo.trim();
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch == null ? null : branch.trim();
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone == null ? null : telephone.trim();
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}