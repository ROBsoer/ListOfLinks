(function (settings) {
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

  function getList(config) {
    let string = "";

    Array.prototype.forEach.call(document.querySelectorAll(config.item), (el) => {
      let text = "[" + el.querySelector(config.title).textContent + "]" +
          "(" + window.location.host + el.querySelector(config.link).getAttribute("href") + ")";
      string += text + "\n";
    });

    return string;
  }


  if (copyToClipboard(getList(settings))) alert("List have been copied to clipboard!");
})();

