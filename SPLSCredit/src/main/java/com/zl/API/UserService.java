package com.zl.API;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient(value="debit-service")
public interface UserService {
	@RequestMapping("/sendUserTelphoneMessage")
	public String sendUserTelphoneMessage( String id,String msg);
}
