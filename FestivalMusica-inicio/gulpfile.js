const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
// para mejorar el performance del css
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps'); // para que se vea en el navegador el codigo original

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Javascript mejorar el codigo es comprimrlo
const terser = require('gulp-terser-js');

function javascript(done){

    src('src/js/**/*.js')
        // .pipe( sourcemaps.init() )
        // mejorar el codigo de javascript terser
        .pipe( terser() )
        // .pipe( sourcemaps.write('.') )
        .pipe( dest('dist/js') )
    done();

}



function css( done ) {
    src('src/scss/**/*.scss') // Identificar el archivo .SCSS a compilar
        .pipe( sourcemaps.init() )
        .pipe( plumber())
        .pipe( sass() ) // Compilarlo
        .pipe( postcss([ autoprefixer(), cssnano() ]) ) // Pasarle el resultado por postcss
        .pipe( sourcemaps.write('.') ) // para que se guarde en la misma carpeta
        .pipe( dest('dist/css') ) // Almacenarla en el disco duro
    done();
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('dist/img') )
    done();
}

function versionWebp( done ) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('dist/img') )
    done();
}

function versionAvif( done ) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('dist/img') )
    done();
}


function dev( done ) {
    // para que se ejecute cada vez que se modifique un archivo
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

function tarea (done) {
    console.log('Desde la primera tarea');
    done();
}
 
exports.tarea = tarea;

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif,javascript, dev) ;