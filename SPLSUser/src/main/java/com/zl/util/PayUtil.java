package com.zl.util;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 交易工具类
 * 1.包括交易方式的所有静态常量
 * 2.生成唯一订单号
 * @author 王静
 *
 */
public class PayUtil {
	/**
	 * 充值-支付宝
	 */
	public static final Integer RECHARGE_ALIPAY = 1;
	/**
	 * 充值-银行卡
	 */
	public static final Integer RECHARGE_BANK = 2;
	/**
	 * 充值-微信
	 */
	public static final Integer RECHARGE_WEIXIN = 3;
	/**
	 * 提现-银行卡
	 */
	public static final Integer WITHDRAW_BANK = 4;
	/**
	 * 出借：投标
	 */
	public static final Integer PAY_SUBJECT = 5;
	/**
	 * 回款：投标收益
	 */
	public static final Integer GET_SUBJECT = 6;
	
	/**
     * 获取唯一充值订单号
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
	
    public static String getOperationNo() {
    	return System.currentTimeMillis()+"";
    }
}
