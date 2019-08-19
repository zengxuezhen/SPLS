package com.zl.API;

import java.math.BigDecimal;

import org.springframework.stereotype.Component;

import com.zl.pojo.CreditorOrderRecord;
@Component
public class CreditorOrderRecordServiceError implements CreditorOrderRecordService {

	@Override
	public int deleteByPrimaryKey(BigDecimal id) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insert(CreditorOrderRecord record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public String queryAllCreditBySubjectMatterId(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateByPrimaryKey(CreditorOrderRecord record) {
		// TODO Auto-generated method stub
		return 0;
	}

}
