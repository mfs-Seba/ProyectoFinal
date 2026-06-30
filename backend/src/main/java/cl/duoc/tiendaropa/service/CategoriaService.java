package cl.duoc.tiendaropa.service;

import cl.duoc.tiendaropa.dto.in.CategoriaRequest;
import cl.duoc.tiendaropa.dto.out.CategoriaResponse;

import java.util.List;

public interface CategoriaService {
    List<CategoriaResponse> listar();
    CategoriaResponse obtener(Integer id);
    CategoriaResponse crear(CategoriaRequest request);
    CategoriaResponse actualizar(Integer id, CategoriaRequest request);
    void eliminar(Integer id);
}
