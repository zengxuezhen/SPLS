package com.zl.service;

import com.zl.pojo.AccountInfo;

/**
 * 平台账户信息相关业务层操作
 * @author Administrator
 *
 */
public interface AccountInfoService {
	/**
	 * 按用户ID查询平台账户信息
	 * @param userId
	 * @return
	 */
	AccountInfo queryAccountInfoByUserId(Long userId);
	/**
	 * 插入平台账户信息记录
	 * @param accountInfo
	 * @return
	 */
	int addAccountInfo(AccountInfo accountInfo);
	/**
	 * 根据用户ID修改平台账户可用金额
	 * @param accountInfo
	 * @return
	 */
	int modifyAccountInfoActiveAmountByUserId(AccountInfo accountInfo);
	/**
	 * 根据用户ID修改平台账户贷款额度
	 * @param accountInfo
	 * @return
	 */
	int modifyAccountInfoMaxAmountByUserId(AccountInfo accountInfo);
}
