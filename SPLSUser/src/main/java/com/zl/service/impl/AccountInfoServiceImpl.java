package com.zl.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zl.dao.AccountInfoDao;
import com.zl.pojo.AccountInfo;
import com.zl.pojo.CreditorOrderRecord;
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
		AccountInfo account=queryAccountInfoByUserId(accountInfo.getUserId());
		account.setActiveAmount(account.getActiveAmount().add(accountInfo.getActiveAmount()));
		int line=ad.updateAccountInfoActiveAmountByUserId(account);
		return line;
	}

	@Override
	public int modifyAccountInfoMaxAmountByUserId(AccountInfo accountInfo) {
		int line=ad.updateAccountInfoMaxAmountByUserId(accountInfo);
		return line;
	}
	
	@Override
	@Transactional
	public int modifyAccountInfoActiveAmountByUserId(List<AccountInfo> accountList) {
		for (AccountInfo accountInfo : accountList) {
			modifyAccountInfoActiveAmountByUserId(accountInfo);
		}
		return 1;
	}
	
	@Override
	public int modifyAccountInfoAmountByUserId(AccountInfo accountInfo) {
		AccountInfo account=queryAccountInfoByUserId(accountInfo.getUserId());
		account.setActiveAmount(account.getActiveAmount().add(accountInfo.getActiveAmount()));
		account.setFrozenAmount(account.getFrozenAmount().subtract(accountInfo.getActiveAmount()));
		int line=ad.updateAccountInfoActiveAmountByUserId(account);
		return line;
	}

	@Override
	@Transactional
	public int modifyAccountInfoActiveAmountBatch(List<AccountInfo> accountList) {
		for (AccountInfo accountInfo : accountList) {
			modifyAccountInfoActiveAmountByUserId(accountInfo);
		}
		return 1;
	}
}
