package com.zl.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 提现操作控制器
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/user/trade")
public class WithdrawController {

	
	@RequestMapping("/withdrawCash")
	public Map<String, Object> withdrawCash(){
		Map<String, Object> map=new HashMap<>();
		map.put("message", "在这里进行接收提现金额，提现操作处理");
		return map;
	}
	
}
