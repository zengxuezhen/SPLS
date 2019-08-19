package com.zl.dao;

import com.zl.pojo.ReturnRecord;

public interface ReturnRecordMapper {
    int deleteByPrimaryKey(Long id);

    int insert(ReturnRecord record);

    int insertSelective(ReturnRecord record);

    ReturnRecord selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ReturnRecord record);

    int updateByPrimaryKey(ReturnRecord record);
}