package com.backend.backend.config;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.filter.OncePerRequestFilter;

import com.backend.backend.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends OncePerRequestFilter{

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String header = request.getHeader("Authorization");
		
		if(header != null && header.startsWith("Bearer ")) {
			String token = header.substring(7);
			System.out.println("token >> " + token);
			try {
				String username = JwtUtil.validateToken(token);
				UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(username, null, null);
				SecurityContextHolder.getContext().setAuthentication(auth);
			} catch (UsernameNotFoundException e) {
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			}		
		}
		
		filterChain.doFilter(request, response);
	}

}
