package com.zl.service;


import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.zl.pojo.CreditorOrderRecord;
/*
 * 债权订单记录表Service层接口，调用Dao层接口
 * */
public interface CreditorOrderRecordService {
	/**
	 * 添加债权订单记录
	 * @param orderRecord
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	int addCreditorOrderRecord(CreditorOrderRecord orderRecord) throws JsonParseException, JsonMappingException, IOException;
	/**根据ID查询
	 * 
	 * @param id
	 * @return
	 */
	CreditorOrderRecord queryOrderRecordById(Long id);
	/**
	 * 根据原始标的表ID查询该标的所有订单信息
	 * @param originSubjectId
	 * @return
	 */
	List<CreditorOrderRecord> queryOrderRecordByOriginSubjectId(Long originSubjectId);
	/**
	 * 按本标的ID获取未成标标的已筹集金额
	 * @param subjectId
	 * @return
	 */
	BigDecimal queryRaisedAmountBySubjectId(Long subjectId);
}
