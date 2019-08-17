package com.zl.service;

import java.util.List;

import com.zl.pojo.Credit;
import com.zl.pojo.CreditorOrderRecord;

/*
 * 债权表Service层接口，调用Dao层接口
 * */
public interface CreditService {
	/*添加债权表
	 * 
	 * */
	int addCredit(CreditorOrderRecord creditorOrderRecord);
	//按ID查询债权表
	Credit queryCreditById(Long id);
	//按标的表外键查询债权表
	List<Credit> queryCreditBySubjectId(Long id);
}
