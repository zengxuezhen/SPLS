package com.zl.service.impl;

import com.zl.dao.UserLoginDao;
import com.zl.pojo.AllUser;
import com.zl.service.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName UserLoginServiceImpl
 * @Author 李旭东
 * @Date 2019/8/15 14:40
 * @Version 1.0
 */
@Service
public class UserLoginServiceImpl implements UserLoginService {
    @Autowired
    private UserLoginDao uld;

    @Override
    public AllUser queryUserByTel(String telephone) {
        return uld.queryUserByTel(telephone);
    }

    @Override
    public AllUser findUserByEmail(String email) {
        return uld.findUserByEmail(email);
    }
}
