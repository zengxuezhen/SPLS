package com.zl.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.zl.pojo.Credit;
import com.zl.pojo.CreditorOrderRecord;

/*
 * 债权表Service层接口，调用Dao层接口
 * */
public interface CreditService {
	/*添加债权表
	 * 
	 * */
	int addCredit(CreditorOrderRecord creditorOrderRecord) throws JsonParseException, JsonMappingException, IOException;
	/*按ID查询债权表
	 * 
	 */
	Credit queryCreditById(Long id);
	/*按标的表外键查询债权表
	*/
	List<Credit> queryCreditBySubjectId(Long subjecId);
	/* 
	 *根据debtorUserId出借人ID和subjectId原始标的ID修改amount金额 
	 **/
	int modifyCreditAmount(CreditorOrderRecord creditorOrderRecord);
	/**
	 * 根据debtorUserId出借人ID和subjectId原始标的ID查询债权表
	 * @param credit
	 * @return
	 */
	Credit queryCreditByDebitorUserIdAndSubjectId(Credit credit);
	
}
