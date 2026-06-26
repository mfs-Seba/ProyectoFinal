package cl.duoc.tiendaropa.controller;

import cl.duoc.tiendaropa.dto.in.LoginRequest;
import cl.duoc.tiendaropa.dto.in.RegisterRequest;
import cl.duoc.tiendaropa.dto.out.TokenResponse;
import cl.duoc.tiendaropa.dto.out.UserResponse;
import cl.duoc.tiendaropa.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        UserResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
