package com.ddispim.ejercevalu.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString @EqualsAndHashCode
public class RespMens {

    @Getter @Setter
    private String verificación;

    @Getter @Setter
    private String Fecha;

    @Getter @Setter
    private String FirmaD;
}
