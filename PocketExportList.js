(function (reverse, markdown, settings) {
	"use strict";


	settings = settings || {
			item:  "#queue > .item",
			title: ".title",
			link:  ".item_link"
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

	function getListItem(el, config, separator = " - ") {
		const title = el.querySelector(config.title).textContent;
		const link  = window.location.host + el.querySelector(config.link).getAttribute("href");

		return title + separator + link;
	}

	function getMarkdownListItem(el, config) {
		return "[" + getListItem(...arguments, "](") + ")";
	}

	function getList(config, reverse = false, markdown = true) {
		function addItemToList(item) {
			string += "\n";
			if (markdown) string += getMarkdownListItem(item, config);
			else string += getListItem(item, config);
		}


		const collection = document.querySelectorAll(config.item);
		let string       = "";

		if (!reverse) {
			for (let i = 0; i < collection.length; i++) {
				addItemToList(collection[i]);
			}
		} else {
			for (let i = collection.length - 1; i >= 0; i--) {
				addItemToList(collection[i]);
			}
		}

		return string;
	}

	let list = getList(settings, reverse, markdown);


	if (copyToClipboard(list)) alert("List have been copied to the clipboard!\nYou can see your list in browser's console.");

	return list;
})();

