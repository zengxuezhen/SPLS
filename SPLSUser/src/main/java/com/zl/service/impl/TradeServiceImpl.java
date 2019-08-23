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
import org.springframework.transaction.annotation.Transactional;

import com.zl.dao.AccountInfoDao;
import com.zl.dao.BankCardDao;
import com.zl.dao.CompanyCardDao;
import com.zl.dao.OperationLogDao;
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
import com.zl.service.TradeService;
import com.zl.util.JSONUtil;
import com.zl.util.PayUtil;
import com.zl.view.TradeRecordView;

@Service
public class TradeServiceImpl implements TradeService {
	@Autowired
	private TradeRecordDao td;
	@Autowired
	private TradeTypeDao pd;
	@Autowired
	private AccountInfoDao ad;
	@Autowired
	private CompanyCardDao cd;
	@Autowired
	private BankCardDao bd;
	@Autowired
	private OperationLogDao od;

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
	public TradeRecord queryTradeRecordById(Integer id) {
		return td.selectTradeRecordById(id);
	}
	
	@Transactional
	@Override
	public int addTradeRecordAlipay(String notify_json, HttpServletRequest request) throws Exception {
		//支付宝异步回调notify-json:{"gmt_create":"2019-08-16 11:58:29","charset":"UTF-8","subject":"超人贷充值","sign":"ImK9/ajFb5WK1lV6OnyPEkObKsyN+ubz6FeJ7bxCLoqavnKt0ca1213oIRo3pTM/ZtdyUytYciY3WeDg6C+PNXc3GpcNSF56ifSLkhx8/j6tuNPU9AagniHX15l/8vCtgIFVwx+6Eg1DGsAxBF3iWTMwtQzjm8b7n7znp87hE9VDtt6jFIFSVHFkOvnYi1I06bjqh6+IYxJn8Gjl0rBezdoUmRKrHa0ogZ51GoAt5a8CCTs+jeASQrm1Qn7WXvRqiAmhH/FDSqIAHT4/GW8qZzvMLNhzR1Ry+BFjgNEkgNZwRC7ZDNfuS8rxNFvhI3o4eQQf0M3jZqbz+Y1KsMZouQ==","buyer_id":"2088102179295123","body":"超人贷充值","invoice_amount":"1.00","notify_id":"2019081600222115840095121000573707","fund_bill_list":"[{\"amount\":\"1.00\",\"fundChannel\":\"ALIPAYACCOUNT\"}]","notify_type":"trade_status_sync","trade_status":"TRADE_SUCCESS","receipt_amount":"1.00","app_id":"2016101000650186","buyer_pay_amount":"1.00","sign_type":"RSA2","seller_id":"2088102178878329","gmt_payment":"2019-08-16 11:58:39","notify_time":"2019-08-16 11:58:40","passback_params":"merchantBizType%3d3C%26merchantBizNo%3d2016010101111","version":"1.0","out_trade_no":"10926515701702","total_amount":"1.00","trade_no":"2019081622001495121000054765","auth_app_id":"2016101000650186","point_amount":"0.00"}
		AllUser user=(AllUser) request.getSession().getAttribute("user");
		if(user!=null) {
			//添加充值记录
			System.out.println("支付宝充值----->添加充值记录");
			TradeRecord top=new TradeRecord();
			top.setUserId(user.getId());
			top.setAmount(new BigDecimal(JSONUtil.parseAliJSONtoStringByKey(notify_json, "invoice_amount")));
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			top.setCreateTime(sdf.parse(JSONUtil.parseAliJSONtoStringByKey(notify_json, "gmt_create")));
			top.setTopUpNo(JSONUtil.parseAliJSONtoStringByKey(notify_json, "out_trade_no"));
			top.setTradeType(PayUtil.RECHARGE_ALIPAY);
			int topNum=td.insertTradeRecord(top);
			//用户账户可用余额新增
			System.out.println("支付宝充值----->用户账户可用余额新增");
			AccountInfo info=ad.selectAccountInfoByUserId(user.getId());
			info.setActiveAmount(info.getActiveAmount().add(top.getAmount()));
			int infoNum=ad.updateAccountInfoActiveAmountByUserId(info);
			// 公司账户金额新增
			System.out.println("支付宝充值----->公司账户金额新增");
			CompanyCard ccard = cd.selectCompanyCardById(1);
			ccard.setAmount(ccard.getAmount().add(top.getAmount()));
			int ccardNum = cd.updateCompanyCard(ccard);
			// 添加操作记录
			System.out.println("支付宝充值----->添加操作记录");
			OperationLog log = new OperationLog();
			log.setCreateTime(new Date());
			log.setIsSuccess(1);
			log.setTypeId(1);
			log.setUserId(user.getId());
			log.setLogNo("t"+PayUtil.getOperationNo());
			int logNum = od.insertOperationLog(log);
			if (topNum > 0 && ccardNum > 0 && infoNum > 0 && logNum > 0) {
				System.out.println("支付宝充值相关操作成功。。。");
				return 1;
			}else {
				System.out.println("支付宝充值相关操作失败！！！");
				return 0;
			}
		}
		return 0;
	}

	@Transactional
	@Override
	public int addTradeRecordBank(BankCard card, HttpSession session){
		AllUser user = (AllUser) session.getAttribute("user");
		if (user != null) {
			//模拟扣除用户银行卡金额
			System.out.println("银行卡充值----->模拟扣除用户银行卡金额");
			BankCard bank=bd.selectBankCardByUserId(user.getId());
			bank.setAmount(bank.getAmount().subtract(card.getAmount()));
			int bankNum=bd.updateBankCardAmount(bank);
			// 添加充值记录
			System.out.println("银行卡充值----->添加充值记录");
			TradeRecord top = new TradeRecord();
			top.setAmount(card.getAmount());
			top.setCreateTime(new Date());
			top.setTopUpNo("CZ"+PayUtil.getOrderNo());
			top.setTradeType(PayUtil.RECHARGE_BANK);
			top.setUserId(user.getId());
			int topNum = td.insertTradeRecord(top);
			//用户账户可用余额新增
			System.out.println("银行卡充值----->用户平台账户可用余额新增");
			AccountInfo info=ad.selectAccountInfoByUserId(user.getId());
			info.setActiveAmount(info.getActiveAmount().add(card.getAmount()));
			int infoNum=ad.updateAccountInfoActiveAmountByUserId(info);
			// 公司账户金额新增
			System.out.println("银行卡充值----->公司账户金额新增");
			CompanyCard ccard = cd.selectCompanyCardById(1);
			ccard.setAmount(ccard.getAmount().add(card.getAmount()));
			int ccardNum = cd.updateCompanyCard(ccard);
			// 添加操作记录
			System.out.println("银行卡充值----->添加操作日志");
			OperationLog log = new OperationLog();
			log.setCreateTime(new Date());
			log.setIsSuccess(1);
			log.setTypeId(1);
			log.setUserId(user.getId());
			log.setLogNo("t"+PayUtil.getOperationNo());
			int logNum = od.insertOperationLog(log);
			if (bankNum>0 && topNum > 0 && ccardNum > 0 && infoNum>0 && logNum>0 ) {
				System.out.println("银行卡充值相关操作成功。。。");
				return 1;
			} else {
				System.out.println("银行卡充值相关操作失败！！！");
				return 0;
			}
		}
		return 0;
	}
	
	@Transactional
	@Override
	public int withdrawRecordBank(BankCard card) {
		Long userId=card.getUserId();
		//新增提现记录
		System.out.println("提现----->添加提现记录");
		TradeRecord top=new TradeRecord();
		top.setUserId(userId);
		top.setAmount(card.getAmount());
		top.setCreateTime(new Date());
		top.setTopUpNo("TX"+PayUtil.getOrderNo());
		top.setTradeType(PayUtil.WITHDRAW_BANK);
		int topNum=td.insertTradeRecord(top);
		//用户账户可用余额减少
		System.out.println("提现----->账号可用余额减少");
		AccountInfo info=ad.selectAccountInfoByUserId(userId);
		info.setActiveAmount(info.getActiveAmount().subtract(card.getAmount()));
		int infoNum=ad.updateAccountInfoActiveAmountByUserId(info);
		// 公司银行卡账户金额减少
		System.out.println("提现----->公司银行卡金额减少");
		CompanyCard ccard = cd.selectCompanyCardById(1);
		ccard.setAmount(ccard.getAmount().subtract(card.getAmount()));
		int ccardNum = cd.updateCompanyCard(ccard);
		//用户银行卡余额添加
		System.out.println("提现----->用户银行卡金额增加");
		BankCard bank=bd.selectBankCardByUserId(userId);
		bank.setAmount(bank.getAmount().add(card.getAmount()));
		int bankNum=bd.updateBankCardAmount(bank);
		// 添加操作记录
		System.out.println("提现----->添加提现操作日志");
		OperationLog log = new OperationLog();
		log.setCreateTime(new Date());
		log.setIsSuccess(1);
		log.setTypeId(2);
		log.setUserId(userId);
		log.setLogNo("t"+PayUtil.getOperationNo());
		int logNum = od.insertOperationLog(log);
		if (topNum > 0 && ccardNum > 0 && infoNum > 0 && logNum > 0 && bankNum>0) {
			System.out.println("提现相关操作成功。。。");
			return 1;
		}else {
			System.out.println("提现相关操作失败！！！");
			return 0;
		}
	}
	
	
	
}
