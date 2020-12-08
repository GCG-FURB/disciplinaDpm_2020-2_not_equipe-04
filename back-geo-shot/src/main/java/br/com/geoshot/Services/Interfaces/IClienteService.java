package br.com.geoshot.Services.Interfaces;

import br.com.geoshot.Domain.Cliente;

import java.util.List;
import java.util.Optional;

public interface IClienteService {
    List<Cliente> listarClientes();
    Optional<Cliente> detalharCliente(int id);
    Cliente salvarCliente(Cliente cliente);
}
