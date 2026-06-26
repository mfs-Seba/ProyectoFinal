package cl.duoc.tiendaropa.config;

import cl.duoc.tiendaropa.entity.Role;
import cl.duoc.tiendaropa.entity.User;
import cl.duoc.tiendaropa.repository.RoleRepository;
import cl.duoc.tiendaropa.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        roleRepository.findByNombre("ROLE_USER")
                .orElseGet(() -> roleRepository.save(Role.builder().nombre("ROLE_USER").build()));
        Role roleAdmin = roleRepository.findByNombre("ROLE_ADMIN")
                .orElseGet(() -> roleRepository.save(Role.builder().nombre("ROLE_ADMIN").build()));

        if (!userRepository.existsByUsername("admin")) {
            Set<Role> roles = new HashSet<>();
            roles.add(roleAdmin);
            userRepository.save(User.builder()
                    .username("admin")
                    .email("admin@tienda.cl")
                    .password(passwordEncoder.encode("admin123"))
                    .roles(roles)
                    .build());
        }

    }
}
