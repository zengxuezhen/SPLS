package com.zl.service.impl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zl.api.CreditServiceApi;
import com.zl.dao.CreditDao;
import com.zl.pojo.Credit;
import com.zl.pojo.CreditorOrderRecord;
import com.zl.pojo.SubjectMatter;
import com.zl.service.CreditService;

@Service
public class CreditServiceImpl implements CreditService {
	@Autowired
	private CreditDao cd;
	@Autowired
	private CreditServiceApi csa;
	/*
	 * 添加credit债权表
	 * */
	@Override
	public int addCredit(CreditorOrderRecord creditorOrderRecord) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper=new ObjectMapper();
		Credit credit=new Credit();
		credit.setCreditNo(System.nanoTime()+"");
		String result=csa.getSubjectMatter(creditorOrderRecord.getOriginSubjectMatterId());
		SubjectMatter sm=new SubjectMatter();
		sm=mapper.readValue(result, SubjectMatter.class);
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
	public List<Credit> queryCreditBySubjectId(Long id) {
		List<Credit>credits=cd.selectCreditBySubjectId(id);
		return credits;
	}
	@Override
	public Credit selectCreditByUserIdAndSubjectId(long userId, long subjectId) {
		// TODO Auto-generated method stub
		return	cd.selectCreditByUserIdAndSubjectId(userId, subjectId);
	}

}
