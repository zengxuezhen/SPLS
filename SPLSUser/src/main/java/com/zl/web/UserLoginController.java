package com.zl.web;

import com.zl.pojo.AllUser;
import com.zl.service.UserLoginService;
import com.zl.util.AESUtil;
import com.zl.util.CodeUtil;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * @ClassName UserLoginController
 * @Author 李旭东
 * @Date 2019/8/15 15:18
 * @Version 1.0
 */
@Controller
public class UserLoginController {
	@Autowired
	private UserLoginService uls;
    @PostMapping("/login")
    public String userLogin(String name, String password, Model model){
        //1.获取Subject
        Subject subject = SecurityUtils.getSubject();
        //2.封装用户数据
        UsernamePasswordToken token = new UsernamePasswordToken(name,password);
        try {
            subject.login(token);

            //登录成功
            //跳转到test.html
            return "redirect:/testLoginPage";
        } catch (UnknownAccountException e) {
            //e.printStackTrace();
            //登录失败:用户名不存在
            model.addAttribute("msg", "用户名不存在");
            return "login";
        }catch (IncorrectCredentialsException e) {
            //e.printStackTrace();
            //登录失败:密码错误
            model.addAttribute("msg", "密码错误");
            return "login";
        }

    }
    @PostMapping("/sendUserTelphoneMessage")
    @ResponseBody
    public Map<String,Object> sendUserTelphoneMessage(@RequestBody long id,@RequestBody String msg){
    	Map<String,Object> map=new HashMap();
    	AllUser user=uls.selectByPrimaryKey(id);
    	boolean code= CodeUtil.sendTelephoneMsg(AESUtil.getAesDecoder(user.getTelephone()),msg);
    	map.put("success",code);
    	return map;
    }

}
