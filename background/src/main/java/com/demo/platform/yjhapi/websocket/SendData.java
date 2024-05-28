package com.demo.platform.yjhapi.websocket;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.demo.platform.yjhapi.datahandler.HandlerDatas;
import com.demo.platform.yjhapi.domain.CarDriving;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.websocket.Session;
import java.util.Iterator;

@Component
@Slf4j
public class SendData {
    @Autowired
    private HandlerDatas handlerDatas;

    /**
     * 发送数据
     */
    public void SendBaseData(CarDriving arg0) {
        Iterator<Session> positionIterator = handlerDatas.getSocketSessionList().iterator();
        while (positionIterator.hasNext()) {
            Session session = positionIterator.next();
            if (session.isOpen()) {
                SocketSendData(session, arg0);
            }
        }
    }

    /**
     * Socket发送数据
     *
     * @param session WebSocket连接
     * @param data    数据
     */
    private void SocketSendData(Session session, CarDriving data) {
        try {
            String jsonString = JSON.toJSONStringWithDateFormat(data, "yyyy-MM-dd HH:mm:ss",
                    SerializerFeature.WriteMapNullValue);
            if (session.isOpen())
                session.getBasicRemote().sendText(jsonString);
        } catch (Exception ex) {
            if (log.isErrorEnabled())
                log.error("给IP[" + session.getRequestURI().toString() + "]的用户推送消息异常");
        }
    }
}
