// // Call the dataTables jQuery plugin
// $(document).ready(function() {
// //
// });

document.getElementById('cargarCert')
.addEventListener('change', leerArchivo, false);

function leerArchivo(e) {
    let archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    let lector = new FileReader();
    lector.onload = function(e) {
      let contenido = e.target.result;
      let info = contenido.split(contenido[36]);
      argumentos = info.map((argumento) => {
        return argumento
      })
      let info2 = argumentos[6].split("U");
      argumentos2  = info2.map((argumento) => {
        return argumento
      })
      let info3 = argumentos2[5].split("]");
      argumentos3  = info3.map((argumento) => {
        return argumento
      })
      let auxArgum = argumentos3[0];
      let auxS = [];
      for(let i = 4; i < auxArgum.length - 8; i++){
        auxS += auxArgum[i];
      }
      
      document.getElementById('textoCertificado').value = auxS;
      //mostrarContenido(auxS)
    };
    lector.readAsText(archivo);

  }

  // function mostrarContenido(contenido) {
  //   var elemento = document.getElementById('contenido-archivo');
  //   elemento.innerHTML = contenido;
  // }

  document.getElementById('cargarLlave')
.addEventListener('change', leerLlave, false);

var privKeyData = {}

function leerLlave(e) {
    let contenido = {}
    let archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    let lector = new FileReader();
    lector.readAsText(archivo);
    lector.onload = function(e) {
      contenido = e.target.result;
      // let info = contenido.split(contenido[36]);
      b64T2 = lector.result;
      // let b64Lines = lector.result;
      // let b64T1 = b64Lines.replace('-----END RSA PRIVATE KEY-----', '');
      // b64T2 = b64T1.replace('-----BEGIN RSA PRIVATE KEY-----', '');
      // mostrarContenido(b64T2)
    };
    document.getElementById('textoPrivada').value = "Llave cargada";
  }

function SignPrivKey(){
  let sign = new JSEncrypt();
  sign.setPrivateKey(privKeyData);
  var signature = sign.sign(document.getElementById('textoPassword').value , CryptoJS.SHA256, "sha256");
  console.log("Envio exitoso")
}


function enviarInfoServer(){

  if(document.getElementById('textoCertificado').value == '' || document.getElementById('textoCertificado').value == 'Nombre Común del Certificado'){
    alert("Falta ingresar el certificado");
    return;
  }
  if(document.getElementById('textoPrivada').value == '' || document.getElementById('textoPrivada').value == 'Llave privada'){
    alert("Falta ingresar la Llave");
    return;
  }
  if(document.getElementById('textoPassword').value == '' || document.getElementById('textoPassword').value == 'Contraseña'){
    alert("Falta rellenar el campo de contraseña");
    return;
  }
  if(document.getElementById('textoCaracter').value == '' || document.getElementById('textoCaracter').value == 'Caracteres'){
    alert("Falta rellenar el campo de carcater");
    return;
  }

  SignPrivKey()

}

  // function mostrarContenido(contenido) {
  //   var elemento = document.getElementById('contenido-archivo');
  //   elemento.innerHTML = contenido;
  // }

// 

//  function clave1(){
  //   // funcion para importar claves
  //   var encoder = new TextEncoder('utf-8');
  //   var dataPart = "hello,World";
  
  //   // Algorithm Object
  //   var algorithmKeyGen = {
  //       name: "RSASSA-PKCS1-v1_5",
  //       // RsaHashedKeyGenParams
  //       modulusLength: 2048,
  //       publicExponent: new Uint8Array([0x01, 0x00, 0x01]),  // Equivalent to 65537
  //       hash: {
  //           name: "SHA-256"
  //       }
  //   };
  
  //   var algorithmSign = {
  //       name: "RSASSA-PKCS1-v1_5"
  //   };
  
  //   window.crypto.subtle.generateKey(algorithmKeyGen, false, ["sign"]).then(
  //       function(key) {
            
  
  //           return window.crypto.subtle.sign(algorithmSign.name, key.privateKey, encoder.encode(dataPart));
  //       },
  //       console.error.bind(console, "Unable to generate a key")
  //       ).then(
  //           console.log.bind(console, "The signature is: "),
  //           console.error.bind(console, "Unable to sign")
  //   );
  
  // }
  
  // function clave2(){
  //   window.crypto.subtle.importKey(
  //     "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
  //     {   //this is an example jwk key, other key types are Uint8Array objects
  //         kty: "RSA",
  //         e: "AQAB",
  //         n: b64T2,
  //         alg: "RS256",
  //         ext: true,
  //     },
  //     {   //these are the algorithm options
  //         name: "RSASSA-PKCS1-v1_5",
  //         hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
  //     },
  //     false, //whether the key is extractable (i.e. can be used in exportKey)
  //     ["verify"] //"verify" for public key import, "sign" for private key imports
  // )
  // .then(function(publicKey){
  //     //returns a publicKey (or privateKey if you are importing a private key)
  //     console.log(publicKey);
  // })
  // .catch(function(err){
  //     console.error(err);
  // });
  
  // }

async function registrarUsuario(){
    let datosUsuario = {};
    datosUsuario.nombre= document.getElementById('textoNombre').value;
    datosUsuario.apellido= document.getElementById('textoApellido').value;
    datosUsuario.email= document.getElementById('textoEmail').value;
    datosUsuario.password= document.getElementById('textoPassword').value;

    let repetir = document.getElementById('textoRepetirPassword').value;

    if(repetir != datosUsuario.password){
        alert("Las contraseñas no coinciden");
        return;
    }

    const request = await fetch('api/usuario', {
       method: 'POST',
       headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
    });
    //const usuarios = await request.json();
}




