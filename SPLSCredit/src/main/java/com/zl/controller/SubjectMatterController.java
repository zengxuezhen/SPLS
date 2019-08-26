package com.zl.controller;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zl.API.CreditService;
import com.zl.API.CreditorOrderRecordService;
import com.zl.pojo.AllUser;
import com.zl.pojo.Credit;
import com.zl.pojo.FenYe;
import com.zl.pojo.OverdueRecord;
import com.zl.pojo.RepaymentRecord;
import com.zl.pojo.ResultModel;
import com.zl.pojo.SubjectMatter;
import com.zl.pojo.SubjectMatterType;
import com.zl.service.OverdueRecordService;
import com.zl.service.RepaymentRecordService;
import com.zl.service.SubjectMatterService;
import com.zl.util.CalculationUtil;
import com.zl.util.DateUtil;
import com.zl.util.JsonUtil;
/*
 * 标的
 */
@Controller
public class SubjectMatterController {
	@Autowired
	private SubjectMatterService sm;
	@Autowired
	private CreditService cs;
	@Autowired
	private OverdueRecordService ors;
	@Autowired
	private RepaymentRecordService rrs;
	//逾期还款申请
	@RequestMapping("/applicationForOverdueRepayment")
	@ResponseBody
	public Object applicationForOverdueRepayment(long[] subjectMatterIds) {
		ResultModel rm=new ResultModel();
		try {
			ors.applicationForOverdueRepayment(subjectMatterIds);
			rm.setSuccess(true);
		} catch (Exception e) {
			rm.setMessage("逾期还款失败");
			e.printStackTrace();
		}
		return rm;
	}
	//提前还款申请
	@RequestMapping("/applicationForAdvancePayment")
	@ResponseBody
	public Object applicationForAdvancePayment(long[] subjectMatterIds) {
		ResultModel rm=new ResultModel();
		try {
			rrs.applicationForAdvancePayment(subjectMatterIds);
			rm.setSuccess(true);
		} catch (Exception e) {
			rm.setMessage("提前还款失败");
			e.printStackTrace();
		}
		return rm;
	}
	//根据标的Id计算逾期费用
	@RequestMapping("/getOverdueCalculation")
	@ResponseBody
	public Object getOverdueCalculation(Long id) {
		List<Map>list=ors.queryForOverdueFeeInformation(id);
		return list;
	}
	//债权转让分页
	@RequestMapping("/queryCreditSubjectMatterId")
	@ResponseBody
	public Map<String,Object> selectCreditSubjectMatterId(FenYe fenYe) {
		Map<String,Object> map=new HashMap();
		List<SubjectMatter> creditSubjectMatterList=sm.selectCreditSubjectMatterId(fenYe);
		List<SubjectMatter> SubjectMatterList=new ArrayList();
		List<Integer> residualPeriodList=new ArrayList();
		List<String> coefficientList=new ArrayList();
		System.out.println(creditSubjectMatterList);
		for(int i=0;i<creditSubjectMatterList.size();i++) {
			SubjectMatter s=sm.selectSubjectMatterAndType(new BigDecimal(creditSubjectMatterList.get(i).getOriginSubjectMatterId()));
			SubjectMatterList.add(s);
			//生效时间
			Date date=s.getFilledTime();
			System.out.print(date);
			//月数
			BigDecimal debtPeriod=s.getSubjectMatterType().getDebtPeriod();
			int [] monthAndDay= DateUtil.monthAnd30Day(new Date(),DateUtil.getTermDate(date,debtPeriod.intValue()));
			//天数大于0月数加1
			if(monthAndDay[1]>0) {
				monthAndDay[0]+=1;
			}
			//剩余期限
			residualPeriodList.add(monthAndDay[0]);
			//债权转让人原始购买信息
			String json=cs.getCreditByUserIdAndSubjectId(creditSubjectMatterList.get(i).getDebtorUserId(), s.getId());
			Credit credit=JsonUtil.jsonToObject(json, Credit.class);
			//System.out.println(creditSubjectMatterList.get(i).getLoanAmount()+".."+);
			//转让系数
			coefficientList.add(creditSubjectMatterList.get(i).getLoanAmount().divide(credit.getAmount(),0,RoundingMode.CEILING).multiply(new BigDecimal("100"))+"%");
		}
		//转让系数
		map.put("coefficientList",coefficientList);
		//剩余期限
		map.put("residualPeriodList",residualPeriodList);
		//债权标的信息
		map.put("CreditSubjectMatterList", creditSubjectMatterList);
		//原始标的信息
		map.put("subjectMatterList", SubjectMatterList);
		map.put("fenYe", fenYe);
		return map;
	}
	
		
	//调用Debit-service服务的根据标的ID查询所有债权人信息
	@RequestMapping("/credit/getCreditBySubjectId")
	@ResponseBody
	public String getCreditBySubjectId(Long id) {
		AllUser user=new AllUser();
		user.setUserName("aaaaaaaaaaaaaaaaaa");
		return cs.getCreditBySubjectId(id);
	}
	/*
	 *查询所有未满标的标的
	 */
	@RequestMapping("/querySubjectMatterFy")
	@ResponseBody
	public Map<String,Object> querySubjectMatterFy(FenYe fenYe){
		System.out.print(fenYe);
		Map<String,Object> map=new HashMap();
		List<SubjectMatter>list=sm.selectAllFy(fenYe);
		map.put("SubjectMatterList", list);
		map.put("fenYe", fenYe);
		return map;
	}
	/*
	 *用户申请借款添加记录
	 */
	@RequestMapping("/addSubjectMatter")
	@ResponseBody
	public  Map<String,Object> insert(SubjectMatter record){
		record.setCreateTime(new Date());
		Map<String,Object> map=new HashMap();
		//查询用户之前未满标标的和本次申请额度是否大于额定额度
		if(sm.insert(record)>0) {
			map.put("success", true);
		}else{
			map.put("success", false);
		}
		return map;
	}
	//查询标的关联的类型和还款方式
	@RequestMapping("/querySubjectMatterAndType")
	@ResponseBody
	public Map<String,Object>  selectSubjectMatterAndType(BigDecimal id){
		SubjectMatter s=sm.selectSubjectMatterAndType(id);
		Map<String,Object> map=new HashMap();
		map.put("SubjectMatterAndType", s);
		return map;
	}
	//修改标的状态
	@RequestMapping("/updateSubjectMatterStatus")
	@ResponseBody
	public Object  updateByPrimaryKey(SubjectMatter record) {
		ResultModel rm=new ResultModel();
		if(sm.updateByPrimaryKeySelective(record)>0) {
			rm.setSuccess(true);
		}
		return rm;
	}
	//查询前台所有借款信息，按最近的时间排序
	@RequestMapping("/selectAll")
	@ResponseBody
	public Object  selectAll(BigDecimal id) {
		ResultModel rm=new ResultModel();
		List<SubjectMatter> list=sm.selectAll();
		if(list.size()>0) {
			rm.setSuccess(true);
			rm.setData(list);
		}
		return rm;
	}
	//查询标的ID关联的逾期记录
	@RequestMapping("/querySubjectMatterAndOverdueRecord")
	@ResponseBody
	public Object  selectSubjectMatterAndOverdueRecord(long id) {
		ResultModel rm=new ResultModel();
		SubjectMatter s=sm.selectSubjectMatterAndOverdueRecord(id);
		if(s!=null) {
			rm.setSuccess(true);
			rm.setData(sm);
		}
		return rm;
	}
	//查询标的ID关联的还款记录
	@RequestMapping("/querySubjectMatterAndRepaymentRecord")
	@ResponseBody
	public Object selectSubjectMatterAndRepaymentRecord(long id){
		ResultModel rm=new ResultModel();
		SubjectMatter s=sm.selectSubjectMatterAndRepaymentRecord(id);
		if(s!=null) {
			rm.setSuccess(true);
			rm.setData(sm);
		}
		return rm;
	}
	//查询期限内未满标的所有借款
	@RequestMapping("/queryAllNoFullMarkSubjectMatter")
	@ResponseBody
	public Object selectNoFullMark() {
		ResultModel rm=new ResultModel();
		List<SubjectMatter> list=sm.selectNoFullMark();
		if(list.size()>0) {
			rm.setSuccess(true);
			rm.setData(list);
		}
		return rm;
	}
	//查询所有满标(还款中)的所有借款
	@RequestMapping("/queryAllFullMarkSubjectMatter")
	@ResponseBody
	public Object selectFullMark() {
		ResultModel rm=new ResultModel();
		List<SubjectMatter> list=sm.selectFullMark();
		if(list.size()>0) {
			rm.setSuccess(true);
			rm.setData(list);
		}
		return rm;
	}
	//查询用户的所有借款
	@RequestMapping("/querySubjectMatterByUserId")
	@ResponseBody
	public Object selectSubjectMatterByUserId(long id) {
		ResultModel rm=new ResultModel();
		List<SubjectMatter> list=sm.selectSubjectMatterByUserId(id);
		if(list.size()>0) {
			rm.setSuccess(true);
			rm.setData(list);
		}
		return rm;
	}
	//查询所有借款关联的还款记录
	@RequestMapping("/queryAllSubjectMatterAndRepaymentRecord")
	@ResponseBody
	public Object selectAllSubjectMatterAndRepaymentRecord() {
		ResultModel rm=new ResultModel();
		List<SubjectMatter> list=sm.selectAllSubjectMatterAndRepaymentRecord();
		if(list.size()>0) {
			rm.setSuccess(true);
			rm.setData(list);
		}
		return rm;
	}

	//查询所有债权转让标的
	@RequestMapping("/queryAllFySubjectMatterAndCredit")
	@ResponseBody
	public Object selectAllFySubjectMatterAndCredit(FenYe fenYe) {
		Map<String,Object>map=new HashMap();
		map.put("SubjectMatterAndCredit", sm.selectAllFySubjectMatterAndCredit(fenYe));
		return map;
	}
}
