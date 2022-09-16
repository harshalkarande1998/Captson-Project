package com.niit.authentication.security;

import com.niit.authentication.domain.User;

import java.util.Map;

public interface JwtTokenGenerator {
    Map<String,String> generateToken(User user);
}
