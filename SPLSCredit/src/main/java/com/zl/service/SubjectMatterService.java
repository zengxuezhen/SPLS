package com.zl.service;

import java.math.BigDecimal;

import com.zl.pojo.SubjectMatter;

public interface SubjectMatterService {
    int deleteByPrimaryKey(BigDecimal id);

    int insert(SubjectMatter record);

    int insertSelective(SubjectMatter record);

    SubjectMatter selectByPrimaryKey(BigDecimal id);

    int updateByPrimaryKeySelective(SubjectMatter record);

    int updateByPrimaryKey(SubjectMatter record);
}