package com.zl.service;

import java.math.BigDecimal;
import java.util.List;
import com.zl.pojo.FenYe;
import com.zl.pojo.SubjectMatter;

public interface SubjectMatterService {
    int deleteByPrimaryKey(BigDecimal id);

    int insert(SubjectMatter record);

    int insertSelective(SubjectMatter record);
    
    List<SubjectMatter> selectAllFy(FenYe fenYe);
    
    SubjectMatter selectSubjectMatterAndType(BigDecimal id);
    
    SubjectMatter selectByPrimaryKey(BigDecimal id);

    int updateByPrimaryKeySelective(SubjectMatter record);

    int updateByPrimaryKey(SubjectMatter record);
    
    List<SubjectMatter>selectAll();
    
    List<SubjectMatter>  selectSubjectMatterByUserId(long id);
    
    SubjectMatter selectSubjectMatterAndRepaymentRecord(long id);
    
    SubjectMatter selectSubjectMatterAndOverdueRecord(long id);
    //
    List<SubjectMatter> selectAllSubjectMatterAndRepaymentRecord();
    
    List<SubjectMatter> selectNoFullMark();
    
    List<SubjectMatter> selectFullMark();
    
    List<SubjectMatter> selectAllFySubjectMatterAndCredit(FenYe fenYe);
}