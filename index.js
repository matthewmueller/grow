/**
 * Module dependencies
 */

var event = require('event');
var css = require('css');
var body = document.body;

/**
 * Export `Grow`
 */

module.exports = Grow;

/**
 * Initialize `Grow`
 *
 * @param {Element} el
 * @param {Object} options
 */

function Grow(el, options) {
  if(!(this instanceof Grow)) return new Grow(el, options);
  this.el = el;

  var height = el.offsetHeight;
  var scrollHeight = el.scrollHeight;
  var paddingBottom = parseInt(css(el, 'padding-bottom'));
  var paddingTop = parseInt(css(el, 'padding-top'));
  var diff = paddingBottom + paddingTop;

  // Firefox: scrollHeight isn't full height on border-box
  if (scrollHeight + diff <= height) diff = 0;

  // check if the element already has text
  hasText(el.value) && css(el, { height: scrollHeight - diff });

  this.oninput = event.bind(el, 'input', update);
  this.onkeyup = event.bind(el, 'keyup', update);

  // update


  function update(e) {
    var top = body.scrollTop;
    css(el, { height: 0 });
    css(el, { height: el.scrollHeight });
    body.scrollTop = top;
  };
}

/**
 * unbind
 */

Grow.prototype.unbind = function() {
  event.unbind(this.el, 'input', this.oninput);
  event.unbind(this.el, 'keyup', this.oninput);
  return this;
};


/**
 * Has Text
 */

function hasText(str) {
  return str.replace(/\s/g, '').length > 0;
}
