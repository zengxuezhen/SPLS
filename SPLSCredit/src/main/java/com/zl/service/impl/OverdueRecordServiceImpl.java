package com.zl.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zl.API.UserService;
import com.zl.dao.OverdueRecordMapper;
import com.zl.pojo.AccountInfo;
import com.zl.pojo.OverdueRecord;
import com.zl.pojo.RepaymentRecord;
import com.zl.pojo.SubjectMatter;
import com.zl.pojo.SubjectMatterType;
import com.zl.service.OverdueRecordService;
import com.zl.service.RepaymentRecordService;
import com.zl.service.SubjectMatterService;
import com.zl.util.CalculationUtil;
import com.zl.util.DateUtil;
/*
 * 逾期记录
 */
@Service
public class OverdueRecordServiceImpl implements OverdueRecordService {
	@Autowired
	private OverdueRecordMapper or;
	@Autowired
	private SubjectMatterService sms;
	@Autowired
	private SubjectMatterService sm;
	@Autowired
	private RepaymentRecordService rrs;
	@Autowired
	private OverdueRecordService ors;
	@Autowired 
	private UserService us;
	@Transactional
	@Override
	public int deleteByPrimaryKey(Long id) {
		// TODO Auto-generated method stub
		return or.deleteByPrimaryKey(id);
	}
	@Transactional
	@Override
	public int insert(OverdueRecord record) {
		// TODO Auto-generated method stub
		return or.insert(record);
	}
	
	@Override
	public int insertSelective(OverdueRecord record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public OverdueRecord selectByPrimaryKey(Long id) {
		// TODO Auto-generated method stub
		return or.selectByPrimaryKey(id);
	}
	@Transactional
	@Override
	public int updateByPrimaryKeySelective(OverdueRecord record) {
		// TODO Auto-generated method stub
		return or.updateByPrimaryKeySelective(record);
	}
	@Transactional
	@Override
	public int updateByPrimaryKey(OverdueRecord record) {
		// TODO Auto-generated method stub
		return or.updateByPrimaryKey(record);
	}

	@Override
	public List<OverdueRecord> selectOverdueRecordBySubjectMatterId(Long id) {
		// TODO Auto-generated method stub
		return or.selectOverdueRecordBySubjectMatterId(id);
	}
	//借款过期处理 ,获取借款信息时判断时间是否过期，过期修改状态 
	@Transactional
	@Override
	public int subjectMatterOverdue() throws Exception {
		int flag=0;
		List<SubjectMatter>list=sms.selectNoFullMark();
		List<Long> ids=new ArrayList();
		for(int i=0;i<list.size();i++) {
			ids.add(list.get(i).getId());
			SubjectMatter s=list.get(i);
			SubjectMatterType subjectMatterType=s.getSubjectMatterType();
			int term=subjectMatterType.getPeriod();
			long d=s.getCreateTime().getTime();
			long day=new Date().getTime();
			if(day-d>=term*24*60*60*1000) {
				s.setStatus(1);
				if(sms.insert(s)>0) {
					flag++;
				}
			}
		}
		//调用用户接口退款
		if(us.setModifyAmount(ids).equals("true")){
			flag=1;
		}else {
			throw new Exception("债权人退款失败，再做后续处理");
		}
		return flag;
	}
	//逾期费用查询
	public List<Map>queryForOverdueFeeInformation(long subjectMatterId){
		List<Map> list=new ArrayList();
		SubjectMatter subjectMatter=sm.selectByPrimaryKey(new BigDecimal(subjectMatterId));
		List<OverdueRecord>overdueRecordList=ors.selectOverdueRecordBySubjectMatterId(subjectMatterId);
		//期限
		int term=subjectMatter.getSubjectMatterType().getDebtPeriod().intValue();
		BigDecimal normalInterestRate=subjectMatter.getSubjectMatterType().getRepaymentMethod().getNormalInterestRate();
		BigDecimal overdueInterestRate=subjectMatter.getSubjectMatterType().getRepaymentMethod().getOverdueInterestRate();
		Date startDate=subjectMatter.getFilledTime();
		for(int i=0;i<overdueRecordList.size();i++) {
			Map<String,BigDecimal>map=CalculationUtil.overdueCalculationNo(subjectMatter.getLoanAmount(),overdueInterestRate,
					term,normalInterestRate,startDate,i);
			list.add(map);
		}
		return list;
		
	}
	//逾期还款处理
	@Transactional
	@Override
	public int applicationForOverdueRepayment(long[] subjectMatterIds) throws Exception {
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
			if(overdueRecordList.size()>0) {
				
				/*
				//每一期还款日（月的号数）
				Date repaymentRecordDate=DateUtil.getfastIssueDate(startDate);
				//距下一还款日还有多少天
				int daysDue=0;
				Date day=new Date();
				daysDue=day.getDay()-repaymentRecordDate.getDay();
				if(daysDue<0) {
					//如果小于这个月获取 上一月的天数加上这个月已过的天数
					repaymentRecordDate.setMonth(repaymentRecordDate.getMonth()-1);
					daysDue=DateUtil.getDaysOfMonth(repaymentRecordDate)+repaymentRecordDate.getDay()+day.getDay();
					
				}*/
				//起息日
				Date startDate=subjectMatter.getFilledTime();
				//逾期还款的总费用
				BigDecimal totalOverdueExpenses=CalculationUtil.allOverdueCalculation(subjectMatter.getLoanAmount(),
						overdueInterestRate, 
						term, normalInterestRate, repaymentRecordList.size()+1,
						repaymentRecordList.size()+overdueRecordList.size(),startDate);
				
				//调用用户的扣款接口
				long userId=subjectMatter.getDebtorUserId();
				AccountInfo account=new AccountInfo();
				account.setId(userId);
				account.setActiveAmount(totalOverdueExpenses);
				List<AccountInfo>list=new ArrayList();
				list.add(account);
				String success=us.setModifyActiveAmount(list);
				if(success!=null&&success.equals("true")) {
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
					us.sendUserTelphoneMessage(subjectMatter.getDebtorUserId()
							,"你的标的编号为："+subjectMatter.getMatterNo()+"订单提前还款成功");
				}else {
					//帐户扣款失败，消息通知
					us.sendUserTelphoneMessage(subjectMatter.getDebtorUserId()
							,"你的标的编号为："+subjectMatter.getMatterNo()+"订单提前还款失败");
					//返回结果信息
				}
			}
		}
		return flag;
	}
	

}
