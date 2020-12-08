package br.com.geoshot.Services.Interfaces;

import br.com.geoshot.Domain.Cliente;
import br.com.geoshot.Domain.Imagem;

import java.util.List;
import java.util.Optional;

public interface IImagemService {
    List<Imagem> listarImagens();
    Optional<Imagem> detalharImagem(int id);
    Imagem salvarImagem(Imagem imagem);
    List<Imagem> listarImagensFotografo(Cliente fotografo);
}
