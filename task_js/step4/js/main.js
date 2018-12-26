// おみくじ種類
// 大吉・吉・中吉・凶・大凶
// くじを引くには200コイン必要

var money = 10000; // 手持ち
var price = 200; // くじを引く料金
var daikichi_flg = false; // 大吉
var daikyo_flg = false; // 大凶
$('.my-money').text(money);

if (money >= price) {
	omikuji();
} else {
	$('.btn-play').addClass('disable');
}

// おみくじを引く
function omikuji() {
	$('.btn-play').on('click', function(){
		$('.result-txt p').removeClass('rainbow').removeAttr('style');
		if (money < price) return;
		result();
	});
}

// 結果
function result() {
	var index = Math.floor(Math.random() * 100 + 1);
	var result_txt;
	var result_monry = money - price;

	if (index <= 16) {
		result_txt = '大吉';
		daikichi_flg = true;
	} else if (index >= 17 && index <= 52) {
		result_txt = '吉';
	} else if (index >= 53 && index <= 60) {
		result_txt = '中吉';
	} else if (index >= 61 && index <= 90 ) {
		result_txt = '凶';
	} else {
		result_txt = '大凶';
		daikyo_flg = true;
	}

	$('.result-txt p').text(result_txt);	
	$('.my-money').text(result_monry);

	money = result_monry;
	if (result_monry < price) {
		$('.btn-play').addClass('disable');
	}

	if (daikichi_flg || daikyo_flg) {
		omikujiAni();

		daikichi_flg = false;
		daikyo_flg = false;
	}
}

// 大吉・大凶アニメーション
function omikujiAni() {
	if (daikichi_flg) {
		$('.result-txt p').addClass('rainbow');
	} else if (daikyo_flg) {
		$('.result-txt p').css({opacity: 0, transform: 'rotate(-180deg)'}).animate({opacity: 0, }, 500, function(){
			$(this).animate({opacity: 1}, 1500);
		});
	}
}
