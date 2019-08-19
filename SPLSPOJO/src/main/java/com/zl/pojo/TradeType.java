package com.zl.pojo;

/**
 * 交易类型名称表实体类
 * @author Administrator
 * 映射数据库表trade_type
 */
public class TradeType {

	private Integer id;
	private String typeName;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	@Override
	public String toString() {
		return "TradeType [id=" + id + ", typeName=" + typeName + "]";
	}
}
