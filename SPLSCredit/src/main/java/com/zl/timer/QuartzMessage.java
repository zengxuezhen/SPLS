package com.zl.timer;

import java.util.Date;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
@Component
public class QuartzMessage {
	
	@Autowired
	private StringRedisTemplate srt;
	//每天9点发消息
	@Scheduled(cron="0 0 09 * * ?")
	public void sendMessage() {
		ObjectMapper om=new ObjectMapper();
		String str=null;
		try {
			str = om.writeValueAsString("");
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(str!=null) {
			srt.opsForValue().set("books", str, 300,TimeUnit.SECONDS);
		}
		System.out.println("定时任务执行：存数据到缓存"+new Date());
	}
}
