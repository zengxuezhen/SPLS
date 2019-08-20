package com.zl.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zl.pojo.SubjectMatterType;
import com.zl.service.SubjectMatterTypeService;
/*
 * 标的类型
 */
@Controller
public class SubjectMatterTypeController {
	@Autowired
	private SubjectMatterTypeService sm;
	@RequestMapping("/querySubjectMatterTypeById")
	@ResponseBody
	public Map<String,Object> selectByPrimaryKey(Short id) {
		SubjectMatterType smt=sm.selectByPrimaryKey(id);
		Map<String,Object>map=new HashMap();
		map.put("subjectMatterType", smt);
		return map;
	}
}
