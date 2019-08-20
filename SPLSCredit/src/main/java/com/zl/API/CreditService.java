package com.zl.API;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient(value="debit-service",fallback=CreditServiceError.class)
public interface CreditService {
	@RequestMapping("/credit/getCreditBySubjectId")
	public String getCreditBySubjectId(Long id);
}