package com.zl.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zl.pojo.OverdueRecord;
import com.zl.pojo.ResultModel;
import com.zl.service.OverdueRecordService;

/*
 * 逾期
 */
@Controller
public class OverdueRecordController {
	@Autowired
	private OverdueRecordService or;
	/*
	 * 添加逾期记录
	 */
	@RequestMapping("/addOverdueRecord")
	@ResponseBody
	public Object insert(OverdueRecord record) {
		ResultModel rm=new ResultModel();
		if(or.insert(record)>0) {
			rm.setSuccess(true);
		}
		return rm;
	}
	//根据标的Id查询所有逾期记录
	@RequestMapping("/queryOverdueRecordBySubjectMatterId")
	@ResponseBody
	public Object selectOverdueRecordBySubjectMatterId(long id) {
		ResultModel rm=new ResultModel();
		List<OverdueRecord> list=or.selectOverdueRecordBySubjectMatterId(id);
		if(list!=null&&list.size()>0) {
			rm.setSuccess(true);
			rm.setData(list);
		}
		return rm;
	}
	//修改逾期状态
	@RequestMapping("/updateOverdueRecordStatus")
	@ResponseBody
	public Object updateOverdueRecordStatus(OverdueRecord record) {
		ResultModel rm=new ResultModel();
		if(or.updateByPrimaryKeySelective(record)>0) {
			rm.setSuccess(true);
		}
		return rm;
	}
}
