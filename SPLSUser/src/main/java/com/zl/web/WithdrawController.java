package com.zl.web;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zl.pojo.AccountInfo;
import com.zl.pojo.AllUser;
import com.zl.pojo.BankCard;
import com.zl.service.AccountInfoService;
import com.zl.service.BankCardService;
import com.zl.service.TradeService;
import com.zl.util.PrivacyUtil;

/**
 * 提现操作控制器
 * @author 王静
 *
 */
@Controller
@RequestMapping("/user/trade")
public class WithdrawController {
	@Autowired
	private TradeService ts;
	@Autowired
	private AccountInfoService as;
	@Autowired
	private BankCardService bs;
	
	/**
	 * 跳转到提现页面
	 * @param session
	 * @param map
	 * @return
	 */
	@RequestMapping("/toWithdraw")
	public String toWithdrawPage(HttpSession session, Map<String, Object> map) {
		AllUser user=new AllUser();
		user.setId(1L);
		session.setAttribute("user", user);
		AccountInfo info=as.queryAccountInfoByUserId(user.getId());
		BankCard bank=bs.queryBankCardByUserId(user.getId());
		map.put("user", user);
		map.put("bankNo", PrivacyUtil.encryptBankAcct(bank.getCardNo()));
		map.put("bankBranch", bank.getBranch());
		map.put("info", info);
		return "/提现";
	}
	
	
	@RequestMapping("/cashBankCard")
	public String withdrawCash(BankCard card, Map<String, Object> map){
		System.out.println("表单提交数据："+card);
		int num=ts.withdrawRecordBank(card);
		if(num>0) {
			return "redirect:/trade_success.html";
		}else {
			return "redirect:/trade_error.html";
		}
	}
	
}
