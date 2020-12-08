package br.com.geoshot.Controllers;

import br.com.geoshot.Domain.Cliente;
import br.com.geoshot.Domain.Imagem;
import br.com.geoshot.MathUtils;
import br.com.geoshot.Services.Interfaces.IImagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/imagem")
public class ImagemController {

    @Autowired
    private IImagemService imagemService;

    @GetMapping("/listar/{latitude}/{longitude}")
    public List<Imagem> listarImagens(@PathVariable String latitude, @PathVariable String longitude) {

        List<Imagem> imagens = imagemService.listarImagens();
        imagens.forEach(imagem -> {
            imagem.setDistancia(MathUtils.distance(imagem.getCoordenadas().getX(), imagem.getCoordenadas().getY(), Double.parseDouble(latitude), Double.parseDouble(longitude)));
        });

        Collections.sort(imagens);

        return imagens;
    }

    @GetMapping("/listar/{idFotografo}")
    public List<Imagem> listarImagens(@PathVariable int idFotografo) {
        Cliente fotografo = new Cliente();
        fotografo.setId(idFotografo);
        return imagemService.listarImagensFotografo(fotografo);
    }

    @GetMapping("/detalhar/{id}")
    public Optional<Imagem> detalharImagem(@PathVariable int id) {
        return imagemService.detalharImagem(id);
    }

    @PostMapping("/salvar")
    public Imagem salvarImagem(@RequestBody Imagem imagem) {
        return imagemService.salvarImagem(imagem);
    }

}
