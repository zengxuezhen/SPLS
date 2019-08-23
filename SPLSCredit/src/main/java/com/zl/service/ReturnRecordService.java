package com.zl.service;

import java.util.List;
import java.util.Map;

import com.zl.pojo.ReturnRecord;
import com.zl.view.ReturnRecordView;

/**
 * 操作回账记录的相关业务接口
 * @author Administrator
 *
 */
public interface ReturnRecordService {
	int deleteByPrimaryKey(Long id);

    int insert(ReturnRecord record);

    int insertSelective(ReturnRecord record);

    ReturnRecord selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ReturnRecord record);

    int updateByPrimaryKey(ReturnRecord record);
    
    /**
     * 按条件查询获取用户所有回账记录
     * @param map
     * @return
     */
    List<ReturnRecordView> queryReturnRecordByLimit(Map<String, Object> map);
    /**
     * 查询符合条件的回账记录总数
     * @param map
     * @return
     */
	int queryReturnRecordCount(Map<String, Object> map);
}