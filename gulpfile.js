"use strict"
const output = 'build'
const entry = 'src'

const { src, dest } = require('gulp')
const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const del = require('del')
const scss = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify-es').default
const babel = require('gulp-babel')
const webp = require('gulp-webp')
const webpHTML = require('gulp-webp-html')
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')


const path = {
    build: {
        html: output + '/',
        css: output + '/css/',
        js: output + '/js/',
        images: output + '/images/',
        fonts: output + '/fonts/',
    },
    src: {
        html: entry + '/*.html',
        css: entry + '/scss/style.scss',
        js: entry + '/js/*.js',
        images: entry + '/images/**' + '/*.+(png|jpg|gif|ico|svg|webp)',
        fonts: entry + '/fonts/**',
    },
    watch: {
        html: entry + '/**/*.html',
        css: entry + '/scss/**/*.scss',
        js: entry + '/js/**/*.js',
        images: entry + '/images/**' + '/*.+(png|jpg|gif|ico|svg|webp)',
    },
    clear: './' + output + '/',
}

const updateBrowser = () => {
    browserSync.init({
        server: {
            baseDir: './' + output + '/',
        },
        port: 3000,
        notify: false,
    })
}

const html = () => {
    return src(path.src.html)
        .pipe(webpHTML())
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream())
}

const watchFile = () => {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css) 
    gulp.watch([path.src.js], js)   
    gulp.watch([path.src.images], img)  
    gulp.watch([path.src.fonts], fonts) 
}

const clearBuild = () => del(path.clear)

const css = () => {
    return src(path.src.css)
    .pipe(scss({
        outputStyle: 'expanded', 
    }).on('error', scss.logError))
    .pipe(autoprefixer({
        cascade: true, 
        overrideBrowserslist: ['last 5 versions']
    }))
    .pipe(dest(path.build.css))
    .pipe(cleanCss())
    .pipe(rename({
        extname: '.min.css'
    }))
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream())
}

const js = () => {
    return src(path.src.js)
        .pipe(dest(path.build.js))
        .pipe(
            babel({
            presets: ['@babel/env']
        }))
        .pipe(
            uglify()
            )
        .pipe(
            rename({
            extname: '.min.js'
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream())
}

const img = () => {
    return src(path.src.images)
        .pipe(
            webp({
                quality: 70,
                webpClass: '.webp',
                noWebpClass: '.no-webp'
            })
        )
        .pipe(dest(path.build.images))
        .pipe(src(path.src.images))
        .pipe(dest(path.build.images))
        .pipe(browserSync.stream())
}

const fonts = () => {
    src(path.src.fonts)
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.stream())
}


const build = gulp.series(clearBuild, gulp.parallel(js, css, html, img, fonts))
const watch = gulp.parallel(build, updateBrowser, watchFile)

exports.fonts = fonts
exports.img = img
exports.js = js
exports.css = css
exports.html = html
exports.build = build
exports.watch = watch
exports.default = watch
