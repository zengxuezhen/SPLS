package com.zl.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

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
	List<Credit> selectCreditBySubjectId(Long id);
	/*
	 * 根据debtorUserId出借人ID和subjectId原始标的ID修改amount金额 
	 */
	int updateCreditAmount(Credit credit);
	
	Credit selectCreditByUserIdAndSubjectId(@Param("userId")long userId,@Param("subjectId")long subjectId );
}
