package com.zl.web;


import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zl.util.CodeUtil;
import com.zl.service.IMailService;
import com.zl.service.PersonalInfoService;
import com.zl.util.CodeUtil;
import com.zl.util.JSONUtil;

@Controller
public class PersonalInfoController {
	@Autowired
	private PersonalInfoService ps;
	@Autowired
	private StringRedisTemplate rt;
	@Autowired
	private IMailService is;

	@RequestMapping(value = "/getPhoneNo", method = RequestMethod.POST)
	@ResponseBody
	// 判断邮箱还是手机号之后发送验证码
	public Map<String, Object> getPhoneNO(@RequestBody String num) throws IOException {
		System.out.println("到达控制器!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11");
		Map<String, Object> map = new HashMap<String, Object>();
		// 接收手机号/邮箱
		System.out.println(num
				+ "+++++++++===========================================================================================================");
		// 判断是邮箱还是手机号的正则表达式
		String em = "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
		String ph = "^[1][34578]\\d{9}$";

		JSONUtil js = new JSONUtil();
		// 获取json的值部分;
		num = js.parseJSONtoStringByKey(num, "num");
		// 删掉除数字外的字符
		num = js.stripNonDigits(num);

		System.out.println(num + "工具后的!!!!!!!!!!!!!!!!!!!!!!!!!!!1111");
		// 短信接口
		CodeUtil cu = new CodeUtil();
		// 手机号登录邮箱登录
		if (num.matches(ph)) {
			// 调用调信接口发送短信验证码并用变量接收
			String verif = cu.getCode(num);
			System.out.println(verif);
			// 返回成功 前端接收后进入输入验证码页面
			map.put("code", "200");
			map.put("verifs", verif);

		} else {
			map.put("code", "400");
		}

		return map;

	}

	// 判断两次密码是否一致后修改密码
	@RequestMapping(value = "/toUpdateUser", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> toUpdateUser(@RequestBody Map<String, Object> ma) {
		System.out.println("请求到达控制器");
		Map<String, Object> map = new HashMap<String, Object>();
		System.out.println(ma.get("telephone"));
		System.out.println(ma.get("pad") + "!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		System.out.println(ma.get("pads"));
		String pad = (String) ma.get("pad");
		String pads = (String) ma.get("pads");
		String telephone = (String) ma.get("telephone");
		System.out.println(telephone + "!!!!!!!!!!!!!!1");
		AllUser user = ps.queryByTelephone(telephone);

		if (pad.equals(pads)) {
			user.setPwd(pad);
			ps.updateUserPad(user);
			map.put("code", "200");
		} else {
			map.put("code", "400");
		}

		return map;

	}

	// 接收手机号验发送验证码
	@RequestMapping(value = "/getTelephone", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getTelephone(@RequestBody Map<String, Object> ma) {
		Map<String, Object> map = new HashMap<String, Object>();
		// 手机号正则表达
		String ph = "^[1][34578]\\d{9}$";
		CodeUtil cu = new CodeUtil();
		System.out.println(ma.get("telephone") + "接收到的手机号!!!!!!!!!!!!!!!!!");
		String telephone = (String) ma.get("telephone");
		System.out.println(telephone + "接收到的手机号转后!!!!!!!!!!!!!!!!!");
		AllUser user = ps.queryByTelephone(telephone);
		if (telephone.matches(ph)) {
			// 调用调信接口发送短信验证码
			String verif = cu.getCode(telephone);
			// 返回成功 前端接收后进入输入验证码页面
			map.put("code", "200");
			// 验证码
			map.put("verifs", verif);
			// 该用户密码
			// map.put("pads", user.getPwd());

		} else {
			// 提示非手机号错误
			map.put("state", "400");
		}
		return map;

	}

	// 接收新旧 手机号修改
	@RequestMapping(value = "/getPhoneVerification", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getPhoneVerification(@RequestBody Map<String, Object> ma) {
		Map<String, Object> map = new HashMap<String, Object>();
		// 获取新旧手机号
		String telephones = (String) ma.get("telephones");
		String telephone = (String) ma.get("telephone");

		// 用旧手机号查询用户表
		AllUser user = ps.queryByTelephone(telephones);
		if (telephone != telephones) {
			ps.updateUserTelephone(user);
			map.put("codes", "200");
		} else {
			map.put("codes", "400");
		}
		return map;

	}

	// 接收邮箱号验证发送验证码
	@RequestMapping(value = "/getEmail", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getEmail(@RequestBody Map<String, Object> ma) {
		Map<String, Object> map = new HashMap<String, Object>();
		System.out.println("到达控制器!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		// 邮箱正则表达
		String em = "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";

		String email = (String) ma.get("email");
		System.out.println(email + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
		String verif = (int) ((Math.random() * 9 + 1) * 100000) + "";
		// 判断是否邮箱
		if (email.matches(em)) {
			// 调用调信接口发送短信验证码
			is.sendSimpleMail(email, "邮箱验证码", verif);
			// 返回成功 前端接收后进入输入验证码页面
			map.put("code", "200");
			map.put("verifs", verif);
		} else {
			// 提示非邮箱号错误
			map.put("state", "400");
		}
		return map;

	}

	// 修改邮箱号
	@RequestMapping(value = "/updateEmail", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateEmail(@RequestBody Map<String, Object> ma) {
		System.out.println("到达修改邮箱控制器!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		Map<String, Object> map = new HashMap<String, Object>();
		// 邮箱正则表达
		String em = "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
		// 接收新邮箱
		String email = (String) ma.get("email");
		// 接收旧邮箱
		String emails = (String) ma.get("emails");
		
		AllUser user = new AllUser();
		//根据旧邮箱号查询用户所有信息
		user = ps.queryByEmail(emails);
		System.out.println(email + "新邮箱!!!!!!!!!!!!!!!!!!!!!1");
		System.out.println(emails + "旧邮箱!!!!!!!!!!!!!!!!!!!!!1");
		if (!email.equals(emails)) {
			if (email.matches(em)) {
				//修改邮箱号
				user.setEmail(email);
				ps.updateUserEmail(user);
				map.put("code", "200");
			} else {
				
			}
		}else {
			map.put("code", "400");
		}

		return map;

	}
	
	
		//接收手机 邮箱号  绑定邮箱邮箱号
		@RequestMapping(value = "/addEmail", method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> addEmail(@RequestBody Map<String, Object> ma) {
			System.out.println("到达修改邮箱控制器!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			Map<String, Object> map = new HashMap<String, Object>();
			// 邮箱正则表达
			String em = "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
			// 接收新邮箱
			String email = (String) ma.get("email");
			// 接收旧邮箱
			String telephone = (String) ma.get("telephone");
			
			AllUser user = new AllUser();
			//根据手机号查询用户所有信息
			user = ps.queryByTelephone(telephone);
			System.out.println(email + "新邮箱!!!!!!!!!!!!!!!!!!!!!1");
			System.out.println(telephone + "旧邮箱!!!!!!!!!!!!!!!!!!!!!1");
		
				if (email.matches(em)) {
					//修改邮箱号
					user.setEmail(email);
					ps.updateUserEmail(user);
					map.put("code", "200");
				} else {
					
				}

			return map;

		}
}
