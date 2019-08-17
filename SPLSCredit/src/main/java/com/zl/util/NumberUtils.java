package com.zl.util;

import java.math.BigDecimal;

public class NumberUtils {  
      
    public static int parseInt(long l){  
        return BigDecimal.valueOf(l).intValue();  
    }  
      
    public static long parseLong(String s) {  
        return Long.parseLong(s.trim());  
    }  
      
    public static BigDecimal getBigDecimal(String s) {  
        return BigDecimal.valueOf(Long.parseLong(s.trim()));  
    }  
      
}  