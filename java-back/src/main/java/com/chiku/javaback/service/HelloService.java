package com.chiku.javaback.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chiku.javaback.model.HelloWorld;
import com.chiku.javaback.repository.HelloRepository;

@Service
public class HelloService {

    private static final Logger logger = LoggerFactory.getLogger(HelloService.class);

    @Autowired
    private HelloRepository helloRepository;

    public HelloWorld getHelloMessage() {
        logger.info("Fetching message from repository");
        String message = helloRepository.fetchMessage();
        logger.info("取得メッセージ: {}", message);
        return new HelloWorld(message);
    }
}