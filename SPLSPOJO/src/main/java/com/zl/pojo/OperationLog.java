package com.zl.pojo;

import java.io.Serializable;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * 操作日志记录实体类
 * @author Administrator
 * 映射数据库表OPERATION_LOG
 */
public class OperationLog implements Serializable {
    
	private static final long serialVersionUID = -326241064260282496L;
	//主键
	private Long id;
	//操作用户主键
    private Long userId;
    //操作类型
    private Integer typeId;
    //是否成功
    private Integer isSuccess;
    //操作时间
    @JsonFormat(pattern="yyyy-MM-dd HH-mm-ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH-mm-ss")
    private Date createTime;
    
    public OperationLog(Long id, Long userId, Integer typeId, Integer isSuccess, Date createTime) {
        this.id = id;
        this.userId = userId;
        this.typeId = typeId;
        this.isSuccess = isSuccess;
        this.createTime = createTime;
    }

    public OperationLog() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public Integer getIsSuccess() {
        return isSuccess;
    }

    public void setIsSuccess(Integer isSuccess) {
        this.isSuccess=isSuccess;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}