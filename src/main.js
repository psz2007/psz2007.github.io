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
function checkValidDate(s) {
	let d = new Date(s);
	return !isNaN(d.getTime());
}
function buildMainPage() {
	let lst = {},
	dts = [];
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
		if (checkValidDate(i)) {
			dts.push({
				date: new Date(i),
				class: lst[i].dateColor,
				message: lst[i].subtitle
			});
		}
		let tmp = document.createElement("div");
		tmp.setAttribute("class", "ui four wide column");
		tmp.innerHTML =
			"<div class='ui card'>\
				<div class='content'>\
					<a class='header' href='?page=" + i + "'>" + i + "</a>\
				</div>\
				<div class='content'>\
					<div class='summary'>" + lst[i].subtitle + "</div>\
				</div>\
				<div class='floating ui teal label'>" + lst[i].category + "</div>\
			</div>";
		document.getElementById("doc-list").appendChild(tmp);
	}
	$('#inline_calendar').calendar({
		type: 'date',
		eventDates: dts
	});
}
