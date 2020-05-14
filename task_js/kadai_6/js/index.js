var canvas = document.getElementById('screen');
var ctx = canvas.getContext('2d'); // コンテキスト取得
ctx.fillStyle = BG_COLOR;

var START_FLG = false;
var CHARA_SHOT_MAX_COUNT = 10; // 弾の数
var BG_COLOR = 'black'; // デフォルト
var SHOT_COLOR = 'red'; // 弾の色
var ENEMY1 = 10; // 敵の数
var ENEMY1_SHOT_COLOR = 'blue'; // 敵の攻撃色
var ENEMY2_SHOT_COLOR = 'yellow'; // 敵の攻撃色
var ENEMY_BOSS_SHOT_COLOR = 'purple'; // BOSSの攻撃色

// ロケットのオブジェクトを作成
var rocket = new Object();
rocket.img = new Image();
rocket.img.src = 'image/rocket.png';
rocketSize = 50;
// ロケット初期位置
rocketPosX = canvas.width / 2 - 25;
rocketPosY = canvas.height - 50;
// UFOのオブジェクトを作成
var ufo = new Object();
ufo.img = new Image();
ufo.img.src = 'image/ufo.png';
ufoSize = 80;

var vol  = document.getElementById('audio');
var vol2 = document.getElementById('move');
var vol3 = document.getElementById('shot');

// canvasのサイズ
moveField = 640;

window.onload = function() {
	// 描画
	draw();
	renderStart();
	enemy();
	enemyChara();
}

function draw() {
	// 塗りつぶし
	ctx.fillRect(0, 0, 640, 640);
	// 画面表示
	ctx.drawImage(rocket.img, rocketPosX, rocketPosY, rocketSize, rocketSize);
}

function enemy() {
	var Dot = function() {
		this.size = Math.floor( Math.random() * 6 ) + ufoSize;
		this.speed = this.size / ufoSize;
		this.pos = {
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height
		};
		var rot = Math.random() * 360;
		var angle = rot * Math.PI / 180;
	}

	// 画面表示
	ctx.drawImage(ufo.img, 0, 0, ufoSize, ufoSize);
}

function enemyChara() {
	var charaShot = new Array(CHARA_SHOT_MAX_COUNT);
	for (i =0; i < CHARA_SHOT_MAX_COUNT; i++) {
		charaShot[i] = new CharacterShot();
	}
}

// スタートするまで操作できない
function renderStart() {
	if (START_FLG) {
		//キー操作イベントの設定
		addEventListener('keydown', keydownfunc);
	}
}

// 幕
var curtain = document.getElementById('curtain');
curtain.onclick = function() {
	this.classList.toggle('open');
	this.classList.toggle('close');

	START_FLG = true;
	shot = true;
	renderStart();
}

// 再生、一時停止
var volume = document.getElementById('volume');
volume.onclick = function() {
	this.classList.toggle('on');
	this.classList.toggle('off');

	if (this.classList.contains('on')) {
		vol.play();
	} else {
		vol.pause();
	}
}

function shot() {
	if (shot) {
		for (var i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
			if (!charaShot[i].alive) {
				charaShot[i].set(chara.position, 3, 5);

				// ループを抜ける
				break;
			}
		}
		shot = false;
	}
}

// キー操作
function keydownfunc (e) {
	if (+e.keyCode === 32) {
		vol3.play();
	} else {
		vol2.play();
	}
	switch (e.keyCode) {
		case 37: // (「←」左)
			if (+rocketPosX > 0) { // 左に動く
				rocketPosX -= 10;
			}
			break;
		case 38: // (「↑」上)
			if (+rocketPosY > 0) { // 上に動く
				rocketPosY -= 10;
			}
			break;
		case 39: // (「→」右)
			if (+rocketPosX < (moveField - rocketSize)) { // 右に動く
				rocketPosX += 10;
			}
			break;
		case 40: // (「↓」下)
			if (+rocketPosY < (moveField - rocketSize)) { // 下に動く
				rocketPosY += 10;
			}
			break;
		case 32: // スペース
			//shot();
			break;
	}
	draw();
}
