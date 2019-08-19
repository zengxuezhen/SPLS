package com.zl.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zl.dao.RepaymentRecordMapper;
import com.zl.pojo.RepaymentRecord;
import com.zl.service.RepaymentRecordService;
/*
 * 还款记录
 */
@Service
public class RepaymentRecordServiceImpl implements RepaymentRecordService {
	@Autowired
	private RepaymentRecordMapper rr;
	@Override
	public int deleteByPrimaryKey(Long id) {
		// TODO Auto-generated method stub
		return rr.deleteByPrimaryKey(id);
	}

	@Override
	public int insert(RepaymentRecord record) {
		// TODO Auto-generated method stub
		return rr.insert(record);
	}

	@Override
	public int insertSelective(RepaymentRecord record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public RepaymentRecord selectByPrimaryKey(Long id) {
		// TODO Auto-generated method stub
		return rr.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(RepaymentRecord record) {
		// TODO Auto-generated method stub
		return rr.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(RepaymentRecord record) {
		// TODO Auto-generated method stub
		return rr.updateByPrimaryKey(record);
	}

	@Override
	public List<RepaymentRecord> selectRepaymentRecordBySubjectMatterId(Long id) {
		// TODO Auto-generated method stub
		return rr.selectRepaymentRecordBySubjectMatterId(id);
	}

}
