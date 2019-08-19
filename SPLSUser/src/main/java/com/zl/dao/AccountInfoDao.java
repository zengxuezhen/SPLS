package com.zl.dao;
/**
 * 个人账户信息表Dao层接口
 * @author Administrator
 *
 */

import com.zl.pojo.AccountInfo;

public interface AccountInfoDao {
	AccountInfo selectAccountInfoByUserId(Long userId);
}
