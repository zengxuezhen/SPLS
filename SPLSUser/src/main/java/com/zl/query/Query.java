package com.zl.query;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * 交易记录检索条件对象
 * @author Administrator
 *
 */
public class Query {
	//所属用户
	private Long queryUserId;
	//交易类型
	private Integer queryMethod;
	//查询交易开始时间
	@JsonFormat(pattern="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
	private Date queryStartDate;
	//查询交易截止时间
	@JsonFormat(pattern="yyyy-MM-dd")
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date queryStopDate;
	
	public Long getQueryUserId() {
		return queryUserId;
	}
	public void setQueryUserId(Long queryUserId) {
		this.queryUserId = queryUserId;
	}
	public Integer getQueryMethod() {
		return queryMethod;
	}
	public void setQueryMethod(Integer queryMethod) {
		this.queryMethod = queryMethod;
	}
	public Date getQueryStartDate() {
		return queryStartDate;
	}
	public void setQueryStartDate(Date queryStartDate) {
		this.queryStartDate = queryStartDate;
	}
	public Date getQueryStopDate() {
		return queryStopDate;
	}
	public void setQueryStopDate(Date queryStopDate) {
		this.queryStopDate = queryStopDate;
	}
	@Override
	public String toString() {
		return "Query [queryUserId=" + queryUserId + ", queryMethod=" + queryMethod + ", queryStartDate="
				+ queryStartDate + ", queryStopDate=" + queryStopDate + "]";
	}
}
