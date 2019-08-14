package com.zl.service;

import com.zl.pojo.OverdueRecord;

public interface OverdueRecordService {
    int deleteByPrimaryKey(Long id);

    int insert(OverdueRecord record);

    int insertSelective(OverdueRecord record);

    OverdueRecord selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(OverdueRecord record);

    int updateByPrimaryKey(OverdueRecord record);
}