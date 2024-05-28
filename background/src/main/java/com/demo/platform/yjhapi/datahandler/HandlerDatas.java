package com.demo.platform.yjhapi.datahandler;

import com.demo.platform.yjhapi.datapool.abstracts.AbstractDataPoolManager;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.websocket.Session;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class HandlerDatas {
    /**
     * 数据池对象
     */
    @Getter
    @Setter
    private AbstractDataPoolManager pool;

    /**
     * 行驶数据总行数
     */
    @Getter
    @Setter
    private int carDrivingRows;

    /**
     * 行驶数据现在读取的行数
     */
    @Getter
    @Setter
    private int carDrivingNowRows;

    /**
     * 缓存websocket连接
     */
    @Getter
    private CopyOnWriteArrayList<Session> socketSessionList;

    public HandlerDatas() {
        carDrivingRows = 0;
        carDrivingNowRows = 1;
        socketSessionList = new CopyOnWriteArrayList<Session>();
    }
}
