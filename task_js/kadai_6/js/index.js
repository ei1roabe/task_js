"use strict"
var canvas = document.getElementById('screen');
var ctx = canvas.getContext('2d');

// FPS定義
var FPS = 60;

// キーの状態を定義
var KEYS = new Array(256);
// キーの初期値
for (var k = 0; k < KEYS.length; k++) {
	KEYS[k] = false;
}

// 開始フラグ
var START_FLG = false;

// bgm, se
var vol  = document.getElementById('audio');
var vol2 = document.getElementById('move');
var vol3 = document.getElementById('shot');

// 自機のオブジェクトを作成
var player = new Object();
player.img = new Image();
player.img.src = 'image/rocket.png';
// 自機サイズ
var playerSize = 50;
// 自機初期位置
var initPlayerPosX = (canvas.width / 2) - (playerSize / 2);
var initPlayerPosY = canvas.height - playerSize;
// 自機のHP
var playerHp;

// 敵機の数
var ENEMIES = 5;
// 敵機のオブジェクトを作成
var enemy = new Object();
enemy.img = new Image();
enemy.img.src = 'image/ufo.png';
// 敵機サイズ
var enemySize = 30;
// 敵機のHP
var enemiesHpS = 10;  // 敵（小）
var enemiesHpM = 50;  // 敵（中）
var enemyBoss  = 500; // ボス

var enemyPosX = new Array(ENEMIES);
var enemyPosY = new Array(ENEMIES);

// ループ処理
function mainLoop() {
	// 開始時間を保持
	var startTime = new Date();

	// 自機の移動処理
	movePlayer();

	// 開始までは停止
	if (START_FLG) {
		// 敵機の移動処理
		moveEnemies();
	}

	// 描画
	renderDraw();

	// 経過時間と次のループまでの間隔
	var progressTime = (new Date()) - startTime;
	var interval = (1000 / FPS) - progressTime;
	if (interval > 0) {
		setTimeout(mainLoop, interval);
	} else {
		mainLoop();
	}
}

// 自機の移動処理
function movePlayer() {
	// 左に動く
	if(KEYS[37]) {
		if (+initPlayerPosX > 0) {
			initPlayerPosX -= 10;
		}
		vol2.play();
	// 上に動く
	} else if(KEYS[38]) {
		if (+initPlayerPosY > 0) {
			initPlayerPosY -= 10;
		}
		vol2.play();
	// 右に動く
	} else if (KEYS[39]) {
		if (+initPlayerPosX < (canvas.width - playerSize)) {
			initPlayerPosX += 10;
		}
		vol2.play();
	// 下に動く
	} else if (KEYS[40]) {
		if (+initPlayerPosY < (canvas.width - playerSize)) {
			initPlayerPosY += 10;
		}
		vol2.play();
	} else if (KEYS[32]) {
		vol3.play();
	}
}

// 敵機の移動処理（上から下へランダム）
function moveEnemies() {
	for (var e = 0; e < ENEMIES; e++) {
		enemyPosY[e] += 2;

		// 敵機が画面の外に出たら上に戻す
		if (enemyPosY[e] > canvas.height) {
			enemyPosY[e] = -enemy.img.height;
			// 位置をランダム
			enemyPosX[e] = Math.random() * canvas.width;
		}
	}
}

// キー押下時
window.onkeydown = function(e) {
	KEYS[e.keyCode] = true;
}

// キーが離れた時
window.onkeyup = function(e) {
	KEYS[e.keyCode] = false;
}

window.onload = function() {
	//ctx.fillRect(0, 0, 640, 640);

	// 自機の表示、位置、サイズ（img, x, y, 幅, 高さ）
	ctx.drawImage(player.img, initPlayerPosX, initPlayerPosY, playerSize, playerSize);
	// 敵機の表示、位置、サイズ（img, x, y, 幅, 高さ）
	for (var i = 0; i < ENEMIES; i++) {
		enemyPosX[i] = Math.random() * canvas.width;
		enemyPosY[i] = Math.random() * canvas.height / 4; // 初期位置は1/4以内に設置
	}

	// 描画と再描画
	mainLoop();
}

// 幕
var curtain = document.getElementById('curtain');
curtain.onclick = function() {
	this.classList.toggle('open');
	this.classList.toggle('close');

	START_FLG = true;
	//shot = true;
	renderDraw();
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

// 描画・再描画
function renderDraw() {
	// キャンバスをクリアする
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// 自機の新しい位置
	ctx.drawImage(player.img, initPlayerPosX, initPlayerPosY, playerSize, playerSize);
	// 敵機の位置
	for (var i = 0; i < ENEMIES; i++) {
		ctx.drawImage(enemy.img, enemyPosX[i], enemyPosY[i], enemySize, enemySize);
	}
}
