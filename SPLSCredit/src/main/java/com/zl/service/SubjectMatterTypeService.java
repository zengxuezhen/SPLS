package com.zl.service;

import com.zl.pojo.SubjectMatterType;

public interface SubjectMatterTypeService {
    int deleteByPrimaryKey(Short id);

    int insert(SubjectMatterType record);

    int insertSelective(SubjectMatterType record);

    SubjectMatterType selectByPrimaryKey(Short id);

    int updateByPrimaryKeySelective(SubjectMatterType record);

    int updateByPrimaryKey(SubjectMatterType record);
}