package com.zl.API;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.zl.pojo.Credit;


@FeignClient(value="debit-service")
public interface CreditService {
	@RequestMapping(value = "/credit/getCreditBySubjectId")
	public String getCreditBySubjectId(@RequestParam("id") Long id);
	@RequestMapping(value = "/credit/getCreditByUserIdAndSubjectId")
	public String  getCreditByUserIdAndSubjectId(@RequestParam("userId")long userId, @RequestParam("subjectId")long subjectId);
}
