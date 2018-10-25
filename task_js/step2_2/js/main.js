$(function() {
	var table = $('<table border="1">').appendTo('body');

	var row, col;
	for (row = 1; row < 10; row++) {
		var tr = $('<tr>').appendTo(table);
		for (col = 1; col < 10; col++) {
			var td = $('<td>').appendTo(tr);
			td.text(row * col).appendTo(tr);
			if ((td % 2) != 0) {
				$('td:odd').css({'background-color': '#555', 'color': '#fff'});
			}
		}
	}
});