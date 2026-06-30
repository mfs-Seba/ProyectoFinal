package cl.duoc.tiendaropa.dto.in;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CategoriaRequest {
    @NotBlank
    @Size(max = 80)
    private String nombre;

    @Size(max = 255)
    private String descripcion;
}
