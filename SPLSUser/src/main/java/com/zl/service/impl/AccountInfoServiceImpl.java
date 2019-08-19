package com.zl.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.zl.dao.AccountInfoDao;
import com.zl.pojo.AccountInfo;
import com.zl.service.AccountInfoService;

public class AccountInfoServiceImpl implements AccountInfoService{
	@Autowired
	private AccountInfoDao ad;
	@Override	
	public AccountInfo queryAccountInfoByUserId(Long userId) {
		
		return ad.selectAccountInfoByUserId(userId);
	}
	
}
