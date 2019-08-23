package com.zl.api;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient(value="credit-service")
public interface ReturnRecordAPIService {

	@RequestMapping("/returns/myRecord")
	String queryMyAllReturnRecord(Map<String, Object> map);
	
}
