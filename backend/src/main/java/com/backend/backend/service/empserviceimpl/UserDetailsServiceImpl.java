package com.backend.backend.service.empserviceimpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.backend.backend.model.Users;
import com.backend.backend.repository.AccountAuthenticationRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private AccountAuthenticationRepository accAuthRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Users user = accAuthRepository.findByAccount(username);
		if(user == null) {
			throw new UsernameNotFoundException("User not found with username >> ".concat(username));
		}
		System.out.println(user.getUsername());
		System.out.println(user.getPassword());
		List<SimpleGrantedAuthority> auth = new ArrayList<>();
		auth.add(new SimpleGrantedAuthority(String.valueOf("ROLE_" + user.getRole_id())));
		
		return new User(user.getUsername(), user.getPassword(), auth);
	}

}
