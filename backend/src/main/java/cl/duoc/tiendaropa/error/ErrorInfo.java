package cl.duoc.tiendaropa.error;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ErrorInfo {
    private int codigo;
    private String mensaje;
}
