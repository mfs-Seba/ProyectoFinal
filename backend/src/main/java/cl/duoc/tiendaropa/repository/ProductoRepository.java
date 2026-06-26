package cl.duoc.tiendaropa.repository;

import cl.duoc.tiendaropa.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    List<Producto> findByCategoriaId(Integer categoriaId);
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
}
