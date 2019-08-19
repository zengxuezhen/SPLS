package com.zl.service.impl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zl.api.UserServiceApi;
import com.zl.dao.CreditorOrderRecordDao;
import com.zl.pojo.AccountInfo;
import com.zl.pojo.BankCard;
import com.zl.pojo.CreditorOrderRecord;
import com.zl.service.CreditorOrderRecordService;

@Service
public class CreditorOrderRecordServiceImpl implements CreditorOrderRecordService {
	@Autowired
	private CreditorOrderRecordDao cd;
	@Autowired
	private UserServiceApi usa;
	/*
	 * 向债权订单记录表中插入数据
	 * */
	@Override
	public int addCreditorOrderRecord(CreditorOrderRecord orderRecord) throws JsonParseException, JsonMappingException, IOException {
		//验证用户是否绑定银行卡
		ObjectMapper mapper=new ObjectMapper();
		
		
		//验证用户余额是否充足
		String result=usa.getAccountInfo(orderRecord.getBuyerUerId());
		AccountInfo ac=mapper.readValue(result,AccountInfo.class);
		if(ac.getActiveAmount().compareTo(orderRecord.getAmount())==1) {
			int line=cd.insertCreditorOrderRecord(orderRecord);
			return line;
		}
		
		return 0;
		
		
	}

	@Override
	public CreditorOrderRecord queryOrderRecordById(Long id) {
		CreditorOrderRecord creditorOrderRecord=cd.selectOrderRecordById(id);
		return creditorOrderRecord;
	}

	@Override
	public List<CreditorOrderRecord> queryOrderRecordByOriginSubjectId(Long originSubjectId) {
		List<CreditorOrderRecord> orderRecords=cd.selectOrderRecordByOriginSubjectId(originSubjectId);
		return orderRecords;
	}
	
	
	
	
}
