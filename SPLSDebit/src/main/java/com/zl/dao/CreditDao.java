package com.zl.dao;

import java.util.List;

import com.zl.pojo.Credit;
import com.zl.pojo.CreditorOrderRecord;

public interface CreditDao {
	Credit selectCreditById(Long id);
	int insertCredit(Credit credit);
	List<Credit> selectCreditBySubjectId(Long id);
}
