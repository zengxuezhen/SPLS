package com.zl.service;

import com.zl.pojo.AllUser;

/**
 * @Author 旭东
 * @Description 登录服务的接口
 * @Date 14:29 2019/8/15
 * @Param
 * @return
 */
public interface UserLoginService {
    /**
     * @Author 旭东
     * @Description 如果用户输入手机号,调用此接口
     * @Date 13:53 2019/8/15
     * @Param telephone user Tel
     * @return com.zl.pojo.AllUser
     */
    AllUser queryUserByTel(String telephone);
    /**
     * @Author 旭东
     * @Description 如果用户输入邮箱,调用此接口
     * @Date 14:14 2019/8/15
     * @Param [email] user Email
     * @return com.zl.pojo.AllUser
     **/
    AllUser findUserByEmail(String email);
}
