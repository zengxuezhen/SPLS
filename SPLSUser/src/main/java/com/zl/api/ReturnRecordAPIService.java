package com.zl.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@FeignClient(value="credit-service")
public interface ReturnRecordAPIService {

	@RequestMapping("/returns/myRecord")
	String queryMyAllReturnRecord(Map<String, Object> map);
	
}
