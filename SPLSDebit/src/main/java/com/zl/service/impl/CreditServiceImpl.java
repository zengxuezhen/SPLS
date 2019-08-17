package com.zl.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zl.dao.CreditDao;
import com.zl.pojo.Credit;
import com.zl.pojo.CreditorOrderRecord;
import com.zl.service.CreditService;

@Service
public class CreditServiceImpl implements CreditService {
	@Autowired
	private CreditDao cd;
	@Override
	public int addCredit(CreditorOrderRecord creditorOrderRecord) {
		
		Credit credit=new Credit();
		credit.setCreditNo(System.nanoTime()+"");
		credit.setDebitorUserId(creditorOrderRecord.getBuyerUerId());
		int line=cd.insertCredit(credit);
		return line;
	}
	
	@Override
	public Credit queryCreditById(Long id) {
		Credit credit=cd.selectCreditById(id);
		return credit;
	}

	@Override
	public List<Credit> queryCreditBySubjectId(Long id) {
		List<Credit>credits=cd.selectCreditBySubjectId(id);
		return credits;
	}

}
