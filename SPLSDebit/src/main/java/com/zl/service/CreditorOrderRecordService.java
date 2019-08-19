package com.zl.service;


import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.zl.pojo.CreditorOrderRecord;
/*
 * 债权订单记录表Service层接口，调用Dao层接口
 * */
public interface CreditorOrderRecordService {
	//添加债权订单记录
	int addCreditorOrderRecord(CreditorOrderRecord orderRecord) throws JsonParseException, JsonMappingException, IOException;
	//根据ID查询
	CreditorOrderRecord queryOrderRecordById(Long id);
	//根据原始标的表ID查询该标的所有订单信息
	List<CreditorOrderRecord> queryOrderRecordByOriginSubjectId(Long originSubjectId);
}
