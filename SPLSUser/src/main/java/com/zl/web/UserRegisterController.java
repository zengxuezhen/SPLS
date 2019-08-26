package com.zl.web;

import com.zl.pojo.AllUser;
import com.zl.service.UserRegisterService;
import com.zl.util.CodeUtil;
import com.zl.util.RandomCharacterAndNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import static com.zl.web.CaptchaController.KEY_CAPTCHA;

/**
 * @ClassName UserRegisterController
 * @Author 李旭东
 * @Date 2019/8/16 11:18
 * @Version 1.0
 */
@Controller
@RequestMapping("/register")
@CrossOrigin(origins = "*")
public class UserRegisterController {
    @Autowired
    @Qualifier("redisTemplate")
    private RedisTemplate<Object, Object> rts;
    @Autowired
    private UserRegisterService urs;
    @RequestMapping(value="/getCode",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> findUserTel(@RequestBody Map<String, String> ma, HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
        System.out.println(ma);
        String telephone = ma.get("telephone");
        String verifCode = ma.get("verifCode");
        if (telephone!=null&&!"".equals(telephone)&&verifCode!=null&&!"".equals(verifCode)){
            HttpSession session = request.getSession();
            String str=(String)session.getAttribute(KEY_CAPTCHA);
            /*
             * @Author chengpunan
             * @Description 判断前台的验证码是否正确,手机号有没有存在数据库中
             * @Date 14:19 2019/8/20
             * @Param [telphone, verifCode, request]
             * @return java.util.Map<java.lang.String,java.lang.Object>
             */
            if (urs.findTel(telephone) == null&&verifCode.equalsIgnoreCase(str)) {
                String zipCode = CodeUtil.getCode(telephone);
                if (zipCode != null) {
                    rts.opsForValue().set(telephone, zipCode, 3, TimeUnit.MINUTES);
                    map.put("code", "200");
                    return map;
                } else {
                    map.put("code", "401");
                    return map;
                }
            } else {
                map.put("code", "401");
                return map;
            }
        }
        return map;
    }


    @RequestMapping(value = "/userRegister", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addUser(@RequestBody Map<String, String> ma, HttpSession session){
        RandomCharacterAndNumber rca = new RandomCharacterAndNumber();
        Map<String, Object> map = new HashMap<>();
        String telephone = ma.get("telephone");
        String mobileCode = ma.get("mobileCode");
        Object code = rts.opsForValue().get(telephone);
        System.out.println(code);
        System.out.println(mobileCode);
            if (code.equals(mobileCode)) {
                AllUser user = new AllUser();
                user.setTelephone(telephone);
                String userName = rca.getRandomCode();
                user.setUserName(userName);
                urs.addUser(user);
                session.setAttribute("user", user);
                map.put("code","200");
                map.put("name",userName);
                return map;
            } else {
                map.put("code","401");
                return map;
            }
    }
    @RequestMapping(value = "/addToUser", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateUser(@RequestBody Map<String, String> ma){
        Map<String, Object> map = new HashMap<>();
        String userName = ma.get("userName");
        String password = ma.get("password");
        if (userName!=null&&!"".equals(userName)&&password != null && !"".equals(password)){
            AllUser user = new AllUser();
            user.setUserName(userName);
            user.setPwd(password);
            urs.updateUser(user);
            map.put("code", "200");
            return map;
        }
        map.put("code", "401");
        return map;
    }


}
