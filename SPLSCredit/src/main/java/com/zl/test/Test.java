package com.zl.test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

public class Test {

	public static void main(String[] args) {
		LocalDateTime startLdt=LocalDateTime.of(2019, 9, 20, 0, 0);
		LocalDateTime ldt=LocalDateTime.now();
		//小时清零
		System.out.println(ldt.withMonth(10));
		
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date d = null;
		try {
			 d=sdf.parse("2019-8-17 00:00:00");
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Date d1=new Date();
		
		long time=d1.getTime()-d.getTime();
		System.out.println(time+" \n "+7*24*60*60);
		// 求n天之后的日期
		Calendar c2 = Calendar.getInstance();
        c2.add(Calendar.DATE, 31);
        System.out.println("n天之后的日期：" + sdf.format(c2.getTime()));

	}

}
