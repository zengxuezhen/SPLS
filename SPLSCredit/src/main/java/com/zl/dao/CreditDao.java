package com.zl.dao;

import java.util.List;
import java.util.Map;

import com.zl.pojo.Credit;
import com.zl.pojo.CreditorOrderRecord;
/*
 * 债权表Dao层接口，调用Mapper映射文件，操作数据库Credit表
 * */
public interface CreditDao {
	/*按ID查询credit表
	 * 
	 * */
	Credit selectCreditById(Long id);
	/*向credit表插入数据
	 * 
	 * */
	int insertCredit(Credit credit);
	/*
	 * 根据原始标的ID查询债权表
	 */
	List<Credit> selectCreditBySubjectId(Long subjectId);
	/*
	 * 根据debtorUserId出借人ID和subjectId原始标的ID修改amount金额 
	 */
	int updateCreditAmount(Credit credit);
	
	/**
	 * 根据用户主键查询对应所拥有的债权信息
	 * @author 王静
	 * @return
	 */
	List<Credit> selectCreditByCreditorAndState(Map<String, Object> map);
}
