package com.zl.util;

import java.io.IOException;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 解析JSON节点工具类
 * @author 王静
 *
 */
public class JSONUtil {

	/**
	 * 根据json字符串中的key值获取对应的值
	 * @param json
	 * @param key
	 * @return
	 * @throws IOException
	 */
	public static String parseJSONtoStringByKey(String json,String key) throws IOException {
		ObjectMapper om=new ObjectMapper();
		String[] keys=key.split("\\.");//order.id
		for (String string : keys) {
			JsonNode jn=om.readTree(json);
			json=jn.get(string).toString();			
		}
		return json;
	}
	
	/**
	 * 将对象转换为JSON字符串格式
	 * @param obj
	 * @return
	 * @throws Exception
	 */
	public static String parseObjectToJSON(Object obj) throws Exception {
		ObjectMapper om=new ObjectMapper();
		String json=om.writeValueAsString(obj);
		return json;
	}
	
	/**
	 * 此方法用于解析支付宝异步回调响应的json
	 * @param json
	 * @param key
	 * @return
	 * @throws IOException
	 */
	public static String parseAliJSONtoStringByKey(String json,String key) throws IOException {
		ObjectMapper om=new ObjectMapper();
		String[] keys=key.split("\\.");//order.id
		for (String string : keys) {
			JsonNode jn=om.readTree(json);
			json=jn.get(string).toString();			
		}
		return json.replaceAll("\"", "");//去除所有引号
	}
	
}
