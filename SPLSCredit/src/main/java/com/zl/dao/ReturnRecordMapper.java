package com.zl.dao;

import java.util.List;
import java.util.Map;

import com.zl.pojo.ReturnRecord;
import com.zl.view.ReturnRecordView;

/**
 * 对回款记录数据库表的增删改查操作
 * @author 王静
 *
 */
public interface ReturnRecordMapper {
	int deleteByPrimaryKey(Long id);

    int insert(ReturnRecord record);

    int insertSelective(ReturnRecord record);

    ReturnRecord selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ReturnRecord record);

    int updateByPrimaryKey(ReturnRecord record);
    
    /**
     * 分页条件从数据库查询登录用户的所有回账数据
     * @return
     */
    List<ReturnRecordView> selectReturnRecordByLimit(Map<String, Object> map);
    /**
     * 查询数据库表满足条件的个数
     * @param map
     * @return
     */
	int selectReturnRecordCount(Map<String, Object> map);
    
}