document.addEventListener('DOMContentLoaded',function(){
    inicalizarApp();
});
  

function inicalizarApp(){
   crearGaleria();
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    for(let i=1; i<=12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML=`
        <source srcset="dist/img/thumb/${i}.avif" type="image/avif" />
        <source srcset="dist/img/thumb/${i}" type="image/webp" />
        <img loading="lazy" width="200" height="300" src="dist/img/thumb/${i}.jpg" alt="Imagen galeria"/>
        `;

        // para dar un evento con callback para mostrar la imagen mas grande
        // callback es una funcion que se ejecuta cuando se da click en la imagen
        imagen.onclick = function(){
           mostrarImagen(i);
        }

    //   Esto es para mostrar la imagen en el navegador o html
      galeria.appendChild(imagen);

    }
    
}

// funcion para hacer grande una imagen al dar click
function mostrarImagen(id){
   
        const imagen = document.createElement('picture');
        imagen.innerHTML=`
        <source srcset="dist/img/grande/${id}.avif" type="image/avif" />
        <source srcset="dist/img/grande/${id}" type="image/webp" />
        <img loading="lazy" width="200" height="300" src="dist/img/grande/${id}.jpg" alt="Imagen galeria"/>
        `;
        // crea el overlay para mostrar la imagen
        const overlay =document.createElement('DIV');
        overlay.appendChild(imagen);
        overlay.classList.add('overlay');

        // funcion para cerrar el modal sin topar el boton
        //callback
        overlay.onclick = function(){
            const body= document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();
        }


        // para cerrar la imagen al dar click en ella
        // boton para cerrar el modal
        const cerrarImagen = document.createElement('P');
        cerrarImagen.textContent='X';
        overlay.appendChild(cerrarImagen);
        cerrarImagen.classList.add('btn-cerrar');
        
        // funcion para cerrar el modal con callback
        cerrarImagen.onclick = function(){
            const body= document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();
           
        }


          // Añadirlo al html 
        // Para mostrar la imagen en el navegador
        const body= document.querySelector('body');
        body.appendChild(overlay);

        // Para que no se pueda hacer scroll en la pagina
        body.classList.add('fijar-body');




}



// esto hice yo para poder cerrar y dar scroll a la pagina
// if(overlay){
//     overlay.remove();
//    }else{
//     body.classList.add('body-scroll');
//    }