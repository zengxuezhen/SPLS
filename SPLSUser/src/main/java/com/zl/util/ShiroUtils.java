package com.zl.util;

import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;
import org.apache.shiro.util.ByteSource.Util;


public class ShiroUtils {

    public String ShiroMd5(String password, String uuid) {
        new ByteSource.Util();
        Object salt = Util.bytes(uuid);
        return new SimpleHash("MD5", password, salt, 24).toString();
    }
}
