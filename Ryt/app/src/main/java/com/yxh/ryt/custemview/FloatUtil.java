package com.yxh.ryt.custemview;

/**
 * Created by YangZhenjie on 2016/8/30.
 */
public class FloatUtil {
    private final static float EPSILON = 0.00000001F;

    public static boolean compareFloats(float f1, float f2) {
        return Math.abs(f1 - f2) <= EPSILON;
    }
}
