(function () {
	"use strict";

	let settings = {
		item:   "#queue > .item",
		title:  ".title",
		link:   ".item_link",
		insert: "#page_queue"
	};

	let items = document.querySelectorAll(settings.item);
	let list  = document.createElement("ul");

	Array.prototype.forEach.call(items, (el) => {
		let li   = document.createElement("li");
		let text = document.createTextNode(
			"[" + el.querySelector(settings.title).textContent + "]" +
			"(" + window.location.host + el.querySelector(settings.link).getAttribute("href") + ")"
		);

		li.appendChild(text);
		list.appendChild(li);
	});


	document.querySelector(settings.insert).appendChild(list);

	return list;

})();