package com.zl.dao;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zl.pojo.FenYe;
import com.zl.pojo.SubjectMatter;

public interface SubjectMatterMapper {
    int deleteByPrimaryKey(BigDecimal id);

    int insert(SubjectMatter record);

    int insertSelective(SubjectMatter record);

    SubjectMatter selectByPrimaryKey(BigDecimal id);
    
    List<SubjectMatter> selectAllFy(FenYe fenYe);
    
    SubjectMatter selectSubjectMatterAndType(BigDecimal id);
    
    int selectAllCount();
    
    int updateByPrimaryKeySelective(SubjectMatter record);

    int updateByPrimaryKey(SubjectMatter record);
    
    SubjectMatter selectSubjectMatterAndRepaymentRecord(long id);
    
    SubjectMatter selectSubjectMatterAndOverdueRecord(long id);
    
    List<SubjectMatter>selectAll(@Param("startDate")Date startDate,@Param("endDate")Date endDate);

    List<SubjectMatter> selectNoFullMark();
    
    List<SubjectMatter> selectFullMark();
    
    List<SubjectMatter>  selectSubjectMatterByUserId(long id);
    //
    List<SubjectMatter> selectAllSubjectMatterAndRepaymentRecord();
    
    List<SubjectMatter> selectAllFySubjectMatterAndCredit(FenYe fenYe);

    int selectAllCountFySubjectMatterAndCredit();
}