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
import org.springframework.web.bind.annotation.*;

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

            //登录成功
            //跳转到test.html
            map.put("code", "200");
            System.out.println(map);
            return map;
        } catch (UnknownAccountException e) {
            //e.printStackTrace();
            //登录失败:用户名不存在
            map.put("msg", "401");
            System.out.println(map);
            return map;
        }catch (IncorrectCredentialsException e) {
            //e.printStackTrace();
            //登录失败:密码错误
            map.put("msg", "403");
            System.out.println(map);
            return map;
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
