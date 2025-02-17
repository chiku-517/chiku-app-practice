package com.chiku.javaback.repository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class HelloRepository {

    private static final Logger logger = LoggerFactory.getLogger(HelloRepository.class);

    public String fetchMessage() {
        logger.info("Fetching static message");
        return "ハローワールド成功";
    }
}