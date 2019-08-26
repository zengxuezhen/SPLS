package com.zl.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zl.API.CreditService;
import com.zl.dao.RepaymentMethodMapper;
import com.zl.pojo.RepaymentMethod;
import com.zl.service.RepaymentMethodService;

/*
 * 还款方式
 */
@Service
public class RepaymentMethodServiceImpl implements RepaymentMethodService {
	@Autowired
	private RepaymentMethodMapper rm;

	@Override
	public int deleteByPrimaryKey(BigDecimal id) {
		// TODO Auto-generated method stub
		return rm.deleteByPrimaryKey(id);
	}

	@Override
	public int insert(RepaymentMethod record) {
		// TODO Auto-generated method stub
		return rm.insert(record);
	}

	@Override
	public int insertSelective(RepaymentMethod record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public RepaymentMethod selectByPrimaryKey(BigDecimal id) {
		// TODO Auto-generated method stub
		return rm.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(RepaymentMethod record) {
		// TODO Auto-generated method stub
		return rm.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(RepaymentMethod record) {
		// TODO Auto-generated method stub
		return rm.updateByPrimaryKey(record);
	}



}
