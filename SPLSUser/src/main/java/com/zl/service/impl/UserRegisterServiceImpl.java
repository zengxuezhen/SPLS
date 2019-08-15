package com.zl.service.impl;

import com.zl.dao.UserRegisterDao;
import com.zl.service.UserRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName UserRegisterServiceImpl
 * @Author 李旭东
 * @Date 2019/8/15 14:42
 * @Version 1.0
 */
@Service
public class UserRegisterServiceImpl implements UserRegisterService {
    @Autowired
    private UserRegisterDao urd;
}
