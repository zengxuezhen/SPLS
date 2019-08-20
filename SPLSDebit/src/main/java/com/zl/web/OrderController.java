package com.zl.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.zl.pojo.CreditorOrderRecord;
import com.zl.service.CreditorOrderRecordService;

@RestController
@RequestMapping("/orderRecord")
public class OrderController {
	@Autowired
	private CreditorOrderRecordService cs;
	@PostMapping(path="/makeOrderRecord")
	//添加订单
	public Map<String, Object> MakeOrder(@RequestBody CreditorOrderRecord creditorOrderRecord) throws JsonParseException, JsonMappingException, IOException {
				
		//调用service层接口，添加记录
		Map<String,Object> result=new HashMap<String,Object>();
		
		cs.addCreditorOrderRecord(creditorOrderRecord);
		//result.put("order", orderRecord);
		//######################
		return result;
		
	}

	//按ID查询订单记录表
	@GetMapping(path="getTotalAmount")
	public Map<String, Object> getTotalAmount(@RequestBody Long id){
		CreditorOrderRecord creditorOrderRecord=cs.queryOrderRecordById(id);
		Map<String,Object> result=new HashMap<String,Object>();
		result.put("creditorOrderRecord", creditorOrderRecord);
		return result;
		
	}
	//按原始标的外键查询订单表
	@GetMapping(path="getOrderRecordByOriginSubjectId")
	public Map<String, Object> getOrderRecordByOriginSubjectId(@RequestBody Long originSubjectId){
		List<CreditorOrderRecord> orders=new ArrayList<CreditorOrderRecord>();
		orders=cs.queryOrderRecordByOriginSubjectId(originSubjectId);
		Map<String,Object> result=new HashMap<String,Object>();
		result.put("orders", orders);
		return result;
		
	}
	
}
