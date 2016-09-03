(function () {
	"use strict";

	const POCKET = {
		item:  "#queue > .item",
		title: ".title",
		link:  ".item_link",
		insert: "#page_queue",
	};

	let items = document.querySelectorAll(POCKET.item);
	let list  = document.createElement("ul");

	Array.prototype.forEach.call(items, function (el) {
		let li   = document.createElement("li");
		let text = document.createTextNode(
			"[" + el.querySelector(POCKET.title).textContent + "]" +
			"(http://getpocket.com/" + el.querySelector(POCKET.link).getAttribute("href") + ")"
		);

		li.appendChild(text);
		list.appendChild(li);
	});


	document.querySelector(POCKET.insert).appendChild(list);

	return list;

})();


