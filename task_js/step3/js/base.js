class Base {
	// カードを引く
	hit() {
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
		var myTable = $('<td>');
		var myHand = num;
		myCard.append(myTable);
		myTable.append(myHand);

		switch(num) {
			case 1:
				if ((+myTotal + 11) <= 21) {
					myTotal += 11;
				} else {
					myTotal += 1;
				};
				myTable.addClass('ace');
				break;
			case 11:
				myTotal += 10;
				myTable.addClass('jack');
				break;
			case 12:
				myTotal += 10;
				myTable.addClass('queen');
				break;
			case 13:
				myTotal += 10;
				myTable.addClass('king');
				break;
			default:
				myTotal += num;
				break;
		};

		if (+myTotal !== 0) {
			$('.btn-stand').removeClass('disable');
		}
	}
	// 勝負する
	stand() {
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
			yourCard.append(yourTable);
			yourTable.append(yourHand);

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

			my_total_txt.html(myTotal);
			your_total_txt.html(yourTotal);

			if (myTotal <= 21 && myTotal > yourTotal) {
				result_txt.html('あなたの勝ち');
				result_txt.addClass('win');
			} else if (myTotal <= 21 && yourTotal > 21) {
				result_txt.html('あなたの勝ち');
				result_txt.addClass('win');
			} else if (myTotal <= 21 && myTotal === yourTotal) {
				result_txt.html('引き分け');
				result_txt.removeClass('win lose');
			} else if (myTotal > 21 && yourTotal > 21){
				result_txt.html('引き分け');
				result_txt.removeClass('win lose');
			} else {
				result_txt.html('あなたの負け');
				result_txt.addClass('lose');
			};
		};
	}
	// リセット（初期化）
	initialize() {
		trumps = [];
		my_total_txt.html(' - ');
		your_total_txt.html(' - ');
		result_txt.html('-----');
		myTotal = 0;
		yourTotal = 0;
		result_txt.removeClass('win lose');
		$('#my-table, #your-table').empty();
		$('.btn-stand').addClass('disable');
	}
}
