package com.niit.authentication.security;

import com.niit.authentication.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtTokenGeneratorImpl implements JwtTokenGenerator{
    @Override
    public Map<String, String> generateToken(User user) {
        System.out.println("************** Token generation starting ***********************************************");
        String jwtToken= Jwts.builder().setIssuer("KanbanProjectGroup2")
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256,"group2kanbanboard")
                .compact();
        System.out.println("******************* token generation done ******************************");
        Map<String, String> tokenResponse = new HashMap<>();
        tokenResponse.put("token",jwtToken);
        tokenResponse.put("message","Authentication Successful");
        System.out.println("******************* token generation saved in map ******************************");
        return tokenResponse;

    }
}
