package com.zl.service;

import java.util.List;

import com.zl.pojo.PersonalLoanInfo;
import com.zl.query.Paging;
/**
 * 个人贷款信息表Service层接口
 * @author Administrator
 *
 */
public interface PersonalLoanInfoService {
	/**
	 * 插入个人贷款信息数据
	 * @param personalLoanInfo
	 * @return
	 */
	int addPersonalLoanInfo(PersonalLoanInfo personalLoanInfo);
	/**
	 * 根据ID查询个人贷款信息
	 * @param id
	 * @return
	 */
	PersonalLoanInfo queryPersonalLoanInfoById(Long id);
	/**
	 * 根据用户ID查询个人贷款信息
	 * @param userId
	 * @return
	 */
	PersonalLoanInfo queryPersonalLoanInfoByUserId(Long userId);
	/**
	 * 根据审核状态查询个人贷款信息
	 * @param status
	 * @param paging
	 * @return
	 */
	List<PersonalLoanInfo> queryPersonalLoanInfoByStatus(Integer status);
	/**
	 * 根据id修改审核状态
	 * @param personalLoanInfo
	 * @return
	 */
	int modifyPersonalLoanInfoStatusById(PersonalLoanInfo personalLoanInfo);
}
