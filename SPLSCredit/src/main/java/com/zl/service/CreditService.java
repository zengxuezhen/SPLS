package com.zl.service;

import com.zl.pojo.Credit;

public interface CreditService {
	int deleteByPrimaryKey(Long id);

    int insert(Credit record);

    int insertSelective(Credit record);

    Credit selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Credit record);

    int updateByPrimaryKey(Credit record);
}