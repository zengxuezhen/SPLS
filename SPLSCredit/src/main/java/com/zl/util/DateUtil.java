package com.zl.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class DateUtil {

	public static void main(String[] args) throws ParseException {
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		Calendar c = Calendar.getInstance();
		c.setTime(new Date());
		c.getActualMaximum(Calendar.DAY_OF_MONTH);
		try {
			int [] monthAndDay= monthAndDay(sdf.parse("2019-8-20"),sdf.parse("2021-8-9"));
			int days=differentDaysByMillisecond(sdf.parse("2019-8-20"),sdf.parse("2021-8-9"));
			System.out.println(monthAndDay[0]+"  "+monthAndDay[1]+"\n实际天数："+days);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(LocalDateTime.now().getMonth().maxLength());
		
		Date date = null;
		try {
			date = sdf.parse("2019-2-1");
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		for(int i=1;i<=6;i++) {
				System.out.println(sdf.format(getTermDate(date,i)));
			
		}
		Calendar c1 = Calendar.getInstance();
		c1.setTime(date);
		c1.add(Calendar.DATE, 30*6);
		System.out.println(sdf.format(c1.getTime()));
		c.setTime(new Date());
		c.add(Calendar.MONTH, -2);
	//	calendar.add(Calendar.YEAR, -1);//当前时间减去一年，即一年前的时间    
		//calendar.add(Calendar.MONTH, -1);//当前时间前去一个月，即一个月前的时间  
		System.out.println("n天之后的日期：" + sdf.format(getTermDate(sdf.parse("2019-2-1"), 6)));
		 getfastIssueDate(sdf.parse("2019-2-28"));
		
	}
	
	//返回第几期的时间（30天为一期）
	public static Date getTermDate(Date startDate,int term) {
		// 求n天之后的日期
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Calendar c = Calendar.getInstance();
		c.setTime(startDate);
		for(int i=1;i<=term;i++) {
			c.add(Calendar.DATE, 30);
		}
	//	calendar.add(Calendar.YEAR, -1);//当前时间减去一年，即一年前的时间    
		//calendar.add(Calendar.MONTH, -1);//当前时间前去一个月，即一个月前的时间  
		System.out.println("n天之后的日期：" + sdf.format(c.getTime()));
		
		// Period period = Period.between(LocalDate.from(LocalDateTime.now().), LocalDate.from(endTime));
		return c.getTime();
	}

	//返回第一期的还款日(以最后一期月的天数为还款日)
	public static Date  getfastIssueDate(Date startDate) {
		Calendar c = Calendar.getInstance();
		c.setTime(startDate);
		if(c.get(Calendar.DATE)>27) {
			c.set(Calendar.DATE,27);
		}
		return  c.getTime();
	}
	/*
	 * 两个日期的月数和天数,根据月份天数(30天)计算
	 */
	public static int []monthAnd30Day(Date dayStart,Date dayEnd) {
		int days=differentDaysByMillisecond(dayStart,dayEnd);
		int [] monthAndDay=new int[2];
		monthAndDay[0]=days/30;
		monthAndDay[1]=days%30;
		return monthAndDay;
	}
	/*
	 * 两个日期的月数和天数,根据月份天数(实际月份天数)计算
	 */
	public static int [] monthAndDay(Date dayStart,Date dayEnd) {
		LocalDateTime endLdt=LocalDateTime.ofInstant(dayEnd.toInstant(), ZoneId.systemDefault());
		LocalDateTime startLdt=LocalDateTime.ofInstant(dayStart.toInstant(), ZoneId.systemDefault());
		Calendar c = Calendar.getInstance();
		int countDay=differentDaysByMillisecond(dayStart,dayEnd);
		int [] monthAndDay=new int[2];
		System.out.println("days:"+countDay+"  "+startLdt.getMonth().maxLength()+"..."+startLdt.getDayOfMonth());
		int startMonthDay=startLdt.getMonth().maxLength()-startLdt.getDayOfMonth();
		int endMonthDay=endLdt.getDayOfMonth();
		System.out.println(startMonthDay+"..."+endMonthDay);
		int daymonth=countDay-startMonthDay-endMonthDay;
		
		LocalDateTime endMonth=endLdt.withDayOfMonth(1).plus(-1,ChronoUnit.MONTHS);		
		LocalDateTime startMonth=LocalDateTimeUtil.plus(LocalDateTime.ofInstant(dayStart.toInstant(), ZoneId.systemDefault()).withDayOfMonth(1),1,ChronoUnit.MONTHS);
		int monthday=0;
		while(startMonth.compareTo(endMonth)!=0) {
			if(daymonth>=startMonth.getMonth().maxLength()) {
				daymonth=daymonth-startMonth.getMonth().maxLength();
				monthday++;
				startMonth=startMonth.plus(1,ChronoUnit.MONTHS);
			}
			
		}
		monthAndDay[0]=monthday;
		
		monthAndDay[1]=endMonthDay+startMonthDay;
		if(daymonth>0) {
			monthAndDay[1]+=daymonth;
		}
		//余下的天数超过30天加一个
		if(monthAndDay[1]>30) {
			monthAndDay[0]+=monthAndDay[1]/30;
			monthAndDay[1]=monthAndDay[1]%30;
			
		}
		return monthAndDay;
	}
	/*
	 * 获取某月的天数 
	 */
	 public static int getDaysOfMonth(Date date) {
	        Calendar calendar = Calendar.getInstance();
	        calendar.setTime(date);
	        return calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
	 }
	 
	 /**
	     * 通过时间秒毫秒数判断两个时间的间隔
	     * @param date1
	     * @param date2
	     * @return
	 */
	public static int differentDaysByMillisecond(Date date1,Date date2){
	      int days = (int) ((date2.getTime() - date1.getTime()) / (1000*3600*24));
	        return days;
	}
	/**
     * date2比date1多的天数
     * @param date1    
     * @param date2
     * @return    
     */
    public static int differentDays(Date date1,Date date2)
    {
        Calendar cal1 = Calendar.getInstance();
        cal1.setTime(date1);
        
        Calendar cal2 = Calendar.getInstance();
        cal2.setTime(date2);
       int day1= cal1.get(Calendar.DAY_OF_YEAR);
        int day2 = cal2.get(Calendar.DAY_OF_YEAR);
        
        int year1 = cal1.get(Calendar.YEAR);
        int year2 = cal2.get(Calendar.YEAR);
        if(year1 != year2)   //同一年
        {
            int timeDistance = 0 ;
            for(int i = year1 ; i < year2 ; i ++)
            {
                if(i%4==0 && i%100!=0 || i%400==0)    //闰年            
                {
                    timeDistance += 366;
                }
                else    //不是闰年
                {
                    timeDistance += 365;
                }
            }
            
            return timeDistance + (day2-day1) ;
        }
        else    //不同年
        {
            System.out.println("判断day2 - day1 : " + (day2-day1));
            return day2-day1;
        }
    }
	
}
