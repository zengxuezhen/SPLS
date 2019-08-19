package com.zl.util;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zl.pojo.Credit;

import antlr.collections.List;

public class JsonUtil {
	public static void main(String []args) {
		String json="[{\"id\":23,\"creditNo\":\"2\",\"debitorUserId\":2,\"creditorUserId\":2,\"subjectId\":2,\"amount\":111.33},{\"id\":25,\"creditNo\":\"2\",\"debitorUserId\":2,\"creditorUserId\":2,\"subjectId\":2,\"amount\":111.35}]";
		System.out.print(jsonToObject(json, Credit.class));
		getKeyValue("{\"product\":{\"id\":11,\"productId\":9,\"productName\":\"null\",\"productPrice\":null,\"productStore\":null},\"point\":{\"id\":null,\"pointId\":10,\"pointNum\":10,\"userId\":null,\"orderId\":null}}","product.productName");
	}
	public static String getKeyValue(String json,String key) {
		ObjectMapper om=new ObjectMapper();
		String[] keys=key.split("\\.");
		String value="";
		for(int i=0;i<keys.length;i++) {
			JsonNode jn=null;
			try {
				jn = om.readTree(json);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			json=jn.get(keys[i]).toString();
			
		}
		if(json.charAt(0)=='\"') {
			json=json.substring(1,json.length()-1);
		}
		return json;
	}
	public static String toJson(Object obj) {
		ObjectMapper om=new ObjectMapper();
		try {
			return om.writeValueAsString(obj);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "";
		}
	}
	

	public static <T> T jsonToObject(String json,Class<T> cla) {
		ObjectMapper om=new ObjectMapper();
		try {
			return om.readValue(json, cla);
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

}
