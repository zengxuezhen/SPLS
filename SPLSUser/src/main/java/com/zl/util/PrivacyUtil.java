package com.zl.util;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.builder.ReflectionToStringBuilder;

/**
 * 用来处理敏感信息，进行脱敏
 * 如：身份证、银行卡、手机号、邮箱等等
 * @author 王静
 *
 */
public class PrivacyUtil {
	/**
	 * 银行账户：显示前六后四，范例：622848******4568
	 * @param bankAcct
	 * @return
	 */
	public static String encryptBankAcct(String bankAcct) {
		if (bankAcct == null) {
			return "";
		}
		return replaceBetween(bankAcct, 6, bankAcct.length() - 4, null);
	}

	/**
	 * 身份证号码：显示前六后四，范例：110601********2015
	 * @param idCard
	 * @return
	 */
	public static String encryptIdCard(String idCard) {
		if (idCard == null) {
			return "";
		}
		return replaceBetween(idCard, 6, idCard.length() - 4, null);
	}

	/**
	 * 客户email：显示前二后四，范例：abxx@xxx.com
	 * @param email
	 * @return
	 */
	public static String encryptEmail(String email) {
		// 判断是否为邮箱地址
		if (email == null || !Pattern.matches("\\w.", email)) {
			return "";
		}

		StringBuilder sb = new StringBuilder(email);
		// 邮箱账号名只显示前两位
		int at_position = sb.indexOf("@");
		if (at_position > 2) {
			sb.replace(2, at_position, StringUtils.repeat("x", at_position - 2));
		}
		// 邮箱域名隐藏
		int period_position = sb.lastIndexOf(".");
		sb.replace(at_position + 1, period_position, StringUtils.repeat("x", period_position - at_position - 1));
		return sb.toString();
	}

	/**
	 * 手机：显示前三后四，范例：189****3684
	 * @param phoneNo
	 * @return
	 */
	public static String encryptPhoneNo(String phoneNo) {
		if (phoneNo == null) {
			return "";
		}
		return replaceBetween(phoneNo, 3, phoneNo.length() - 4, null);
	}

	/**
	 * @param object
	 *            待处理对象
	 * @param fieldNames
	 *            需要处理的属性
	 * @return 将对象转换为字符串，并对敏感信息进行处理
	 */
	public static String encryptSensitiveInfo(Object object, String[] fieldNames) {
		return encryptSensitiveInfo(object, fieldNames, null);
	}

	/**
	 * @param object
	 *            待处理对象
	 * @param fieldNames
	 *            需要处理的属性
	 * @param excludes
	 *            不需要显示的属性
	 * @return 将对象转换为字符串，并对敏感信息进行处理
	 */
	public static String encryptSensitiveInfo(Object object, String[] fieldNames, String[] excludes) {
		if (fieldNames == null) {
			fieldNames = new String[0];
		}
		// 合并数组
		Set<String> set = new HashSet<String>(Arrays.asList(fieldNames));
		if (excludes != null) {
			for (int i = 0; i < excludes.length; i++) {
				set.add(excludes[i]);
			}
		}
		// 将对象转换为字符串
		String str = ReflectionToStringBuilder.toStringExclude(object, set.toArray(new String[0]));

		// 处理敏感信息
		StringBuilder sb = new StringBuilder(str);
		sb.deleteCharAt(sb.length() - 1);
		for (int i = 0; i < fieldNames.length; i++) {
			String fieldName = fieldNames[i];
			try {
				Field f = object.getClass().getDeclaredField(fieldName);
				f.setAccessible(true);
				String value = encryptSensitiveInfo(String.valueOf(f.get(object)));
				if (i != 0 || sb.charAt(sb.length() - 1) != '[') {
					sb.append(",");
				}
				sb.append(fieldName).append("=").append(value);
			} catch (Exception e) {
			}
		}
		sb.append("]");
		str = sb.toString();
		return str;
	}

	/**
	 * 对敏感信息进行处理。使用正则表达式判断使用哪种规则
	 * 
	 * @param sourceStr
	 *            需要处理的敏感信息
	 * @return
	 * @return String
	 * @author tyg
	 * @date 2018年5月5日下午3:59:28
	 */
	public static String encryptSensitiveInfo(String sourceStr) {
		if (sourceStr == null) {
			return "";
		}
		if (Pattern.matches("\\w.", sourceStr)) {
			return encryptPhoneNo(sourceStr);
		} else if (Pattern.matches("\\w.", sourceStr)) {
			return encryptEmail(sourceStr);
		} else if (Pattern.matches("\\w.", sourceStr)) {
			return encryptBankAcct(sourceStr);
		} else if (Pattern.matches("\\w.", sourceStr)) {
			return encryptIdCard(sourceStr);
		} else {
			return sourceStr;
		}
	}

	/**
	 * 将字符串开始位置到结束位置之间的字符用指定字符替换
	 * 
	 * @param sourceStr
	 *            待处理字符串
	 * @param begin
	 *            开始位置
	 * @param end
	 *            结束位置
	 * @param replacement
	 *            替换字符
	 * @return
	 */
	private static String replaceBetween(String sourceStr, int begin, int end, String replacement) {
		if (sourceStr == null) {
			return "";
		}
		if (replacement == null) {
			replacement = "*";
		}
		int replaceLength = end - begin;
		if (StringUtils.isNotBlank(sourceStr) && replaceLength > 0) {
			StringBuilder sb = new StringBuilder(sourceStr);
			sb.replace(begin, end, StringUtils.repeat(replacement, replaceLength));
			return sb.toString();
		} else {
			return sourceStr;
		}
	}
}
