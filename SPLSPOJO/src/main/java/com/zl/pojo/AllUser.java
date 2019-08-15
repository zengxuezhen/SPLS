package com.zl.pojo;

import java.io.Serializable;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * 用户实体类——>映射数据库all_user表
 * @author Administrator
 *
 */
public class AllUser implements Serializable {
	
	private static final long serialVersionUID = -3999875067771931377L;
	//主键
    private Long id;
    //用户名
    private String userName;
    //密码
    private String pwd;
    //电话号码
    private String telephone;
    //头像
    private String avater;
    //邮箱
    private String email;
    //实名认证ID
    private Long verificationId;
    //账号创建时间
    @JsonFormat(pattern="yyyy-MM-dd HH-mm-ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH-mm-ss")
    private Date createTime;

    public AllUser(Long id, String userName, String pwd, String telephone, String avater, String email, Long verificationId, Date createTime) {
        this.id = id;
        this.userName = userName;
        this.pwd = pwd;
        this.telephone = telephone;
        this.avater = avater;
        this.email = email;
        this.verificationId = verificationId;
        this.createTime = createTime;
    }

    public AllUser() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd == null ? null : pwd.trim();
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone == null ? null : telephone.trim();
    }

    public String getAvater() {
        return avater;
    }

    public void setAvater(String avater) {
        this.avater = avater == null ? null : avater.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public Long getVerificationId() {
        return verificationId;
    }

    public void setVerificationId(Long verificationId) {
        this.verificationId = verificationId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

	@Override
	public String toString() {
		return "AllUser [id=" + id + ", userName=" + userName + ", pwd=" + pwd + ", telephone=" + telephone
				+ ", avater=" + avater + ", email=" + email + ", verificationId=" + verificationId + ", createTime="
				+ createTime + "]";
	}
    
}