package com.zl.dao;

import com.zl.pojo.BankCard;

/**
 * 【模拟】用户银行卡表的持久层接口
 * @author 王静
 * 映射数据库表bank_card
 */
public interface BankCardDao {
	/**
	 * 根据用户ID查询其绑定的银行卡信息
	 * @param userId
	 * @return
	 */
	BankCard selectBankCardByUserId(Long userId);
	/**
	 * 在数据库为用户添加银行卡信息
	 * @param card
	 * @return
	 */
	int insertBankCard(BankCard card);
	/**
	 * 删除此用户Id相关的银行卡
	 * @param userId
	 * @return
	 */
	int deleteBankCard(Long userId);
	/**
	 * 修改用户数据库银行卡表的余额
	 * @param card
	 * @return
	 */
	int updateBankCardAmount(BankCard card);
	
}
