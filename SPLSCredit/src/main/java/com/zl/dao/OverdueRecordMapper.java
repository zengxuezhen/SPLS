package com.zl.dao;

import java.util.List;

import com.zl.pojo.OverdueRecord;

public interface OverdueRecordMapper {
    int deleteByPrimaryKey(Long id);

    int insert(OverdueRecord record);

    int insertSelective(OverdueRecord record);

    OverdueRecord selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(OverdueRecord record);

    int updateByPrimaryKey(OverdueRecord record);
    
    List<OverdueRecord> selectOverdueRecordBySubjectMatterId(Long id);
}