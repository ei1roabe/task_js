var blocks = [
	[
		[1, 1, 1, 1],
		[0, 0, 0, 0] // ブロックI
	],
	[
		[0, 1, 1, 0],
		[0, 1, 1, 0] // ブロックO
	],
	[
		[0, 1, 1, 0],
		[1, 1, 0, 0] // ブロックS
	],
	[
		[1, 1, 0, 0],
		[0, 1, 1, 0] // ブロックZ
	],
	[
		[1, 0, 0, 0],
		[1, 1, 1, 0] // ブロックJ
	],
	[
		[0, 0, 1, 0],
		[1, 1, 1, 0] // ブロックZ
	],
	[
		[0, 1, 0, 0],
		[1, 1, 1, 0] // ブロックT
	]
];

// ブロックの色
var colors = ['cyan', 'yellow', 'green', 'red', 'blue', 'orange', 'magenta'];

function newBlocks() {
	var id = Math.floor(Math.random() * blocks.length);
	var block = [];
	for (var y = 0; y < 4; y++) {
		block[y] = [];
		for (var x = 0; x < 4; x++) {
			block[y][x] = 0;
			if (blocks[id][y]) {
				if (blocks[id][y][x]) {
					block[y][x] = id + 1;
				}
			}
		}
	}
	return block;
}

// ブロックの回転
function rotate(block) {
	var rotated = [];
	for (var y = 0; y < 4; ++y) {
		rotated[y] = [];
		for (var x = 0; x < 4; ++x) {
			rotated[y][x] = block[x][- y + 3];
		}
	}
	return rotated;
}