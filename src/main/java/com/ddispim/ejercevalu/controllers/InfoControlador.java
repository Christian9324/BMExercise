package com.ddispim.ejercevalu.controllers;

import com.ddispim.ejercevalu.dao.InfoDao;
import com.ddispim.ejercevalu.models.Info;
import com.ddispim.ejercevalu.models.InfoMens;
import com.ddispim.ejercevalu.models.RespMens;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Calendar;

/**
 * Este es el archivo que hara de controlador para las url´s del sistema
 *
 * @author Christian Rodríguez
 */

@RestController
public class InfoControlador {

    @Autowired
    private InfoDao infoDao;

    @RequestMapping(value = "api/info", method = RequestMethod.POST)
    public RespMens getInfoDB(@RequestBody InfoMens infoMens){



        Info info = infoDao.getInfoUser(infoMens.getComun_name());

        String publickey = info.getCertificado();

        boolean verificado = false;

        byte[] bytesFirma = Base64.getDecoder().decode(infoMens.getFirma());

        PublicKey publicKey1;

        try {
            String aux1 = publickey.replace("-----BEGIN PUBLIC KEY-----\n", "");
            //System.out.println(publickey.replace("\n-----END PUBLIC KEY-----", ""));

            byte[] publicBytes = Base64.getDecoder().decode(publickey.replace("\n-----END PUBLIC KEY-----", ""));
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(publicBytes);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            publicKey1 = keyFactory.generatePublic(keySpec);

            Signature firma = Signature.getInstance("RSA");
            firma.initVerify(publicKey1);
            firma.update(bytesFirma);


            try {
                verificado = firma.verify(bytesFirma);
            } catch (SignatureException se) {
                verificado = false;
            }

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (InvalidKeySpecException e) {
            throw new RuntimeException(e);
        } catch (InvalidKeyException e) {
            throw new RuntimeException(e);
        } catch (SignatureException e) {
            throw new RuntimeException(e);
        }


        RespMens respMens = new RespMens();
        respMens.setFecha(new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(Calendar.getInstance().getTime()));
        respMens.setVerificación(String.valueOf(verificado));
        String cipherText = getEncrypted("hi this is a string", publickey.replace("\n-----END PUBLIC KEY-----", ""));
        respMens.setFirmaD(cipherText);

        return respMens;
    }

    public static String getEncrypted(String data, String Key) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidKeySpecException, IllegalBlockSizeException, BadPaddingException {
        Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
        PublicKey publicKey = KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(Base64.getDecoder().decode(Key.getBytes())));
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        byte[] encryptedbytes = cipher.doFinal(data.getBytes());
        return new String(Base64.getEncoder().encode(encryptedbytes));
    }
}
