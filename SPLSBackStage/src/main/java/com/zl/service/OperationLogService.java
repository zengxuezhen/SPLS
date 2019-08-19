package com.zl.service;

import com.zl.pojo.OperationLog;

/*
 * 操作日志service层接口
 * */
public interface OperationLogService {
	/*
	 * 向操作日志表中插入数据
	 * */
	int addOperationLog(OperationLog operationLog);
}
