package com.zl.util;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.time.temporal.TemporalUnit;
import java.util.Date;

public class LocalDateTimeUtil {

	    /**
	     * 日期格式yyyy-MM-dd
	     */
	    public static String DATE_PATTERN = "yyyy-MM-dd";

	    /**
	     * 日期时间格式yyyy-MM-dd HH:mm:ss
	     */
	    public static String DATE_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss";


	    /**
	     * Date转LocalDateTime
	     * 
	     * @param date
	     *            Date对象
	     * @return
	     */
	    public static LocalDateTime dateToLocalDateTime(Date date) {
	        return LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
	    }

	    /**
	     * LocalDateTime转换为Date
	     * 
	     * @param dateTime
	     *            LocalDateTime对象
	     * @return
	     */
	    public static Date localDateTimeToDate(LocalDateTime dateTime) {
	        return Date.from(dateTime.atZone(ZoneId.systemDefault()).toInstant());
	    }

	    /**
	     * 格式化时间-默认yyyy-MM-dd HH:mm:ss格式
	     * 
	     * @param dateTime
	     *            LocalDateTime对象
	     * @return
	     */
	    public static String formatDateTime(LocalDateTime dateTime) {
	        return formatDateTime(dateTime, DATE_TIME_PATTERN);
	    }

	    /**
	     * 按pattern格式化时间-默认yyyy-MM-dd HH:mm:ss格式
	     * 
	     * @param dateTime
	     *            LocalDateTime对象
	     * @param pattern
	     *            要格式化的字符串
	     * @return
	     */
	    public static String formatDateTime(LocalDateTime dateTime, String pattern) {
	        if (dateTime == null) {
	            return null;
	        }
	        if (pattern == null || pattern.isEmpty()) {
	            pattern = DATE_TIME_PATTERN;
	        }
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
	        return dateTime.format(formatter);
	    }

	    /**
	     * 获取今天的00:00:00
	     * 
	     * @return
	     */
	    public static String getDayStart() {
	        return getDayStart(LocalDateTime.now());
	    }

	    /**
	     * 获取今天的23:59:59
	     * 
	     * @return
	     */
	    public static String getDayEnd() {
	        return getDayEnd(LocalDateTime.now());
	    }

	    /**
	     * 获取某天的00:00:00
	     * 
	     * @param dateTime
	     * @return
	     */
	    public static String getDayStart(LocalDateTime dateTime) {
	        return formatDateTime(dateTime.with(LocalTime.MIN));
	    }

	    /**
	     * 获取某天的23:59:59
	     * 
	     * @param dateTime
	     * @return
	     */
	    public static String getDayEnd(LocalDateTime dateTime) {
	        return formatDateTime(dateTime.with(LocalTime.MAX));
	    }

	    /**
	     * 获取本月第一天的00:00:00
	     * 
	     * @return
	     */
	    public static String getFirstDayOfMonth() {
	        return getFirstDayOfMonth(LocalDateTime.now());
	    }

	    /**
	     * 获取本月最后一天的23:59:59
	     * 
	     * @return
	     */
	    public static String getLastDayOfMonth() {
	        return getLastDayOfMonth(LocalDateTime.now());
	    }

	    /**
	     * 获取某月第一天的00:00:00
	     * 
	     * @param dateTime
	     *            LocalDateTime对象
	     * @return
	     */
	    public static String getFirstDayOfMonth(LocalDateTime dateTime) {
	        return formatDateTime(dateTime.with(TemporalAdjusters.firstDayOfMonth()).with(LocalTime.MIN));
	    }

	    /**
	     * 获取某月最后一天的23:59:59
	     * 
	     * @param dateTime
	     *            LocalDateTime对象
	     * @return
	     */
	    public static String getLastDayOfMonth(LocalDateTime dateTime) {
	        return formatDateTime(dateTime.with(TemporalAdjusters.lastDayOfMonth()).with(LocalTime.MAX));
	    }
	    
	    //日期加上一个数,根据field不同加不同值,field为ChronoUnit.*
	    public static LocalDateTime plus(LocalDateTime time, long number, TemporalUnit field) {
	        return time.plus(number, field);
	    }
	    
	    /**
	     * 测试
	     * 
	     * @param args
	     */
	    public static void main(String[] args) {
	        System.out.println(getDayStart());
	        System.out.println(getDayEnd());
	        System.out.println(getFirstDayOfMonth());
	        System.out.println(getLastDayOfMonth());
	        System.out.println(plus(LocalDateTime.now(),10,ChronoUnit.DAYS));
	        System.out.println(LocalDateTime.now().getMonthValue());
	    }


}
