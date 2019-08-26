package com.zl.view;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * 用于封装前端回账记录显示数据对象
 * @author Administrator
 *
 */
public class ReturnRecordView implements Serializable {
	
	private static final long serialVersionUID = -3656271913569758687L;
	//标的信息
	private Long id;
	private String matterNo;
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date stime;
	//债权信息
	private BigDecimal cmount;
	//回账信息
	private BigDecimal rmount;
	private Integer term;
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date rtime;
	
	public String getMatterNo() {
		return matterNo;
	}
	public void setMatterNo(String matterNo) {
		this.matterNo = matterNo;
	}
	public Date getStime() {
		return stime;
	}
	public void setStime(Date stime) {
		this.stime = stime;
	}
	public BigDecimal getCmount() {
		return cmount;
	}
	public void setCmount(BigDecimal cmount) {
		this.cmount = cmount;
	}
	public BigDecimal getRmount() {
		return rmount;
	}
	public void setRmount(BigDecimal rmount) {
		this.rmount = rmount;
	}
	public Integer getTerm() {
		return term;
	}
	public void setTerm(Integer term) {
		this.term = term;
	}
	public Date getRtime() {
		return rtime;
	}
	public void setRtime(Date rtime) {
		this.rtime = rtime;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	@Override
	public String toString() {
		return "ReturnRecordView [id=" + id + ", matterNo=" + matterNo + ", stime=" + stime + ", cmount=" + cmount
				+ ", rmount=" + rmount + ", term=" + term + ", rtime=" + rtime + "]";
	}
	
}
