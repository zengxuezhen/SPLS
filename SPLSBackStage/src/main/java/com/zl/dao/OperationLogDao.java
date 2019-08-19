package com.zl.dao;

import com.zl.pojo.OperationLog;

/*
 * 操作日志表Dao层，调用mapper映射文件操作数据库operation_log表
 * */
public interface OperationLogDao {
	/*
	 * 向operation_log表中插入数据
	 * */
	int insertOperationLog(OperationLog operationLog);
}
