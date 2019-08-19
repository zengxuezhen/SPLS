package com.zl.web;

import com.zl.pojo.AllUser;
import com.zl.service.UserRegisterService;
import com.zl.util.CodeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

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
    @Autowired
    @Qualifier("redisTemplate")
    //实例化
    private RedisTemplate<Object, Object> rts;
    @PostMapping("/getCode")
    @ResponseBody
    public Map<String, Object> findUserTel(String telphone){
//        String regex = "^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$";
//        Pattern p = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
//        Matcher m = p.matcher(telphone);
//        if (m.matches()==false){
//
//            return ;
//        }
        Map<String, Object> map = new HashMap<>();
        if (urs.findTel(telphone)==null){
            String zipCode=CodeUtil.getCode(telphone);

            if (zipCode!=null) {
                System.out.println(zipCode);
                rts.opsForValue().set(telphone, zipCode, 3, TimeUnit.MINUTES);
                map.put("msg", true);

            }else {
                map.put("msg",false);

            }
        }else {
            map.put("msg",false);
        }
            return map;
        }



    @RequestMapping("/userRegister")
    @ResponseBody
    public Object plogin(String telphone, String pcode){
        //System.out.println("username=" + telphone + ";pcode=" + pcode);
        Object code = rts.opsForValue().get(telphone);
            if (code.equals(pcode)) {
                return true;
            } else {
                return false;
            }
    }
    @RequestMapping("/addToUser")
    @ResponseBody
    public Object addToUser(String telphone, String password, HttpSession session){
        AllUser user = new AllUser();
        if (telphone!= null&&!"".equals(telphone)&&password != null && !"".equals(password)){
            user.setTelephone(telphone);
            user.setPwd(password);
            urs.addUser(user);
            session.setAttribute("user", user);
            return true;
        }
        return false;
    }


}
