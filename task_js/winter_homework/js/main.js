var answer = 0;
var num = '0';
var key = '';
var kigo = '';

// 計算
function calc_num(btn) {
	if (!isNaN(btn)) {
		if (!isNaN(key)) {
			if (num === '0') {
				num = '' + btn;
			} else {
				num += '' + btn;
			}
		} else {
			num = '' + btn;
		}
		$('#output').html(num);
	} else {
		if (!isNaN(key)) {
			if (kigo === '') {
				answer = num;
			} else {
				answer = eval(answer + kigo + num);
			}
			num = '0';
			$('#output').html(answer);
		}
		kigo = btn;
	}
	key = btn;
}

// クリア
function calc_clear() {
	if (key === '' || key === '=') {
		answer = 0;
		key = '';
	}
	num = '0';
	kigo = key;
	$('#output').html(answer);
}

// ピリオド
function calc_period() {
	if (num.indexOf('.') < 0) num = '' + num + '.';
	key = 0;
	$('#output').html(num);
}

// イコール
function calc_equal() {
	if (key === '=') return;
		
	if (kigo === '') { 
		answer = num;
	} else {
		answer = eval(answer + kigo + num);
		key = '=';
	}
	
	num = '0';
	kigo = key;
	$('#output').html(answer);
}