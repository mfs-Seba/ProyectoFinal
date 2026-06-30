package cl.duoc.tiendaropa.dto.out;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CategoriaResponse {
    private Integer id;
    private String nombre;
    private String descripcion;
}
