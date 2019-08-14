package com.zl.pojo;

import java.io.Serializable;

/**
 * 手机发送短信信息实体类
 * @author Administrator
 * 映射数据库表MESSAGE
 */
public class Message implements Serializable {
    
	private static final long serialVersionUID = -3596509332296857510L;
	//主键ID，自增
	private Integer id;
	//短信内容
    private String content;

    public Message(Integer id, String content) {
        this.id = id;
        this.content = content;
    }

    public Message() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }
}