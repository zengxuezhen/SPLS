package com.zl.service.impl;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zl.dao.CreditorOrderRecordMapper;
import com.zl.pojo.CreditorOrderRecord;
import com.zl.service.CreditorOrderRecordService;
@Service
public class CreditorOrderRecordServiceImpl implements CreditorOrderRecordService{
	@Autowired
	private CreditorOrderRecordMapper cors;
	public int deleteByPrimaryKey(BigDecimal id) {
		return cors.deleteByPrimaryKey(id);
	}

    public  int insert(CreditorOrderRecord record) {
    	return cors.insert(record);
    }
    public  CreditorOrderRecord selectByPrimaryKey(BigDecimal id) {
	    return cors.selectByPrimaryKey(id);
    }
    public int updateByPrimaryKeySelective(CreditorOrderRecord record) {
    	return cors.updateByPrimaryKey(record);
    }



	@Override
	public int updateByPrimaryKey(CreditorOrderRecord record) {
		// TODO Auto-generated method stub
		return 0;
	}
}