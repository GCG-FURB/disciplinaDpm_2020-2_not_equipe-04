package br.com.geoshot.Repositories;

import br.com.geoshot.Domain.Cliente;
import br.com.geoshot.Domain.Imagem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImagemRepository extends CrudRepository<Imagem, Integer> {
    List<Imagem> findAllByFotografo(Cliente fotografo);
}
