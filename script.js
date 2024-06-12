document.write(decodeURI("%3Cscript src='https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js' type='text/javascript'%3E%3C/script%3E"));

document.addEventListener('DOMContentLoaded', function(){
   var windowURL = window.location;
   console.log(windowURL);
   var windowHTML = (window.location.pathname).split('/').slice(-1)[0];
   console.log("Html:", windowHTML);
    
   if(windowHTML == "advertListing.html"){
      loadAdvertList();
   }else if(windowHTML == "advert.html"){
      loadAdvertView();
   }else if(windowHTML == "login.html"){
      var isNewLogin = true
      loadLoginView();
   }

   function loadAdvertList(){
      let userId = (window.location.search).split("=")[1];
      if(userId == null){
         alert("Please Login before");
         window.location.replace("/Inmobiliaria-IdealProp/login.html");      
      }else if(userId == ''){
         userId = 'de Vuelta!'
      }
      $(".LoginHeader").append('<i class="fa-solid fa-house"></i> Bienvenido '+userId);
         for (let i in advertList) {
            $("#listingContainer").append(`
            <div class="card">
               <div class="carrouselContainer">
                   <img class="carrouselPhoto" src=`+ advertList[i].photos[0].url+ ` alt="Property Picture">
               </div>

               <div class="cardContent">
                   <span class="advTypeText nunito-bold">`+ advertList[i].propertyType + ` en `+ advertList[i].operationType + `</span>
                   <span class="advLocText nunito-light">`+ advertList[i].location + `</span>
                   <div class="advInfoContainer">
                       <div>
                           <i class="fa fa-arrows-alt" aria-hidden="true"></i>
                           <span class="advSizeText nunito-default">`+ advertList[i].size + `</span>
                       </div>
                       <div>
                           <i class="fa fa-bed" aria-hidden="true"></i>
                           <span class="advSizeText nunito-default">`+ advertList[i].bedrooms + `</span>
                       </div>
                       <div>
                           <i class="fa fa-bath" aria-hidden="true"></i>
                           <span class="advSizeText nunito-default">`+ advertList[i].bathrooms + `</span>
                       </div>

                   </div>
                   <span class="advPriceText nunito-bold">`+ advertList[i].askingPrice + `</span>
                   <form id="advertForm-`+i+`" action="advert.html" method="get">
                   <input class="advertIdField" type="text" name="advertId" value="`+i+`"/>
                   <a id="sumbit-`+i+`" class="advButton nunito-default">Ver Mas</a>
                   </form>
               </div>
            </div>
         `);
         }
         $(".advButton").click(function() {
            let advertButtonId = $(this).attr('id').split("-")[1];
            let advertFormId = "#advertForm-" + advertButtonId;
            console.log(advertFormId);
            $(advertFormId).trigger("submit");
            console.log(advertButtonId);
         });

         function searchList(){
            let searchValue = $("#searchInput").val();
            for(let z in advertList){
               $("#advertForm-" + z).parent().parent().show();  
               if(searchValue == ''){
                  $("#advertForm-" + z).parent().parent().show();  
               }else{
                  if(!(advertList[z].location).toLowerCase().includes(searchValue.toLowerCase())){
                     $("#advertForm-" + z).parent().parent().hide();   
                  }
               }
            }
         }  
         $(".searchButton").click(() =>{
            searchList();
         });

         $(document).on('keypress',function(e) {
            if(e.which == 13) {
               searchList();
            }
        });
        

   }
    
   function loadAdvertView(){
      let advertId = (window.location.search).split("=")[1];
      console.log(advertId);
      let advert = advertList[advertId];
      console.log(advert);
      $(".bigImg").attr("src",advert.photos[0].url)
      $(".segImg").eq(0).attr("src",advert.photos[1].url)
      $(".segImg").eq(1).attr("src",advert.photos[2].url)

      $("#advTypeText").text(advert.propertyType + " en " + advert.operationType);
      $("#advLocText").text(advert.location);
      $("#advDescText").text(advert.description);
      $(".advInfoContainer").children().children("span").eq(0).text(advert.size);
      $(".advInfoContainer").children().children("span").eq(1).text(advert.bedrooms);
      $(".advInfoContainer").children().children("span").eq(2).text(advert.bathrooms);
      $("#advPriceText").text(advert.askingPrice);
   }

   function loadLoginView(){
      if(isNewLogin){
         $("#loginTitle").text("Crea tu cuenta");
         $("#loginStateLink").text("¿Ya tienes cuenta? Inicia sesión");
         $("#loginButton").text("Crear cuenta");

      }else if(!isNewLogin){
         $("#loginTitle").text("Iniciar sesión");
         $("#loginStateLink").text("Registarme");
         $("#loginButton").text("Iniciar sesión");
      }

      $("#loginStateLink").unbind('click').click(()=>{
         isNewLogin = !(isNewLogin != false);
         loadLoginView();
      });

      $("#LoginForm").unbind('sumbit').submit(function(e) {
         e.preventDefault();
         if ($("#email").val() != "" && $("#password").val() != ""){
            if(!isNewLogin){
               for(x of loginInfo){
                  if($("#email").val() == x.email && $("#password").val() == x.pass){
                     $("#infoText").text("Has sido Logueado Correctamente");
                     window.location.replace("/Inmobiliaria-IdealProp/advertListing.html?user="+x.email);      
                  }
               }
               $("#infoText").text("No se ha encontrado el mail/contraseña")
            }else if(isNewLogin){
               loginInfo.push({
                  "email" : $("#email").val(),
                  "pass"  :$("#password").val()
               });
               $("#infoText").text("Usuario creado correctamente");
               isNewLogin = false;
               $("#email").val("");
               $("#password").val("");
               loadLoginView();
            }
         }else{

            $("#infoText").text("Por favor rellene con datos el mail y la contraseña");

            $("#infoCard").fadeToggle(350);
            $("#infoCard").css('display', 'flex');
         }
      });
   }

});


let loginInfo = [
   {
      "email" : "admin@admin",
      "pass" : "admin1234"
   }
   ]

const advertList = {
    "1":{
       "operationType":"Alquiler",
       "propertyType":"Departamento",
       "description":"Dúplex de cuatro ambientes al frente con gran balcón terraza en doble altura y parrilla propia. Ingreso como si fuese una casa. Amplio y luminoso living comedor. Cocina con comedor diario . Toilette. Tres Dormitorios con placard (uno en suite),  dos baños completos . Cochera fija y cubierta. El Edificio cuenta con SUM equipado, piscina, solarium con terrazas parquizadas. En cuanto a la seguridad, tiene un sistema de portero visor, cámaras de control en el acceso y cerradura electrónica.",
       "photos":[
          {
             "order":1,
             "url":"https://cdn.mudafy.com/__sized__/properties/property_953745/2023-07-10_SCH0009_001-thumbnail-1920x1080-80.webp"
          },
          {
             "order":2,
             "url":"https://cdn.mudafy.com/__sized__/properties/property_953745/2023-07-10_SCH0009_011-thumbnail-1920x1080-80.webp"
          },
          {
             "order":3,
             "url":"https://cdn.mudafy.com/__sized__/properties/property_953745/2023-07-10_SCH0009_022-thumbnail-1920x1080-80.webp"
          }
       ],
       "size":"129m2",
       "bedrooms":4,
       "bathrooms":3,
       "askingPrice":"USD 435.000",
       "location":"Nuñez 1600, Nuñez, CABA"
    },
    "2":{
       "operationType":"Venta",
       "propertyType":"PH",
       "description":"Excelente propiedad en 3 plantas en venta con balcón y terraza en el corazón de Nuñez!!! \n Accedemos por escalera a la primer planta donde encontramos un amplio living comedor con la cocina integrada ,  un baño completo  que hace las veces de toilette y un balcón que la recorre de lado a lado. En la segunda planta se encuentran los 3 dormitorios (2 chicos sin placards) y un baño completo compartimentado. \n En la tercer planta nos encontramos con la espectacular terraza con vistas al verde de los árboles y a la ciudad, con una lindísima pérgola techada, y la parrilla con mesada, pileta para lavar y amplio espacio de guardado. También está el tercer baño que hoy se usa como lavadero y depósito. \n La propiedad cuenta con dos espacios guarda coches que se venden separados o pueden anexarse a la compra de la misma.",
       "photos":[
          {
             "order":1,
             "url":"https://cdn.mudafy.com/__sized__/properties/property_934318/2023-04-22_7828875054986260616632737737510016868542539438473_w0b63rV-thumbnail-500x500-80.webp"
          },
          {
             "order":2,
             "url":"https://cdn.mudafy.com/__sized__/properties/property_934318/2023-04-22_8563614605205193364675631834695077034625497375020_Vu71GGY-thumbnail-500x500-80.webp"
          },
          {
             "order":3,
             "url":"https://cdn.mudafy.com/__sized__/properties/property_934318/2023-04-22_8201753599153488654697010804615807022122802714689_ASSoeF1-thumbnail-1920x1080-80.webp"
          }
       ],
       "size":"140m2",
       "bedrooms":4,
       "bathrooms":2,
       "askingPrice":"USD 295.000",
       "location":"O higgins  Al 3900, Nuñez, CABA"
    },
    "3":{
       "operationType":"Alquiler",
       "propertyType":"Casa",
       "description":"Amplio living comedor en 'L' con ventanales amplios al frente y al contrafrente con vista al jardín. Cocina totalmente renovada con aberturas al frente y contrafrente, comedor diario y un amplio espacio de almacenamiento y área de trabajo. Jardín arbolado, cuenta con parrilla en desnivel, un entorno perfecto para disfrutar de momentos únicos con familiares y amigos.",
       "photos":[
          {
             "order":1,
             "url":"https://cdn.mudafy.com/__sized__/properties/property_1000431/2024-02-11_VDF0003_007-thumbnail-1280x720-80.webp"
          },
          {
             "order":2,
             "url":"https://cdn.mudafy.com/__sized__/properties/property_1000431/2024-02-11_VDF0003_001-thumbnail-1280x720-80.webp"
          },
          {
             "order":3,
             "url":"https://cdn.mudafy.com/__sized__/properties/property_1000431/2024-02-11_VDF0003_002-thumbnail-1280x720-80.webp"
          }
       ],
       "size":"205m2",
       "bedrooms":6,
       "bathrooms":4,
       "askingPrice":"USD 3.500",
       "location":"Esmeralda 2300, Vicente López, GBA"
    },
    "4":{
       "operationType":"Alquiler",
       "propertyType":"Casa",
       "description":"Excelente casa hecha a nuevo en el año 2003 con doble lote de frente. PB; Jardín adelante de 13 x 17 y otro jardín al fondo  (de 9 x 22 m) con pileta de material (de  5 x 9 m).Hall de entrada , (2 x 3,50), Toilette completo, Escritorio o PLAYROOM, (o 5to dormitorio) comunicado con el garage doble. A la izquierda de la entrada Living comedor con chimenea con salida al jardín de 9 x 4,80, amplia Cocina de 6,20 x 2,60 con salida al jardín más cocina comedor diario de 4,20 x 2,40, a continuación Patio con Quincho con parrilla.",
       "photos":[
          {
             "order":1,
             "url":"https://cdn.mudafy.com/__sized__/properties/property_670803/2023-03-19_6991127407259442693132272664313716377548433445770_tryMukh-thumbnail-500x500-80.webp"
          },
          {
             "order":2,
             "url":"https://cdn.mudafy.com/__sized__/properties/property_670803/2023-03-19_5137983054848426739605433149658521369778112990408_d261f3s-thumbnail-500x500-80.webp"
          },
          {
             "order":3,
             "url":"https://cdn.mudafy.com/__sized__/properties/property_670803/2023-03-19_2738700120516221521170729780962400718588869264693_1LHmeGJ-thumbnail-1280x720-80.webp"
          }
       ],
       "size":"180m2",
       "bedrooms":6,
       "bathrooms":3,
       "askingPrice":"USD 2.800",
       "location":"Vergara Al 1934, Florida, Vicente López, GBA"
    },
    "5":{
       "operationType":"Alquiler ",
       "propertyType":"Casa",
       "description":"ALQUILER TEMPORARIO (ENERO O FEBERO) *SE ALQUILA MES COMPLETO* EXCELENTE CASA QUINTA CENTRO DE QUILMES. DOBLE FRENTE. AMPLIO JARDIN CON PILETA. EVENTOS CON CAPACIDAD PARA 200 PERSONAS. CON COCINA INDUSTRIAL. CASA CON 3 HABITACIONES, LIVING COMEDOR, COCINA, AMPLIA TERRAZA Y BAñOS.",
       "photos":[
          {
             "order":1,
             "url":" https://static1.sosiva451.com/30417741/82ccc052-d506-4abc-8e78-f36cbb33836e_u_large.jpg"
          },
          {
             "order":2,
             "url":"https://static1.sosiva451.com/30417741/ac0176cb-d723-45fd-8551-c952917acbd1_u_large.jpg"
          },
          {
             "order":3,
             "url":"https://static1.sosiva451.com/30417741/6b8fd076-e6c4-4bb7-959c-3176ff1828d9_u_large.jpg"
          }
       ],
       "size":"870 m²",
       "bedrooms":4,
       "bathrooms":4,
       "askingPrice":"USD 2.000",
       "location":"Guido 300, Quilmes Centro, Quilmes"
    },
    "6":{
       "operationType":"Alquiler ",
       "propertyType":"Casa",
       "description":"Casa - Quilmes \n Barrancas de Guido - Barrio Privado \n. \nBarrio privado a 5 del centro de Quilmes \n. \n5 ambientes - 470m2 \n.\nEn Planta Baja cuenta con una sala de estar, toilette, comedor diario, cocina, lavadero, quincho con parrilla y baño, parque y piscina. Garage cubierto.\n.\nEn planta alta cuenta con 3 dormitorios, todos en suite con vestidor y terraza.\n.\nAmplió playroom en 2do piso\n.\nIncluye muebles\n.\nAire acondicionado split en cada ambiente\n.\nAlquiler todo incluido! (expensas, jardinero, etc)",
       "photos":[
          {
             "order":1,
             "url":" https://static1.sosiva451.com/18932351/f9bac3a2-f8ff-41d7-95d3-596220737c6c_u_large.jpg"
          },
          {
             "order":2,
             "url":"https://static1.sosiva451.com/18932351/5d592687-e3e7-4a2c-8294-6803452145eb_u_large.jpg"
          },
          {
             "order":3,
             "url":"https://static1.sosiva451.com/18932351/fc784812-aefe-4db7-b370-2350567b5f81_u_large.jpg"
          }
       ],
       "size":"470 m²",
       "bedrooms":3,
       "bathrooms":3,
       "askingPrice":"USD 3.000",
       "location":"Cevallos al 1000, Barrancas de Guido - Barrio Privado, Quilmes"
    },
    "7":{
       "operationType":"En venta",
       "propertyType":"Departamento",
       "description":"Este es un departamento totalmente reciclado a nuevo, con un estilo de muy buen gusto y calidad excepcional, que destaca por su luminosidad. Ubicado en el primer piso por escalera, este hermoso departamento de dos ambientes al frente cuenta con un balcón. Los gastos mensuales son mínimos. Sus características incluyen un amplio living comedor, una gran cocina americana con muebles espaciosos, un dormitorio con un amplio placard, un baño completo y un balcón al frente. Los servicios son totalmente eléctricos y cuenta con conexión para lavarropas. La ubicación es excelente, en Avda. Warnes al 200, entre Araoz y Julián Álvarez, con proximidad a Avda. R. S. Ortiz, Avda. Ángel Gallardo, el Parque Centenario, colectivos y la estación de subte línea B estación Malabia y estación Ángel Gallardo.",
       "photos":[
          {
             "order":1,
             "url":"https://cdn.mudafy.com/__sized__/properties/property_907011/2024-03-26_5668114022240333325399758975587964381550477387581_WtY8B8l-thumbnail-1280x720-80.webp"
          },
          {
             "order":2,
             "url":"https://cdn.mudafy.com/__sized__/properties/property_907011/2024-03-26_4033041102827176583511038040965258835335252195913_bDOHFsv-thumbnail-1280x720-80.webp"
          },
          {
             "order":3,
             "url":"https://cdn.mudafy.com/__sized__/properties/property_907011/2024-03-26_7508377430684470092926266567654392774107675405951_kL2uuug-thumbnail-1280x720-80.webp"
          }
       ],
       "size":"35 m²",
       "bedrooms":1,
       "bathrooms":1,
       "askingPrice":"USD 92.000",
       "location":"Av. Warnes al 200, Villa Crespo, CABA"
    },
    "8":{
       "operationType":"Alquiler",
       "propertyType":"PH",
       "description":"En Quilmes Centro de tres amb , con cochera sin expensas. Departamento en planta alta , cochera , baño , cocina ,lavadero , dos dormitorios , balcon.",
       "photos":[
          {
             "order":1,
             "url":" https://static1.sosiva451.com/16582551/21d7dc58-ca2a-4ecd-931f-28ab9bff4cb4_u_large.jpg"
          },
          {
             "order":2,
             "url":"https://static1.sosiva451.com/16582551/004c2810-394e-480d-adf1-d0c2d8e768c7_u_large.jpg"
          },
          {
             "order":3,
             "url":"https://static1.sosiva451.com/16582551/70b0e4f5-99e1-4fcf-ba0d-8cfacf9c49b1_u_large.jpg"
          }
       ],
       "size":"70 m²",
       "bedrooms":2,
       "bathrooms":1,
       "askingPrice":"$ 300.000",
       "location":"Avenida Hipólito Yrigoyen 900, Quilmes Centro, Quilmes"
    },
    "9":{
       "operationType":"En Venta",
       "propertyType":"Casa",
       "description":"Casa 4 ambientes con pileta en Barrio Altos de Podestá. Excelente Casa lote propio de162 m2 (9 x 18) en el Barrio Altos de Podestá. Superficie cubierta edificada aproximada de 130 m2 y descubierta de 32m2. La propiedad cuenta con porche de ingreso descubierto, amplio y luminoso living, cocina completamente amueblada con desayunador diario, comedor con sector de parrilla, lavadero independiente, baño principal, oficina/depósito familiar en 2 plantas, pileta climatizada con deck de madera, dormitorio principal con vestidor y baño en suite, segundo y tercer dormitorio con placard empotrado en pared con puertas corredizas y hall distribuidor.",
       "photos":[
          {
             "order":1,
             "url":"https://static1.sosiva451.com/0397638/5ba270f7-535e-4449-b36e-f46778c9dbaf_u_large.jpg"
          },
          {
             "order":2,
             "url":"https://static1.sosiva451.com/0397638/6785abae-865c-4784-b147-3ea9b59a273b_u_large.jpg"
          },
          {
             "order":3,
             "url":"https://static1.sosiva451.com/0397638/7f68152d-2bfa-460d-a6a7-fa8c49a33e18_u_large.jpg"
          }
       ],
       "size":"130 m² ",
       "bedrooms":3,
       "bathrooms":3,
       "askingPrice":"USD 168.000",
       "location":"Altos De Podesta, Pablo Podesta, Tres De Febrero"
    },
    "10":{
       "operationType":"Venta",
       "propertyType":"Casa",
       "description":"EXCELENTE CASA EN VENTA 3 AMBIENTES TOTALMENTE RECICLADA. PISOS PORCELANATO. UN DORMITORIO CON VESTIDOR (pequeño) Y EL OTRO DORMITORIO CON PLACARD. GALERIA CUBIERTA Y CON CERRAMIENTOS DE ALUMINIO. EXPENSAS $2.500.-",
       "photos":[
          {
             "order":1,
             "url":" https://static1.sosiva451.com/04747411/0be41211-6275-4e67-8097-732f7f5b5625_u_large.jpg\t"
          },
          {
             "order":2,
             "url":"https://static1.sosiva451.com/04747411/4dbc93e6-1038-4661-9334-f2ff57bac6a7_u_large.jpg"
          },
          {
             "order":3,
             "url":"https://static1.sosiva451.com/04747411/a6c1b5a1-0bc5-4a6a-90c8-1d5fd5bc9958_u_large.jpg"
          }
       ],
       "size":"162 m²",
       "bedrooms":2,
       "bathrooms":1,
       "askingPrice":"USD 108.000",
       "location":"Calle A 100, Pablo Podesta, Tres De Febrero, G.B.A. Zona Oeste"
    },
    "11":{
       "operationType":"En Venta",
       "propertyType":"PH",
       "description":"Excelente chalet de 6 ambientes en 2 plantas sobre lote de 10x30, Garage cubierto para 1 vehículo con acceso directo al interior del la casa, Amplio hall de entrada que distribuye a todos los ambientes de la planta baja. Living y comedor con doble circulación. Toilette de recepción. Gran cocina comedor con muebles completos, espacio de comedor diario y salida al jardín con piscina. Cuarto de planchado o habitación de servicio. Al fondo cuenta con amplio quincho con cocina y baño completo.",
       "photos":[
          {
             "order":1,
             "url":"https://cdn.mudafy.com/__sized__/properties/property_505811/2024-01-17_6158524329957456056126379726163373998238712115213_0QbDdTe-thumbnail-1280x720-80.webp"
          },
          {
             "order":2,
             "url":"https://cdn.mudafy.com/__sized__/properties/property_505811/2024-01-17_1083144652902895925348862784156737668624335199420_uZgIp8s-thumbnail-1280x720-80.webp"
          },
          {
             "order":3,
             "url":"https://cdn.mudafy.com/__sized__/properties/property_505811/2024-01-17_2804365479923961903083117766718604344569618021520_2c6KAWb-thumbnail-1280x720-80.webp"
          }
       ],
       "size":"249 m²",
       "bedrooms":4,
       "bathrooms":3,
       "askingPrice":"USD 278.000",
       "location":"Vieytes al 700, Vicente Lopez, GBA"
    },
    "12":{
       "operationType":"En Venta ",
       "propertyType":"Casa",
       "description":"Hermoso chalet muy moderno en Barrio Altos de Podesta. Posee escritura. Ingresamos por el living comedor, con la cocina semi incorporada con mueble bajo y alto mesada. 2 dormitorios con vestidor. Baño completo con vanitory y cuadro de ducha. Patio con hermosa pergola. Hermoso parque. Cochera cubierta para 2 autos.",
       "photos":[
          {
             "order":1,
             "url":" https://static1.sosiva451.com/15914801/6b968a02-688e-42b6-9ab7-c4effd792730_u_large.jpg"
          },
          {
             "order":2,
             "url":"https://static1.sosiva451.com/15914801/23232e5f-8556-41c4-abac-4beabe861c4d_u_large.jpg"
          },
          {
             "order":3,
             "url":"https://static1.sosiva451.com/15914801/870f7565-c4a6-4292-bcd7-aa0094472286_u_large.jpg"
          }
       ],
       "size":"150 m² ",
       "bedrooms":2,
       "bathrooms":1,
       "askingPrice":"USD 105.000",
       "location":"Avenida Marquez 2500, Pablo Podesta, Tres De Febrero, G.B.A. Zona Oeste"
    }
 }

