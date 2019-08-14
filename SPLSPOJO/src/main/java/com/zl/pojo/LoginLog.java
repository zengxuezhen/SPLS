package com.zl.pojo;

import java.io.Serializable;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * 登录日志信息实体类
 * @author Administrator
 * 映射数据库表LOGIN_LOG
 */
public class LoginLog implements Serializable {
    
	private static final long serialVersionUID = 8836387612456864863L;
	//主键
	private Long id;
	//登录日志编号
    private String logNo;
    //登录IP地址
    private String ipAddress;
    //登录是否成功
    private Integer isSuccess;
    //登录系统时间
    @JsonFormat(pattern="yyyy-MM-dd HH-mm-ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH-mm-ss")
    private Date loginTime;
    //退出系统时间
    @JsonFormat(pattern="yyyy-MM-dd HH-mm-ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH-mm-ss")
    private Date logoutTime;
    //登录用户主键
    private Long userId;
    
    public LoginLog(Long id, String logNo, String ipAddress, Integer isSuccess, Date loginTime, Date logoutTime, Long userId) {
        this.id = id;
        this.logNo = logNo;
        this.ipAddress = ipAddress;
        this.isSuccess = isSuccess;
        this.loginTime = loginTime;
        this.logoutTime = logoutTime;
        this.userId = userId;
    }

    public LoginLog() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogNo() {
        return logNo;
    }

    public void setLogNo(String logNo) {
        this.logNo = logNo;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress == null ? null : ipAddress.trim();
    }

    public Integer getIsSuccess() {
        return isSuccess;
    }

    public void setIsSuccess(Integer isSuccess) {
        this.isSuccess = isSuccess;
    }

    public Date getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(Date loginTime) {
        this.loginTime = loginTime;
    }

    public Date getLogoutTime() {
        return logoutTime;
    }

    public void setLogoutTime(Date logoutTime) {
        this.logoutTime = logoutTime;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}