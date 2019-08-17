package com.zl.dao;

import java.math.BigDecimal;

import com.zl.pojo.SubjectMatter;

public interface SubjectMatterMapper {
    int deleteByPrimaryKey(BigDecimal id);

    int insert(SubjectMatter record);

    int insertSelective(SubjectMatter record);

    SubjectMatter selectByPrimaryKey(BigDecimal id);

    int updateByPrimaryKeySelective(SubjectMatter record);

    int updateByPrimaryKey(SubjectMatter record);
}