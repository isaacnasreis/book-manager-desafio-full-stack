package com.vgx.bookmanager.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import com.vgx.bookmanager.entities.User;
// import com.vgx.bookmanager.repositories.UserRepository;
// import com.vgx.bookmanager.security.JwtService;
// import com.vgx.bookmanager.dtos.AuthRequestDTO;
// import com.vgx.bookmanager.dtos.AuthResponseDTO;
// import com.vgx.bookmanager.dtos.RegisterRequestDTO;

@RestController
@RequiredArgsConstructor
public class AuthController {

    // private final AuthenticationManager authenticationManager;
    // private final JwtService jwtService;
    // private final UserRepository userRepository;
    // private final PasswordEncoder passwordEncoder;

    @PostMapping("/auth/register")
    public ResponseEntity<?> register(/* @Valid @RequestBody RegisterRequestDTO registerDto */) {

        // Exemplo de implementação real (descomentar futuramente):
        // if (userRepository.findByEmail(registerDto.getEmail()).isPresent()) {
        // return ResponseEntity.badRequest().build();
        // }
        //
        // User user = new User();
        // user.setEmail(registerDto.getEmail());
        // user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        // userRepository.save(user);
        //
        // String token = jwtService.generateToken(user.getEmail());
        // return ResponseEntity.ok(new AuthResponseDTO(token));

        return ResponseEntity.ok().build(); // Retorno temporário
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(/* @Valid @RequestBody AuthRequestDTO loginDto */) {

        // Exemplo de implementação real (descomentar futuramente):
        // Authentication authentication = authenticationManager.authenticate(
        // new UsernamePasswordAuthenticationToken(loginDto.getEmail(),
        // loginDto.getPassword())
        // );
        //
        // String token = jwtService.generateToken(authentication.getName());
        // return ResponseEntity.ok(new AuthResponseDTO(token));

        return ResponseEntity.ok().build(); // Retorno temporário
    }
}