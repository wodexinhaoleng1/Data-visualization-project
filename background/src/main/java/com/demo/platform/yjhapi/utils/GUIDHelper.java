package com.demo.platform.yjhapi.utils;

import cn.hutool.core.codec.Base64;
import cn.hutool.core.lang.UUID;

public class GUIDHelper {

    /**
     * 返回8位数GUID
     *
     * @return
     */
    public static String Guid8() {
        return Base64.encode((UUID.randomUUID().toString()).getBytes()).toString().replace("[B@", "");
    }

    /**
     * 返回32位大写GUID
     *
     * @return
     */
    public static String Guid32() {
        return UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
    }

    /**
     * 返回36位大写GUID
     *
     * @return
     */
    public static String Guid36() {
        return UUID.randomUUID().toString().toUpperCase();
    }
}
