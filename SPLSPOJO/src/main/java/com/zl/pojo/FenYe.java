package com.zl.pojo;


public class FenYe {
	//当前页面
	private int page=1;
	//页面总数
	private int pageCount;
	//每页记录数
	private int row=10;
	//总记录数
	private int rowCount;
	//从第几条开始
	private int rowStart=1;
	//到多少条为止
	private int rowEnd=10;
	
	@Override
	public String toString() {
		return "FenYe [page=" + page + ", pageCount=" + pageCount + ", row=" + row + ", rowCount=" + rowCount
				+ ", rowStart=" + rowStart + ", rowEnd=" + rowEnd  + "]";
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
		rowStart=page*row-row+1;
		rowEnd=page*row;	
	}
	public int getPageCount() {
		return pageCount;
	}
	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}
	public int getRow() {
		return row;
	}
	public void setRow(int row) {
		this.row = row;
	}
	public int getRowCount() {
		return rowCount;
	}
	public void setRowCount(int rowCount) {
		this.rowCount = rowCount;
		if(rowCount>row) {
			pageCount=rowCount%row>0?rowCount/row+1:rowCount/row;
		}else if(rowCount<=row) {
			pageCount=1;
			page=1;
			
		}else if(rowCount==0){
			pageCount=0;
			page=0;
		}
	}
	public int getRowStart() {
		return rowStart;
	}
	public void setRowStart(int rowStart) {
		this.rowStart = rowStart;
	
		
	}
	public int getRowEnd() {
		return rowEnd;
	}
	public void setRowEnd(int rowEnd) {
		this.rowEnd = rowEnd;
	
		
	}
	
	
}
