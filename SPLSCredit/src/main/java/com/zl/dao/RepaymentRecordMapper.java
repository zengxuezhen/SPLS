package com.zl.dao;

import com.zl.pojo.RepaymentRecord;

public interface RepaymentRecordMapper {
    int deleteByPrimaryKey(Long id);

    int insert(RepaymentRecord record);

    int insertSelective(RepaymentRecord record);

    RepaymentRecord selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(RepaymentRecord record);

    int updateByPrimaryKey(RepaymentRecord record);
}