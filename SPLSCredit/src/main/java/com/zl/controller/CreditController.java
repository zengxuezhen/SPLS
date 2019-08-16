package com.zl.controller;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zl.pojo.Credit;
import com.zl.pojo.CreditorOrderRecord;
import com.zl.service.CreditService;

/*
 * 债权
 */
@Controller
public class CreditController {
	@Autowired
	private CreditService cs;
	@RequestMapping("/addCredit")
	@ResponseBody
	public String insert(Credit credit) {
		System.out.print(credit);
		if(cs.insert(credit)>0) {
			
			return "ok";
		}else {
			return "error";
		}
		
	}
	@RequestMapping("/queryCredit")
	@ResponseBody
	public String selectByPrimaryKey(long id) {
		CreditorOrderRecord cr=new CreditorOrderRecord();
		
		Credit credit=cs.selectByPrimaryKey(id);
		System.out.print(credit);
		return credit.toString();
	}
	
}
