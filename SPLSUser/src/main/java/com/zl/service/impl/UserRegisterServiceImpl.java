package com.zl.service.impl;

import com.zl.dao.UserRegisterDao;
import com.zl.pojo.AllUser;
import com.zl.service.UserRegisterService;
import com.zl.util.AESUtil;
import com.zl.util.ShiroUtils;
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

        return urd.findTel(AESUtil.setAesEncoder(tel));
    }

    @Override
    public int addUser(AllUser user) {
        AllUser allUser = new AllUser();
        allUser.setUserName(user.getUserName());
        allUser.setCreateTime(new Date());
        allUser.setTelephone(AESUtil.setAesEncoder(user.getTelephone()));
        return urd.addUser(allUser);
    }

    @Override
    public int updateUser(AllUser user) {
        ShiroUtils su=new ShiroUtils();
        AllUser allUser = new AllUser();
        String passwd = su.ShiroMd5(user.getPwd(),"uuid");
        System.out.println(passwd);
        allUser.setPwd(passwd);
        allUser.setUserName(user.getUserName());
        return urd.updateUser(allUser);
    }
}
