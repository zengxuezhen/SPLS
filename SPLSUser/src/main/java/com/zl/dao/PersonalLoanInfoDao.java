package com.zl.dao;
import java.util.List;

import com.zl.pojo.PersonalLoanInfo;
import com.zl.query.Paging;
/**
 * 个人贷款信息表Dao层接口，调用mapper映射文件操作数据库
 * @author Administrator
 *
 */
public interface PersonalLoanInfoDao {
	/**
	 * 插入个人贷款信息
	 * @param personalLoanInfo
	 * @return
	 */
	int insertPersonalLoanInfo(PersonalLoanInfo personalLoanInfo);
	PersonalLoanInfo selectPersonalLoanInfoById(Long id);
	List<PersonalLoanInfo> selectPernalLoanInfoByUserId(Long userId,Paging paging);
}
