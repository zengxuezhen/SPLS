package com.zl.dao;

import com.zl.pojo.AllUser;

/**
 * 用户登录接口
 * @author 李旭东
 */
public interface UserLoginDao {
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
