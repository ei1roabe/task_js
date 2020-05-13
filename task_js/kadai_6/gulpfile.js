// gulpプラグインの読み込み
const { src, dest, watch } = require('gulp');
// sassをコンパイルするプラグインの読み込み
const sass = require('gulp-sass');

// sassをコンパイル
const compileSass = () =>
    // .scssファイルを取得
    src('sass/*.scss')
        // sassのコンパイルを実行
        .pipe(
            // コンパイル後のcssを展開
            sass({
                outputStyle: 'expanded'
            })
        )
        // cssディレクトリに保存
        .pipe(dest('css'));

// 監視、変更があったら変換を行う
const watcheFiles = () => watch('sass/*.scss', compileSass);

exports.default = watcheFiles;