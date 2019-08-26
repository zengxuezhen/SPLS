package com.zl.API;

import java.util.List;
import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.zl.pojo.AccountInfo;

@FeignClient(value="user-service")
public interface UserService {
	//发送短信
	@RequestMapping(value="/sendUserTelphoneMessage")
	public String sendUserTelphoneMessage(@RequestParam("id")long id,@RequestParam("msg")String msg);
	//标的过期债权人退款
	@RequestMapping(value="/modifyAmount",method=RequestMethod.POST)
	public String setModifyAmount(List<Long> subjectIds);
	//给用户账户扣款或回款
	/*
	 * userId:用户
	 * amount:扣款或回款金额
	 */
	@RequestMapping(value="/modifyActiveAmount",method=RequestMethod.POST)
	public String setModifyActiveAmount(List<AccountInfo> list);
}
