package com.zl.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.zl.pojo.Credit;
import com.zl.pojo.CreditorOrderRecord;
import com.zl.service.CreditService;

@RestController
@RequestMapping("/credit")
public class CreditController {
	@Autowired
	private CreditService cs;
	//添加债权表记录
	@PostMapping(value="/addCredit")
	public Map<String, Object> addCredit(@RequestBody CreditorOrderRecord creditorOrderRecord) throws JsonParseException, JsonMappingException, IOException{
		
		Map<String,Object> result=new HashMap<String,Object>();
		cs.addCredit(creditorOrderRecord);
		
		return result;
		
	}
	
	//按ID获取Credit
	@GetMapping(value="/getCreditById")
	public Map<String, Object> getCreditById(@RequestBody Long id){
		Map<String,Object> result=new HashMap<String,Object>();
		Credit credit=cs.queryCreditById(id);
		result.put("credit", credit);
		
		return result;
		
	}
	//按原始标的ID获取Credit
	@RequestMapping(path="/getCreditBySubjectId",method=RequestMethod.POST)
	public Map<String, Object> getCreditBySubjectId(@RequestBody Long subjectId){
		Map<String,Object> result=new HashMap<String,Object>();
		List<Credit> credits=new ArrayList<Credit>();
		credits=cs.queryCreditBySubjectId(subjectId);
		result.put("credits", credits);
		return result;
	}
	/**
	 * 根据debtorUserId出借人ID和subjectId原始标的ID查询债权表
	 * @param subjectId
	 * @return
	 */
	@RequestMapping(path="/CreditByDebitorUserIdAndSubjectId",method=RequestMethod.POST)
	public Map<String, Object> getCreditByDebitorUserIdAndSubjectId(@RequestBody Credit credit){
		Map<String,Object> result=new HashMap<String,Object>();
		
		credit=cs.queryCreditByDebitorUserIdAndSubjectId(credit);
		result.put("credit", credit);
		return result;
	}
}
