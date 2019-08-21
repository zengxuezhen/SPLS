package com.zl.API;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(value="debit-service")
public interface CreditService {
	//@RequestMapping("/credit/getCreditBySubjectId")
	@RequestMapping(value = "/credit/getCreditBySubjectId",method=RequestMethod.POST)
	public String getCreditBySubjectId(Long id);
	
}
