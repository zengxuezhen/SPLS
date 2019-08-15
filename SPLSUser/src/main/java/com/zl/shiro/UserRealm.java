package com.zl.shiro;

import com.zl.pojo.AllUser;
import com.zl.service.UserLoginService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class UserRealm extends AuthorizingRealm {

    @Autowired
    private UserLoginService urs;

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection arg0) {
        //执行授权逻辑
        System.out.println("执行授权逻辑");

        //给资源进行授权
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();

        //添加资源的授权字符串
        //info.addStringPermission("user:add");

        //到数据库查询当前登录用户的授权字符串
        // 获取当前登录用户
        //Subject subject = SecurityUtils.getSubject();
        //AllUser user = (AllUser) subject.getPrincipal();
        //AllUser realUser = urs.queryUserByTel(user.getTelephone());
        //Clerk realClerk = rs.findById(clerk.getId());
        //info.addStringPermission(String.valueOf());
        return info;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken arg0) throws AuthenticationException {
        //执行认证逻辑
        System.out.println("执行认证逻辑");

        //编写shiro判断逻辑，判断用户名和密码
        //1.判断用户名
        UsernamePasswordToken token = (UsernamePasswordToken) arg0;
        AllUser user =null;
        String regEx1 = "^\\s*\\w+(?:\\.{0,1}[\\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\\.[a-zA-Z]+\\s*$";
        Pattern p = Pattern.compile(regEx1);
        Matcher m = p.matcher(token.getUsername());
        if (m.matches()) {
                user =  urs.findUserByEmail(token.getUsername());
            }else {
                user =  urs.queryUserByTel(token.getUsername());
        }


        if (user == null) {
            //用户名不存在
            return null;
            //shiro底层会抛出UnKnowAccountException
        }
        Subject subject = SecurityUtils.getSubject();
        Session session = subject.getSession();
        session.setAttribute("user", user);
        ByteSource bytes = ByteSource.Util.bytes(String.valueOf(token.getUsername()));
        //2.判断密码
        return new SimpleAuthenticationInfo(user, user.getPwd(), bytes, getName());

    }

}
