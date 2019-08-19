package com.zl.util;

import com.alibaba.fastjson.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * 发送短信工具类
 *
 * @Title:GetMessageCode
 * @Description:发送验证码
 * @Date 2018年7月4日 下午9:27:04
 * 添加依赖
 * <dependency>
 * <groupId>com.alibaba</groupId>
 * <artifactId>fastjson</artifactId>
 * <version>1.2.47</version>
 * </dependency>
 */
public class CodeUtil {
    private static final String QUERY_PATH = "https://openapi.miaodiyun.com/distributor/sendSMS";
    private static final String ACCOUNT_SID = "85a0b0c866cc0aa46a27717dd54eedad";
    private static final String AUTH_TOKEN = "fd28fd2b82c92c8f4a9042f5c9c425fd";
    
    /**
     * 根据相应的手机号发送验证码
     *
     * @param phone
     * @return
     */
    
    public static String getCode(String phone) {
        String rod = smsCode();
        String timestamp = getTimestamp();
        String sig = getMD5(ACCOUNT_SID, AUTH_TOKEN, timestamp);
        String tamp = "【奥克斯】尊敬的用户，您好，您的验证码为" + rod + "，该验证码5分钟内有效。请勿泄漏于他人。";
       
        OutputStreamWriter out = null;
        BufferedReader br = null;
        StringBuilder result = new StringBuilder();
        try {
            URL url = new URL(QUERY_PATH);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            // 设置是否允许数据写入
            connection.setDoInput(true);
            // 设置是否允许参数数据输出
            connection.setDoOutput(true);
            // 设置链接响应时间
            connection.setConnectTimeout(5000);
            // 设置参数读取时间
            connection.setReadTimeout(10000);
            connection.setRequestProperty("Content-type", "application/x-www-form-urlencoded");
            // 提交请求
            out = new OutputStreamWriter(connection.getOutputStream(), "UTF-8");
            String args = getQueryArgs(ACCOUNT_SID, tamp, phone, timestamp, sig, "JSON");
            out.write(args);
            out.flush();
            // 读取返回参数

            br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));
            String temp = "";
            while ((temp = br.readLine()) != null) {
                result.append(temp);
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        JSONObject json = JSONObject.parseObject(result.toString());
        String respCode = json.getString("respCode");
        //System.out.println("接口响应码：" + respCode);
        String defaultRespCode = "0000";
        if (defaultRespCode.equals(respCode)) {
            return defaultRespCode ;
            
        } else {
            return null;
        }
    }
    
    public static boolean sendTelephoneMsg(String phone,String msg) {
        String rod = smsCode();
        String timestamp = getTimestamp();
        String sig = getMD5(ACCOUNT_SID, AUTH_TOKEN, timestamp);
        String tamp = "【奥克斯】尊敬的用户，您好，您的验证码为" + rod + "，该验证码5分钟内有效。请勿泄漏于他人。";
        if(msg!=null) {
        	tamp=msg;
        }
        OutputStreamWriter out = null;
        BufferedReader br = null;
        StringBuilder result = new StringBuilder();
        try {
            URL url = new URL(QUERY_PATH);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            // 设置是否允许数据写入
            connection.setDoInput(true);
            // 设置是否允许参数数据输出
            connection.setDoOutput(true);
            // 设置链接响应时间
            connection.setConnectTimeout(5000);
            // 设置参数读取时间
            connection.setReadTimeout(10000);
            connection.setRequestProperty("Content-type", "application/x-www-form-urlencoded");
            // 提交请求
            out = new OutputStreamWriter(connection.getOutputStream(), "UTF-8");
            String args = getQueryArgs(ACCOUNT_SID, tamp, phone, timestamp, sig, "JSON");
            out.write(args);
            out.flush();
            // 读取返回参数

            br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));
            String temp = "";
            while ((temp = br.readLine()) != null) {
                result.append(temp);
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        JSONObject json = JSONObject.parseObject(result.toString());
        String respCode = json.getString("respCode");
        //System.out.println("接口响应码：" + respCode);
        String defaultRespCode = "0000";
        if (defaultRespCode.equals(respCode)) {
            return true ;
            
        } else {
            return false;
        }
    }
    // 定义一个请求参数拼接方法
    public static String getQueryArgs(String accountSid, String smsContent, String to, String timestamp, String sig,
                                      String respDataType) {
        return "accountSid=" + accountSid + "&smsContent=" + smsContent + "&to=" + to + "&" + "timestamp=" + timestamp
                + "&sig=" + sig + "&respDataType=" + respDataType;
    }

    // 获取时间戳
    public static String getTimestamp() {
        //使用sdf出现0005响应码
        //return new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        return System.currentTimeMillis() + "";
    }

    // sing签名
    public static String getMD5(String sid, String token, String timestamp) {

        StringBuilder result = new StringBuilder();
        String source = sid + token + timestamp;
        // 获取某个类的实例
        try {
            MessageDigest digest = MessageDigest.getInstance("MD5");
            // 要进行加密的东西
            byte[] bytes = digest.digest(source.getBytes());
            for (byte b : bytes) {
                String hex = Integer.toHexString(b & 0xff);
                if (hex.length() == 1) {
                    result.append("0" + hex);
                } else {
                    result.append(hex);
                }
            }
        } catch (NoSuchAlgorithmException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return result.toString();
    }

    // 创建验证码
    public static String smsCode() {
        String random = (int) ((Math.random() * 9 + 1) * 100000) + "";
        return random;
    }
}
