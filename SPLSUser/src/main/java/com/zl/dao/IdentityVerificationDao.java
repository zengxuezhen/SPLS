package com.zl.dao;

import com.zl.pojo.IdentityVerification;

/**
 * 实名认证表Dao层接口
 * @author Administrator
 *
 */
public interface IdentityVerificationDao {
	/**
	 * 调用Mapper映射文件，操作数据库实名认证表
	 * @param identityVerification
	 * @return
	 */
	int insertIdentityVerification(IdentityVerification identityVerification);
}
