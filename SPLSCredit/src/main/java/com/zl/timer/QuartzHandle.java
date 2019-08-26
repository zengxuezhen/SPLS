package com.zl.timer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import com.zl.service.OverdueRecordService;
import com.zl.service.RepaymentRecordService;

/*
 * 每天1点处理自动扣款，逾期记录处理，redis消息记录，借期单过期处理等
 */
@Component
public class QuartzHandle {
	@Autowired
	private RepaymentRecordService rrs;
	@Autowired
	private OverdueRecordService ors;
	//创建定时任务执行的方法体
	@Scheduled(cron="0 0 1 * * ?")
	public void run() {
		try {
			//还款处理
			rrs.RepaymentRecordHandle();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//借款过期处理 ,前台获取借款信息时判断时间是否过期，过期修改状态 
		ors.subjectMatterOverdue();
	}
	
}
