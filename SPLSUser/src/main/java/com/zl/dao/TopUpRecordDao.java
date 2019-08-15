package com.zl.dao;

import java.util.List;
import com.zl.pojo.TopUpRecord;
import com.zl.query.Fenye;
import com.zl.query.Query;

/**
 * 对充值记录表的增删改查
 * @author Administrator
 * top_up_record
 */
public interface TopUpRecordDao {
	/**
	 * 根据用户主键查询其所有充值记录，并按条件分页显示
	 * @param fenye 分页对象
	 * @return
	 */
	List<TopUpRecord> selectTopUpRecordByFenye(Fenye fenye);
	/**
	 * 根据用户主键查询其所有充值记录的总数，符合条件的总数
	 * @param query 检索条件
	 * @return
	 */
	int selectTopUpRecordCountByQuery(Query query);
	/**
	 * 添加一条充值记录	 
	 * @param record
	 * @return
	 */
	int insertTopUpRecord(TopUpRecord record);
	/**
	 * 查询所有充值记录
	 * @return
	 */
	List<TopUpRecord> selectTopUpRecordAll();
}
