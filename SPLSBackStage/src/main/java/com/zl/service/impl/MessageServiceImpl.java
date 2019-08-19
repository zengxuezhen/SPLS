package com.zl.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.zl.dao.messageDao;
import com.zl.service.MessageService;
/*
 * 消息表service层接口实现类
 * */
public class MessageServiceImpl implements MessageService {
	@Autowired
	private messageDao md;
	/*
	 * 根据ID查询消息内容
	 * */
	@Override
	public String queryMessageById(Integer id) {
		String message=md.selectMessageById(id);
		return message;
	}

}
