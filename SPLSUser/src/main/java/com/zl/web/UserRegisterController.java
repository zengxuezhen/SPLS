package com.zl.web;

import com.zl.service.UserRegisterService;
import com.zl.util.CodeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @ClassName UserRegisterController
 * @Author 李旭东
 * @Date 2019/8/16 11:18
 * @Version 1.0
 */
@Controller
public class UserRegisterController {
    @Autowired
    private UserRegisterService urs;
    @PostMapping("/register")
    public String findUserTel(String tel, Model model){
        String regex = "^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$";
        Pattern p = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
        Matcher m = p.matcher(tel);
        if (m.matches()==false){
            model.addAttribute("msg","该手机号不存在" );
            return "register";
        }
        if (urs.findTel(tel)==null){
            String zipCode=CodeUtil.getCode(tel);
            System.out.println(zipCode);
        }
        model.addAttribute("msg", "该号码已存在,请直接登陆");
        return "register";
        }
}
