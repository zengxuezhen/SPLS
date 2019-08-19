package com.zl.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zl.pojo.AccountInfo;
import com.zl.service.AccountInfoService;

@RestController
@RequestMapping("/acountInfo")
public class AccountInfoController {
	@Autowired
	private AccountInfoService as;
	@RequestMapping(path="/getAccountInfoByUserId")
	public Map<String, Object> getAccountInfoByUserId(@RequestBody Long userId) {
		AccountInfo accountInfo=as.queryAccountInfoByUserId(userId);
		Map<String, Object> result=new HashMap<String, Object>();
		result.put("accountInfo", accountInfo);
		return result;
		
	}
	
}
