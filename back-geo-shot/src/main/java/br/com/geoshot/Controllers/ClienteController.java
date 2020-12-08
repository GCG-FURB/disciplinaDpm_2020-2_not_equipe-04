package br.com.geoshot.Controllers;

import br.com.geoshot.Domain.Cliente;
import br.com.geoshot.Services.Interfaces.IClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private IClienteService clienteService;

    @GetMapping("/listar")
    public List<Cliente> listarClientes() {
        return clienteService.listarClientes();
    }

    @GetMapping("/detalhar/{id}")
    public Optional<Cliente> detalharCliente(@PathVariable int id) {
        return clienteService.detalharCliente(id);
    }

    @PostMapping("/salvar")
    public Cliente salvarCliente(@RequestBody Cliente cliente) {
        return clienteService.salvarCliente(cliente);
    }
}
