// gulpfile.mjs
import gulp, { src, dest, watch, series, parallel } from "gulp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import gulpSass from "gulp-sass"; //SCSS → CSS 컴파일

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import * as sass from "sass";
import postcss from "gulp-postcss"; //CSS 후처리, 플러그인 적용
import autoprefixer from "autoprefixer"; //브라우저 벤더 프리픽스 자동 추가
import cssnano from "cssnano"; //CSS 최소화 (minify) SCSS → CSS 후 종합 최적화(PostCSS 필요)
import browserSyncLib from "browser-sync"; // 개발 서버를 띄우고 파일 변경 시 브라우저 자동 새로고침
import concat from "gulp-concat"; //여러 파일을 하나로 합침
import rename from "gulp-rename"; //파일 이름 변경 (예: style.css → style.min.css)
import terser from "gulp-terser"; //JS 압축/최적화
import includer from "gulp-file-include"; //Gulp 빌드 시 정적 HTML 조립
import prettier from "gulp-prettier"; //JS/CSS/HTML 코드 자동 포맷팅
import { deleteAsync } from "del";

const babel = await import("gulp-babel").then((mod) => mod.default || mod);
const CacheBuster = await import("gulp-cachebust").then(
  (mod) => mod.default || mod
);
const cachebust = new CacheBuster();

const browserSync = browserSyncLib.create();
const sassCompiler = gulpSass(sass);

// ------------------------------------
// Paths
// ------------------------------------
const paths = {
  build: "./dist/",
  scss: {
    // 진입점만 컴파일 (나머지는 @forward/@use로 포함)
    entry: [
      "./markup/assets/css/scss/common.scss",
      "./markup/assets/css/scss/style.scss",
    ],
    src: "./markup/assets/css/scss/**/*.scss",
    ignore: "!./markup/assets/css/scss/import",
    dest: "./dist/assets/css",
  },
  csscopy: {
    src: "./markup/assets/css/lib/**/*",
    dest: "./dist/assets/css/lib",
  },
  js: {
    src: "./markup/assets/js/**/*.js",
    ignore: "!./markup/assets/js/lib",
    dest: "./dist/assets/js",
  },
  jscopy: { src: "./markup/assets/js/lib/**/*", dest: "./dist/assets/js/lib" },
  img: {
    src: "./markup/assets/images/**/*.{png,jpg,jpeg,svg,gif}",
    base: "./markup/assets/images",
    dest: "./dist/assets/images",
  },
  fonts: { src: "./markup/assets/fonts/**/*", dest: "./dist/assets/fonts" },
  html: {
    src: "./markup/html/**/*.html",
    // ignore: "!./markup/html/_include",
    ignore: [
      "!./markup/html/_include/", // include 폴더 제외
      "!./markup/html/_sub/", // sub 폴더 제외
    ],
    dest: "./dist",
  },
  codingList: {
    src: "./markup/_coding_list/**/*",
    dest: "./dist/_coding_list",
    entry: "./markup/coding_list.html",
  },
};

// ------------------------------------
// Tasks
// ------------------------------------

// Clean dist
async function clean() {
  return deleteAsync([paths.build + "**/*"], { force: true });
}

// Fonts
function fonts() {
  return src(paths.fonts.src).pipe(dest(paths.fonts.dest));
}

// Images (Node fs.copyFileSync로 바이너리 그대로 복사 - 깨짐 방지)
const IMG_EXT = new Set([".png", ".jpg", ".jpeg", ".svg", ".gif"]);

function copyDirRecursive(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else if (IMG_EXT.has(path.extname(entry.name).toLowerCase())) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function images(done) {
  const srcDir = path.resolve(__dirname, "markup/assets/images");
  const destDir = path.resolve(__dirname, "dist/assets/images");
  copyDirRecursive(srcDir, destDir);
  done();
}

// SCSS → CSS (진입점 common.scss, style.scss 만 컴파일)
function scss() {
  return src(paths.scss.entry)
    .pipe(sassCompiler({ quietDeps: true }).on("error", sassCompiler.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

// CSS Library copy
function csscopy() {
  return src(paths.csscopy.src).pipe(dest(paths.csscopy.dest));
}

// JS
function scripts() {
  return src([paths.js.src, paths.js.ignore])
    .pipe(concat("common.js"))
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest(paths.js.dest))
    .pipe(browserSync.stream());
}

// JS Library copy
function jscopy() {
  return src(paths.jscopy.src).pipe(dest(paths.jscopy.dest));
}

// Coding list: _coding_list 폴더 복사
function codingListCopy() {
  return src(paths.codingList.src).pipe(dest(paths.codingList.dest));
}

// Coding list: markup/coding_list.html → dist/coding_list.html
function codingListPage() {
  return src(paths.codingList.entry).pipe(dest("./dist"));
}

// HTML SSI
function html() {
  return src([paths.html.src, ...paths.html.ignore]) // 배열로 합침
    .pipe(
      includer({
        prefix: "@@", // include 구문: @@include("header.html")
        basepath: "./markup/html", // ✅ 기준 경로를 html 폴더 전체로 설정
      })
    )
    .pipe(prettier())
    .pipe(dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// Cache bust
function cache() {
  return src(`${paths.html.dest}/**/*.html`)
    .pipe(cachebust.references())
    .pipe(dest(paths.html.dest));
}

// BrowserSync
function serve() {
  browserSync.init({
    server: {
      baseDir: paths.build,
      index: "coding_list.html",
      middleware: (req, res, next) => {
        if (req.url === "/favicon.ico") {
          res.statusCode = 204;
          res.end();
          return;
        }
        next();
      },
    },
    port: 3000,
  });
  watch(paths.scss.src, scss);
  watch(paths.csscopy.src, csscopy);
  watch(paths.js.src, scripts);
  watch(paths.jscopy.src, jscopy);
  watch(paths.img.src, images);
  watch(paths.fonts.src, fonts);
  watch(paths.html.src, html);
  watch(paths.codingList.src, series(codingListCopy, codingListPage));
  watch(paths.codingList.entry, codingListPage);
}

// ------------------------------------
// Series / Parallel Tasks
// ------------------------------------
const build = series(
  clean,
  parallel(fonts, images, scss, csscopy, scripts, jscopy, html, codingListCopy, codingListPage),
  cache
);

const dev = series(
  clean,
  parallel(fonts, images, scss, csscopy, scripts, jscopy, html, codingListCopy, codingListPage),
  parallel(serve)
);

export { build, dev, clean };
export default dev;
