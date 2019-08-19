package com.zl.service.impl;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zl.dao.CompanyCardDao;
import com.zl.dao.TradeRecordDao;
import com.zl.dao.TradeTypeDao;
import com.zl.pojo.AccountInfo;
import com.zl.pojo.AllUser;
import com.zl.pojo.BankCard;
import com.zl.pojo.CompanyCard;
import com.zl.pojo.OperationLog;
import com.zl.pojo.TradeRecord;
import com.zl.query.Paging;
import com.zl.query.Query;
import com.zl.service.TradeRecordService;
import com.zl.util.JSONUtil;
import com.zl.util.Method;
import com.zl.view.TradeRecordView;

@Service
public class TradeRecordServiceImpl implements TradeRecordService {
	@Autowired
	private TradeRecordDao td;
	@Autowired
	private TradeTypeDao pd;
	//@Autowired
	//private AccountInfoDao ad;
	@Autowired
	private CompanyCardDao cd;
	//@Autowired
	//private OperationLogDao od;

	@Override
	public List<TradeRecordView> queryTradeRecordPaging(Paging paging, HttpSession session) {
		List<TradeRecordView> viewList=new ArrayList<TradeRecordView>();
		AllUser user=(AllUser) session.getAttribute("user");
		System.out.println("当前登录用户==="+user);
		Query query=null;
		if(paging.getQuery()==null) {
			query=new Query();			
		}else {
			query=paging.getQuery();
		}
		query.setQueryUserId(1L);
		paging.setQuery(query);
		paging.setRowCount(td.selectTradeRecordCountByQuery(paging.getQuery()));
		if(paging.getPageIndex()==null) {
			paging.setPageIndex(1);
		}
		Integer pageIndex=paging.getPageIndex();
		if(pageIndex<1) {
			pageIndex=1;
		}else if(pageIndex>paging.getPageTotal()) {
			pageIndex=paging.getPageTotal();
		}
		paging.setPageIndex(pageIndex);
		List<TradeRecord> recordList=td.selectTradeRecordByPaging(paging);
		for (TradeRecord record : recordList) {
			TradeRecordView view=new TradeRecordView();
			view.setRecord(record);
			view.setType(pd.selectTradeTypeById(record.getTradeType()));
			viewList.add(view);
		}
		return viewList;
	}
	
	@Override
	public List<TradeRecord> queryTradeRecordAll() {
		return td.selectTradeRecordAll();
	}

	
	@Override
	public int addTradeRecordAlipay(String notify_json, HttpServletRequest request) throws Exception {
		//支付宝异步回调notify-json:{"gmt_create":"2019-08-16 11:58:29","charset":"UTF-8","subject":"超人贷充值","sign":"ImK9/ajFb5WK1lV6OnyPEkObKsyN+ubz6FeJ7bxCLoqavnKt0ca1213oIRo3pTM/ZtdyUytYciY3WeDg6C+PNXc3GpcNSF56ifSLkhx8/j6tuNPU9AagniHX15l/8vCtgIFVwx+6Eg1DGsAxBF3iWTMwtQzjm8b7n7znp87hE9VDtt6jFIFSVHFkOvnYi1I06bjqh6+IYxJn8Gjl0rBezdoUmRKrHa0ogZ51GoAt5a8CCTs+jeASQrm1Qn7WXvRqiAmhH/FDSqIAHT4/GW8qZzvMLNhzR1Ry+BFjgNEkgNZwRC7ZDNfuS8rxNFvhI3o4eQQf0M3jZqbz+Y1KsMZouQ==","buyer_id":"2088102179295123","body":"超人贷充值","invoice_amount":"1.00","notify_id":"2019081600222115840095121000573707","fund_bill_list":"[{\"amount\":\"1.00\",\"fundChannel\":\"ALIPAYACCOUNT\"}]","notify_type":"trade_status_sync","trade_status":"TRADE_SUCCESS","receipt_amount":"1.00","app_id":"2016101000650186","buyer_pay_amount":"1.00","sign_type":"RSA2","seller_id":"2088102178878329","gmt_payment":"2019-08-16 11:58:39","notify_time":"2019-08-16 11:58:40","passback_params":"merchantBizType%3d3C%26merchantBizNo%3d2016010101111","version":"1.0","out_trade_no":"10926515701702","total_amount":"1.00","trade_no":"2019081622001495121000054765","auth_app_id":"2016101000650186","point_amount":"0.00"}
		AllUser user=(AllUser) request.getSession().getAttribute("user");
		if(user!=null) {
			//添加充值记录
			TradeRecord top=getTradeRecord(notify_json, user);
			int topNum=td.insertTradeRecord(top);
			//用户账户可用余额新增
			//AccountInfo info=ad.selectAccountInfoByUserId(user.getId());
			//info.setActiveAmount(info.getActiveAmount().add(top.getAmount()));
			//int infoNum=ad.updateAccountInfoByUserId(info);
			// 公司账户金额新增
			int ccardNum = addCompanyCardAmount(top.getAmount());
			// 添加操作记录
			int logNum = addOperationLogRecharge(user.getId());
			if(topNum>0 && ccardNum>0 /*&& infoNum>0 && logNum>0*/) {
				System.out.println("充值记录添加成功");
				System.out.println("用户平台账户余额新增成功");
				System.out.println("公司银行卡到账成功");
				System.out.println("新增操作日志");
				return 1;
			}else {
				System.out.println("充值相关操作失败！！");
				return 0;
			}
		}
		return 0;
	}

	@Override
	public TradeRecord queryTradeRecordById(Integer id) {
		return td.selectTradeRecordById(id);
	}

	@Override
	public int addTradeRecordBank(BankCard card, HttpSession session) throws Exception {
		System.out.println("扣除用户银行卡金额");
		System.out.println("用户平台账户余额新增");
		System.out.println("公司账户金额新增");
		System.out.println("添加充值记录");
		System.out.println("添加操作日期");
		// 支付宝异步回调notify-json:{"gmt_create":"2019-08-16
		// 11:58:29","charset":"UTF-8","subject":"超人贷充值","sign":"ImK9/ajFb5WK1lV6OnyPEkObKsyN+ubz6FeJ7bxCLoqavnKt0ca1213oIRo3pTM/ZtdyUytYciY3WeDg6C+PNXc3GpcNSF56ifSLkhx8/j6tuNPU9AagniHX15l/8vCtgIFVwx+6Eg1DGsAxBF3iWTMwtQzjm8b7n7znp87hE9VDtt6jFIFSVHFkOvnYi1I06bjqh6+IYxJn8Gjl0rBezdoUmRKrHa0ogZ51GoAt5a8CCTs+jeASQrm1Qn7WXvRqiAmhH/FDSqIAHT4/GW8qZzvMLNhzR1Ry+BFjgNEkgNZwRC7ZDNfuS8rxNFvhI3o4eQQf0M3jZqbz+Y1KsMZouQ==","buyer_id":"2088102179295123","body":"超人贷充值","invoice_amount":"1.00","notify_id":"2019081600222115840095121000573707","fund_bill_list":"[{\"amount\":\"1.00\",\"fundChannel\":\"ALIPAYACCOUNT\"}]","notify_type":"trade_status_sync","trade_status":"TRADE_SUCCESS","receipt_amount":"1.00","app_id":"2016101000650186","buyer_pay_amount":"1.00","sign_type":"RSA2","seller_id":"2088102178878329","gmt_payment":"2019-08-16
		// 11:58:39","notify_time":"2019-08-16
		// 11:58:40","passback_params":"merchantBizType%3d3C%26merchantBizNo%3d2016010101111","version":"1.0","out_trade_no":"10926515701702","total_amount":"1.00","trade_no":"2019081622001495121000054765","auth_app_id":"2016101000650186","point_amount":"0.00"}
		AllUser user = (AllUser) session.getAttribute("user");
		if (user != null) {
			// 添加充值记录
			TradeRecord top = getTradeRecord("", user);
			int topNum = td.insertTradeRecord(top);
			//用户账户可用余额新增
			//AccountInfo info=ad.selectAccountInfoByUserId(user.getId());
			//info.setActiveAmount(info.getActiveAmount().add(top.getAmount()));
			//int infoNum=ad.updateAccountInfoByUserId(info);
			// 公司账户金额新增
			int ccardNum = addCompanyCardAmount(top.getAmount());
			// 添加操作记录
			int logNum = addOperationLogRecharge(user.getId());
			if (topNum > 0 && ccardNum > 0 /* && infoNum>0 && logNum>0 */) {
				System.out.println("充值记录添加成功");
				System.out.println("用户平台账户余额新增成功");
				System.out.println("公司银行卡到账成功");
				System.out.println("新增操作日志");
				return 1;
			} else {
				System.out.println("充值相关操作失败！！");
				return 0;
			}
		}
		return 0;
	}
	
	/**
	 * 封装新增的交易记录对象
	 * @param notify_json
	 * @param user
	 * @return
	 * @throws Exception
	 */
	public TradeRecord getTradeRecord(String notify_json, AllUser user) throws Exception {
		TradeRecord top=new TradeRecord();
		//top.setUserId(user.getId());
		top.setUserId(user.getId());
		top.setAmount(new BigDecimal(JSONUtil.parseJSONtoStringByKey(notify_json, "invoice_amount")));
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
		top.setCreateTime(sdf.parse(JSONUtil.parseJSONtoStringByKey(notify_json, "gmt_create")));
		top.setTopUpNo(JSONUtil.parseJSONtoStringByKey(notify_json, "out_trade_no"));
		top.setTradeType(Method.RECHARGE_ALIPAY);
		return top;
	}
	/**
	 * 充值后对公司银行卡金额新增
	 * @param amount
	 * @return
	 */
	public int addCompanyCardAmount(BigDecimal amount) {
		CompanyCard ccard = cd.selectCompanyCardById(1);
		ccard.setAmount(ccard.getAmount().add(amount));
		return cd.updateCompanyCard(ccard);
	}
	/**
	 * 充值后添加操作日志
	 * @param userId
	 * @return
	 */
	public int addOperationLogRecharge(Long userId) {
		OperationLog log = new OperationLog();
		log.setCreateTime(new Date());
		log.setIsSuccess(1);
		log.setTypeId(1);
		log.setUserId(userId);
		return 0;
		//return od.addOperationLog(log);
	}
}
