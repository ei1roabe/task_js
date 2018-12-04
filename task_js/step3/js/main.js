var myCard = document.getElementById('my-table'); // 自分の手札
var yourCard =  document.getElementById('your-table'); // 相手の手札
var my_total_txt = document.getElementById('my_total');
var your_total_txt = document.getElementById('your_total');
var myTotal = 0; // 自分の手札の合計
var yourTotal = 0; // 相手の手札の合計
var result_txt = document.getElementById('result-txt'); // 結果を表示

// ヒット
$('.btn-hit').on('click', function() {
	if (+myTotal >= 21) {
		return;
	}
	var trumps = [];
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j <= 13; j++) {
			trumps.push(j);
		}
	}

	var num = trumps[Math.floor(Math.random() * trumps.length)];
	var myTable = document.createElement('td');
	var myHand = document.createTextNode(num);
	myCard.appendChild(myTable);
	myTable.appendChild(myHand);

	switch(num) {
		case 1:
			if ((+myTotal + 11) <= 21) {
				myTotal += 11;
			} else {
				myTotal += 1;
			};
			myTable.classList.add('ace');
			break;
		case 11:
			myTotal += 10;
			myTable.classList.add('jack');
			break;
		case 12:
			myTotal += 10;
			myTable.classList.add('queen');
			break;
		case 13:
			myTotal += 10;
			myTable.classList.add('king');
			break;
		default:
			myTotal += num;
			break;
	};

	if (+myTotal !== 0) {
		$('.btn-stand').removeClass('disable');
	}
}); 

// スタンド
$('.btn-stand').on('click', function() {
	if (+myTotal === 0) {
		return;
	}

	var trumps = [];
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j <= 13; j++) {
			trumps.push(j);
		}
	}
	while (yourTotal <= 16) {
		var num = trumps[Math.floor(Math.random() * trumps.length)];
		var yourTable = document.createElement('td'); 
		var yourHand = document.createTextNode(num);
		yourCard.appendChild(yourTable);
		yourTable.appendChild(yourHand);

		switch(num) {
			case 1:
				if ((yourTotal + 11) <= 21) {
					yourTotal += 11;
				} else {
					yourTotal += 1;
				};
				break;
			case 11:
			case 12:
			case 13:
				yourTotal += 10;
				break;
			default:
				yourTotal += num;
				break;
		};

		my_total_txt.innerHTML = myTotal;
		your_total_txt.innerHTML = yourTotal;

		if (myTotal <= 21 && myTotal > yourTotal) {
			result_txt.innerHTML = 'あなたの勝ち';
			result_txt.classList.add('win');
		} else if (myTotal <= 21 && yourTotal > 21) {
			result_txt.innerHTML = 'あなたの勝ち';
			result_txt.classList.add('win');
		} else if (myTotal <= 21 && myTotal === yourTotal) {
			result_txt.innerHTML = '引き分け';
			result_txt.classList.remove('win', 'lose');
		} else if (myTotal > 21 && yourTotal > 21){
			result_txt.innerHTML = '引き分け';
			result_txt.classList.remove('win', 'lose');
		} else {
			result_txt.innerHTML = 'あなたの負け';
			result_txt.classList.add('lose');
		};
	};
});

// リセット
$('.btn-reset').on('click', function() {
	trumps = [];
	my_total_txt.innerHTML = ' - ';
	your_total_txt.innerHTML = ' - ';
	result_txt.innerHTML = '-----'
	myTotal = 0;
	yourTotal = 0;
	result_txt.classList.remove('win', 'lose');
	$('#my-table, #your-table').empty();
	$('.btn-stand').addClass('disable');
});
