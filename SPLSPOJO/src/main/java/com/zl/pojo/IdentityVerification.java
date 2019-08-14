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
	private Long id;
	//身份证号
    private String cardNo;
    //身份证姓名
    private String realName;
    //对应的用户主键
    private Long userId;

    public IdentityVerification(Long id, String cardNo, String realName, Long userId) {
        this.id = id;
        this.cardNo = cardNo;
        this.realName = realName;
        this.userId = userId;
    }

    public IdentityVerification() {
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

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName == null ? null : realName.trim();
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}