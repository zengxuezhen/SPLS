package com.zl.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zl.dao.PersonalLoanInfoDao;
import com.zl.pojo.PersonalLoanInfo;
import com.zl.query.Paging;
import com.zl.service.PersonalLoanInfoService;
/**
 * 个人贷款信息Service层实现类
 * @author Administrator
 *
 */
@Service
public class PersonalLoanInfoServiceImpl implements PersonalLoanInfoService{
	@Autowired
	private PersonalLoanInfoDao pd;
	@Override
	public int addPersonalLoanInfo(PersonalLoanInfo personalLoanInfo) {
		
		return pd.insertPersonalLoanInfo(personalLoanInfo);
	}

	@Override
	public PersonalLoanInfo queryPersonalLoanInfoById(Long id) {
		
		return pd.selectPersonalLoanInfoById(id);
	}

	@Override
	public PersonalLoanInfo queryPersonalLoanInfoByUserId(Long userId) {
		
		return pd.selectPersonalLoanInfoByUserId(userId);
	}

	@Override
	public List<PersonalLoanInfo> queryPersonalLoanInfoByStatus(Integer status) {
		List<PersonalLoanInfo> personalLoanInfos=new ArrayList<PersonalLoanInfo>();
		personalLoanInfos=pd.selectPersonnalLoanInfoByStatus(status);
		return personalLoanInfos;
	}

	@Override
	public int modifyPersonalLoanInfoStatusById(PersonalLoanInfo personalLoanInfo) {
		
		return pd.updatePersonalLoanInfoStatusById(personalLoanInfo);
	}

}
