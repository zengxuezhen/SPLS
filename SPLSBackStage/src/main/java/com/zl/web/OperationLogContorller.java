package com.zl.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zl.pojo.OperationLog;
import com.zl.service.OperationLogService;

@RestController
public class OperationLogContorller {
	@Autowired
	private OperationLogService os;
	
	@PostMapping
	public Map<String, Object> addOperationLog(OperationLog operationLog){
		int line=os.addOperationLog(operationLog);
		Map<String, Object> result=new HashMap<String, Object>();
		result.put("line",line );
		return result;
		
	}
}
