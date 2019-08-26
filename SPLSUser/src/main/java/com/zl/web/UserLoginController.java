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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
@RequestMapping("/login")
public class UserLoginController {
	@Autowired
	private UserLoginService uls;

    @RequestMapping(value = "/toLogin", method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> userLogin(@RequestBody Map<String,String> ma){
        System.out.println(ma);
        String name = ma.get("userName");
        String password = ma.get("password");
        Map<String,Object> map = new HashMap<>();
        //1.获取Subject
        Subject subject = SecurityUtils.getSubject();
        //2.封装用户数据
        UsernamePasswordToken token = new UsernamePasswordToken(name,password);
        try {
            subject.login(token);
            map.put("code", "200");
            return map;
        } catch (UnknownAccountException e) {
            map.put("msg", "401");
            return map;
        }catch (IncorrectCredentialsException e) {
            map.put("msg", "403");
            return map;
        }

    }
    @RequestMapping("/sendUserTelphoneMessage")
    @ResponseBody
    public Map<String,Object> sendUserTelphoneMessage( long id, String msg){
    	Map<String,Object> map=new HashMap();
    	AllUser user=uls.selectByPrimaryKey(id);
    	boolean code= CodeUtil.sendTelephoneMsg(AESUtil.getAesDecoder(user.getTelephone()),msg);
    	map.put("success",code);
    	return map; 
    }

}
