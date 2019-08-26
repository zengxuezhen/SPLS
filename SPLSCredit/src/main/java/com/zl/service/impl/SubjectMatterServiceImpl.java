package com.zl.service.impl;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zl.dao.SubjectMatterMapper;
import com.zl.pojo.FenYe;
import com.zl.pojo.SubjectMatter;
import com.zl.service.SubjectMatterService;
/*
 * 标的
 */
@Service
public class SubjectMatterServiceImpl implements SubjectMatterService {
	@Autowired
	private SubjectMatterMapper sm;
	@Override
	public int deleteByPrimaryKey(BigDecimal id) {
		// TODO Auto-generated method stub
		return sm.deleteByPrimaryKey(id);
	}

	@Override
	public int insert(SubjectMatter record) {
		// TODO Auto-generated method stub
		return sm.insert(record);
	}

	
	@Override
	public int insertSelective(SubjectMatter record) {
		// TODO Auto-generated method stub
		return 0;
	}
	 
	@Override
	public SubjectMatter selectByPrimaryKey(BigDecimal id) {
		// TODO Auto-generated method stub
		return sm.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(SubjectMatter record) {
		// TODO Auto-generated method stub
		return sm.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(SubjectMatter record) {
		// TODO Auto-generated method stub
		return sm.updateByPrimaryKey(record);
	}
	//分页查询所有未满标的借款标的
	@Override
	public List<SubjectMatter> selectAllFy(FenYe fenYe) {
		fenYe.setRowCount(sm.selectAllCount());
		List<SubjectMatter> list=sm.selectAllFy(fenYe);
		return list;
	}
	//级联查询指定标的ID的类型及还款方式
	@Override
	public SubjectMatter selectSubjectMatterAndType(BigDecimal id) {
		// TODO Auto-generated method stub
		return sm.selectSubjectMatterAndType(id);
	}
	//查询今天内按最近时间排序的标的
	@Override
	public List<SubjectMatter> selectAll() {
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date startDate=new Date();
		startDate.setHours(0);
		startDate.setMinutes(0);
		startDate.setSeconds(0);
		Date endDate=new Date();
		endDate.setHours(0);
		endDate.setMinutes(0);
		endDate.setSeconds(0);
		endDate.setDate(endDate.getDate()+1);
		List<SubjectMatter> list=sm.selectAll(startDate,endDate);
		return list;
	}
	//根据标的id级联查询逾期记录
	@Override
	public SubjectMatter selectSubjectMatterAndOverdueRecord(long id) {
		return sm.selectSubjectMatterAndOverdueRecord(id);
	}
	//根据标的id级联查询还款记录
	@Override
	public SubjectMatter selectSubjectMatterAndRepaymentRecord(long id) {
		// TODO Auto-generated method stub
		return sm.selectSubjectMatterAndRepaymentRecord(id);
	}
	//查询期限内未满标的所有借款
	@Override
	public List<SubjectMatter> selectNoFullMark() {
		// TODO Auto-generated method stub
		return sm.selectNoFullMark();
	}
	//查询所有满标(还款中)的所有借款
	@Override
	public List<SubjectMatter> selectFullMark() {
		// TODO Auto-generated method stub
		return sm.selectFullMark();
	}

	@Override
	public List<SubjectMatter> selectSubjectMatterByUserId(long id) {
		// TODO Auto-generated method stub
		return sm.selectSubjectMatterByUserId(id);
	}

	@Override
	public List<SubjectMatter> selectAllSubjectMatterAndRepaymentRecord() {
		// TODO Auto-generated method stub
		return sm.selectAllSubjectMatterAndRepaymentRecord();
	}

	@Override
	public List<SubjectMatter> selectAllFySubjectMatterAndCredit(FenYe fenYe) {
		fenYe.setRowCount(sm.selectAllCountFySubjectMatterAndCredit());
		return sm.selectAllFySubjectMatterAndCredit(fenYe) ;
	}

	@Override
	public List<SubjectMatter> selectCreditSubjectMatterId(FenYe fenYe) {
		fenYe.setRowCount(sm.selectCreditSubjectMatterIdCount());
		return sm.selectCreditSubjectMatterId(fenYe);
	}


}
