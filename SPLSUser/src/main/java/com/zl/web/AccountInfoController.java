package com.zl.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	@GetMapping(path="/getAccountInfoByUserId")
	/**
	 * 根据用户ID查询平台账户信息
	 * @param userId
	 * @return accountInfo对象
	 */
	public Map<String, Object> getAccountInfoByUserId(@RequestBody Long userId) {
		AccountInfo accountInfo=as.queryAccountInfoByUserId(userId);
		Map<String, Object> result=new HashMap<String, Object>();
		result.put("accountInfo", accountInfo);
		return result;
		
	}
	
	@PostMapping(path="addAccountInfo")
	/**
	 * 添加平台账户信息
	 * @param accountInfo 平台账户对象
	 * @return 影响条数
	 */
	public Map<String, Object> addAccountInfo(@RequestBody AccountInfo accountInfo){
		Map<String, Object> result=new HashMap<String,Object>();
		int line=as.addAccountInfo(accountInfo);
		result.put("line", line);
		return result;
		
	}
	
	@PutMapping(path="modifyAccountInfoByUserId")
	/**
	 * 根据UserID修改AccountInfo平台个人账户信息
	 * @param accountInfo
	 * @return 影响行数
	 */
	public Map<String, Object> modifyAccountInfo(@RequestBody AccountInfo accountInfo ){
		Map<String, Object> result= new HashMap<String,Object>();
		int line= as.modifyAccountInfoByUserId(accountInfo);
		result.put("line", line);
		return result;
		
	}
}
