package br.com.geoshot.Domain;

import org.springframework.data.geo.Point;

import javax.persistence.*;
import java.sql.Clob;

@Entity
@Table(name = "imagens")
public class Imagem implements Comparable<Imagem>{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String descricao;
    private byte[] imagem;
    @ManyToOne
    private Cliente fotografo;
    private Point coordenadas;
    @Transient
    private double distancia;

    public Imagem() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public byte[] getImagem() {
        return imagem;
    }

    public void setImagem(byte[] imagem) {
        this.imagem = imagem;
    }

    public Cliente getFotografo() {
        return fotografo;
    }

    public void setFotografo(Cliente fotografo) {
        this.fotografo = fotografo;
    }

    public Point getCoordenadas() {
        return coordenadas;
    }

    public void setCoordenadas(Point coordenadas) {
        this.coordenadas = coordenadas;
    }

    public double getDistancia() {
        return distancia;
    }

    public void setDistancia(double distancia) {
        this.distancia = distancia;
    }

    @Override
    public int compareTo(Imagem i) {
        if (getDistancia() == i.getDistancia()) {
            return 0;
        }
        if (getDistancia() > i.getDistancia()) {
            return 1;
        }
        return -1;
    }
}
