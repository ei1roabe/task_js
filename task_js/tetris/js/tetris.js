var fieldWidth = 300; // 幅
var fieldHeight = 600; // 高さ
var col = 10; // 列の数
var row = 20; // 行の数
var blockWidth = fieldWidth / col; // 1つのブロックの幅
var blockHeight = fieldHeight / row; // 1つのブロックの高さ
var canvas = document.getElementById('field');
var ctx = canvas.getContext('2d'); // canvasのおまじない
var current_block; // 移動中のブロック
var current_x = 3;
var current_y = 0;
var field = [];

for (var y = 0; y < row; y++) {
	field[y] = [];
	for (var x = 0; x < col; x++) {
		field[y][x] = 0;
	}
}

current_block = newBlocks();
renderFall();
setInterval(condition, 1500); // 1.5秒毎に繰り返す

// ブロックの落下
function renderFall() {
	ctx.clearRect(0, 0, fieldWidth, fieldHeight);
	ctx.strokeStyle = 'black';
	for (var y = 0; y < row; y++) {
		for (var x = 0; x < col; x++) {
			fillBlock(x, y, field[y][x]);
		}
	}
	for (var y = 0; y < 4; y++) {
		for (var x = 0; x < 4; x++) {
			fillBlock(current_x + x, current_y + y, current_block[y][x]);
		}
	}
}

function fillBlock(x, y, block_box) {
	if (block_box) {
		ctx.fillStyle = colors[block_box - 1];
		ctx.fillRect(x * blockWidth, y * blockHeight, blockWidth - 1, blockHeight - 1);
		ctx.strokeRect(x * blockWidth, y * blockHeight, blockWidth - 1, blockHeight - 1);
	}
}

// 条件で動き，テトリスを作って現在位置を初期位置に戻す
function condition() {
	if (coordinateMove(0, 1)) {
		current_y++;
	} else {
		fix();
		removeRow();
		current_block = newBlocks();
		current_x = 3;
		current_y = 0;
	}
	renderFall();
}

function fix() {
	for (var y = 0; y < 4; y++) {
		for (var x = 0; x < 4; x++) {
			if (current_block[y][x]) {
				field[current_y + y][current_x + x] = current_block[y][x];
			}
		}
	}
}

function coordinateMove(move_x, move_y, move_block) {
	var next_x = current_x + move_x; // 次に動こうとするx座標
	var next_y = current_y + move_y; // 次に動こうとするy座標
	var next_block = move_block || current_block;
	for (var y = 0; y < 4; y++) {
		for (var x = 0; x < 4; x++) {
			if (next_block[y][x]) {
				if (next_y + y >= row || next_x + x < 0 || next_x + x >= col || field[next_y + y][next_x + x]) {
					return false;
				}
			}
		}
	}
	return true;
}

// 下段、揃った行を削除
function removeRow() {
	for (var y = row - 1; y >= 0; y--) {
		var fill = true; // 全て埋まっているか
		for (var x = 0; x < col; x++) {
			if (field[y][x] == 0) {
				fill = false;
			}
		}
		if (fill) {
			for (var v = y - 1; v >= 0; v--) {
				for (var x = 0; x < col; x++) {
					field[v + 1][x] = field[v][x];
				}
			}
			y++;
		}
	}
}

// 操作　（move_xが-1だったら左、1だったら右、move_yが1だったら下）
document.body.onkeydown = function(e) {
	switch (e.keyCode) {
		case 37: // (「←」左)
			if (coordinateMove(-1, 0)) { // 左に動けるか
				current_x--;
			}
			break;
		case 39: // (「→」右)
			if (coordinateMove(1, 0)) { // 右に動けるか
				current_x++;
			}
			break;
		case 40: // (「↓」下)
			if (coordinateMove(0, 1)) { // 下に動けるか
				current_y++;
			}
			break;
		case 82: // (「r」回転)
			rotated = rotate(current_block);
			if (coordinateMove(0, 0, rotated)) {
				current_block = rotated;
			}
			break;
	}
	renderFall();
}
