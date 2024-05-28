package com.demo.platform.yjhapi.websocket;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.StrUtil;
import com.demo.platform.yjhapi.datahandler.HandlerDatas;
import com.demo.platform.yjhapi.utils.SpringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/websocket")
@Component
@Slf4j
public class WebSocketService {
    private HandlerDatas handlerDatas;

    /**
     * 开启
     */
    @PostConstruct
    public void init() {
        log.info("WebSocket启动");
    }

    /**
     * 握手
     */
    @OnOpen
    public void onOpen(Session session, @PathParam("sessionid") String sessionid) throws Exception {
        CheckWired();
        try {
            if (log.isInfoEnabled())
                log.info("IP[" + session.getRequestURI().toString() + "]的用户连接");
        } catch (Exception e) {
            if (log.isErrorEnabled())
                log.error("WebSocket[OnOpen]事件监听异常", e);
        }
    }

    /**
     * 接收到客户端的消息
     * * 0：获取数据
     */
    @OnMessage
    public void onMessage(String msg, Session session) {
        CheckWired();
        if (log.isInfoEnabled())
            log.info("IP[" + session.getRequestURI().toString() + "]的用户发来消息，消息为：" + msg);
        if (StrUtil.isNotEmpty(msg)) {
            try {
                switch (Convert.toInt(msg)) {
                    case 0:
                        if (!handlerDatas.getSocketSessionList().contains(session))
                            handlerDatas.getSocketSessionList().add(session);
                        break;
                }
            } catch (Exception e) {
                if (log.isErrorEnabled())
                    log.error("WebSocket[OnMessage]事件监听异常", e);
            }
        }
    }

    /**
     * 关闭
     */
    @OnClose
    public void onClose(Session session) {
        CheckWired();
        try {
            if (log.isInfoEnabled())
                log.info("IP[" + session.getRequestURI().toString() + "]的用户断开WebSocket连接");
            handlerDatas.getSocketSessionList().remove(session);
        } catch (Exception ex) {
            if (log.isErrorEnabled())
                log.error("WebSocket[OnClose]事件监听异常", ex);
        }
    }

    /**
     * 异常
     */
    @OnError
    public void onError(Session session, Throwable ex) {
        CheckWired();
        try {
            if (session != null && ex != null) {
                if (log.isInfoEnabled())
                    log.info("IP[" + session.getRequestURI().toString() + "]的用户WebSocket连接出错,原因：" + ex.getLocalizedMessage());
            }
            if (session == null && ex != null) {
                if (log.isInfoEnabled())
                    log.info("WebSocket连接出错,原因：" + ex.getLocalizedMessage());
            }
            handlerDatas.getSocketSessionList().remove(session);
        } catch (Exception ex1) {
            if (log.isErrorEnabled())
                log.error("WebSocket[OnError]事件监听异常", ex1);
        }
    }

    /**
     * 清除已经关闭的Socket连接
     */
    public void RemoveCloseDataSocket() {
        CheckWired();
        while (true) {
            try {
                for (Session session : handlerDatas.getSocketSessionList()) {
                    if (session != null) {
                        if (!session.isOpen())
                            handlerDatas.getSocketSessionList().remove(session);
                    } else {
                        handlerDatas.getSocketSessionList().remove(session);
                    }
                }
            } catch (Exception e) {
                if (log.isErrorEnabled())
                    log.error("清除获取定位数据且已经关闭的Socket连接异常", e);
            }
            try {
                Thread.sleep(60 * 1000);
            } catch (Exception e) {
                if (log.isErrorEnabled())
                    log.error("休眠清除已经关闭Socket连接的线程异常", e);
            }
        }
    }

    /**
     * 判断装配
     */
    private void CheckWired() {
        if (handlerDatas == null)
            handlerDatas = SpringUtils.getBean(HandlerDatas.class);

    }
}
