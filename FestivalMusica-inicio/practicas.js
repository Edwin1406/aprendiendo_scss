document.querySelector('DOMContentLoader', function (){
    iniciarAplicacion();
});


function iniciarAplicacion(){
    CrearGaleria();
}







function CrearGaleria(){
    const galeria = document.querySelector('.imagen');
    for (let i =1 ; i <=12; i++){
        const imagen = document.createElement('picture')
        imagen.innerHTML=`
        <source srcset="dist/img/thumb/${i}.avif" type="image/avif"/>
        <source srcset="dist/img/thumb/${i}.webp" type="image/webp" />
        `;
        imagen.onclick=function(){
            mostrarImagen(i);
        }
       
    }
}