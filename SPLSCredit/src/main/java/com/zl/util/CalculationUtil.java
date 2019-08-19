package com.zl.util;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;

/*
 * 计算方式：等额本息
 * 计算借款，还款，逾期等费用 
 */
public class CalculationUtil {
	public static void main(String[] args) {
		BigDecimal wholeInterestRate=new BigDecimal("5");
		System.out.println(wholeInterestRate.multiply(wholeInterestRate));
		System.out.println(wholeInterestRate);
		for(int i=0;i<3;i++) {
			wholeInterestRate=wholeInterestRate.multiply(wholeInterestRate);
		}
		System.out.println(wholeInterestRate);
		System.out.print(monthlyRepayment(new BigDecimal("10000"),new BigDecimal("10.2"), 6));
		
		//精度为2，舍入模式为大于0.5进1，否则舍弃。
		BigDecimal a = new BigDecimal("0.5");
		BigDecimal b = new BigDecimal("0.2");
		System.out.println(a.divide(b,2,BigDecimal.ROUND_HALF_UP));
		BigDecimal[] principalAndInterest=principalAndInterest(new BigDecimal("10000"),new BigDecimal("10.2"), 6,3);
		System.out.println(principalAndInterest[0].setScale(0,RoundingMode.CEILING)+"  ....    "+principalAndInterest[1].setScale(0,RoundingMode.CEILING));
		
	}
	/*
	 * 计算每月还款本息
	 */
	public static BigDecimal monthlyRepayment(BigDecimal loanAmount,BigDecimal annualInterestRate,int term) {
		MathContext mc=new MathContext(5, RoundingMode.HALF_DOWN);
		//月利率
		BigDecimal monthInterestRate=annualInterestRate.divide(new BigDecimal("100"),3,BigDecimal.ROUND_HALF_UP)
		.divide(new BigDecimal("12"),5,BigDecimal.ROUND_HALF_UP);
		System.out.println(monthInterestRate);
		//利率按期数算的复利
		BigDecimal wholeInterestRate=monthInterestRate.add(new BigDecimal("1")).pow(term);
		System.out.println(wholeInterestRate);
		BigDecimal monthlyRepayment=loanAmount.multiply(monthInterestRate).multiply(wholeInterestRate)
		.divide(wholeInterestRate.subtract(new BigDecimal("1")),mc);
		return monthlyRepayment;
	}
	
	/*
	 * 计算指定月数的本金和利息各多少
	 */
	public static BigDecimal[] principalAndInterest(BigDecimal loanAmount,BigDecimal annualInterestRate,int countTerm,int term) {
		MathContext mc=new MathContext(5, RoundingMode.CEILING);
		BigDecimal monthInterestRate=annualInterestRate.divide(new BigDecimal("100"),3,BigDecimal.ROUND_HALF_UP)
				.divide(new BigDecimal("12"),5,BigDecimal.ROUND_HALF_UP);
		BigDecimal monthlyRepayment= monthlyRepayment(loanAmount,annualInterestRate,countTerm);
		BigDecimal amount=loanAmount;
		BigDecimal[] principalAndInterest=new BigDecimal[2];
		if(term==1) {
			//利息
			principalAndInterest[1]=amount.multiply(monthInterestRate);
			//本金
			principalAndInterest[0]=monthlyRepayment.subtract(principalAndInterest[1]);
		}else{
			double a = 0;
			System.out.println(amount+".."+monthlyRepayment+".."+monthInterestRate);
			for(int i=1;i<term;i++) {
				amount=amount.subtract(monthlyRepayment.subtract(amount.multiply(monthInterestRate,mc)));
				a=amount.doubleValue()-(1716-amount.doubleValue()*0.0085);
			}
			//利息
			principalAndInterest[1]=amount.multiply(monthInterestRate);
			//本金
			principalAndInterest[0]=monthlyRepayment.subtract(principalAndInterest[1]);
		}
		return principalAndInterest;
	}

}
