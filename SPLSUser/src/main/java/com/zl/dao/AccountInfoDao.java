package com.zl.dao;


import com.alipay.api.domain.Account;
import com.zl.pojo.AccountInfo;
/**
 * 个人账户信息表Dao层接口
 * @author Administrator
 *
 */
public interface AccountInfoDao {
	/**
	 * 根据用户ID查询平台账户信息表
	 * @param userId
	 * @return
	 */
	AccountInfo selectAccountInfoByUserId(Long userId);
	/**
	 * 向平台账户信息表插入数据
	 * @param accountInfo
	 * @return
	 */
	int insertAccountInfo(AccountInfo accountInfo);
	/**
	 * 根据用户ID修改平台账户信息
	 * @param accountInfo
	 * @return
	 */
	int updateAccountInfoById(AccountInfo accountInfo);
}
