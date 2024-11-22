package com.backend.backend.util;

import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {

	private static final Key Key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours

	public static String generateToken(String username) {
		return Jwts.builder()
				.setSubject(username)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				.signWith(Key)
				.compact();
	}
	
	public static String validateToken(String token) {
		return Jwts.parserBuilder()
				.setSigningKey(Key)
				.build()
				.parseClaimsJws(token)
				.getBody()
				.getSubject();
	}
}
