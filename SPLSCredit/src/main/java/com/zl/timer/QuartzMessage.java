package com.zl.timer;

import java.util.Iterator;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zl.API.UserService;
import com.zl.util.JsonUtil;
/*
 * 每天九点处理redis消息记录，给用户发送处理的消息
 */
@Component
public class QuartzMessage {
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
				String json=us.sendUserTelphoneMessage(Long.valueOf(userId), msg);
				String flag=JsonUtil.getKeyValue(json, "success");
				if(flag!=null&&!flag.equals("")&&flag.equals("true")) {
					break;
				}else {
					us.sendUserTelphoneMessage(Long.valueOf(userId), msg);
				}
			}
		}
	}
}
