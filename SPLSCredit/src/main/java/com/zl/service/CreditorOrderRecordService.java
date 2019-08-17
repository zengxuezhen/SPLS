package com.zl.service;

import java.math.BigDecimal;

import com.zl.pojo.CreditorOrderRecord;

public interface CreditorOrderRecordService {
    int deleteByPrimaryKey(BigDecimal id);

    int insert(CreditorOrderRecord record);

    //int insertSelective(CreditorOrderRecord record);

    CreditorOrderRecord selectByPrimaryKey(BigDecimal id);

    //int updateByPrimaryKeySelective(CreditorOrderRecord record);

    int updateByPrimaryKey(CreditorOrderRecord record);
}