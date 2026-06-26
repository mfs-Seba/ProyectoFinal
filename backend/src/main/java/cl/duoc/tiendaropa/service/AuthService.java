package cl.duoc.tiendaropa.service;

import cl.duoc.tiendaropa.dto.in.LoginRequest;
import cl.duoc.tiendaropa.dto.in.RegisterRequest;
import cl.duoc.tiendaropa.dto.out.TokenResponse;
import cl.duoc.tiendaropa.dto.out.UserResponse;

public interface AuthService {
    UserResponse register(RegisterRequest request);
    TokenResponse login(LoginRequest request);
}
