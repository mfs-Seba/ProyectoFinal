package cl.duoc.tiendaropa.service;

import cl.duoc.tiendaropa.dto.in.ProductoRequest;
import cl.duoc.tiendaropa.dto.out.ProductoResponse;

import java.util.List;

public interface ProductoService {
    List<ProductoResponse> listar();
    ProductoResponse obtener(Integer id);
    ProductoResponse crear(ProductoRequest request);
    ProductoResponse actualizar(Integer id, ProductoRequest request);
    void eliminar(Integer id);
    List<ProductoResponse> buscarPorNombre(String nombre);
}
