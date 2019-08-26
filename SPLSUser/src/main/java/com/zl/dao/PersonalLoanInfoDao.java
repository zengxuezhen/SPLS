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
	
	/**
	 * 根据ID查询个人贷款信息
	 * @param id
	 * @return
	 */
	PersonalLoanInfo selectPersonalLoanInfoById(Long id);
	
	/**
	 * 根据用户ID查询个人贷款信息
	 * @param userId
	 * @return
	 */
	PersonalLoanInfo selectPersonalLoanInfoByUserId(Long userId);
	
	/**
	 * 根据状态查询个人贷款信息
	 * @param status
	 * @param paging
	 * @return
	 */
	List<PersonalLoanInfo> selectPersonnalLoanInfoByStatus(Integer status);
	
	/**
	 * 根据ID修改个人贷款信息表状态
	 * @param personalLoanInfo
	 * @return
	 */
	int updatePersonalLoanInfoStatusById(PersonalLoanInfo personalLoanInfo);
}
