package com.demo.platform.yjhapi.datapool.abstracts;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class AbstractDataPoolManager {
    /**
     * 当前数据池类型
     */
    private DataPoolType _poolType;

    /**
     * 获取当前数据池类型
     */
    public DataPoolType getPoolType() {
        return _poolType;
    }

    /**
     * 数据池更新事件
     */
    protected Pool_OnUpdate _poolOnUpdate;

    public Pool_OnUpdate get_PoolOnUpdate() {
        return _poolOnUpdate;
    }

    public AbstractDataPoolManager(DataPoolType poolType) {
        this._poolType = poolType;
        _poolOnUpdate = new Pool_OnUpdate();
        log.info("初始化数据池，类型：" + getPoolType());
    }

    /**
     * 开始
     */
    public abstract void Start();
}
