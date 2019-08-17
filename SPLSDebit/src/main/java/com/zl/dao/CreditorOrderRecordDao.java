package com.zl.dao;


import java.util.List;

import com.zl.pojo.CreditorOrderRecord;
/*
 * 债权订单记录表Dao层接口，调用Mapper映射文件，操作数据库Credit_Order_Record
 * */
public interface CreditorOrderRecordDao {
	//添加债权订单记录
	int insertCreditorOrderRecord(CreditorOrderRecord orderRecord);
	//根据ID订单记录
	CreditorOrderRecord selectOrderRecordById(Long id);
	//根据原始标的ID查询订单记录
	List<CreditorOrderRecord> selectOrderRecordByOriginSubjectId(Long originSubjectId);
}
