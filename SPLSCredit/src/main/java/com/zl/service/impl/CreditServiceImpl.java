package com.zl.service.impl;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.zl.dao.CreditDao;
import com.zl.dao.SubjectMatterMapper;
import com.zl.pojo.Credit;
import com.zl.pojo.CreditorOrderRecord;
import com.zl.pojo.SubjectMatter;
import com.zl.service.CreditService;

@Service
public class CreditServiceImpl implements CreditService {
	@Autowired
	private CreditDao cd;
	@Autowired
	private SubjectMatterMapper sd;
	/*
	 * 添加credit债权表
	 * */
	@Override
	public int addCredit(CreditorOrderRecord creditorOrderRecord) throws JsonParseException, JsonMappingException, IOException {
		
		Credit credit=new Credit();
		credit.setCreditNo(System.nanoTime()+"");
		SubjectMatter sm=sd.selectByPrimaryKey(new BigDecimal(creditorOrderRecord.getOriginSubjectMatterId()));
		
		
		credit.setCreditorUserId(sm.getDebtorUserId());
		credit.setDebitorUserId(creditorOrderRecord.getBuyerUerId());
		credit.setSubjectId(creditorOrderRecord.getOriginSubjectMatterId());
		credit.setAmount(creditorOrderRecord.getAmount());
		int line=cd.insertCredit(credit);
		return line;
	}
	/*
	 * 更新债权表credit金额
	 * */
	public int modifyCreditAmount(CreditorOrderRecord creditorOrderRecord) {
		Credit credit=new Credit();
		credit.setDebitorUserId(creditorOrderRecord.getBuyerUerId());
		credit.setSubjectId(creditorOrderRecord.getOriginSubjectMatterId());
		int line=cd.updateCreditAmount(credit);
		return line;
		
	}
	
	@Override
	public Credit queryCreditById(Long id) {
		Credit credit=cd.selectCreditById(id);
		return credit;
	}

	@Override
	public List<Credit> queryCreditBySubjectId(Long subjectId) {
		List<Credit>credits=cd.selectCreditBySubjectId(subjectId);
		return credits;
	}
	
	@Override
	public Credit queryCreditByDebitorUserIdAndSubjectId(Credit credit) {
		credit=cd.selectCreditByDebitorUserIdAndSubjectId(credit);
		return null;
	}
	
	
}
