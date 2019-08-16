package com.zl.dao;

import java.math.BigDecimal;

import com.zl.pojo.RepaymentMethod;

public interface RepaymentMethodMapper {
    int deleteByPrimaryKey(BigDecimal id);

    int insert(RepaymentMethod record);

    int insertSelective(RepaymentMethod record);

    RepaymentMethod selectByPrimaryKey(BigDecimal id);

    int updateByPrimaryKeySelective(RepaymentMethod record);

    int updateByPrimaryKey(RepaymentMethod record);
}