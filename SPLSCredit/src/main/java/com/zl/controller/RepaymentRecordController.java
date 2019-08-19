package com.zl.controller;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.zl.pojo.RepaymentRecord;
import com.zl.pojo.ResultModel;
import com.zl.service.RepaymentRecordService;

/*
 * 还款
 */
@Controller
public class RepaymentRecordController {
	@Autowired
	private RepaymentRecordService rr;
	//添加还款记录
	@RequestMapping("/addRepaymentRecord")
	@ResponseBody
	public Object insert(RepaymentRecord record) {
		record.setCreateTime(new Date());
		ResultModel rm=new ResultModel();
		if(rr.insert(record)>0) {
			System.out.print(".......................----");
			rm.setSuccess(true);
		}
		return rm;
	}
	/*
	 * 根据标的id查询所有还款记录
	 */
	@RequestMapping("/queryRepaymentRecordBySubjectMatterId")
	@ResponseBody
	public Object selectRepaymentRecordBySubjectMatterId(Long id) {
		ResultModel rm=new ResultModel();
		List<RepaymentRecord> list=rr.selectRepaymentRecordBySubjectMatterId(id);
		if(list!=null&&list.size()>0) {
			rm.setSuccess(true);
			rm.setData(list);
		}
		return rm;
	}

}
