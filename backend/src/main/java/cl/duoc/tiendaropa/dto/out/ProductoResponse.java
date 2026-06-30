package cl.duoc.tiendaropa.dto.out;

import lombok.*;

import java.math.BigDecimal;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ProductoResponse {
    private Integer id;
    private String nombre;
    private String descripcion;
    private BigDecimal precio;
    private Integer stock;
    private String talla;
    private String color;
    private String imagenUrl;
    private Integer categoriaId;
    private String categoriaNombre;
}
