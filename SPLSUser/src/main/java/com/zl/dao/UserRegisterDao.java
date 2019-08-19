package com.zl.dao;

import com.zl.pojo.AllUser;

/**
 * 用户注册接口
 * @author 李旭东
 */
public interface UserRegisterDao {
    /**
     * @Author 旭东
     * @Description 查找数据库是否已存在该号码
     * @Date 9:36 2019/8/16
     * @Param [tel] find user tel
     * @return com.zl.pojo.AllUser
     **/
    AllUser findTel(String tel);
    /**
     * @Author 旭东
     * @Description 注册成功添加到数据库
     * @Date 9:58 2019/8/16
     * @Param [user]
     * @return int
     **/
    int addUser(AllUser user);

}
