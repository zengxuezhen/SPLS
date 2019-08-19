package com.zl.util;

import java.io.IOException;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JSONUtil {

	public static String parseJSONtoStringByKey(String json,String key) throws IOException {
		ObjectMapper om=new ObjectMapper();
		String[] keys=key.split("\\.");//order.id
		for (String string : keys) {
			JsonNode jn=om.readTree(json);
			json=jn.get(string).toString();			
		}
		return json;
	}
	
}
