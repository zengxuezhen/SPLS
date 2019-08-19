package com.zl.controller;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zl.util.CalculationUtil;
/*
 *计算器
 */
@Controller
public class LoanCalculationController {
	/*
	 *给定借款金额，年利率，还款期数，计算每月 月收本息	月收本金	月收利息	待收本息
	 */
	@RequestMapping("/loanCalculation")
	@ResponseBody
	public Object loanCalculation(BigDecimal loanAmount,BigDecimal annualInterestRate,int term) {
		BigDecimal monthAmount=CalculationUtil.monthlyRepayment(loanAmount, annualInterestRate, term);
		System.out.print(monthAmount);
		 // #.00 表示两位小数 #.0000四位小数  
	    DecimalFormat df =new DecimalFormat("0.00");  
	    
		List<Map> list=new ArrayList();
		for(int i=1;i<=term;i++) {
			Map<String,String>map=new HashMap();
			BigDecimal[] principalAndInterest =CalculationUtil.principalAndInterest(loanAmount, annualInterestRate, term,i);
			map.put("monthAmount", df.format(monthAmount));
			map.put("principal", df.format(principalAndInterest[0]));
			map.put("Interest", df.format(principalAndInterest[1]));
			BigDecimal principalAndInterestToBeReceived=CalculationUtil.principalAndInterestToBeReceived(monthAmount,term,i);
			map.put("principalAndInterestToBeReceived", df.format(principalAndInterestToBeReceived));
			list.add(map);
		}
		return list;
	}
	
}
