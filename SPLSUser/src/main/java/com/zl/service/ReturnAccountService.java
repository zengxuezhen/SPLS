package com.zl.service;

import java.util.List;

import javax.servlet.http.HttpSession;

import com.zl.query.Paging;
import com.zl.view.ReturnRecordView;

/**
 * 回账相关业务逻辑
 * @author Administrator
 *
 */
public interface ReturnAccountService {
	/**
	 * 查询用户所有回账记录
	 * @param map
	 * @return
	 */
	List<ReturnRecordView> queryReturnRecordViewByUserId(Paging paging, HttpSession session) throws Exception;
	
}
