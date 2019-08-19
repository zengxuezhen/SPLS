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
}
