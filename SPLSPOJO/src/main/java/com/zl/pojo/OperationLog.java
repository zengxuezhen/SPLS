package com.zl.pojo;

import java.io.Serializable;
import java.util.Date;

/**
 * 操作日志记录实体类
 * @author Administrator
 * 映射数据库表OPERATION_LOG
 */
public class OperationLog implements Serializable {
    
	private static final long serialVersionUID = -326241064260282496L;
	//主键
	private Integer id;
	//操作用户主键
    private Integer userId;
    //操作类型
    private Integer typeId;
    //是否成功
    private String isSuccess;
    //操作时间
    private Date createTime;
    
    public OperationLog(Integer id, Integer userId, Integer typeId, String isSuccess, Date createTime) {
        this.id = id;
        this.userId = userId;
        this.typeId = typeId;
        this.isSuccess = isSuccess;
        this.createTime = createTime;
    }

    public OperationLog() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public String getIsSuccess() {
        return isSuccess;
    }

    public void setIsSuccess(String isSuccess) {
        this.isSuccess = isSuccess == null ? null : isSuccess.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}