(function (settings) {
	"use strict";

	settings = settings || {
			item:   "#queue > .item",
			title:  ".title",
			link:   ".item_link",
			insert: "#page_queue"
		};


	function copyToClipboard(text) {
		var el            = document.createElement('textarea');
		el.style.position = 'absolute';
		el.style.left     = '-9999px';
		el.setAttribute('readonly', '');
		el.value = text;

		document.body.appendChild(el);
		el.select();
		var success = document.execCommand('copy');
		document.body.removeChild(el);
		return success;
	}


	let items = document.querySelectorAll(settings.item);

	let string = "";

	Array.prototype.forEach.call(items, (el) => {
		let text = "[" + el.querySelector(settings.title).textContent + "]" +
			"(" + window.location.host + el.querySelector(settings.link).getAttribute("href") + ")";
		string += text + "\n";
	});


	copyToClipboard(string);
	alert("List have been copied to clipboard:\n" + string);

	return string;

})();

