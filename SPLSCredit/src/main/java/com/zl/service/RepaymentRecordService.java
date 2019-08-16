package com.zl.service;

import com.zl.pojo.RepaymentRecord;

public interface RepaymentRecordService {
    int deleteByPrimaryKey(Long id);

    int insert(RepaymentRecord record);

    int insertSelective(RepaymentRecord record);

    RepaymentRecord selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(RepaymentRecord record);

    int updateByPrimaryKey(RepaymentRecord record);
}