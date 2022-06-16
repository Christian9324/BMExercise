package com.ddispim.ejercevalu.models;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

//anotacion para ir a la tabla de postgres
@Entity
@Table(name = "certificado_operador")
@ToString
@EqualsAndHashCode
public class Info {

//    anotacion para decirle como se llama la columna del campo en la BD
//    a la que se tiene referencia
//    @Getter y @Setter son anotaciones para quitar los getters y setters de las clases
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id")
    private long id;

    @Getter @Setter @Column(name = "nombre_comun")
    private String nombre_comun;

    @Getter @Setter @Column(name = "certificado")
    private String certificado;
}
