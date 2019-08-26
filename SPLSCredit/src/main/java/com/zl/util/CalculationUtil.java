package com.zl.util;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.util.unit.DataUnit;

import com.ctc.wstx.util.DataUtil;

/*
 * 计算方式：等额本息
 * 计算借款，还款，逾期等费用 
 */
public class CalculationUtil {
	public static void main(String[] args) throws ParseException {
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
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
		BigDecimal[] principalAndInterest=principalAndInterest(new BigDecimal("10000"),new BigDecimal("10.2"), 6,1);
		System.out.println(principalAndInterest[0].setScale(0,RoundingMode.CEILING)+"  ....    "+principalAndInterest[1].setScale(0,RoundingMode.CEILING));
		System.out.println("逾期费用 测试："+overdueCalculationNo(new BigDecimal("10000"),new BigDecimal("0.4"),
				6,new BigDecimal("10"),sdf.parse("2019-7-1"),1));
	}
	/*
	 * 计算第几期的待收本金
	 */
	public static  BigDecimal principalAndInterestToBeReceived(BigDecimal monthlyRepayment,int term,int countTerm) {
		BigDecimal principalAndInterestToBeReceived=monthlyRepayment.multiply(new BigDecimal(term))
				.subtract(monthlyRepayment.multiply(new BigDecimal(countTerm)));
		return principalAndInterestToBeReceived.setScale(0,RoundingMode.CEILING);
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
		return monthlyRepayment.setScale(0,RoundingMode.CEILING);
	}
	
	/*
	 * 计算指定月数的本金和利息各多少
	 */
	public static BigDecimal[] principalAndInterest(BigDecimal loanAmount,BigDecimal annualInterestRate,int countTerm,int term) {
		//MathContext mc=new MathContext(5, RoundingMode.CEILING);
		BigDecimal monthInterestRate=annualInterestRate.divide(new BigDecimal("100"),5,BigDecimal.ROUND_HALF_UP)
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
				amount=amount.subtract(monthlyRepayment.subtract(amount.multiply(monthInterestRate)));
				a=amount.doubleValue()-(1716-amount.doubleValue()*0.0085);
			}
			//利息
			principalAndInterest[1]=amount.multiply(monthInterestRate).setScale(0,RoundingMode.CEILING);
			//本金
			principalAndInterest[0]=monthlyRepayment.subtract(principalAndInterest[1]).setScale(0,RoundingMode.CEILING);
		}
		return principalAndInterest;
	}
	/*(以每月还款日之间实际天数()为一期计算适合每月还款日固定的情况)
	 * 计算指定第几期逾期总费用
	 */
	public static BigDecimal allOverdueCalculation(BigDecimal loanAmount,BigDecimal overdueInterestRate,
			int trem,BigDecimal normalInterestRate,int startIndex,int endIndex, Date  filledTime){
		BigDecimal allOverdueRepayment=new BigDecimal(0);
		for(int i=startIndex;i<endIndex;i++) {
			Map<String,BigDecimal> map=overdueCalculationNo(loanAmount,overdueInterestRate,
					trem,normalInterestRate,filledTime,i);
			allOverdueRepayment=allOverdueRepayment.add(map.get("monthlyRepayment")).add(map.get("defaultCost"))
			.add(map.get("managementCosts")).add(map.get("overdueInterest"));
		}
		return allOverdueRepayment;
		
	}
	
	/*(以每月还款日之间实际天数()为一期计算适合每月还款日固定的情况)
	 * 计算指定第几期逾期总费用
	 */
	public static Map<String,BigDecimal> overdueCalculationNo(BigDecimal loanAmount,BigDecimal overdueInterestRate,
			int trem,BigDecimal normalInterestRate,Date  filledTime,int index) {
		Map<String,BigDecimal> map=new HashMap();
		MathContext mc5=new MathContext(5, RoundingMode.HALF_DOWN);
		MathContext mc2=new MathContext(2, RoundingMode.HALF_DOWN);
		
		overdueInterestRate=overdueInterestRate.divide(new BigDecimal("1000"),mc5);
		//月还本息
		BigDecimal monthlyRepayment=monthlyRepayment(loanAmount,normalInterestRate, trem);
		
		//违约金
		BigDecimal defaultCost=new BigDecimal("0");
		//逾期管理总费用
		BigDecimal overdueManagementCosts=new BigDecimal("0");
		//逾期利息
		BigDecimal overdueInterest=new BigDecimal("0");
		//首期还款日
		Date repaymentDate=DateUtil.getfastIssueDate(filledTime);
		//起息日
		LocalDateTime filledLocalTime =LocalDateTime.ofInstant(filledTime	.toInstant(), ZoneId.systemDefault());
		//现在时间
		LocalDateTime now =LocalDateTime.ofInstant(new Date().toInstant(), ZoneId.systemDefault());

		////每一期的还款日以第一期还款日为准
		//LocalDateTime lastIssueDate =LocalDateTime.ofInstant(repaymentDate.toInstant(), ZoneId.systemDefault());
		//第一期还款日
		LocalDateTime startRepaymentDate=LocalDateTime.ofInstant(repaymentDate.toInstant(), ZoneId.systemDefault());
		//获取过期后的天数
		long totalDays=0;
		if(index==1) {
			//第一期的天数
			long days1=LocalDateTimeUtil.between(filledLocalTime, startRepaymentDate, ChronoUnit.DAYS);
			//第一期到现在的天数
			long days2=LocalDateTimeUtil.between( startRepaymentDate,now, ChronoUnit.DAYS);
			totalDays=days1+days2;
			System.out.println("第一期逾期天数："+totalDays);
		}else {
			//第N期到前一期的天数
			long days1=LocalDateTimeUtil.between(startRepaymentDate.plus(index-1,ChronoUnit.MONTHS)
					, startRepaymentDate, ChronoUnit.DAYS);
			//第n期到现在的天数
			long days2=LocalDateTimeUtil.between( startRepaymentDate,now, ChronoUnit.DAYS);
			totalDays=days1+days2;
			System.out.println("第"+index+"期逾期天数："+totalDays);
		}
		
			//违约费用
			defaultCost=defaultCost.add(
					monthlyRepayment.multiply(new BigDecimal(trem-index+1),mc5)
			.multiply(overdueInterestRate.add(new BigDecimal("1"),mc5)
					.pow((int)totalDays,mc5).subtract(new BigDecimal("1")))
			,mc5);
			System.out.print("aaa:"+overdueInterestRate.add(new BigDecimal("1"),mc5)
					.pow((int)totalDays,mc5).subtract(new BigDecimal("1")));
			System.out.println("..违约费用"+defaultCost);
			
			//逾期利息
			overdueInterest=overdueInterest.add(
					monthlyRepayment.multiply(new BigDecimal("1")
							.add(normalInterestRate.divide(new BigDecimal("100"),3,BigDecimal.ROUND_HALF_UP)
									.divide(new BigDecimal("360"),mc5))
							.pow((int)totalDays,mc5).subtract(new BigDecimal("1"))
					
					),mc2
					);
			System.out.println("..年利率："+normalInterestRate);
			System.out.println("..逾期利息"+overdueInterest);
		
		//逾期管理费
		BigDecimal managementCosts=monthlyRepayment.multiply(new BigDecimal(0.1),mc5);
		System.out.println("..逾期管理费"+managementCosts);
		if(managementCosts.compareTo(new BigDecimal("100"))<0){
			managementCosts=new BigDecimal("100");
		}
		System.out.println("逾期期数本息"+monthlyRepayment+"..违约费用"+defaultCost+"..逾期管理费"+overdueManagementCosts+"..逾期利息"+overdueInterest);
		map.put("monthlyRepayment", monthlyRepayment);
		map.put("defaultCost", defaultCost);
		map.put("managementCosts", managementCosts);
		map.put("overdueInterest", overdueInterest);
		return map;
	}
	
	
	/*(以固定30天为一期计算只适合每月还款日不固定的情况)
	 * 计算所有逾期总费用
	 * loanAmount:借款金额
	 * trem:借款期限
	 * normalInterestRate：年利率
	 * isOverdue:是否逾期
	 * daysDue：距下期还款天数
	 * overdueInterestRate:逾期日利率 0.4 *1000
	 * startIndex:起始逾期
 	 * endIndex：结束逾期
 	 * overdueManagementCosts:逾期管理费用 (100)
 	 * 逾期管理费基数逾期管理费以当期对应的该期应还本息全额为基数，按照10%计算
	 */
	public static BigDecimal overdueCalculation(BigDecimal loanAmount,BigDecimal overdueInterestRate,
			int trem,BigDecimal normalInterestRate,int startIndex,
			int endIndex,int daysDue) {
		MathContext mc5=new MathContext(5, RoundingMode.HALF_DOWN);
		MathContext mc2=new MathContext(2, RoundingMode.HALF_DOWN);
		overdueInterestRate=overdueInterestRate.divide(new BigDecimal("1000"),mc5);
		//月还本息
		BigDecimal monthlyRepayment=monthlyRepayment(loanAmount,normalInterestRate, trem);
		
		//违约金
		BigDecimal defaultCost=new BigDecimal("0");
		//逾期管理总费用
		BigDecimal overdueManagementCosts=new BigDecimal("0");
		//逾期利息
		BigDecimal overdueInterest=new BigDecimal("0");
		System.out.println("逾期日利率"+overdueInterestRate);
		for(int i=startIndex;i<=endIndex;i++) {
			//违约费用
			defaultCost=defaultCost.add(
					monthlyRepayment.multiply(new BigDecimal(trem-i+1),mc5)
			.multiply(overdueInterestRate.add(new BigDecimal("1"),mc5)
					.pow(30*(endIndex-startIndex+1)+daysDue,mc5).subtract(new BigDecimal("1")))
			,mc5);
			System.out.print("aaa:"+overdueInterestRate.add(new BigDecimal("1"),mc5)
					.pow(30*(endIndex-startIndex+1)+daysDue,mc5).subtract(new BigDecimal("1")));
			System.out.println("..违约费用"+defaultCost);
			
			//逾期利息   
			overdueInterest=overdueInterest.add(
					monthlyRepayment.multiply(new BigDecimal("1")
							.add(normalInterestRate.divide(new BigDecimal("100"),3,BigDecimal.ROUND_HALF_UP)
									.divide(new BigDecimal("360"),mc5))
							.pow(30*(endIndex-startIndex+1)+daysDue,mc5).subtract(new BigDecimal("1"))
					
					),mc2
					);
			System.out.println("..年利率："+normalInterestRate);
			System.out.println("..逾期利息"+overdueInterest);
		}
		//逾期管理费
		BigDecimal managementCosts=monthlyRepayment.multiply(new BigDecimal(0.1),mc5);
		System.out.println("..逾期管理费"+managementCosts);
		if(managementCosts.compareTo(new BigDecimal("100"))<0){
			managementCosts=new BigDecimal("100");
		}
		overdueManagementCosts=managementCosts.multiply(new BigDecimal(endIndex-startIndex+1));
		
		//逾期期数本息
		monthlyRepayment=monthlyRepayment.multiply(new BigDecimal(endIndex-startIndex+1));
		System.out.println("逾期期数本息"+monthlyRepayment+"..违约费用"+defaultCost+"..逾期管理费"+overdueManagementCosts+"..逾期利息"+overdueInterest);
		//总的费用 
		return monthlyRepayment.add(defaultCost).add(overdueManagementCosts).add(overdueInterest).setScale(2,RoundingMode.CEILING);
		
	}

}
