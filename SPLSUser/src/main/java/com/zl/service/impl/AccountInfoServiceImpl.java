package com.zl.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zl.dao.AccountInfoDao;
import com.zl.pojo.AccountInfo;
import com.zl.service.AccountInfoService;
@Service
public class AccountInfoServiceImpl implements AccountInfoService{
	@Autowired
	private AccountInfoDao ad;
	@Override	
	public AccountInfo queryAccountInfoByUserId(Long userId) {
		
		return ad.selectAccountInfoByUserId(userId);
	}
	
	@Override
	public int addAccountInfo(AccountInfo accountInfo) {
		
		int line=ad.insertAccountInfo(accountInfo);
		
		return line;
	}
	
	@Override
	public int modifyAccountInfoActiveAmountByUserId(AccountInfo accountInfo) {
		
		int line=ad.updateAccountInfoActiveAmountByUserId(accountInfo);
		
		return line;
	}

	@Override
	public int modifyAccountInfoMaxAmountByUserId(AccountInfo accountInfo) {
		int line=ad.updateAccountInfoMaxAmountByUserId(accountInfo);
		return line;
	}
	
}
