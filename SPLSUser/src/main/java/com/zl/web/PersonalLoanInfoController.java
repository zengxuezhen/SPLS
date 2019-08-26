package com.zl.web;
/**
 * 个人贷款信息控制层
 * @author Administrator
 *
 */

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zl.pojo.PersonalLoanInfo;
import com.zl.service.PersonalLoanInfoService;

@RestController
@RequestMapping(path="/personalLoanInfo")
public class PersonalLoanInfoController {
	@Autowired
	PersonalLoanInfoService ps;
	@PostMapping
	/**
	 * 个人贷款信息controller层接口，添加个人贷款信息
	 * @param personalLoanInfo
	 * @return
	 */
	public Map<String, Object> addPersonalLoanInfo(@RequestBody PersonalLoanInfo personalLoanInfo){
		int line=ps.addPersonalLoanInfo(personalLoanInfo);
		Map<String, Object> result=new HashMap<String, Object>();
		result.put("line", line);
		return result;
	}
	/**
	 * 个人贷款信息controller层接口，根据id查询个人贷款信息
	 * @param id
	 * @return
	 */
	@GetMapping(path="/getPersonalLoanInfoById")
	public Map<String, Object> getPersonalLoanInfoById(Long id){
		PersonalLoanInfo personalLoanInfo=ps.queryPersonalLoanInfoById(id);
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("personalLoanInfo", personalLoanInfo);
		return result;
	}
	/**
	 * 个人贷款信息controller层接口，根据userId查询个人贷款信息
	 * @param userId
	 * @return
	 */
	@GetMapping(path="/getPersonalLoanInfoByUserId")
	public Map<String, Object> getPersonalLoanInfoByUserId(Long userId){
		PersonalLoanInfo personalLoanInfo=ps.queryPersonalLoanInfoByUserId(userId);
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("personalLoanInfo", personalLoanInfo);
		return result;
	}
	/**
	 * 个人贷款信息controller层接口，根据status审核状态查询个人贷款信息
	 * @param status
	 * @return
	 */
	@GetMapping(path="/getPersonalLoanInfoByStatus")
	public Map<String, Object> getPersonalLoanInfoByStatus(Integer status){
		List<PersonalLoanInfo> personalLoanInfos=ps.queryPersonalLoanInfoByStatus(status);
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("personalLoanInfos", personalLoanInfos);
		return result;
	}
	/**
	 * 个人贷款信息controller层接口，根据id更改审核状态
	 * @param personalLoanInfo
	 * @return
	 */
	public Map<String, Object> modifyPersonalLoanInfoStatusById(PersonalLoanInfo personalLoanInfo){
		Map<String, Object> result=new HashMap<String,Object>();
		int line=ps.modifyPersonalLoanInfoStatusById(personalLoanInfo);
		result.put("line", line);
		return result;
	}
}
