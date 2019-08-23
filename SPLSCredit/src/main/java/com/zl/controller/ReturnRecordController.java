package com.zl.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.zl.pojo.ReturnRecord;
import com.zl.service.ReturnRecordService;
import com.zl.view.ReturnRecordView;

/**
 * 回账记录
 * @author Administrator
 *
 */
@Controller
public class ReturnRecordController {

	@Autowired
	private ReturnRecordService rs;
	
	/**
	 * 回账记录显示要调用的外部接口
	 * @param map
	 * @return
	 */
	@RequestMapping("/returns/myRecord")
	@ResponseBody
	public Map<String, Object> queryMyAllReturnRecord(@RequestBody Map<String, Object> map){
		PageHelper.startPage((int) map.get("pageIndex"), (int) map.get("pageSize"));
		List<ReturnRecordView> list=rs.queryReturnRecordByLimit(map);
		System.out.println("credit服务："+list);
		int count=rs.queryReturnRecordCount(map);
		map.put("returnList", list);
		map.put("rowCount", count);
		return map;
	}
	
}
