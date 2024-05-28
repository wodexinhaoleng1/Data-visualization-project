package com.demo.platform.yjhapi;

import com.demo.platform.yjhapi.datahandler.DataHandler;
import com.demo.platform.yjhapi.datahandler.HandlerDatas;
import com.demo.platform.yjhapi.datapool.mysql.DataPoolManager;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@MapperScan("com.demo.platform.yjhapi.mapper")
@SpringBootApplication
public class YjhApiApplication implements CommandLineRunner {
    @Autowired
    private DataHandler dataHandler;

    @Autowired
    private HandlerDatas handlerDatas;

    @Autowired
    private DataPoolManager dataPoolManager;

    public static void main(String[] args) {
        try {
            SpringApplication.run(YjhApiApplication.class, args);
            System.out.println("程序启动成功！");
        } catch (Throwable ex) {
            log.error("程序异常", ex);
            System.out.println("程序异常，准备退出了！");
            System.exit(0);
        }
    }

    @Override
    public void run(String... args) throws Exception {
        handlerDatas.setPool(dataPoolManager);
        dataPoolManager.Start();
        dataHandler.Start();
    }
}
