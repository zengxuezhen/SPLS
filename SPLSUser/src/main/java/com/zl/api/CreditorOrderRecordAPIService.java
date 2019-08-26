package com.zl.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zl.pojo.CreditorOrderRecord;

@FeignClient(value="credit-service")
public interface CreditorOrderRecordAPIService {
	@RequestMapping("/getOrderRecordBySubjectId")
	CreditorOrderRecord getOrderRecordBySubjectId(Long subjectId);		
}
