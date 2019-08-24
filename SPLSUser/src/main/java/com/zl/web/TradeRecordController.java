package com.zl.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zl.pojo.AllUser;
import com.zl.pojo.TradeRecord;
import com.zl.query.Paging;
import com.zl.service.TradeService;
import com.zl.service.TradeTypeService;
import com.zl.view.TradeRecordView;

/**
 * 显示所有交易记录控制器
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/user")
public class TradeRecordController {
	@Autowired
	private TradeService ts;
	@Autowired
	private TradeTypeService ps;
	
	/**
	 * 点击交易记录跳转到显示页面
	 * @param session
	 * @return
	 */
	@RequestMapping("/record/toShow")
	public String toShowRecordPage(HttpSession session, Map<String, Object> map) {
		AllUser user=new AllUser();
		user.setId(1L);
		session.setAttribute("user", user);
		map.put("typeList", ps.queryTradeTypeAll());
		return "/交易记录";
	}
	
	/**
	 * 用户所有交易记录分页条件显示
	 * @param fenye
	 * @return
	 * 包括充值和提现记录
	 */
	@RequestMapping("/record/showMyAll")
	@ResponseBody
	public Map<String, Object> showMyAllRecord(@RequestBody Paging paging, HttpSession session){
		System.out.println("前端传递过来的分页对象："+paging);
		Map<String, Object> map=new HashMap<String, Object>();
		List<TradeRecordView> list=ts.queryTradeRecordPaging(paging, session);
		map.put("message", "用户所有交易记录");
		map.put("recordList", list);
		map.put("paging", paging);
		System.out.println("检索记录："+list);
		System.out.println("分页对象："+paging);
		return map;
	}

	/**
	 * 用户点击查看显示交易详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/record/showItem")
	@ResponseBody
	public Map<String, Object> showItemRecord(int id){
		Map<String, Object> map=new HashMap<String, Object>();
		TradeRecord record=ts.queryTradeRecordById(id);
		map.put("message", "用户单条交易记录");
		map.put("record", record);
		System.out.println(record);
		return map;
	}
	
}
