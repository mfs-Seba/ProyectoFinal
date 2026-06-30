package cl.duoc.tiendaropa.service.impl;

import cl.duoc.tiendaropa.dto.in.ProductoRequest;
import cl.duoc.tiendaropa.dto.out.ProductoResponse;
import cl.duoc.tiendaropa.entity.Categoria;
import cl.duoc.tiendaropa.entity.Producto;
import cl.duoc.tiendaropa.error.NotFoundException;
import cl.duoc.tiendaropa.repository.CategoriaRepository;
import cl.duoc.tiendaropa.repository.ProductoRepository;
import cl.duoc.tiendaropa.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ProductoResponse> listar() {
        return productoRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProductoResponse obtener(Integer id) {
        Producto p = productoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Producto no encontrado: " + id));
        return toResponse(p);
    }

    @Override
    @Transactional
    public ProductoResponse crear(ProductoRequest req) {
        Categoria cat = categoriaRepository.findById(req.getCategoriaId())
                .orElseThrow(() -> new NotFoundException("Categoría no encontrada: " + req.getCategoriaId()));

        Producto p = Producto.builder()
                .nombre(req.getNombre())
                .descripcion(req.getDescripcion())
                .precio(req.getPrecio())
                .stock(req.getStock())
                .talla(req.getTalla())
                .color(req.getColor())
                .imagenUrl(req.getImagenUrl())
                .categoria(cat)
                .build();
        return toResponse(productoRepository.save(p));
    }

    @Override
    @Transactional
    public ProductoResponse actualizar(Integer id, ProductoRequest req) {
        Producto p = productoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Producto no encontrado: " + id));
        Categoria cat = categoriaRepository.findById(req.getCategoriaId())
                .orElseThrow(() -> new NotFoundException("Categoría no encontrada: " + req.getCategoriaId()));

        p.setNombre(req.getNombre());
        p.setDescripcion(req.getDescripcion());
        p.setPrecio(req.getPrecio());
        p.setStock(req.getStock());
        p.setTalla(req.getTalla());
        p.setColor(req.getColor());
        p.setImagenUrl(req.getImagenUrl());
        p.setCategoria(cat);

        return toResponse(productoRepository.save(p));
    }

    @Override
    @Transactional
    public void eliminar(Integer id) {
        if (!productoRepository.existsById(id)) {
            throw new NotFoundException("Producto no encontrado: " + id);
        }
        productoRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductoResponse> buscarPorNombre(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre)
                .stream().map(this::toResponse).toList();
    }

    private ProductoResponse toResponse(Producto p) {
        return ProductoResponse.builder()
                .id(p.getId())
                .nombre(p.getNombre())
                .descripcion(p.getDescripcion())
                .precio(p.getPrecio())
                .stock(p.getStock())
                .talla(p.getTalla())
                .color(p.getColor())
                .imagenUrl(p.getImagenUrl())
                .categoriaId(p.getCategoria().getId())
                .categoriaNombre(p.getCategoria().getNombre())
                .build();
    }
}
