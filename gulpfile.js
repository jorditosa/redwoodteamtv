const { src, dest, watch, series } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

//Funcitons
function css( done ) {
    src('src/scss/app.scss')
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( sourcemaps.write('.') )//se guarda junto al Build
        .pipe( dest('build/css') )

    done();
}


function imagenes() {
    return src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') )

}


function versionWebp () {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( webp( opciones ) )
        .pipe( dest( 'build/img') )
}


function dev() {
    watch( 'src/scss/**/*.scss', css );
    watch( 'src/img/**/*', imagenes);
}

//workflow

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;

exports.default = series ( imagenes, versionWebp, css, dev );

