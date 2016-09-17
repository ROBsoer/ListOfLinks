function ExportListOfLinks(config, reverse, markdown) {
	"use strict";

	this._PRESETS = [{
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
	}];

	this._host = window.location.host;


	this.setConfig = function (config) {
		if (typeof config === "string") {
			config = this._PRESETS.find(el => {
					return el.name === config;
				}).config || config;
		} else if (config === undefined) {
			try {
				config = this._PRESETS.find(el => {
					return this._host.includes(el.name)
				}).config;
			} catch (err) {
				throw new Error(`Plugin has no preset for ${this._host}`);
			}
		}

		return checkConfig(config, this._PRESETS[0].config);
	};

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

	this._config = this.setConfig(config);


	/*function copyToClipboard(text) {
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
	 }*/

	/*function getListItem(el, config, separator = " - ") {
	 const siteName = window.location.host;

	 let link  = String(el.querySelector(config.link).getAttribute("href"));
	 let title = el.querySelector(config.link).textContent.trim();

	 if (link.startsWith("/")) link = siteName + link;

	 return title + separator + link;
	 }*/

	/*function getMarkdownListItem(el, config) {
	 return "[" + getListItem(...arguments, "](") + ")";
	 }*/

	/*function getList(config, reverse = false, markdown = true) {
	 function addItemToList(item) {
	 string += "\n";
	 if (markdown) string += getMarkdownListItem(item, config);
	 else string += getListItem(item, config);
	 }

	 const parent     = document.querySelector(config.parent);
	 const collection = parent.querySelectorAll(config.item);
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
	 }*/


	/*config = getConfig(config);


	 this._list = getList(config, reverse, markdown);

	 if (copyToClipboard(list)) alert("List have been copied to the clipboard!\nYou can see your list in browser's console.");*/

	return {
		config:    this._config,
		setConfig: this.setConfig
	}

}