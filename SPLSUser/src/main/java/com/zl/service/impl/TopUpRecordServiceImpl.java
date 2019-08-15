package com.zl.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zl.dao.TopUpRecordDao;
import com.zl.pojo.TopUpRecord;
import com.zl.service.TopUpRecordService;

@Service
public class TopUpRecordServiceImpl implements TopUpRecordService {
	@Autowired
	private TopUpRecordDao td;

	@Override
	public List<TopUpRecord> queryTopUpRecordAll() {
		return td.selectTopUpRecordAll();
	}
	
}
