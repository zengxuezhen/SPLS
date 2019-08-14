package com.zl.util;




import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

/**AES加密工具类
 */

public class AESUtil {
	
	private static final String key="p2p1111111111111p2p1111111111111";
    public static String setAesEncoder(String str){
    	
        String originalString=null;
        try {
          
            byte[] raw = key.getBytes("utf-8");
            SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
            Cipher cipher1 = Cipher.getInstance("AES/ECB/PKCS5Padding");//"算法/模式/补码方式"
            cipher1.init(Cipher.ENCRYPT_MODE, skeySpec);
            byte[] encrypted = cipher1.doFinal(str.getBytes("utf-8"));
            originalString= Base64.getEncoder().encodeToString(encrypted);	
        } catch (Exception e) {
            // TODO Auto-generated catch block
            System.out.println("exception:"+e.toString());
        }
        return originalString;
        
    }
    public static String getAesDecoder(String str){
        String originalString=null;
        try {
        	
        	 byte[] raw = key.getBytes("utf-8");
             SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
             Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");//"算法/模式/补码方式"
        	 cipher.init(Cipher.DECRYPT_MODE, skeySpec);
        	 byte[] encrypted = cipher.doFinal(Base64.getDecoder().decode(str));
             originalString = new String(encrypted,"utf-8");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            System.out.println("exception:"+e.toString());
        }
        return originalString;
    }
   
}
