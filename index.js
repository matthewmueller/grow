/**
 * Module dependencies
 */

var event = require('event');
var css = require('css');

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
  var diff = parseInt(css(el, 'padding-bottom')) + parseInt(css(el, 'padding-top'));

  // Firefox: scrollHeight isn't full height on border-box
  if (scrollHeight + diff <= height) diff = 0;

  // check if the element already has text
  hasText(el.value) && css(el, { height: scrollHeight });

  this.oninput = event.bind(el, 'input', update);
  this.onkeyup = event.bind(el, 'keyup', update);

  function update(e) {
    css(el, { height: 'auto' });
    css(el, { height: el.scrollHeight - diff });
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
