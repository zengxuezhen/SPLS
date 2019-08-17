package com.zl.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zl.pojo.Credit;
import com.zl.pojo.CreditorOrderRecord;
import com.zl.service.CreditService;

@Controller
@RequestMapping("/credit")
public class CreditController {
	@Autowired
	private CreditService cs;
	@PostMapping(path="addCredit")
	@ResponseBody
	public Map<String, Object> addCredit(@RequestBody CreditorOrderRecord creditorOrderRecord){
		
		Map<String,Object> result=new HashMap<String,Object>();
		cs.addCredit(creditorOrderRecord);
		
		return null;
		
	}
	//按ID获取Credit
	@RequestMapping
	@ResponseBody
	public Map<String, Object> getCreditById(@RequestBody Long id){
		Map<String,Object> result=new HashMap<String,Object>();
		Credit credit=cs.queryCreditById(id);
		result.put("credit", credit);
		
		return null;
		
	}
	//按标的ID获取Credit
	@RequestMapping
	@ResponseBody
	public Map<String, Object> getCreditBySubjectId(@RequestBody Long id){
		Map<String,Object> result=new HashMap<String,Object>();
		List<Credit> credits=new ArrayList<Credit>();
		credits=cs.queryCreditBySubjectId(id);
		result.put("credits", credits);
		return result;
	}
}
