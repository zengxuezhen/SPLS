package com.zl.web;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.request;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.zl.pojo.AllUser;
import com.zl.service.PersonalInfoService;
import com.zl.util.CodeUtil;

@Controller
public class PersonalInfoController {
	@Autowired
	private PersonalInfoService ps;
	@Autowired
	private StringRedisTemplate rt;

	@RequestMapping(value = "/getPhoneNo", method = RequestMethod.POST)
	@ResponseBody
	// 判断邮箱还是手机号之后发送验证码
	public Map<String, Object> getPhoneNO(@RequestBody String num, String phoneNo) {
		System.out.println("到达控制器!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11");
		Map<String, Object> map = new HashMap<String, Object>();
		// 接收手机号/邮箱
		System.out.println(num
				+ "+++++++++===========================================================================================================");
		// 判断是邮箱还是手机号的正则表达式
		String em = "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
		String ph = "^[1][34578]\\d{9}$";
		// 短信接口
		CodeUtil cu = new CodeUtil();
		// 手机号登录邮箱登录
		if (phoneNo.matches(ph) && phoneNo.matches(em)) {
			// 调用调信接口发送短信验证码并用变量接收
			String verif = cu.getCode(num);
			// 将接收的验证码存到redis 用来验证用户输入
			rt.opsForValue().set("verifs", verif, 60, TimeUnit.SECONDS);
			// 返回成功 前端接收后进入输入验证码页面
			map.put("code", "200");
		}

		else {
			// 提示错误
			map.put("state", "400");
		}

		return map;

	}

	// 接收验证码验证
	@RequestMapping(value="/getVerification", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getVerification(@RequestBody String verif) {
		Map<String, Object> map = new HashMap<String, Object>();
		// 从redis中取出验证码跟用户输入的验证码进行对比
		String verifs = rt.opsForValue().get("verifs");
		// 判断用户输入的验证码和redie中的验证码是否一致
		if (verif == verifs) {
			// 输入正确 前端接收后跳转到修改密码页面
			map.put("code", "200");
		} else {
			// 输入错误
			map.put("state", "400");
		}
		return map;

	}

	// 接受密码判断是否一致
	@RequestMapping(value = "/getpad",method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getpad(@RequestBody String pad, String pads) {
		Map<String, Object> map = new HashMap<String, Object>();
		if (pad == pads) {
			// 两次密码输入一致 前端判断后跳到修改密码控制器
			map.put("code", "400");
		} else {
			// 两次密码输入不一致
			map.put("state", "400");
		}
		return map;

	}

	// 修改密码
	@RequestMapping(value = "/toUpdateUser",method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> toUpdateUser(@RequestBody AllUser user) {

		Map<String, Object> map = new HashMap<String, Object>();
		int result = ps.updateUserPad(user);
		if (result > 0) {
			map.put("code", "200");
			map.put("state", "修改成功");
		} else {
			map.put("code", "400");
			map.put("state", "修改失败");
		}
		return map;

	}

	// 接收手机号验证码验证
	@RequestMapping(value = "/getTelephone",method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getTelephone(@RequestBody String telephone) {
		Map<String, Object> map = new HashMap<String, Object>();
		// 手机号正则表达
		String ph = "^[1][34578]\\d{9}$";
		CodeUtil cu = new CodeUtil();
		if (telephone.matches(ph)) {
			// 调用调信接口发送短信验证码
			String verif = cu.getCode(telephone);
			// 将接收的验证码存到redis 用来验证用户输入
			rt.opsForValue().set("verifs", verif, 60, TimeUnit.SECONDS);
			// 返回成功 前端接收后进入输入验证码页面
			map.put("code", "200");
		} else {
			// 提示非手机号错误
			map.put("state", "400");
		}
		return map;

	}

	// 接收手机号验证码验证
	@RequestMapping(value = "/getPhoneVerification",method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getPhoneVerification(@RequestBody String verif) {
		Map<String, Object> map = new HashMap<String, Object>();
		// 从redis中取出验证码跟用户输入的验证码进行对比
		String verifs = rt.opsForValue().get("verifs");
		// 判断用户输入的验证码和redie中的验证码是否一致
		if (verif == verifs) {
			// 输入正确 前端接收后跳转到修改手机号页面
			map.put("code", "200");
		} else {
			// 输入错误
			map.put("state", "400");
		}
		return map;

	}

	// 修改手机绑定
	@RequestMapping(value = "/updateTelephone",method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateTelephone(@RequestBody AllUser user) {

		Map<String, Object> map = new HashMap<String, Object>();
		int result = ps.updateUserPad(user);
		if (result > 0) {
			map.put("code", "201");
			map.put("state", "修改成功");
		} else {
			map.put("code", "400");
			map.put("state", "修改失败");
		}
		return map;

	}

	// 接收邮箱号验证码验证
	@RequestMapping(value = "/getEmail",method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getEmail(@RequestBody String email) {
		Map<String, Object> map = new HashMap<String, Object>();
		// 邮箱正则表达
		String em = "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
		CodeUtil cu = new CodeUtil();
		// 判断是否邮箱
		if (email.matches(em)) {
			// 调用调信接口发送短信验证码
			String verif = cu.getCode(em);
			// 将接收的验证码存到redis 用来验证用户输入
			rt.opsForValue().set("verifs", verif, 60, TimeUnit.SECONDS);
			// 返回成功 前端接收后进入输入验证码页面
			map.put("code", "200");
		} else {
			// 提示非邮箱号错误
			map.put("state", "400");
		}
		return map;

	}

	// 修改邮箱号绑定
	@RequestMapping(value = "/updateEmail",method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateEmail(@RequestBody AllUser user) {

		Map<String, Object> map = new HashMap<String, Object>();
		int result = ps.updateUserPad(user);
		if (result > 0) {
			map.put("code", "202");
			map.put("state", "修改成功");
		} else {
			map.put("code", "400");
			map.put("state", "修改失败");
		}
		return map;

	}
}
