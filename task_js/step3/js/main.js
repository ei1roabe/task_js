document.write("<script type='text/javascript' src='js/base.js'></script>");

var myCard = document.getElementById('my-table'); // 自分の手札
var yourCard =  document.getElementById('your-table'); // 相手の手札
var my_total_txt = document.getElementById('my_total');
var your_total_txt = document.getElementById('your_total');
var myTotal = 0; // 自分の手札の合計
var yourTotal = 0; // 相手の手札の合計
var result_txt = document.getElementById('result-txt'); // 結果を表示
var trumps = [];

// ヒット
$('.btn-hit').on('click', function() {
	var judge = new Judge();
	judge.hit();
}); 

// スタンド
$('.btn-stand').on('click', function() {
	var judge = new Judge();
	judge.stand();
});

// リセット
$('.btn-reset').on('click', function() {
	var judge = new Judge();
	judge.initialize();
});
