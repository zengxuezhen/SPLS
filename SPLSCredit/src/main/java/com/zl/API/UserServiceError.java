package com.zl.API;

import org.springframework.stereotype.Service;

@Service
public class UserServiceError implements UserService {
	
	@Override
	public String sendUserTelphoneMessage(String id, String msg) {
		
		return "500";
	}

}
