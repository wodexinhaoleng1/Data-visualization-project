package com.demo.platform.yjhapi.datapool.mysql;

import com.demo.platform.yjhapi.datahandler.HandlerDatas;
import com.demo.platform.yjhapi.datapool.abstracts.AbstractDataPoolManager;
import com.demo.platform.yjhapi.datapool.abstracts.DataPoolType;
import com.demo.platform.yjhapi.datapool.abstracts.Pool_OnUpdate;
import com.demo.platform.yjhapi.domain.CarDriving;
import com.demo.platform.yjhapi.mapper.CarDrivingMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Timer;
import java.util.TimerTask;

@Component
@Slf4j
public class DataPoolManager extends AbstractDataPoolManager {
    @Autowired
    private HandlerDatas handlerDatas;
    @Autowired
    private CarDrivingMapper carDrivingMapper;

    private Timer timer;

    public DataPoolManager() {
        super(DataPoolType.MySql);
    }

    /**
     * 定时从MySql里取数据
     */
    @Override
    public void Start() {
        timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                UpdateMonitorData();
            }
        }, 1000, 1000);
    }

    /**
     * 从MySql中获取数据，并触发数据池更新事件
     */
    private void UpdateMonitorData() {
        //如果现在行数比总数据行数大，就设为第一行，循环读取
        if (handlerDatas.getCarDrivingNowRows() > handlerDatas.getCarDrivingRows()) {
            handlerDatas.setCarDrivingNowRows(1);
            return;
        }
        CarDriving data = carDrivingMapper.selectCarDrivingByRow(handlerDatas.getCarDrivingNowRows());
        handlerDatas.setCarDrivingNowRows(handlerDatas.getCarDrivingNowRows() + 1);
        Pool_OnUpdate.CustomizeEventManager eventManager = super._poolOnUpdate.get_manager();
        eventManager.TriggerEvent(data);
    }
}
