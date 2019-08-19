package com.zl.service;

import com.zl.pojo.AllUser;

public interface UserRegisterService {
    AllUser findTel(String tel);
    int addUser(AllUser user);
}
