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
var vol3 = document.getElementById('shoot');

// 自機の画像
var img_player;
// 自機サイズ
var player_size = 50;
// 自機初期位置
var init_player_pos_x = (canvas.width / 2) - (player_size / 2);
var init_player_pos_y = canvas.height - player_size;
// 自機のHP
var player_hp;
// 弾の数を定義
var BULLETS = 5;
// 自機の弾の画像
var img_player_bullet;
var player_bullets_x = new Array(BULLETS);
var player_bullets_y = new Array(BULLETS);
var player_bullets_hp = new Array(BULLETS);

// 敵機の数
var ENEMIES = 20;
// 敵機の画像
var img_enemy;
// 敵機サイズ
var enemy_size = 30;
// 敵機のHP
var enemies_hp1 = new Array(ENEMIES);

var enemy_pos_x = new Array(ENEMIES);
var enemy_pos_y = new Array(ENEMIES);

// 敵機を倒した数
var killed = 0;

// 当たり判定と弾のインターバル
var SHOOT_INTERVAL = 20;
var STAR_INTERVAL = 20;
var player_shoot_interval = 0;
var player_star_interval = 0;

// 当たり判定
function judg(pos_x1, pos_y1, obj1, pos_x2, pos_y2, obj2) {
	var center_x1, center_y1, center_x2, center_y2, radius1, radius2, d;
	// 中心座標の取得
	center_x1 = pos_x1 + obj1.width / 2;
	center_y1 = pos_y1 + obj1.height / 2;
	center_x2 = pos_x2 + obj2.width / 2;
	center_y2 = pos_y2 + obj2.height / 2;

	// 半径の計算
	radius1 = (obj1.width + obj1.height) / 5;
	radius2 = (obj2.width + obj2.height) / 5;

	// 中心座標同士の距離測定
	d = Math.sqrt(Math.pow(center_x1 - center_x2, 2) + Math.pow(center_y1 - center_y2, 2));

	// 当たっているか判定
	if (radius1 + radius2 > d) {
		return true;
	} else {
		return false;
	}
}

// ループ処理
function mainLoop() {
	// 開始時間を保持
	var startTime = new Date();

	// 自機の移動処理
	movePlayer();
	movePlayerBullets();

	// 敵機の移動処理
	moveEnemies();

	// 自機と敵機の当たり判定
	if (player_hp > 0 && player_star_interval === 0) {
		for (var e = 0; e < ENEMIES; e++) {
			if (enemies_hp1[e] > 0) {
				if (judg(init_player_pos_x, init_player_pos_y, img_player, enemy_pos_x[e], enemy_pos_y[e], img_enemy)) {
					player_hp -= 1;
					enemies_hp1[e] -= 1;

					if (enemies_hp1[e] === 0) {
						killed++;
					}

					player_star_interval = STAR_INTERVAL;
				}
			}
		}
	}

	if(player_star_interval > 0) {
		player_star_interval--;
	}

	if (player_hp > 0) {
		for (var e = 0; e < ENEMIES; e++) {
			// 敵機が死んでる場合はスルー
			if (enemies_hp1[e] <= 0) {
				continue;
			}
			for (var j = 0; j < BULLETS; j++) {
				if (player_bullets_hp[j] <= 0) {
					continue;
				}
				if (judg(player_bullets_x[j],
						player_bullets_y[j],
						img_player,
						enemy_pos_x[e], enemy_pos_y[e],
						img_enemy)) {
							player_bullets_hp[j] -= 1;
							enemies_hp1[e] -= 1;
				}
				if (enemies_hp1[e] === 0) {
					killed++;
				}
			}
		}
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
	if (player_hp <= 0) {
		return;
	}
	// 左に動く
	if(KEYS[37]) {
		if (+init_player_pos_x > 0) {
			init_player_pos_x -= 5;
		}
		vol2.play();
	// 上に動く
	} else if(KEYS[38]) {
		if (+init_player_pos_y > 0) {
			init_player_pos_y -= 5;
		}
		vol2.play();
	// 右に動く
	} else if (KEYS[39]) {
		if (+init_player_pos_x < (canvas.width - player_size)) {
			init_player_pos_x += 5;
		}
		vol2.play();
	// 下に動く
	} else if (KEYS[40]) {
		if (+init_player_pos_y < (canvas.width - player_size)) {
			init_player_pos_y += 5;
		}
		vol2.play();
	} else if (KEYS[32] && player_shoot_interval === 0) {
		for (var i = 0; i < BULLETS; i++) {
			if (player_bullets_hp[i] === 0) {
				player_bullets_x[i] = init_player_pos_x;
				player_bullets_y[i] = init_player_pos_y;

				player_bullets_hp[i] = 1;

				player_shoot_interval = SHOOT_INTERVAL;
				break;
			}
		}
		vol3.play();
	}

	if (player_shoot_interval > 0) {
		player_shoot_interval--;
	}
}

// 敵機の移動処理（上から下へランダム）
function moveEnemies() {
	for (var e = 0; e < ENEMIES; e++) {
		if (enemies_hp1[e] <= 0) {
			continue;
		}

		enemy_pos_y[e] += 5;

		// 敵機が画面の外に出たら上に戻す
		if (enemy_pos_y[e] > canvas.height) {
			enemy_pos_y[e] = -img_enemy.height;
			// 位置をランダム
			enemy_pos_x[e] = Math.random() * canvas.width;
		}
	}
}

function movePlayerBullets() {
	for (var i = 0; i < BULLETS; i++) {
		if (player_bullets_hp[i] <= 0) {
			continue;
		}

		player_bullets_y[i] += -6;

		if (player_bullets_y[i] < img_player.height) {
			player_bullets_hp[i] = 0;
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
	// 画像の取得
    img_player = document.getElementById('player');
    img_player_bullet = document.getElementById('player_bullet');
    img_enemy = document.getElementById('enemy');

	// 自機の表示、位置、サイズ（img, x, y, 幅, 高さ）
	ctx.drawImage(img_player, init_player_pos_x, init_player_pos_y, player_size, player_size);
	player_hp = 10;
	for (var i = 0; i < BULLETS; i++) {
		player_bullets_x[i] = 0;
		player_bullets_y[i] = 0;
		player_bullets_hp[i] = 0;
	}

	// 敵機の表示、位置、サイズ（img, x, y, 幅, 高さ）
	for (var e = 0; e < ENEMIES; e++) {
		enemy_pos_x[e] = Math.random() * canvas.width;
		enemy_pos_y[e] = Math.random() * canvas.height;
		enemies_hp1[e] = 5;
	}

	// 描画と再描画
	//mainLoop();
}

// 幕
var curtain = document.getElementById('curtain');
curtain.onclick = function() {
	this.classList.toggle('open');
	this.classList.toggle('close');

	START_FLG = true;
	if (START_FLG) {
		mainLoop();
	}
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

// 再描画
function renderDraw() {
	// キャンバスをクリアする
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// 自機の位置
	if (player_hp > 0) {
		// 敵機と当たりダメージを受けたら、一瞬透過
		ctx.save();
		if(player_star_interval % 2 !== 0) {
            // 半透明に描画する
            ctx.globalAlpha = 0.5;
        }
		ctx.drawImage(img_player, init_player_pos_x, init_player_pos_y, player_size, player_size);
		ctx.restore();
	}

	// 弾の位置
	for (var i = 0; i < BULLETS; i++) {
		if (player_bullets_hp[i] > 0) {
			ctx.drawImage(img_player_bullet, player_bullets_x[i], player_bullets_y[i], 16, 16);
		}
	}

	// 敵機の位置
	for (var e = 0; e < ENEMIES; e++) {
		if (enemies_hp1[e] > 0) {
			ctx.drawImage(img_enemy, enemy_pos_x[e], enemy_pos_y[e], enemy_size, enemy_size);
		}
	}

	// コンテキストの状態を保持
	ctx.save();
	// ゲージ（外）
	ctx.fillStyle = '#fff';
	ctx.fillRect(10, canvas.height - 10, 10 * 5, 5);
	// ゲージ（中）
	ctx.fillStyle = '#f00';
	ctx.fillRect(10, canvas.height - 10, player_hp * 5, 5);

	var text = '倒した敵の数' + killed;
	var width = ctx.measureText(text).width;
	ctx.fillStyle = '#fff';
	ctx.fillText(text,
		canvas.width - 10 - width,
		canvas.height - 10
	);

	// ゲームオーバー
	if (player_hp <= 0) {
		// 全体のマスク
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0;

		ctx.font = '30px serif';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#f00';
        text = 'GAME OVER';
        width = ctx.measureText(text).width;
		ctx.fillText(text,
			(canvas.width - width) / 2,
			canvas.height / 2
		);
	} else if (killed > ENEMIES) {
		// 全体のマスク
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0;

		ctx.font = '30px serif';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#f00';
        text = 'GAME CLEAE!   ';
        width = ctx.measureText(text).width;
		ctx.fillText(text,
			(canvas.width - width) / 2,
			canvas.height / 2
		);
	}

	// コンテキストの状態を復元
	ctx.restore();
}
