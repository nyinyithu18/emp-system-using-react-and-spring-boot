	package com.backend.backend.controller.register;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.model.Users;
import com.backend.backend.repository.AccountAuthenticationRepository;
import com.backend.backend.util.JwtUtil;

@RestController
public class UsersController {

	@Autowired
	private AccountAuthenticationRepository accAuthRepository;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	@PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<String> login(@RequestBody Users loginRequest) {
	    
		Users user = accAuthRepository.findByAccount(loginRequest.getUsername());
		
		if(user == null) {
			// System.out.println("Username not found >> ".concat(user.getUsername()).concat(" >> ").concat(loginRequest.getUsername()));
			return ResponseEntity.status(401).body("Invalid Username >> ".concat(loginRequest.getUsername()));
		}
		
		if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
			// System.out.println("Password not found >> ".concat(user.getPassword()).concat(" >> ").concat(loginRequest.getPassword()));
			return ResponseEntity.status(401).body("Invalid Password >> ".concat(loginRequest.getPassword()));
		}
		
		String token = JwtUtil.generateToken(user.getUsername());
		return ResponseEntity.ok(token);
	}
	
}
