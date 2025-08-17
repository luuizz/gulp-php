import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import fs from 'fs';
import uglify from 'gulp-uglify';
import { spawn } from 'child_process';

const sass = gulpSass(dartSass);

const paths = {
  scss: 'scss/*.scss',
  cssLibs: 'css/lib/*.css',
  jsLibs: 'js/lib/*.js',
  jsScripts: 'js/scripts/*.js',
  php: ['*.php', '**/*.php'],
};

// Verifica se pasta contém arquivos
function arquivosExistem(path) {
  try {
    const arquivos = fs.readdirSync(path);
    return arquivos.length > 0;
  } catch {
    return false;
  }
}

// Compilar Sass
function compilaSass() {
  if (!arquivosExistem('scss')) return Promise.resolve();
  return gulp
    .src('scss/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false,
      }),
    )
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}
gulp.task('sass', compilaSass);

// Concatenar arquivos CSS
function pluginsCSS() {
  if (!arquivosExistem('css/lib')) return Promise.resolve();
  return gulp
    .src('css/lib/*.css')
    .pipe(concat('plugins.css'))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}
gulp.task('plugincss', pluginsCSS);

// Concatenar e transpilar scripts JS
function gulpJs() {
  if (!arquivosExistem('js/scripts')) return Promise.resolve();
  return gulp
    .src('js/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}
gulp.task('alljs', gulpJs);

// Concatenar JS externos
function pluginsJs() {
  if (!arquivosExistem('js/lib')) return Promise.resolve();
  return gulp
    .src(paths.jsLibs)
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}
gulp.task('pluginjs', pluginsJs);

// Inicia servidor PHP e BrowserSync
function phpServer(cb) {
  const php = spawn('php', ['-S', 'localhost:8000'], { stdio: 'inherit' });
  process.on('exit', () => php.kill());
  cb();
}

function browser() {
  browserSync.init({
    proxy: 'http://localhost:8000',
    open: true, // abre navegador automaticamente
    notify: false,
  });
}

gulp.task('server', gulp.series(phpServer, browser));

// Watch
function watch() {
  gulp.watch('scss/*.scss', compilaSass);
  gulp.watch(paths.cssLibs, pluginsCSS);
  gulp.watch(paths.php).on('change', browserSync.reload);
  gulp.watch(paths.jsScripts, gulpJs);
  gulp.watch(paths.jsLibs, pluginsJs);
}
gulp.task('watch', watch);

// Default
gulp.task('default', gulp.parallel('watch', 'server', 'sass', 'plugincss', 'alljs', 'pluginjs'));
