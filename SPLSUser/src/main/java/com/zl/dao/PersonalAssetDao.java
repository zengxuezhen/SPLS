package com.zl.dao;

import com.zl.pojo.PersonalAsset;

/**
 * 用户申请贷款资产详细信息持久层操作
 * @author 王静
 * 映射数据库表personal_asset
 */
public interface PersonalAssetDao {
	/**
	 * 贷款用户添加的详细信息
	 * @param asset
	 * @return
	 */
	int insertPersonalAsset(PersonalAsset asset);
	/**
	 * 根据贷款信息ID查询对应的详细信息
	 * @param personalInfoId
	 * @return
	 */
	PersonalAsset selectPersonalAssetByInfoId(Long personalInfoId);
}
