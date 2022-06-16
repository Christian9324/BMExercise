package com.ddispim.ejercevalu.dao;

import com.ddispim.ejercevalu.models.Info;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Repository
@Transactional
public class InfoDaoImp implements InfoDao {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public Info getInfoUser(String nombre_comun) {
        Info info = entityManager.find(Info.class, nombre_comun);
        return info;
    }
}
