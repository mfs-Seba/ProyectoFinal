package cl.duoc.tiendaropa.dto.out;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserResponse {
    private String username;
    private String email;
    private String rol;
}
