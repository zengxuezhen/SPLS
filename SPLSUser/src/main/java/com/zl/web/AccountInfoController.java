package com.zl.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zl.api.CreditorOrderRecordAPIService;
import com.zl.pojo.AccountInfo;
import com.zl.pojo.CreditorOrderRecord;
import com.zl.service.AccountInfoService;

@RestController
@RequestMapping("/acountInfo")
public class AccountInfoController {
	@Autowired
	private AccountInfoService as;
	@Autowired
	private CreditorOrderRecordAPIService cas;
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
	
	@PostMapping(path="/addAccountInfo")
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
	
	@PutMapping(path="/modifyActiveAmount")
	/**
	 * 根据UserID修改AccountInfo平台个人账户可用金额
	 * @param accountInfo
	 * @return 影响行数
	 */
	public Map<String, Object> modifyActiveAmount(@RequestBody AccountInfo accountInfo ){
		Map<String, Object> result= new HashMap<String,Object>();
		int line= as.modifyAccountInfoActiveAmountByUserId(accountInfo);
		result.put("line", line);
		return result;
		
	}
	/**
	 * 根据UserID批量修改AccountInfo平台个人账户可用金额
	 * @param accountInfo
	 * @return 影响行数
	 */
	@PutMapping(value="/modifyActiveAmountBatch")
	public int modifyActiveAmountBatch(@RequestBody List<AccountInfo> accountList){
		return as.modifyAccountInfoActiveAmountBatch(accountList);
		
	}
	@PutMapping(path="/modifyMaxAmount")
	/**
	 * 根据UserID修改AccountInfo平台个人贷款额度
	 * @param accountInfo
	 * @return
	 */
	public Map<String, Object> modifyMaxAmount(@RequestBody AccountInfo accountInfo ){
		Map<String, Object> result= new HashMap<String,Object>();
		int line= as.modifyAccountInfoMaxAmountByUserId(accountInfo);
		result.put("line", line);
		return result;
		
	}
	
	@PutMapping(value="/modifyAmount")
	@Transactional
	/**
	 * 未满标退款
	 * @param subjectIdList
	 * @return
	 */
	public int modifyAmount(@RequestBody List<Long> subjectIdList){
		List<AccountInfo> accountList = new ArrayList<AccountInfo>();
		for (Long subjectId : subjectIdList) {
			AccountInfo accountInfo = new AccountInfo();
			CreditorOrderRecord orderRecord= cas.getOrderRecordBySubjectId(subjectId);
			accountInfo.setUserId(orderRecord.getBuyerUerId());
			accountInfo.setActiveAmount(orderRecord.getAmount());
			accountList.add(accountInfo);
		}
		
		return as.modifyAccountInfoActiveAmountByUserId(accountList);
		
	}
}
