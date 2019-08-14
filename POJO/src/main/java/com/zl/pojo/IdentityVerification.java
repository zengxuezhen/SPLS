package com.zl.pojo;

import java.io.Serializable;

/**
 * 实名身份信息实体类
 * @author Administrator
 * 映射数据库表IDENTITY_VERIFICATION
 */
public class IdentityVerification implements Serializable {
    
	private static final long serialVersionUID = -5478556733543216208L;
	//主键
	private Integer id;
	//身份证号
    private String cardNo;
    //身份证姓名
    private String realName;
    //对应的用户主键
    private Integer userId;

    public IdentityVerification(Integer id, String cardNo, String realName, Integer userId) {
        this.id = id;
        this.cardNo = cardNo;
        this.realName = realName;
        this.userId = userId;
    }

    public IdentityVerification() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo == null ? null : cardNo.trim();
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName == null ? null : realName.trim();
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}