package com.zl.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zl.dao.BankCardDao;
import com.zl.pojo.BankCard;
import com.zl.service.BankCardService;

@Service
public class BankCardServiceImpl implements BankCardService {
	@Autowired
	private BankCardDao bd;
	
	@Override
	public int rechargeBank(BankCard card) {
		return 0;
	}

	@Override
	public int withdrawBank(BankCard card) {
		return 0;
	}

	@Override
	public int addBankCard(BankCard card) {
		return bd.insertBankCard(card);
	}

	@Override
	public int deleteBankCard(Long userId) {
		return bd.deleteBankCard(userId);
	}

	@Override
	public BankCard queryBankCardByUserId(Long userId) {
		return bd.selectBankCardByUserId(userId);
	}

}
