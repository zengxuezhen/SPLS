package com.zl.API;

import java.math.BigDecimal;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.zl.pojo.CreditorOrderRecord;
//@FeignClient(value="debit-service",fallback=CreditorOrderRecordServiceError.class)
public interface CreditorOrderRecordService {
    int deleteByPrimaryKey(BigDecimal id);
    
    int insert(CreditorOrderRecord record);

    //int insertSelective(CreditorOrderRecord record);
    @RequestMapping(value = "/queryAllCreditBySubjectMatterId",method = RequestMethod.POST)
   String queryAllCreditBySubjectMatterId(long id);

    //int updateByPrimaryKeySelective(CreditorOrderRecord record);

    int updateByPrimaryKey(CreditorOrderRecord record);
}