package com.zl.dao;

import com.zl.pojo.AllUser;

/**
 * 根据ID 修改密码/修改绑定手机/修改邮箱
 * 
 * @author UZ
 *
 */
public interface PersonalInfoDao {
	/**
	 * 修改手机号/邮箱/密碼
	 * 
	 * @param user
	 * @return
	 */
	int updateUserById(AllUser user);

	/**
	 * 修改密码
	 * 
	 * @param user
	 * @return
	 */
	int updateUserPad(AllUser user);
	
	/**
	 * 修改手机号
	 * @param user
	 * @return
	 */
	int updateUserTelephone(AllUser user);
	
	/**
	 * 修改邮箱
	 * @param user 
	 * @return
	 */
	int updateUserEmail(AllUser user);
	
	/**
	 * 根据手机号查询用户所有信息
	 * @param telephone 
	 * @return
	 */
	AllUser selectByTelephone(String telephone);
	
	/**
	 * 根据邮箱查询所有信息
	 * @param email 
	 * @return
	 */
	AllUser selectByEmail(String email);
}
