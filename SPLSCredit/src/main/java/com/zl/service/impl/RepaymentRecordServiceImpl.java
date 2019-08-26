package com.zl.service.impl;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zl.API.CreditService;
import com.zl.dao.RepaymentRecordMapper;
import com.zl.pojo.Credit;
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
import com.zl.util.DateUtil;
import com.zl.util.LocalDateTimeUtil;
/*
 * 还款记录
 */
@Service
public class RepaymentRecordServiceImpl implements RepaymentRecordService {
	@Autowired
	private RepaymentRecordMapper rr;
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
	private CreditService cs;
	@Autowired
	private StringRedisTemplate srt;
	@Autowired
	private SubjectMatterService sm;
	@Autowired
	private RepaymentRecordService rrs;
	
	////提前还款处理
	@Transactional
	@Override
	public int applicationForAdvancePayment(long[] subjectMatterIds) throws Exception {
		List<RepaymentRecord> repaymentRecordList=null;
		List<OverdueRecord> overdueRecordList=null;
		List<SubjectMatter> subjectMatterList=new ArrayList();
		int flag=0;
		//根据Id查询余下期数费用
		for(int i=0;i<subjectMatterIds.length;i++) {
			SubjectMatter subjectMatter=sm.selectByPrimaryKey(new BigDecimal(subjectMatterIds[i]));
			subjectMatterList.add(subjectMatter);
			repaymentRecordList=rrs.selectRepaymentRecordBySubjectMatterId(subjectMatterIds[i]);
			overdueRecordList=ors.selectOverdueRecordBySubjectMatterId(subjectMatterIds[i]);
			//期限
			int term=subjectMatter.getSubjectMatterType().getDebtPeriod().intValue();
			BigDecimal normalInterestRate=subjectMatter.getSubjectMatterType().getRepaymentMethod().getNormalInterestRate();
			BigDecimal overdueInterestRate=subjectMatter.getSubjectMatterType().getRepaymentMethod().getOverdueInterestRate();
			BigDecimal monthRecord=CalculationUtil.monthlyRepayment(subjectMatter.getLoanAmount(),
					normalInterestRate, term);
			//未到期还款
			BigDecimal undueRepayment=monthRecord.multiply(new BigDecimal(term-repaymentRecordList.size()-overdueRecordList.size()));
			BigDecimal totalOverdueExpenses=new BigDecimal("0");
			if(overdueRecordList.size()>0) {
				//起息日
				Date startDate=subjectMatter.getFilledTime();
				//逾期还款的总费用
				totalOverdueExpenses=CalculationUtil.allOverdueCalculation(subjectMatter.getLoanAmount(),
						overdueInterestRate, 
						term, normalInterestRate, repaymentRecordList.size()+1,
						repaymentRecordList.size()+overdueRecordList.size(),startDate);
				/*
				Date startDate=subjectMatter.getFilledTime();
				//还款日（月的多少号）
				Date repaymentRecordDate=DateUtil.getLastIssue(startDate, term);
				//距下一还款日还有多少天
				int daysDue=0;
				Date day=new Date();
				daysDue=-day.getDay()-repaymentRecordDate.getDay();
				if(daysDue<0) {
					//如果小于这个月获取 上一月的天数加上这个月已过的天数
					repaymentRecordDate.setMonth(repaymentRecordDate.getMonth()-1);
					daysDue=DateUtil.getDaysOfMonth(repaymentRecordDate)+repaymentRecordDate.getDay()+day.getDay();
					
				}
				//DateUtil.differentDaysByMillisecond(new Date(),);
				//逾期还款的总费用
				totalOverdueExpenses=CalculationUtil.overdueCalculation(subjectMatter.getLoanAmount(),
						overdueInterestRate, 
						term, normalInterestRate, repaymentRecordList.size()+1,
						repaymentRecordList.size()+overdueRecordList.size(), daysDue);*/
			}	
			//提前还款总费用 
			BigDecimal  totalAdvancePaymentCost=undueRepayment.add(totalOverdueExpenses);
			//调用用户的扣款接口
			//.............
			if(true) {
				//修改村的状态为已完成，消息通知
				subjectMatter.setStatus(6);
				if(sm.updateByPrimaryKeySelective(subjectMatter)!=1) {
					throw new Exception("修改失败");
				}
				//增加还款记录
				for(int j=repaymentRecordList.size();j<=term;j++) {
					 repaymentRecordList.get(j);
					 RepaymentRecord rr=new RepaymentRecord();
					 rr.setAmount(monthRecord);
					 rr.setCreateTime(new Date());
					 rr.setSubjectMatterId(subjectMatter.getId());
					 rr.setTerm((short)j);
					 if(rrs.insert(rr)!=1) {
						throw new Exception("插入失败");
					}
				}
				//修改逾期记录状态为已还款
				for(int j=0;j<overdueRecordList.size();j++) {
					OverdueRecord overdueRecord=overdueRecordList.get(j);
					//修改逾期记录为已完成
					overdueRecord.setOverdueStatus((short)1);
					if(ors.insert(overdueRecord)!=1) {
						throw new Exception("插入失败");
					}
				}
				//返回结果信息
				flag=0;
			}else {
				//帐户扣款失败，消息通知
				//返回结果信息
			}
			
		}
		return flag;
	}
	@Override
	public int deleteByPrimaryKey(Long id) {
		// TODO Auto-generated method stub
		return rr.deleteByPrimaryKey(id);
	}

	@Override
	public int insert(RepaymentRecord record) {
		// TODO Auto-generated method stub
		return rr.insert(record);
	}

	@Override
	public int insertSelective(RepaymentRecord record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public RepaymentRecord selectByPrimaryKey(Long id) {
		// TODO Auto-generated method stub
		return rr.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(RepaymentRecord record) {
		// TODO Auto-generated method stub
		return rr.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(RepaymentRecord record) {
		// TODO Auto-generated method stub
		return rr.updateByPrimaryKey(record);
	}

	@Override
	public List<RepaymentRecord> selectRepaymentRecordBySubjectMatterId(Long id) {
		// TODO Auto-generated method stub
		return rr.selectRepaymentRecordBySubjectMatterId(id);
	}
	@Transactional
	//定时还款处理
	@Override
	public void RepaymentRecordHandle() throws Exception {
		//查询所有还款状态中的标的和关联的还款记录
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
							//借款金额
							BigDecimal loanAmount=sm.getLoanAmount();
							//月还款
							BigDecimal monthlyRepayment=CalculationUtil.monthlyRepayment(loanAmount, normalInterestRate,trem.intValue());
							//调用接口从借款人账户扣款
							//...........
							boolean flag=true;
							if(flag) {
								//插入还款记录
								RepaymentRecord rr=new RepaymentRecord();
								rr.setTerm((short)(rrList.size()+1));
								rr.setSubjectMatterId(sm.getId());
								rr.setAmount(monthlyRepayment);
								if(repaymentRecordS.insert(rr)==0) {
									throw new Exception("插入还款记录失败");
								}
								//还完所有期数，修改状态为已完成
								if(rrList.size()==trem.intValue()) {
									sm.setStatus(6);
									if(sms.updateByPrimaryKeySelective(sm)==0) {
										throw new Exception("修改状态为已完成失败");
									}
								}
								//获取标的关联的投资人信息
								String jsonCredit=cs.getCreditBySubjectId(sm.getId());
								List<Credit> creditList=null;
								if(jsonCredit!=null&&!"".equals(jsonCredit)) {
									try {
										 creditList= new ObjectMapper().readValue(jsonCredit,new TypeReference<List<Credit>>() {});
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
									int count=0;
									for(int j=0;j<creditList.size();j++) {
										Credit c=creditList.get(j);
										long debitorUserId=c.getDebitorUserId();
										BigDecimal amount= c.getAmount();
										MathContext mc=new MathContext(2, RoundingMode.HALF_DOWN);
										BigDecimal returnAmount=amount.divide(loanAmount,5,RoundingMode.CEILING)
										.multiply(monthlyRepayment,mc);
										//调用接口出借人收款
										//.......
										//插入出借人回款信息
										ReturnRecord returnRecord=new ReturnRecord();
										returnRecord.setAmount(returnAmount);
										returnRecord.setCreateTime(new Date());
										returnRecord.setTerm(rrList.size()+1);
										returnRecord.setCreditId(c.getId());
										if(returnRecordS.insert(returnRecord)>0) {
											count++;
										}
									}
									if(count!=creditList.size()) {
										throw new Exception("出借人回款记录插入失败");
									}
									//如果成功,通知，存入redit,另一个定时器通知
									//...........
									//收款人通知,10点左右失效
									srt.opsForValue().set("msg_"+sm.getDebtorUserId(),"你好，你的借款编号为："+sm.getMatterNo()+"订单还款成功", 10,TimeUnit.HOURS);
									for(int k=0;k<creditList.size();k++) {
										Credit c=creditList.get(k);
										long debitorUserId=c.getDebitorUserId();
										//出借人通知，10点左右失效
										srt.opsForValue().set("msg_"+debitorUserId,"你好，你出借订单编号为："+sm.getMatterNo()+"订单回款成功", 10,TimeUnit.HOURS);
										
									}
								}else {
									return;
								}
								
							}else {
								
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
									
								}else {
									throw new Exception("借款人插入逾期记录失败");
								}
								
								//失败，通知
								//出借人逾期通知，10点左右失效
								srt.opsForValue().set("msg_"+sm.getDebtorUserId(),"你好，你的借款编号为："+sm.getMatterNo()+"订单扣款失败", 10,TimeUnit.HOURS);
							}
							
						}
					}
					
				}
		
	}

}
