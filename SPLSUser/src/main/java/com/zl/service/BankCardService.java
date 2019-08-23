package com.zl.service;

import com.zl.pojo.BankCard;

/**
 * 对用户绑定的银行卡信息相关操作
 * @author 王静
 * 
 */
public interface BankCardService {
	/**
	 * 使用银行卡充值操作
	 * @param card
	 * @return
	 */
	int rechargeBank(BankCard card);
	/**
	 * 提现到银行卡操作
	 * @param card
	 * @return
	 */
	int withdrawBank(BankCard card);
	/**
	 * 用户进行实名绑定银行卡信息
	 * @param card
	 * @return
	 */
	int addBankCard(BankCard card);
	/**
	 * 解除用户绑定的银行卡信息
	 * @param userId
	 * @return
	 */
	int deleteBankCard(Long userId);
	/**
	 * 查询用户所属银行卡信息
	 * @param userId
	 * @return
	 */
	BankCard queryBankCardByUserId(Long userId);
}
