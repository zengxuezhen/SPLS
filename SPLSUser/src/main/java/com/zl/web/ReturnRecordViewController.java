package com.zl.web;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zl.api.ReturnRecordAPIService;
import com.zl.pojo.AllUser;
import com.zl.pojo.ReturnRecord;
import com.zl.query.Paging;
import com.zl.util.JSONUtil;
import com.zl.view.ReturnRecordView;

/**
 * 回账查询控制器
 * @author 王静
 *
 */
@Controller
@RequestMapping("/user/returns")
public class ReturnRecordViewController {
	@Autowired
	private ReturnRecordAPIService rs;
	
	@RequestMapping("/toShow")
	public String toShowReturnRecordPage(HttpSession session) {
		AllUser user=new AllUser();
		user.setId(1L);
		session.setAttribute("user", user);
		return "/回账查询";
	}
	
	@RequestMapping("/showMyAll")
	@ResponseBody
	public Map<String, Object> showMyAllReturnRecord(@RequestBody Paging paging,HttpSession session) throws Exception {
		System.out.println("前端检索条件：当前页码："+paging);
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
		List<ReturnRecordView> list=om.readValue(return_json, List.class);
		System.out.println("回账数据："+list);
		System.out.println("分页对象："+paging);
		map.put("viewList", list);
		map.put("paging", paging);
		return map;
	}
	
	@RequestMapping("/showItem")
	public String showItemReturnRecord(Long id){
		System.out.println("点击单条回账记录，跳转显示对应的标的");
		return "redirect:http://localhost:8084/showSubjectMatterItem/"+id;
	}
	
}
