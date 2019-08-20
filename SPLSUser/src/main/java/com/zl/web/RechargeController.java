package com.zl.web;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.internal.util.AlipaySignature;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.alipay.config.DefaultAlipayClientFactory;
import com.zl.pojo.AllUser;
import com.zl.pojo.BankCard;
import com.zl.pojo.TradeRecord;
import com.zl.service.TradeRecordService;

/**
 * 充值操作控制器
 * @author Administrator
 * 
 */
@Controller
@RequestMapping("/user/trade")
public class RechargeController {

	private static final String CHARSET="UTF-8";
	@Autowired
	private TradeRecordService ts;
	
	@RequestMapping("/toRecharge")
	public String toRechargePage(HttpSession session, Map<String, Object> map) {
		AllUser user=(AllUser) session.getAttribute("user");
		map.put("userId", 1);
		return "/充值";
	}
	
	@RequestMapping("/payBank")
	public void payBank(HttpSession session, BankCard card) throws Exception {
		System.out.println(card);
		int num=ts.addTradeRecordBank(card, session);
		if(num>0) {
    		System.out.println("银行卡充值记录成功。。");
    	}else {
    		System.out.println("银行卡充值记录失败！！");
    	}
	}
	
	/**
	 * 支付宝扫码充值
	 * @param response
	 * @param top
	 * @throws Exception
	 */
	@RequestMapping("/payRecharge")
	public void payRecharge(HttpServletResponse response, TradeRecord top) throws Exception {
		System.out.println("进入支付宝充值功能.....");
		top.setTopUpNo("CZ"+getDateAddUUID());
		String topSubject="超人贷充值";//数据库加字段
		System.out.println(top.toString());
		AlipayClient alipayClient = DefaultAlipayClientFactory.getAlipayClient();
		AlipayTradePagePayRequest aliRequest = new AlipayTradePagePayRequest();
		aliRequest.setReturnUrl("http://xpi8y5.natappfree.cc/user/trade/return_url");//
		aliRequest.setNotifyUrl("http://xpi8y5.natappfree.cc/user/trade/notify_url");//
		aliRequest.setBizContent("{" +
	        "    \"out_trade_no\":\""+top.getTopUpNo()+"\"," +
	        "    \"product_code\":\"FAST_INSTANT_TRADE_PAY\"," +
	        "    \"total_amount\":"+top.getAmount()+"," +
	        "    \"subject\":\""+topSubject+"\"," +
	        "    \"body\":\""+topSubject+"\"," +
	        "    \"passback_params\":\"merchantBizType%3d3C%26merchantBizNo%3d2016010101111\"," +
	        "    \"extend_params\":{" +
	        "    \"sys_service_provider_id\":\"2088511833207846\"" +
	        "    }"+
	        "  }");//填充业务参数
		String form = "";
		try {
			form = alipayClient.pageExecute(aliRequest).getBody(); // 调用SDK生成表单
			System.out.println(form);
		} catch (AlipayApiException e) {
			e.printStackTrace();
		}
		System.out.println("沙盒订单生成结束。。");
		response.setContentType("text/html;charset=" + CHARSET);
	    response.getWriter().write(form);//直接将完整的表单html输出到页面
	    response.getWriter().flush();
	    response.getWriter().close();
	}
	

	/**
     * 支付宝服务器异步通知请求，处理自己的业务逻辑
     * @param request
     * @param out_trade_no 商户订单号
     * @param trade_no 支付宝交易凭证号
     * @param trade_status 交易状态
     * @return
	 * @throws Exception 
     */
    @RequestMapping("/notify_url")
    public String alipayNotify(HttpServletRequest request, String out_trade_no, String trade_no, String trade_status) throws Exception {
        Map<String, String> params = getParamsMap(request);
        String notify_json=(String) JSONObject.toJSON(params);
        System.out.println("notify-json:"+notify_json);
        // 验证签名
        boolean signVerified = AlipaySignature.rsaCheckV1(params, DefaultAlipayClientFactory.ALIPAY_PUBLIC_KEY, DefaultAlipayClientFactory.CHARSET, DefaultAlipayClientFactory.SIGN_TYPE);
        System.out.println("验证签名"+signVerified);
        if (signVerified) {
            //处理你的业务逻辑，新增订单记录，操作日志等
        	System.out.println("---------向数据库添加充值记录");
        	int num=ts.addTradeRecordAlipay(notify_json,request);
        	if(num>0) {
        		System.out.println("添加充值记录成功。。");
        	}else {
        		System.out.println("添加充值记录失败！！");
        	}
        	System.out.println("---------添加充值记录结束");
            return "success";
        } else {
            System.out.println("验证失败,不去更新状态");
            return "error";
        }
    }
 
    /**
     * 支付宝服务器同步通知请求，成功后并跳转页面
     * @param request
     * @param out_trade_no 商户订单号
     * @param trade_no 支付宝交易凭证号
     * @param total_amount 交易状态
     * @return
     * @throws AlipayApiException
     */
    @RequestMapping("/return_url")
    public String alipayReturn(HttpServletRequest request, String out_trade_no,String trade_no,String total_amount) throws AlipayApiException {
        Map<String, String> params = getParamsMap(request);
        System.out.println("return-json:"+JSONObject.toJSON(params));
        // 验证签名
        boolean signVerified = AlipaySignature.rsaCheckV1(params, DefaultAlipayClientFactory.ALIPAY_PUBLIC_KEY, DefaultAlipayClientFactory.CHARSET, DefaultAlipayClientFactory.SIGN_TYPE);
        System.out.println("验证签名"+signVerified);
        if (signVerified) {
            return "/trade_success.html";
        } else {
            System.out.println("验证失败,不去更新状态");
            return "/trade_error.html";
        }
    }
 
    /**
     * 处理支付宝扫码扣款成功返回的回调请求信息
     * @param request
     * @return
     */
    private Map<String, String> getParamsMap(HttpServletRequest request) {
        Map<String,String> params = new HashMap<String,String>();
        Map<String, String[]> requestParams = request.getParameterMap();
        for (Iterator<String> iter = requestParams.keySet().iterator(); iter.hasNext();) {
            String name = (String) iter.next();
            String[] values = (String[]) requestParams.get(name);
            String valueStr = "";
            for (int i = 0; i < values.length; i++) {
                valueStr = (i == values.length - 1) ? valueStr + values[i]
                        : valueStr + values[i] + ",";
            }
            //乱码解决，这段代码在出现乱码时使用【巨坑：如果加上异步回调时验证签名有问题】
            //valueStr = new String(valueStr.getBytes("ISO-8859-1"), "UTF-8");
            params.put(name, valueStr);
        }
        return params;
    }
	
    /**
     * 获取唯一充值订单号
     * 20190817104715b83596c19708febb
     * @return
     */
    public StringBuffer getDateAddUUID() {
		StringBuffer sb=new StringBuffer();
		String uuidStr=UUID.randomUUID().toString().replaceAll("\\-", "");
		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddHHmmss");
		sb.append(sdf.format(new Date()));
		sb.append(uuidStr.substring(uuidStr.length()/2));
		return sb;
	}
    
}
