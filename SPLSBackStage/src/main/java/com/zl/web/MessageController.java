package com.zl.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zl.service.MessageService;

@RestController
@RequestMapping("/message")
public class MessageController {
	
	@Autowired
	private MessageService ms;
	@GetMapping
	public Map<String, Object> getMessageById(Integer id){
		Map<String, Object> result=new HashMap<String, Object>();
		String msg=ms.queryMessageById(id);
		result.put("msg", msg);
		return result;
		
	}
}
