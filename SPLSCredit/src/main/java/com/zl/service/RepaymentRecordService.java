package com.zl.service;

import java.util.List;

import com.zl.pojo.RepaymentRecord;

public interface RepaymentRecordService {
    int deleteByPrimaryKey(Long id);

    int insert(RepaymentRecord record);

    int insertSelective(RepaymentRecord record);

    RepaymentRecord selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(RepaymentRecord record);

    int updateByPrimaryKey(RepaymentRecord record);
    
    List<RepaymentRecord> selectRepaymentRecordBySubjectMatterId(Long id);
    
    void  RepaymentRecordHandle() throws Exception;
    
    public int applicationForAdvancePayment(long[] subjectMatterIds) throws Exception;
}