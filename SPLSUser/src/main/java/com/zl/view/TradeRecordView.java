package com.zl.view;

import com.zl.pojo.TradeRecord;
import com.zl.pojo.TradeType;

/**
 * 前端显示的交易记录对象
 * @author Administrator
 *
 */
public class TradeRecordView {

	private TradeRecord record;
	private TradeType type;
	
	public TradeRecord getRecord() {
		return record;
	}
	public void setRecord(TradeRecord record) {
		this.record = record;
	}
	public TradeType getType() {
		return type;
	}
	public void setType(TradeType type) {
		this.type = type;
	}
	@Override
	public String toString() {
		return "TradeRecordView [record=" + record + ", type=" + type + "]";
	}
	
}
