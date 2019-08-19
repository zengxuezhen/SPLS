package com.zl.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
/*
 * 标的类型
 */

import com.zl.dao.SubjectMatterTypeMapper;
import com.zl.pojo.SubjectMatterType;
import com.zl.service.SubjectMatterTypeService;
@Service
public class SubjectMatterTypeServiceImpl implements SubjectMatterTypeService {
	@Autowired
	private SubjectMatterTypeMapper smt;
	@Override
	public int deleteByPrimaryKey(Short id) {
		// TODO Auto-generated method stub
		return smt.deleteByPrimaryKey(id);
	}

	@Override
	public int insert(SubjectMatterType record) {
		// TODO Auto-generated method stub
		return smt.insert(record);
	}

	@Override
	public int insertSelective(SubjectMatterType record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public SubjectMatterType selectByPrimaryKey(Short id) {
		// TODO Auto-generated method stub
		return smt.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(SubjectMatterType record) {
		// TODO Auto-generated method stub
		return smt.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(SubjectMatterType record) {
		// TODO Auto-generated method stub
		return smt.updateByPrimaryKey(record);
	}

}
