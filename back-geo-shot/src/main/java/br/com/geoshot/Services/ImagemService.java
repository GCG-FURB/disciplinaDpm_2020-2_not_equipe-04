package br.com.geoshot.Services;

import br.com.geoshot.Domain.Cliente;
import br.com.geoshot.Domain.Imagem;
import br.com.geoshot.Repositories.ImagemRepository;
import br.com.geoshot.Services.Interfaces.IImagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImagemService implements IImagemService {

    @Autowired
    private ImagemRepository imagemRepository;

    @Override
    public List<Imagem> listarImagens() {
        return (List<Imagem>) imagemRepository.findAll();
    }

    @Override
    public Optional<Imagem> detalharImagem(int id) {
        return imagemRepository.findById(id);
    }

    @Override
    public Imagem salvarImagem(Imagem imagem) {
        return imagemRepository.save(imagem);
    }

    @Override
    public List<Imagem> listarImagensFotografo(Cliente fotografo) {
        return (List<Imagem>) imagemRepository.findAllByFotografo(fotografo);
    }

}
