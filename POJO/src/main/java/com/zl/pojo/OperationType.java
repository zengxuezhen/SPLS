package com.zl.pojo;

import java.io.Serializable;

/**
 * 操作类型实体类
 * @author Administrator
 * 映射数据库表OPERATION_TYPE
 */
public class OperationType implements Serializable {
    
	private static final long serialVersionUID = -8006348378664032406L;
	//主键
	private Integer id;
	//操作类型
    private String operationType;

    public OperationType(Integer id, String operationType) {
        this.id = id;
        this.operationType = operationType;
    }

    public OperationType() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOperationType() {
        return operationType;
    }

    public void setOperationType(String operationType) {
        this.operationType = operationType == null ? null : operationType.trim();
    }
}