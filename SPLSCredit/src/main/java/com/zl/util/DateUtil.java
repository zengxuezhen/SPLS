package com.zl.util;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class DateUtil {

	public static void main(String[] args) {
		// TODO Auto-generated method
	}
	//返回第几期的时间
	public Date getTermDate(Date startDate,int term) {
		// 求n天之后的日期
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Calendar c = Calendar.getInstance();
		c.add(Calendar.DATE, 31);
		System.out.println("n天之后的日期：" + sdf.format(c.getTime()));
		
		// Period period = Period.between(LocalDate.from(LocalDateTime.now().), LocalDate.from(endTime));
		return c.getTime();
	}
	
	
	
}
