package com.zl.util;

import java.util.Random;

public class RandomCharacterAndNumber {
    public String getRandomCode() {
        StringBuilder str = new StringBuilder();
        Random random = new Random();
        //随机生成数字，并添加到字符串
        for (int i = 0; i < 8; i++) {
            str.append(random.nextInt(10));
        }
        StringBuilder st = new StringBuilder("BDEFGHJKLMNPQRSTUWXYZ");

        char[] rands = new char[2];
        for (int i = 0; i < rands.length; i++) {
            int rand = (int) (Math.random() * st.length());
            rands[i] = st.charAt(rand);
        }
        return str.toString() + String.valueOf(rands);
    }


}

            
            
  


