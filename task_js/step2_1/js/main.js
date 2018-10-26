window.onload = function (){
	var table = document.createElement('table');
	table.style.borderCollapse = 'collapse';

	for (var i = 1; i < 10; i++) {
		var tr = document.createElement('tr');
		for (var j = 1; j < 10; j++) {
			var td = document.createElement('td');
			var t_style = td.style;
			t_style.width = '30px';
			t_style.height = '30xp';
			t_style.textAlign = 'center';
			t_style.border = '1px solid';

			td.innerHTML = i * j;
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	document.body.appendChild(table);
}

