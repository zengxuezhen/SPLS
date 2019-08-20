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
public class UserRegisterController {
    @Autowired
    private UserRegisterService urs;
    @Autowired
    @Qualifier("redisTemplate")
    //实例化
    private RedisTemplate<Object, Object> rts;
    @PostMapping("/getCode")
    @ResponseBody
    public Map<String, Object> findUserTel(String telephone, String verifCode, HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
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
                    System.out.println(zipCode);
                    rts.opsForValue().set(telephone, zipCode, 3, TimeUnit.MINUTES);
                    map.put("msg", true);

                } else {
                    map.put("msg", false);

                }
            } else {
                map.put("msg", false);
            }
        }
            return map;
    }


    @RequestMapping("/userRegister")
    @ResponseBody
    public Object plogin(String telephone, String mobileCode){
        //System.out.println("username=" + telphone + ";pcode=" + pcode);
        Object code = rts.opsForValue().get(telephone);
            if (code.equals(mobileCode)) {
                return true;
            } else {
                return false;
            }
    }
    @RequestMapping("/addToUser")
    @ResponseBody
    public Object addToUser(String telephone, String password, HttpSession session){
        AllUser user = new AllUser();
        if (telephone!= null&&!"".equals(telephone)&&password != null && !"".equals(password)){
            user.setTelephone(telephone);
            user.setPwd(password);
            urs.addUser(user);
            session.setAttribute("user", user);
            return true;
        }
        return false;
    }


}
