package com.zl.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zl.api.CreditorOrderRecordAPIService;
import com.zl.pojo.AllUser;
import com.zl.pojo.CreditorOrderRecord;
import com.zl.service.TradeService;
import com.zl.view.MonthAccountView;

/**
 * 前端月账记录显示控制器
 * @author Administrator
 *
 */
@Controller

public class MonthAccountController {

	@Autowired
	private TradeService ts;
	@Autowired
	private CreditorOrderRecordAPIService cs;
	
	/**
	 * 前端跳转到月账单显示页面
	 * @return
	 */
	@RequestMapping("/account/toBills")
	public String toMonthBillsPage(HttpSession session) {
		AllUser user=new AllUser();
		user.setId(1L);
		session.setAttribute("user", user);
		return "/user/月度账单";
	}
	
	/**
	 * 显示用户月度账单信息    【//要判断账户创建时间的】
	 * @param session
	 * @return
	 */
	@GetMapping(path="/account/monthBills")
	@ResponseBody
	public Map<String, Object> showMyMonthBills(HttpSession session){
		Map<String, Object> map=new HashMap<String, Object>();
		AllUser user=(AllUser) session.getAttribute("user");
		map.put("message", "这里显示每月的账单信息");
		map.put("userId", user.getId());
		map.put("year", "2019");
		List<MonthAccountView> list=ts.queryMonthAccount(map);
		map.put("viewList", list);
		return map;
	}
	
	/**
	 * 显示债权信息
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/credit/showMyAll")
	@ResponseBody
	public Map<String, Object> showMyAllCreidtRecord() throws Exception{
		Map<String, Object> map=new HashMap<String, Object>();
		String json=cs.getMyCreditOrderAll();
		ObjectMapper om=new ObjectMapper();
		@SuppressWarnings("unchecked")
		List<CreditorOrderRecord> list=om.readValue(json, List.class);
		map.put("viewList", list);
		return map;
	}
	
}
