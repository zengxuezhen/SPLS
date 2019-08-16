package com.zl.dao;

import com.zl.pojo.Credit;

public interface CreditMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Credit record);

    int insertSelective(Credit record);

    Credit selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Credit record);

    int updateByPrimaryKey(Credit record);
}