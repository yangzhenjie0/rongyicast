package com.yxh.ryt.adapter;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;

import com.yxh.ryt.Constants;
import com.yxh.ryt.fragment.BaseFragment;

import java.util.List;

/**
 * Created by 吴洪杰 on 2016/4/5.
 */
public class RongZiXqTabPageIndicatorAdapter extends FragmentPagerAdapter {

    List<Fragment> fragments;
    public RongZiXqTabPageIndicatorAdapter(FragmentManager fm, List<Fragment> fragments) {
        super(fm);
        this.fragments=fragments;
    }

    @Override
    public Fragment getItem(int position) {
        //新建一个Fragment来展示ViewPager item的内容，并传递参数
        Fragment fragment = this.fragments.get(position);
        Bundle args = new Bundle();
        args.putString("arg", Constants.RONGZI_XQ_TITLE[position]);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public CharSequence getPageTitle(int position) {
        return Constants.RONGZI_XQ_TITLE[position % Constants.RONGZI_XQ_TITLE.length];
    }

    @Override
    public int getCount() {
        return Constants.RONGZI_XQ_TITLE.length;
    }
}