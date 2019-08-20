package com.zl.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zl.dao.TradeTypeDao;
import com.zl.pojo.TradeType;
import com.zl.service.TradeTypeService;

@Service
public class TradeTypeServiceImpl implements TradeTypeService {
	@Autowired
	private TradeTypeDao td;
	
	@Override
	public TradeType queryTradeTypeById(Integer id) {
		return td.selectTradeTypeById(id);
	}

	@Override
	public List<TradeType> queryTradeTypeAll() {
		return td.selectTradeTypeAll();
	}

}
