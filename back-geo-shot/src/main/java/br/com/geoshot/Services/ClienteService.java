package br.com.geoshot.Services;

import br.com.geoshot.Domain.Cliente;
import br.com.geoshot.Repositories.ClienteRepository;
import br.com.geoshot.Services.Interfaces.IClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService implements IClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    public List<Cliente> listarClientes() {
        return (List<Cliente>) clienteRepository.findAll();
    }

    @Override
    public Optional<Cliente> detalharCliente(int id) {
        return clienteRepository.findById(id);
    }

    @Override
    public Cliente salvarCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }
}
