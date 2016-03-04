/**
 * Module dependencies
 */

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

  // update
  var top = body.scrollTop;
  css(el, { height: 0 });
  css(el, { height: el.scrollHeight });
  body.scrollTop = top;
}

/**
 * Has Text
 */

function hasText(str) {
  return str.replace(/\s/g, '').length > 0;
}
