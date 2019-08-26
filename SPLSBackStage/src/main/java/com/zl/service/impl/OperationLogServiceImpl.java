package com.zl.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zl.dao.OperationLogDao;
import com.zl.pojo.OperationLog;
import com.zl.service.OperationLogService;
/*
 * 操作日志service层接口实现类
 * */
@Service
public class OperationLogServiceImpl implements OperationLogService {
	
	@Autowired
	private OperationLogDao od;	
	/*
	 * 调用dao层接口，OperationLog表添加数据
	 * */
	@Override
	public int addOperationLog(OperationLog operationLog) {
		operationLog.setCreateTime(new Date());
		int line=od.insertOperationLog(operationLog);
		return line;
	}

}
