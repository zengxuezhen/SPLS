package com.zl.service;

import java.util.List;
import java.util.Map;

import com.zl.pojo.OverdueRecord;

public interface OverdueRecordService {
    int deleteByPrimaryKey(Long id);

    int insert(OverdueRecord record);

    int insertSelective(OverdueRecord record);

    OverdueRecord selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(OverdueRecord record);

    int updateByPrimaryKey(OverdueRecord record);
    
    List<OverdueRecord> selectOverdueRecordBySubjectMatterId(Long id);
    
    int subjectMatterOverdue() throws Exception;
    
    int  applicationForOverdueRepayment(long[] subjectMatterIds) throws Exception ;
    
    public List<Map>queryForOverdueFeeInformation(long subjectMatterId);
}