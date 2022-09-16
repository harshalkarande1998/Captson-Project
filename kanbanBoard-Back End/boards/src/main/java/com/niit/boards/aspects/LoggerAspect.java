package com.niit.boards.aspects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggerAspect {
    private static final Logger logger = LoggerFactory.getLogger(LoggerAspect.class);
    
    @Pointcut("execution(* com.niit.boards.*.*(..))")
    public void allMethods()
    {}

    @Before("allMethods()")
    public void beforeMethod(JoinPoint point)
    {
        logger.info("**********************************");
        logger.debug("method name:{}",point.getSignature().getName());
        logger.debug("method arguments:{}",point.getArgs());
        logger.info("*************************************");
    }
    @After(("allMethods()"))
    public void afterMethod(JoinPoint point)
    {
        logger.info("**********************************");
        logger.debug("method name:{}",point.getSignature().getName());
        logger.debug("method arguments:{}",point.getArgs());
        logger.info("*************************************");

    }

    @AfterReturning(value = "allMethods()", returning = "object")
    public void afterReturning(JoinPoint point, Object object)
    {

        logger.info("**********************************");
        logger.debug("method name:{}",point.getSignature().getName());
        logger.debug("method arguments:{}",point.getArgs());
        logger.debug("returns:{}",object);
        logger.info("*************************************");
    }

    @AfterThrowing(value="allMethods()", throwing = "throwable")
    public void afterThrows(JoinPoint point, Throwable throwable)
    {

        logger.info("**********************************");
        logger.debug("method name:{}",point.getSignature().getName());
        logger.debug("method arguments:{}",point.getArgs());
        logger.debug("method throws:{}", throwable.getMessage());
        logger.info("*************************************");
    }

}

