package com.demo.platform.yjhapi.datapool.abstracts;


import com.demo.platform.yjhapi.domain.CarDriving;

import java.util.EventListener;
import java.util.EventObject;
import java.util.Iterator;
import java.util.Vector;

/**
 * 数据池更新事件
 */
public class Pool_OnUpdate {
    private CustomizeEventManager _manager;

    public CustomizeEventManager get_manager() {
        return _manager;
    }

    public Pool_OnUpdate() {
        this._manager = new CustomizeEventManager();
    }

    public class CustomizeEvent extends EventObject {
        private static final long serialVersionUID = 1L;
        private CarDriving arg0;

        public CustomizeEvent(Object source, CarDriving arg0) {
            super(source);
            this.arg0 = arg0;
        }

        public CarDriving getArg0() {
            return arg0;
        }
    }

    public interface CustomizeEventListener extends EventListener {
        public void CustomizeEvent(CustomizeEvent event);
    }

    public class CustomizeEventManager {
        private Vector<CustomizeEventListener> listeners = new Vector<CustomizeEventListener>();

        /**
         * 添加监听事件
         */
        public synchronized void AddListener(CustomizeEventListener listener) {
            listeners.add(listener);
        }

        /**
         * 删除监听事件
         */
        public synchronized void RemoveListener(CustomizeEventListener listener) {
            listeners.remove(listener);
        }

        private void notifyListeners(CustomizeEvent event) {
            Iterator<CustomizeEventListener> iter = this.listeners.iterator();
            while (iter.hasNext()) {
                CustomizeEventListener listener = iter.next();
                listener.CustomizeEvent(event);
            }
        }

        /**
         * 触发事件
         */
        public void TriggerEvent(CarDriving tdMap) {
            if (this.listeners != null) {
                CustomizeEvent event = new CustomizeEvent(this, tdMap);
                notifyListeners(event);
            }
        }
    }
}
