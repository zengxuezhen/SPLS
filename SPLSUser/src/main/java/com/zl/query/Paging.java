package com.zl.query;

import java.io.Serializable;

/**
 * 分页对象
 * @author 王静
 *
 */
public class Paging implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 959773576507684022L;
	private Integer pageSize;//每页记录数
	private Integer rowCount;			//总记录数
	private Integer pageIndex;			//当前页码
	private Integer pageTotal;			//总页数，已计算
	private Integer startRow;			//开始行，已计算
	private Integer endRow;				//结束行，已计算
	private Query query;				//模糊查询条件
	
	public Integer getRowCount() {
		return rowCount;
	}
	public void setRowCount(Integer rowCount) {
		this.rowCount = rowCount;
	}
	public Integer getPageIndex() {
		return pageIndex;
	}
	public void setPageIndex(Integer pageIndex) {
		this.pageIndex = pageIndex;
	}
	//获取总页数
	public Integer getPageTotal() {
		if(getRowCount()!=null && getRowCount()>0) {
			if(getRowCount()%getPageSize()==0) {
				pageTotal=getRowCount()/getPageSize();
			}else {
				pageTotal=getRowCount()/getPageSize()+1;
			}
		}else {
			pageTotal=1;
		}
		return pageTotal;
	}
	public void setPageTotal(Integer pageTotal) {
		this.pageTotal = pageTotal;
	}
	//获取开始行
	public Integer getStartRow() {
		return (getPageIndex()-1)*getPageSize();
	}
	public void setStartRow(Integer startRow) {
		this.startRow = startRow;
	}
	//获取结束行
	public Integer getEndRow() {
		return getPageIndex()*getPageSize();
	}
	public void setEndRow(Integer endRow) {
		this.endRow = endRow;
	}
	public Query getQuery() {
		return query;
	}
	public void setQuery(Query query) {
		this.query = query;
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	@Override
	public String toString() {
		return "Paging [pageSize=" + pageSize + ", rowCount=" + rowCount + ", pageIndex=" + pageIndex + ", pageTotal="
				+ pageTotal + ", startRow=" + startRow + ", endRow=" + endRow + ", query=" + query + "]";
	}
	
}
