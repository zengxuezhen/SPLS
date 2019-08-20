package com.zl.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zl.dao.OverdueRecordMapper;
import com.zl.pojo.OverdueRecord;
import com.zl.pojo.SubjectMatter;
import com.zl.pojo.SubjectMatterType;
import com.zl.service.OverdueRecordService;
import com.zl.service.SubjectMatterService;
/*
 * 逾期记录
 */
@Service
public class OverdueRecordServiceImpl implements OverdueRecordService {
	@Autowired
	private OverdueRecordMapper or;
	@Autowired
	private SubjectMatterService sms;
	@Override
	public int deleteByPrimaryKey(Long id) {
		// TODO Auto-generated method stub
		return or.deleteByPrimaryKey(id);
	}

	@Override
	public int insert(OverdueRecord record) {
		// TODO Auto-generated method stub
		return or.insert(record);
	}

	@Override
	public int insertSelective(OverdueRecord record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public OverdueRecord selectByPrimaryKey(Long id) {
		// TODO Auto-generated method stub
		return or.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(OverdueRecord record) {
		// TODO Auto-generated method stub
		return or.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(OverdueRecord record) {
		// TODO Auto-generated method stub
		return or.updateByPrimaryKey(record);
	}

	@Override
	public List<OverdueRecord> selectOverdueRecordBySubjectMatterId(Long id) {
		// TODO Auto-generated method stub
		return or.selectOverdueRecordBySubjectMatterId(id);
	}
	//借款过期处理 ,获取借款信息时判断时间是否过期，过期修改状态 
	@Transactional
	@Override
	public int subjectMatterOverdue() {
		int flag=0;
		List<SubjectMatter>list=sms.selectNoFullMark();
		for(int i=0;i<list.size();i++) {
			SubjectMatter s=list.get(i);
			SubjectMatterType subjectMatterType=s.getSubjectMatterType();
			int term=subjectMatterType.getPeriod();
			long d=s.getCreateTime().getTime();
			long day=new Date().getTime();
			if(day-d>=term*24*60*60*1000) {
				s.setStatus(1);
				if(sms.insert(s)>0) {
					flag++;
				}
			}
		}
		return flag;
	}

}
