$(function() {
	$('body').append('<table id="table" border="1"></table>');

	var table = $("#table");
	for (var i = 1; i < 10; i++) {
		table.append("<tr class='row_" + i + "'></tr>");
		for (var j = 1; j < 10; j++) {
			$(".row_" + i).append("<td>" + (i * j) + "</td>");
			$('td').css({'width': '30px', 'height': '30px', 'text-align': 'center'});
			if (($('td') % 2) != 0) {
				$('td:odd').css({'background-color': '#555', 'color': '#fff',});
			}
		}
	}
});