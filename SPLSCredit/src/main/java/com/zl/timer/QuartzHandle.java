package com.zl.timer;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zl.pojo.OverdueRecord;
import com.zl.pojo.RepaymentMethod;
import com.zl.pojo.RepaymentRecord;
import com.zl.pojo.ReturnRecord;
import com.zl.pojo.SubjectMatter;
import com.zl.pojo.SubjectMatterType;
import com.zl.service.OverdueRecordService;
import com.zl.service.RepaymentMethodService;
import com.zl.service.RepaymentRecordService;
import com.zl.service.ReturnRecordService;
import com.zl.service.SubjectMatterService;
import com.zl.service.SubjectMatterTypeService;
import com.zl.util.CalculationUtil;
import com.zl.util.LocalDateTimeUtil;

import oracle.net.aso.s;
/*
 * 每天1点处理自动扣款，逾期记录处理，redis消息记录，借期单过期处理等
 */
@Component
public class QuartzHandle {
	@Autowired
	private SubjectMatterService sms;
	@Autowired
	private OverdueRecordService ors;
	@Autowired
	private RepaymentRecordService repaymentRecordS;                                                                                                                
	@Autowired 
	private ReturnRecordService returnRecordS;
	@Autowired
	private RepaymentMethodService rms;
	@Autowired
	private SubjectMatterTypeService smts;
	@Autowired
	private StringRedisTemplate srt;
	//创建定时任务执行的方法体
	@Scheduled(cron="0 0 1 * * ?")
	public void run() {
		
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
	//还款处理
	public void RepaymentRecordHandle() {
		List<SubjectMatter> list=sms.selectAllSubjectMatterAndRepaymentRecord();
		for(int i=0;i<list.size();i++) {
			SubjectMatter sm=list.get(i);
			List<RepaymentRecord>rrList=sm.getRepaymentRecordList();
			//返回满标的时间确定每月返款日
			Date date=sm.getFilledTime();
			//如是还款日从借款人账户扣款，扣款成功或失败，把消息写入redis,通过另一个 定时器通知
			///第一次还款期
			LocalDateTime RepaymentPeriod=LocalDateTimeUtil.plus(LocalDateTimeUtil.dateToLocalDateTime(date),31,ChronoUnit.DAYS);
			//每月还款日
			int dayOfMonth=RepaymentPeriod.getDayOfMonth();
			//第一个月月数
			int month=RepaymentPeriod.getMonthValue();
			int nowDayOfMonth=LocalDateTime.now().getDayOfMonth();
			int nowMonth=LocalDateTime.now().getMonthValue();
			SubjectMatterType subjectMatterType=smts.selectByPrimaryKey(sm.getTypeId().shortValue());
			int RepaymentMethodId=subjectMatterType.getRepaymentMethodId();
			RepaymentMethod rm=rms.selectByPrimaryKey(BigDecimal.valueOf(RepaymentMethodId));
			//年利率
			BigDecimal normalInterestRate=rm.getNormalInterestRate();
			//还款期数
			BigDecimal trem=subjectMatterType.getDebtPeriod();
			if(rrList.size()<=trem.intValue()) {
				if(nowDayOfMonth==dayOfMonth) {
					BigDecimal loanAmount=sm.getLoanAmount();
					BigDecimal monthlyRepayment=CalculationUtil.monthlyRepayment(loanAmount, normalInterestRate,trem.intValue());
					//从借款人账户扣款
					
					if(true) {
						//如果成功,通知
						
						//插入还款记录
						RepaymentRecord rr=new RepaymentRecord();
						rr.setTerm((short)(rrList.size()+1));
						rr.setSubjectMatterId(sm.getId());
						rr.setAmount(monthlyRepayment);
						repaymentRecordS.insert(rr);
						//还完所有期数，修改状态为已完成
						if(rrList.size()==trem.intValue()) {
							sm.setStatus(6);
							if(sms.updateByPrimaryKeySelective(sm)>0) {
								
								
								
							}
						}
					}else {
						//失败，通知
						
						//修改状态为逾期
						sm.setStatus(5);
						if(sms.updateByPrimaryKeySelective(sm)>0) {
							//插入逾期记录
							OverdueRecord or=new OverdueRecord();
							//未处理
							or.setOverdueStatus((short)0);
							or.setSubjectMatterId(sm.getId());
							or.setTerm((short)(rrList.size()+1));
							or.setCreateTime(new Date());
							int count=ors.insert(or);
							
						}
					}
					
				}
			}
			
		}
		
	}
	//借款过期处理 ,前台获取借款信息时判断时间是否过期，过期修改状态 
	public void subjectMatterOverdue() {
		List<SubjectMatter>list=sms.selectNoFullMark();
		for(int i=0;i<list.size();i++) {
			SubjectMatter s=list.get(i);
			SubjectMatterType subjectMatterType=s.getSubjectMatterType();
			int term=subjectMatterType.getPeriod();
			long d=s.getCreateTime().getTime();
			long day=new Date().getTime();
			if(day-d>=term*24*60*60*1000) {
				s.setStatus(1);
				if(sms.insert(s)>0) {
					
				}else {
					
				}
			}
		}
		
	}

	
}
