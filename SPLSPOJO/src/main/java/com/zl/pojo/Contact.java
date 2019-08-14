package com.zl.pojo;

import java.io.Serializable;

/**
 * 联系人实体类
 * @author Administrator
 * 映射数据库表CONTACT
 */
public class Contact implements Serializable {
    
	private static final long serialVersionUID = 4154538230974324496L;
	//主键ID，自增
	private Long id;
	//联系人姓名
    private String contactName;
    //联系人手机号
    private String telephone;
    //联系人与用户关系
    private String relationsihp;
    //所属贷款人主键
    private Long personalLoanInfoId;

    public Contact(Long id, String contactName, String telephone, String relationsihp, Long personalLoanInfoId) {
        this.id = id;
        this.contactName = contactName;
        this.telephone = telephone;
        this.relationsihp = relationsihp;
        this.personalLoanInfoId = personalLoanInfoId;
    }

    public Contact() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName == null ? null : contactName.trim();
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone == null ? null : telephone.trim();
    }

    public String getRelationsihp() {
        return relationsihp;
    }

    public void setRelationsihp(String relationsihp) {
        this.relationsihp = relationsihp == null ? null : relationsihp.trim();
    }

    public Long getPersonalLoanInfoId() {
        return personalLoanInfoId;
    }

    public void setPersonalLoanInfoId(Long personalLoanInfoId) {
        this.personalLoanInfoId = personalLoanInfoId;
    }
}