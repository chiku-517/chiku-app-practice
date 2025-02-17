package com.chiku.javaback.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chiku.javaback.model.HelloWorld;
import com.chiku.javaback.service.HelloService;

@RestController
public class HelloController {

    private static final Logger logger = LoggerFactory.getLogger(HelloController.class);

    @Autowired
    private HelloService helloService;

    @GetMapping("/api/hello")
    public HelloWorld sayHello() {
        logger.info("Received request at /api/hello");
        return helloService.getHelloMessage();
    }
}