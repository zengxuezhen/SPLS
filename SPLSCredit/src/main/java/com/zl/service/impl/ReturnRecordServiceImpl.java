package com.zl.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
/*
 * 回款记录
 */

import com.zl.dao.ReturnRecordMapper;
import com.zl.pojo.ReturnRecord;
import com.zl.service.ReturnRecordService;
import com.zl.view.ReturnRecordView;
@Service
public class ReturnRecordServiceImpl implements ReturnRecordService {
	@Autowired
	private ReturnRecordMapper rr;
	@Override
	public int deleteByPrimaryKey(Long id) {
		// TODO Auto-generated method stub
		return rr.deleteByPrimaryKey(id);
	}

	@Override
	public int insert(ReturnRecord record) {
		// TODO Auto-generated method stub
		return rr.insert(record);
	}

	@Override
	public int insertSelective(ReturnRecord record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public ReturnRecord selectByPrimaryKey(Long id) {
		// TODO Auto-generated method stub
		return rr.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(ReturnRecord record) {
		// TODO Auto-generated method stub
		return rr.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(ReturnRecord record) {
		// TODO Auto-generated method stub
		return rr.updateByPrimaryKey(record);
	}

	@Override
	public List<ReturnRecordView> queryReturnRecordByLimit(Map<String, Object> map) {
		return rr.selectReturnRecordByLimit(map);
	}

	@Override
	public int queryReturnRecordCount(Map<String, Object> map) {
		return rr.selectReturnRecordCount(map);
	}
	
}
