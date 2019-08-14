package com.zl.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zl.pojo.TopUpRecord;
import com.zl.query.Fenye;
import com.zl.service.TopUpRecordService;

@Controller
public class TopUpRecordController {
	@Autowired
	private TopUpRecordService ts;
	
	@RequestMapping("/top-up-record-fenye")
	@ResponseBody
	public Map<String, Object> queryAll(Fenye fenye){
		Map<String, Object> map=new HashMap<String, Object>();
		List<TopUpRecord> list=ts.queryTopUpRecordAll();
		map.put("list", list);
		System.out.println(list);
		return map;
	}
	
}
