package com.zl.timer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zl.API.UserService;
import com.zl.util.JsonUtil;
@Component
public class QuartzMessage {
	public  static void main(String []args) {
		String str="msg_132122";
		String userId=str.substring(4, str.length());
		System.out.print(userId);
	}
	@Autowired 
	private UserService us;
	@Autowired
	private StringRedisTemplate srt;
	//每天9点发消息
	@Scheduled(cron="0 0 09 * * ?")
	public void sendMessage() {
		Set<String> set=srt.keys("msg_*");
		if(set!=null&&!set.isEmpty()) {
			 Iterator it=set.iterator();
			 ObjectMapper om=new ObjectMapper();
			while(it.hasNext()) {
				String str=(String)it.next();
				String msg=srt.opsForValue().get(str);
				String userId=str.substring(4, str.length());
				String json=us.sendUserTelphoneMessage(userId, msg);
				String flag=JsonUtil.getKeyValue(json, "success");
				if(flag!=null&&!flag.equals("")&&flag.equals("true")) {
					break;
				}else {
					us.sendUserTelphoneMessage(userId, msg);
				}
			}
		}
	}
}
