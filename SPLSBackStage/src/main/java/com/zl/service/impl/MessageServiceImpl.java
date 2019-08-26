package com.zl.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zl.dao.MessageDao;
import com.zl.service.MessageService;
/*
 * 消息表service层接口实现类
 * */
@Service
public class MessageServiceImpl implements MessageService {
	@Autowired
	private MessageDao md;
	/*
	 * 根据ID查询消息内容
	 * */
	@Override
	public String queryMessageById(Integer id) {
		String message=md.selectMessageById(id);
		return message;
	}

}
