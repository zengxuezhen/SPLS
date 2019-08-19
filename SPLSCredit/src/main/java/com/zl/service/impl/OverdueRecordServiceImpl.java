package com.zl.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zl.dao.OverdueRecordMapper;
import com.zl.pojo.OverdueRecord;
import com.zl.service.OverdueRecordService;
/*
 * 逾期记录
 */
@Service
public class OverdueRecordServiceImpl implements OverdueRecordService {
	@Autowired
	private OverdueRecordMapper or;
	@Override
	public int deleteByPrimaryKey(Long id) {
		// TODO Auto-generated method stub
		return or.deleteByPrimaryKey(id);
	}

	@Override
	public int insert(OverdueRecord record) {
		// TODO Auto-generated method stub
		return or.insert(record);
	}

	@Override
	public int insertSelective(OverdueRecord record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public OverdueRecord selectByPrimaryKey(Long id) {
		// TODO Auto-generated method stub
		return or.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(OverdueRecord record) {
		// TODO Auto-generated method stub
		return or.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(OverdueRecord record) {
		// TODO Auto-generated method stub
		return or.updateByPrimaryKey(record);
	}

	@Override
	public List<OverdueRecord> selectOverdueRecordBySubjectMatterId(Long id) {
		// TODO Auto-generated method stub
		return or.selectOverdueRecordBySubjectMatterId(id);
	}

}
