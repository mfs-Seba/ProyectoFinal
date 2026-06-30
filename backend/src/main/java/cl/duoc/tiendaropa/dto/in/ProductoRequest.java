package cl.duoc.tiendaropa.dto.in;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ProductoRequest {

    @NotBlank
    @Size(max = 120)
    private String nombre;

    @Size(max = 500)
    private String descripcion;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal precio;

    @NotNull
    @Min(0)
    private Integer stock;

    @Size(max = 20)
    private String talla;

    @Size(max = 30)
    private String color;

    @Size(max = 255)
    private String imagenUrl;

    @NotNull
    private Integer categoriaId;
}
