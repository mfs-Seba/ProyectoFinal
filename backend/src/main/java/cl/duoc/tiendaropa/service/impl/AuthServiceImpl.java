package cl.duoc.tiendaropa.service.impl;

import cl.duoc.tiendaropa.dto.in.LoginRequest;
import cl.duoc.tiendaropa.dto.in.RegisterRequest;
import cl.duoc.tiendaropa.dto.out.TokenResponse;
import cl.duoc.tiendaropa.dto.out.UserResponse;
import cl.duoc.tiendaropa.entity.Role;
import cl.duoc.tiendaropa.entity.User;
import cl.duoc.tiendaropa.error.ConflictException;
import cl.duoc.tiendaropa.error.NotFoundException;
import cl.duoc.tiendaropa.repository.RoleRepository;
import cl.duoc.tiendaropa.repository.UserRepository;
import cl.duoc.tiendaropa.security.JwtUtil;
import cl.duoc.tiendaropa.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Override
    @Transactional
    public UserResponse register(RegisterRequest req) {
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new ConflictException("El nombre de usuario ya está en uso");
        }
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new ConflictException("El email ya está en uso");
        }

        String tempRolNombre = "ROLE_USER";
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            tempRolNombre = normalizarRol(req.getRol());
        }
        final String rolNombre = tempRolNombre;

        Role rol = roleRepository.findByNombre(rolNombre)
                .orElseThrow(() -> new NotFoundException("Rol no encontrado: " + rolNombre));

        Set<Role> roles = new HashSet<>();
        roles.add(rol);

        User user = User.builder()
                .username(req.getUsername())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .roles(roles)
                .build();

        userRepository.save(user);

        return UserResponse.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .rol(rolNombre)
                .build();
    }

    @Override
    public TokenResponse login(LoginRequest req) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
            );
            List<String> roles = auth.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());
            String token = jwtUtil.generateToken(req.getUsername(), roles);
            return TokenResponse.builder().token(token).build();
        } catch (Exception ex) {
            throw new BadCredentialsException("Credenciales inválidas");
        }
    }

    private String normalizarRol(String rol) {
        String r = rol.trim().toUpperCase();
        if (!r.startsWith("ROLE_")) r = "ROLE_" + r;
        return r;
    }
}
