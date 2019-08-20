package com.zl.API;

import org.springframework.stereotype.Component;

import com.zl.pojo.Credit;
@Component
public class CreditServiceError implements CreditService {

	@Override
	public String getCreditBySubjectId(Long id) {
		// TODO Auto-generated method stub
		return "500";
	}



}
