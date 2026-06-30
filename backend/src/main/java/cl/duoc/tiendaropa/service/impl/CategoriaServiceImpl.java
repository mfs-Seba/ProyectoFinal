package cl.duoc.tiendaropa.service.impl;

import cl.duoc.tiendaropa.dto.in.CategoriaRequest;
import cl.duoc.tiendaropa.dto.out.CategoriaResponse;
import cl.duoc.tiendaropa.entity.Categoria;
import cl.duoc.tiendaropa.error.ConflictException;
import cl.duoc.tiendaropa.error.NotFoundException;
import cl.duoc.tiendaropa.repository.CategoriaRepository;
import cl.duoc.tiendaropa.service.CategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriaServiceImpl implements CategoriaService {

    private final CategoriaRepository categoriaRepository;

    @Override
    public List<CategoriaResponse> listar() {
        return categoriaRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Override
    public CategoriaResponse obtener(Integer id) {
        Categoria c = categoriaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Categoría no encontrada: " + id));
        return toResponse(c);
    }

    @Override
    @Transactional
    public CategoriaResponse crear(CategoriaRequest req) {
        if (categoriaRepository.existsByNombre(req.getNombre())) {
            throw new ConflictException("Ya existe una categoría con ese nombre");
        }
        Categoria c = Categoria.builder()
                .nombre(req.getNombre())
                .descripcion(req.getDescripcion())
                .build();
        return toResponse(categoriaRepository.save(c));
    }

    @Override
    @Transactional
    public CategoriaResponse actualizar(Integer id, CategoriaRequest req) {
        Categoria c = categoriaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Categoría no encontrada: " + id));
        c.setNombre(req.getNombre());
        c.setDescripcion(req.getDescripcion());
        return toResponse(categoriaRepository.save(c));
    }

    @Override
    @Transactional
    public void eliminar(Integer id) {
        if (!categoriaRepository.existsById(id)) {
            throw new NotFoundException("Categoría no encontrada: " + id);
        }
        categoriaRepository.deleteById(id);
    }

    private CategoriaResponse toResponse(Categoria c) {
        return CategoriaResponse.builder()
                .id(c.getId())
                .nombre(c.getNombre())
                .descripcion(c.getDescripcion())
                .build();
    }
}
