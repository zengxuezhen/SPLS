package com.zl.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zl.dao.CreditMapper;
import com.zl.pojo.Credit;
import com.zl.service.CreditService;
@Service
public class CreditServiceImpl implements CreditService {
	@Autowired
	private CreditMapper cm;
	@Override
	public int deleteByPrimaryKey(Long id) {
		// TODO Auto-generated method stub
		return cm.deleteByPrimaryKey(id);
	}

	@Override
	public int insert(Credit record) {
		// TODO Auto-generated method stub
		return cm.insert(record);
	}

	@Override
	public int insertSelective(Credit record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Credit selectByPrimaryKey(Long id) {
		// TODO Auto-generated method stub
		return cm.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(Credit record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateByPrimaryKey(Credit record) {
		// TODO Auto-generated method stub
		return cm.updateByPrimaryKey(record);
	}

}
