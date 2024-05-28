package com.demo.platform.yjhapi.datahandler;

import com.demo.platform.yjhapi.domain.CarDriving;
import com.demo.platform.yjhapi.mapper.CarDrivingMapper;
import com.demo.platform.yjhapi.websocket.SendData;
import com.demo.platform.yjhapi.websocket.WebSocketService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Component
@Slf4j
public class DataHandler {
    @Autowired
    private HandlerDatas handlerDatas;
    @Autowired
    private SendData sendData;
    @Autowired
    private CarDrivingMapper carDrivingMapper;
    /**
     * WebSocket对象
     */
    @Autowired
    private WebSocketService webSocketService;

    /**
     * 线程池
     */
    private ExecutorService threadPool = Executors.newCachedThreadPool();

    public void Start() {
        log.info("初始化数据处理类");
        Pool_OnUpdateEvent();
        UpdateCarDrivingRows();
        RemoveSocketClosed();
        log.info("初始化数据处理类完成！");
    }

    /**
     * 数据池更新事件
     */
    private void Pool_OnUpdateEvent() {
        handlerDatas.getPool().get_PoolOnUpdate().get_manager().AddListener((event) -> {
            try {
                CarDriving carData = event.getArg0();
                if (carData != null) {
                    carData.setTraveltime(LocalDateTime.now());
                    sendData.SendBaseData(carData);
                }
            } catch (Exception ex) {
                if (log.isErrorEnabled())
                    log.error("数据池更新事件中出现异常", ex);
            }
        });
    }

    /**
     * 更新车辆行驶数据行数
     */
    private void UpdateCarDrivingRows() {
        threadPool.execute(() -> {
            while (true) {
                try {
                    Integer rows = carDrivingMapper.selectCarDrivingCount();
                    if (rows != null && rows.intValue() > 0) {
                        handlerDatas.setCarDrivingRows(rows);
                    }
                } catch (Exception e) {
                    if (log.isErrorEnabled())
                        log.error("更新车辆行驶数据行数异常", e);
                }
                try {
                    Thread.sleep(60 * 1000);
                } catch (Exception e) {
                    if (log.isErrorEnabled())
                        log.error("更新车辆行驶数据行数的线程异常", e);
                }
            }
        });
    }

    /**
     * 清除已经关闭的Socket连接
     */
    private void RemoveSocketClosed() {
        threadPool.execute(() -> {
            webSocketService.RemoveCloseDataSocket();
        });
    }
}
