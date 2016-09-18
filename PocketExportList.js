function ListOfLinks(reverse, markdown, config) {
	"use strict";

	let PRESETS = [{
		name:   "pocket",
		config: {
			parent: "#queue",
			item:   ".item",
			link:   ".title"
		}
	}, {
		name:   "youtube",
		config: {
			parent: "#pl-video-list",
			item:   ".pl-video",
			link:   ".pl-video-title-link"
		}
	}, {
		name:   "vimeo",
		config: {
			parent: "#browse_content ol",
			item:   "li",
			link:   "a",
			title:  "a .title"
		}
	}];

	this.list  = "";
	this._host = window.location.host;

	this.setConfig = function (config, presets) {
		if (typeof config === "string") {
			config = presets.find(el => {
					return el.name === config;
				}).config || config;
		} else if (config === undefined) {
			config = searchPresetForHost(this._host, presets);
		}

		return checkConfig(config, presets[0].config);
	};

	this.getList = function (reverse = false, markdown = true) {
		function addItemToList(item) {
			this.list += "\n";
			if (markdown) this.list += getMarkdownListItem(item, this._config);
			else this.list += getListItem(item, this._config);
		}

		const parent     = document.querySelector(this._config.parent);
		const collection = parent.querySelectorAll(this._config.item);

		this.list = "";

		if (!reverse) {
			for (let i = 0; i < collection.length; i++) {
				addItemToList.call(this, collection[i]);
			}
		} else {
			for (let i = collection.length - 1; i >= 0; i--) {
				addItemToList.call(this, collection[i]);
			}
		}

		if (copyToClipboard(this.list)) alert("List have been copied to the clipboard!\nYou can see your list in browser's console.");
		console.log(this.list);
	};

	// helpers
	/**
	 * compare config with standard
	 * @param config
	 * @param standard
	 * @returns {*}
	 */
	function checkConfig(config, standard) {
		if (typeof config == "object") {
			for (let key in standard) {
				if (Object.prototype.hasOwnProperty.call(standard, key)) {
					if (!config.hasOwnProperty(key)) {
						throw new Error(`config has no "${key}" property`);
					}
				}
			}
			return config;
		} else {
			throw new Error("wrong config");
		}
	}

	/**
	 * detect preset for current host
	 * @param host
	 * @param presets
	 * @returns {config|{parent, item, link}}
	 */
	function searchPresetForHost(host, presets) {
		try {
			return config = presets.find(el => {
				return host.includes(el.name)
			}).config;
		} catch (err) {
			throw new Error(`Plugin has no preset for ${host}`);
		}
	}

	/**
	 * copy text to clipboard
	 * @param text
	 * @returns {boolean}
	 */
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
		const FILTER   = /\n[ ]{2,}/gi;
		const siteName = window.location.host;

		let link  = String(el.querySelector(config.link).getAttribute("href"));
		let title = (!config.title) ? el.querySelector(config.link).textContent
			                        : el.querySelector(config.title).textContent;

		title = title.trim().replace(FILTER, "");

		if (link.startsWith("/")) link = siteName + link;

		return title + separator + link;
	}

	function getMarkdownListItem(el, config) {
		return "[" + getListItem(...arguments, "](") + ")";
	}

	// process
	this._config = this.setConfig(config, PRESETS);
	this.getList(reverse, markdown);
}

let list = new ListOfLinks();