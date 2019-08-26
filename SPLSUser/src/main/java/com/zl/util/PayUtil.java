package com.zl.util;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 交易工具类
 * 1.包括【交易方式】的所有静态常量
 * 2.生成唯一订单号
 * @author 王静
 *
 */
public class PayUtil {
	/**
	 * 1充值-支付宝 add
	 */
	public static final Integer RECHARGE_ALIPAY = 1;
	/**
	 * 2充值-银行卡 add
	 */
	public static final Integer RECHARGE_BANK = 2;
	/**
	 * 3充值-微信 add
	 */
	public static final Integer RECHARGE_WEIXIN = 3;
	/**
	 * 4提现-银行卡 sub
	 */
	public static final Integer WITHDRAW_BANK = 4;
	/**
	 * 5出借：投标 sub
	 */
	public static final Integer PAY_SUBJECT = 5;
	/**
	 * 6回款：投标收益 add
	 */
	public static final Integer GET_SUBJECT = 6;
	/**
	 * 7贷款：发布散标  other
	 */
	public static final Integer LOAN_SUBJECT = 7;
	/**
	 * 8平台服务费：可能会有吧 sub
	 */
	public static final Integer SERVICE_TIP = 8;
	/**
	 * 9其他：不知道呀 add
	 */
	public static final Integer OTHER_TIP = 9;
	
	/**
     * 获取唯一交易（充值提现使用）订单号
     * 18位
     * @return
     */
    public static StringBuffer getOrderNo() {
		StringBuffer sb=new StringBuffer();
		int four=(int)((Math.random()*9+1)*1000);
		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddHHmmss");
		sb.append(sdf.format(new Date()));
		sb.append(four);
		return sb;
	}
	
    /**
     * 获取唯一操作编号，操作日志使用
     * 13位
     * @return
     */
    public static String getOperationNo() {
    	return System.currentTimeMillis()+"";
    }
}
