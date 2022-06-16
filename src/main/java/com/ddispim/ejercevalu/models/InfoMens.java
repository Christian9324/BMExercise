package com.ddispim.ejercevalu.models;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString @EqualsAndHashCode
public class InfoMens {

    @Getter @Setter
    private String comun_name;

    @Getter @Setter
    private String cadena;

    @Getter @Setter
    private String firma;
}
