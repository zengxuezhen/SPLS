package com.zl.service.impl;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zl.api.ReturnRecordAPIService;
import com.zl.pojo.AllUser;
import com.zl.query.Paging;
import com.zl.service.ReturnAccountService;
import com.zl.util.JSONUtil;
import com.zl.view.ReturnRecordView;

@Service
public class ReturnAccountServiceImpl implements ReturnAccountService {

	@Autowired
	private ReturnRecordAPIService rs;
	
	@Override
	public List<ReturnRecordView> queryReturnRecordViewByUserId(Paging paging,HttpSession session) throws Exception {
		Map<String, Object> map=new HashMap<String, Object>();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		AllUser user=(AllUser) session.getAttribute("user");
		map.put("queryUserId", user.getId());
		if(paging.getPageIndex()==null || paging.getPageIndex()<=1) {
			paging.setPageIndex(1);
		}
		map.put("pageIndex", paging.getPageIndex());
		map.put("pageSize", paging.getPageSize());
		if(paging.getQuery()!=null) {
			if(paging.getQuery().getQueryStartDate()!=null) {
				map.put("queryStartDate", sdf.format(paging.getQuery().getQueryStartDate()));
			}
			if(paging.getQuery().getQueryStopDate()!=null) {
				map.put("queryStopDate", sdf.format(paging.getQuery().getQueryStopDate()));
			}
		}
		String credit_json=rs.queryMyAllReturnRecord(map);
		System.out.println("credit:"+credit_json);
		String return_json=JSONUtil.parseJSONtoStringByKey(credit_json, "returnList");
		String rowCountStr=JSONUtil.parseJSONtoStringByKey(credit_json, "rowCount");
		paging.setRowCount(new Integer(rowCountStr));
		int total=paging.getPageTotal();
		paging.setPageTotal(total);
		ObjectMapper om=new ObjectMapper();
		@SuppressWarnings("unchecked")
		List<ReturnRecordView> list=om.readValue(return_json, List.class);
		return list;
	}

}
