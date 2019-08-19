package com.zl.API;

import org.springframework.cloud.openfeign.FeignClient;

import com.zl.pojo.Credit;
@FeignClient(value="debit-service",fallback=CreditServiceError.class)
public interface CreditService {
   
}