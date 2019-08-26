package com.zl.service;

import java.util.List;

import com.zl.pojo.TradeType;

/**
 * 对交易类型名的相关业务操作
 * @author 王静
 *
 */
public interface TradeTypeService {
	/**
	 * 根据Id查询对应的交易类型名
	 * @param id
	 * @return
	 */
	TradeType queryTradeTypeById(Integer id);
	/**
	 * 查询显示所有交易类型名
	 * @return
	 */
	List<TradeType> queryTradeTypeAll();
}
