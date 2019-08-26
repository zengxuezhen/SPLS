package com.zl.dao;

import com.zl.pojo.OperationLog;

/**
 * 对操作日志表的持久层操作
 * @author 王静
 *
 */
public interface OperationLogDao {
	/**
	 * 添加操作日志
	 * @param log
	 * @return
	 */
	int insertOperationLog(OperationLog log);
	
}
