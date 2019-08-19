package com.zl.dao;

import java.util.List;

import com.zl.pojo.TradeType;

/**
 * 对交易类型表的增删改查
 * @author Administrator
 * trade_record
 */
public interface TradeTypeDao {
	/**
	 * 根据类型表Id查询对应的交易类型对象
	 * @return
	 */
	TradeType selectTradeTypeById(Integer id);
	/**
	 * 查询数据库中所有交易类型数据集合
	 * @return
	 */
	List<TradeType> selectTradeTypeAll();
}
