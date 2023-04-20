function readTextFile(file, ext, callback, isLocked = false) {
	let xhr = new XMLHttpRequest();
	xhr.overrideMimeType("application/" + ext);
	xhr.open("GET", file, isLocked);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			callback(xhr.responseText, xhr.status);
		}
	}
	xhr.send();
}
function buildPage() {
	let lst = {}, dts = [];
	readTextFile("src/list.json", "json", function (txt, sta) {
		try {
			if (sta === 200) {
				lst = JSON.parse(txt);
			} else {
				console.log(sta);
				throw "爬取文章列表失败。";
			}
		} catch (e) {
			alert(e);
		}
	});
	for (let i in lst) {
		dts.push({
			date: new Date(i),
			class: "inverted red"
		});
	}
	$('#inline_calendar').calendar({
		type: 'date',
		eventDates: dts
	});
}
