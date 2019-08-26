package com.zl.dao;
/*
 * 消息表Dao层，调用mapper映射文件操作数据库message表
 * */


public interface MessageDao {
	/*
	 * 根据ID查询消息内容
	 * */
	String selectMessageById(Integer id);
}
