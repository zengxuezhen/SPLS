package com.zl.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zl.dao.PersonalInfoDao;
import com.zl.pojo.AllUser;
import com.zl.service.PersonalInfoService;

@Service
public class PersonalInfoServiceImpl implements PersonalInfoService {
	@Autowired
	private PersonalInfoDao pd;

	@Override
	public int updateUserById(AllUser user) {
		int result = pd.updateUserById(user);
		return result;
	}

	@Override
	public int updateUserPad(AllUser user) {
		int result = pd.updateUserPad(user);
		return result;
	}

	@Override
	public int updateUserTelephone(AllUser user) {
		int result = pd.updateUserTelephone(user);
		return result;
	}

	@Override
	public int updateUserEmail(AllUser user) {
		int result = pd.updateUserEmail(user);
		return result;
	}

}
