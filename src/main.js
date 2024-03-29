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
	let lst = {}, dts = [], p = [];
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
				class: lst[i].color,
				message: lst[i].subtitle
			});
			p.push({
				id: i,
				val: "d" + Number(new Date(i))
			});
		} else {
			p.push({
				id: i,
				val: "p" + i
			});
		}
	}
	p.sort();
	for (let ii in p) {
		let tmp = document.createElement("div"), i = p[ii].id;
		tmp.setAttribute("class", "ui four wide column");
		tmp.innerHTML =
			"<div class='ui card'>\
				<div class='content'>\
					<a class='header' href='?page=" + i + "'>" + i + "</a>\
				</div>\
				<div class='content'>\
					<div class='summary'>" + lst[i].subtitle + "</div>\
				</div>\
				<div class='floating ui " + lst[i].color + " label'>" + lst[i].category + "</div>\
			</div>";
		document.getElementById("doc-list").appendChild(tmp);
	}
	$('#inline_calendar').calendar({
		type: 'date',
		eventDates: dts
	});
}

function runmd() {
	"use strict";
	let n;
	function t(e, n) {
		const t = window.document.createElement("script");
		t.src = e,
			t.onload = n,
			window.document.head.appendChild(t)
	}
	const r = {},
		a = {},
		m = (r.setDefaultOptions = function () {
			a.renderOnLoad = !0,
				a.useMathJax = !0,
				a.protectMath = !0,
				a.style = "viewer",
				a.onRenderPage = void 0,
				a.markdownURL = "https://cdnjs.cloudflare.com/ajax/libs/marked/4.3.0/marked.min.js",
				a.MathJaxURL = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.min.js"
		},
			r.setOption = function (e, n) {
				a[e] = n
			}, r.tokenType = {
				MARK: 0,
				MASK: 1
			},
			r.tokenLiteral = {
				MASK: "::MASK::"
			}, {
			plain: [
				"body {",
				"  color: #333;",
				"  line-height: 1.5;",
				"  font-size: 17px",
				"}",
				"main {", " width: 70em; max-width: 70em;",
				"  margin-left: auto;",
				"  margin-right: auto;",
				"}",
				"h1, h2, h3, h4, h5, h6, h7 {",
				"  margin: 1em 0 0.5em 0;",
				"  line-height: 1.2;", "}",
				"h1 {",
				"  text-align: center;",
				"}",
				"img {",
				"  max-width: 100%;",
				"}",
				"pre, code, samp, kbd {",
				"  color: #333;",
				"  font-family: Menlo,Monaco,Consolas,\"Courier New\",monospace;",
				"  font-size: 17px",
				"  border:10px",
				"}",
				"pre, blockquote {",
				"  background: #eee;",
				"  padding: 0.5em;",
				"}",
				"pre {",
				"   display: block;",
				"   padding: 8px;",
				"   margin: 0 0 10px;",
				"   font-size: 17px;",
				"   line-height: 1.42857143;",
				"   word-break: break-all;",
				"   word-wrap: break-word;",
				"   color: #333;",
				"   background-color: #f5f5f5;",
				"   border: 1px solid #ccc;",
				"   border-radius: 3px;",
				"   overflow:auto",
				"}",
				"blockquote {",
				"  border-left: medium solid #ccc;",
				"  margin: 1em 0;",
				"}",
				"blockquote :first-child {",
				"  margin-top: 0;", "}",
				"blockquote :last-child {",
				"  margin-bottom: 0;", "}",
				"table {",
				"  border-collapse: collapse;",
				"}",
				"th, td {",
				"  border: thin solid #999;",
				"  padding: 0.3em 0.4em;",
				"  text-align: left;",
				"}",
				"p {",
				"  font-size: 17px",
				"}",
				"ul {",
				"  font-size: 100%",
				"}"
			].join("\n"),
			viewer: [
				"@media screen and (min-width: 40em) {",
				"  body {",
				"    background: #f5f5f5;",
				"  }",
				"  main {",
				"    background: #fff;",
				"    padding: 5em 6em;",
				"    margin: 1em auto;",
				"    box-shadow: 0.4em 0.4em 0.4em #222;",
				"  }",
				"}"
			].join("\n"),
			none: ""
		});
	m.viewer = m.plain + m.viewer;
	r.tokenize = function (e) {
		var n = [
			"\\\\begin{(.*?)}([\\s\\S]*?)\\\\end{\\1}",
			"\\\\\\[[\\s\\S]*?\\\\\\]",
			"\\\\\\([\\s\\S]*?\\\\\\)",
			"\\\\\\$",
			"\\$\\$(?:[^\\\\]|\\\\.)*?\\$\\$",
			"\\$(?:[^$\\\\]|\\\\.)+?\\$",
			r.tokenLiteral.MASK
		].join("|");
		const t = new RegExp(n, "g");
		let o,
			d;
		const i = [];
		let a = 0;
		for (; null !== (o = t.exec(e));)
			o.index > a && (d = e.substring(a, o.index),
				i.push([r.tokenType.MARK, d])),
				void 0 !== o[1] && o[1].startsWith("md") ?
					i.push([r.tokenType.MARK, o[2]]) :
					i.push([r.tokenType.MASK, o[0]]), a = t.lastIndex;
		return d = e.substring(a),
			e.length > a && i.push([r.tokenType.MARK, d]),
			i
	},
		r.mask = function (e) {
			const n = [],
				t = [];
			var o,
				d;
			let i;
			for (i = 0; i < e.length; i++)
				o = e[i][0], d = e[i][1],
					o === r.tokenType.MARK ?
						n.push(d) :
						(n.push(r.tokenLiteral.MASK), t.push(d));
			return {
				text: n.join(""),
				tokenValues: t
			}
		},
		r.unmask = function (e, n) {
			var t = new RegExp(r.tokenLiteral.MASK, "g");
			let o = 0;
			return e.replace(t, function () {
				return n[o++]
			})
		},
		r.renderMarkdown = function (e) {
			return n(e)
		},
		r.protectMathAndRenderMarkdown = function (e) {
			var e = r.tokenize(e),
				e = r.mask(e),
				n = r.renderMarkdown(e.text);
			return r.unmask(n, e.tokenValues)
		},
		r.render = function (e) {
			return a.protectMath ?
				r.protectMathAndRenderMarkdown(e) :
				r.renderMarkdown(e)
		},
		r.renderPage = function () {
			const e = window.document.getElementsByTagName("textarea"),
				n = window.document.createElement("main");
			let t;
			0 < e.length ?
				(t = e[0].value.trim(), e[0].remove()) :
				(t = window.document.body.innerHTML.trim(), window.document.body.innerHTML = ""),
				void 0 !== window.document.title && "" !== window.document.title ||
				(d = t.split("\n", 1)[0].replace(/^\s*#*\s*|\s*#*\s*$/g, ""),
					window.document.title = d),
				window.document.body.appendChild(n);
			const o = window.document.createElement("style");
			var d = m[a.style];
			o.appendChild(window.document.createTextNode(d)),
				window.document.head.appendChild(o);
			const i = window.document.createElement("meta");
			i.name = "viewport",
				i.content = "width=device-width, initial-scale=1.0",
				window.document.head.appendChild(i),
				n.innerHTML = r.render(t),
				a.useMathJax && window.MathJax.typeset(),
				void 0 !== a.onRenderPage && a.onRenderPage()
		},
		r.main = function () {
			if (r.setDefaultOptions(), "undefined" != typeof window) {
				for (const e in a)
					"undefined" != typeof window && void 0 !== window.texme && void 0 !== window.texme[e] && (a[e] = window.texme[e]);
				t(a.markdownURL, function () {
					n = window.marked.parse
				}),
					a.useMathJax && (window.MathJax = {
						tex: {
							inlineMath: [["$", "$"], ["\\(", "\\)"]],
							tags: "ams"
						},
						startup: {
							typeset: !1
						}
					}, t(a.MathJaxURL)),
					a.renderOnLoad && (window.onload = r.renderPage),
					window.texme = r
			} else
				n = require("marked").parse, module.exports = r
		},
		r.main()
}
