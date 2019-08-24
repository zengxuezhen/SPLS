package com.zl.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zl.pojo.AllUser;
import com.zl.query.Paging;
import com.zl.service.ReturnAccountService;
import com.zl.view.ReturnRecordView;

/**
 * 回账查询控制器
 * @author 王静
 *
 */
@Controller
@RequestMapping("/user")
public class ReturnRecordViewController {
	
	@Autowired
	private ReturnAccountService rs;
	
	/**
	 * 从前端跳转到回账记录显示页面
	 * @param session
	 * @return
	 */
	@RequestMapping("/returns/toShow")
	public String toShowReturnRecordPage(HttpSession session) {
		AllUser user=new AllUser();
		user.setId(1L);
		session.setAttribute("user", user);
		return "/回账查询";
	}
	
	/**
	 * 显示用户所有回账记录，按条件分页
	 * @param paging
	 * @param session
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/returns/showMyAll")
	@ResponseBody
	public Map<String, Object> showMyAllReturnRecord(@RequestBody Paging paging,HttpSession session) throws Exception {
		System.out.println("前端检索条件：当前页码："+paging);
		Map<String, Object> map=new HashMap<String, Object>();
		List<ReturnRecordView> list = rs.queryReturnRecordViewByUserId(paging, session);
		System.out.println("回账数据："+list);
		System.out.println("分页对象："+paging);
		map.put("viewList", list);
		map.put("paging", paging);
		return map;
	}
	
	/**
	 * 点击单条回账记录，跳转对应标的的详细信息页面
	 * @param id
	 * @return
	 */
	@RequestMapping("/returns/showItem")
	public String showItemReturnRecord(Long id){
		System.out.println("点击单条回账记录，跳转显示对应的标的");
		return "redirect:http://localhost:8084/showSubjectMatterItem/"+id;
	}
	
}
