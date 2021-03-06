package com.zl.dao;

import com.zl.pojo.CompanyCard;

/**
 * 【模拟】对公司银行卡表的持久层接口
 * @author 王静
 * 映射数据库表company_card
 */
public interface CompanyCardDao {

	/**
	 * 修改公司银行卡数据库金额
	 * @param pa
	 * @return
	 */
	int updateCompanyCard(CompanyCard cc);
	/**
	 * 查询公司银行卡
	 */
	CompanyCard selectCompanyCardById(Integer id);
}
