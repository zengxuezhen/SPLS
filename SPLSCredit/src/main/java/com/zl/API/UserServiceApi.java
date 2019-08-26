package com.zl.API;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;

/*
 * 提供调用用户服务接口
 * */
@FeignClient("User-service")
public interface UserServiceApi {
	@RequestMapping("/account")
	String getAccountInfo(Long userId);
	@RequestMapping("/bankCard")
	String getBankCard(Long userId);
}
