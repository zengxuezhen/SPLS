package com.zl.service.impl;

import com.zl.dao.UserRegisterDao;
import com.zl.pojo.AllUser;
import com.zl.service.UserRegisterService;
import org.apache.commons.lang.RandomStringUtils;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

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

    @Override
    public AllUser findTel(String tel) {
        return urd.findTel(tel);
    }

    @Override
    public int addUser(AllUser user) {
        AllUser allUser = new AllUser();
        allUser.setCreateTime(new Date());
        allUser.setUserName(RandomStringUtils.randomAlphanumeric(8));
        allUser.setTelephone(user.getTelephone());
        String passwd = ShiroMd5(user.getPwd(),"uuid");
        allUser.setPwd(passwd);
        return urd.addUser(allUser);
    }

    public static String ShiroMd5(String password,String uuid) {
        Object salt= ByteSource.Util.bytes(uuid);
        return new SimpleHash("MD5", password,salt, 24).toString();
    }
}
