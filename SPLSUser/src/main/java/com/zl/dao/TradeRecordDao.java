package com.zl.dao;

import java.util.List;
import java.util.Map;

import com.zl.pojo.TradeRecord;
import com.zl.query.Paging;
import com.zl.query.Query;
import com.zl.view.TradeMonthView;

/**
 * 对交易记录表的增删改查
 * @author 王静
 * top_up_record
 */
public interface TradeRecordDao {
	/**
	 * 根据用户主键查询其所有交易记录，并按条件分页显示
	 * @param paging 分页对象
	 * @return
	 */
	List<TradeRecord> selectTradeRecordByPaging(Paging paging);
	/**
	 * 根据用户主键查询其所有交易记录的总数，符合条件的总数
	 * @param query 检索条件
	 * @return
	 */
	int selectTradeRecordCountByQuery(Query query);
	/**
	 * 添加一条交易记录	 
	 * @param record
	 * @return
	 */
	int insertTradeRecord(TradeRecord record);
	/**
	 * 查询所有交易记录
	 * @return
	 */
	List<TradeRecord> selectTradeRecordAll();
	/**
	 * 查询对应Id的交易记录
	 * @param id
	 * @return
	 */
	TradeRecord selectTradeRecordById(Integer id);
	/**
	 * 查询用户今年某月的账户交易记录
	 * @param map
	 * @return
	 */
	List<TradeMonthView> selectTradeRecordMonth(Map<String, Object> map);
}
